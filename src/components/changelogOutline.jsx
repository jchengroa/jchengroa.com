import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from 'framer-motion';

const OUTLINE_STORAGE_KEY = 'jchengroa_changelog_outline_open';

export default function ChangelogOutline({ versions }) {
  const [activeVersion, setActiveVersion] = useState("");
  const [isDesktopOpen, setIsDesktopOpen] = useState(() => {
    return localStorage.getItem(OUTLINE_STORAGE_KEY) !== 'false';
  });
  const [isOpen, setIsOpen] = useState(false);
  const [sheetHeight, setSheetHeight] = useState(55);
  const isDragging = useRef(false);
  const dragStartY = useRef(0);
  const dragStartHeight = useRef(0);
  const isScrollingRef = useRef(false);

  const toggleDesktopOpen = (val) => {
    setIsDesktopOpen(val);
    localStorage.setItem(OUTLINE_STORAGE_KEY, val.toString());
  };

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

  const scrollToVersion = (version) => {
    isScrollingRef.current = true;
    setActiveVersion(version);
    const el = document.getElementById(`changelog-${version}`);
    if (el) {
      const yOffset = -120;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setIsOpen(false);
    setTimeout(() => { isScrollingRef.current = false; }, 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingRef.current) return;
      let bestVersion = "";
      for (const v of versions) {
        const el = document.getElementById(`changelog-${v}`);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.4 && rect.bottom > 0) {
          bestVersion = v;
        }
      }
      if (bestVersion) setActiveVersion(bestVersion);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [versions]);

  const renderOutlineContent = () => (
    <nav className="flex flex-col xl:overflow-y-auto xl:max-h-[calc(100vh-14rem)]">
      {versions.map((v, i) => {
        const isActive = activeVersion === v;
        return (
          <button
            key={v}
            onClick={() => scrollToVersion(v)}
            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-left transition-all group ${isActive ? 'bg-blue-50/50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            <span className={`w-2 h-2 rounded-full flex-shrink-0 transition-colors ${isActive ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600 group-hover:bg-gray-400 dark:group-hover:bg-gray-500'}`} />
            <span className="text-xs font-bold tracking-wider uppercase truncate">v{v}</span>
            {i === 0 && (
              <span className="ml-auto text-[9px] font-bold text-blue-500 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-full flex-shrink-0">Latest</span>
            )}
          </button>
        );
      })}
    </nav>
  );

  if (!versions || versions.length === 0) return null;

  return (
    <>
      <AnimatePresence>
        {isDesktopOpen ? (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="hidden xl:flex fixed left-6 top-28 bottom-6 z-40 w-64 bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl border border-gray-200/50 dark:border-gray-800/50 rounded-[2.5rem] p-5 shadow-2xl flex-col justify-between overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-5 px-1">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-xl shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="10"/></svg>
                  </div>
                  <span className="text-xs font-black tracking-widest uppercase text-gray-900 dark:text-white">Versions</span>
                </div>
                <button
                  onClick={() => toggleDesktopOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                  title="Hide Navigation"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m16 15-3-3 3-3"/></svg>
                </button>
              </div>
              {renderOutlineContent()}
            </div>
            <div className="pt-3 border-t border-gray-100 dark:border-gray-800/60 text-center">
              <span className="text-[10px] font-bold text-gray-400">{versions.length} versions</span>
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
            title="Show Version List"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="10"/></svg>
          </motion.button>
        )}
      </AnimatePresence>

      <div className="xl:hidden">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => { setIsOpen(true); setSheetHeight(55); }}
              aria-label="Open Version List"
              className="fixed right-6 bottom-6 z-50 flex items-center justify-center w-14 h-14 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="10"/></svg>
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90]"
              />
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ height: `${sheetHeight}vh` }}
                className="fixed inset-x-0 bottom-0 z-[100] bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl border-t border-gray-200/50 dark:border-gray-800/50 rounded-t-[2.5rem] shadow-[0_-10px_50px_rgba(0,0,0,0.2)] flex flex-col"
              >
                <div
                  onMouseDown={handleDragStart}
                  onTouchStart={handleDragStart}
                  className="w-full pt-4 pb-3 flex items-center justify-center cursor-grab active:cursor-grabbing group flex-shrink-0 touch-none"
                >
                  <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 group-hover:bg-gray-400 dark:group-hover:bg-gray-600 group-active:bg-gray-500 dark:group-active:bg-gray-500 rounded-full transition-colors" />
                </div>

                <div className="px-5 pb-2 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-lg shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="10"/></svg>
                      </div>
                      <span className="text-xs font-black tracking-widest uppercase text-gray-900 dark:text-white">Versions</span>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-1 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all flex-shrink-0"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-6">
                  {renderOutlineContent()}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
