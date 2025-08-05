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


TESTING_MODE = True  
COOLDOWN_SECONDS = 3 

# Load encodings
try:
    with open("encodings.pickle", "rb") as f:
        data = pickle.load(f)
    print(f"✅ Face encodings loaded successfully")
    print(f"📊 Total encoded faces: {len(data['encodings'])}")
    print(f"👥 Known names: {', '.join(data['names'])}")
except FileNotFoundError:
    print("❌ encodings.pickle not found. Please run encode_faces.py first.")
    exit(1)

# Attendance file (keep as backup)
attendance_file = "attendance.csv"
today = datetime.now().strftime("%Y-%m-%d")

# In testing mode, we'll track recent detections instead of daily entries
if TESTING_MODE:
    print(f"🧪 TESTING MODE ENABLED")
    print(f"   • Multiple attendances per day allowed")
    print(f"   • Cooldown between detections: {COOLDOWN_SECONDS} seconds")
    recent_detections = {}  # Track recent detections with timestamps
else:
    print(f"🏫 PRODUCTION MODE")
    print(f"   • One attendance per student per day")
    existing_entries = set()
    # Load existing attendance for today to avoid duplicates
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
        
        print(f"🚀 Sending to backend: {payload}")
        response = requests.post(BACKEND_URL, json=payload, headers=headers, timeout=10)
        
        print(f"📡 Backend response status: {response.status_code}")
        print(f"📡 Backend response: {response.text}")
        
        if response.status_code == 201:
            print(f"✅ Backend: New attendance recorded for {student_name}")
            return True
        elif response.status_code == 200:
            # Already recorded today - but in testing mode we still want to log it
            response_data = response.json()
            if TESTING_MODE:
                print(f"🧪 Testing Mode: {response_data.get('message', 'Already recorded today')}")
                print(f"✅ Attendance attempt logged (testing)")
                return True
            else:
                print(f"ℹ️ Backend: {response_data.get('message', 'Already recorded')}")
                return True
        else:
            print(f"❌ Backend Error: {response.status_code} - {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"🌐 Backend Connection Error: {e}")
        print("💡 Make sure your Node.js server is running on http://localhost:5000")
        return False
    except Exception as e:
        print(f"❌ Backend Send Error: {e}")
        return False

# Test backend connection first
print("🔗 Testing backend connection...")
try:
    test_response = requests.get("http://localhost:5000/health", timeout=5)
    if test_response.status_code == 200:
        print("✅ Backend server is running!")
    else:
        print(f"⚠️ Backend server responded with status: {test_response.status_code}")
except:
    print("❌ Cannot connect to backend server. Make sure it's running on http://localhost:5000")

# Start webcam
print("\n🎥 Initializing webcam...")
cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("❌ Error: Could not open webcam")
    exit(1)

print("✅ Webcam started successfully!")
print("📹 Press 'q' to quit.")
print("🔄 Starting face recognition attendance system...")
print(f"📡 Backend API: {BACKEND_URL}")
print("=" * 60)

detected_names = []

# Single window name to avoid multiple windows
window_name = "ClockinGo - Face Recognition Attendance"

while True:
    success, frame = cap.read()
    if not success:
        print("❌ Failed to read from webcam")
        break

    # Resize for faster processing
    small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
    rgb_small = cv2.cvtColor(small_frame, cv2.COLOR_BGR2RGB)

    # Detect faces and encode
    face_locations = face_recognition.face_locations(rgb_small)
    face_encodings = face_recognition.face_encodings(rgb_small, face_locations)

    # Process each detected face
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
        current_time = time.time()
        should_record = False
        
        if name != "Unknown":
            if TESTING_MODE:
                # Testing mode: Allow multiple records but with cooldown
                if name in recent_detections:
                    time_since_last = current_time - recent_detections[name]
                    if time_since_last >= COOLDOWN_SECONDS:
                        should_record = True
                        print(f"🧪 Testing: Cooldown passed for {name} ({time_since_last:.1f}s)")
                    else:
                        remaining_time = COOLDOWN_SECONDS - time_since_last
                        print(f"⏳ Cooldown active for {name} (wait {remaining_time:.1f}s more)")
                else:
                    should_record = True
                    print(f"🧪 Testing: First detection of {name}")
            else:
                # Production mode: One per day
                if name not in existing_entries:
                    should_record = True
                    print(f"🏫 Production: Recording daily attendance for {name}")
                else:
                    print(f"ℹ️ Production: {name} already recorded today")
        
        if should_record:
            print(f"\n🎯 Face recognized: {name} (Confidence: {confidence_score}%)")
            print(f"📝 Recording attendance for: {name}")
            
            now = datetime.now()
            timestamp = now.strftime("%H:%M:%S")
            full_timestamp = now.strftime("%Y-%m-%d %H:%M:%S")

            # Try to send to backend first
            print("🚀 Sending attendance to backend...")
            backend_success = send_attendance_to_backend(name, today, timestamp, confidence_score)
            
            # Also save to local CSV as backup
            file_exists = os.path.isfile(attendance_file)
            try:
                with open(attendance_file, "a", newline="") as f:
                    writer = csv.writer(f)
                    if not file_exists:
                        writer.writerow(["Name", "Date", "Time", "Full_Timestamp", "Confidence", "Backend_Status", "Mode"])
                    
                    mode = "TESTING" if TESTING_MODE else "PRODUCTION"
                    writer.writerow([name, today, timestamp, full_timestamp, f"{confidence_score}%", 
                                   "Success" if backend_success else "Failed", mode])
                print(f"💾 Local backup: Attendance saved to {attendance_file}")
            except Exception as csv_error:
                print(f"❌ Local CSV Error: {csv_error}")

            if backend_success:
                print(f"🎉 SUCCESS: {name} attendance recorded successfully!")
                if name not in detected_names:
                    detected_names.append(name)
                
                if TESTING_MODE:
                    recent_detections[name] = current_time
                else:
                    existing_entries.add(name)
            else:
                print(f"⚠️ Backend failed but saved to local CSV")
            
            print("=" * 60)

    # Add status text on frame
    if TESTING_MODE:
        status_text = f"TESTING MODE | Detected: {len(detected_names)} users"
    else:
        status_text = f"PRODUCTION MODE | Today: {len(detected_names)} users"
    
    cv2.putText(frame, status_text, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
    
    # Show the frame in a single window
    cv2.imshow(window_name, frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Cleanup
cap.release()
cv2.destroyAllWindows()
print("\n📹 Webcam feed ended.")
print(f"📊 Final Statistics:")
if TESTING_MODE:
    print(f"   • Testing Mode: Multiple attendances allowed")
    print(f"   • Unique users detected: {len(detected_names)}")
    print(f"   • Users: {', '.join(detected_names) if detected_names else 'None'}")
else:
    print(f"   • Production Mode: One attendance per day")
    print(f"   • Students with attendance today: {len(detected_names)}")
    print(f"   • Students: {', '.join(detected_names) if detected_names else 'None'}")
print("✅ Face recognition attendance session completed.")