import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useData } from "../context/dataContext.jsx";
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
    LuArrowLeft,
    LuX
} from 'react-icons/lu';
import {
    getSubmenuVariants,
    explorerItemVariants,
    mobileSubnavContainerVariants,
    getMobileSubnavItemVariants,
    mainNavContainerVariants,
    dockContainerTransition,
    activeDockIndicatorTransition,
    navPillTap,
    navPillHover,
    brandLogoHover,
    brandLogoTap,
    explorerCardHover,
    explorerCardTap,
    navbarEntranceVariants
} from '../animations/navigation.js';

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
    const { siteContent } = useData();
    const navigationData = siteContent.navigation_data;
    const { mainLinks, subLinks } = navigationData;
    const location = useLocation();
    const navigate = useNavigate();
    const [outlineOpen, setOutlineOpen] = useState(false);
    // Detect the current active main topic based on route path
    const getActiveMainTopic = () => {
        const path = location.pathname;
        if (path === "/" || path === "/index.html") return "home";
        if (path.startsWith("/projects")) return "projects";
        if (path.startsWith("/research")) return "research";
        if (path.startsWith("/recognition")) return "recognition";
        if (path.startsWith("/contact") || path.startsWith("/socials") || path.startsWith("/changelog") || path.startsWith("/legal") || path.startsWith("/docs")) return "more";
        return "";
    };

    const isMoreRoute = (path) => {
        return path.startsWith("/contact") || path.startsWith("/socials") || path.startsWith("/changelog") || path.startsWith("/legal") || path.startsWith("/docs");
    };

    const [submenuOpen, setSubmenuOpen] = useState(() => {
        if (typeof window !== "undefined") {
            const isDesk = window.innerWidth >= 640 && window.matchMedia("(pointer: fine)").matches;
            if (!isDesk && isMoreRoute(window.location.pathname)) {
                return true;
            }
        }
        return false;
    });
    const [activeTopic, setActiveTopic] = useState(() => {
        if (typeof window !== "undefined") {
            const isDesk = window.innerWidth >= 640 && window.matchMedia("(pointer: fine)").matches;
            if (!isDesk && isMoreRoute(window.location.pathname)) {
                return "more";
            }
        }
        return null;
    });
    const [isPinned, setIsPinned] = useState(false);
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

    // Close submenu on desktop route change, but retain "more" navigation pill on mobile when navigating pages within more
    useEffect(() => {
        if (isDesktop) {
            setSubmenuOpen(false);
            setActiveTopic(null);
            setIsPinned(false);
        } else {
            const topic = getActiveMainTopic();
            if (topic === "more") {
                setSubmenuOpen(true);
                setActiveTopic("more");
            } else {
                setSubmenuOpen(false);
                setActiveTopic(null);
            }
        }
    }, [location.pathname, isDesktop]);

    // Handle any interaction outside when pinned on desktop (click, touch, scroll, escape key, focus)
    useEffect(() => {
        if (!isDesktop || !isPinned) return;

        const handleInteractionOutside = (event) => {
            if (submenuRef.current && !submenuRef.current.contains(event.target)) {
                // If clicking an interactive button/link inside the dock, allow its click handler to fire
                const clickedButton = event.target.closest('button') || event.target.closest('a');
                if (dockRef.current && dockRef.current.contains(event.target) && clickedButton) {
                    return;
                }
                setSubmenuOpen(false);
                setActiveTopic(null);
                setIsPinned(false);
            }
        };

        const handleScroll = (event) => {
            if (submenuRef.current && !submenuRef.current.contains(event.target)) {
                setSubmenuOpen(false);
                setActiveTopic(null);
                setIsPinned(false);
            }
        };

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setSubmenuOpen(false);
                setActiveTopic(null);
                setIsPinned(false);
            }
        };

        document.addEventListener('mousedown', handleInteractionOutside);
        document.addEventListener('touchstart', handleInteractionOutside, { passive: true });
        window.addEventListener('scroll', handleScroll, { passive: true, capture: true });
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('mousedown', handleInteractionOutside);
            document.removeEventListener('touchstart', handleInteractionOutside);
            window.removeEventListener('scroll', handleScroll, { capture: true });
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isDesktop, isPinned]);

    const currentActiveTopic = getActiveMainTopic();

    // Toggle menu or double-click to navigate
    const handleTopicClick = (item) => {
        if (isDesktop) {
            if (item.id === "home") {
                setSubmenuOpen(false);
                setActiveTopic(null);
                setIsPinned(false);
                navigate("/");
                const snapContainer = document.querySelector("#home")?.parentElement;
                if (snapContainer) {
                    snapContainer.scrollTo({ top: 0, behavior: "smooth" });
                }
            } else if (item.id === "more") {
                // Clicking more pins or unpins the more explorer
                if (activeTopic === "more" && isPinned) {
                    setSubmenuOpen(false);
                    setActiveTopic(null);
                    setIsPinned(false);
                } else {
                    setActiveTopic("more");
                    setSubmenuOpen(true);
                    setIsPinned(true);
                }
            } else {
                setSubmenuOpen(false);
                setActiveTopic(null);
                setIsPinned(false);
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
            // Rule 1: If more explorer is pinned, other buttons will not show hover preview
            if (isPinned) return;

            // Don't open explorer on hover for home
            if (item.id === "home") {
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
            if (!isPinned) {
                setSubmenuOpen(false);
                setActiveTopic(null);
            }
        }
    };

    const submenuVariants = getSubmenuVariants(isDesktop);

    const rawSubmenuLinks = activeTopic ? (subLinks[activeTopic] || []) : [];
    const currentSubmenuLinks = rawSubmenuLinks.map(link => 
        link.to === '/socials' ? { ...link, to: '/contact', label: 'Contact' } : link
    );

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
                        className="relative z-30 w-[94vw] sm:w-[32rem] md:w-[36rem] rounded-[2rem] border border-gray-100/80 bg-white/95 p-3.5 sm:p-4 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.15)] backdrop-blur-2xl dark:border-gray-800/80 dark:bg-gray-950/95 dark:shadow-black/60 mb-1 sm:mb-0 sm:mt-1.5"
                    >
                        <div className="flex items-center justify-between px-2 mb-2 sm:mb-2.5 border-b border-gray-100 dark:border-gray-900 pb-2">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                                {activeTopic} explorer
                            </span>
                            <button
                                onClick={() => {
                                    setSubmenuOpen(false);
                                    setActiveTopic(null);
                                    setIsPinned(false);
                                }}
                                className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-900 dark:hover:text-gray-200 transition-colors"
                            >
                                <LuX size={14} strokeWidth={2.5} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 w-full no-scrollbar">
                            {currentSubmenuLinks.map((item) => {
                                const SubIcon = iconMap[item.icon] || LuFileText;
                                const isExternalDocs = item.to && item.to.startsWith("/docs");
                                
                                const handleSubLinkClick = (e) => {
                                    if (item.action === "settings") {
                                        e.preventDefault();
                                        window.dispatchEvent(new CustomEvent('openSettings'));
                                        setSubmenuOpen(false);
                                        setActiveTopic(null);
                                        setIsPinned(false);
                                    } else if (item.action === "explore_tools") {
                                        e.preventDefault();
                                        setActiveTopic("tools");
                                    } else {
                                        setSubmenuOpen(false);
                                        setActiveTopic(null);
                                        setIsPinned(false);
                                    }
                                };

                                const topicColors = {
                                    projects: {
                                        bg: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white",
                                        hoverBorder: "hover:border-blue-500/20 hover:bg-blue-50/40 dark:hover:bg-blue-950/20"
                                    },
                                    research: {
                                        bg: "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white",
                                        hoverBorder: "hover:border-indigo-500/20 hover:bg-indigo-50/40 dark:hover:bg-indigo-950/20"
                                    },
                                    recognition: {
                                        bg: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 group-hover:bg-amber-600 group-hover:text-white",
                                        hoverBorder: "hover:border-amber-500/20 hover:bg-amber-50/40 dark:hover:bg-amber-950/20"
                                    }
                                }[activeTopic] || {
                                    bg: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 group-hover:bg-blue-500 group-hover:text-white",
                                    hoverBorder: "hover:border-blue-500/10 hover:bg-blue-50/40 dark:hover:bg-blue-950/10"
                                };

                                if (isExternalDocs) {
                                    return (
                                        <motion.a
                                            key={item.label}
                                            variants={explorerItemVariants}
                                            whileHover={explorerCardHover}
                                            whileTap={explorerCardTap}
                                            href={item.to}
                                            onClick={handleSubLinkClick}
                                            className={`flex items-start gap-2.5 p-2.5 rounded-2xl border border-transparent ${topicColors.hoverBorder} transition-all group`}
                                        >
                                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${topicColors.bg} transition-colors shrink-0`}>
                                                <SubIcon size={15} strokeWidth={2.5} />
                                            </div>
                                            <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                                                <span className="font-bold text-xs text-gray-900 dark:text-white truncate leading-tight">
                                                    {item.label}
                                                </span>
                                                <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium leading-snug line-clamp-2">
                                                    {item.desc}
                                                </span>
                                            </div>
                                        </motion.a>
                                    );
                                }

                                return (
                                    <motion.div
                                        key={item.label}
                                        variants={explorerItemVariants}
                                        whileHover={explorerCardHover}
                                        whileTap={explorerCardTap}
                                    >
                                        <Link
                                            to={item.to}
                                            onClick={handleSubLinkClick}
                                            className={`flex items-start gap-2.5 p-2.5 rounded-2xl border border-transparent ${topicColors.hoverBorder} transition-all group w-full`}
                                        >
                                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${topicColors.bg} transition-colors shrink-0`}>
                                                <SubIcon size={15} strokeWidth={2.5} />
                                            </div>
                                            <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                                                <span className="font-bold text-xs text-gray-900 dark:text-white truncate leading-tight">
                                                    {item.label}
                                                </span>
                                                <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium leading-snug line-clamp-2">
                                                    {item.desc}
                                                </span>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );

                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Dock / Pills Navigation */}
            <motion.div 
                ref={dockRef}
                variants={navbarEntranceVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 flex items-stretch gap-3 w-[95vw] sm:w-auto"
            >
                {/* Brand Logo Pill (Desktop Only) */}
                <motion.div
                    whileHover={brandLogoHover}
                    whileTap={brandLogoTap}
                    className="hidden sm:flex"
                >
                    <Link
                        to="/projects/jchengroa-com"
                        onClick={() => {
                            setSubmenuOpen(false);
                            setActiveTopic(null);
                            setIsPinned(false);
                        }}
                        onMouseEnter={() => {
                            if (!isPinned) {
                                setSubmenuOpen(false);
                                setActiveTopic(null);
                            }
                        }}
                        className="flex items-center justify-center rounded-full border border-gray-200/50 bg-white/85 px-6 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/80 font-black text-sm tracking-tight lowercase text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-300 select-none h-full"
                    >
                        jchengroa
                    </Link>
                </motion.div>

                <motion.nav 
                    layout
                    transition={dockContainerTransition}
                    className="relative z-10 flex items-center justify-around w-full sm:w-auto gap-1 sm:gap-2 rounded-full border border-gray-200/50 bg-white/85 p-2.5 sm:p-2 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/80 max-w-[95vw] transition-all duration-300 overflow-hidden"
                >
                    <AnimatePresence mode="wait" initial={false}>
                        {!isDesktop && submenuOpen && (activeTopic === "more" || activeTopic === "tools") ? (
                            <motion.div
                                key="mobile-subnav"
                                {...mobileSubnavContainerVariants}
                                className="flex items-center justify-around w-full sm:w-auto gap-1 sm:gap-2 overflow-x-auto no-scrollbar"
                            >
                                {/* Back Button with Red Highlight and Left Arrow (No label) */}
                                <motion.button
                                    whileTap={navPillTap}
                                    onClick={() => {
                                        setSubmenuOpen(false);
                                        setActiveTopic(null);
                                    }}
                                    aria-label="Back to main navigation"
                                    className="flex items-center justify-center rounded-full text-center transition-all duration-300 font-bold px-3.5 py-2.5 min-w-[48px] bg-red-50/90 text-red-600 hover:bg-red-100 hover:text-red-700 active:bg-red-200/60 dark:bg-red-950/50 dark:text-red-400 dark:hover:bg-red-900/60 dark:hover:text-red-300 shadow-inner shrink-0"
                                >
                                    <LuArrowLeft size={22} strokeWidth={2.5} />
                                </motion.button>
                                
                                <div className="h-6 w-[1px] bg-gray-200 dark:bg-gray-800 shrink-0 mx-1" />
                                
                                {/* Sub explorer links */}
                                {currentSubmenuLinks.map((item, index) => {
                                    const SubIcon = iconMap[item.icon] || LuFileText;
                                    const isExternalDocs = item.to && item.to.startsWith("/docs");
                                    const isCurrent = item.to ? (location.pathname === item.to || (item.to !== '/' && location.pathname.startsWith(item.to))) : false;
                                    
                                    const handleMobileSubClick = (e) => {
                                        if (item.action === "settings") {
                                            e.preventDefault();
                                            window.dispatchEvent(new CustomEvent('openSettings'));
                                        } else if (item.action === "explore_tools") {
                                            e.preventDefault();
                                            setActiveTopic("tools");
                                        } else {
                                            if (isExternalDocs) {
                                                window.location.href = item.to;
                                            } else {
                                                navigate(item.to);
                                            }
                                        }
                                    };

                                    return (
                                        <motion.button
                                            key={item.label}
                                            {...getMobileSubnavItemVariants(index)}
                                            whileTap={navPillTap}
                                            onClick={handleMobileSubClick}
                                            className={`flex flex-col items-center justify-center gap-1 rounded-full text-center transition-all duration-300 font-bold ${
                                                isCurrent
                                                    ? "px-4 py-2.5 min-w-[76px] bg-blue-50/80 text-blue-600 dark:bg-white/10 dark:text-white shadow-inner"
                                                    : "px-3.5 py-2.5 min-w-[48px] text-gray-500 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/5"
                                            } shrink-0 sm:px-5 sm:py-2.5 sm:min-w-[85px]`}
                                        >
                                            <SubIcon size={22} strokeWidth={2.5} />
                                            <span className={`text-[9px] tracking-wider uppercase font-black transition-all duration-300 whitespace-nowrap ${
                                                isCurrent ? "block" : "hidden sm:block"
                                            }`}>
                                                {item.label.split(" ")[0]}
                                            </span>
                                        </motion.button>
                                    );
                                })}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="main-nav"
                                {...mainNavContainerVariants}
                                className="flex items-center justify-around w-full sm:w-auto gap-1 sm:gap-2"
                            >
                                {mainLinks.map((item) => {
                                    const Icon = iconMap[item.icon] || LuMenu;
                                    const isCurrent = currentActiveTopic === item.id;
                                    const hasSubmenuActive = activeTopic === item.id;
                                    const isActive = activeTopic ? hasSubmenuActive : isCurrent;

                                    // Display Awards in place of Recognition for spacing
                                    const displayLabel = item.id === "recognition" ? "Awards" : item.label;

                                    return (
                                        <motion.button
                                            key={item.id}
                                            whileHover={isDesktop ? navPillHover : {}}
                                            whileTap={navPillTap}
                                            onClick={() => handleTopicClick(item)}
                                            onMouseEnter={() => handleMouseEnter(item)}
                                            className={`relative flex flex-col items-center justify-center gap-1 rounded-full text-center transition-colors duration-300 font-bold ${
                                                isActive
                                                    ? "px-4 py-2.5 min-w-[76px] text-blue-600 dark:text-white"
                                                    : "px-3.5 py-2.5 min-w-[48px] text-gray-500 hover:text-gray-900 hover:bg-gray-50/50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/5"
                                            } sm:px-5 sm:py-2.5 sm:min-w-[85px]`}
                                        >
                                            {/* Sliding Active Pill Capsule for Desktop & Mobile Main Nav */}
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeDockIndicator"
                                                    className="absolute inset-0 bg-blue-50/80 dark:bg-white/10 rounded-full shadow-inner -z-0"
                                                    transition={activeDockIndicatorTransition}
                                                />
                                            )}
                                            <Icon size={22} strokeWidth={2.5} className="relative z-10" />
                                            <span className={`relative z-10 text-[9px] tracking-wider uppercase font-black transition-all duration-300 ${
                                                isActive ? "block" : "hidden sm:block"
                                            }`}>
                                                {displayLabel}
                                            </span>
                                        </motion.button>
                                    );
                                })}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.nav>
            </motion.div>
        </div>
    );
}

export { NavBar };
export default NavBar;
