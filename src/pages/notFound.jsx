import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    LuHouse,
    LuArrowLeft,
    LuFolderGit2,
    LuBookOpen,
    LuAward,
    LuMail,
    LuHistory,
    LuCompass
} from 'react-icons/lu';
import { Title } from '../components/components.jsx';

const quickLinks = [
    { to: '/projects', label: 'Projects', desc: 'Software and applications', icon: LuFolderGit2, color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/40 border-blue-200/60 dark:border-blue-800/60' },
    { to: '/research', label: 'Research', desc: 'Academic papers & studies', icon: LuBookOpen, color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200/60 dark:border-indigo-800/60' },
    { to: '/recognition', label: 'Recognition', desc: 'Awards and achievements', icon: LuAward, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 border-amber-200/60 dark:border-amber-800/60' },
    { to: '/contact', label: 'Contact', desc: 'Get in touch directly', icon: LuMail, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200/60 dark:border-emerald-800/60' },
    { to: '/changelog', label: 'Changelog', desc: 'Release timeline & notes', icon: LuHistory, color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/40 border-purple-200/60 dark:border-purple-800/60' }
];

export default function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="relative min-h-[85vh] py-8 sm:py-12 px-4 md:px-6 bg-transparent flex flex-col items-center justify-center overflow-x-hidden w-full">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-500/10 dark:bg-blue-600/15 blur-3xl pointer-events-none" />

            <div className="max-w-3xl w-full z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                    {/* Brand Logo Text */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="inline-block mb-2 sm:mb-3"
                    >
                        <span className="font-black text-base sm:text-lg tracking-tight lowercase text-gray-900 dark:text-white select-none">
                            jchengroa
                        </span>
                    </motion.div>

                    {/* Header */}
                    <Title
                        title="Uhmm... I think you're lost."
                        subtitle="The page you are looking for does not exist, was moved, or has an invalid URL."
                        icon={LuCompass}
                        align="center"
                    />

                    {/* Primary Action Buttons */}
                    <div className="flex flex-wrap items-center justify-center gap-3 mt-6 mb-12">
                        <button
                            type="button"
                            onClick={() => {
                                if (window.history.length > 1) {
                                    navigate(-1);
                                } else {
                                    navigate('/');
                                }
                            }}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/90 dark:bg-gray-900/90 text-gray-800 dark:text-gray-200 border border-gray-200/80 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs sm:text-sm font-bold shadow-sm transition-all duration-200 active:scale-95"
                        >
                            <LuArrowLeft size={16} />
                            <span>Go Back</span>
                        </button>

                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold shadow-lg shadow-blue-600/25 transition-all duration-200 active:scale-95"
                        >
                            <LuHouse size={16} />
                            <span>Return to Home</span>
                        </Link>
                    </div>

                    {/* Quick Destinations Card */}
                    <div className="p-6 sm:p-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-[2.5rem] border border-gray-100/80 dark:border-gray-800/80 shadow-xl shadow-blue-900/5 text-left">
                        <h2 className="text-xs font-black tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500 mb-4 text-center sm:text-left">
                            Or Explore Available Sections
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {quickLinks.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.to}
                                        to={item.to}
                                        className="group flex items-start gap-3.5 p-3.5 rounded-2xl bg-gray-50/70 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-200 shadow-none hover:shadow-md"
                                    >
                                        <div className={`p-2.5 rounded-xl border ${item.color} shrink-0 group-hover:scale-105 transition-transform`}>
                                            <Icon size={18} />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                                                {item.label}
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                {item.desc}
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export { NotFound };
