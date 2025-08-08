const { User } = require('../models');
const bcrypt = require('bcryptjs');

// Get user profile
exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findByPk(userId, {
            attributes: { exclude: ['password'] } // Exclude password from response
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            user: user
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch user profile'
        });
    }
};

// Update user profile
exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const {
            fullName,
            phone,
            dateOfBirth,
            gender,
            address,
            department,
            semester,
            profileImage
        } = req.body;

        // Find user
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user data
        const updatedUser = await user.update({
            fullName: fullName || user.fullName,
            phone: phone || user.phone,
            dateOfBirth: dateOfBirth || user.dateOfBirth,
            gender: gender || user.gender,
            address: address || user.address,
            department: department || user.department,
            semester: user.role === 'student' ? (semester || user.semester) : user.semester,
            profileImage: profileImage || user.profileImage
        });

        // Return updated user without password
        const { password, ...userWithoutPassword } = updatedUser.toJSON();

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            user: userWithoutPassword
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update profile'
        });
    }
};

// Get current user info (for dashboard greeting)
exports.getCurrentUser = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findByPk(userId, {
            attributes: ['id', 'fullName', 'email', 'role', 'studentId', 'employeeId']
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            user: user
        });
    } catch (error) {
        console.error('Get current user error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch user data'
        });
    }
};

exports.changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    try {
        const user = await User.findByPk(req.user.id); // `req.user.id` set by auth middleware

        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Change password error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Add user (Admin only)
exports.addUser = async (req, res) => {
    try {
        const {
            fullName,
            email,
            phone,
            password,
            role,
            studentId,
            employeeId,
            department,
            semester,
            dateOfBirth,
            gender,
            address
        } = req.body;

        // Ensure photo was uploaded
        if (!req.file || !req.file.path) {
            return res.status(400).json({ message: "Photo is required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            fullName,
            email,
            phone,
            password: hashedPassword,
            role,
            studentId,
            employeeId,
            department,
            semester,
            dateOfBirth,
            gender,
            address,
            profileImage: req.file.path // Cloudinary URL
        });

        res.status(201).json({
            success: true,
            message: "User added successfully",
            user: newUser
        });
    } catch (error) {
        console.error("Add user error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};