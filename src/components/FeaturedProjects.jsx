import { useState, useEffect, useRef } from "react";
import { WorkCard, Title } from "./components.jsx";
import { projectsList } from "../data/projects";

function FeaturedProjects() {
    const scrollContainerRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const cardNode = container.children[0];
            if (!cardNode) return;
            
            const cardWidth = cardNode.offsetWidth + 32; 
            
            if (direction === "next") {
                if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
                    container.scrollTo({ left: 0, behavior: "smooth" });
                } else {
                    container.scrollBy({ left: cardWidth, behavior: "smooth" });
                }
            } else {
                if (container.scrollLeft <= 0) {
                    container.scrollTo({ left: container.scrollWidth, behavior: "smooth" });
                } else {
                    container.scrollBy({ left: -cardWidth, behavior: "smooth" });
                }
            }
        }
    };

    useEffect(() => {
        if (isPaused) return;

        const intervalId = setInterval(() => {
            scroll("next");
        }, 3500); // Increased interval for better readability

        return () => clearInterval(intervalId);
    }, [isPaused]);

    return (
        <section className="py-24 bg-white overflow-hidden relative group/section">
            <div className="mb-16 text-center">
                <Title title="Featured Projects" />
                <p className="text-gray-500 max-w-2xl mx-auto -mt-4 font-medium text-lg px-4">
                    A glimpse into some of my recent work.
                </p>
            </div>
            
            <div 
                className="w-full relative px-4"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* Navigation Buttons */}
                <button 
                    onClick={() => scroll("prev")}
                    className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-md p-4 rounded-full shadow-xl border border-gray-100 text-gray-800 hover:bg-black hover:text-white transition-all duration-300 opacity-0 group-hover/section:opacity-100 scale-90 group-hover/section:scale-100"
                    aria-label="Previous project"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                </button>
                
                <button 
                    onClick={() => scroll("next")}
                    className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-md p-4 rounded-full shadow-xl border border-gray-100 text-gray-800 hover:bg-black hover:text-white transition-all duration-300 opacity-0 group-hover/section:opacity-100 scale-90 group-hover/section:scale-100"
                    aria-label="Next project"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </button>

                {/* Gradient Masks for fading edges */}
                <div className="absolute inset-y-0 left-0 w-16 md:w-48 bg-gradient-to-r from-white via-white/40 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-16 md:w-48 bg-gradient-to-l from-white via-white/40 to-transparent z-10 pointer-events-none"></div>
                
                <div 
                    ref={scrollContainerRef}
                    className="flex gap-8 px-8 md:px-48 overflow-x-auto snap-x snap-mandatory hide-scrollbar w-full py-4"
                >
                    {projectsList.map((project) => (
                        <div key={project.id} className="w-[300px] md:w-[500px] flex-shrink-0 snap-center">
                            <WorkCard
                                id={project.id}
                                title={project.title}
                                info={project.info}
                                stack={project.tech}
                                description={project.description}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <style>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
}

export default FeaturedProjects;
