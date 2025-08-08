const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const faceRecognitionController = require('../controllers/faceRecognitionController');
const verifyToken = require('../middleware/authMiddleware');

// Middleware to check admin role
const requireAdmin = (req, res, next) => {
    if (req.user.role !== 'admin' && req.user.role !== 'teacher') {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Admin or Teacher role required.'
        });
    }
    next();
};

// =================== ATTENDANCE ROUTES ===================

// Record attendance (called by Python face recognition system)
// This route should be accessible without token for Python script
router.post('/record', attendanceController.recordAttendance);

// Get all attendance records (Admin only)
router.get('/records', verifyToken, requireAdmin, attendanceController.getAttendanceRecords);

// Get attendance for specific student
router.get('/student/:studentId', verifyToken, attendanceController.getStudentAttendance);

// Get attendance statistics (Admin/Teacher only)
router.get('/stats', verifyToken, requireAdmin, attendanceController.getAttendanceStats);

// =================== FACE RECOGNITION ROUTES ===================

// Manual trigger for face encoding (Admin only, for testing)
router.post('/trigger-encoding', verifyToken, requireAdmin, faceRecognitionController.triggerEncoding);

// Get Face Recognition Model status (Admin only)
router.get('/model-status', verifyToken, requireAdmin, faceRecognitionController.getModelStatus);

module.exports = router;