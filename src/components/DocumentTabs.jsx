import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

function DocumentTabs({ tabs = [] }) {
    const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");
    const [isDesktopOpen, setIsDesktopOpen] = useState(() => {
        return localStorage.getItem('jchengroa_doc_tabs_desktop_open') !== 'false';
    });
    const [isOpen, setIsOpen] = useState(false);
    const [sheetHeight, setSheetHeight] = useState(55);
    const isDragging = useRef(false);
    const dragStartY = useRef(0);
    const dragStartHeight = useRef(0);
    const isScrollingRef = useRef(false);

    const toggleDesktopOpen = (nextState) => {
        setIsDesktopOpen(nextState);
        localStorage.setItem('jchengroa_doc_tabs_desktop_open', nextState.toString());
    };

    useEffect(() => {
        window.dispatchEvent(new CustomEvent('documentOutlineToggle', { detail: isOpen }));
    }, [isOpen]);

    useEffect(() => {
        return () => window.dispatchEvent(new CustomEvent('documentOutlineToggle', { detail: false }));
    }, []);

    const handleDragStart = (e) => {
        isDragging.current = true;
        dragStartY.current = e.touches ? e.touches[0].clientY : e.clientY;
        dragStartHeight.current = sheetHeight;
        document.body.style.userSelect = 'none';
    };

    const handleDragMove = (e) => {
        if (!isDragging.current) return;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const deltaY = dragStartY.current - clientY;
        const vh = window.innerHeight;
        const deltaVh = (deltaY / vh) * 100;
        const newHeight = Math.max(15, Math.min(95, dragStartHeight.current + deltaVh));
        setSheetHeight(newHeight);
    };

    const handleDragEnd = () => {
        isDragging.current = false;
        document.body.style.userSelect = '';
        if (sheetHeight < 25) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        const onMove = (e) => handleDragMove(e);
        const onEnd = () => handleDragEnd();
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onEnd);
        window.addEventListener('touchmove', onMove, { passive: false });
        window.addEventListener('touchend', onEnd);
        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onEnd);
            window.removeEventListener('touchmove', onMove);
            window.removeEventListener('touchend', onEnd);
        };
    }, [sheetHeight]);

    useEffect(() => {
        const handleScroll = () => {
            if (isScrollingRef.current) return;

            const headingElements = tabs.map(tab => ({
                id: tab.id,
                element: document.getElementById(tab.id)
            })).filter(item => item.element !== null);

            if (headingElements.length === 0) return;

            const visibleElements = headingElements.filter(({ element }) => {
                const rect = element.getBoundingClientRect();
                return rect.top <= window.innerHeight * 0.5 && rect.bottom > 100;
            });

            if (visibleElements.length > 0) {
                const isCurrentVisible = visibleElements.some(item => item.id === activeTab);
                if (!isCurrentVisible) {
                    setActiveTab(visibleElements[0].id);
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [tabs, activeTab]);

    const scrollToSection = (id) => {
        isScrollingRef.current = true;
        setActiveTab(id);
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -120;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
        setIsOpen(false);

        setTimeout(() => {
            isScrollingRef.current = false;
        }, 1000);
    };

    if (!tabs || tabs.length === 0) return null;

    return (
        <>
            {/* Desktop View: Floating Left Sidebar */}
            <AnimatePresence>
                {isDesktopOpen ? (
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="hidden xl:flex fixed left-6 top-28 bottom-6 z-40 w-64 bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl border border-gray-200/50 dark:border-gray-800/50 rounded-[2.5rem] p-6 shadow-2xl flex-col justify-between overflow-hidden"
                    >
                        <div>
                            <div className="flex items-center justify-between mb-8 px-1">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-2xl shadow-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" /><path d="M6 5h10" /><path d="M6 9h10" /><path d="M6 13h6" /></svg>
                                    </div>
                                    <span className="text-sm font-black tracking-widest uppercase text-gray-900 dark:text-white">Outline</span>
                                </div>
                                <button
                                    onClick={() => toggleDesktopOpen(false)}
                                    className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                                    title="Hide Navigation"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M9 3v18" /><path d="m16 15-3-3 3-3" /></svg>
                                </button>
                            </div>
                            <nav className="flex flex-col gap-2 relative overflow-y-auto max-h-[calc(100vh-16rem)] pr-1">
                                {tabs.map((tab) => {
                                    const isActive = activeTab === tab.id;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => scrollToSection(tab.id)}
                                            className={`flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-left text-xs font-bold transition-all relative group ${isActive ? 'text-blue-600 dark:text-blue-400 font-black bg-blue-50/50 dark:bg-blue-950/20 shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}
                                        >
                                            {isActive && (
                                                <motion.div
                                                    layoutId="desktopActiveTabIndicator"
                                                    className="absolute left-0 w-1.5 inset-y-2 bg-blue-600 dark:bg-blue-400 rounded-full"
                                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                />
                                            )}
                                            <span className="truncate">{tab.label}</span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                        <div className="pt-4 border-t border-gray-100 dark:border-gray-800/60 text-center">
                            <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Quick Nav</span>
                        </div>
                    </motion.div>
                ) : (
                    <motion.button
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        onClick={() => toggleDesktopOpen(true)}
                        className="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 items-center justify-center w-14 h-14 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-full shadow-2xl border border-gray-200/50 dark:border-gray-800/50 backdrop-blur-xl hover:scale-110 active:scale-95 transition-all group"
                        title="Show Navigation"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M9 3v18" /><path d="m14 9 3 3-3 3" /></svg>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Mobile View: Floating Action Button & Draggable Bottom Sheet */}
            <div className="xl:hidden">
                {/* Floating Button Bottom Right */}
                <AnimatePresence>
                    {!isOpen && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={() => { setIsOpen(true); setSheetHeight(55); }}
                            aria-label="Open Document Navigation"
                            className="fixed right-6 bottom-6 z-50 flex items-center justify-center w-14 h-14 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" /><path d="M6 5h10" /><path d="M6 9h10" /><path d="M6 13h6" /></svg>
                        </motion.button>
                    )}
                </AnimatePresence>

                {/* Draggable Bottom Sheet */}
                <AnimatePresence>
                    {isOpen && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsOpen(false)}
                                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90]"
                            />

                            {/* Bottom Sheet Card */}
                            <motion.div
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "100%" }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                style={{ height: `${sheetHeight}vh` }}
                                className="fixed inset-x-0 bottom-0 z-[100] bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl border-t border-gray-200/50 dark:border-gray-800/50 rounded-t-[2.5rem] shadow-[0_-10px_50px_rgba(0,0,0,0.2)] flex flex-col"
                            >
                                {/* Drag Handle */}
                                <div
                                    onMouseDown={handleDragStart}
                                    onTouchStart={handleDragStart}
                                    className="w-full pt-4 pb-3 flex items-center justify-center cursor-grab active:cursor-grabbing group flex-shrink-0 touch-none"
                                >
                                    <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 group-hover:bg-gray-400 dark:group-hover:bg-gray-600 group-active:bg-gray-500 dark:group-active:bg-gray-500 rounded-full transition-colors" />
                                </div>

                                {/* Sheet Header */}
                                <div className="flex items-center justify-between px-5 pb-2 flex-shrink-0">
                                    <div className="flex items-center gap-2">
                                        <div className="p-1.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-lg shadow-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" /><path d="M6 5h10" /><path d="M6 9h10" /><path d="M6 13h6" /></svg>
                                        </div>
                                        <span className="text-xs font-black tracking-widest uppercase text-gray-900 dark:text-white">Document Outline</span>
                                    </div>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-1 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all flex-shrink-0"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                    </button>
                                </div>

                                {/* Sheet Content */}
                                <nav className="flex-1 overflow-y-auto overscroll-contain px-5 pb-6">
                                    {tabs.map((tab) => {
                                        const isActive = activeTab === tab.id;
                                        return (
                                            <button
                                                key={tab.id}
                                                onClick={() => scrollToSection(tab.id)}
                                                className={`flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-left text-sm font-bold transition-all relative mb-1 ${isActive ? 'text-blue-600 dark:text-blue-400 font-black bg-blue-50/50 dark:bg-blue-950/20 shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}
                                            >
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="mobileActiveTabIndicator"
                                                        className="absolute left-0 w-1.5 inset-y-2 bg-blue-600 dark:bg-blue-400 rounded-full"
                                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                    />
                                                )}
                                                <span className="truncate">{tab.label}</span>
                                            </button>
                                        );
                                    })}
                                </nav>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}

export { DocumentTabs };
