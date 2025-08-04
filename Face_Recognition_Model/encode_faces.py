# import os
# import cv2
# import face_recognition
# import pickle

# # Path to images folder
# IMAGE_PATH = 'Images'
# known_encodings = []
# known_names = []

# # Loop through each image
# for filename in os.listdir(IMAGE_PATH):
#     if filename.endswith(('.png', '.jpg', '.jpeg')):
#         img_path = os.path.join(IMAGE_PATH, filename)
#         image = cv2.imread(img_path)
#         rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

#         # Get encodings
#         encodings = face_recognition.face_encodings(rgb)

#         if encodings:
#             known_encodings.append(encodings[0])
#             name = os.path.splitext(filename)[0]
#             known_names.append(name)
#             print(f"[INFO] Processed {filename}")
#         else:
#             print(f"[WARNING] No face found in {filename}")

# # Save encodings to file
# data = {"encodings": known_encodings, "names": known_names}
# with open("encodings.pickle", "wb") as f:
#     pickle.dump(data, f)

# print("\n Face encoding completed and saved to encodings.pickle")

import os
import cv2
import face_recognition
import pickle
from datetime import datetime

# Path to images folder
IMAGE_PATH = 'Images'
known_encodings = []
known_names = []

def log_message(message):
    """Print message with timestamp"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{timestamp}] {message}")

def encode_faces():
    """Main function to encode faces from Images folder"""
    
    log_message(" Starting face encoding process...")
    
    # Check if Images folder exists
    if not os.path.exists(IMAGE_PATH):
        log_message(f" ERROR: Images folder '{IMAGE_PATH}' not found!")
        log_message("Please create the Images folder and add user photos.")
        return False
    
    # Get all image files
    image_files = [f for f in os.listdir(IMAGE_PATH) 
                   if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp'))]
    
    if not image_files:
        log_message(f"WARNING: No image files found in '{IMAGE_PATH}' folder!")
        log_message("Please add user photos to the Images folder.")
        return False
    
    log_message(f"Found {len(image_files)} image files to process")
    
    processed_count = 0
    failed_count = 0
    
    # Loop through each image
    for filename in image_files:
        try:
            img_path = os.path.join(IMAGE_PATH, filename)
            log_message(f" Processing: {filename}")
            
            # Load and convert image
            image = cv2.imread(img_path)
            if image is None:
                log_message(f" ERROR: Could not load image {filename}")
                failed_count += 1
                continue
                
            rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

            # Get face encodings
            face_locations = face_recognition.face_locations(rgb)
            encodings = face_recognition.face_encodings(rgb, face_locations)

            if encodings:
                # Use the first face found
                known_encodings.append(encodings[0])
                
                # Extract name from filename (remove extension)
                name = os.path.splitext(filename)[0]
                known_names.append(name)
                
                log_message(f" SUCCESS: Encoded face for '{name}'")
                processed_count += 1
                
                if len(encodings) > 1:
                    log_message(f" INFO: Multiple faces detected in {filename}, using the first one")
                    
            else:
                log_message(f" WARNING: No face detected in {filename}")
                failed_count += 1
                
        except Exception as e:
            log_message(f" ERROR processing {filename}: {str(e)}")
            failed_count += 1

    # Save encodings to pickle file
    if processed_count > 0:
        try:
            data = {"encodings": known_encodings, "names": known_names}
            
            # Create backup of existing encodings if it exists
            if os.path.exists("encodings.pickle"):
                backup_name = f"encodings_backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pickle"
                os.rename("encodings.pickle", backup_name)
                log_message(f" Backup created: {backup_name}")
            
            # Save new encodings
            with open("encodings.pickle", "wb") as f:
                pickle.dump(data, f)
            
            log_message(" Face encodings saved to encodings.pickle")
            log_message(f" SUMMARY:")
            log_message(f"   • Successfully processed: {processed_count} faces")
            log_message(f"   • Failed to process: {failed_count} images")
            log_message(f"   • Total encoded faces: {len(known_encodings)}")
            log_message(f"   • Encoded names: {', '.join(known_names)}")
            
            return True
            
        except Exception as e:
            log_message(f" ERROR saving encodings: {str(e)}")
            return False
    else:
        log_message(" ERROR: No faces were successfully encoded!")
        log_message("Please check your images and try again.")
        return False

if __name__ == "__main__":
    log_message(" ClockinGo Face Encoding System")
    log_message("=" * 50)
    
    success = encode_faces()
    
    log_message("=" * 50)
    if success:
        log_message("Face encoding completed successfully!")
        log_message("You can now run main.py to start face recognition.")
    else:
        log_message(" Face encoding failed!")
        log_message("Please check the errors above and try again.")
    
    log_message(" Process finished.")