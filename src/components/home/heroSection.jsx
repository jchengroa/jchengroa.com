import { motion } from 'framer-motion';
import { FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { LuMail } from 'react-icons/lu';
import HeroPhysicsTitle from '../heroPhysicsTitle.jsx';
import { SplitBackground } from '../splitBackground.jsx';
import { HeroBentoGrid } from './heroBentoGrid.jsx';
import {
    heroContainerVariants,
    heroSubtitleVariants,
    heroCtaContainerVariants,
    heroPrimaryCtaVariants,
    heroSocialButtonVariants,
    heroPrimaryButtonHover,
    heroPrimaryButtonTap,
    heroSocialHover,
    heroSocialTap,
} from '../../animations/home.js';

export default function HeroSection({ hero, socials = {}, projectsCount = 0, researchCount = 0, recognitionCount = 0 }) {
    return (
        <section
            id="home"
            className="relative snap-start shrink-0 min-h-dvh md:h-dvh w-full flex flex-col items-center justify-center border-none rounded-none overflow-y-auto no-scrollbar md:overflow-hidden bg-blue-50/50 dark:bg-blue-950/20 text-gray-900 dark:text-white isolate transition-colors duration-300 py-16 md:py-0"
        >
            <SplitBackground />

            {/* Dynamic Space Ambient Glows */}
            <div className="absolute top-1/4 right-1/4 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-blue-500/10 dark:bg-blue-600/15 blur-3xl pointer-events-none opacity-80"></div>
            <div className="absolute inset-0 bg-black/[0.01] dark:bg-black/20 pointer-events-none"></div>

            {/* Hero Centered Container */}
            <div className="relative z-10 max-w-6xl w-full px-2 sm:px-6 flex flex-col items-center justify-center min-h-0 md:h-full my-auto py-4 sm:py-6 md:py-0 gap-3.5 sm:gap-5 md:gap-6">
                <motion.div
                    variants={heroContainerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-center w-full text-center"
                >
                    <HeroPhysicsTitle title={hero.title} />

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

                {/* Responsive Bento Highlights Grid */}
                <HeroBentoGrid
                    projectsCount={projectsCount}
                    researchCount={researchCount}
                    recognitionCount={recognitionCount}
                />
            </div>
        </section>
    );
}

export { HeroSection };
