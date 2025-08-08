import React, { useState } from 'react';
import {
    Camera,
    Mail,
    ArrowRight,
    ExternalLink
} from 'lucide-react';

// Simple SVG icon components for social media
const FaFacebookF = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);

const FaTwitter = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    </svg>
);

const FaInstagram = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.017 0C8.396 0 7.989.013 7.041.072 6.094.131 5.428.272 4.864.515a5.209 5.209 0 00-1.882 1.226A5.18 5.18 0 00.756 4.623C.512 5.186.372 5.852.312 6.799.253 7.747.24 8.154.24 11.774c0 3.621.013 4.028.072 4.976.061.946.201 1.613.444 2.176a5.18 5.18 0 001.226 1.882 5.209 5.209 0 001.882 1.226c.564.243 1.23.383 2.177.444.948.059 1.355.072 4.975.072 3.621 0 4.028-.013 4.976-.072.946-.061 1.613-.201 2.177-.444a5.209 5.209 0 001.882-1.226 5.18 5.18 0 001.226-1.882c.243-.564.383-1.23.444-2.177.059-.948.072-1.355.072-4.975 0-3.621-.013-4.028-.072-4.976-.061-.946-.201-1.613-.444-2.177a5.18 5.18 0 00-1.226-1.882A5.209 5.209 0 0019.136.515C18.573.272 17.906.131 16.959.072 16.011.013 15.604 0 11.984 0h.033zm0 2.16c3.582 0 4.007.014 5.423.072.89.04 1.374.187 1.696.31.426.166.73.362 1.05.681.32.32.516.624.681 1.05.123.322.27.806.31 1.696.058 1.416.072 1.841.072 5.423 0 3.582-.014 4.007-.072 5.423-.04.89-.187 1.374-.31 1.696a2.848 2.848 0 01-.681 1.05 2.848 2.848 0 01-1.05.681c-.322.123-.806.27-1.696.31-1.416.058-1.841.072-5.423.072-3.582 0-4.007-.014-5.423-.072-.89-.04-1.374-.187-1.696-.31a2.848 2.848 0 01-1.05-.681 2.848 2.848 0 01-.681-1.05c-.123-.322-.27-.806-.31-1.696-.058-1.416-.072-1.841-.072-5.423 0-3.582.014-4.007.072-5.423.04-.89.187-1.374.31-1.696.166-.426.362-.73.681-1.05.32-.32.624-.516 1.05-.681.322-.123.806-.27 1.696-.31 1.416-.058 1.841-.072 5.423-.072z" />
        <path d="M12.017 15.33a3.33 3.33 0 110-6.66 3.33 3.33 0 010 6.66zM12.017 7.41a4.67 4.67 0 100 9.34 4.67 4.67 0 000-9.34zM18.408 7.85a1.094 1.094 0 11-2.188 0 1.094 1.094 0 012.188 0z" />
    </svg>
);

const FaLinkedinIn = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

const FaGithub = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);

const Footer = () => {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setIsSubscribed(true);
            setEmail('');
            setTimeout(() => setIsSubscribed(false), 3000);
        }
    };

    const footerLinks = {
        products: [
            { name: 'Landing Page', href: '/' },
            { name: 'Features', href: '/features' },
            { name: 'Pricing', href: '/pricing' },
            { name: 'Demo', href: '/demo' }
        ],
        resources: [
            { name: 'Documentation', href: '/docs' },
            { name: 'Blog', href: '/blog' },
            { name: 'Help Center', href: '/help' },
            { name: 'API Reference', href: '/api' }
        ],
        company: [
            { name: 'About Us', href: '/about' },
            { name: 'Careers', href: '/careers' },
            { name: 'Contact', href: '/contact' },
            { name: 'Partners', href: '/partners' }
        ]
    };

    const socialLinks = [
        {
            name: 'Facebook',
            icon: FaFacebookF,
            href: 'https://facebook.com',
            color: 'hover:text-blue-400'
        },
        {
            name: 'Twitter',
            icon: FaTwitter,
            href: 'https://twitter.com',
            color: 'hover:text-sky-400'
        },
        {
            name: 'Instagram',
            icon: FaInstagram,
            href: 'https://instagram.com',
            color: 'hover:text-pink-400'
        },
        {
            name: 'LinkedIn',
            icon: FaLinkedinIn,
            href: 'https://linkedin.com',
            color: 'hover:text-blue-300'
        },
        {
            name: 'GitHub',
            icon: FaGithub,
            href: 'https://github.com',
            color: 'hover:text-gray-300'
        }
    ];

    return (
        <>
            {/* Separator with gradient */}
            <div className="h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600"></div>

            <footer className="bg-gray-900 text-white">
                {/* Main Footer Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
                        {/* Logo & Description */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-xl shadow-lg">
                                    <Camera className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white">ClockinGo Attendance</h3>
                                    <p className="text-sm text-gray-400 mt-1">Smart Recognition System</p>
                                </div>
                            </div>
                            <p className="text-gray-300 mb-8 leading-relaxed text-base">
                                Revolutionary face recognition attendance management system for educational institutions and organizations. Making attendance tracking effortless and accurate.
                            </p>

                            {/* Social Media Icons */}
                            <div className="flex space-x-4">
                                {socialLinks.map((social, index) => {
                                    const IconComponent = social.icon;
                                    return (
                                        <a
                                            key={index}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`p-3 rounded-xl bg-gray-800 text-gray-400 transition-all duration-300 transform hover:scale-110 hover:bg-gray-700 hover:shadow-lg ${social.color}`}
                                            aria-label={social.name}
                                        >
                                            <IconComponent />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Products Links */}
                        <div className="lg:col-span-1">
                            <h4 className="text-lg font-bold text-white mb-6 relative">
                                Products
                                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                            </h4>
                            <ul className="space-y-4">
                                {footerLinks.products.map((link, index) => (
                                    <li key={index}>
                                        <a
                                            href={link.href}
                                            className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group text-base"
                                        >
                                            <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                                            <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Resources Links */}
                        <div className="lg:col-span-1">
                            <h4 className="text-lg font-bold text-white mb-6 relative">
                                Resources
                                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                            </h4>
                            <ul className="space-y-4">
                                {footerLinks.resources.map((link, index) => (
                                    <li key={index}>
                                        <a
                                            href={link.href}
                                            className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group text-base"
                                        >
                                            <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                                            <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company Links */}
                        <div className="lg:col-span-1">
                            <h4 className="text-lg font-bold text-white mb-6 relative">
                                Company
                                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                            </h4>
                            <ul className="space-y-4">
                                {footerLinks.company.map((link, index) => (
                                    <li key={index}>
                                        <a
                                            href={link.href}
                                            className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group text-base"
                                        >
                                            <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                                            <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Newsletter Subscription */}
                        <div className="lg:col-span-1">
                            <h4 className="text-lg font-bold text-white mb-6 relative">
                                Stay Updated
                                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                            </h4>
                            <p className="text-gray-300 text-base mb-6 leading-relaxed">
                                Get the latest updates and features delivered to your inbox.
                            </p>

                            <div className="space-y-4">
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                                    />
                                </div>
                                <button
                                    onClick={handleSubscribe}
                                    disabled={isSubscribed}
                                    className={`w-full px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${isSubscribed
                                        ? 'bg-green-600 text-white shadow-lg'
                                        : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:shadow-lg hover:scale-105 transform'
                                        }`}
                                >
                                    {isSubscribed ? (
                                        <span>✓ Subscribed!</span>
                                    ) : (
                                        <>
                                            <span>Subscribe</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Copyright Bar */}
                <div className="border-t border-gray-800 bg-gray-950">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
                            {/* Copyright */}
                            <div className="text-gray-400 text-center lg:text-left">
                                <p className="text-base">© 2025 ClockinGo Attendance. All rights reserved.</p>
                                <p className="text-sm mt-1 text-gray-500">Designed with ❤️ for educational excellence</p>
                            </div>

                            {/* Legal Links */}
                            <div className="flex flex-wrap items-center justify-center gap-8">
                                <a
                                    href="/terms"
                                    className="text-gray-400 hover:text-white transition-colors duration-300 text-base"
                                >
                                    Terms of Service
                                </a>
                                <a
                                    href="/privacy"
                                    className="text-gray-400 hover:text-white transition-colors duration-300 text-base"
                                >
                                    Privacy Policy
                                </a>
                                <a
                                    href="/cookies"
                                    className="text-gray-400 hover:text-white transition-colors duration-300 text-base"
                                >
                                    Cookie Policy
                                </a>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="mt-8 pt-6 border-t border-gray-800">
                            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                                <div className="text-gray-500 text-center md:text-left">
                                    <p className="text-sm">Built with React, Tailwind CSS, and modern web technologies.</p>
                                </div>
                                <div className="flex items-center space-x-6 text-gray-500 text-sm">
                                    <span className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <span>All systems operational</span>
                                    </span>
                                    <span>Version 1.0.0</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;