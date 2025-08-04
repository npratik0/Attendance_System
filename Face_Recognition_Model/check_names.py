import pickle
import requests
import os

def get_face_recognition_names():
    """Get names from face recognition encodings"""
    try:
        with open("encodings.pickle", "rb") as f:
            data = pickle.load(f)
        return data["names"]
    except FileNotFoundError:
        print("❌ encodings.pickle not found. Please run encode_faces.py first.")
        return []

def get_database_users():
    """Try to get users from database through backend"""
    try:
        # This is a simple test - you might need to adjust the endpoint
        response = requests.get("http://localhost:5000/health", timeout=5)
        if response.status_code == 200:
            print("✅ Backend is running")
            
            # Try to get users list (this endpoint might not exist, that's ok)
            try:
                users_response = requests.get("http://localhost:5000/api/users", timeout=5)
                if users_response.status_code == 200:
                    return users_response.json()
            except:
                pass
        
        return None
    except:
        print("❌ Cannot connect to backend")
        return None

def suggest_name_fixes(face_names):
    """Suggest how to map face recognition names to database users"""
    print("\n🔧 FACE RECOGNITION NAME MAPPING ANALYSIS")
    print("=" * 60)
    
    print("👥 Current face recognition names:")
    for i, name in enumerate(face_names, 1):
        print(f"   {i}. {name}")
    
    print("\n📊 Based on your database users, here are the likely mappings:")
    
    # Known database users from your output
    database_users = [
        {"name": "Ankit", "studentId": "230325"},
        {"name": "Test 2", "studentId": "230322"},
        {"name": "Nobody", "studentId": "230321"},
        {"name": "Abc", "studentId": "200000"},
        {"name": "Sharma", "studentId": "1234566"},
        {"name": "hello", "studentId": "99999"},
        {"name": "qwerty", "studentId": "11111"},
        {"name": "Testtt", "studentId": "33333"}
    ]
    
    print("\n🎯 Possible matches:")
    for face_name in face_names:
        print(f"\n   Face Recognition Name: '{face_name}'")
        
        # Try to extract ID and name from face recognition name
        if '_' in face_name:
            parts = face_name.split('_')
            possible_id = parts[0]
            possible_name = '_'.join(parts[1:]).replace('_', ' ')
            
            print(f"   Extracted ID: '{possible_id}'")
            print(f"   Extracted Name: '{possible_name}'")
            
            # Look for matches in database
            matches = []
            for user in database_users:
                if user["studentId"] == possible_id:
                    matches.append(f"✅ ID Match: {user['name']} (ID: {user['studentId']})")
                elif possible_name.lower() in user["name"].lower() or user["name"].lower() in possible_name.lower():
                    matches.append(f"📝 Name Match: {user['name']} (ID: {user['studentId']})")
            
            if matches:
                print("   Possible database matches:")
                for match in matches:
                    print(f"      {match}")
            else:
                print("   ❌ No clear matches found in database")
                print("   💡 You may need to:")
                print("      1. Add this user to the database, OR")
                print("      2. Rename the image file to match an existing user")
        else:
            print(f"   Format: Simple name (no underscore)")
            # Look for name matches
            matches = []
            for user in database_users:
                if face_name.lower() in user["name"].lower() or user["name"].lower() in face_name.lower():
                    matches.append(f"📝 Name Match: {user['name']} (ID: {user['studentId']})")
            
            if matches:
                print("   Possible database matches:")
                for match in matches:
                    print(f"      {match}")
            else:
                print("   ❌ No clear matches found in database")

def show_image_files():
    """Show what image files exist"""
    images_dir = "Images"
    if os.path.exists(images_dir):
        image_files = [f for f in os.listdir(images_dir) 
                      if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp'))]
        
        print(f"\n📁 Image files in '{images_dir}' folder:")
        for i, img in enumerate(image_files, 1):
            print(f"   {i}. {img}")
        
        return image_files
    else:
        print(f"\n❌ '{images_dir}' folder not found")
        return []

def provide_solutions():
    """Provide step-by-step solutions"""
    print("\n🛠️ SOLUTIONS TO FIX THE ATTENDANCE ISSUE")
    print("=" * 60)
    
    print("The main issue is that your face recognition names don't match users in your database.")
    print("\nHere are your options:\n")
    
    print("OPTION 1: Rename your image files (RECOMMENDED)")
    print("   1. Go to the 'Images' folder in Face_Recognition_Model")
    print("   2. Rename your image files to match database users")
    print("   3. Format: 'StudentID_FullName.jpg' (e.g., '99999_hello.jpg')")
    print("   4. Run encode_faces.py again to update encodings")
    print("   5. Run main.py to test")
    
    print("\nOPTION 2: Add new users to database")
    print("   1. Go to your admin panel")
    print("   2. Add users that match your face recognition names")
    print("   3. Make sure the names match exactly")
    
    print("\nOPTION 3: Update the face recognition matching logic")
    print("   1. Modify the attendanceController.js to be more flexible with name matching")
    print("   2. This is more complex but allows partial matches")
    
    print(f"\n🎯 QUICK FIX FOR YOUR CURRENT SITUATION:")
    print(f"Based on your output, you have '44444_henlo' in face recognition")
    print(f"But 'hello' (ID: 99999) in your database.")
    print(f"")
    print(f"To fix this:")
    print(f"1. Rename '44444_henlo.jpg' to '99999_hello.jpg' in Images folder")
    print(f"2. Run: python encode_faces.py")
    print(f"3. Run: python main.py")

if __name__ == "__main__":
    print("🔍 ClockinGo Name Mapping Checker")
    print("=" * 60)
    
    # Get face recognition names
    face_names = get_face_recognition_names()
    
    if not face_names:
        print("❌ No face recognition data found")
        exit(1)
    
    # Show current image files
    image_files = show_image_files()
    
    # Analyze name mappings
    suggest_name_fixes(face_names)
    
    # Provide solutions
    provide_solutions()
    
    print("\n" + "=" * 60)
    print("💡 After making changes, always run encode_faces.py before main.py!")
    print("=" * 60)