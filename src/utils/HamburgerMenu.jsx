import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Menu Items ──────────────────────────────────────────── */
const MENU_ITEMS = [
    { label: "Projects", to: "/projects", active: true, icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 17V5c0-1.1.9-2 2-2h4l2 2h10c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2Z"/><path d="M2 9h20"/></svg> },
    { label: "Research", to: "/research", active: true, icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg> },
    { label: "Forums", to: "/forums", active: false, icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
    { label: "Docs", to: "/docs", active: false, icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg> },
    { label: "Downloads", to: "/downloadables", active: false, icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> },
    { label: "Legal & Domain", to: "/legal", active: true, icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
];

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
                className="block h-[2px] bg-gray-900 rounded-full origin-center"
                animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            />
            <motion.span
                className="block h-[2px] bg-gray-900 rounded-full"
                animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.15 }}
            />
            <motion.span
                className="block h-[2px] bg-gray-900 rounded-full origin-center"
                animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            />
        </div>
    );
}

/* ─── Main Component ──────────────────────────────────────── */
function HamburgerMenu() {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const location = useLocation();

    /* Close on route change */
    useEffect(() => { setOpen(false); }, [location.pathname]);

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
                className="flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
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
                        className="absolute right-0 top-[calc(100%+0.75rem)] w-64 bg-white/95 backdrop-blur-lg border border-gray-100 rounded-2xl shadow-xl overflow-hidden"
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
                                            className="flex items-center justify-between px-4 py-3 rounded-xl text-gray-700 font-semibold text-sm hover:bg-gray-50 hover:text-gray-900 transition-all duration-150 group"
                                            onClick={() => setOpen(false)}
                                        >
                                            <div className="flex items-center">
                                                <span className="text-gray-400 group-hover:text-blue-600 transition-colors mr-3">
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
                                            className="flex items-center justify-between px-4 py-3 rounded-xl text-gray-300 font-semibold text-sm cursor-not-allowed select-none"
                                        >
                                            <div className="flex items-center">
                                                <span className="text-gray-300 mr-3">
                                                    {item.icon}
                                                </span>
                                                <span>{item.label}</span>
                                            </div>
                                            <span className="text-[10px] font-black tracking-widest uppercase text-gray-200 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-full">
                                                Soon
                                            </span>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </nav>

                        {/* Footer hint */}
                        <div className="px-6 py-3 border-t border-gray-50">
                            <p className="text-[10px] font-black tracking-[0.15em] uppercase text-gray-300">
                                jchengroa.com
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default HamburgerMenu;
