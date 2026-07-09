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
        if (path.startsWith("/docs")) return "docs";
        if (path.startsWith("/tools") || path.startsWith("/project/tictactoe-minimax")) return "more";
        if (path.startsWith("/socials") || path.startsWith("/changelog") || path.startsWith("/legal")) return "more";
        return "";
    };

    const currentActiveTopic = getActiveMainTopic();

    // Toggle menu or double-click to navigate
    const handleTopicClick = (item) => {
        if (item.id === "home") {
            setSubmenuOpen(false);
            setActiveTopic(null);
            navigate("/");
            // Quality of Life: Scroll snap container to top hero section
            const snapContainer = document.querySelector("#home")?.parentElement;
            if (snapContainer) {
                snapContainer.scrollTo({ top: 0, behavior: "smooth" });
            }
            return;
        }

        // If clicking the currently active topic, it's a "second click" -> Navigate directly
        if (activeTopic === item.id) {
            setSubmenuOpen(false);
            setActiveTopic(null);
            
            // Redirect depending on the clicked topic
            if (item.id === "more") {
                navigate("/socials");
            } else {
                navigate(item.to || "/");
            }
        } else {
            // First click -> Open submenu explorer
            setActiveTopic(item.id);
            setSubmenuOpen(true);
        }
    };

    // Submenu animation variants (preserves left-1/2 centering with -50% translateX)
    const submenuVariants = {
        hidden: { opacity: 0, y: 15, scale: 0.95, x: "-50%" },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            x: "-50%",
            transition: { type: "spring", stiffness: 350, damping: 25 }
        },
        exit: { 
            opacity: 0, 
            y: 12, 
            scale: 0.95, 
            x: "-50%",
            transition: { duration: 0.15, ease: "easeIn" }
        }
    };

    const currentSubmenuLinks = activeTopic ? subLinks[activeTopic] : [];

    return (
        <>
            {/* Secondary Floating Navbar Menu (Expanded sub-menu) */}
            <AnimatePresence>
                {submenuOpen && activeTopic && currentSubmenuLinks && (
                    <motion.div
                        ref={submenuRef}
                        variants={submenuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed bottom-32 left-1/2 z-[90] w-[92vw] sm:w-[28rem] md:w-[32rem] overflow-hidden rounded-[2rem] border border-gray-150 bg-white/95 p-4 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.15)] backdrop-blur-2xl dark:border-gray-800/80 dark:bg-gray-950/95 dark:shadow-black/60"
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
                                const isExternalDocs = item.to.startsWith("/docs");
                                
                                const handleSubLinkClick = (e) => {
                                    if (item.action === "settings") {
                                        e.preventDefault();
                                        window.dispatchEvent(new CustomEvent('openSettings'));
                                        setSubmenuOpen(false);
                                        setActiveTopic(null);
                                    } else if (item.action === "explore_tools") {
                                        e.preventDefault();
                                        // Dynamically swap submenu content to Tools explorer!
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

            {/* Main Bottom-Floating Dock / Pills Navigation (Theme-Aware and Reference pill Highlight wrap) */}
            <div 
                ref={dockRef}
                className={`fixed bottom-8 left-1/2 -translate-x-1/2 transition-all duration-300 ${outlineOpen ? 'z-[40]' : 'z-[100]'}`}
            >
                <nav className="flex items-center gap-1 sm:gap-2 rounded-full border border-gray-200/50 bg-white/85 p-2 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/80">
                    {mainLinks.map((item) => {
                        const Icon = iconMap[item.icon] || LuMenu;
                        const isCurrent = currentActiveTopic === item.id;
                        const hasSubmenuActive = activeTopic === item.id;
                        const isActive = hasSubmenuActive || isCurrent;

                        // Display Awards in place of Recognition for spacing
                        const displayLabel = item.id === "recognition" ? "Awards" : item.label;

                        return (
                            <button
                                key={item.id}
                                onClick={() => handleTopicClick(item)}
                                className={`flex flex-col items-center justify-center gap-1 rounded-full text-center transition-all duration-300 font-bold px-4 py-2 sm:px-5 sm:py-2.5 min-w-[70px] sm:min-w-[85px] ${
                                    isActive
                                        ? "bg-blue-50/80 text-blue-600 dark:bg-white/10 dark:text-white shadow-inner"
                                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/5"
                                }`}
                            >
                                <Icon size={22} strokeWidth={2.5} />
                                <span className="text-[9px] tracking-wider uppercase font-black">{displayLabel}</span>
                            </button>
                        );
                    })}
                </nav>
            </div>
        </>
    );
}

export { NavBar };
export default NavBar;
