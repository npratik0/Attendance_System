const { User } = require('../models');

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