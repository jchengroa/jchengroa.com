import { projectsList } from "../data/projects";
import { researchList } from "../data/research";
import React from 'react';

/**
 * Keyword Engine
 * Responsible for aggregating, ranking, and selecting the best keyword highlights
 * across projects and research.
 */

export const getKeywordEngine = () => {
    // Combine all work items
    const allWork = [...projectsList, ...researchList];

    // Extract all keywords/tech tags
    const allKeywords = allWork.flatMap(item => [
        ...(item.tech || []),
        ...(item.keywords || [])
    ]);

    // Count occurrences
    const counts = allKeywords.reduce((acc, kw) => {
        acc[kw] = (acc[kw] || 0) + 1;
        return acc;
    }, {});

    // Sort by frequency
    const sortedKeywords = Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .map(([kw]) => kw);

    const getTopKeywordForList = (list) => {
        const keywords = list.flatMap(item => [
            ...(item.tech || []),
            ...(item.keywords || [])
        ]);
        const counts = keywords.reduce((acc, kw) => {
            acc[kw] = (acc[kw] || 0) + 1;
            return acc;
        }, {});
        const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
        return sorted.length > 0 ? sorted[0][0] : "Technology";
    };

    const topProjectKeyword = getTopKeywordForList(projectsList);
    const topResearchKeyword = getTopKeywordForList(researchList);

    /**
     * Get top highlights for the Hero section
     */
    const getHeroHighlights = () => {
        return [
            { label: "Major", value: "CpE", detail: "DLSU 2nd Year" },
            { label: "Project Focus", value: topProjectKeyword, detail: "Core Stack" },
            { label: "Research", value: researchList.length + " Papers", detail: "Investigation" },
            { label: "Research Focus", value: topResearchKeyword, detail: "Primary Field" }
        ];
    };

    /**
     * Get summary highlights for a specific item
     */
    const getItemHighlights = (item) => {
        if (!item) return [];

        // Return top 3-4 most relevant keywords for this item
        const keywords = [
            ...(item.tech || []),
            ...(item.keywords || [])
        ].slice(0, 4);

        return keywords.map((kw, i) => ({
            label: "Keyword",
            value: kw,
            detail: item.category === 'research' ? 'Research Topic' : 'Tech Stack'
        }));
    };

    /**
     * Get summary highlights for a specific category
     */
    const getCategoryHighlights = (category) => {
        const categoryItems = allWork.filter(item => item.category === category);
        const categoryKeywords = categoryItems.flatMap(item => [
            ...(item.tech || []),
            ...(item.keywords || [])
        ]);

        const catCounts = categoryKeywords.reduce((acc, kw) => {
            acc[kw] = (acc[kw] || 0) + 1;
            return acc;
        }, {});

        const sortedCatKeywords = Object.entries(catCounts)
            .sort((a, b) => b[1] - a[1])
            .map(([kw]) => kw);

        return sortedCatKeywords.slice(0, 4).map(kw => ({
            label: category.toUpperCase(),
            value: kw,
            detail: "Top " + (category === "research" ? "Focus" : "Tech")
        }));
    };

    return {
        allKeywords: sortedKeywords,
        getHeroHighlights,
        getItemHighlights,
        getCategoryHighlights
    };
};

export const KeywordHighlights = ({ highlights, className = "" }) => {
    if (!highlights || highlights.length === 0) return null;
    return (
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 w-full ${className}`}>
            {highlights.map((item, i) => (
                <div key={i} className="p-5 md:p-6 bg-white/50 backdrop-blur-md rounded-[2rem] border border-white/50 shadow-sm hover:bg-white hover:shadow-xl transition-all group flex flex-col justify-between text-left min-h-[140px] relative overflow-hidden">
                    {/* Subtle gradient glow effect */}
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-full blur-2xl group-hover:bg-blue-200/50 transition-colors duration-500 pointer-events-none"></div>
                    
                    <div className="relative z-10">
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">
                            {item.label}
                        </div>
                    </div>
                    <div className="relative z-10 mt-6">
                        <div className="text-xl md:text-2xl font-black text-blue-600 mb-1 tracking-tighter group-hover:translate-x-1 transition-transform duration-300 break-words leading-tight">
                            {item.value}
                        </div>
                        <div className="text-[10px] font-bold text-gray-900 uppercase tracking-widest break-words leading-snug">
                            {item.detail}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
