import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FormattedText, QuickNav } from "../components/components.jsx";
import { motion, AnimatePresence } from 'framer-motion';
import {
    workDetailPageVariants,
    workDetailHeaderVariants,
    workDetailSectionVariants,
    workDetailMetricCardVariants,
    workDetailImageHover,
    workDetailImageTap,
    workDetailLightboxBackdrop,
    workDetailLightboxContent
} from '../animations/workDetail.js';
import { useData } from "../context/DataContext.jsx";

function WorkDetail() {
    const { projects, research, recognition, siteContent, loading } = useData();
    const { common } = siteContent;
    const { id } = useParams();
    const [selectedImage, setSelectedImage] = useState(null);
    const [item, setItem] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (!loading) {
            const foundItem = 
                projects.find(p => p.id === id) || 
                research.find(r => r.id === id) || 
                recognition.find(rec => rec.id === id);
            setItem(foundItem);
        }
    }, [id, projects, research, recognition, loading]);

    // Prevent scrolling when an image is open
    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [selectedImage]);

    if (loading) {
        return (
            <div className="relative min-h-screen flex items-center justify-center bg-transparent">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!item) {
        return (
            <div className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center bg-transparent overflow-x-hidden">
                <div className="relative z-10">
                    <h1 className="text-4xl font-black mb-4 tracking-tighter text-gray-900 dark:text-white">{common.itemNotFound}</h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-8">{common.notFoundDescription}</p>
                    <Link to="/" className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-bold hover:bg-black dark:hover:bg-gray-100 transition-all">
                        {common.returnHome}
                    </Link>
                </div>
            </div>
        );
    }

    // Determine the label for the technology/keywords section
    let techLabel = "Tech";
    if (item.category === "software") techLabel = "Stack";
    else if (item.category === "research") techLabel = "Keywords";
    else if (item.category === "recognition") techLabel = "Tags";

    const backLink = item.category === 'research' ? '/research'
        : item.category === 'recognition' ? '/recognition'
        : item.category === 'tool' ? '/tools'
        : '/projects';

    const backLabel = item.category === 'research' ? 'Research'
        : item.category === 'recognition' ? 'Recognition'
        : item.category === 'tool' ? 'Tools'
        : 'Projects';

    if (item.category === 'tool') {
        return (
            <div className="relative min-h-screen pt-24 sm:pt-28 md:pt-32 pb-16 px-4 sm:px-6 bg-transparent overflow-x-hidden">
                <div className="max-w-5xl mx-auto relative z-10">
                    <motion.div
                        variants={workDetailPageVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <header className="mb-8 sm:mb-10">
                            <Link
                                to={backLink}
                                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-3 sm:mb-4 group"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
                                {backLabel}
                            </Link>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-3 sm:mb-4 text-gray-900 dark:text-white leading-tight">
                                {item.title}
                            </h1>
                            <p className="text-base sm:text-lg md:text-xl font-bold text-blue-600 dark:text-blue-400 tracking-normal">
                                {item.info}
                            </p>
                        </header>
                        <div className="flex justify-center">
                            {item.id === 'tictactoe' && <TicTacToe />}
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }



    const workTabs = [
        ...(item.stats ? [{ id: 'metrics', label: item.category === "recognition" ? "Competition Results" : common.keyMetrics }] : []),
        { id: 'overview', label: item.category === "research" ? common.abstractOverview : item.category === "recognition" ? "Competition Overview" : common.challengeSolution },
        ...(item.images && item.images.length > 0 ? [{ id: 'gallery', label: common.visualGallery }] : []),
        { id: 'tech', label: techLabel },
        ...(item.links && item.links.length > 0 ? [{ id: 'resources', label: common.resources }] : []),
    ];

    const handleLinkClick = (e, link) => {
        if (link.url.startsWith("/Documents/") && link.url.endsWith(".pdf")) {
            e.preventDefault();
            const filename = link.url.substring(link.url.lastIndexOf("/") + 1);
            window.dispatchEvent(
                new CustomEvent("trigger-file-download", {
                    detail: { url: link.url, filename }
                })
            );
        }
    };

    return (
        <div className="relative min-h-screen pt-24 sm:pt-28 md:pt-32 pb-16 px-4 sm:px-6 bg-transparent overflow-x-hidden">
            <QuickNav tabs={workTabs} />
            <div className="max-w-5xl mx-auto relative z-10">
                <motion.div
                    variants={workDetailPageVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <header className="mb-8 sm:mb-10">
                        <Link
                            to={backLink}
                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-3 sm:mb-4 group"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
                            {backLabel}
                        </Link>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-3 sm:mb-4 text-gray-900 dark:text-white leading-tight">
                            {item.title}
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl font-bold text-blue-600 dark:text-blue-400 tracking-normal">
                            {item.subtitle || item.info}
                        </p>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                        <div className="lg:col-span-2 space-y-8 sm:space-y-10">
                            {item.stats && (
                                <motion.section
                                    id="metrics"
                                    variants={workDetailSectionVariants}
                                    className="scroll-mt-36"
                                >
                                    <h3 className="text-xs font-black tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500 mb-4 sm:mb-5">
                                        {item.category === "recognition" ? "Competition Results" : common.keyMetrics}
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                                        {item.stats.map((stat, i) => (
                                            <motion.div 
                                                key={i} 
                                                variants={workDetailMetricCardVariants}
                                                className="p-5 sm:p-6 bg-gray-50 dark:bg-gray-900 rounded-[1.75rem] border border-gray-100 dark:border-gray-800 hover:shadow-lg dark:hover:shadow-black/30 transition-all"
                                            >
                                                <div className="text-2xl sm:text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400 mb-1.5 tracking-tight">
                                                    {stat.value}
                                                </div>
                                                <div className="text-xs sm:text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider mb-1">
                                                    {stat.label}
                                                </div>
                                                <div className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                                                    {stat.detail}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.section>
                            )}

                             <section id="overview" className="scroll-mt-36">
                                <h3 className="text-xs font-black tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500 mb-4 sm:mb-5">
                                    {item.category === "research" ? common.abstractOverview : item.category === "recognition" ? "Competition Overview" : common.challengeSolution}
                                </h3>
                                <div className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                                    <FormattedText text={item.description} />
                                </div>
                            </section>

                            {item.images && item.images.length > 0 && (
                                <section id="gallery" className="scroll-mt-36">
                                    <h3 className="text-xs font-black tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500 mb-4 sm:mb-5">{common.visualGallery}</h3>
                                    <div className="grid grid-cols-1 gap-6">
                                        {item.images.map((img, i) => (
                                            <div 
                                                key={i} 
                                                onClick={() => setSelectedImage(img)}
                                                className="group relative aspect-video bg-gray-50 dark:bg-gray-900 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-800 transition-all hover:shadow-2xl dark:hover:shadow-black/50 cursor-zoom-in accent-glow-card"
                                            >
                                                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-15 dark:group-hover:opacity-25 transition duration-500 pointer-events-none -z-10" />
                                                <img 
                                                    src={img} 
                                                    alt={`${item.title} Screenshot ${i + 1}`}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                />

                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                    <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-3 sm:p-4 rounded-full shadow-2xl scale-50 group-hover:scale-100 transition-all duration-300">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900 dark:text-white"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>

                        <aside className="space-y-8 sm:space-y-10">
                             <div id="tech" className="scroll-mt-36">
                                <h3 className="text-xs font-black tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500 mb-4 sm:mb-5">{techLabel}</h3>
                                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                                    {item.tech.map(t => (
                                        <span 
                                            key={t} 
                                            className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-gray-50 dark:bg-gray-800 rounded-xl text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-700 transition-all"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {item.links && item.links.length > 0 && (
                                <div id="resources" className="z-10 scroll-mt-36">
                                    <h3 className="text-xs font-black tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500 mb-6">{common.resources}</h3>
                                    <div className="flex flex-col gap-4">
                                        {item.links.map(link => {
                                            const isPdf = link.url.toLowerCase().includes(".pdf") || link.url.startsWith("/Documents/") || item.category === "research";
                                            
                                            if (isPdf) {
                                                const filename = link.name || link.url.substring(link.url.lastIndexOf("/") + 1) || "Research-Paper.pdf";
                                                const formattedFilename = filename.toLowerCase().endsWith(".pdf") ? filename : `${filename}.pdf`;

                                                return (
                                                    <div 
                                                        key={link.name}
                                                        className="p-5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[1.5rem] flex flex-col gap-3 shadow-sm hover:shadow-md transition-all"
                                                    >
                                                        <div className="flex items-center gap-3 min-w-0 w-full">
                                                            <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-xl border border-blue-100 dark:border-blue-900/30 shrink-0 transition-colors">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                                                    <polyline points="14 2 14 8 20 8" />
                                                                </svg>
                                                            </div>
                                                            <div className="min-w-0 flex-1">
                                                                <span className="font-bold text-sm text-gray-900 dark:text-white block truncate" title={link.name}>{link.name}</span>
                                                                <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 block uppercase tracking-wider">Research Document</span>
                                                            </div>
                                                        </div>

                                                        <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-2">
                                                            <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest block">Choose Action</span>
                                                            <div className="grid grid-cols-2 gap-2 w-full">
                                                                <a
                                                                    href={link.url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-[0.98] text-center"
                                                                >
                                                                    <span className="truncate">View Paper</span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                                                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                                                        <polyline points="15 3 21 3 21 9" />
                                                                        <line x1="10" y1="14" x2="21" y2="3" />
                                                                    </svg>
                                                                </a>

                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        window.dispatchEvent(
                                                                            new CustomEvent("trigger-file-download", {
                                                                                detail: { url: link.url, filename: formattedFilename }
                                                                            })
                                                                        );
                                                                    }}
                                                                    className="w-full px-3 py-2.5 bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-[0.98] text-center"
                                                                >
                                                                    <span className="truncate">Download</span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                                                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                                        <polyline points="7 10 12 15 17 10" />
                                                                        <line x1="12" y1="15" x2="12" y2="3" />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            }

                                            return (
                                                <a 
                                                    key={link.name} 
                                                    href={link.url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    className="flex items-center justify-between p-5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-[1.5rem] font-bold border border-gray-100 dark:border-gray-800 hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all hover:scale-[1.02] cursor-pointer shadow-sm"
                                                >
                                                    <span>{link.name}</span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                                        <polyline points="15 3 21 3 21 9" />
                                                        <line x1="10" y1="14" x2="21" y2="3" />
                                                    </svg>
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </aside>
                    </div>
                </motion.div>
            </div>

            {/* Image Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div 
                        variants={workDetailLightboxBackdrop}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-2xl"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button 
                            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[110]"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage(null);
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>
                        <motion.div 
                            variants={workDetailLightboxContent}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="relative max-w-[90vw] max-h-[90vh] shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img 
                                src={selectedImage} 
                                alt="Full screen view" 
                                className="w-full h-full object-contain"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default WorkDetail;
