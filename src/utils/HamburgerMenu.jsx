import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { siteContent } from "../data/site_content";

const { navbar } = siteContent;

const iconMap = {
    projects: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><path d="M2 17V5c0-1.1.9-2 2-2h4l2 2h10c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2Z" /><path d="M2 9h20" /></svg>,
    research: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>,
    recognition: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg>,
    docs: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>,
    downloads: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>,
    changelog: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" /></svg>,
    legal: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
};

const MENU_ITEMS = navbar.links.map((link) => ({
    ...link,
    icon: iconMap[link.icon]
}));

const PRIMARY_ITEMS = MENU_ITEMS.filter((item) => item.showInNavbar);
const SECONDARY_ITEMS = MENU_ITEMS.filter((item) => !item.showInNavbar);

const panelVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.985 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] }
    },
    exit: {
        opacity: 0,
        y: -8,
        scale: 0.985,
        transition: { duration: 0.14, ease: [0.4, 0, 1, 1] }
    }
};

const itemVariants = {
    hidden: { opacity: 0, x: -8 },
    visible: (index) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: index * 0.03,
            duration: 0.16,
            ease: "easeOut"
        }
    })
};

function HamburgerIcon({ open }) {
    return (
        <div className="relative flex h-4 w-5 flex-col justify-between">
            <motion.span
                className="block h-[2px] rounded-full bg-gray-900 dark:bg-gray-100"
                animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            />
            <motion.span
                className="block h-[2px] rounded-full bg-gray-900 dark:bg-gray-100"
                animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.14 }}
            />
            <motion.span
                className="block h-[2px] rounded-full bg-gray-900 dark:bg-gray-100"
                animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            />
        </div>
    );
}

function MenuItem({ item, activePath, onSelect }) {
    const isCurrent = item.to === activePath;

    if (!item.active) {
        return (
            <div className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-300 dark:text-gray-600">
                <div className="flex items-center gap-3">
                    <span className="text-gray-300 dark:text-gray-700">{item.icon}</span>
                    <span>{item.label}</span>
                </div>
                <span className="rounded-full border border-gray-100 px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.16em] text-gray-300 dark:border-gray-800 dark:text-gray-700">
                    Soon
                </span>
            </div>
        );
    }

    return (
        <Link
            to={item.to}
            onClick={onSelect}
            aria-current={isCurrent ? "page" : undefined}
            className={`group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${isCurrent
                ? "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-200"
                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                }`}
        >
            <div className="flex items-center gap-3">
                <span className={isCurrent ? "text-blue-600 dark:text-blue-300" : "text-gray-400 group-hover:text-blue-600 dark:text-gray-500 dark:group-hover:text-blue-400"}>
                    {item.icon}
                </span>
                <span>{item.label}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" className={`transition-all ${isCurrent ? "opacity-50" : "opacity-0 group-hover:translate-x-0.5 group-hover:opacity-40"}`}>
                <path d="m9 18 6-6-6-6" />
            </svg>
        </Link>
    );
}

function HamburgerMenu() {
    const [open, setOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("darkMode");
            if (saved !== null) {
                return JSON.parse(saved);
            }
        }
        return false;
    });

    const location = useLocation();
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const firstActionRef = useRef(null);

    useEffect(() => {
        setOpen(false);
        setSettingsOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }, [darkMode]);

    useEffect(() => {
        if (!open) {
            return undefined;
        }

        firstActionRef.current?.focus();

        const handlePointerDown = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("mousedown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
            buttonRef.current?.focus();
        };
    }, [open]);

    return (
        <div ref={menuRef} className="relative">
            <button
                ref={buttonRef}
                id="hamburger-toggle"
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="hamburger-menu-panel"
                onClick={() => setOpen((value) => !value)}
                className="flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-200 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:bg-gray-800"
            >
                <HamburgerIcon open={open} />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        id="hamburger-menu-panel"
                        role="dialog"
                        aria-label="Site menu"
                        variants={panelVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute right-0 top-[calc(100%+0.75rem)] z-[120] w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-[1.75rem] border border-gray-100 bg-white/95 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.35)] backdrop-blur-2xl dark:border-gray-800 dark:bg-gray-900/95 dark:shadow-black/50"
                    >
                        <div className="max-h-[min(70vh,34rem)] overflow-y-auto p-2">
                            <div className="space-y-1">
                                {PRIMARY_ITEMS.map((item, index) => (
                                    <motion.div
                                        key={item.label}
                                        custom={index}
                                        variants={itemVariants}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        <MenuItem
                                            item={item}
                                            activePath={location.pathname}
                                            onSelect={() => setOpen(false)}
                                        />
                                    </motion.div>
                                ))}
                            </div>

                            {SECONDARY_ITEMS.length > 0 && (
                                <div className="mt-3 border-t border-gray-100 pt-3 dark:border-gray-800">
                                    <div className="space-y-1">
                                        {SECONDARY_ITEMS.map((item, index) => (
                                            <motion.div
                                                key={item.label}
                                                custom={PRIMARY_ITEMS.length + index}
                                                variants={itemVariants}
                                                initial="hidden"
                                                animate="visible"
                                            >
                                                <MenuItem
                                                    item={item}
                                                    activePath={location.pathname}
                                                    onSelect={() => setOpen(false)}
                                                />
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="mt-3 border-t border-gray-100 pt-3 dark:border-gray-800">
                                <button
                                    ref={firstActionRef}
                                    type="button"
                                    onClick={() => setSettingsOpen((value) => !value)}
                                    aria-expanded={settingsOpen}
                                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-gray-400 dark:text-gray-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
                                        </span>
                                        <span>{navbar.settings.title}</span>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${settingsOpen ? "rotate-90" : "opacity-40"}`}>
                                        <path d="m9 18 6-6-6-6" />
                                    </svg>
                                </button>

                                <AnimatePresence initial={false}>
                                    {settingsOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="mt-1 space-y-1 rounded-xl bg-gray-50/70 p-1 dark:bg-gray-950/40">
                                                <button
                                                    type="button"
                                                    onClick={() => setDarkMode((value) => !value)}
                                                    className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-white hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span>
                                                            {darkMode ? (
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
                                                            ) : (
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg>
                                                            )}
                                                        </span>
                                                        <span>{navbar.settings.darkMode}</span>
                                                    </div>
                                                    <span className={`flex h-5 w-9 items-center rounded-full p-0.5 transition-colors ${darkMode ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-700"}`}>
                                                        <span className={`h-4 w-4 rounded-full bg-white transition-transform ${darkMode ? "translate-x-4" : ""}`} />
                                                    </span>
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        if (window.confirm(navbar.settings.clearConfirm)) {
                                                            localStorage.clear();
                                                            window.location.reload();
                                                        }
                                                    }}
                                                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500/80 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-red-400/80 dark:hover:bg-red-950/20 dark:hover:text-red-300"
                                                >
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>
                                                    </span>
                                                    <span>{navbar.settings.clearStorage}</span>
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default HamburgerMenu;
