import React, { useState } from 'react';
import { User, Lock, Mail, CreditCard, Eye, EyeOff, Camera, Users, GraduationCap } from 'lucide-react';

const Login = ({ onSwitchToSignup }) => {
    const [userType, setUserType] = useState('student');
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        studentId: '',
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async(e) => {
         e.preventDefault();
        try {
            const loginData =
            userType === 'student'
                ? { studentId: formData.studentId, password: formData.password, role: 'student' }
                : { email: formData.email, password: formData.password, role: 'teacher' };

            const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message || 'Login failed');

            localStorage.setItem('token', data.token);
            alert('Login successful!');
            console.log('User:', data.user);
            // Redirect or update state here

        } catch (error) {
            alert(error.message);
            console.error('Login error:', error);
        }
    };

    const toggleUserType = (type) => {
        setUserType(type);
        setFormData({ studentId: '', email: '', password: '' });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="flex items-center justify-center min-h-screen px-4 py-8">
                <div className="max-w-md w-full">
                    {/* Main Login Card */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full w-16 h-16 mx-auto mb-4">
                                <Camera className="w-10 h-10 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h1>
                            <p className="text-gray-600">Sign in to access your attendance dashboard</p>
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

                        {/* Login Form */}
                        <div className="space-y-6">
                            {/* Student ID or Email Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {userType === 'student' ? 'Student ID' : 'Email / Username'}
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        {userType === 'student' ? (
                                            <CreditCard className="w-5 h-5 text-gray-400" />
                                        ) : (
                                            <Mail className="w-5 h-5 text-gray-400" />
                                        )}
                                    </div>
                                    <input
                                        type={userType === 'student' ? 'text' : 'email'}
                                        name={userType === 'student' ? 'studentId' : 'email'}
                                        value={userType === 'student' ? formData.studentId : formData.email}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder={userType === 'student' ? 'Enter your Student ID' : 'Enter your email'}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
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
                                        placeholder="Enter your password"
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

                            {/* Login Button */}
                            <button
                                onClick={handleSubmit}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                            >
                                Sign In
                            </button>
                        </div>

                        {/* Register Link */}
                        <div className="text-center mt-6">
                            <p className="text-gray-600">
                                Don't have an account?{' '}
                                <button
                                    onClick={onSwitchToSignup}
                                    className="text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Register here
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
                                    <span>Secure Access</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;