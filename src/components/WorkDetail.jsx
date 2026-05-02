import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { projectData } from "../data/projects";
import { researchData } from "../data/research";
import { getKeywordEngine, KeywordHighlights } from "../utils/keywordEngine";
import { motion } from 'framer-motion';

function WorkDetail() {
    const { id } = useParams();
    const [selectedImage, setSelectedImage] = useState(null);
    // Try to find the item in projectData first, then researchData
    const item = projectData[id] || researchData[id];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Prevent scrolling when an image is open
    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [selectedImage]);

    if (!item) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
                <h1 className="text-4xl font-black mb-4 tracking-tighter">Item not found</h1>
                <p className="text-gray-500 mb-8">The project or research you're looking for doesn't exist or has been moved.</p>
                <Link to="/" className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all">
                    Return Home
                </Link>
            </div>
        );
    }

    // Determine the label for the technology/keywords section
    let techLabel = "Tech";
    if (item.category === "software") techLabel = "Stack";
    else if (item.category === "research") techLabel = "Keywords";

    const engine = getKeywordEngine();
    const itemHighlights = engine.getItemHighlights(item);

    return (
        <div className="min-h-screen bg-white text-gray-900 pt-32 pb-20 px-6">
            <div className="max-w-5xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
                    <header className="mb-20">
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 text-gray-900 leading-none">
                            {item.title}
                        </h1>
                        <p className="text-2xl md:text-3xl font-bold text-blue-600 tracking-tight">
                            {item.subtitle || item.info}
                        </p>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        <div className="lg:col-span-2 space-y-16">
                            {item.stats && (
                                <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
                                    <h3 className="text-xs font-black tracking-[0.2em] uppercase text-gray-400 mb-10">Key Metrics & Findings</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                                        {item.stats.map((stat, i) => (
                                            <div key={i} className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100 hover:bg-white hover:shadow-xl transition-all group">
                                                <div className="text-4xl md:text-5xl font-black text-blue-600 mb-2 tracking-tighter group-hover:scale-105 transition-transform origin-left">
                                                    {stat.value}
                                                </div>
                                                <div className="text-sm font-black text-gray-900 uppercase tracking-widest mb-1">
                                                    {stat.label}
                                                </div>
                                                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                                    {stat.detail}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.section>
                            )}

                            <section>
                                <h3 className="text-xs font-black tracking-[0.2em] uppercase text-gray-400 mb-6">
                                    {item.category === "research" ? "Abstract & Overview" : "The Challenge & Solution"}
                                </h3>
                                <div className="mb-10">
                                    <KeywordHighlights highlights={itemHighlights} className="grid-cols-2 md:grid-cols-4" />
                                </div>
                                <p className="text-2xl text-gray-600 leading-relaxed font-medium">
                                    {item.description}
                                </p>
                            </section>

                            {item.category !== "research" && item.images && item.images.length > 0 && (
                                <section>
                                    <h3 className="text-xs font-black tracking-[0.2em] uppercase text-gray-400 mb-8">Visual Gallery</h3>
                                    <div className="grid grid-cols-1 gap-8">
                                        {item.images.map((img, i) => (
                                            <div 
                                                key={i} 
                                                onClick={() => setSelectedImage(img)}
                                                className="group relative aspect-video bg-gray-50 rounded-[2.5rem] overflow-hidden border border-gray-100 transition-all hover:shadow-2xl cursor-zoom-in"
                                            >
                                                <img 
                                                    src={img} 
                                                    alt={`${item.title} Screenshot ${i + 1}`}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-2xl scale-50 group-hover:scale-100 transition-all duration-300">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>

                        <aside className="space-y-12">
                            <div>
                                <h3 className="text-xs font-black tracking-[0.2em] uppercase text-gray-400 mb-6">{techLabel}</h3>
                                <div className="flex flex-wrap gap-3">
                                    {item.tech.map(t => (
                                        <span key={t} className="px-5 py-2.5 bg-gray-50 rounded-2xl text-sm font-bold text-gray-700 border border-gray-100">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {item.links && item.links.length > 0 && (
                                <div>
                                    <h3 className="text-xs font-black tracking-[0.2em] uppercase text-gray-400 mb-6">Resources</h3>
                                    <div className="flex flex-col gap-4">
                                        {item.links.map(link => (
                                            <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-5 bg-gray-900 text-white rounded-[1.5rem] font-bold hover:bg-black hover:scale-[1.02] transition-all">
                                                <span>{link.name}</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </aside>
                    </div>
                </motion.div>
            </div>

            {/* Image Lightbox Modal */}
            {selectedImage && (
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, ease: "easeOut" }}
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
                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, ease: "easeOut" }}
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
        </div>
    );
}

export default WorkDetail;
