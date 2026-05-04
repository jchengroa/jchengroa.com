import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { siteContent } from "../data/site_content";

/* ─── Menu Items & Icon Mapping ──────────────────────────── */
const { navbar } = siteContent;

const iconMap = {
    projects: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 17V5c0-1.1.9-2 2-2h4l2 2h10c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2Z"/><path d="M2 9h20"/></svg>,
    research: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
    forums: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    docs: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>,
    downloads: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
    changelog: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>,
    legal: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
};

const MENU_ITEMS = navbar.links.map(link => ({
    ...link,
    icon: iconMap[link.icon]
}));

/* ─── Animation Variants ──────────────────────────────────── */
const overlayVariants = {
    hidden: { opacity: 0, scale: 0.97, y: -8 },
    visible: {
        opacity: 1, scale: 1, y: 0,
        transition: { duration: 0.22, ease: [0.4, 0, 0.2, 1] },
    },
    exit: {
        opacity: 0, scale: 0.97, y: -8,
        transition: { duration: 0.18, ease: [0.4, 0, 1, 1] },
    },
};

const itemVariants = {
    hidden: { opacity: 0, x: -12 },
    visible: (i) => ({
        opacity: 1, x: 0,
        transition: { delay: i * 0.055, duration: 0.22, ease: "easeOut" },
    }),
};

/* ─── Animated Hamburger Icon ─────────────────────────────── */
function HamburgerIcon({ open }) {
    return (
        <div className="relative w-5 h-4 flex flex-col justify-between">
            <motion.span
                className="block h-[2px] bg-gray-900 dark:bg-gray-100 rounded-full origin-center"
                animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            />
            <motion.span
                className="block h-[2px] bg-gray-900 dark:bg-gray-100 rounded-full"
                animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.15 }}
            />
            <motion.span
                className="block h-[2px] bg-gray-900 dark:bg-gray-100 rounded-full origin-center"
                animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            />
        </div>
    );
}

/* ─── Main Component ──────────────────────────────────────── */
function HamburgerMenu() {
    const [open, setOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('darkMode');
            if (saved !== null) return JSON.parse(saved);
        }
        return false;
    });
    const menuRef = useRef(null);
    const location = useLocation();

    /* Close on route change */
    useEffect(() => { 
        setOpen(false); 
        setSettingsOpen(false);
    }, [location.pathname]);

    /* Handle Dark Mode Class */
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    /* Close on outside click */
    useEffect(() => {
        if (!open) return;
        const handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [open]);

    /* Lock body scroll when menu is open */
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    return (
        <div ref={menuRef} className="relative">
            {/* Toggle Button */}
            <button
                id="hamburger-toggle"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
                <HamburgerIcon open={open} />
            </button>

            {/* Dropdown Panel */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        id="hamburger-menu-panel"
                        role="menu"
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute right-0 top-[calc(100%+0.75rem)] w-64 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border border-gray-100 dark:border-gray-800 rounded-2xl shadow-xl overflow-hidden"
                    >
                        <nav className="p-2">
                            {MENU_ITEMS.map((item, i) => (
                                <motion.div
                                    key={item.label}
                                    custom={i}
                                    variants={itemVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {item.active ? (
                                        <Link
                                            to={item.to}
                                            role="menuitem"
                                            className="flex items-center justify-between px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 font-semibold text-sm hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all duration-150 group"
                                            onClick={() => setOpen(false)}
                                        >
                                            <div className="flex items-center">
                                                <span className="text-gray-400 dark:text-gray-500 group-hover:text-blue-600 transition-colors mr-3">
                                                    {item.icon}
                                                </span>
                                                <span>{item.label}</span>
                                            </div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover:opacity-40 group-hover:translate-x-0.5 transition-all duration-150">
                                                <path d="m9 18 6-6-6-6" />
                                            </svg>
                                        </Link>
                                    ) : (
                                        /* Placeholder — coming soon */
                                        <div
                                            role="menuitem"
                                            aria-disabled="true"
                                            className="flex items-center justify-between px-4 py-3 rounded-xl text-gray-300 dark:text-gray-600 font-semibold text-sm cursor-not-allowed select-none"
                                        >
                                            <div className="flex items-center">
                                                <span className="text-gray-300 dark:text-gray-700 mr-3">
                                                    {item.icon}
                                                </span>
                                                <span>{item.label}</span>
                                            </div>
                                            <span className="text-[10px] font-black tracking-widest uppercase text-gray-200 dark:text-gray-700 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 px-2 py-0.5 rounded-full">
                                                Soon
                                            </span>
                                        </div>
                                    )}
                                </motion.div>
                            ))}

                            {/* Settings Section */}
                            <motion.div
                                custom={MENU_ITEMS.length}
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                className="mt-1 pt-1 border-t border-gray-50 dark:border-gray-800"
                            >
                                <button
                                    onClick={() => setSettingsOpen(!settingsOpen)}
                                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 font-semibold text-sm hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all duration-150 group"
                                >
                                    <div className="flex items-center">
                                        <span className="text-gray-400 dark:text-gray-500 group-hover:text-blue-600 transition-colors mr-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                                        </span>
                                        <span>{navbar.settings.title}</span>
                                    </div>
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="14" 
                                        height="14" 
                                        viewBox="0 0 24 24" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeWidth="2.5" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        className={`transition-transform duration-200 ${settingsOpen ? 'rotate-90' : 'opacity-40'}`}
                                    >
                                        <path d="m9 18 6-6-6-6" />
                                    </svg>
                                </button>

                                <AnimatePresence>
                                    {settingsOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden bg-gray-50/50 dark:bg-gray-900/50 rounded-xl mx-2 mb-2"
                                        >
                                            <div className="p-1 space-y-1">
                                                {/* Dark Mode Toggle */}
                                                <button
                                                    onClick={() => setDarkMode(!darkMode)}
                                                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-400 font-medium text-xs hover:bg-white dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all duration-150"
                                                >
                                                    <div className="flex items-center">
                                                        <span className="mr-3">
                                                            {darkMode ? (
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                                                            ) : (
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                                                            )}
                                                        </span>
                                                        <span>{navbar.settings.darkMode}</span>
                                                    </div>
                                                    <div className={`w-8 h-4.5 rounded-full p-0.5 transition-colors duration-200 ${darkMode ? 'bg-blue-600' : 'bg-gray-300'}`}>
                                                        <div className={`w-3.5 h-3.5 bg-white rounded-full transition-transform duration-200 ${darkMode ? 'translate-x-3.5' : 'translate-x-0'}`} />
                                                    </div>
                                                </button>

                                                {/* Clear Storage */}
                                                <button
                                                    onClick={() => {
                                                        if (confirm(navbar.settings.clearConfirm)) {
                                                            localStorage.clear();
                                                            window.location.reload();
                                                        }
                                                    }}
                                                    className="w-full flex items-center px-3 py-2.5 rounded-lg text-red-500/70 hover:text-red-600 dark:text-red-400/70 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium text-xs transition-all duration-150"
                                                >
                                                    <span className="mr-3">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                                                    </span>
                                                    <span>{navbar.settings.clearStorage}</span>
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </nav>

                        {/* Footer hint */}
                        <div className="px-6 py-3 border-t border-gray-50 dark:border-gray-800">
                            <p className="text-[10px] font-black tracking-[0.15em] uppercase text-gray-300 dark:text-gray-600">
                                {navbar.description}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default HamburgerMenu;
