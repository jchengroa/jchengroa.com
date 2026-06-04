import React from 'react';
import { WorkCard, Title, Prompt, ContactCard } from '../components/components.jsx';
import { projectsList } from '../data/projects';
import { researchList } from '../data/research';
import { recognitionList } from '../data/recognitionList';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
import { FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { LuChevronLeft, LuChevronRight, LuChevronsDown, LuMail } from 'react-icons/lu';
import { getKeywordEngine, KeywordHighlights } from '../utils/keywordEngine';
import { siteContent } from '../data/siteContent';

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
        <section id={id} className={`py-24 ${bgClass} dark:bg-gray-900 overflow-hidden relative group/section`}>
            <Title
                title={title}
                subtitle={subtitle}
                className="mb-12"
            />

            <div className="w-full relative px-4" onMouseEnter={() => emblaApi?.plugins()?.autoplay?.stop()} onMouseLeave={() => emblaApi?.plugins()?.autoplay?.play()}>
                <button
                    onClick={scrollPrev}
                    className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-4 rounded-full shadow-xl border border-gray-100 dark:border-gray-800 text-gray-800 dark:text-gray-200 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300 opacity-0 group-hover/section:opacity-100 scale-90 group-hover/section:scale-100"
                    aria-label="Previous"
                >
                    <LuChevronLeft size={24} strokeWidth={3} />
                </button>

                <button
                    onClick={scrollNext}
                    className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-4 rounded-full shadow-xl border border-gray-100 dark:border-gray-800 text-gray-800 dark:text-gray-200 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300 opacity-0 group-hover/section:opacity-100 scale-90 group-hover/section:scale-100"
                    aria-label="Next"
                >
                    <LuChevronRight size={24} strokeWidth={3} />
                </button>

                <div className={`absolute inset-y-0 left-0 w-16 md:w-48 bg-gradient-to-r ${bgClass === 'bg-white' ? 'from-white dark:from-gray-900 via-white/40 dark:via-gray-900/40' : 'from-gray-50 dark:from-gray-950 via-gray-50/20 dark:via-gray-950/20'} to-transparent z-10 pointer-events-none`}></div>
                <div className={`absolute inset-y-0 right-0 w-16 md:w-48 bg-gradient-to-l ${bgClass === 'bg-white' ? 'from-white dark:from-gray-900 via-white/40 dark:via-gray-900/40' : 'from-gray-50 dark:from-gray-950 via-gray-50/20 dark:via-gray-950/20'} to-transparent z-10 pointer-events-none`}></div>

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

function Contact() {
    const { title, subtitle, cardInfo, socials } = siteContent.contact;

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

    return (
        <section
            id="contact"
            className="relative min-h-screen flex flex-col justify-center items-center py-20 px-6 gap-12 overflow-hidden bg-gray-50/50 dark:bg-gray-950"
        >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none opacity-20 dark:opacity-10">
                <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-indigo-200 dark:bg-indigo-900 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
            </div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="relative z-10 text-center">
                <Title
                    title={title}
                    subtitle={subtitle}
                />
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }} className="relative z-10 flex flex-wrap justify-center gap-4">
                {socialLinks.map(({ label, href, Icon, className }) => (
                    <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-800 dark:text-gray-200 px-8 py-4 rounded-2xl font-black hover:scale-105 hover:shadow-xl transition-all duration-300 ${className}`}
                    >
                        <Icon size={20} className="mr-2" />
                        {label}
                    </a>
                ))}
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }} className="relative z-10 w-full max-w-5xl">
                <ContactCard info={cardInfo} />
            </motion.div>
        </section>
    );
}

const HERO_IMAGES = [
    '/bg1.jpg',
    '/bg2.jpg',
    '/bg3.jpg',
    '/bg4.jpg'
];

function Home() {
    const { hero, featuredProjects, featuredResearch, featuredRecognition } = siteContent.home;
    const [currentImage, setCurrentImage] = React.useState(() => Math.floor(Math.random() * HERO_IMAGES.length));
    const [isPromptOpen, setIsPromptOpen] = React.useState(false);
    const [selectedKeyword, setSelectedKeyword] = React.useState("");

    const openPrompt = (keyword) => {
        setSelectedKeyword(keyword);
        setIsPromptOpen(true);
    };
    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => {
                let next;
                do {
                    next = Math.floor(Math.random() * HERO_IMAGES.length);
                } while (next === prev && HERO_IMAGES.length > 1);
                return next;
            });
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const engine = getKeywordEngine();
    const highlights = engine.getHeroHighlights();

    return (
        <>
            <section
                id="home"
                className="relative min-h-[90vh] flex items-center justify-center text-center p-5 rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-3xl mt-24 mx-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 isolate"
            >
                {/* Cross-fading Background Images */}
                {HERO_IMAGES.map((img, i) => (
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
                <div className="absolute inset-0 bg-white/70 dark:bg-gray-950/70 backdrop-blur-[2px] pointer-events-none"></div>

                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-blue-50/20 dark:from-blue-900/10 to-transparent pointer-events-none"></div>

                <div className="relative z-10 text-black dark:text-white max-w-5xl px-4 flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col items-center w-full"
                    >
                        <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter text-gray-900 dark:text-white drop-shadow-sm leading-none text-center">
                            {hero.title}
                        </h1>

                        <div className="max-w-3xl mx-auto space-y-6 mb-12 text-center">
                            <p className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-black leading-tight tracking-tight">
                                {hero.subtitle}
                            </p>
                            <p className="text-lg text-gray-500 dark:text-gray-400 font-medium leading-relaxed max-w-2xl mx-auto">
                                {hero.description}
                            </p>
                        </div>

                        {/* Keyword Summaries / Highlights - Restored to original position but perfectly centered */}
                        <div className="w-full mb-12">
                            <KeywordHighlights
                                highlights={highlights}
                                onKeywordClick={openPrompt}
                                className="max-w-4xl mx-auto"
                            />
                        </div>

                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href={`mailto:${hero.email}`}
                                className="group flex items-center bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-10 py-5 rounded-2xl font-black text-lg hover:bg-black dark:hover:bg-gray-100 hover:scale-105 hover:shadow-2xl transition-all duration-300"
                            >
                                <LuMail size={20} className="mr-2 group-hover:animate-pulse" />
                                {hero.cta}
                            </a>
                            <div className="flex gap-4">
                                <a
                                    href={hero.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center justify-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-900 dark:text-gray-100 p-5 rounded-2xl font-bold hover:scale-110 hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                                    aria-label="GitHub"
                                >
                                    <FaGithub size={20} className="group-hover:rotate-12 transition-transform" />
                                </a>
                                <a
                                    href={hero.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center justify-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-900 dark:text-gray-100 p-5 rounded-2xl font-bold hover:scale-110 hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                                    aria-label="LinkedIn"
                                >
                                    <FaLinkedinIn size={20} className="group-hover:scale-110 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Animated Scroll Indicator */}
                    <motion.button
                        animate={{ y: ["-5%", "0%", "-5%"] }}
                        transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                        onClick={() => document.getElementById('featured-projects')?.scrollIntoView({ behavior: 'smooth' })}
                        className="mt-16 text-gray-900/40 dark:text-gray-100/30 hover:text-gray-900/80 dark:hover:text-gray-100/70 transition-colors cursor-pointer outline-none group"
                        aria-label="Scroll to projects"
                    >
                        <LuChevronsDown size={36} className="group-hover:stroke-[3px] transition-all" />
                    </motion.button>
                </div>
            </section>
            <WorkCarousel
                id="featured-projects"
                title={featuredProjects.title}
                subtitle={featuredProjects.subtitle}
                items={projectsList}
                bgClass="bg-white"
            />
            <WorkCarousel
                id="featured-research"
                title={featuredResearch.title}
                subtitle={featuredResearch.subtitle}
                items={researchList}
                bgClass="bg-gray-50/50"
                isResearch={true}
            />
            <WorkCarousel
                id="featured-recognition"
                title={featuredRecognition.title}
                subtitle={featuredRecognition.subtitle}
                items={recognitionList}
                bgClass="bg-white"
            />
            <Contact />

            <Prompt
                isOpen={isPromptOpen}
                onClose={() => setIsPromptOpen(false)}
                keyword={selectedKeyword}
            />
        </>
    );
}

export default Home
