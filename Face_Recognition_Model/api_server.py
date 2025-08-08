# """
# Optional Flask API Server for Face Recognition Model
# This provides HTTP endpoints to interact with the face recognition system
# """

# from flask import Flask, request, jsonify
# import subprocess
# import os
# import json
# from datetime import datetime

# app = Flask(__name__)

# # Configuration
# FACE_RECOGNITION_PATH = os.path.dirname(os.path.abspath(__file__))

# @app.route('/health', methods=['GET'])
# def health_check():
#     """Health check endpoint"""
#     return jsonify({
#         "status": "OK",
#         "message": "Face Recognition API Server is running",
#         "timestamp": datetime.now().isoformat(),
#         "path": FACE_RECOGNITION_PATH
#     })

# @app.route('/encode', methods=['POST'])
# def trigger_encoding():
#     """Trigger face encoding process"""
#     try:
#         # Run encode_faces.py
#         result = subprocess.run(
#             ['python', 'encode_faces.py'],
#             cwd=FACE_RECOGNITION_PATH,
#             capture_output=True,
#             text=True,
#             timeout=300  # 5 minutes timeout
#         )
        
#         if result.returncode == 0:
#             return jsonify({
#                 "success": True,
#                 "message": "Face encoding completed successfully",
#                 "output": result.stdout,
#                 "timestamp": datetime.now().isoformat()
#             })
#         else:
#             return jsonify({
#                 "success": False,
#                 "message": "Face encoding failed",
#                 "error": result.stderr,
#                 "returncode": result.returncode,
#                 "timestamp": datetime.now().isoformat()
#             }), 400
            
#     except subprocess.TimeoutExpired:
#         return jsonify({
#             "success": False,
#             "message": "Face encoding timed out",
#             "timestamp": datetime.now().isoformat()
#         }), 408
        
#     except Exception as e:
#         return jsonify({
#             "success": False,
#             "message": "Face encoding error",
#             "error": str(e),
#             "timestamp": datetime.now().isoformat()
#         }), 500

# @app.route('/status', methods=['GET'])
# def get_status():
#     """Get face recognition model status"""
#     try:
#         encodings_path = os.path.join(FACE_RECOGNITION_PATH, 'encodings.pickle')
#         images_path = os.path.join(FACE_RECOGNITION_PATH, 'Images')
        
#         # Count images
#         image_count = 0
#         if os.path.exists(images_path):
#             image_files = [f for f in os.listdir(images_path) 
#                           if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp'))]
#             image_count = len(image_files)
        
#         # Get encodings file info
#         encodings_exists = os.path.exists(encodings_path)
#         last_update = None
#         if encodings_exists:
#             last_update = datetime.fromtimestamp(os.path.getmtime(encodings_path)).isoformat()
        
#         return jsonify({
#             "success": True,
#             "data": {
#                 "face_recognition_path": FACE_RECOGNITION_PATH,
#                 "images_path": images_path,
#                 "encodings_file_exists": encodings_exists,
#                 "encodings_last_update": last_update,
#                 "total_images": image_count,
#                 "timestamp": datetime.now().isoformat()
#             }
#         })
        
#     except Exception as e:
#         return jsonify({
#             "success": False,
#             "message": "Failed to get status",
#             "error": str(e),
#             "timestamp": datetime.now().isoformat()
#         }), 500

# @app.route('/start-recognition', methods=['POST'])
# def start_recognition():
#     """Start face recognition process (for future use)"""
#     return jsonify({
#         "success": False,
#         "message": "Recognition start endpoint not implemented yet. Please run main.py manually.",
#         "timestamp": datetime.now().isoformat()
#     }), 501

# if __name__ == '__main__':
#     print("🚀 Starting Face Recognition API Server...")
#     print(f"📁 Working directory: {FACE_RECOGNITION_PATH}")
#     print("🌐 Available endpoints:")
#     print("   • GET  /health - Health check")
#     print("   • POST /encode - Trigger face encoding")
#     print("   • GET  /status - Get model status")
#     print("=" * 50)
    
#     app.run(
#         host='127.0.0.1',
#         port=5001,
#         debug=True
#     )