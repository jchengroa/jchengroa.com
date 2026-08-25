import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LuFileText } from 'react-icons/lu';
import { Title } from '../typography.jsx';
import { SplitBackground } from '../splitBackground.jsx';
import {
    featuredSectionContainerVariants,
    featuredHeaderVariants,
    featuredContentVariants,
    featuredCardVariants,
    featuredTagVariants,
    featuredCardHover,
    featuredCardTap,
} from '../../animations/home.js';

export default function FeaturedSection({ id, title, items, isResearch, icon }) {
    const [featuredItem, setFeaturedItem] = useState(null);

    useEffect(() => {
        if (items && items.length > 0) {
            const randomIndex = Math.floor(Math.random() * items.length);
            setFeaturedItem(items[randomIndex]);
        }
    }, [items]);

    const colorTheme = id === 'featured-projects' ? 'projects' : id === 'featured-research' ? 'research' : 'recognition';
    
    const featuredLink = colorTheme === 'research'
        ? `/research/${featuredItem?.id}`
        : colorTheme === 'recognition'
        ? `/recognition/${featuredItem?.id}`
        : `/projects/${featuredItem?.id}`;

    const themeStyles = {
        projects: {
            titleHover: "group-hover/title:text-blue-600 dark:group-hover/title:text-blue-400",
            tag: "bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/20"
        },
        research: {
            titleHover: "group-hover/title:text-indigo-600 dark:group-hover/title:text-indigo-400",
            tag: "bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border-indigo-500/20"
        },
        recognition: {
            titleHover: "group-hover/title:text-amber-600 dark:group-hover/title:text-amber-400",
            tag: "bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/20"
        }
    }[colorTheme];

    return (
        <section 
            id={id} 
            className="snap-start shrink-0 min-h-dvh md:h-dvh w-full flex flex-col justify-center py-16 md:py-0 px-6 relative overflow-y-auto no-scrollbar md:overflow-hidden border-none rounded-none bg-blue-50/50 dark:bg-blue-950/20 text-gray-900 dark:text-white isolate transition-colors duration-300"
        >
            <SplitBackground />

            {/* Ambient Background Glows that respect dynamic theme accent */}
            <div className="absolute top-1/4 left-1/3 w-72 h-72 rounded-full bg-blue-500/10 dark:bg-blue-600/15 blur-3xl pointer-events-none opacity-70"></div>
            <div className="absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full bg-indigo-500/10 dark:bg-indigo-600/15 blur-3xl pointer-events-none opacity-70"></div>

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
                        colorTheme={colorTheme}
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
                            <Link to={featuredLink} className="group/title">
                                <h3 className={`text-xl sm:text-2xl md:text-3xl font-black text-gray-900 dark:text-white leading-tight ${themeStyles.titleHover} transition-colors`}>
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
                                        className={`px-3 py-1 text-[9px] font-black uppercase rounded-lg shadow-sm border ${themeStyles.tag}`}
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
                            className="order-1 md:order-2 w-full max-w-md md:max-w-none mx-auto relative group"
                        >
                            {/* Subtle Ambient Accent Glow behind featured image */}
                            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-20 dark:group-hover:opacity-30 transition duration-500 pointer-events-none -z-10" />

                            <Link
                                to={featuredLink}
                                className="w-full aspect-[16/10] rounded-[2rem] overflow-hidden border border-gray-200/80 dark:border-white/10 shadow-xl bg-gray-100 dark:bg-gray-950 flex items-center justify-center relative group cursor-pointer block transition-all duration-300 accent-glow-card"
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

export { FeaturedSection };
