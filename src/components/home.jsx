import React from 'react';
import Contact from './contact.jsx';
import { WorkCard, Title, Prompt } from './components.jsx';
import { projectsList } from '../data/projects';
import { researchList } from '../data/research';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';

function WorkCarousel({ id, title, subtitle, items, bgClass, isResearch }) {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, align: 'center', skipSnaps: false },
        [Autoplay({ delay: 3500, stopOnInteraction: true })]
    );

    const scrollPrev = React.useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = React.useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <section id={id} className={`py-24 ${bgClass} overflow-hidden relative group/section`}>
            <div className="mb-16 text-center">
                <Title title={title} />
                <p className="text-gray-500 max-w-2xl mx-auto -mt-4 font-medium text-lg px-4">
                    {subtitle}
                </p>
            </div>

            <div className="w-full relative px-4" onMouseEnter={() => emblaApi?.plugins()?.autoplay?.stop()} onMouseLeave={() => emblaApi?.plugins()?.autoplay?.play()}>
                <button
                    onClick={scrollPrev}
                    className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-md p-4 rounded-full shadow-xl border border-gray-100 text-gray-800 hover:bg-black hover:text-white transition-all duration-300 opacity-0 group-hover/section:opacity-100 scale-90 group-hover/section:scale-100"
                    aria-label="Previous"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                </button>

                <button
                    onClick={scrollNext}
                    className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-md p-4 rounded-full shadow-xl border border-gray-100 text-gray-800 hover:bg-black hover:text-white transition-all duration-300 opacity-0 group-hover/section:opacity-100 scale-90 group-hover/section:scale-100"
                    aria-label="Next"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                </button>

                <div className={`absolute inset-y-0 left-0 w-16 md:w-48 bg-gradient-to-r ${bgClass === 'bg-white' ? 'from-white via-white/40' : 'from-gray-50 via-gray-50/20'} to-transparent z-10 pointer-events-none`}></div>
                <div className={`absolute inset-y-0 right-0 w-16 md:w-48 bg-gradient-to-l ${bgClass === 'bg-white' ? 'from-white via-white/40' : 'from-gray-50 via-gray-50/20'} to-transparent z-10 pointer-events-none`}></div>

                <div className="overflow-hidden px-8 md:px-48 py-4" ref={emblaRef}>
                    <div className="flex gap-8">
                        {items.map((item) => (
                            <div key={item.id} className="flex-[0_0_300px] md:flex-[0_0_500px] min-w-0">
                                <WorkCard
                                    id={item.id}
                                    title={item.title}
                                    info={item.info}
                                    stack={item.tech}
                                    description={isResearch ? item.summary : item.description}
                                    image={isResearch ? undefined : (item.images && item.images[0])}
                                    linkTo={isResearch ? "/research" : undefined}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* Icons */
const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 group-hover:animate-pulse">
        <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
);

const GitHubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 group-hover:rotate-12 transition-transform">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-4.51-2-7-2" />
    </svg>
);

const LinkedInIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 group-hover:scale-110 transition-transform">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" />
    </svg>
);

import { getKeywordEngine, KeywordHighlights } from '../utils/keywordEngine';

function Home({ title = "John Carlo Cheng Roa" }) {
    const [currentImage, setCurrentImage] = React.useState(0);
    const [isPromptOpen, setIsPromptOpen] = React.useState(false);
    const [selectedKeyword, setSelectedKeyword] = React.useState("");

    const openPrompt = (keyword) => {
        setSelectedKeyword(keyword);
        setIsPromptOpen(true);
    };
    const images = [
        '/hero_background_1.jpg',
        '/hero_background_2.jpg',
        '/hero_background_3.jpg'
    ];

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const engine = getKeywordEngine();
    const highlights = engine.getHeroHighlights();

    return (
        <>
        <section
            id="home"
            className="relative min-h-[90vh] flex items-center justify-center text-center p-5 rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-3xl mt-24 mx-2 bg-white border border-gray-100 isolate"
        >
            {/* Cross-fading Background Images */}
            {images.map((img, i) => (
                <div
                    key={i}
                    className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${i === currentImage ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                        backgroundImage: `url(${img})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center 40%'
                    }}
                />
            ))}

            {/* Glassmorphic Overlay for Readability */}
            <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] pointer-events-none"></div>

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-blue-50/20 to-transparent pointer-events-none"></div>

            <div className="relative z-10 text-black max-w-5xl px-4 flex flex-col items-center">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
                    <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tight text-gray-900 drop-shadow-sm">
                        {title}
                    </h1>

                    <div className="max-w-3xl mx-auto space-y-6 mb-12">
                        <p className="text-xl md:text-2xl text-gray-700 font-bold leading-relaxed">
                            I am a 2nd-year Computer Engineering student at De La Salle University with a passion for building robust digital systems from the ground up.
                        </p>
                        <p className="text-lg text-gray-500 font-medium leading-relaxed">
                            While my academic focus lies in Object-Oriented Programming and Data Structures and Algorithms, my real-world curiosity drives me toward systems administration and DevOps. Currently maintaining cloud-hosted ERPNext instances and managing secure infrastructure reliability.
                        </p>
                    </div>
                </motion.div>

                {/* Keyword Summaries / Highlights */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} className="w-full mb-12">
                    <KeywordHighlights 
                        highlights={highlights} 
                        onKeywordClick={openPrompt}
                    />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }} className="flex flex-wrap justify-center gap-4">
                    <a
                        href="mailto:johncarlochengroa07@gmail.com"
                        className="group flex items-center bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-black hover:scale-105 hover:shadow-2xl transition-all duration-300"
                    >
                        <MailIcon />
                        Email
                    </a>
                    <a
                        href="https://github.com/jchengroa"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center bg-white/80 backdrop-blur-md text-gray-900 px-8 py-4 rounded-2xl font-bold hover:scale-105 hover:shadow-xl transition-all duration-300 border border-white/50"
                    >
                        <GitHubIcon />
                        GitHub
                    </a>
                    <a
                        href="https://www.linkedin.com/in/john-carlo-cheng-roa-47aa6a290/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center bg-white/80 backdrop-blur-md text-gray-900 px-8 py-4 rounded-2xl font-bold hover:scale-105 hover:shadow-xl transition-all duration-300 border border-white/50"
                    >
                        <LinkedInIcon />
                        LinkedIn
                    </a>
                </motion.div>

                {/* Animated Scroll Indicator */}
                <motion.button
                    animate={{ y: ["-5%", "0%", "-5%"] }}
                    transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                    onClick={() => document.getElementById('featured-projects')?.scrollIntoView({ behavior: 'smooth' })}
                    className="mt-16 text-gray-900/40 hover:text-gray-900/80 transition-colors cursor-pointer outline-none group"
                    aria-label="Scroll to projects"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[3px] transition-all">
                        <path d="m7 13 5 5 5-5" /><path d="m7 6 5 5 5-5" />
                    </svg>
                </motion.button>
            </div>
        </section>
            <WorkCarousel 
                id="featured-projects"
                title="Featured Projects"
                subtitle="A glimpse into some of my recent work."
                items={projectsList}
                bgClass="bg-white"
            />
            <WorkCarousel 
                id="featured-research"
                title="Featured Research"
                subtitle="A look into my academic work and studies."
                items={researchList}
                bgClass="bg-gray-50/50"
                isResearch={true}
            />
            <div id="contact">
                <Contact />
            </div>

            <Prompt 
                isOpen={isPromptOpen}
                onClose={() => setIsPromptOpen(false)}
                keyword={selectedKeyword}
            />
        </>
    );
}

export default Home