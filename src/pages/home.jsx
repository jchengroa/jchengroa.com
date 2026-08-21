import React from 'react';
import { Link } from 'react-router-dom';
import { Title, ContactCard, SectionIndicator } from '../components/components.jsx';
import { motion } from 'framer-motion';
import { FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { LuMail, LuFileText, LuFolder, LuBookOpen, LuAward, LuArrowUpRight, LuArrowDown } from 'react-icons/lu';
import { useData } from '../context/DataContext.jsx';
import {
    heroContainerVariants,
    heroBadgeVariants,
    heroTitleVariants,
    heroSubtitleVariants,
    heroCtaContainerVariants,
    heroPrimaryCtaVariants,
    heroSecondaryCtaVariants,
    heroSocialButtonVariants,
    heroPrimaryButtonHover,
    heroPrimaryButtonTap,
    heroSecondaryButtonHover,
    heroSecondaryButtonTap,
    heroSocialHover,
    heroSocialTap,
    heroBentoContainerVariants,
    heroBentoCardVariants,
    heroBentoCardHover,
    heroBentoCardTap,
    featuredSectionContainerVariants,
    featuredHeaderVariants,
    featuredContentVariants,
    featuredCardVariants,
    featuredTagVariants,
    featuredCardHover,
    featuredCardTap,
    contactContainerVariants,
    contactHeaderVariants,
    contactSocialsContainerVariants,
    contactSocialPillVariants,
    contactCardContainerVariants,
    contactSocialPillHover,
    contactSocialPillTap,
    inlineFooterVariants,
} from '../animations/home.js';

function FeaturedSection({ id, title, subtitle, items, isResearch, icon, bgClass, glowColors = { first: "bg-blue-500/5 dark:bg-blue-600/10", second: "bg-indigo-500/5 dark:bg-indigo-600/10" } }) {
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
            className="snap-start shrink-0 min-h-dvh md:h-dvh w-full flex flex-col justify-center py-16 md:py-0 px-6 relative overflow-y-auto no-scrollbar md:overflow-hidden border-none rounded-none bg-blue-50/50 dark:bg-blue-950/20 text-gray-900 dark:text-white isolate transition-colors duration-300"
        >
            {/* Split Left Background (Desktop Only) */}
            <div className="absolute left-0 top-0 bottom-0 w-full md:w-[48%] bg-white dark:bg-gray-950 z-0 transition-colors duration-300" />
            
            {/* Wave Divider SVG (Desktop Only) */}
            <div className="absolute left-[48%] top-0 bottom-0 w-[100px] h-full z-0 hidden md:block text-white dark:text-gray-950 fill-current transition-colors duration-300">
                <svg viewBox="0 0 100 1000" preserveAspectRatio="none" className="w-full h-full">
                    <path d="M0,0 Q60,250 30,500 Q0,750 50,1000 L0,1000 Z" />
                </svg>
            </div>

            {/* Ambient Background Glows */}
            <div className={`absolute top-1/4 left-1/3 w-72 h-72 rounded-full ${glowColors.first} blur-3xl pointer-events-none opacity-80`}></div>
            <div className={`absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full ${glowColors.second} blur-3xl pointer-events-none opacity-80`}></div>

            <motion.div 
                variants={featuredSectionContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="max-w-6xl w-full mx-auto flex flex-col justify-center min-h-0 relative z-10 my-auto py-6"
            >
                <motion.div variants={featuredHeaderVariants} className="w-full flex justify-center text-center">
                    <Title
                        title={title}
                        icon={icon}
                        className="mb-3 md:mb-6"
                    />
                </motion.div>

                {featuredItem && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center w-full max-w-5xl mx-auto">
                        {/* Left Column (Desktop) / Second Block (Mobile): Info & Description */}
                        <motion.div 
                            variants={featuredContentVariants}
                            className="flex flex-col gap-3 text-center md:text-left items-center md:items-start max-w-xl mx-auto md:mx-0 order-2 md:order-1"
                        >
                            <Link to={`/project/${featuredItem.id}`} className="group/title">
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 dark:text-white leading-tight group-hover/title:text-blue-600 dark:group-hover/title:text-blue-400 transition-colors">
                                    {featuredItem.title}
                                </h3>
                            </Link>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium line-clamp-4">
                                {isResearch ? featuredItem.summary : featuredItem.description}
                            </p>
                            {/* Tech Stack */}
                            <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-1">
                                {featuredItem.tech && featuredItem.tech.map((tag) => (
                                    <motion.span 
                                        key={tag} 
                                        variants={featuredTagVariants}
                                        className="px-3 py-1 text-[9px] font-black uppercase bg-blue-50/80 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-lg shadow-sm"
                                    >
                                        {tag}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right Column (Desktop) / First Block (Mobile): Landscape visual mockup */}
                        <motion.div
                            variants={featuredCardVariants}
                            whileHover={featuredCardHover}
                            whileTap={featuredCardTap}
                            className="order-1 md:order-2 w-full max-w-md md:max-w-none mx-auto"
                        >
                            <Link
                                to={`/project/${featuredItem.id}`}
                                className="w-full aspect-[16/10] rounded-[2rem] overflow-hidden border border-gray-200/80 dark:border-white/10 shadow-xl bg-gray-100 dark:bg-gray-950 flex items-center justify-center relative group cursor-pointer block transition-all duration-300"
                            >
                                {featuredItem.images && featuredItem.images[0] ? (
                                    <img 
                                        src={featuredItem.images[0]} 
                                        alt={featuredItem.title} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center p-6 text-center text-gray-400 dark:text-gray-600">
                                        <LuFileText size={48} className="mb-2 text-blue-500/80" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{featuredItem.info || "Showcase Work"}</span>
                                    </div>
                                )}
                            </Link>
                        </motion.div>
                    </div>
                )}
            </motion.div>
        </section>
    );
}

function Contact({ bgClass }) {
    const { siteContent, changelogs } = useData();
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

    const latestUpdate = changelogs[changelogs.length - 1];
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
            className="snap-start shrink-0 min-h-dvh md:h-dvh w-full flex flex-col justify-between items-center pt-16 pb-28 md:py-10 px-6 relative overflow-y-auto no-scrollbar md:overflow-hidden border-none rounded-none bg-blue-50/50 dark:bg-blue-950/20 text-gray-900 dark:text-white isolate transition-colors duration-300"
        >
            {/* Split Left Background (Desktop Only) */}
            <div className="absolute left-0 top-0 bottom-0 w-full md:w-[48%] bg-white dark:bg-gray-950 z-0 transition-colors duration-300" />
            
            {/* Wave Divider SVG (Desktop Only) */}
            <div className="absolute left-[48%] top-0 bottom-0 w-[100px] h-full z-0 hidden md:block text-white dark:text-gray-950 fill-current transition-colors duration-300">
                <svg viewBox="0 0 100 1000" preserveAspectRatio="none" className="w-full h-full">
                    <path d="M0,0 Q60,250 30,500 Q0,750 50,1000 L0,1000 Z" />
                </svg>
            </div>

            <motion.div 
                variants={contactContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="w-full flex flex-col items-center gap-6 my-auto overflow-y-auto no-scrollbar pb-2 max-w-7xl mx-auto relative z-10"
            >
                <motion.div variants={contactHeaderVariants} className="relative z-10 text-center">
                    <Title
                        title={title}
                        subtitle={subtitle}
                        className="!mb-0"
                    />
                </motion.div>

                <motion.div variants={contactSocialsContainerVariants} className="relative z-10 flex flex-wrap justify-center gap-3">
                    {socialLinks.map(({ label, href, Icon, className }) => (
                        <motion.a
                            key={label}
                            variants={contactSocialPillVariants}
                            whileHover={contactSocialPillHover}
                            whileTap={contactSocialPillTap}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center bg-white dark:bg-gray-950 border border-gray-150 dark:border-gray-800 text-gray-800 dark:text-gray-200 px-5 py-2.5 rounded-xl font-black text-xs shadow-sm transition-colors duration-300 ${className}`}
                        >
                            <Icon size={14} className="mr-2" />
                            {label}
                        </motion.a>
                    ))}
                </motion.div>

                <motion.div variants={contactCardContainerVariants} className="relative z-10 w-full max-w-4xl">
                    <ContactCard info={cardInfo} />
                </motion.div>
            </motion.div>

            {/* Inline Footer for Snapping Layout */}
            <motion.div 
                variants={inlineFooterVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="w-full text-center pt-2 pb-2 z-10 max-w-7xl mx-auto mt-4 relative z-10"
            >
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
            </motion.div>
        </section>
    );
}

function Home() {
    const { projects, research, recognition, siteContent } = useData();
    const { hero, featuredProjects, featuredResearch, featuredRecognition } = siteContent.home;
    const socials = siteContent.contact?.socials || {};
    const [activeSection, setActiveSection] = React.useState("home");

    React.useEffect(() => {
        const sections = ["home", "featured-projects", "featured-research", "featured-recognition", "contact"];
        const observerOptions = {
            root: null,
            rootMargin: "-25% 0px -25% 0px", // Trigger when in center area of viewport
            threshold: 0.2
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, observerOptions);

        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => {
            sections.forEach((id) => {
                const el = document.getElementById(id);
                if (el) observer.unobserve(el);
            });
        };
    }, []);

    const sectionsConfig = [
        { id: "home", label: "Home" },
        { id: "featured-projects", label: "Projects" },
        { id: "featured-research", label: "Research" },
        { id: "featured-recognition", label: "Awards" },
        { id: "contact", label: "Contact" }
    ];

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="h-dvh w-full overflow-y-auto snap-y snap-mandatory scroll-smooth no-scrollbar flex flex-col relative">
            {/* Fluid Section Indicator (Desktop Only) */}
            <SectionIndicator
                sectionsConfig={sectionsConfig}
                activeSection={activeSection}
                scrollToSection={scrollToSection}
            />
            
            {/* Section 1: Modern Theme-Aware Hero with Dynamic Interactive Hub */}
            <section
                id="home"
                className="relative snap-start shrink-0 min-h-dvh md:h-dvh w-full flex flex-col items-center justify-center border-none rounded-none overflow-y-auto no-scrollbar md:overflow-hidden bg-blue-50/50 dark:bg-blue-950/20 text-gray-900 dark:text-white isolate transition-colors duration-300 py-16 md:py-0"
            >
                {/* Split Left Background (Desktop Only) */}
                <div className="absolute left-0 top-0 bottom-0 w-full md:w-[48%] bg-white dark:bg-gray-950 z-0 transition-colors duration-300" />
                
                {/* Wave Divider SVG (Desktop Only) */}
                <div className="absolute left-[48%] top-0 bottom-0 w-[100px] h-full z-0 hidden md:block text-white dark:text-gray-950 fill-current transition-colors duration-300">
                    <svg viewBox="0 0 100 1000" preserveAspectRatio="none" className="w-full h-full">
                        <path d="M0,0 Q60,250 30,500 Q0,750 50,1000 L0,1000 Z" />
                    </svg>
                </div>

                {/* Dynamic Space Ambient Glows */}
                <div className="absolute top-1/4 right-1/4 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-blue-500/10 dark:bg-blue-600/15 blur-3xl pointer-events-none opacity-80"></div>
                <div className="absolute inset-0 bg-black/[0.01] dark:bg-black/20 pointer-events-none"></div>

                {/* Hero Centered Container */}
                <div className="relative z-10 max-w-5xl w-full px-4 sm:px-6 flex flex-col items-center justify-center min-h-0 md:h-full my-auto py-4 sm:py-6 md:py-0 gap-3.5 sm:gap-5 md:gap-6">
                    <motion.div
                        variants={heroContainerVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col items-center w-full text-center"
                    >
                        <motion.h1 
                            variants={heroTitleVariants}
                            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-3 md:mb-4 tracking-tighter text-gray-900 dark:text-white drop-shadow-sm leading-none"
                        >
                            {hero.title}
                        </motion.h1>

                        <motion.div 
                            variants={heroSubtitleVariants}
                            className="max-w-2xl mx-auto space-y-2 mb-4 sm:mb-5 md:mb-6"
                        >
                            <p className="text-sm sm:text-base md:text-lg text-blue-600 dark:text-blue-400 font-semibold leading-snug">
                                {hero.subtitle}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-normal leading-relaxed max-w-xl mx-auto line-clamp-3 sm:line-clamp-none">
                                {hero.description}
                            </p>
                        </motion.div>

                        {/* Call to Actions & Socials */}
                        <motion.div 
                            variants={heroCtaContainerVariants}
                            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 w-full px-1 sm:px-0"
                        >
                            <motion.a
                                variants={heroPrimaryCtaVariants}
                                whileHover={heroPrimaryButtonHover}
                                whileTap={heroPrimaryButtonTap}
                                href={`mailto:${hero.email}`}
                                className="group flex items-center justify-center bg-gray-900 dark:bg-white text-white dark:text-gray-950 px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-300 w-full sm:w-auto"
                            >
                                <LuMail size={15} className="mr-1.5 sm:mr-2 group-hover:scale-110 transition-transform" />
                                {hero.cta}
                            </motion.a>

                            <div className="flex gap-2 sm:gap-2.5 w-full sm:w-auto justify-center">
                                {socials.facebook && (
                                    <motion.a
                                        variants={heroSocialButtonVariants}
                                        whileHover={heroSocialHover}
                                        whileTap={heroSocialTap}
                                        href={socials.facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex flex-1 sm:flex-initial items-center justify-center bg-white dark:bg-white/10 backdrop-blur-md text-gray-800 dark:text-white p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl font-bold border border-gray-200/60 dark:border-white/10 shadow-sm transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400"
                                        aria-label="Facebook"
                                    >
                                        <FaFacebookF size={15} className="group-hover:scale-110 transition-transform" />
                                    </motion.a>
                                )}
                                <motion.a
                                    variants={heroSocialButtonVariants}
                                    whileHover={heroSocialHover}
                                    whileTap={heroSocialTap}
                                    href={hero.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex flex-1 sm:flex-initial items-center justify-center bg-white dark:bg-white/10 backdrop-blur-md text-gray-800 dark:text-white p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl font-bold border border-gray-200/60 dark:border-white/10 shadow-sm transition-colors duration-300"
                                    aria-label="GitHub"
                                >
                                    <FaGithub size={15} className="group-hover:rotate-12 transition-transform" />
                                </motion.a>
                                <motion.a
                                    variants={heroSocialButtonVariants}
                                    whileHover={heroSocialHover}
                                    whileTap={heroSocialTap}
                                    href={hero.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex flex-1 sm:flex-initial items-center justify-center bg-white dark:bg-white/10 backdrop-blur-md text-gray-800 dark:text-white p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl font-bold border border-gray-200/60 dark:border-white/10 shadow-sm transition-colors duration-300"
                                    aria-label="LinkedIn"
                                >
                                    <FaLinkedinIn size={15} className="group-hover:scale-110 transition-transform" />
                                </motion.a>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Responsive Bento Highlights Grid - Optimized for Mobile & Desktop Viewports */}
                    <motion.div 
                        variants={heroBentoContainerVariants}
                        initial="hidden"
                        animate="visible"
                        className="w-full grid grid-cols-3 gap-2 sm:gap-3.5 md:gap-4 max-w-4xl mx-auto"
                    >
                        {/* Bento Card 1: Projects Hub */}
                        <motion.div
                            variants={heroBentoCardVariants}
                            whileHover={heroBentoCardHover}
                            whileTap={heroBentoCardTap}
                        >
                            <Link
                                to="/projects"
                                className="flex flex-col justify-between p-3 sm:p-4 md:p-5 rounded-2xl sm:rounded-[1.75rem] border border-gray-200/60 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/60 shadow-md hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 group h-full relative overflow-hidden text-center sm:text-left"
                            >
                                <div className="flex items-center justify-center sm:justify-between mb-1.5 sm:mb-3">
                                    <div className="p-1.5 sm:p-2.5 rounded-xl sm:rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        <LuFolder size={16} strokeWidth={2.5} className="sm:w-5 sm:h-5" />
                                    </div>
                                    <div className="hidden sm:flex items-center gap-1 text-[11px] font-black uppercase text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        <span>View</span>
                                        <LuArrowUpRight size={13} strokeWidth={2.5} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2 mb-0.5">
                                        <span className="text-base sm:text-xl md:text-2xl font-black text-gray-900 dark:text-white tracking-tight">{projects?.length || 0}</span>
                                        <span className="text-[9px] sm:text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">Projects</span>
                                    </div>
                                    <p className="hidden md:block text-[11px] font-medium text-gray-500 dark:text-gray-400 leading-snug line-clamp-1">
                                        Web, Software &amp; Hardware
                                    </p>
                                </div>
                            </Link>
                        </motion.div>

                        {/* Bento Card 2: Research Studies */}
                        <motion.div
                            variants={heroBentoCardVariants}
                            whileHover={heroBentoCardHover}
                            whileTap={heroBentoCardTap}
                        >
                            <Link
                                to="/research"
                                className="flex flex-col justify-between p-3 sm:p-4 md:p-5 rounded-2xl sm:rounded-[1.75rem] border border-gray-200/60 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/60 shadow-md hover:shadow-xl hover:border-indigo-500/30 transition-all duration-300 group h-full relative overflow-hidden text-center sm:text-left"
                            >
                                <div className="flex items-center justify-center sm:justify-between mb-1.5 sm:mb-3">
                                    <div className="p-1.5 sm:p-2.5 rounded-xl sm:rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                        <LuBookOpen size={16} strokeWidth={2.5} className="sm:w-5 sm:h-5" />
                                    </div>
                                    <div className="hidden sm:flex items-center gap-1 text-[11px] font-black uppercase text-gray-400 dark:text-gray-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                        <span>View</span>
                                        <LuArrowUpRight size={13} strokeWidth={2.5} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2 mb-0.5">
                                        <span className="text-base sm:text-xl md:text-2xl font-black text-gray-900 dark:text-white tracking-tight">{research?.length || 0}</span>
                                        <span className="text-[9px] sm:text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Research</span>
                                    </div>
                                    <p className="hidden md:block text-[11px] font-medium text-gray-500 dark:text-gray-400 leading-snug line-clamp-1">
                                        Applied Science &amp; STEM Studies
                                    </p>
                                </div>
                            </Link>
                        </motion.div>

                        {/* Bento Card 3: Recognitions & Awards */}
                        <motion.div
                            variants={heroBentoCardVariants}
                            whileHover={heroBentoCardHover}
                            whileTap={heroBentoCardTap}
                        >
                            <Link
                                to="/recognition"
                                className="flex flex-col justify-between p-3 sm:p-4 md:p-5 rounded-2xl sm:rounded-[1.75rem] border border-gray-200/60 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/60 shadow-md hover:shadow-xl hover:border-amber-500/30 transition-all duration-300 group h-full relative overflow-hidden text-center sm:text-left"
                            >
                                <div className="flex items-center justify-center sm:justify-between mb-1.5 sm:mb-3">
                                    <div className="p-1.5 sm:p-2.5 rounded-xl sm:rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                                        <LuAward size={16} strokeWidth={2.5} className="sm:w-5 sm:h-5" />
                                    </div>
                                    <div className="hidden sm:flex items-center gap-1 text-[11px] font-black uppercase text-gray-400 dark:text-gray-500 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                                        <span>View</span>
                                        <LuArrowUpRight size={13} strokeWidth={2.5} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2 mb-0.5">
                                        <span className="text-base sm:text-xl md:text-2xl font-black text-gray-900 dark:text-white tracking-tight">{recognition?.length || 0}</span>
                                        <span className="text-[9px] sm:text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">Awards</span>
                                    </div>
                                    <p className="hidden md:block text-[11px] font-medium text-gray-500 dark:text-gray-400 leading-snug line-clamp-1">
                                        Recognition &amp; Awards
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Section 2: Featured Projects Snapping Slide */}
            <FeaturedSection
                id="featured-projects"
                title={featuredProjects.title}
                subtitle={featuredProjects.subtitle}
                items={projects}
                icon={LuFolder}
                bgClass="bg-gradient-to-tr from-white via-blue-50/15 to-white dark:from-gray-900 dark:via-blue-950/10 dark:to-gray-900 text-gray-900 dark:text-white"
                glowColors={{ first: "bg-blue-500/5 dark:bg-blue-600/10", second: "bg-indigo-500/5 dark:bg-indigo-600/10" }}
            />

            {/* Section 3: Featured Research Snapping Slide */}
            <FeaturedSection
                id="featured-research"
                title={featuredResearch.title}
                subtitle={featuredResearch.subtitle}
                items={research}
                isResearch={true}
                icon={LuBookOpen}
                bgClass="bg-gradient-to-br from-gray-50 via-indigo-50/20 to-gray-50 dark:from-gray-950 dark:via-indigo-950/10 dark:to-gray-950 text-gray-900 dark:text-white"
                glowColors={{ first: "bg-indigo-500/5 dark:bg-indigo-600/10", second: "bg-blue-500/5 dark:bg-blue-600/10" }}
            />

            {/* Section 4: Featured Recognition Snapping Slide */}
            <FeaturedSection
                id="featured-recognition"
                title={featuredRecognition.title}
                subtitle={featuredRecognition.subtitle}
                items={recognition}
                icon={LuAward}
                bgClass="bg-gradient-to-tr from-white via-blue-50/15 to-white dark:from-gray-900 dark:via-blue-950/10 dark:to-gray-900 text-gray-900 dark:text-white"
                glowColors={{ first: "bg-blue-500/5 dark:bg-blue-600/10", second: "bg-indigo-500/5 dark:bg-indigo-600/10" }}
            />

            {/* Section 5: Snapping Contact & Footer Page */}
            <Contact bgClass="bg-gradient-to-br from-gray-50 via-indigo-50/20 to-gray-50 dark:from-gray-950 dark:via-indigo-950/10 dark:to-gray-950 text-gray-900 dark:text-white" />
        </div>
    );
}

export default Home;
