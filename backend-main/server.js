require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes'); // NEW

// Initialize models (this will sync the database)
require('./models');

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/attendance', attendanceRoutes); // NEW

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'ClockinGo Backend Server is running',
    timestamp: new Date().toISOString()
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 ClockinGo Backend Server running on port ${PORT}`);
  console.log(`📁 Static files served from: ${path.join(__dirname, 'uploads')}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  console.log(`📊 Attendance API: http://localhost:${PORT}/api/attendance`);
});