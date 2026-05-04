import { projectsList } from "../data/projects";
import { researchList } from "../data/research";
import React from 'react';
import _ from 'lodash';

/**
 * Keyword Engine
 * Responsible for aggregating, ranking, and selecting the best keyword highlights
 * across projects and research.
 */

export const shortenKeyword = (text) => {
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

export const getKeywordEngine = () => {
    const allWork = [...projectsList, ...researchList];

    const getKeywords = (list) => _.flatMap(list, item => [
        ...(item.tech || []),
        ...(item.keywords || [])
    ]);

    const getSortedKeywords = (list) => {
        const counts = _.countBy(getKeywords(list));
        return _.orderBy(Object.keys(counts), [kw => counts[kw]], ['desc']);
    };

    const sortedKeywords = getSortedKeywords(allWork);

    const getTopKeywordForList = (list) => {
        const sorted = getSortedKeywords(list);
        return sorted.length > 0 ? sorted[0] : "Technology";
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

        const keywords = _.take([
            ...(item.tech || []),
            ...(item.keywords || [])
        ], 4);

        return keywords.map(kw => ({
            label: "Keyword",
            value: kw,
            detail: item.category === 'research' ? 'Research Topic' : 'Tech Stack'
        }));
    };

    /**
     * Get summary highlights for a specific category
     */
    const getCategoryHighlights = (category) => {
        const categoryItems = _.filter(allWork, { category });
        const sortedCatKeywords = getSortedKeywords(categoryItems);

        return _.take(sortedCatKeywords, 4).map(kw => ({
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

export const KeywordHighlights = ({ highlights, onKeywordClick, className = "" }) => {
    if (!highlights || highlights.length === 0) return null;
    return (
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 w-full ${className}`}>
            {highlights.map((item, i) => {
                const shortValue = shortenKeyword(item.value);
                const isLong = shortValue.length > 12;
                
                return (
                    <div 
                        key={i} 
                        onClick={() => onKeywordClick && onKeywordClick(item.value)}
                        className="p-5 md:p-6 bg-white/50 backdrop-blur-md rounded-[2rem] border border-white/50 shadow-sm hover:bg-white hover:shadow-xl transition-all group flex flex-col justify-between text-center min-h-[140px] relative overflow-hidden cursor-pointer"
                    >
                        {/* Subtle gradient glow effect */}
                        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-full blur-2xl group-hover:bg-blue-200/50 transition-colors duration-500 pointer-events-none"></div>
                        
                        <div className="relative z-10">
                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">
                                {item.label}
                            </div>
                        </div>
                        <div className="relative z-10 mt-6">
                            <div className={`font-black text-blue-600 mb-1 tracking-tighter group-hover:translate-x-1 transition-all duration-300 break-words leading-tight ${isLong ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'}`}>
                                {shortValue}
                            </div>
                            <div className="text-[10px] font-bold text-gray-900 uppercase tracking-widest break-words leading-snug">
                                {shortenKeyword(item.detail)}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
