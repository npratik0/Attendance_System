import React, { useState } from 'react';
import {
    User,
    Mail,
    Phone,
    Calendar,
    MapPin,
    Users,
    Camera,
    Edit3,
    Save,
    Upload,
    Check,
    X
} from 'lucide-react';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [profileImage, setProfileImage] = useState(null);

    const [formData, setFormData] = useState({
        fullName: 'Pratik Neupane',
        email: 'pratikneupane.com',
        phone: '+977-9812345678',
        dateOfBirth: '2000-05-15',
        gender: 'male',
        address: 'Dillibazar, Kathmandu',
        department: 'computer-science',
        userType: 'student', // This could come from user context
        studentId: 'CS2021001'
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        // Handle save logic here
        console.log('Profile updated:', formData);
        setIsEditing(false);
        showToastMessage('Profile updated successfully!');
    };

    const handleCancel = () => {
        setIsEditing(false);
        // Reset form data to original values if needed
    };

    const showToastMessage = (message) => {
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Toast Notification */}
            {showToast && (
                <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 transform transition-all duration-300">
                    <Check className="w-5 h-5" />
                    <span>{toastMessage}</span>
                </div>
            )}

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Profile Settings</h1>
                        <p className="text-gray-600">Manage your account information</p>
                    </div>

                    {/* Main Profile Card */}
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                        {/* Profile Header Section */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12 relative">
                            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                                {/* Profile Picture */}
                                <div className="relative">
                                    <div className="w-32 h-32 rounded-full bg-white p-1 shadow-lg">
                                        {profileImage ? (
                                            <img
                                                src={profileImage}
                                                alt="Profile"
                                                className="w-full h-full rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
                                                <User className="w-16 h-16 text-gray-400" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Camera Upload Button */}
                                    <label className="absolute bottom-2 right-2 bg-white rounded-full p-2 cursor-pointer shadow-lg hover:bg-gray-50 transition-colors">
                                        <Camera className="w-4 h-4 text-gray-600" />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                        />
                                    </label>
                                </div>

                                {/* Profile Info */}
                                <div className="text-center md:text-left">
                                    <h2 className="text-2xl font-bold text-white mb-2">{formData.fullName}</h2>
                                    <p className="text-blue-100 mb-1">{formData.email}</p>
                                    <div className="flex items-center justify-center md:justify-start space-x-2 text-blue-100">
                                        <Users className="w-4 h-4" />
                                        <span className="capitalize">{formData.userType}</span>
                                        <span>•</span>
                                        <span>{formData.userType === 'student' ? formData.studentId : 'ID: ' + formData.employeeId}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Edit/Save Buttons */}
                            <div className="absolute top-6 right-6">
                                {!isEditing ? (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200"
                                    >
                                        <Edit3 className="w-4 h-4" />
                                        <span>Edit Profile</span>
                                    </button>
                                ) : (
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={handleSave}
                                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200"
                                        >
                                            <Save className="w-4 h-4" />
                                            <span>Save</span>
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200"
                                        >
                                            <X className="w-4 h-4" />
                                            <span>Cancel</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Profile Form Section */}
                        <div className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                            disabled={!isEditing}
                                            className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg transition-all duration-200 ${isEditing
                                                ? 'focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                                : 'bg-gray-50 cursor-not-allowed'
                                                }`}
                                        />
                                    </div>
                                </div>

                                {/* Email (Read-only) */}
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
                                            value={formData.email}
                                            disabled
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                                        />
                                    </div>
                                </div>

                                {/* Phone Number */}
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
                                            disabled={!isEditing}
                                            className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg transition-all duration-200 ${isEditing
                                                ? 'focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                                : 'bg-gray-50 cursor-not-allowed'
                                                }`}
                                        />
                                    </div>
                                </div>

                                {/* Date of Birth */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Date of Birth
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Calendar className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="date"
                                            name="dateOfBirth"
                                            value={formData.dateOfBirth}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg transition-all duration-200 ${isEditing
                                                ? 'focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                                : 'bg-gray-50 cursor-not-allowed'
                                                }`}
                                        />
                                    </div>
                                </div>

                                {/* Gender */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Gender
                                    </label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className={`w-full px-3 py-3 border border-gray-300 rounded-lg transition-all duration-200 ${isEditing
                                            ? 'focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                            : 'bg-gray-50 cursor-not-allowed'
                                            }`}
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                        <option value="prefer-not-to-say">Prefer not to say</option>
                                    </select>
                                </div>

                                {/* Department */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Department
                                    </label>
                                    <select
                                        name="department"
                                        value={formData.department}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className={`w-full px-3 py-3 border border-gray-300 rounded-lg transition-all duration-200 ${isEditing
                                            ? 'focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                            : 'bg-gray-50 cursor-not-allowed'
                                            }`}
                                    >
                                        <option value="computer-science">Computer Science</option>
                                        <option value="information-technology">Information Technology</option>
                                        <option value="electronics">Electronics</option>
                                        <option value="mechanical">Mechanical</option>
                                        <option value="civil">Civil</option>
                                        <option value="electrical">Electrical</option>
                                    </select>
                                </div>
                            </div>

                            {/* Address (Full Width) */}
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Address
                                </label>
                                <div className="relative">
                                    <div className="absolute top-3 left-3 pointer-events-none">
                                        <MapPin className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        rows={3}
                                        className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg transition-all duration-200 resize-none ${isEditing
                                            ? 'focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                            : 'bg-gray-50 cursor-not-allowed'
                                            }`}
                                        placeholder="Enter your full address"
                                    />
                                </div>
                            </div>

                            {/* Save Button (Mobile) */}
                            {isEditing && (
                                <div className="mt-8 flex flex-col sm:flex-row gap-4 md:hidden">
                                    <button
                                        onClick={handleSave}
                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center space-x-2"
                                    >
                                        <Save className="w-5 h-5" />
                                        <span>Save Changes</span>
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2"
                                    >
                                        <X className="w-5 h-5" />
                                        <span>Cancel</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Additional Cards for Future Features */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        {/* Security Settings Card */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Security Settings</h3>
                            <div className="space-y-3">
                                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                                    <div className="font-medium text-gray-800">Change Password</div>
                                    <div className="text-sm text-gray-500">Update your account password</div>
                                </button>
                                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                                    <div className="font-medium text-gray-800">Two-Factor Authentication</div>
                                    <div className="text-sm text-gray-500">Add an extra layer of security</div>
                                </button>
                            </div>
                        </div>

                        {/* Face Recognition Card */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Face Recognition</h3>
                            <div className="space-y-3">
                                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                                    <div className="font-medium text-gray-800">Update Face Data</div>
                                    <div className="text-sm text-gray-500">Retrain your face recognition model</div>
                                </button>
                                <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                                    <div className="font-medium text-green-800">Status: Active</div>
                                    <div className="text-sm text-green-600">Face recognition is working properly</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;