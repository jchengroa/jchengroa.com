import { useState } from "react";
import { Title, WorkCard, SearchFilter } from "./components.jsx";
import { researchList } from "../data/research";
import { getKeywordEngine, KeywordHighlights } from "../utils/keywordEngine";

function Research() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");

    const engine = getKeywordEngine();
    
    // Extract top 3 unique keywords to use as filters for research
    const researchKeywords = Array.from(new Set(researchList.flatMap(r => r.keywords || []))).slice(0, 3);
    const filters = ["All", ...researchKeywords];

    // Filtering logic
    const filteredResearch = researchList.filter(item => {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch = 
            item.title.toLowerCase().includes(searchLower) ||
            (item.summary && item.summary.toLowerCase().includes(searchLower)) ||
            (item.tech && item.tech.some(t => t.toLowerCase().includes(searchLower))) ||
            (item.keywords && item.keywords.some(k => k.toLowerCase().includes(searchLower)));
        
        const matchesFilter = activeFilter === "All" || (item.keywords && item.keywords.includes(activeFilter));
        
        return matchesSearch && matchesFilter;
    });
    return (
        <section className="min-h-screen pt-32 pb-20 px-6 bg-gray-50/50 flex flex-col items-center">
            <div className="max-w-6xl w-full">
                <div className="text-center mb-16 animate-fade-up">
                    <Title title="Research" />
                    <p className="text-gray-600 font-medium text-lg mt-4 max-w-3xl mx-auto leading-relaxed mb-12">
                        A multidisciplinary exploration of technology and life sciences. My research spans from robotics and computer engineering to biochemical analysis and agricultural innovation, with a current focus on integrating embedded systems into sustainable ecological solutions like aquaponics.
                    </p>
                    
                    <SearchFilter 
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        activeFilter={activeFilter}
                        setActiveFilter={setActiveFilter}
                        filters={filters}
                    />
                </div>
                
                <div className="mb-12 animate-fade-up">
                    <KeywordHighlights highlights={engine.getCategoryHighlights("research")} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-up" style={{ animationDelay: '100ms' }}>
                    {filteredResearch.map((research) => (
                        <WorkCard
                            key={research.id}
                            id={research.id}
                            title={research.title}
                            info={research.info}
                            stack={research.tech}
                            description={research.summary}
                        />
                    ))}
                </div>

                {filteredResearch.length === 0 && (
                    <div className="text-center py-20 animate-fade-in w-full">
                        <h3 className="text-2xl font-black text-gray-400">No research found</h3>
                        <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Research;
