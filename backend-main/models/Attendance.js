const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Attendance = sequelize.define('Attendance', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User_test1s', // This should match your User table name
            key: 'id'
        }
    },
    studentId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    studentName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false
    },
    semester: {
        type: DataTypes.STRING,
        allowNull: true
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('Present', 'Absent'),
        allowNull: false,
        defaultValue: 'Present'
    },
    confidenceScore: {
        type: DataTypes.FLOAT,
        allowNull: true,
        comment: 'Face recognition confidence score'
    },
    recognitionMethod: {
        type: DataTypes.ENUM('face_recognition', 'manual'),
        allowNull: false,
        defaultValue: 'face_recognition'
    }
}, {
    tableName: 'attendances',
    timestamps: true, // This adds createdAt and updatedAt
    indexes: [
        {
            unique: true,
            fields: ['userId', 'date'] // Prevent duplicate attendance for same user on same date
        },
        {
            fields: ['studentId']
        },
        {
            fields: ['date']
        }
    ]
});

module.exports = Attendance;