import React, { useState } from 'react';
import Footer from '../components/Footer';


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
    MapPin,
    Edit,
    Eye,
    Search,
    Filter,
    Plus,
    Send,
    Reply,
    MoreVertical,
    CalendarDays,
    UserCheck,
    UserX
} from 'lucide-react';

// TeacherNavbar Component
const TeacherNavbar = ({ onProfileClick, onNotificationClick }) => {
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
                            <span className="text-xl font-bold text-gray-800">FaceTrackr</span>
                            <p className="text-xs text-gray-500 hidden sm:block">Teacher Dashboard</p>
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
                                3
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
        { id: 'classes', label: 'My Classes', icon: BookOpen },
        { id: 'attendance', label: 'Attendance', icon: ClipboardList },
        { id: 'messages', label: 'Messages', icon: MessageSquare },
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

// Main Content Components
const DashboardContent = () => {
    const stats = [
        { label: 'Total Classes', value: '8', icon: BookOpen, color: 'from-blue-500 to-blue-600' },
        { label: 'Today\'s Classes', value: '3', icon: Calendar, color: 'from-green-500 to-green-600' },
        { label: 'Present Students', value: '127', icon: CheckCircle, color: 'from-purple-500 to-purple-600' },
        { label: 'Absent Students', value: '23', icon: XCircle, color: 'from-red-500 to-red-600' },
    ];

    const recentClasses = [
        { name: 'Computer Science 101', time: '9:00 AM', students: 45, present: 42 },
        { name: 'Data Structures', time: '11:00 AM', students: 38, present: 35 },
        { name: 'Algorithms', time: '2:00 PM', students: 32, present: 30 },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome back, Professor!</h1>
                <p className="text-gray-600">Here's an overview of your attendance management</p>
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

            {/* Recent Classes */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Today's Classes</h2>
                <div className="space-y-4">
                    {recentClasses.map((classItem, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                                    <BookOpen className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-800">{classItem.name}</h3>
                                    <p className="text-sm text-gray-600">{classItem.time}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium text-gray-800">
                                    {classItem.present}/{classItem.students} Present
                                </p>
                                <p className="text-xs text-gray-600">
                                    {Math.round((classItem.present / classItem.students) * 100)}% Attendance
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const ClassesContent = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const classes = [
        {
            id: 1,
            name: 'Computer Science 101',
            schedule: 'Mon, Wed, Fri - 9:00 AM',
            room: 'Room 205A',
            students: 45,
            status: 'Active'
        },
        {
            id: 2,
            name: 'Data Structures',
            schedule: 'Tue, Thu - 11:00 AM',
            room: 'Room 301B',
            students: 38,
            status: 'Active'
        },
        {
            id: 3,
            name: 'Algorithms',
            schedule: 'Mon, Wed, Fri - 2:00 PM',
            room: 'Room 158C',
            students: 32,
            status: 'Active'
        },
        {
            id: 4,
            name: 'Database Systems',
            schedule: 'Tue, Thu - 10:00 AM',
            room: 'Room 207A',
            students: 41,
            status: 'Active'
        },
        {
            id: 5,
            name: 'Software Engineering',
            schedule: 'Mon, Wed - 3:30 PM',
            room: 'Room 305B',
            students: 35,
            status: 'Active'
        },
        {
            id: 6,
            name: 'Web Development',
            schedule: 'Fri - 1:00 PM',
            room: 'Lab 102',
            students: 28,
            status: 'Active'
        }
    ];

    const filteredClasses = classes.filter(cls =>
        cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.room.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">My Classes</h1>
                    <p className="text-gray-600">Manage your class schedules and student enrollments</p>
                </div>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Add Class</span>
                </button>
            </div>

            {/* Search and Filter */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search classes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                        <Filter className="w-4 h-4" />
                        <span>Filter</span>
                    </button>
                </div>
            </div>

            {/* Classes Table */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Class Name
                                </th>
                                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Schedule
                                </th>
                                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Room
                                </th>
                                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Students
                                </th>
                                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredClasses.map((cls) => (
                                <tr key={cls.id} className="hover:bg-gray-50 transition-colors duration-200">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                                                <BookOpen className="w-4 h-4 text-white" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{cls.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2">
                                            <Clock className="w-4 h-4 text-gray-400" />
                                            <span className="text-sm text-gray-900">{cls.schedule}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2">
                                            <MapPin className="w-4 h-4 text-gray-400" />
                                            <span className="text-sm text-gray-900">{cls.room}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2">
                                            <Users className="w-4 h-4 text-gray-400" />
                                            <span className="text-sm text-gray-900">{cls.students}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                            {cls.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2">
                                            <button className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button className="text-gray-600 hover:text-gray-800 transition-colors duration-200">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="text-gray-600 hover:text-gray-800 transition-colors duration-200">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </div>
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

const AttendanceContent = () => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedClass, setSelectedClass] = useState('all');

    const attendanceData = [
        {
            className: 'Computer Science 101',
            date: '2024-03-15',
            present: 42,
            absent: 3,
            total: 45,
            percentage: 93
        },
        {
            className: 'Data Structures',
            date: '2024-03-15',
            present: 35,
            absent: 3,
            total: 38,
            percentage: 92
        },
        {
            className: 'Algorithms',
            date: '2024-03-15',
            present: 30,
            absent: 2,
            total: 32,
            percentage: 94
        }
    ];

    const weeklyAttendance = [
        { day: 'Mon', percentage: 95 },
        { day: 'Tue', percentage: 87 },
        { day: 'Wed', percentage: 92 },
        { day: 'Thu', percentage: 89 },
        { day: 'Fri', percentage: 94 },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Attendance Management</h1>
                    <p className="text-gray-600">Track and manage student attendance with face recognition</p>
                </div>
                <button className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center space-x-2">
                    <UserCheck className="w-4 h-4" />
                    <span>Mark Attendance</span>
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Today's Classes</p>
                            <p className="text-3xl font-bold text-gray-800 mt-2">3</p>
                        </div>
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-lg">
                            <CalendarDays className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Present Today</p>
                            <p className="text-3xl font-bold text-gray-800 mt-2">107</p>
                        </div>
                        <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-lg">
                            <UserCheck className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Absent Today</p>
                            <p className="text-3xl font-bold text-gray-800 mt-2">8</p>
                        </div>
                        <div className="bg-gradient-to-r from-red-500 to-red-600 p-3 rounded-lg">
                            <UserX className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Avg. Attendance</p>
                            <p className="text-3xl font-bold text-gray-800 mt-2">93%</p>
                        </div>
                        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-lg">
                            <BarChart3 className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Select Class</label>
                        <select
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">All Classes</option>
                            <option value="cs101">Computer Science 101</option>
                            <option value="ds">Data Structures</option>
                            <option value="algo">Algorithms</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Weekly Attendance Chart */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Weekly Attendance Overview</h2>
                <div className="space-y-4">
                    {weeklyAttendance.map((day, index) => (
                        <div key={index} className="flex items-center space-x-4">
                            <div className="w-12 text-sm font-medium text-gray-600">{day.day}</div>
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${day.percentage}%` }}
                                ></div>
                            </div>
                            <div className="w-12 text-sm font-medium text-gray-800">{day.percentage}%</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Attendance Table */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">Today's Attendance</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Class Name
                                </th>
                                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Present
                                </th>
                                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Absent
                                </th>
                                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total
                                </th>
                                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Percentage
                                </th>
                                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {attendanceData.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                                                <BookOpen className="w-4 h-4 text-white" />
                                            </div>
                                            <span className="text-sm font-medium text-gray-900">{item.className}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-green-600 font-medium">{item.present}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-red-600 font-medium">{item.absent}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-gray-900">{item.total}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-16 bg-gray-200 rounded-full h-2">
                                                <div
                                                    className={`h-2 rounded-full ${item.percentage >= 90 ? 'bg-green-500' : item.percentage >= 75 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                                    style={{ width: `${item.percentage}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-sm font-medium text-gray-900">{item.percentage}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-blue-600 hover:text-blue-800 transition-colors duration-200 text-sm font-medium">
                                            View Details
                                        </button>
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

const MessagesContent = () => {
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const messages = [
        {
            id: 1,
            from: 'John Smith',
            subject: 'Leave Request - Medical Appointment',
            message: 'Dear Professor, I will not be able to attend tomorrow\'s class due to a medical appointment. I will catch up on the missed material.',
            time: '2 hours ago',
            type: 'leave',
            status: 'unread',
            priority: 'normal'
        },
        {
            id: 2,
            from: 'Sarah Johnson',
            subject: 'Question about Assignment 3',
            message: 'Hi Professor, I have a question about the database design assignment. Could you please clarify the requirements for the normalization section?',
            time: '4 hours ago',
            type: 'question',
            status: 'read',
            priority: 'high'
        },
        {
            id: 3,
            from: 'Mike Davis',
            subject: 'Late Submission Request',
            message: 'Professor, due to technical issues with my laptop, I couldn\'t submit the assignment on time. May I please have an extension?',
            time: '1 day ago',
            type: 'request',
            status: 'unread',
            priority: 'high'
        },
        {
            id: 4,
            from: 'Emily Chen',
            subject: 'Thank you for extra help',
            message: 'Thank you so much for the extra tutoring session yesterday. It really helped me understand the concept better.',
            time: '2 days ago',
            type: 'feedback',
            status: 'read',
            priority: 'low'
        },
        {
            id: 5,
            from: 'Alex Rodriguez',
            subject: 'Group Project Update',
            message: 'Our group has completed the first phase of the project. We would like to schedule a meeting to discuss our progress.',
            time: '3 days ago',
            type: 'update',
            status: 'read',
            priority: 'normal'
        }
    ];

    const filteredMessages = messages.filter(msg => {
        const matchesFilter = filter === 'all' || msg.status === filter || msg.type === filter;
        const matchesSearch = msg.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
            msg.subject.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const getMessageIcon = (type) => {
        switch (type) {
            case 'leave': return <Calendar className="w-4 h-4" />;
            case 'question': return <MessageSquare className="w-4 h-4" />;
            case 'request': return <Clock className="w-4 h-4" />;
            case 'feedback': return <CheckCircle className="w-4 h-4" />;
            case 'update': return <Bell className="w-4 h-4" />;
            default: return <MessageSquare className="w-4 h-4" />;
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'text-red-600 bg-red-100';
            case 'normal': return 'text-blue-600 bg-blue-100';
            case 'low': return 'text-gray-600 bg-gray-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Messages & Tickets</h1>
                    <p className="text-gray-600">Handle student requests and communication</p>
                </div>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center space-x-2">
                    <Send className="w-4 h-4" />
                    <span>New Message</span>
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Messages</p>
                            <p className="text-3xl font-bold text-gray-800 mt-2">{messages.length}</p>
                        </div>
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-lg">
                            <MessageSquare className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Unread</p>
                            <p className="text-3xl font-bold text-gray-800 mt-2">
                                {messages.filter(msg => msg.status === 'unread').length}
                            </p>
                        </div>
                        <div className="bg-gradient-to-r from-red-500 to-red-600 p-3 rounded-lg">
                            <Bell className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">High Priority</p>
                            <p className="text-3xl font-bold text-gray-800 mt-2">
                                {messages.filter(msg => msg.priority === 'high').length}
                            </p>
                        </div>
                        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-3 rounded-lg">
                            <XCircle className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Replied Today</p>
                            <p className="text-3xl font-bold text-gray-800 mt-2">7</p>
                        </div>
                        <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-lg">
                            <Reply className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search messages..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="all">All Messages</option>
                        <option value="unread">Unread</option>
                        <option value="read">Read</option>
                        <option value="leave">Leave Requests</option>
                        <option value="question">Questions</option>
                        <option value="request">Requests</option>
                    </select>
                </div>
            </div>

            {/* Messages List */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
                <div className="divide-y divide-gray-200">
                    {filteredMessages.map((message) => (
                        <div
                            key={message.id}
                            className={`p-6 hover:bg-gray-50 cursor-pointer transition-colors duration-200 ${message.status === 'unread' ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                                }`}
                            onClick={() => setSelectedMessage(message)}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-3 flex-1">
                                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                                        {getMessageIcon(message.type)}
                                        <span className="text-white">{getMessageIcon(message.type)}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center space-x-2 mb-1">
                                            <h3 className="text-sm font-medium text-gray-900 truncate">
                                                {message.from}
                                            </h3>
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(message.priority)}`}>
                                                {message.priority}
                                            </span>
                                        </div>
                                        <p className="text-sm font-medium text-gray-800 mb-1">{message.subject}</p>
                                        <p className="text-sm text-gray-600 line-clamp-2">{message.message}</p>
                                        <p className="text-xs text-gray-500 mt-2">{message.time}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2 ml-4">
                                    {message.status === 'unread' && (
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    )}
                                    <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                                        <MoreVertical className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Message Detail Modal */}
            {selectedMessage && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                                        {getMessageIcon(selectedMessage.type)}
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">{selectedMessage.subject}</h2>
                                        <p className="text-sm text-gray-600">From: {selectedMessage.from}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedMessage(null)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="mb-4">
                                <p className="text-sm text-gray-600 mb-2">{selectedMessage.time}</p>
                                <p className="text-gray-800 leading-relaxed">{selectedMessage.message}</p>
                            </div>
                            <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
                                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center space-x-2">
                                    <Reply className="w-4 h-4" />
                                    <span>Reply</span>
                                </button>
                                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200">
                                    Mark as Read
                                </button>
                                <button className="text-red-600 hover:text-red-800 transition-colors duration-200">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Main TeachersDashboard Component
const TeachersDashboard = () => {
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
            case 'classes':
                return <ClassesContent />;
            case 'attendance':
                return <AttendanceContent />;
            case 'messages':
                return <MessagesContent />;
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
            <TeacherNavbar
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

export default TeachersDashboard;