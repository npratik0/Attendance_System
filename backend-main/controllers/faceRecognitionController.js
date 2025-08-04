const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// Paths configuration
const FACE_RECOGNITION_PATH = path.join(__dirname, '../../Face_Recognition_Model');
const UPLOAD_PATH = path.join(__dirname, '../uploads/profile-images');
const FACE_IMAGES_PATH = path.join(FACE_RECOGNITION_PATH, 'Images');

// Ensure Face Recognition Images directory exists
if (!fs.existsSync(FACE_IMAGES_PATH)) {
    fs.mkdirSync(FACE_IMAGES_PATH, { recursive: true });
    console.log('Created Face Recognition Images directory');
}

// Copy image from uploads to Face Recognition Model and trigger encoding
exports.processNewUserImage = async (userData, imageFilename) => {
    try {
        if (!imageFilename) {
            console.log('No image provided for user:', userData.fullName);
            return { success: true, message: 'User created without image' };
        }

        const sourcePath = path.join(UPLOAD_PATH, imageFilename);

        // Check if source file exists
        if (!fs.existsSync(sourcePath)) {
            throw new Error(`Source image not found: ${sourcePath}`);
        }

        // Create a meaningful filename for face recognition
        // Format: studentId_fullName.ext or employeeId_fullName.ext
        const fileExtension = path.extname(imageFilename);
        const identifier = userData.studentId || userData.employeeId || userData.id;
        const cleanName = userData.fullName.replace(/[^a-zA-Z0-9]/g, '_');
        const targetFilename = `${identifier}_${cleanName}${fileExtension}`;
        const targetPath = path.join(FACE_IMAGES_PATH, targetFilename);

        // Copy image to Face Recognition Model directory
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`✅ Image copied to Face Recognition Model: ${targetFilename}`);

        // Trigger face encoding automatically
        const encodingResult = await triggerFaceEncoding();

        return {
            success: true,
            message: 'Image processed and encoding completed',
            imageFilename: targetFilename,
            encodingResult
        };

    } catch (error) {
        console.error('Error processing user image:', error);
        return {
            success: false,
            message: 'Failed to process user image',
            error: error.message
        };
    }
};

// Trigger face encoding by running encode_faces.py
const triggerFaceEncoding = () => {
    return new Promise((resolve, reject) => {
        console.log('🔄 Starting face encoding process...');

        // ✅ Correct venv paths (update for your folder names)
        const venvPythonPath = path.join(FACE_RECOGNITION_PATH, '.venv/Scripts/python.exe'); // Windows
        const venvPythonPathLinux = path.join(FACE_RECOGNITION_PATH, '.venv/bin/python');    // Linux/Mac

        // Default fallback
        let pythonCommand = 'python';

        // Check for virtual environment first
        if (fs.existsSync(venvPythonPath)) {
            pythonCommand = venvPythonPath;
        } else if (fs.existsSync(venvPythonPathLinux)) {
            pythonCommand = venvPythonPathLinux;
        }

        console.log('▶ Using Python interpreter:', pythonCommand);

        const encodingScript = path.join(FACE_RECOGNITION_PATH, 'encode_faces.py');

        const pythonProcess = spawn(pythonCommand, [encodingScript], {
            cwd: FACE_RECOGNITION_PATH,
            stdio: ['pipe', 'pipe', 'pipe']
        });

        let stdout = '';
        let stderr = '';

        pythonProcess.stdout.on('data', (data) => {
            stdout += data.toString();
            console.log('Python stdout:', data.toString());
        });

        pythonProcess.stderr.on('data', (data) => {
            stderr += data.toString();
            console.error('Python stderr:', data.toString());
        });

        pythonProcess.on('close', (code) => {
            if (code === 0) {
                console.log('✅ Face encoding completed successfully');
                resolve({
                    success: true,
                    message: 'Face encoding completed',
                    output: stdout
                });
            } else {
                console.error(`❌ Face encoding failed with code ${code}`);
                console.error('Error output:', stderr);
                reject({
                    success: false,
                    message: 'Face encoding failed',
                    error: stderr,
                    exitCode: code
                });
            }
        });

        pythonProcess.on('error', (error) => {
            console.error('Failed to start face encoding process:', error);
            reject({
                success: false,
                message: 'Failed to start face encoding process',
                error: error.message
            });
        });
    });
};

// Manual trigger for face encoding (for testing)
exports.triggerEncoding = async (req, res) => {
    try {
        const result = await triggerFaceEncoding();
        res.status(200).json(result);
    } catch (error) {
        console.error('Manual encoding trigger failed:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to trigger face encoding',
            error: error.message || error
        });
    }
};

// Get Face Recognition Model status
exports.getModelStatus = async (req, res) => {
    try {
        const encodingsPath = path.join(FACE_RECOGNITION_PATH, 'encodings.pickle');
        const imagesCount = fs.existsSync(FACE_IMAGES_PATH) ?
            fs.readdirSync(FACE_IMAGES_PATH).filter(file =>
                file.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/)
            ).length : 0;

        const status = {
            success: true,
            data: {
                faceRecognitionPath: FACE_RECOGNITION_PATH,
                imagesPath: FACE_IMAGES_PATH,
                encodingsFileExists: fs.existsSync(encodingsPath),
                totalImages: imagesCount,
                lastEncodingUpdate: fs.existsSync(encodingsPath) ?
                    fs.statSync(encodingsPath).mtime : null
            }
        };

        res.status(200).json(status);
    } catch (error) {
        console.error('Error getting model status:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get model status',
            error: error.message
        });
    }
};