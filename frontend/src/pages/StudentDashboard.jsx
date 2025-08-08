import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import apiService from '../services/apiService'; // Adjust path as needed
import axios from 'axios';



import {
    Camera,
    User,
    Bell,
    ChevronDown,
    Home,
    BookOpen,
    Clock,
    Ticket,
    LogOut,
    Menu,
    X,
    Calendar,
    CheckCircle,
    XCircle,
    AlertTriangle,
    BarChart3,
    Plus,
    FileText,
    Upload
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// StudentNavbar Component
const StudentNavbar = ({ onProfileClick, onNotificationClick }) => {
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                            <p className="text-xs text-gray-500 hidden sm:block">Student Dashboard</p>
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
                                2
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
                                        <span><Link to="/profile">Profile</Link></span>
                                    </button>
                                    <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                                        <LogOut className="w-4 h-4" />
                                        <span><Link to="/login">Logout</Link></span>
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
        { id: 'attendance', label: 'Subject-wise Attendance', icon: BookOpen },
        { id: 'absence', label: 'Absence History', icon: Clock },
        { id: 'tickets', label: 'Tickets', icon: Ticket },
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

const DashboardContent = () => {
    const [userName, setUserName] = useState('Student');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await apiService.getCurrentUser();
                if (response.success) {
                    // Extract first name from full name
                    const firstName = response.user.fullName.split(' ')[0];
                    setUserName(firstName);
                }
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                // Keep default name if API fails
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const currentHour = new Date().getHours();
    const greeting = currentHour < 12 ? 'Good Morning' : currentHour < 18 ? 'Good Afternoon' : 'Good Evening';

    const stats = [
        { label: 'Overall Attendance', value: '88%', icon: BarChart3, color: 'from-green-500 to-green-600' },
        { label: 'Classes This Week', value: '24', icon: Calendar, color: 'from-blue-500 to-blue-600' },
        { label: 'Present Days', value: '22', icon: CheckCircle, color: 'from-purple-500 to-purple-600' },
        { label: 'Absent Days', value: '2', icon: XCircle, color: 'from-red-500 to-red-600' },
    ];

    const weeklyData = [
        { day: 'Mon', present: 4, absent: 1 },
        { day: 'Tue', present: 5, absent: 0 },
        { day: 'Wed', present: 4, absent: 1 },
        { day: 'Thu', present: 5, absent: 0 },
        { day: 'Fri', present: 4, absent: 1 },
    ];

    const attendanceData = [
        { name: 'Present', value: 92, color: '#10B981' },
        { name: 'Absent', value: 8, color: '#EF4444' }
    ];

    return (
        <div className="space-y-6">
            {/* Welcome Message */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 text-white">
                <h1 className="text-2xl font-bold mb-2">
                    {loading ? 'Loading...' : `${greeting}, ${userName}! 🎯`}
                </h1>
                <p className="text-blue-100">You've attended 88% of your classes this month. Keep it up!</p>
                <div className="mt-4 bg-white bg-opacity-20 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-black">Monthly Goal: 95%</span>
                        <span className="text-sm font-medium text-black"></span>
                    </div>

                    <div className="w-full bg-white bg-opacity-30 rounded-full h-2">
                        <div className="bg-white h-2 rounded-full" style={{ width: '97%' }}></div>
                    </div>
                </div>
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
                                </div>
                                <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-lg`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Weekly Attendance Bar Chart */}
                <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Weekly Attendance</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={weeklyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="present" fill="#10B981" name="Present" />
                            <Bar dataKey="absent" fill="#EF4444" name="Absent" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Overall Attendance Pie Chart */}
                <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Overall Attendance</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={attendanceData}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {attendanceData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center space-x-4 mt-4">
                        {attendanceData.map((entry, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                                <span className="text-sm text-gray-600">{entry.name}: {entry.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
// Subject-wise Attendance Component
const AttendanceContent = () => {
    const subjects = [
        { name: 'Mathematics', total: 30, attended: 28, percentage: 93, status: 'good' },
        { name: 'Physics', total: 25, attended: 23, percentage: 92, status: 'good' },
        { name: 'Computer Science', total: 35, attended: 30, percentage: 86, status: 'warning' },
        { name: 'Chemistry', total: 28, attended: 24, percentage: 86, status: 'warning' },
        { name: 'English', total: 20, attended: 16, percentage: 80, status: 'low' },
        { name: 'History', total: 22, attended: 20, percentage: 91, status: 'good' },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'good': return 'text-green-600 bg-green-100';
            case 'warning': return 'text-yellow-600 bg-yellow-100';
            case 'low': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'good': return <CheckCircle className="w-4 h-4" />;
            case 'warning': return <AlertTriangle className="w-4 h-4" />;
            case 'low': return <XCircle className="w-4 h-4" />;
            default: return <CheckCircle className="w-4 h-4" />;
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Subject-wise Attendance</h1>
                <p className="text-gray-600">Track your attendance across all subjects</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjects.map((subject, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">{subject.name}</h3>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(subject.status)}`}>
                                {getStatusIcon(subject.status)}
                                <span className="capitalize">{subject.status}</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Classes Attended</span>
                                <span className="font-medium">{subject.attended}/{subject.total}</span>
                            </div>

                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className={`h-2 rounded-full ${subject.status === 'good' ? 'bg-green-500' : subject.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`}
                                    style={{ width: `${subject.percentage}%` }}
                                ></div>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-2xl font-bold text-gray-800">{subject.percentage}%</span>
                                <span className="text-sm text-gray-600">Attendance</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Absence History Component
const AbsenceHistoryContent = () => {
    const absenceHistory = [
        { date: '2025-08-02', reason: 'Medical Leave', subjects: ['Mathematics', 'Physics'], excused: true },
        { date: '2025-08-05', reason: 'Family Emergency', subjects: ['Computer Science'], excused: true },
        { date: '2025-04-08', reason: 'No Reason Provided', subjects: ['English', 'History'], excused: false },
        { date: '2025-04-05', reason: 'Sick Leave', subjects: ['Chemistry'], excused: true },
        { date: '2025-01-03', reason: 'Personal Work', subjects: ['Mathematics'], excused: false },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Absence History</h1>
                <p className="text-gray-600">View your complete absence record</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subjects Missed</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {absenceHistory.map((absence, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {new Date(absence.date).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {absence.reason}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        <div className="flex flex-wrap gap-1">
                                            {absence.subjects.map((subject, idx) => (
                                                <span key={idx} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                                    {subject}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${absence.excused
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                            }`}>
                                            {absence.excused ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                            <span>{absence.excused ? 'Excused' : 'Unexcused'}</span>
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

// Tickets Component
// const TicketsContent = () => {
//     const [showCreateForm, setShowCreateForm] = useState(false);
//     const [formData, setFormData] = useState({
//         subject: '',
//         reason: 'absence',
//         date: '',
//         description: ''
//     });

//     const tickets = [
//         { id: 'TKT-001', type: 'Leave Request', subject: 'Mathematics', date: '2024-01-20', status: 'Pending', description: 'Medical appointment' },
//         { id: 'TKT-002', type: 'Absence Report', subject: 'Physics', date: '2024-01-18', status: 'Approved', description: 'Family emergency' },
//         { id: 'TKT-003', type: 'Complaint', subject: 'Computer Science', date: '2024-01-15', status: 'Resolved', description: 'Technical issue with lab equipment' },
//         { id: 'TKT-004', type: 'Leave Request', subject: 'Chemistry', date: '2024-01-12', status: 'Denied', description: 'Personal work' },
//     ];

//     const subjects = ['Mathematics', 'Physics', 'Computer Science', 'Chemistry', 'English', 'History'];

//     const handleInputChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         alert('Ticket submitted successfully!');
//         setShowCreateForm(false);
//         setFormData({ subject: '', reason: 'absence', date: '', description: '' });
//     };

//     const getStatusColor = (status) => {
//         switch (status.toLowerCase()) {
//             case 'pending': return 'bg-yellow-100 text-yellow-800';
//             case 'approved': return 'bg-green-100 text-green-800';
//             case 'resolved': return 'bg-blue-100 text-blue-800';
//             case 'denied': return 'bg-red-100 text-red-800';
//             default: return 'bg-gray-100 text-gray-800';
//         }
//     };

//     return (
//         <div className="space-y-6">
//             <div className="flex justify-between items-center">
//                 <div>
//                     <h1 className="text-2xl font-bold text-gray-800 mb-2">Tickets</h1>
//                     <p className="text-gray-600">Manage your requests and complaints</p>
//                 </div>
//                 <button
//                     onClick={() => setShowCreateForm(!showCreateForm)}
//                     className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
//                 >
//                     <Plus className="w-4 h-4" />
//                     <span>Create Ticket</span>
//                 </button>
//             </div>

//             {/* Create Ticket Form */}
//             {showCreateForm && (
//                 <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
//                     <h2 className="text-lg font-semibold text-gray-800 mb-4">Create New Ticket</h2>
//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Subject (Optional)</label>
//                                 <select
//                                     name="subject"
//                                     value={formData.subject}
//                                     onChange={handleInputChange}
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                 >
//                                     <option value="">Select Subject</option>
//                                     {subjects.map(subject => (
//                                         <option key={subject} value={subject}>{subject}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
//                                 <select
//                                     name="reason"
//                                     value={formData.reason}
//                                     onChange={handleInputChange}
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                     required
//                                 >
//                                     <option value="absence">Absence Report</option>
//                                     <option value="leave">Leave Request</option>
//                                     <option value="complaint">Complaint</option>
//                                     <option value="other">Other</option>
//                                 </select>
//                             </div>
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
//                             <input
//                                 type="date"
//                                 name="date"
//                                 value={formData.date}
//                                 onChange={handleInputChange}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                 required
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//                             <textarea
//                                 name="description"
//                                 value={formData.description}
//                                 onChange={handleInputChange}
//                                 rows={4}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                 placeholder="Provide detailed description..."
//                                 required
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">Attachment (Optional)</label>
//                             <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
//                                 <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
//                                 <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
//                                 <p className="text-xs text-gray-500">PDF, DOC, JPG up to 10MB</p>
//                             </div>
//                         </div>

//                         <div className="flex space-x-3">
//                             <button
//                                 type="submit"
//                                 className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
//                             >
//                                 Submit Ticket
//                             </button>
//                             <button
//                                 type="button"
//                                 onClick={() => setShowCreateForm(false)}
//                                 className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-all duration-200"
//                             >
//                                 Cancel
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             )}

//             {/* Tickets List */}
//             <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
//                 <div className="px-6 py-4 border-b border-gray-200">
//                     <h3 className="text-lg font-semibold text-gray-800">My Tickets</h3>
//                 </div>
//                 <div className="overflow-x-auto">
//                     <table className="w-full">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket ID</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                             {tickets.map((ticket, index) => (
//                                 <tr key={index} className="hover:bg-gray-50">
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                                         {ticket.id}
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                                         {ticket.type}
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                                         {ticket.subject}
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                                         {new Date(ticket.date).toLocaleDateString()}
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap">
//                                         <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
//                                             {ticket.status}
//                                         </span>
//                                     </td>
//                                     <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
//                                         {ticket.description}
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
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [formData, setFormData] = useState({
//     subject: '',
//     reason: 'absence',
//     date: '',
//     description: ''
//   });
//   const [tickets, setTickets] = useState([]);

//   // TEMP: Replace this with actual student data (e.g., from context or localStorage)
//   const studentId = 'STU123'; 
//   const fullName = 'John Doe';

//   const subjects = ['Mathematics', 'Physics', 'Computer Science', 'Chemistry', 'English', 'History'];

//   // Fetch tickets on mount
//   useEffect(() => {
//     const fetchTickets = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/tickets?studentId=${studentId}`);
//         setTickets(res.data.tickets);
//       } catch (error) {
//         console.error('Error fetching tickets:', error);
//       }
//     };

//     fetchTickets();
//   }, [studentId]);

//   // Handle input change
//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   // Submit ticket
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = {
//         ...formData,
//         studentId,
//         fullName
//       };

//       await axios.post('http://localhost:5000/api/tickets', payload);
//       alert('Ticket submitted successfully!');
//       setShowCreateForm(false);
//       setFormData({ subject: '', reason: 'absence', date: '', description: '' });

//       // Refresh tickets after creation
//       const res = await axios.get(`http://localhost:5000/api/tickets?studentId=${studentId}`);
//       setTickets(res.data.tickets);
//     } catch (error) {
//       console.error('Ticket submission failed:', error);
//       alert('Failed to submit ticket');
//     }
//   };

//   // Status color
//   const getStatusColor = (status) => {
//     switch (status.toLowerCase()) {
//       case 'pending': return 'bg-yellow-100 text-yellow-800';
//       case 'approved': return 'bg-green-100 text-green-800';
//       case 'resolved': return 'bg-blue-100 text-blue-800';
//       case 'denied': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800 mb-2">Tickets</h1>
//           <p className="text-gray-600">Manage your requests and complaints</p>
//         </div>
//         <button
//           onClick={() => setShowCreateForm(!showCreateForm)}
//           className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
//         >
//           <Plus className="w-4 h-4" />
//           <span>Create Ticket</span>
//         </button>
//       </div>

//       {/* Create Ticket Form */}
//       {showCreateForm && (
//         <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
//           <h2 className="text-lg font-semibold text-gray-800 mb-4">Create New Ticket</h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Subject (Optional)</label>
//                 <select
//                   name="subject"
//                   value={formData.subject}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="">Select Subject</option>
//                   {subjects.map(subject => (
//                     <option key={subject} value={subject}>{subject}</option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
//                 <select
//                   name="reason"
//                   value={formData.reason}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   required
//                 >
//                   <option value="absence">Absence Report</option>
//                   <option value="leave">Leave Request</option>
//                   <option value="complaint">Complaint</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
//               <input
//                 type="date"
//                 name="date"
//                 value={formData.date}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleInputChange}
//                 rows={4}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Provide detailed description..."
//                 required
//               />
//             </div>

//             <div className="flex space-x-3">
//               <button
//                 type="submit"
//                 className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
//               >
//                 Submit Ticket
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setShowCreateForm(false)}
//                 className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-all duration-200"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* Tickets List */}
//       <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
//         <div className="px-6 py-4 border-b border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-800">My Tickets</h3>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {tickets.map((ticket) => (
//                 <tr key={ticket.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 text-sm text-gray-900">{ticket.id}</td>
//                   <td className="px-6 py-4 text-sm text-gray-900 capitalize">{ticket.reason}</td>
//                   <td className="px-6 py-4 text-sm text-gray-900">{ticket.subject || '-'}</td>
//                   <td className="px-6 py-4 text-sm text-gray-900">{new Date(ticket.date).toLocaleDateString()}</td>
//                   <td className="px-6 py-4">
//                     <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
//                       {ticket.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{ticket.description}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };



const TicketsContent = () => {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [formData, setFormData] = useState({
        subject: '',
        reason: 'absence',
        date: '',
        description: ''
    });
    const [tickets, setTickets] = useState([]);

    // Get user data - try multiple sources
    const getUserData = () => {
        // First, try to get from localStorage (where login response is usually stored)
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                return {
                    studentId: user.studentId,
                    fullName: user.fullName
                };
            } catch (e) {
                console.error('Error parsing stored user:', e);
            }
        }

        // Try to get from JWT token
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                return {
                    studentId: payload.studentId,
                    fullName: payload.fullName
                };
            } catch (e) {
                console.error('Error decoding token:', e);
            }
        }

        // Fallback to individual localStorage items
        return {
            studentId: localStorage.getItem('studentId'),
            fullName: localStorage.getItem('fullName')
        };
    };

    const userData = getUserData();
    const studentId = userData.studentId;
    const fullName = userData.fullName;

    // For now, if we can't get the real data, use temporary values so the system works
    // TODO: Replace with actual user data once login system is confirmed
    const finalStudentId = studentId || 'ST12345';
    const finalFullName = fullName || 'Current User';

    const subjects = ['Mathematics', 'Physics', 'Computer Science', 'Chemistry', 'English', 'History'];

    // Fetch tickets on mount
    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/tickets?studentId=${finalStudentId}`);
                setTickets(res.data.tickets);
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };

        fetchTickets();
    }, [finalStudentId]);

    // Handle input change
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Submit ticket
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                ...formData,
                studentId: finalStudentId,
                fullName: finalFullName
            };

            console.log('Submitting ticket with payload:', payload); // Debug log

            await axios.post('http://localhost:5000/api/tickets', payload);
            alert('Ticket submitted successfully!');
            setShowCreateForm(false);
            setFormData({ subject: '', reason: 'absence', date: '', description: '' });

            // Refresh tickets after creation
            const res = await axios.get(`http://localhost:5000/api/tickets?studentId=${finalStudentId}`);
            setTickets(res.data.tickets);
        } catch (error) {
            console.error('Ticket submission failed:', error);
            alert('Failed to submit ticket');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">My Tickets</h1>
                    <p className="text-gray-600">Submit and track your leave requests</p>
                    <p className="text-sm text-gray-500">Logged in as: {finalFullName} ({finalStudentId})</p>
                </div>
                <button
                    onClick={() => setShowCreateForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                >
                    <Plus className="w-4 h-4" />
                    <span>New Ticket</span>
                </button>
            </div>

            {/* Create Ticket Form Modal */}
            {showCreateForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800">Create New Ticket</h2>
                            <button
                                onClick={() => setShowCreateForm(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                <select
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="">Select Subject</option>
                                    {subjects.map(subject => (
                                        <option key={subject} value={subject}>{subject}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                                <select
                                    name="reason"
                                    value={formData.reason}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="absence">Absence</option>
                                    <option value="medical">Medical Leave</option>
                                    <option value="family">Family Emergency</option>
                                    <option value="personal">Personal Reason</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Provide details about your request..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows="3"
                                    required
                                />
                            </div>

                            <div className="flex space-x-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                >
                                    Submit Ticket
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowCreateForm(false)}
                                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Tickets List */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Tickets</h2>

                {tickets.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>No tickets found</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 font-medium text-gray-600">ID</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-600">Subject</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-600">Reason</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tickets.map((ticket) => (
                                    <tr key={ticket.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-3 px-4 font-medium">{ticket.id}</td>
                                        <td className="py-3 px-4">{ticket.subject}</td>
                                        <td className="py-3 px-4">{ticket.reason}</td>
                                        <td className="py-3 px-4 text-gray-600">
                                            {new Date(ticket.date).toLocaleDateString()}
                                        </td>
                                        <td className="py-3 px-4">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${ticket.status === 'pending'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : ticket.status === 'approved'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                    }`}
                                            >
                                                {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

// Main StudentDashboard Component
const StudentDashboard = () => {
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
            case 'attendance':
                return <AttendanceContent />;
            case 'absence':
                return <AbsenceHistoryContent />;
            case 'tickets':
                return <TicketsContent />;
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Navbar */}
            <StudentNavbar
                onProfileClick={handleProfileClick}
                onNotificationClick={handleNotificationClick}
            />

            <div className="flex h-[calc(100vh-4rem)]">
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
            <Footer />
        </div>
    );
};

export default StudentDashboard;