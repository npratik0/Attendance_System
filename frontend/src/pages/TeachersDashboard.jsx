import React, { useState } from 'react';
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
    BarChart3
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

const ClassesContent = () => (
    <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-8 text-center">
        <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">My Classes</h2>
        <p className="text-gray-600 mb-6">Manage your class schedules and student enrollments</p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 font-medium">Feature Coming Soon!</p>
            <p className="text-blue-600 text-sm mt-1">
                You'll be able to view and manage all your classes here
            </p>
        </div>
    </div>
);

const AttendanceContent = () => (
    <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-8 text-center">
        <ClipboardList className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Attendance Management</h2>
        <p className="text-gray-600 mb-6">Track and manage student attendance with face recognition</p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 font-medium">Feature Coming Soon!</p>
            <p className="text-green-600 text-sm mt-1">
                Advanced attendance tracking with real-time face recognition
            </p>
        </div>
    </div>
);

const MessagesContent = () => (
    <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-8 text-center">
        <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Messages & Tickets</h2>
        <p className="text-gray-600 mb-6">Handle student requests and communication</p>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-purple-800 font-medium">Feature Coming Soon!</p>
            <p className="text-purple-600 text-sm mt-1">
                Manage student leave requests and messages
            </p>
        </div>
    </div>
);

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
        </div>
    );
};

export default TeachersDashboard;