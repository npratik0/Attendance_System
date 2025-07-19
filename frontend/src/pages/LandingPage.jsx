import React, { useState } from 'react';
import {
    Camera,
    Shield,
    Users,
    BarChart3,
    Clock,
    CheckCircle,
    Star,
    Eye,
    Download,
    Smartphone,
    Globe,
    Mail,
    Phone,
    MapPin,
    Github,
    Linkedin,
    Twitter,
    Menu,
    X,
    Play,
    ArrowRight,
    Zap,
    Database,
    Lock,
    Gauge
} from 'lucide-react';

// Hero Section Component
const HeroSection = ({ onGetStartedClick }) => {
    return (
        <section id="home" className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div>
                        <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <Zap className="w-4 h-4" />
                            <span>Next-Gen Attendance System</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Revolutionize the way you
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> track attendance</span>
                        </h1>

                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Experience the future of attendance management with our AI-powered face recognition system.
                            Eliminate proxy attendance, reduce manual errors, and save valuable time with our automated solution.
                        </p>

                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <button
                                onClick={onGetStartedClick}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                            >
                                <span>Get Started</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>

                            <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-medium hover:border-blue-600 hover:text-blue-600 transition-all duration-200 flex items-center justify-center space-x-2">
                                <Play className="w-5 h-5" />
                                <span>Watch Demo</span>
                            </button>
                        </div>

                        <div className="mt-12 flex items-center space-x-8">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gray-900">99.9%</div>
                                <div className="text-gray-600">Accuracy</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gray-900">50+</div>
                                <div className="text-gray-600">Schools</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gray-900">10k+</div>
                                <div className="text-gray-600">Students</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Visual */}
                    <div className="relative">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 shadow-2xl">
                            <div className="bg-white rounded-lg p-6 space-y-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                        <CheckCircle className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">John Doe</div>
                                        <div className="text-sm text-gray-600">Present - 09:15 AM</div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                        <CheckCircle className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">Jane Smith</div>
                                        <div className="text-sm text-gray-600">Present - 09:12 AM</div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                        <Clock className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">Mike Johnson</div>
                                        <div className="text-sm text-gray-600">Scanning...</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Elements */}
                        <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4">
                            <div className="flex items-center space-x-2">
                                <Camera className="w-5 h-5 text-blue-600" />
                                <span className="text-sm font-medium">Live Recognition</span>
                            </div>
                        </div>

                        <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4">
                            <div className="flex items-center space-x-2">
                                <Shield className="w-5 h-5 text-green-600" />
                                <span className="text-sm font-medium">100% Secure</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Features Section Component
const FeaturesSection = () => {
    const features = [
        {
            icon: Camera,
            title: "Face Recognition Attendance",
            description: "Advanced AI-powered face detection and recognition for accurate attendance marking"
        },
        {
            icon: Users,
            title: "Student Dashboard",
            description: "Personalized dashboard for students to view their attendance history and analytics"
        },
        {
            icon: BarChart3,
            title: "Admin/Teacher Dashboard",
            description: "Comprehensive management tools for teachers and administrators"
        },
        {
            icon: Clock,
            title: "Real-time Logs",
            description: "Instant attendance logging with real-time updates and notifications"
        },
        {
            icon: Download,
            title: "Export Reports",
            description: "Generate and export detailed attendance reports in multiple formats"
        },
        {
            icon: Globe,
            title: "Web-based Access",
            description: "Access your attendance system from anywhere with our web-based platform"
        }
    ];

    return (
        <section id="features" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Core Features
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Discover the powerful features that make FaceTrackr the perfect solution for modern attendance management
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="group p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg w-12 h-12 mb-4 group-hover:scale-110 transition-transform duration-300">
                                <feature.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Why Choose Us Section
const WhyChooseUsSection = () => {
    const benefits = [
        {
            icon: Eye,
            title: "Real-time Face Recognition",
            description: "Instant face detection and recognition with 99.9% accuracy"
        },
        {
            icon: Zap,
            title: "100% Automated Attendance",
            description: "Completely eliminate manual attendance taking and human errors"
        },
        {
            icon: Shield,
            title: "Secure & Privacy-Focused",
            description: "Advanced encryption and privacy protection for all user data"
        },
        {
            icon: BarChart3,
            title: "Easy Reporting & Analysis",
            description: "Comprehensive analytics and reporting tools for better insights"
        },
        {
            icon: Smartphone,
            title: "Cross-Platform Access",
            description: "Access from any device - desktop, tablet, or mobile"
        },
        {
            icon: Gauge,
            title: "Low Maintenance & Affordable",
            description: "Cost-effective solution with minimal maintenance requirements"
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Why Choose FaceTrackr?
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Experience the advantages that set us apart from traditional attendance systems
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                            <div className="flex items-center mb-4">
                                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg mr-4">
                                    <benefit.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900">{benefit.title}</h3>
                            </div>
                            <p className="text-gray-600">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// About Us Section
const AboutUsSection = () => {
    return (
        <section id="about" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Who We Are
                        </h2>
                        <p className="text-lg text-gray-600 mb-6">
                            We are a passionate group of students dedicated to solving real-world problems through innovative technology.
                            Our team recognized the challenges faced by educational institutions with traditional attendance systems and
                            decided to create a modern, efficient solution.
                        </p>
                        <p className="text-lg text-gray-600 mb-6">
                            FaceTrackr was born out of our commitment to addressing issues like proxy attendance, manual errors,
                            and time-consuming processes that plague traditional attendance systems. We believe technology should
                            empower institutions, not complicate their operations.
                        </p>
                        <div className="flex items-center space-x-4">
                            <div className="bg-blue-100 p-3 rounded-lg">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <div className="font-semibold text-gray-900">Student-Led Innovation</div>
                                <div className="text-gray-600">Built by students, for educational institutions</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                        <h3 className="text-2xl font-bold mb-6">Our Mission & Vision</h3>

                        <div className="mb-8">
                            <h4 className="text-xl font-semibold mb-3 flex items-center">
                                <Database className="w-5 h-5 mr-2" />
                                Mission
                            </h4>
                            <p className="text-blue-100">
                                To simplify school attendance management and empower educational institutions
                                through cutting-edge automation technology, making attendance tracking effortless and accurate.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold mb-3 flex items-center">
                                <Star className="w-5 h-5 mr-2" />
                                Vision
                            </h4>
                            <p className="text-blue-100">
                                To build a secure, smart, and scalable attendance solution that becomes the
                                standard for modern classrooms worldwide, fostering a more efficient educational environment.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Footer Component
const Footer = () => {
    return (
        <footer id="contact" className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                                <Camera className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <span className="text-xl font-bold">FaceTrackr</span>
                                <p className="text-gray-400 text-sm">Smart Attendance Made Easy</p>
                            </div>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Revolutionizing attendance management through AI-powered face recognition technology.
                            Built by students for the future of education.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#home" className="text-gray-400 hover:text-white transition-colors duration-200">Home</a></li>
                            <li><a href="#features" className="text-gray-400 hover:text-white transition-colors duration-200">Features</a></li>
                            <li><a href="#about" className="text-gray-400 hover:text-white transition-colors duration-200">About</a></li>
                            <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors duration-200">Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <Mail className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-400">team@facetrackr.edu</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Phone className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-400">+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-400">University Campus, City</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p className="text-gray-400">
                        Made with ❤️ by Team FaceTrackr | © 2024 All rights reserved
                    </p>
                </div>
            </div>
        </footer>
    );
};

// Main Landing Page Component (WITHOUT Navigation Component)
const LandingPage = ({ onSwitchToLogin, onSwitchToSignup }) => {
    const handleGetStartedClick = () => {
        // Navigate to signup when Get Started is clicked
        onSwitchToSignup();
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Removed <Navigation /> component - using main Navbar from App.jsx instead */}
            <HeroSection onGetStartedClick={handleGetStartedClick} />
            <FeaturesSection />
            <WhyChooseUsSection />
            <AboutUsSection />
            <Footer />
        </div>
    );
};

export default LandingPage;