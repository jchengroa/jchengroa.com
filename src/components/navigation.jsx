import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navigationData } from "../data/navbar.js";
import { 
    LuHouse, 
    LuFolder, 
    LuBookOpen, 
    LuAward, 
    LuFileText, 
    LuHammer, 
    LuMenu, 
    LuSettings, 
    LuLayers, 
    LuCode, 
    LuDatabase, 
    LuCpu, 
    LuTerminal, 
    LuAnchor, 
    LuLeaf, 
    LuShield, 
    LuBook, 
    LuBoxes, 
    LuPalette, 
    LuSearch, 
    LuServer, 
    LuGamepad2, 
    LuShare2, 
    LuHistory, 
    LuScale, 
    LuX
} from 'react-icons/lu';

// Mapping string icons from data.js to Lucide React Icons
const iconMap = {
    home: LuHouse,
    projects: LuFolder,
    research: LuBookOpen,
    recognition: LuAward,
    docs: LuFileText,
    tools: LuHammer,
    more: LuMenu,
    all: LuLayers,
    code: LuCode,
    database: LuDatabase,
    cpu: LuCpu,
    terminal: LuTerminal,
    anchor: LuAnchor,
    leaf: LuLeaf,
    shield: LuShield,
    layers: LuBoxes,
    palette: LuPalette,
    gamepad: LuGamepad2,
    search: LuSearch,
    server: LuServer,
    share: LuShare2,
    history: LuHistory,
    scale: LuScale,
    settings: LuSettings,
    close: LuX
};

function NavBar() {
    const { mainLinks, subLinks } = navigationData;
    const location = useLocation();
    const navigate = useNavigate();
    const [outlineOpen, setOutlineOpen] = useState(false);
    const [submenuOpen, setSubmenuOpen] = useState(false);
    const [activeTopic, setActiveTopic] = useState(null);
    const submenuRef = useRef(null);
    const dockRef = useRef(null);

    const [isDesktop, setIsDesktop] = useState(() => {
        if (typeof window !== "undefined") {
            return window.innerWidth >= 640 && window.matchMedia("(pointer: fine)").matches;
        }
        return true;
    });

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 640 && window.matchMedia("(pointer: fine)").matches);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const handler = (e) => setOutlineOpen(e.detail);
        window.addEventListener('documentOutlineToggle', handler);
        return () => window.removeEventListener('documentOutlineToggle', handler);
    }, []);

    // Close submenu on route change
    useEffect(() => {
        setSubmenuOpen(false);
        setActiveTopic(null);
    }, [location.pathname]);

    // Close submenu when clicking outside
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (
                submenuOpen && 
                submenuRef.current && 
                !submenuRef.current.contains(e.target) && 
                dockRef.current && 
                !dockRef.current.contains(e.target)
            ) {
                setSubmenuOpen(false);
                setActiveTopic(null);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, [submenuOpen]);

    // Detect the current active main topic based on route path
    const getActiveMainTopic = () => {
        const path = location.pathname;
        if (path === "/" || path === "/index.html") return "home";
        if (path.startsWith("/projects") || path.startsWith("/project/jchengroa-com") || path.startsWith("/project/cloudbased") || path.startsWith("/project/hardware-placeholder") || path.startsWith("/project/embedded-placeholder")) return "projects";
        if (path.startsWith("/research") || path.startsWith("/project/jhs-1") || path.startsWith("/project/shs-1") || path.startsWith("/project/shs-2")) return "research";
        if (path.startsWith("/recognition")) return "recognition";
        if (path.startsWith("/docs")) return "more";
        if (path.startsWith("/tools") || path.startsWith("/project/tictactoe-minimax")) return "more";
        if (path.startsWith("/socials") || path.startsWith("/changelog") || path.startsWith("/legal")) return "more";
        return "";
    };

    const currentActiveTopic = getActiveMainTopic();

    // Toggle menu or double-click to navigate
    const handleTopicClick = (item) => {
        if (isDesktop) {
            if (item.id === "home") {
                setSubmenuOpen(false);
                setActiveTopic(null);
                navigate("/");
                const snapContainer = document.querySelector("#home")?.parentElement;
                if (snapContainer) {
                    snapContainer.scrollTo({ top: 0, behavior: "smooth" });
                }
            } else if (item.id === "more") {
                // Toggle sub-explorer options on single click for hamburger menu
                if (activeTopic === "more") {
                    setSubmenuOpen(false);
                    setActiveTopic(null);
                } else {
                    setActiveTopic("more");
                    setSubmenuOpen(true);
                }
            } else {
                setSubmenuOpen(false);
                setActiveTopic(null);
                navigate(item.to || "/");
            }
            return;
        }

        // Touch / Mobile device logic:
        if (item.id === "home") {
            setSubmenuOpen(false);
            setActiveTopic(null);
            navigate("/");
            const snapContainer = document.querySelector("#home")?.parentElement;
            if (snapContainer) {
                snapContainer.scrollTo({ top: 0, behavior: "smooth" });
            }
            return;
        }

        if (item.id === "more") {
            // Consumed pill layout for mobile hamburger button
            if (activeTopic === "more") {
                setSubmenuOpen(false);
                setActiveTopic(null);
            } else {
                setActiveTopic("more");
                setSubmenuOpen(true);
            }
            return;
        }

        // Two-click system for projects, research, and recognition on mobile
        if (activeTopic === item.id) {
            setSubmenuOpen(false);
            setActiveTopic(null);
            navigate(item.to || "/");
        } else {
            setActiveTopic(item.id);
            setSubmenuOpen(true);
        }
    };

    const handleMouseEnter = (item) => {
        if (isDesktop) {
            // Don't open explorer on hover for home or hamburger button
            if (item.id === "home" || item.id === "more") {
                setSubmenuOpen(false);
                setActiveTopic(null);
            } else {
                setActiveTopic(item.id);
                setSubmenuOpen(true);
            }
        }
    };

    const handleMouseLeave = () => {
        if (isDesktop) {
            setSubmenuOpen(false);
            setActiveTopic(null);
        }
    };

    // Submenu animation variants
    const submenuVariants = {
        hidden: { opacity: 0, y: 15, scale: 0.95 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            transition: { type: "spring", stiffness: 350, damping: 25 }
        },
        exit: { 
            opacity: 0, 
            y: 12, 
            scale: 0.95, 
            transition: { duration: 0.15, ease: "easeIn" }
        }
    };

    const currentSubmenuLinks = activeTopic ? subLinks[activeTopic] : [];

    return (
        <div 
            onMouseLeave={handleMouseLeave}
            className={`fixed bottom-8 left-1/2 -translate-x-1/2 sm:bottom-auto sm:top-8 transition-all duration-300 flex flex-col sm:flex-col-reverse items-center gap-3 ${outlineOpen ? 'z-[40]' : 'z-[100]'}`}
        >
            {/* Secondary Floating Navbar Menu (Expanded sub-menu) */}
            <AnimatePresence>
                {(isDesktop || (activeTopic !== "more" && activeTopic !== "tools")) && submenuOpen && activeTopic && currentSubmenuLinks && (
                    <motion.div
                        ref={submenuRef}
                        variants={submenuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="w-[92vw] sm:w-[28rem] md:w-[32rem] overflow-hidden rounded-[2rem] border border-gray-100 bg-white/95 p-4 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.15)] backdrop-blur-2xl dark:border-gray-800/80 dark:bg-gray-950/95 dark:shadow-black/60 mb-1 sm:mb-0 sm:mt-1"
                    >
                        <div className="flex items-center justify-between px-2 mb-3 border-b border-gray-100 dark:border-gray-900 pb-2">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                                {activeTopic} explorer
                            </span>
                            <button
                                onClick={() => {
                                    setSubmenuOpen(false);
                                    setActiveTopic(null);
                                }}
                                className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-900 dark:hover:text-gray-200 transition-colors"
                            >
                                <LuX size={14} strokeWidth={2.5} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-[50vh] overflow-y-auto pr-1">
                            {currentSubmenuLinks.map((item) => {
                                const SubIcon = iconMap[item.icon] || LuFileText;
                                const isExternalDocs = item.to && item.to.startsWith("/docs");
                                
                                const handleSubLinkClick = (e) => {
                                    if (item.action === "settings") {
                                        e.preventDefault();
                                        window.dispatchEvent(new CustomEvent('openSettings'));
                                        setSubmenuOpen(false);
                                        setActiveTopic(null);
                                    } else if (item.action === "explore_tools") {
                                        e.preventDefault();
                                        setActiveTopic("tools");
                                    }
                                };

                                if (isExternalDocs) {
                                    return (
                                        <a
                                            key={item.label}
                                            href={item.to}
                                            onClick={handleSubLinkClick}
                                            className="flex items-start gap-3 p-3 rounded-2xl border border-transparent hover:border-blue-500/10 hover:bg-blue-50/40 dark:hover:bg-blue-950/10 hover:scale-[1.01] transition-all group"
                                        >
                                            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors shrink-0">
                                                <SubIcon size={16} strokeWidth={2.5} />
                                            </div>
                                            <div className="flex flex-col gap-0.5 min-w-0">
                                                <span className="font-bold text-xs text-gray-900 dark:text-white truncate">
                                                    {item.label}
                                                </span>
                                                <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium leading-tight line-clamp-2">
                                                    {item.desc}
                                                </span>
                                            </div>
                                        </a>
                                    );
                                }

                                return (
                                    <Link
                                        key={item.label}
                                        to={item.to}
                                        onClick={handleSubLinkClick}
                                        className="flex items-start gap-3 p-3 rounded-2xl border border-transparent hover:border-blue-500/10 hover:bg-blue-50/40 dark:hover:bg-blue-950/10 hover:scale-[1.01] transition-all group"
                                    >
                                        <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors shrink-0">
                                            <SubIcon size={16} strokeWidth={2.5} />
                                        </div>
                                        <div className="flex flex-col gap-0.5 min-w-0">
                                            <span className="font-bold text-xs text-gray-900 dark:text-white truncate">
                                                {item.label}
                                            </span>
                                            <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium leading-tight line-clamp-2">
                                                {item.desc}
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Dock / Pills Navigation */}
            <div 
                ref={dockRef}
                className="flex items-stretch gap-3 animate-navbar-entrance"
            >
                {/* Brand Logo Pill (Desktop Only) */}
                <Link
                    to="/project/jchengroa-com"
                    onClick={() => {
                        setSubmenuOpen(false);
                        setActiveTopic(null);
                    }}
                    onMouseEnter={() => {
                        setSubmenuOpen(false);
                        setActiveTopic(null);
                    }}
                    className="hidden sm:flex items-center justify-center rounded-full border border-gray-200/50 bg-white/85 px-6 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/80 font-black text-xs tracking-wider uppercase text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-300 select-none shadow-[0_24px_50px_-12px_rgba(0,0,0,0.15)]"
                >
                    jchengroa
                </Link>

                <nav className="flex items-center gap-2 sm:gap-2 rounded-full border border-gray-200/50 bg-white/85 p-2.5 sm:p-2 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/80 max-w-[95vw] transition-all duration-300">
                    {!isDesktop && submenuOpen && (activeTopic === "more" || activeTopic === "tools") ? (
                        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 pr-2 max-w-[85vw]">
                            {/* Back Button */}
                            <button
                                onClick={() => {
                                    setSubmenuOpen(false);
                                    setActiveTopic(null);
                                }}
                                className="flex flex-col items-center justify-center gap-0.5 rounded-full text-center px-3 py-1.5 min-w-[50px] bg-blue-50/90 dark:bg-white/10 text-blue-600 dark:text-white"
                            >
                                <LuX size={18} strokeWidth={2.5} />
                                <span className="text-[8px] uppercase font-black tracking-wider">Back</span>
                            </button>
                            
                            <div className="h-5 w-[1px] bg-gray-200 dark:bg-gray-800 shrink-0 mx-1.5" />
                            
                            {/* Sub explorer links */}
                            {currentSubmenuLinks.map((item) => {
                                const SubIcon = iconMap[item.icon] || LuFileText;
                                const isExternalDocs = item.to && item.to.startsWith("/docs");
                                
                                const handleMobileSubClick = (e) => {
                                    if (item.action === "settings") {
                                        e.preventDefault();
                                        window.dispatchEvent(new CustomEvent('openSettings'));
                                        setSubmenuOpen(false);
                                        setActiveTopic(null);
                                    } else if (item.action === "explore_tools") {
                                        e.preventDefault();
                                        setActiveTopic("tools");
                                    } else {
                                        if (isExternalDocs) {
                                            window.location.href = item.to;
                                        } else {
                                            navigate(item.to);
                                        }
                                        setSubmenuOpen(false);
                                        setActiveTopic(null);
                                    }
                                };
 
                                return (
                                    <button
                                        key={item.label}
                                        onClick={handleMobileSubClick}
                                        className="flex flex-col items-center justify-center gap-0.5 rounded-full text-center px-3 py-1.5 min-w-[60px] text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                                    >
                                        <SubIcon size={18} strokeWidth={2.5} />
                                        <span className="text-[8px] tracking-wider uppercase font-black whitespace-nowrap">
                                            {item.label.split(" ")[0]}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    ) : (
                        mainLinks.map((item) => {
                            const Icon = iconMap[item.icon] || LuMenu;
                            const isCurrent = currentActiveTopic === item.id;
                            const hasSubmenuActive = activeTopic === item.id;
                            const isActive = activeTopic ? hasSubmenuActive : isCurrent;
 
                            // Display Awards in place of Recognition for spacing
                            const displayLabel = item.id === "recognition" ? "Awards" : item.label;
 
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleTopicClick(item)}
                                    onMouseEnter={() => handleMouseEnter(item)}
                                    className={`flex flex-col items-center justify-center gap-1 rounded-full text-center transition-all duration-300 font-bold ${
                                        isActive
                                            ? "px-4 py-2.5 min-w-[76px] bg-blue-50/80 text-blue-600 dark:bg-white/10 dark:text-white shadow-inner"
                                            : "px-3.5 py-2.5 min-w-[48px] text-gray-500 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/5"
                                    } sm:px-5 sm:py-2.5 sm:min-w-[85px]`}
                                >
                                    <Icon size={22} strokeWidth={2.5} />
                                    <span className={`text-[9px] tracking-wider uppercase font-black transition-all duration-300 ${
                                        isActive ? "block" : "hidden sm:block"
                                    }`}>
                                        {displayLabel}
                                    </span>
                                </button>
                            );
                        })
                    )}
                </nav>
            </div>
        </div>
    );
}

export { NavBar };
export default NavBar;
