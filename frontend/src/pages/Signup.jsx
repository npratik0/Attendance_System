import React, { useState } from 'react';
import { User, Lock, Mail, CreditCard, Eye, EyeOff, Camera, Users, GraduationCap, Phone, UserPlus } from 'lucide-react';

const Signup = ({ onSwitchToLogin }) => {
    const [userType, setUserType] = useState('student');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        studentId: '',
        email: '',
        fullName: '',
        phone: '',
        password: '',
        confirmPassword: '',
        department: '',
        semester: '',
        employeeId: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Handle signup logic here
    //     console.log('Signup attempt:', { userType, formData });
    // };

    const handleSubmit = async (e) => {
    e.preventDefault();

    const password = formData.password.trim();
    const confirmPassword = formData.confirmPassword.trim();

    console.log("Password:", password);
    console.log("Confirm:", confirmPassword);

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    const payload = {
    fullName: formData.fullName,
    email: formData.email,
    phone: formData.phone,
    password: formData.password,
    confirmPassword: formData.confirmPassword, // ✅ required
    role: userType,
    department: formData.department
    
    };

    if (userType === 'student') {
    payload.studentId = formData.studentId;
    payload.semester = formData.semester;
    } else {
    payload.employeeId = formData.employeeId;
    }

    try {
        const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
        }

        alert('Account created successfully!');
        onSwitchToLogin();
    } catch (error) {
        console.error('Signup error:', error);
        alert(error.message);
    }
    };



    const toggleUserType = (type) => {
        setUserType(type);
        setFormData({
            studentId: '',
            email: '',
            fullName: '',
            phone: '',
            password: '',
            confirmPassword: '',
            department: '',
            semester: '',
            employeeId: ''
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="flex items-center justify-center min-h-screen px-4 py-8">
                <div className="max-w-md w-full">
                    {/* Main Signup Card */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full w-16 h-16 mx-auto mb-4">
                                <UserPlus className="w-10 h-10 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h1>
                            <p className="text-gray-600">Join the attendance management system</p>
                        </div>

                        {/* User Type Toggle */}
                        <div className="bg-gray-100 rounded-lg p-1 mb-6">
                            <div className="grid grid-cols-2 gap-1">
                                <button
                                    onClick={() => toggleUserType('student')}
                                    className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-md font-medium transition-all duration-200 ${userType === 'student'
                                            ? 'bg-white text-blue-600 shadow-sm'
                                            : 'text-gray-600 hover:text-gray-800'
                                        }`}
                                >
                                    <GraduationCap className="w-4 h-4" />
                                    <span>Student</span>
                                </button>
                                <button
                                    onClick={() => toggleUserType('teacher')}
                                    className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-md font-medium transition-all duration-200 ${userType === 'teacher'
                                            ? 'bg-white text-purple-600 shadow-sm'
                                            : 'text-gray-600 hover:text-gray-800'
                                        }`}
                                >
                                    <Users className="w-4 h-4" />
                                    <span>Teacher</span>
                                </button>
                            </div>
                        </div>

                        {/* Signup Form */}
                        <div className="space-y-4">
                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Enter your full name"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Student ID or Employee ID */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {userType === 'student' ? 'Student ID' : 'Employee ID'}
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <CreditCard className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name={userType === 'student' ? 'studentId' : 'employeeId'}
                                        value={userType === 'student' ? formData.studentId : formData.employeeId}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder={userType === 'student' ? 'Enter your Student ID' : 'Enter your Employee ID'}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Phone className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Enter your phone number"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Department and Semester for Students */}
                            {userType === 'student' && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Department
                                        </label>
                                        <select
                                            name="department"
                                            value={formData.department}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            required
                                        >
                                            <option value="">Select</option>
                                            <option value="computer-science">Computer Science</option>
                                            <option value="information-technology">Information Technology</option>
                                            <option value="electronics">Electronics</option>
                                            <option value="mechanical">Mechanical</option>
                                            <option value="civil">Civil</option>
                                            <option value="electrical">Electrical</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Semester
                                        </label>
                                        <select
                                            name="semester"
                                            value={formData.semester}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            required
                                        >
                                            <option value="">Select</option>
                                            <option value="1">1st Semester</option>
                                            <option value="2">2nd Semester</option>
                                            <option value="3">3rd Semester</option>
                                            <option value="4">4th Semester</option>
                                            <option value="5">5th Semester</option>
                                            <option value="6">6th Semester</option>
                                            <option value="7">7th Semester</option>
                                            <option value="8">8th Semester</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            {/* Department for Teachers */}
                            {userType === 'teacher' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Department
                                    </label>
                                    <select
                                        name="department"
                                        value={formData.department}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        required
                                    >
                                        <option value="">Select Department</option>
                                        <option value="computer-science">Computer Science</option>
                                        <option value="information-technology">Information Technology</option>
                                        <option value="electronics">Electronics</option>
                                        <option value="mechanical">Mechanical</option>
                                        <option value="civil">Civil</option>
                                        <option value="electrical">Electrical</option>
                                    </select>
                                </div>
                            )}

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Create a password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Confirm your password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Create Account Button */}
                            <button
                                onClick={handleSubmit}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg mt-6"
                            >
                                Create Account
                            </button>
                        </div>

                        {/* Login Link */}
                        <div className="text-center mt-6">
                            <p className="text-gray-600">
                                Already have an account?{' '}
                                <button
                                    onClick={onSwitchToLogin}
                                    className="text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Sign in here
                                </button>
                            </p>
                        </div>

                        {/* Features Footer */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                    <Camera className="w-4 h-4" />
                                    <span>Face Recognition</span>
                                </div>
                                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                                <div className="flex items-center space-x-1">
                                    <Lock className="w-4 h-4" />
                                    <span>Secure Registration</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;