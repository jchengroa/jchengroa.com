import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FormattedText, QuickNav } from "../components/components.jsx";
import { motion } from 'framer-motion';
import {
    workDetailPageVariants,
    workDetailSectionVariants,
} from '../animations/workDetail.js';
import { useData } from "../context/dataContext.jsx";
import { ImageLightbox } from "../components/imageLightbox.jsx";
import { WorkNotFound } from "../components/workNotFound.jsx";
import { WorkDetailHeader } from "../components/workDetail/workDetailHeader.jsx";
import { WorkDetailMetrics } from "../components/workDetail/workDetailMetrics.jsx";
import { WorkDetailGallery } from "../components/workDetail/workDetailGallery.jsx";
import { WorkDetailResources } from "../components/workDetail/workDetailResources.jsx";

const shortenKeyword = (text) => {
    if (!text) return "";
    const mappings = {
        "Microwave-Assisted Extraction": "MAE",
        "Phytochemical Screening": "Phytochem",
        "Allium Cepa Assay": "Allium Cepa",
        "Cytotoxicity Evaluation": "Cytotoxicity",
        "Post-Harvest Preservation": "Preservation",
        "Shelf-Life Testing": "Shelf-Life",
        "Object-Oriented Programming": "OOP",
        "Data Structures and Algorithms": "DSA",
        "Software Engineering": "SWE",
        "Computer Engineering": "CpE",
        "Artificial Intelligence": "AI",
        "Machine Learning": "ML"
    };
    return mappings[text] || text;
};

export default function WorkDetail() {
    const { projects, research, recognition, siteContent, loading } = useData();
    const { common = {} } = siteContent;
    const { id } = useParams();
    const location = useLocation();
    const [selectedImage, setSelectedImage] = useState(null);
    const [item, setItem] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (!loading) {
            let foundItem = null;
            if (location.pathname.startsWith("/research")) {
                foundItem = research.find(r => r.id === id);
            } else if (location.pathname.startsWith("/recognition")) {
                foundItem = recognition.find(rec => rec.id === id);
            } else if (location.pathname.startsWith("/projects")) {
                foundItem = projects.find(p => p.id === id);
            }
            setItem(foundItem);
        }
    }, [id, location.pathname, projects, research, recognition, loading]);

    if (loading) {
        return (
            <div className="relative min-h-screen flex items-center justify-center bg-transparent">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!item) {
        return (
            <WorkNotFound
                title={common.itemNotFound || "Item Not Found"}
                description={common.notFoundDescription || "The requested work details could not be found or have been moved."}
                returnHomeText={common.returnHome || "Return Home"}
                backLink="/"
            />
        );
    }

    // Determine the label for the technology/keywords section
    let techLabel = "Tech";
    if (item.category === "software" || item.category === "hardware" || item.category === "embedded") techLabel = "Stack";
    else if (item.category === "research") techLabel = "Keywords";
    else if (item.category === "recognition") techLabel = "Tags";

    const backLink = item.category === 'research' ? '/research'
        : item.category === 'recognition' ? '/recognition'
        : '/projects';

    const backLabel = item.category === 'research' ? 'Research'
        : item.category === 'recognition' ? 'Recognition'
        : 'Projects';

    const workTabs = [
        ...(item.stats ? [{ id: 'metrics', label: item.category === "recognition" ? "Competition Results" : (common.keyMetrics || "Key Metrics") }] : []),
        { id: 'overview', label: item.category === "research" ? (common.abstractOverview || "Abstract / Overview") : item.category === "recognition" ? "Competition Overview" : (common.challengeSolution || "Overview") },
        ...(item.images && item.images.length > 0 ? [{ id: 'gallery', label: common.visualGallery || "Visual Gallery" }] : []),
        { id: 'tech', label: techLabel },
        ...(item.links && item.links.length > 0 ? [{ id: 'resources', label: common.resources || "Resources" }] : []),
    ];

    return (
        <div className="relative min-h-screen pt-24 sm:pt-28 md:pt-32 pb-16 px-4 sm:px-6 bg-transparent overflow-x-hidden">
            <QuickNav tabs={workTabs} />
            <div className="max-w-5xl mx-auto relative z-10">
                <motion.div
                    variants={workDetailPageVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <WorkDetailHeader
                        backLink={backLink}
                        backLabel={backLabel}
                        title={item.title}
                        subtitle={item.subtitle || item.info}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                        <div className="lg:col-span-2 space-y-8 sm:space-y-10">
                            {/* Key Metrics / Stats */}
                            <WorkDetailMetrics
                                stats={item.stats}
                                title={item.category === "recognition" ? "Competition Results" : (common.keyMetrics || "Key Metrics")}
                            />

                            {/* Overview / Description */}
                            <section id="overview" className="scroll-mt-36">
                                <h3 className="text-xs font-black tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500 mb-4 sm:mb-5">
                                    {item.category === "research" ? (common.abstractOverview || "Abstract / Overview") : item.category === "recognition" ? "Competition Overview" : (common.challengeSolution || "Overview")}
                                </h3>
                                <div className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                                    <FormattedText text={item.description} />
                                </div>
                            </section>

                            {/* Visual Gallery */}
                            <WorkDetailGallery
                                images={item.images}
                                title={item.title}
                                onSelectImage={setSelectedImage}
                                galleryTitle={common.visualGallery || "Visual Gallery"}
                            />
                        </div>

                        <aside className="space-y-8 sm:space-y-10">
                            {/* Tech Stack / Keywords */}
                            {item.tech && (
                                <div id="tech" className="scroll-mt-36">
                                    <h3 className="text-xs font-black tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500 mb-4 sm:mb-5">{techLabel}</h3>
                                    <div className="flex flex-wrap gap-2 sm:gap-2.5">
                                        {item.tech.map((t) => (
                                            <span 
                                                key={t} 
                                                className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-gray-50 dark:bg-gray-800 rounded-xl text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-700 transition-all"
                                            >
                                                {shortenKeyword(t)}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Resources & Papers */}
                            <WorkDetailResources
                                links={item.links}
                                isResearch={item.category === "research"}
                                title={common.resources || "Resources"}
                            />
                        </aside>
                    </div>
                </motion.div>
            </div>

            {/* Image Lightbox Modal */}
            <ImageLightbox
                selectedImage={selectedImage}
                onClose={() => setSelectedImage(null)}
            />
        </div>
    );
}

export { WorkDetail };
