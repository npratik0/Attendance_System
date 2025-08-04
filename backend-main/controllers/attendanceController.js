const { Attendance, User } = require('../models');
const { Op } = require('sequelize');

// Record attendance from face recognition
exports.recordAttendance = async (req, res) => {
    try {
        const { studentName, date, time, confidenceScore } = req.body;

        if (!studentName || !date || !time) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: studentName, date, time"
            });
        }

        // Find user by name (since face recognition returns name)
        const user = await User.findOne({
            where: {
                fullName: {
                    [Op.iLike]: `%${studentName}%` // Case insensitive search
                }
            }
        });

        if (!user) {
            console.log(`User not found for name: ${studentName}`);
            return res.status(404).json({
                success: false,
                message: `Student not found: ${studentName}`
            });
        }

        // Check if attendance already exists for today
        const existingAttendance = await Attendance.findOne({
            where: {
                userId: user.id,
                date: date
            }
        });

        if (existingAttendance) {
            return res.status(200).json({
                success: true,
                message: `Attendance already recorded for ${studentName} today`,
                attendance: existingAttendance
            });
        }

        // Create new attendance record
        const attendanceData = {
            userId: user.id,
            studentId: user.studentId,
            studentName: user.fullName,
            department: user.department,
            semester: user.semester,
            date: date,
            time: time,
            status: 'Present',
            confidenceScore: confidenceScore || null,
            recognitionMethod: 'face_recognition'
        };

        const newAttendance = await Attendance.create(attendanceData);

        console.log(`✅ Attendance recorded for ${studentName}`);

        res.status(201).json({
            success: true,
            message: `Attendance recorded successfully for ${studentName}`,
            attendance: newAttendance
        });

    } catch (error) {
        console.error('Error recording attendance:', error);
        res.status(500).json({
            success: false,
            message: "Failed to record attendance",
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
};

// Get attendance records (for admin dashboard)
exports.getAttendanceRecords = async (req, res) => {
    try {
        const { date, department, studentId, page = 1, limit = 50 } = req.query;

        let whereClause = {};

        if (date) whereClause.date = date;
        if (department) whereClause.department = department;
        if (studentId) whereClause.studentId = studentId;

        const offset = (page - 1) * limit;

        const { count, rows } = await Attendance.findAndCountAll({
            where: whereClause,
            include: [{
                model: User,
                attributes: ['fullName', 'email', 'profileImage'],
                as: 'student' // We'll need to set up this association
            }],
            order: [['date', 'DESC'], ['time', 'DESC']],
            limit: parseInt(limit),
            offset: offset
        });

        res.status(200).json({
            success: true,
            data: {
                attendanceRecords: rows,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages: Math.ceil(count / limit),
                    totalRecords: count,
                    recordsPerPage: parseInt(limit)
                }
            }
        });

    } catch (error) {
        console.error('Error fetching attendance records:', error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch attendance records",
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
};

// Get attendance for specific student
exports.getStudentAttendance = async (req, res) => {
    try {
        const { studentId } = req.params;
        const { startDate, endDate, page = 1, limit = 30 } = req.query;

        let whereClause = { studentId };

        if (startDate && endDate) {
            whereClause.date = {
                [Op.between]: [startDate, endDate]
            };
        }

        const offset = (page - 1) * limit;

        const { count, rows } = await Attendance.findAndCountAll({
            where: whereClause,
            order: [['date', 'DESC'], ['time', 'DESC']],
            limit: parseInt(limit),
            offset: offset
        });

        res.status(200).json({
            success: true,
            data: {
                studentId,
                attendanceRecords: rows,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages: Math.ceil(count / limit),
                    totalRecords: count,
                    recordsPerPage: parseInt(limit)
                }
            }
        });

    } catch (error) {
        console.error('Error fetching student attendance:', error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch student attendance",
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
};

// Get attendance statistics
exports.getAttendanceStats = async (req, res) => {
    try {
        const { date = new Date().toISOString().split('T')[0] } = req.query;

        const todayStats = await Attendance.findAll({
            where: { date },
            attributes: ['department', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
            group: ['department']
        });

        const totalStudents = await User.count({ where: { role: 'student' } });
        const presentToday = await Attendance.count({ where: { date, status: 'Present' } });

        res.status(200).json({
            success: true,
            data: {
                date,
                totalStudents,
                presentToday,
                absentToday: totalStudents - presentToday,
                attendanceRate: totalStudents > 0 ? ((presentToday / totalStudents) * 100).toFixed(2) : 0,
                departmentWiseStats: todayStats
            }
        });

    } catch (error) {
        console.error('Error fetching attendance stats:', error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch attendance statistics",
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
};