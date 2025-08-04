import requests
import json
from datetime import datetime

# Backend API configuration
BACKEND_URL = "http://localhost:5000/api/attendance/record"
HEALTH_URL = "http://localhost:5000/health"

def test_backend_connection():
    """Test if backend server is running"""
    print("🔗 Testing backend connection...")
    try:
        response = requests.get(HEALTH_URL, timeout=5)
        if response.status_code == 200:
            print("✅ Backend server is running!")
            print(f"📡 Response: {response.json()}")
            return True
        else:
            print(f"⚠️ Backend server responded with status: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Cannot connect to backend server: {e}")
        return False

def test_attendance_endpoint():
    """Test attendance recording endpoint with sample data"""
    print("\n📝 Testing attendance recording endpoint...")
    
    # Sample test data - using a name that exists in your database
    test_data = {
        "studentName": "hello",  # This user exists in your database
        "date": datetime.now().strftime("%Y-%m-%d"),
        "time": datetime.now().strftime("%H:%M:%S"),
        "confidenceScore": 95.5
    }
    
    print(f"🚀 Sending test data: {json.dumps(test_data, indent=2)}")
    
    try:
        headers = {'Content-Type': 'application/json'}
        response = requests.post(BACKEND_URL, json=test_data, headers=headers, timeout=10)
        
        print(f"📡 Response Status: {response.status_code}")
        print(f"📡 Response Headers: {dict(response.headers)}")
        print(f"📡 Response Body: {response.text}")
        
        if response.status_code in [200, 201]:
            print("✅ Attendance endpoint is working!")
            return True
        else:
            print(f"❌ Attendance endpoint failed with status: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Error testing attendance endpoint: {e}")
        return False

def get_users_from_database():
    """Get list of users from database for reference"""
    print("\n👥 Trying to get user list from backend...")
    try:
        # This assumes you have a users endpoint - if not, we'll skip this
        users_url = "http://localhost:5000/api/user/all"  # Adjust this URL as needed
        response = requests.get(users_url, timeout=5)
        
        if response.status_code == 200:
            users = response.json()
            print("📊 Available users in database:")
            for user in users.get('users', [])[:5]:  # Show first 5 users
                print(f"   • {user.get('fullName', 'Unknown')} (ID: {user.get('id', 'N/A')})")
        else:
            print("ℹ️ Could not fetch users list (this is optional)")
    except:
        print("ℹ️ Could not fetch users list (this is optional)")

if __name__ == "__main__":
    print("🧪 ClockinGo Backend Connection Tester")
    print("=" * 50)
    
    # Test 1: Backend connection
    backend_running = test_backend_connection()
    
    if backend_running:
        # Test 2: Attendance endpoint
        attendance_working = test_attendance_endpoint()
        
        # Test 3: Get users (optional)
        get_users_from_database()
        
        print("\n" + "=" * 50)
        if attendance_working:
            print("🎉 All tests passed! Your backend should work with main.py")
            print("\n💡 Next steps:")
            print("1. Make sure the 'studentName' in your face recognition matches users in database")
            print("2. Run your main.py script")
            print("3. Check the database for attendance records")
        else:
            print("⚠️ Backend is running but attendance endpoint has issues")
            print("Check the Node.js server logs for more details")
    else:
        print("❌ Backend server is not running or not accessible")
        print("💡 Make sure to:")
        print("1. Navigate to your backend-main folder")
        print("2. Run: npm start (or node server.js)")
        print("3. Ensure server is running on http://localhost:5000")
    
    print("=" * 50)