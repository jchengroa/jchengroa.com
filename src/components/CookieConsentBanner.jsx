import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'jchengroa_analytics_consent';

export default function CookieConsentBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem(STORAGE_KEY);
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 800);
            return () => clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        const handleReset = () => {
            setIsVisible(true);
        };
        window.addEventListener('jchengroa_reset_consent', handleReset);
        return () => window.removeEventListener('jchengroa_reset_consent', handleReset);
    }, []);

    const handleAccept = () => {
        localStorage.setItem(STORAGE_KEY, 'accepted');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-[100] isolate"
                >
                    <div className="relative p-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-100 dark:border-gray-800 rounded-[2rem] shadow-2xl text-left flex flex-col gap-4">
                        {/* Header & Icon */}
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                                        <path d="M8.5 8.5v.01" />
                                        <path d="M16 15.5v.01" />
                                        <path d="M12 12v.01" />
                                        <path d="M11 17v.01" />
                                        <path d="M7 14v.01" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="text-[10px] font-black tracking-[0.2em] text-blue-600 dark:text-blue-400 uppercase block">
                                        Privacy & Tracking
                                    </span>
                                    <h3 className="text-base font-bold text-gray-900 dark:text-white tracking-tight">
                                        Analytics Notice
                                    </h3>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                            We use privacy-friendly <strong className="text-gray-900 dark:text-white">Vercel Analytics</strong> to measure page views and performance anonymously. No personal sensitive data is stored or sold.
                        </p>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
                            <button
                                onClick={handleAccept}
                                className="flex-1 py-2.5 px-4 bg-gray-900 dark:bg-white text-white dark:text-gray-950 text-xs font-black rounded-xl hover:bg-black dark:hover:bg-gray-100 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-gray-200/50 dark:shadow-none text-center"
                            >
                                Got it
                            </button>
                        </div>

                        {/* Privacy policy link */}
                        <div className="text-right">
                            <Link
                                to="/legal"
                                className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors underline decoration-dotted"
                            >
                                View Privacy Policy
                            </Link>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
