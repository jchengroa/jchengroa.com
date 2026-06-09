import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const OUTLINE_STORAGE_KEY = 'jchengroa_docs_outline_open';
const CHEVRON = ({ open }) => (
  <motion.svg
    animate={{ rotate: open ? 90 : 0 }}
    transition={{ duration: 0.2 }}
    xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0"
  ><path d="m9 18 6-6-6-6"/></motion.svg>
);

export default function DocsOutline({ sections, docs }) {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('jchengroa_docs_expanded_sections') || '{}');
      return Object.fromEntries(sections.map(s => [s.id, saved[s.id] ?? false]));
    } catch { return Object.fromEntries(sections.map(s => [s.id, false])); }
  });
  const [expandedDocs, setExpandedDocs] = useState({});
  const [activePath, setActivePath] = useState("");
  const [isDesktopOpen, setIsDesktopOpen] = useState(() => {
    return localStorage.getItem(OUTLINE_STORAGE_KEY) !== 'false';
  });
  const [isOpen, setIsOpen] = useState(false);
  const [sheetHeight, setSheetHeight] = useState(55);
  const isDragging = useRef(false);
  const dragStartY = useRef(0);
  const dragStartHeight = useRef(0);
  const isScrollingRef = useRef(false);

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

  const toggleSection = (sectionId) => {
    const next = { ...expandedSections, [sectionId]: !expandedSections[sectionId] };
    setExpandedSections(next);
    localStorage.setItem('jchengroa_docs_expanded_sections', JSON.stringify(next));
  };

  const toggleDoc = (docId) => {
    setExpandedDocs(prev => ({ ...prev, [docId]: !prev[docId] }));
  };

  const expandAll = () => {
    const allSections = {};
    sections.forEach(s => { allSections[s.id] = true; });
    setExpandedSections(allSections);
    localStorage.setItem('jchengroa_docs_expanded_sections', JSON.stringify(allSections));
    const allDocs = {};
    docs.forEach(d => { allDocs[d.id] = true; });
    setExpandedDocs(allDocs);
  };

  const collapseAll = () => {
    const allSections = {};
    sections.forEach(s => { allSections[s.id] = false; });
    setExpandedSections(allSections);
    localStorage.setItem('jchengroa_docs_expanded_sections', JSON.stringify(allSections));
    setExpandedDocs({});
  };

  const navigateToDoc = (docId) => {
    navigate(`/${docId}`);
    setIsOpen(false);
  };

  const scrollTo = (targetId) => {
    isScrollingRef.current = true;
    setActivePath(targetId);

    let el = document.getElementById(targetId);

    if (!el && targetId.includes('--')) {
      const parts = targetId.split('--');
      for (let i = parts.length - 1; i >= 1; i--) {
        const fallbackId = parts.slice(0, i).join('--');
        el = document.getElementById(fallbackId);
        if (el) break;
      }
      if (!el) {
        const docPart = parts[0];
        el = document.getElementById(docPart);
      }
    }

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
      const allIds = [];
      sections.forEach(s => {
        allIds.push({ id: `section-${s.id}`, rank: 1 });
        const sectionDocs = docs.filter(d => d.section === s.id);
        sectionDocs.forEach(d => {
          allIds.push({ id: `doc-${d.id}`, rank: 2 });
          if (d.outline) {
            d.outline.forEach(h => {
              allIds.push({ id: `doc-${d.id}--${h.id}`, rank: 3 });
              if (h.sub) {
                h.sub.forEach((_sub, si) => {
                  allIds.push({ id: `doc-${d.id}--${h.id}--${si}`, rank: 4 });
                });
              }
            });
          }
        });
      });

      let bestId = "";
      let bestRank = 0;
      for (const item of allIds) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.4 && rect.bottom > 0) {
          if (item.rank >= bestRank) {
            bestRank = item.rank;
            bestId = item.id;
          }
        }
      }
      if (bestId) setActivePath(bestId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections, docs]);

  const renderOutlineContent = (isMobile = false) => (
    <nav className="flex flex-col xl:overflow-y-auto xl:max-h-[calc(100vh-16rem)] pr-1">
      {sections.map(section => {
        const sectionDocs = docs.filter(d => d.section === section.id);
        const sectionOpen = expandedSections[section.id];
        const isSectionActive = activePath === `section-${section.id}`;

        return (
          <div key={section.id} className="mb-1">
            <div className={`flex items-center gap-0 w-full rounded-xl transition-all group ${isSectionActive && !sectionOpen ? 'bg-blue-50/50 dark:bg-blue-950/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}>
              <button
                onClick={() => toggleSection(section.id)}
                className="p-2.5 text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 transition-colors flex-shrink-0 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-700/30"
              >
                <CHEVRON open={sectionOpen} />
              </button>
              <button
                onClick={() => scrollTo(`section-${section.id}`)}
                className={`flex items-center gap-2 flex-1 min-w-0 py-2.5 pr-3 text-left font-bold transition-colors ${isSectionActive && !sectionOpen ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}
              >
                <span className="text-xs tracking-wider uppercase leading-tight truncate">{section.title}</span>
                <span className="ml-auto text-[10px] font-medium text-gray-400 dark:text-gray-600 flex-shrink-0">{sectionDocs.length}</span>
              </button>
            </div>

            <AnimatePresence initial={false}>
              {sectionOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden ml-4 border-l border-gray-200 dark:border-gray-800 pl-3"
                >
                  {sectionDocs.map(doc => {
                    const docOpen = expandedDocs[doc.id] || (isMobile && activePath?.startsWith(`doc-${doc.id}`));
                    const isDocActive = activePath?.startsWith(`doc-${doc.id}`);

                    return (
                      <div key={doc.id}>
                        <div className={`flex items-center gap-0 w-full rounded-xl transition-all group ${isDocActive ? 'bg-blue-50/30 dark:bg-blue-950/10' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}>
                          {doc.outline && doc.outline.length > 0 && isMobile ? (
                            <button
                              onClick={() => toggleDoc(doc.id)}
                              className="p-2 text-gray-400 dark:text-gray-600 hover:text-gray-500 transition-colors flex-shrink-0 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-700/30"
                            >
                              <CHEVRON open={docOpen} />
                            </button>
                          ) : (
                            <span className="w-3 flex-shrink-0 ml-2" />
                          )}
                          <button
                            onClick={() => navigateToDoc(doc.id)}
                            className={`flex-1 min-w-0 py-2 pr-3 text-left font-bold transition-colors ${isDocActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}
                          >
                            <span className="text-[11px] font-semibold leading-tight truncate block">{doc.title}</span>
                          </button>
                        </div>

                        {doc.outline && doc.outline.length > 0 && isMobile && (
                          <AnimatePresence initial={false}>
                            {docOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2, ease: 'easeInOut' }}
                                className="overflow-hidden ml-4 border-l border-gray-100 dark:border-gray-800/60 pl-3"
                              >
                                {doc.outline.map(heading => {
                                  const headingId = `doc-${doc.id}--${heading.id}`;
                                  const isHeadingActive = activePath?.startsWith(headingId);

                                  return (
                                    <div key={heading.id}>
                                      <button
                                        onClick={() => { navigateToDoc(doc.id); setTimeout(() => scrollTo(headingId), 100); }}
                                        className={`flex items-center gap-2 w-full px-3 py-1.5 rounded-xl text-left transition-all group ${isHeadingActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'}`}
                                      >
                                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: isHeadingActive ? 'var(--tw-color-blue-600, #2563eb)' : 'currentColor', opacity: isHeadingActive ? 1 : 0.35 }} />
                                        <span className="text-[10px] font-bold leading-tight truncate">{heading.label}</span>
                                      </button>
                                      {heading.sub && heading.sub.length > 0 && (
                                        <div className="ml-4 space-y-0.5 pb-1">
                                          {heading.sub.map((sub, si) => {
                                            const subId = `${headingId}--${si}`;
                                            const isSubActive = activePath === subId;
                                            return (
                                              <button
                                                key={si}
                                                onClick={() => { navigateToDoc(doc.id); setTimeout(() => scrollTo(subId), 100); }}
                                                className={`flex items-center gap-2 w-full px-3 py-1 rounded-xl text-left transition-all ${isSubActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400'}`}
                                              >
                                                <span className="text-[8px] leading-none flex-shrink-0 opacity-40">&#8212;</span>
                                                <span className={`text-[10px] leading-tight truncate ${isSubActive ? 'font-bold' : 'font-medium'}`}>{sub}</span>
                                              </button>
                                            );
                                          })}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        )}
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </nav>
  );

  if (!sections || sections.length === 0) return null;

  return (
    <>
      <div className="hidden xl:flex sticky top-16 h-[calc(100vh-4rem)] w-72 shrink-0 flex-col justify-between overflow-hidden border-r border-gray-200/80 dark:border-gray-800/80 p-5 bg-white/40 dark:bg-gray-950/40">
        <div>
          <div className="flex items-center justify-between mb-5 px-1">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-xl shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 5h10"/><path d="M6 9h10"/><path d="M6 13h6"/></svg>
              </div>
              <span className="text-xs font-black tracking-widest uppercase text-gray-900 dark:text-white">Outline</span>
            </div>
          </div>
          {renderOutlineContent(false)}
        </div>
        <div className="pt-3 border-t border-gray-100 dark:border-gray-800/60 flex items-center justify-center gap-2">
          <button
            onClick={expandAll}
            className="flex items-center gap-1 px-3 py-1.5 text-[10px] font-bold text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            title="Expand All Sections"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="flex items-center gap-1 px-3 py-1.5 text-[10px] font-bold text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            title="Collapse All Sections"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 15 6-6 6 6"/></svg>
            Collapse All
          </button>
        </div>
      </div>

      <div className="xl:hidden">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => { setIsOpen(true); setSheetHeight(55); }}
              aria-label="Open Documentation Outline"
              className="fixed right-6 bottom-6 z-50 flex items-center justify-center w-14 h-14 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 5h10"/><path d="M6 9h10"/><path d="M6 13h6"/></svg>
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
                {/* Drag Handle */}
                <div
                  onMouseDown={handleDragStart}
                  onTouchStart={handleDragStart}
                  className="w-full pt-4 pb-3 flex items-center justify-center cursor-grab active:cursor-grabbing group flex-shrink-0 touch-none"
                >
                  <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 group-hover:bg-gray-400 dark:group-hover:bg-gray-600 group-active:bg-gray-500 dark:group-active:bg-gray-500 rounded-full transition-colors" />
                </div>

                {/* Header */}
                <div className="px-5 pb-2 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-lg shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 5h10"/><path d="M6 9h10"/><path d="M6 13h6"/></svg>
                      </div>
                      <span className="text-xs font-black tracking-widest uppercase text-gray-900 dark:text-white">Documentation Outline</span>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-1 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all flex-shrink-0"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <button
                      onClick={expandAll}
                      className="flex items-center gap-1 px-2 py-1 text-[10px] font-bold text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                      Expand All
                    </button>
                    <button
                      onClick={collapseAll}
                      className="flex items-center gap-1 px-2 py-1 text-[10px] font-bold text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 15 6-6 6 6"/></svg>
                      Collapse All
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-6">
                  {renderOutlineContent(true)}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
