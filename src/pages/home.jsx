import React from 'react';
import { Link } from 'react-router-dom';
import { WorkCard, Title, Prompt, ContactCard } from '../components/components.jsx';
import { projectsList } from '../data/projects';
import { researchList } from '../data/research';
import { recognitionList } from '../data/recognitionList';
import { motion } from 'framer-motion';
import { FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { LuMail, LuFileText } from 'react-icons/lu';
import { getKeywordEngine, KeywordHighlights } from '../utils/keywordEngine';
import { siteContent } from '../data/siteContent';
import { changelogData } from '../data/changelog.js';

function FeaturedSection({ id, title, subtitle, items, isResearch, bgClass, glowColors = { first: "bg-blue-500/5 dark:bg-blue-600/10", second: "bg-indigo-500/5 dark:bg-indigo-600/10" } }) {
    const [featuredItem, setFeaturedItem] = React.useState(null);

    React.useEffect(() => {
        if (items && items.length > 0) {
            const randomIndex = Math.floor(Math.random() * items.length);
            setFeaturedItem(items[randomIndex]);
        }
    }, [items]);

    return (
        <section 
            id={id} 
            className={`snap-start shrink-0 h-screen w-full flex flex-col justify-center pt-10 pb-28 px-6 relative overflow-hidden border-none rounded-none ${bgClass}`}
        >
            {/* Ambient Background Glows */}
            <div className={`absolute top-1/4 left-1/3 w-72 h-72 rounded-full ${glowColors.first} blur-3xl pointer-events-none animate-pulse`}></div>
            <div className={`absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full ${glowColors.second} blur-3xl pointer-events-none animate-pulse delay-1000`}></div>

            <div className="max-w-7xl w-full mx-auto flex flex-col justify-center h-full relative z-10">
                <Title
                    title={title}
                    subtitle={subtitle}
                    className="mb-6 md:mb-8"
                />

                {featuredItem && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-2 md:mt-4 w-full">
                        {/* Left Column: Landscape visual mockup */}
                        <div className="w-full aspect-[16/10] rounded-[2rem] overflow-hidden border border-gray-150 dark:border-white/10 shadow-xl bg-gray-100 dark:bg-gray-950 flex items-center justify-center relative group">
                            {featuredItem.images && featuredItem.images[0] ? (
                                <img 
                                    src={featuredItem.images[0]} 
                                    alt={featuredItem.title} 
                                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" 
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center p-6 text-center text-gray-400 dark:text-gray-600">
                                    <LuFileText size={48} className="mb-2 text-blue-500/80" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">{featuredItem.info || "Showcase Work"}</span>
                                </div>
                            )}
                        </div>

                        {/* Right Column: Info & Description */}
                        <div className="flex flex-col gap-3.5 text-left max-w-xl">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                                {featuredItem.info || "Featured Work"}
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white leading-tight">
                                {featuredItem.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium line-clamp-4">
                                {isResearch ? featuredItem.summary : featuredItem.description}
                            </p>
                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-2 mt-1">
                                {featuredItem.tech && featuredItem.tech.map((tag) => (
                                    <span key={tag} className="px-3 py-1 text-[9px] font-black uppercase bg-blue-50/80 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-lg">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            {/* CTA button */}
                            <div className="mt-3">
                                <Link 
                                    to={isResearch ? "/research" : `/project/${featuredItem.id}`} 
                                    className="inline-flex items-center justify-center bg-gray-900 dark:bg-white text-white dark:text-gray-950 px-6 py-2.5 rounded-xl font-black text-xs hover:bg-black dark:hover:bg-gray-100 hover:scale-105 hover:shadow-lg transition-all duration-300"
                                >
                                    Explore Details
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

function Contact({ bgClass }) {
    const { title, subtitle, cardInfo, socials } = siteContent.contact;
    const { footer } = siteContent;

    const socialLinks = [
        {
            label: "Facebook",
            href: socials.facebook,
            Icon: FaFacebookF,
            className: "hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600"
        },
        {
            label: "Github",
            href: socials.github,
            Icon: FaGithub,
            className: "hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black"
        },
        {
            label: "LinkedIn",
            href: socials.linkedin,
            Icon: FaLinkedinIn,
            className: "hover:bg-blue-700 hover:text-white dark:hover:bg-blue-600"
        }
    ];

    const latestUpdate = changelogData[changelogData.length - 1];
    const currentVersion = latestUpdate?.version || "0.0.0";
    const lastUpdatedDate = latestUpdate?.date 
        ? new Date(latestUpdate.date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })
        : "Unknown";

    return (
        <section
            id="contact"
            className={`snap-start shrink-0 h-screen w-full flex flex-col justify-between items-center pt-10 pb-28 px-6 relative overflow-hidden border-none rounded-none ${bgClass}`}
        >
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none opacity-20 dark:opacity-10 z-0">
                <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-blue-300 dark:bg-blue-900/40 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-indigo-300 dark:bg-indigo-900/40 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="w-full flex flex-col items-center gap-6 mt-6 overflow-y-auto no-scrollbar pb-2 max-w-7xl mx-auto relative z-10">
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="relative z-10 text-center">
                    <Title
                        title={title}
                        subtitle={subtitle}
                        className="!mb-0"
                    />
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }} className="relative z-10 flex flex-wrap justify-center gap-3">
                    {socialLinks.map(({ label, href, Icon, className }) => (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 text-gray-800 dark:text-gray-200 px-5 py-2.5 rounded-xl font-black text-xs hover:scale-105 hover:shadow-lg transition-all duration-300 ${className}`}
                        >
                            <Icon size={14} className="mr-2" />
                            {label}
                        </a>
                    ))}
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} className="relative z-10 w-full max-w-4xl">
                    <ContactCard info={cardInfo} />
                </motion.div>
            </div>

            {/* Inline Footer for Snapping Layout */}
            <div className="w-full text-center pt-2 pb-2 z-10 max-w-7xl mx-auto mt-4 relative z-10">
                <p className="text-[14px] font-black text-gray-900 dark:text-white mb-1.5 tracking-tight select-none lowercase">
                    jchengroa
                </p>
                <p className="text-xs text-gray-900 dark:text-gray-100">
                    <Link to="/legal" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <b>{footer.legalLink}</b>
                    </Link>
                </p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">
                    <Link to="/changelog" className="hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group inline-flex items-center gap-1">
                        <span className="opacity-70 group-hover:opacity-100">{footer.versionPrefix} {currentVersion}</span>
                        <span className="opacity-30">|</span>
                        <span className="opacity-70 group-hover:opacity-100">{footer.updatedPrefix}: {lastUpdatedDate}</span>
                    </Link>
                </p>
            </div>
        </section>
    );
}

function Home() {
    const { hero, featuredProjects, featuredResearch, featuredRecognition } = siteContent.home;
    const [isPromptOpen, setIsPromptOpen] = React.useState(false);
    const [selectedKeyword, setSelectedKeyword] = React.useState("");

    const openPrompt = (keyword) => {
        setSelectedKeyword(keyword);
        setIsPromptOpen(true);
    };

    const engine = getKeywordEngine();
    const highlights = engine.getHeroHighlights();

    // Landscape frames representation
    const frames = [
        { url: '/bg2.jpg', rotation: '-rotate-6' },
        { url: '/bg3.jpg', rotation: 'rotate-1' },
        { url: '/bg4.jpg', rotation: 'rotate-6' }
    ];

    return (
        <div className="h-screen w-full overflow-y-auto snap-y snap-mandatory scroll-smooth no-scrollbar select-none flex flex-col">
            
            {/* Section 1: True Full-Screen Theme-Aware Hero with Dynamic Space Ambient Glows */}
            <section
                id="home"
                className="relative snap-start shrink-0 h-screen w-full flex flex-col items-center justify-center pt-6 pb-28 px-6 border-none rounded-none bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-indigo-950 dark:via-gray-950 dark:to-blue-950 text-gray-900 dark:text-white isolate"
            >
                {/* Dynamic Space Ambient Glows */}
                <div className="absolute top-1/4 left-1/4 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-blue-500/10 dark:bg-blue-600/15 blur-3xl pointer-events-none animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-indigo-500/10 dark:bg-indigo-600/15 blur-3xl pointer-events-none animate-pulse delay-1000"></div>
                <div className="absolute inset-0 bg-black/[0.01] dark:bg-black/20 pointer-events-none"></div>

                {/* Hero Centered Container */}
                <div className="relative z-10 max-w-4xl w-full px-6 flex flex-col items-center justify-center h-full my-auto gap-4 md:gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col items-center w-full"
                    >
                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-3 md:mb-4 tracking-tighter text-gray-900 dark:text-white drop-shadow-md leading-none text-center">
                            {hero.title}
                        </h1>

                        <div className="max-w-2xl mx-auto space-y-1.5 md:space-y-2 mb-4 text-center">
                            <p className="text-2xl sm:text-2xl md:text-3xl text-gray-800 dark:text-gray-150 font-bold leading-snug tracking-tight">
                                {hero.subtitle}
                            </p>
                            <p className="text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-300 font-medium leading-relaxed max-w-xl mx-auto">
                                {hero.description}
                            </p>
                        </div>

                        {/* Keyword Highlights */}
                        <div className="w-full mb-4 hidden md:block">
                            <KeywordHighlights
                                highlights={highlights}
                                onKeywordClick={openPrompt}
                                className="max-w-3xl mx-auto"
                            />
                        </div>

                        {/* Call to Actions */}
                        <div className="flex flex-wrap justify-center gap-2.5 w-full px-2 sm:px-0">
                            <a
                                href={`mailto:${hero.email}`}
                                className="group flex items-center justify-center bg-gray-900 dark:bg-white text-white dark:text-gray-950 px-7 py-3 rounded-xl font-black text-xs sm:text-sm hover:bg-black dark:hover:bg-gray-100 hover:scale-105 hover:shadow-lg transition-all duration-300 w-full sm:w-auto"
                            >
                                <LuMail size={14} className="mr-1.5 group-hover:animate-pulse" />
                                {hero.cta}
                            </a>
                            <div className="flex gap-2.5 w-full sm:w-auto justify-center">
                                <a
                                    href={hero.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex flex-1 sm:flex-initial items-center justify-center bg-white dark:bg-white/10 backdrop-blur-md text-gray-800 dark:text-white p-3.5 rounded-xl font-bold hover:bg-gray-100 dark:hover:bg-white/20 hover:scale-110 hover:shadow-lg transition-all duration-300 border border-gray-200/50 dark:border-white/10 shadow-sm"
                                    aria-label="GitHub"
                                >
                                    <FaGithub size={14} className="group-hover:rotate-12 transition-transform" />
                                </a>
                                <a
                                    href={hero.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex flex-1 sm:flex-initial items-center justify-center bg-white dark:bg-white/10 backdrop-blur-md text-gray-800 dark:text-white p-3.5 rounded-xl font-bold hover:bg-gray-100 dark:hover:bg-white/20 hover:scale-110 hover:shadow-lg transition-all duration-300 border border-gray-200/50 dark:border-white/10 shadow-sm"
                                    aria-label="LinkedIn"
                                >
                                    <FaLinkedinIn size={14} className="group-hover:scale-110 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Redesigned Landscape Frames - Responsive Swipe on Mobile, Fanned on Desktop */}
                    <div className="w-full mt-4 md:mt-6 mb-2 relative z-10 max-w-5xl mx-auto">
                        <div className="flex -space-x-4 sm:-space-x-6 overflow-x-auto px-6 pb-2 no-scrollbar sm:overflow-x-visible sm:justify-center sm:px-0">
                            {frames.map((frame, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.05, rotate: 0, zIndex: 30 }}
                                    className={`shrink-0 w-36 sm:w-48 md:w-56 aspect-[4/3] rounded-2xl border-4 border-white dark:border-white/15 shadow-xl overflow-hidden cursor-pointer transform ${frame.rotation} transition-all duration-300`}
                                >
                                    <img 
                                        src={frame.url} 
                                        alt={`Portfolio landscape showcase ${index + 1}`} 
                                        className="w-full h-full object-cover" 
                                        loading="lazy"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: Featured Projects Snapping Slide */}
            <FeaturedSection
                id="featured-projects"
                title={featuredProjects.title}
                subtitle={featuredProjects.subtitle}
                items={projectsList}
                bgClass="bg-gradient-to-tr from-white via-blue-50/15 to-white dark:from-gray-900 dark:via-blue-950/10 dark:to-gray-900 text-gray-900 dark:text-white"
                glowColors={{ first: "bg-blue-500/5 dark:bg-blue-600/10", second: "bg-indigo-500/5 dark:bg-indigo-600/10" }}
            />

            {/* Section 3: Featured Research Snapping Slide */}
            <FeaturedSection
                id="featured-research"
                title={featuredResearch.title}
                subtitle={featuredResearch.subtitle}
                items={researchList}
                isResearch={true}
                bgClass="bg-gradient-to-br from-gray-50 via-indigo-50/20 to-gray-50 dark:from-gray-950 dark:via-indigo-950/10 dark:to-gray-950 text-gray-900 dark:text-white"
                glowColors={{ first: "bg-indigo-500/5 dark:bg-indigo-600/10", second: "bg-blue-500/5 dark:bg-blue-600/10" }}
            />

            {/* Section 4: Featured Recognition Snapping Slide */}
            <FeaturedSection
                id="featured-recognition"
                title={featuredRecognition.title}
                subtitle={featuredRecognition.subtitle}
                items={recognitionList}
                bgClass="bg-gradient-to-tr from-white via-blue-50/15 to-white dark:from-gray-900 dark:via-blue-950/10 dark:to-gray-900 text-gray-900 dark:text-white"
                glowColors={{ first: "bg-blue-500/5 dark:bg-blue-600/10", second: "bg-indigo-500/5 dark:bg-indigo-600/10" }}
            />

            {/* Section 5: Snapping Contact & Footer Page */}
            <Contact bgClass="bg-gradient-to-br from-gray-50 via-indigo-50/20 to-gray-50 dark:from-gray-950 dark:via-indigo-950/10 dark:to-gray-950 text-gray-900 dark:text-white" />

            <Prompt
                isOpen={isPromptOpen}
                onClose={() => setIsPromptOpen(false)}
                keyword={selectedKeyword}
            />
        </div>
    );
}

export default Home;
