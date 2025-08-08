import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
    Camera,
    User,
    Bell,
    ChevronDown,
    Home,
    Users,
    ClipboardList,
    MessageSquare,
    LogOut,
    Menu,
    X,
    Calendar,
    Clock,
    BookOpen,
    CheckCircle,
    XCircle,
    BarChart3,
    Settings,
    FileText,
    Search,
    Edit,
    Trash2,
    Download,
    Filter,
    Check,
    AlertCircle,
    TrendingUp,
    PieChart,
    Eye,
    Mail
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';

// AdminNavbar Component
const AdminNavbar = ({ onProfileClick, onNotificationClick }) => {
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
        if (isLoggedIn !== 'true') {
            navigate('/admin-login');
        }
    }, [navigate]);

    return (
        <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo Section */}
                    <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                            <Camera className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <span className="text-xl font-bold text-gray-800">ClockinGo</span>
                            <p className="text-xs text-gray-500 hidden sm:block">Admin Dashboard</p>
                        </div>
                    </div>

                    {/* Desktop Right Section */}
                    <div className="hidden md:flex items-center space-x-4">
                        {/* Notifications */}
                        <button
                            onClick={onNotificationClick}
                            className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                        >
                            <Bell className="w-5 h-5" />
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                5
                            </span>
                        </button>

                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                                className="flex items-center space-x-2 p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                            >
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                                    <User className="w-4 h-4 text-white" />
                                </div>
                                <ChevronDown className="w-4 h-4" />
                            </button>

                            {showProfileDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                                    <button
                                        onClick={onProfileClick}
                                        className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                                    >
                                        <User className="w-4 h-4" />
                                        <span>Profile</span>
                                    </button>
                                    <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                                        <Settings className="w-4 h-4" />
                                        <span>Settings</span>
                                    </button>
                                    <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                                        <LogOut className="w-4 h-4" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-200">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <button className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 font-medium">
                                Notifications
                            </button>
                            <button className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 font-medium">
                                Profile
                            </button>
                            <button className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 font-medium">
                                Settings
                            </button>
                            <button className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 font-medium">
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

// Sidebar Component
const Sidebar = ({ activeTab, setActiveTab, isMobile, isOpen, setIsOpen }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'users', label: 'Manage Users', icon: Users },
        { id: 'attendance', label: 'Attendance Overview', icon: ClipboardList },
        { id: 'tickets', label: 'Tickets / Leave Requests', icon: MessageSquare },
        { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
        { id: 'messages', label: 'Messages', icon: Mail },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
        if (isMobile) {
            setIsOpen(false);
        }
    };

    if (isMobile) {
        return (
            <>
                {/* Mobile Overlay */}
                {isOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-20"
                        onClick={() => setIsOpen(false)}
                    />
                )}

                {/* Mobile Sidebar */}
                <div className={`fixed left-0 top-16 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-30 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}>
                    <div className="p-4">
                        <div className="space-y-2">
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => handleTabClick(item.id)}
                                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${activeTab === item.id
                                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                                            }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span>{item.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <div className="w-64 bg-white shadow-lg border-r border-gray-200 h-full">
            <div className="p-4">
                <div className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${activeTab === item.id
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span>{item.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

// Dashboard Content Component
const DashboardContent = () => {
    const stats = [
        { label: 'Total Students', value: '1,234', icon: Users, color: 'from-blue-500 to-blue-600', change: '+12%' },
        { label: 'Total Teachers', value: '87', icon: BookOpen, color: 'from-green-500 to-green-600', change: '+5%' },
        { label: 'Classes Today', value: '45', icon: Calendar, color: 'from-purple-500 to-purple-600', change: '+3%' },
        { label: 'Attendance Today', value: '89%', icon: CheckCircle, color: 'from-orange-500 to-orange-600', change: '+2%' },
    ];

    const weeklyAttendanceData = [
        { name: 'Mon', attendance: 85 },
        { name: 'Tue', attendance: 92 },
        { name: 'Wed', attendance: 78 },
        { name: 'Thu', attendance: 89 },
        { name: 'Fri', attendance: 95 },
        { name: 'Sat', attendance: 71 },
        { name: 'Sun', attendance: 83 },
    ];

    const userRatioData = [
        { name: 'Students', value: 1234, color: '#3B82F6' },
        { name: 'Teachers', value: 87, color: '#8B5CF6' },
    ];

    const recentActivities = [
        { user: 'John Doe', action: 'Logged in', time: '10:30 AM', type: 'login' },
        { user: 'Jane Smith', action: 'Marked attendance', time: '10:15 AM', type: 'attendance' },
        { user: 'Mike Johnson', action: 'Updated profile', time: '9:45 AM', type: 'profile' },
        { user: 'Sarah Wilson', action: 'Submitted leave request', time: '9:30 AM', type: 'leave' },
        { user: 'Tom Brown', action: 'Logged in', time: '9:15 AM', type: 'login' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
                <p className="text-gray-600">Comprehensive overview of your institution's attendance system</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                                    <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                                    <p className="text-sm text-green-600 font-medium mt-1">{stat.change}</p>
                                </div>
                                <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-lg`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Weekly Attendance Chart */}
                <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Weekly Attendance Overview</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={weeklyAttendanceData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="attendance" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* User Ratio Pie Chart - FIXED */}
                <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Student vs Teacher Ratio</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <RechartsPieChart>
                            <Pie
                                data={userRatioData}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                dataKey="value"
                                label={({ name, value }) => `${name}: ${value}`}
                            >
                                {userRatioData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </RechartsPieChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center space-x-4 mt-4">
                        {userRatioData.map((entry, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: entry.color }}></div>
                                <span className="text-sm text-gray-600">{entry.name}: {entry.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Activity Table */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-medium text-gray-600">User</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Action</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Time</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentActivities.map((activity, index) => (
                                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-3 px-4">{activity.user}</td>
                                    <td className="py-3 px-4">{activity.action}</td>
                                    <td className="py-3 px-4 text-gray-600">{activity.time}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${activity.type === 'login' ? 'bg-blue-100 text-blue-800' :
                                            activity.type === 'attendance' ? 'bg-green-100 text-green-800' :
                                                activity.type === 'profile' ? 'bg-purple-100 text-purple-800' :
                                                    'bg-orange-100 text-orange-800'
                                            }`}>
                                            {activity.type}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// Manage Users Content Component
const ManageUsersContent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [editingUser, setEditingUser] = useState(null);
    const [editForm, setEditForm] = useState({ name: '', email: '' });
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const navigate = useNavigate();

    const [users, setUsers] = useState([
        { id: 1, name: 'Pratik Neupane', email: 'pratikneupane@email.com', role: 'Student' },
        { id: 2, name: 'Anki Sharma', email: 'ankitsharma@email.com', role: 'Teacher' },
        { id: 3, name: 'Binnol Dahal', email: 'binnoln@email.com', role: 'Student' },
        { id: 4, name: 'Samikshaya Baniya', email: 'samikshyabaniya@email.com', role: 'Teacher' },
        { id: 5, name: 'Shreeya Paudel', email: 'shreeyapaudeln@email.com', role: 'Student' },
        { id: 6, name: 'Nirjal Adhikari', email: 'nirjaladhikari@email.com', role: 'Student' },
        { id: 7, name: 'Manoj Shrestha', email: 'manojshrestha@email.com', role: 'Teacher' },
        { id: 8, name: 'Ram Adhikari', email: 'ramadhikari@email.com', role: 'Student' },
    ]);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle edit button click
    const handleEditClick = (user) => {
        setEditingUser(user.id);
        setEditForm({
            name: user.name,
            email: user.email
        });
    };

    // Handle edit form changes
    const handleEditChange = (e) => {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value
        });
    };

    // Save edited user
    const handleSaveEdit = () => {
        setUsers(users.map(user =>
            user.id === editingUser
                ? { ...user, name: editForm.name, email: editForm.email }
                : user
        ));
        setEditingUser(null);
        setEditForm({ name: '', email: '' });
    };

    // Cancel editing
    const handleCancelEdit = () => {
        setEditingUser(null);
        setEditForm({ name: '', email: '' });
    };

    // Handle delete button click
    const handleDeleteClick = (userId) => {
        setShowDeleteConfirm(userId);
    };

    // Confirm delete user
    const handleConfirmDelete = () => {
        setUsers(users.filter(user => user.id !== showDeleteConfirm));
        setShowDeleteConfirm(null);
    };

    // Cancel delete
    const handleCancelDelete = () => {
        setShowDeleteConfirm(null);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Manage Users</h1>
                <p className="text-gray-600">Manage all students and teachers in the system</p>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
                <div className="flex items-center space-x-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search users by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <button onClick={() => navigate("/signup")}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-200">
                        Add User
                    </button>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
                <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-medium text-gray-600">ID</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Name</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Email</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Role</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-3 px-4">{user.id}</td>

                                    {/* Editable Name Field */}
                                    <td className="py-3 px-4">
                                        {editingUser === user.id ? (
                                            <input
                                                type="text"
                                                name="name"
                                                value={editForm.name}
                                                onChange={handleEditChange}
                                                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                autoFocus
                                            />
                                        ) : (
                                            <span className="font-medium">{user.name}</span>
                                        )}
                                    </td>

                                    {/* Editable Email Field */}
                                    <td className="py-3 px-4">
                                        {editingUser === user.id ? (
                                            <input
                                                type="email"
                                                name="email"
                                                value={editForm.email}
                                                onChange={handleEditChange}
                                                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        ) : (
                                            <span className="text-gray-600">{user.email}</span>
                                        )}
                                    </td>

                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.role === 'Teacher' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                            {user.role}
                                        </span>
                                    </td>

                                    {/* Actions Column */}
                                    <td className="py-3 px-4">
                                        {editingUser === user.id ? (
                                            // Save/Cancel buttons when editing
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={handleSaveEdit}
                                                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors duration-200"
                                                    title="Save Changes"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={handleCancelEdit}
                                                    className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition-colors duration-200"
                                                    title="Cancel Editing"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            // Edit/Delete buttons when not editing
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleEditClick(user)}
                                                    className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-100 rounded transition-colors duration-200"
                                                    title="Edit User"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(user.id)}
                                                    className="text-red-600 hover:text-red-800 p-1 hover:bg-red-100 rounded transition-colors duration-200"
                                                    title="Delete User"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredUsers.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                            <p>No users found</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                    <Trash2 className="w-5 h-5 text-red-600" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">Delete User</h3>
                                <p className="text-sm text-gray-500">Are you sure you want to delete this user? This action cannot be undone.</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-3 mb-4">
                            {(() => {
                                const user = users.find(u => u.id === showDeleteConfirm);
                                return user ? (
                                    <div>
                                        <p className="font-medium text-gray-900">{user.name}</p>
                                        <p className="text-sm text-gray-600">{user.email}</p>
                                        <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${user.role === 'Teacher' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                            {user.role}
                                        </span>
                                    </div>
                                ) : null;
                            })()}
                        </div>

                        <div className="flex space-x-3">
                            <button
                                onClick={handleConfirmDelete}
                                className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
                            >
                                Delete User
                            </button>
                            <button
                                onClick={handleCancelDelete}
                                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200 font-medium"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Attendance Overview Content Component
const AttendanceOverviewContent = () => {
    const attendanceData = [
        { date: '2024-01-15', class: 'Computer Science 101', teacher: 'Dr. Smith', total: 45, present: 42, absent: 3 },
        { date: '2024-01-15', class: 'Mathematics', teacher: 'Prof. Johnson', total: 38, present: 35, absent: 3 },
        { date: '2024-01-15', class: 'Physics', teacher: 'Dr. Wilson', total: 32, present: 30, absent: 2 },
        { date: '2024-01-14', class: 'Chemistry', teacher: 'Prof. Brown', total: 40, present: 37, absent: 3 },
        { date: '2024-01-14', class: 'Biology', teacher: 'Dr. Davis', total: 35, present: 33, absent: 2 },
        { date: '2024-01-14', class: 'English', teacher: 'Prof. Lee', total: 42, present: 39, absent: 3 },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Attendance Overview</h1>
                <p className="text-gray-600">Comprehensive view of attendance across all classes</p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center space-x-2">
                        <Filter className="w-5 h-5 text-gray-400" />
                        <span className="text-sm font-medium text-gray-600">Filters:</span>
                    </div>
                    <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>All Dates</option>
                        <option>Today</option>
                        <option>This Week</option>
                        <option>This Month</option>
                    </select>
                    <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>All Teachers</option>
                        <option>Dr. Smith</option>
                        <option>Prof. Johnson</option>
                        <option>Dr. Wilson</option>
                    </select>
                    <div className="flex space-x-2 ml-auto">
                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2">
                            <Download className="w-4 h-4" />
                            <span>Excel</span>
                        </button>
                        <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center space-x-2">
                            <Download className="w-4 h-4" />
                            <span>PDF</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Attendance Table */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
                <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Class</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Teacher</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Total Students</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Present</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Absent</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Percentage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceData.map((record, index) => (
                                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-3 px-4">{record.date}</td>
                                    <td className="py-3 px-4 font-medium">{record.class}</td>
                                    <td className="py-3 px-4">{record.teacher}</td>
                                    <td className="py-3 px-4">{record.total}</td>
                                    <td className="py-3 px-4 text-green-600 font-medium">{record.present}</td>
                                    <td className="py-3 px-4 text-red-600 font-medium">{record.absent}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${Math.round((record.present / record.total) * 100) >= 90
                                            ? 'bg-green-100 text-green-800'
                                            : Math.round((record.present / record.total) * 100) >= 75
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : 'bg-red-100 text-red-800'
                                            }`}>
                                            {Math.round((record.present / record.total) * 100)}%
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// Tickets/Leave Requests Content Component
// const TicketsContent = () => {
//     const [filterStatus, setFilterStatus] = useState('all');

//     const tickets = [
//         { id: 'T001', student: 'John Doe', reason: 'Medical Emergency', date: '2024-01-15', status: 'pending' },
//         { id: 'T002', student: 'Jane Smith', reason: 'Family Function', date: '2024-01-14', status: 'approved' },
//         { id: 'T003', student: 'Mike Johnson', reason: 'Personal Work', date: '2024-01-14', status: 'rejected' },
//         { id: 'T004', student: 'Sarah Wilson', reason: 'Medical Appointment', date: '2024-01-13', status: 'pending' },
//         { id: 'T005', student: 'Tom Brown', reason: 'Job Interview', date: '2024-01-12', status: 'approved' },
//         { id: 'T006', student: 'Emily Davis', reason: 'Wedding Ceremony', date: '2024-01-11', status: 'pending' },
//     ];

//     const filteredTickets = filterStatus === 'all'
//         ? tickets
//         : tickets.filter(ticket => ticket.status === filterStatus);

//     const handleApprove = (ticketId) => {
//         alert(`Ticket ${ticketId} approved!`);
//     };

//     const handleReject = (ticketId) => {
//         alert(`Ticket ${ticketId} rejected!`);
//     };

//     return (
//         <div className="space-y-6">
//             <div>
//                 <h1 className="text-2xl font-bold text-gray-800 mb-2">Tickets / Leave Requests</h1>
//                 <p className="text-gray-600">Manage student leave requests and support tickets</p>
//             </div>

//             {/* Filter Section */}
//             <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
//                 <div className="flex items-center space-x-4">
//                     <span className="text-sm font-medium text-gray-600">Filter by Status:</span>
//                     <div className="flex space-x-2">
//                         <button
//                             onClick={() => setFilterStatus('all')}
//                             className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${filterStatus === 'all'
//                                 ? 'bg-blue-100 text-blue-800'
//                                 : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                                 }`}
//                         >
//                             All
//                         </button>
//                         <button
//                             onClick={() => setFilterStatus('pending')}
//                             className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${filterStatus === 'pending'
//                                 ? 'bg-yellow-100 text-yellow-800'
//                                 : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                                 }`}
//                         >
//                             Pending
//                         </button>
//                         <button
//                             onClick={() => setFilterStatus('approved')}
//                             className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${filterStatus === 'approved'
//                                 ? 'bg-green-100 text-green-800'
//                                 : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                                 }`}
//                         >
//                             Approved
//                         </button>
//                         <button
//                             onClick={() => setFilterStatus('rejected')}
//                             className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${filterStatus === 'rejected'
//                                 ? 'bg-red-100 text-red-800'
//                                 : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                                 }`}
//                         >
//                             Rejected
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Tickets Table */}
//             <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
//                 <div className="overflow-x-auto">
//                     <table className="w-full table-auto">
//                         <thead>
//                             <tr className="border-b border-gray-200">
//                                 <th className="text-left py-3 px-4 font-medium text-gray-600">Ticket ID</th>
//                                 <th className="text-left py-3 px-4 font-medium text-gray-600">Student</th>
//                                 <th className="text-left py-3 px-4 font-medium text-gray-600">Reason</th>
//                                 <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
//                                 <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
//                                 <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {filteredTickets.map((ticket) => (
//                                 <tr key={ticket.id} className="border-b border-gray-100 hover:bg-gray-50">
//                                     <td className="py-3 px-4 font-medium">{ticket.id}</td>
//                                     <td className="py-3 px-4">{ticket.student}</td>
//                                     <td className="py-3 px-4">{ticket.reason}</td>
//                                     <td className="py-3 px-4 text-gray-600">{ticket.date}</td>
//                                     <td className="py-3 px-4">
//                                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${ticket.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
//                                             ticket.status === 'approved' ? 'bg-green-100 text-green-800' :
//                                                 'bg-red-100 text-red-800'
//                                             }`}>
//                                             {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
//                                         </span>
//                                     </td>
//                                     <td className="py-3 px-4">
//                                         {ticket.status === 'pending' ? (
//                                             <div className="flex space-x-2">
//                                                 <button
//                                                     onClick={() => handleApprove(ticket.id)}
//                                                     className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-700 transition-colors duration-200 flex items-center space-x-1"
//                                                 >
//                                                     <Check className="w-3 h-3" />
//                                                     <span>Approve</span>
//                                                 </button>
//                                                 <button
//                                                     onClick={() => handleReject(ticket.id)}
//                                                     className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700 transition-colors duration-200 flex items-center space-x-1"
//                                                 >
//                                                     <X className="w-3 h-3" />
//                                                     <span>Reject</span>
//                                                 </button>
//                                             </div>
//                                         ) : (
//                                             <button className="text-blue-600 hover:text-blue-800 p-1">
//                                                 <Eye className="w-4 h-4" />
//                                             </button>
//                                         )}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };




// const TicketsContent = () => {
//     const [filterStatus, setFilterStatus] = useState('all');
//     const [tickets, setTickets] = useState([]);

//     const fetchTickets = async () => {
//         try {
//             const res = await axios.get('http://localhost:5000/api/tickets');
//             setTickets(res.data.tickets); // Assuming backend returns { tickets: [...] }
//         } catch (error) {
//             console.error('Error fetching tickets:', error);
//         }
//     };

//     const updateStatus = async (ticketId, newStatus) => {
//         try {
//             await axios.patch(`http://localhost:5000/api/tickets/${ticketId}`, {
//                 status: newStatus,
//             });
//             fetchTickets(); // Refresh list after update
//         } catch (error) {
//             console.error(`Failed to update ticket ${ticketId}`, error);
//         }
//     };

//     useEffect(() => {
//         fetchTickets();
//     }, []);

//     const filteredTickets =
//         filterStatus === 'all'
//             ? tickets
//             : tickets.filter((ticket) => ticket.status === filterStatus);

//     const handleApprove = (ticketId) => {
//         updateStatus(ticketId, 'approved');
//     };

//     const handleReject = (ticketId) => {
//         updateStatus(ticketId, 'rejected');
//     };

//     return (
//         <div className="space-y-6">
//             <div>
//                 <h1 className="text-2xl font-bold text-gray-800 mb-2">Tickets / Leave Requests</h1>
//                 <p className="text-gray-600">Manage student leave requests and support tickets</p>
//             </div>

//             {/* Filter Section */}
//             <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
//                 <div className="flex items-center space-x-4">
//                     <span className="text-sm font-medium text-gray-600">Filter by Status:</span>
//                     <div className="flex space-x-2">
//                         {['all', 'pending', 'approved', 'rejected'].map((status) => (
//                             <button
//                                 key={status}
//                                 onClick={() => setFilterStatus(status)}
//                                 className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${filterStatus === status
//                                     ? status === 'approved'
//                                         ? 'bg-green-100 text-green-800'
//                                         : status === 'pending'
//                                             ? 'bg-yellow-100 text-yellow-800'
//                                             : status === 'rejected'
//                                                 ? 'bg-red-100 text-red-800'
//                                                 : 'bg-blue-100 text-blue-800'
//                                     : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                                     }`}
//                             >
//                                 {status.charAt(0).toUpperCase() + status.slice(1)}
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             {/* Tickets Table */}
//             <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
//                 <div className="overflow-x-auto">
//                     <table className="w-full table-auto">
//                         <thead>
//                             <tr className="border-b border-gray-200">
//                                 <th className="text-left py-3 px-4 font-medium text-gray-600">Ticket ID</th>
//                                 <th className="text-left py-3 px-4 font-medium text-gray-600">Student</th>
//                                 <th className="text-left py-3 px-4 font-medium text-gray-600">Reason</th>
//                                 <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
//                                 <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
//                                 <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {filteredTickets.map((ticket) => (
//                                 <tr key={ticket.id} className="border-b border-gray-100 hover:bg-gray-50">
//                                     <td className="py-3 px-4 font-medium">{ticket.id}</td>
//                                     <td className="py-3 px-4">{ticket.fullName}</td>
//                                     <td className="py-3 px-4">{ticket.reason}</td>
//                                     <td className="py-3 px-4 text-gray-600">
//                                         {new Date(ticket.date).toLocaleDateString()}
//                                     </td>
//                                     <td className="py-3 px-4">
//                                         <span
//                                             className={`px-2 py-1 rounded-full text-xs font-medium ${ticket.status === 'pending'
//                                                 ? 'bg-yellow-100 text-yellow-800'
//                                                 : ticket.status === 'approved'
//                                                     ? 'bg-green-100 text-green-800'
//                                                     : 'bg-red-100 text-red-800'
//                                                 }`}
//                                         >
//                                             {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
//                                         </span>
//                                     </td>
//                                     <td className="py-3 px-4">
//                                         {ticket.status === 'pending' ? (
//                                             <div className="flex space-x-2">
//                                                 <button
//                                                     onClick={() => handleApprove(ticket.id)}
//                                                     className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-700 transition-colors duration-200 flex items-center space-x-1"
//                                                 >
//                                                     <Check className="w-3 h-3" />
//                                                     <span>Approve</span>
//                                                 </button>
//                                                 <button
//                                                     onClick={() => handleReject(ticket.id)}
//                                                     className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700 transition-colors duration-200 flex items-center space-x-1"
//                                                 >
//                                                     <X className="w-3 h-3" />
//                                                     <span>Reject</span>
//                                                 </button>
//                                             </div>
//                                         ) : (
//                                             <button className="text-blue-600 hover:text-blue-800 p-1">
//                                                 <Eye className="w-4 h-4" />
//                                             </button>
//                                         )}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };

const TicketsContent = () => {
    const [filterStatus, setFilterStatus] = useState('all');
    const [tickets, setTickets] = useState([]);

    const fetchTickets = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/tickets');
            setTickets(res.data.tickets); // Assuming backend returns { tickets: [...] }
        } catch (error) {
            console.error('Error fetching tickets:', error);
        }
    };

    const updateStatus = async (ticketId, newStatus) => {
        try {
            await axios.patch(`http://localhost:5000/api/tickets/${ticketId}`, {
                status: newStatus,
            });
            fetchTickets(); // Refresh list after update
        } catch (error) {
            console.error(`Failed to update ticket ${ticketId}`, error);
        }
    };

    // Frontend-only status update (since you want to hardcode for now)
    const updateTicketStatusLocal = (ticketId, newStatus) => {
        setTickets(prevTickets =>
            prevTickets.map(ticket =>
                ticket.id === ticketId
                    ? { ...ticket, status: newStatus }
                    : ticket
            )
        );
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    const filteredTickets =
        filterStatus === 'all'
            ? tickets
            : tickets.filter((ticket) => ticket.status.toLowerCase() === filterStatus);

    const handleApprove = (ticketId) => {
        // Frontend-only update (as requested)
        updateTicketStatusLocal(ticketId, 'approved');

        // Uncomment this line when you want to update backend as well:
        // updateStatus(ticketId, 'approved');
    };

    const handleReject = (ticketId) => {
        // Frontend-only update (as requested)
        updateTicketStatusLocal(ticketId, 'rejected');

        // Uncomment this line when you want to update backend as well:
        // updateStatus(ticketId, 'rejected');
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Tickets / Leave Requests</h1>
                <p className="text-gray-600">Manage student leave requests and support tickets</p>
            </div>

            {/* Filter Section */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
                <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-600">Filter by Status:</span>
                    <div className="flex space-x-2">
                        {['all', 'pending', 'approved', 'rejected'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${filterStatus === status
                                    ? status === 'approved'
                                        ? 'bg-green-100 text-green-800'
                                        : status === 'pending'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : status === 'rejected'
                                                ? 'bg-red-100 text-red-800'
                                                : 'bg-blue-100 text-blue-800'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tickets Table */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
                <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Ticket ID</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Student</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Subject</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Reason</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTickets.map((ticket) => (
                                <tr key={ticket.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-3 px-4 font-medium">#{ticket.id}</td>
                                    <td className="py-3 px-4">
                                        <div>
                                            <div className="font-medium">{ticket.fullName}</div>
                                            <div className="text-sm text-gray-500">{ticket.studentId}</div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">{ticket.subject || 'N/A'}</td>
                                    <td className="py-3 px-4">
                                        <span className="capitalize">{ticket.reason}</span>
                                    </td>
                                    <td className="py-3 px-4 text-gray-600">
                                        {new Date(ticket.date).toLocaleDateString()}
                                    </td>
                                    <td className="py-3 px-4">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${ticket.status.toLowerCase() === 'pending'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : ticket.status.toLowerCase() === 'approved'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                }`}
                                        >
                                            {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center space-x-2">
                                            {ticket.status.toLowerCase() === 'pending' ? (
                                                <>
                                                    <button
                                                        onClick={() => handleApprove(ticket.id)}
                                                        className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-700 transition-colors duration-200 flex items-center space-x-1"
                                                        title="Approve Ticket"
                                                    >
                                                        <Check className="w-3 h-3" />
                                                        <span>Approve</span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(ticket.id)}
                                                        className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700 transition-colors duration-200 flex items-center space-x-1"
                                                        title="Reject Ticket"
                                                    >
                                                        <X className="w-3 h-3" />
                                                        <span>Reject</span>
                                                    </button>
                                                </>
                                            ) : (
                                                <div className="flex items-center space-x-2">
                                                    {/* Show a tick mark for approved tickets */}
                                                    {ticket.status.toLowerCase() === 'approved' && (
                                                        <div className="flex items-center space-x-1 text-green-600">
                                                            <Check className="w-4 h-4" />
                                                            <span className="text-sm font-medium">Approved</span>
                                                        </div>
                                                    )}
                                                    {/* Show an X mark for rejected tickets */}
                                                    {ticket.status.toLowerCase() === 'rejected' && (
                                                        <div className="flex items-center space-x-1 text-red-600">
                                                            <X className="w-4 h-4" />
                                                            <span className="text-sm font-medium">Rejected</span>
                                                        </div>
                                                    )}
                                                    {/* View details button */}
                                                    <button
                                                        className="text-blue-600 hover:text-blue-800 p-1"
                                                        title="View Details"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredTickets.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                            <p>No tickets found</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};



// Reports & Analytics Content Component
const ReportsContent = () => {
    const monthlyData = [
        { month: 'Jan', attendance: 87 },
        { month: 'Feb', attendance: 91 },
        { month: 'Mar', attendance: 84 },
        { month: 'Apr', attendance: 89 },
        { month: 'May', attendance: 93 },
        { month: 'Jun', attendance: 88 },
    ];

    const classPerformanceData = [
        { class: 'CS 101', attendance: 92, color: '#3B82F6' },
        { class: 'Math', attendance: 87, color: '#10B981' },
        { class: 'Physics', attendance: 84, color: '#8B5CF6' },
        { class: 'Chemistry', attendance: 89, color: '#F59E0B' },
        { class: 'Biology', attendance: 91, color: '#EF4444' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Reports & Analytics</h1>
                <p className="text-gray-600">Detailed analytics and reports for attendance management</p>
            </div>

            {/* Download Reports Section */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Download Reports</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-3">
                        <Download className="w-5 h-5" />
                        <div className="text-left">
                            <div className="font-medium">Monthly Report</div>
                            <div className="text-sm opacity-90">Detailed monthly analysis</div>
                        </div>
                    </button>
                    <button className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-4 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-3">
                        <Download className="w-5 h-5" />
                        <div className="text-left">
                            <div className="font-medium">Class-wise Report</div>
                            <div className="text-sm opacity-90">Individual class performance</div>
                        </div>
                    </button>
                    <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-3">
                        <Download className="w-5 h-5" />
                        <div className="text-left">
                            <div className="font-medium">Student Report</div>
                            <div className="text-sm opacity-90">Individual student records</div>
                        </div>
                    </button>
                </div>
            </div>

            {/* Analytics Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Attendance Trend */}
                <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Attendance Trend</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="attendance" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Class Performance */}
                <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Class Performance</h2>
                    <div className="space-y-4">
                        {classPerformanceData.map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className={`w-4 h-4 rounded-full`} style={{ backgroundColor: item.color }}></div>
                                    <span className="font-medium text-gray-800">{item.class}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-32 bg-gray-200 rounded-full h-2">
                                        <div
                                            className="h-2 rounded-full transition-all duration-300"
                                            style={{
                                                width: `${item.attendance}%`,
                                                backgroundColor: item.color
                                            }}
                                        ></div>
                                    </div>
                                    <span className="text-sm font-medium text-gray-600 w-12">{item.attendance}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Key Metrics</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">89.2%</div>
                        <div className="text-sm text-gray-600">Average Attendance</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">156</div>
                        <div className="text-sm text-gray-600">Classes Conducted</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600">1,234</div>
                        <div className="text-sm text-gray-600">Total Students</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-orange-600">87</div>
                        <div className="text-sm text-gray-600">Active Teachers</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Messages Content Component
const MessagesContent = () => {
    const messages = [
        { id: 1, from: 'Ankit Sharma', subject: 'Attendance Query', time: '10:30 AM', unread: true },
        { id: 2, from: 'Pratik Neupane', subject: 'Technical Issue', time: '9:45 AM', unread: true },
        { id: 3, from: 'Shreeya Paudel', subject: 'Leave Request Follow-up', time: '9:15 AM', unread: false },
        { id: 4, from: 'Shreeya Paudel', subject: 'System Access Problem', time: 'Yesterday', unread: false },
        { id: 5, from: 'Ram Adhikari', subject: 'Feature Request', time: 'Yesterday', unread: false },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Messages</h1>
                <p className="text-gray-600">Manage communications and support requests</p>
            </div>

            {/* Message Inbox */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-100">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-800">Inbox</h2>
                        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200">
                            Compose Message
                        </button>
                    </div>
                </div>
                <div className="divide-y divide-gray-100">
                    {messages.map((message) => (
                        <div key={message.id} className={`p-4 hover:bg-gray-50 cursor-pointer ${message.unread ? 'bg-blue-50' : ''}`}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className={`w-3 h-3 rounded-full ${message.unread ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                                    <div>
                                        <div className={`font-medium ${message.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                                            {message.from}
                                        </div>
                                        <div className={`text-sm ${message.unread ? 'text-gray-800' : 'text-gray-600'}`}>
                                            {message.subject}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-500">{message.time}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Settings Content Component
const SettingsContent = () => (
    <div className="space-y-6">
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Settings</h1>
            <p className="text-gray-600">Configure system settings and preferences</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-8 text-center">
            <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">System Settings</h2>
            <p className="text-gray-600 mb-6">Configure application settings and preferences</p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-gray-800 font-medium">Feature Coming Soon!</p>
                <p className="text-gray-600 text-sm mt-1">
                    Advanced system configuration options will be available here
                </p>
            </div>
        </div>
    </div>
);

// Footer Component
const Footer = () => (
    <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-1 rounded">
                        <Camera className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm text-gray-600">© 2024 ClockinGo. All rights reserved.</span>
                </div>
                <div className="text-sm text-gray-500">
                    Version 1.0.0
                </div>
            </div>
        </div>
    </footer>
);

// Main AdminDashboard Component
const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setIsMobileSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <DashboardContent />;
            case 'users':
                return <ManageUsersContent />;
            case 'attendance':
                return <AttendanceOverviewContent />;
            case 'tickets':
                return <TicketsContent />;
            case 'reports':
                return <ReportsContent />;
            case 'messages':
                return <MessagesContent />;
            case 'settings':
                return <SettingsContent />;
            default:
                return <DashboardContent />;
        }
    };

    const handleProfileClick = () => {
        alert('Profile page would open here');
    };

    const handleNotificationClick = () => {
        alert('Notifications panel would open here');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
            {/* Navbar */}
            <AdminNavbar
                onProfileClick={handleProfileClick}
                onNotificationClick={handleNotificationClick}
            />

            <div className="flex flex-1">
                {/* Sidebar */}
                <Sidebar
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    isMobile={isMobile}
                    isOpen={isMobileSidebarOpen}
                    setIsOpen={setIsMobileSidebarOpen}
                />

                {/* Main Content */}
                <div className="flex-1 overflow-auto">
                    <div className="p-6">
                        {/* Mobile Menu Button */}
                        {isMobile && (
                            <button
                                onClick={() => setIsMobileSidebarOpen(true)}
                                className="mb-4 p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                            >
                                <Menu className="w-5 h-5" />
                            </button>
                        )}

                        {renderContent()}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default AdminDashboard;