const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const faceRecognitionController = require('./faceRecognitionController');

exports.register = async (req, res) => {
  try {
    console.log('Registration request received');
    console.log('Body:', req.body);
    console.log('File:', req.file);

    const {
      fullName, email, phone, password, confirmPassword, role,
      studentId, employeeId, department, semester
    } = req.body;

    // Validation
    if (!fullName || !email || !phone || !password || !role || !department) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if user already exists
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    let profileImagePath = null;

    // Handle profile image upload if file exists
    if (req.file) {
      try {
        // Store the relative path to the uploaded file
        profileImagePath = `/uploads/profile-images/${req.file.filename}`;
        console.log('Profile image saved locally at:', profileImagePath);
      } catch (uploadError) {
        console.error('Image upload error:', uploadError);
        return res.status(400).json({ message: "Image upload failed" });
      }
    }

    // Create user data object
    const userData = {
      fullName,
      email,
      phone,
      password: hashedPassword,
      role,
      department,
      profileImage: profileImagePath,
      studentId: role === 'student' ? studentId : null,
      employeeId: role === 'teacher' ? employeeId : null,
      semester: role === 'student' ? semester : null
    };

    console.log('Creating user with data:', { ...userData, password: '[HIDDEN]' });

    // Create user in database
    const newUser = await User.create(userData);

    // =================== NEW: FACE RECOGNITION INTEGRATION ===================
    // Process image for face recognition if image was uploaded
    if (req.file && req.file.filename) {
      try {
        console.log('🔄 Processing image for face recognition...');
        const faceProcessingResult = await faceRecognitionController.processNewUserImage(
          newUser,
          req.file.filename
        );

        if (faceProcessingResult.success) {
          console.log('✅ Face recognition processing completed:', faceProcessingResult.message);
        } else {
          console.error('⚠️ Face recognition processing failed:', faceProcessingResult.error);
          // Don't fail the registration, just log the warning
        }
      } catch (faceError) {
        console.error('❌ Face recognition integration error:', faceError);
        // Continue with user registration even if face processing fails
      }
    }
    // =================== END FACE RECOGNITION INTEGRATION ===================

    // Return user without password
    const { password: userPassword, ...userWithoutPassword } = newUser.toJSON();

    console.log('User created successfully:', userWithoutPassword);

    res.status(201).json({
      message: "User registered successfully",
      user: userWithoutPassword,
      faceRecognitionEnabled: req.file ? true : false
    });

  } catch (error) {
    console.error('Registration error:', error);

    // Handle specific database errors
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        message: "Validation error",
        details: error.errors.map(err => err.message)
      });
    }

    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    res.status(500).json({
      message: "Registration failed",
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { studentId, employeeId, password, role } = req.body;

    let user;

    if (role === 'student') {
      user = await User.findOne({ where: { studentId, role } });
    } else if (role === 'teacher') {
      user = await User.findOne({ where: { employeeId, role } });
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        profileImage: user.profileImage
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: "Login failed" });
  }
};