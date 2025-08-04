import cv2
import face_recognition
import pickle
import time
import csv
from datetime import datetime
import os
import requests
import json

# Backend API configuration
BACKEND_URL = "http://localhost:5000/api/attendance/record"

# Load encodings
try:
    with open("encodings.pickle", "rb") as f:
        data = pickle.load(f)
    print(" Face encodings loaded successfully")
except FileNotFoundError:
    print(" encodings.pickle not found. Please run encode_faces.py first.")
    exit(1)

# Attendance file (keep as backup)
attendance_file = "attendance.csv"
today = datetime.now().strftime("%Y-%m-%d")
existing_entries = set()

# Load existing attendance for today to avoid duplicates (local backup)
if os.path.exists(attendance_file):
    with open(attendance_file, "r") as f:
        reader = csv.reader(f)
        next(reader, None)  # Skip header
        for row in reader:
            if len(row) >= 2:
                name, date = row[0], row[1]
                if date == today:
                    existing_entries.add(name)

def send_attendance_to_backend(student_name, date, time_str, confidence_score=None):
    """Send attendance data to Node.js backend"""
    try:
        payload = {
            "studentName": student_name,
            "date": date,
            "time": time_str,
            "confidenceScore": confidence_score
        }
        
        headers = {
            'Content-Type': 'application/json'
        }
        
        response = requests.post(BACKEND_URL, json=payload, headers=headers, timeout=5)
        
        if response.status_code == 201:
            print(f" Backend: Attendance recorded for {student_name}")
            return True
        elif response.status_code == 200:
            # Already recorded today
            response_data = response.json()
            print(f" Backend: {response_data.get('message', 'Already recorded')}")
            return True
        else:
            print(f" Backend Error: {response.status_code} - {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f" Backend Connection Error: {e}")
        return False
    except Exception as e:
        print(f" Backend Send Error: {e}")
        return False

# Start webcam
cap = cv2.VideoCapture(0)
print("\n Webcam started. Press 'q' to quit.")
print("🔄 Starting face recognition attendance system...")
print(f"📡 Backend API: {BACKEND_URL}")

detected_names = []

while True:
    success, frame = cap.read()
    if not success:
        break

    # Resize for faster processing
    small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
    rgb_small = cv2.cvtColor(small_frame, cv2.COLOR_BGR2RGB)

    # Detect faces and encode
    face_locations = face_recognition.face_locations(rgb_small)
    face_encodings = face_recognition.face_encodings(rgb_small, face_locations)

    for encoding, location in zip(face_encodings, face_locations):
        matches = face_recognition.compare_faces(data["encodings"], encoding, tolerance=0.6)
        name = "Unknown"
        confidence_score = 0

        if True in matches:
            # Get face distances to calculate confidence
            face_distances = face_recognition.face_distance(data["encodings"], encoding)
            best_match_index = matches.index(True)
            name = data["names"][best_match_index]
            
            # Calculate confidence score (lower distance = higher confidence)
            confidence_score = round((1 - face_distances[best_match_index]) * 100, 2)

        # Draw box and label
        top, right, bottom, left = [v * 4 for v in location]
        color = (0, 255, 0) if name != "Unknown" else (0, 0, 255)
        cv2.rectangle(frame, (left, top), (right, bottom), color, 2)
        
        # Display name and confidence
        label = f"{name}"
        if name != "Unknown":
            label += f" ({confidence_score}%)"
        
        cv2.putText(frame, label, (left, top - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.9, color, 2)

        # Check and record attendance
        if name != "Unknown" and name not in detected_names and name not in existing_entries:
            now = datetime.now()
            timestamp = now.strftime("%H:%M:%S")

            # Try to send to backend first
            backend_success = send_attendance_to_backend(name, today, timestamp, confidence_score)
            
            # Also save to local CSV as backup
            file_exists = os.path.isfile(attendance_file)
            try:
                with open(attendance_file, "a", newline="") as f:
                    writer = csv.writer(f)
                    if not file_exists:
                        writer.writerow(["Name", "Date", "Time", "Confidence", "Backend_Status"])
                    writer.writerow([name, today, timestamp, f"{confidence_score}%", "Success" if backend_success else "Failed"])
                print(f"Local backup: Attendance saved to {attendance_file}")
            except Exception as csv_error:
                print(f" Local CSV Error: {csv_error}")

            print(f" Success: {name} face detected successfully. Attendance Recorded!")
            print(f" Confidence Score: {confidence_score}%")
            print("-" * 50)
            
            detected_names.append(name)
            existing_entries.add(name)  # Add to today's log to prevent repeat

    cv2.imshow("ClockinGo - Face Recognition Attendance", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Cleanup
cap.release()
cv2.destroyAllWindows()
print("\n Webcam feed ended.")
print(" Face recognition attendance session completed.")