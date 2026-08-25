import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LuFolder, LuBookOpen, LuAward, LuArrowUpRight } from 'react-icons/lu';
import {
    heroBentoContainerVariants,
    heroBentoCardVariants,
    heroBentoCardHover,
    heroBentoCardTap,
} from '../../animations/home.js';

export default function HeroBentoGrid({ projectsCount = 0, researchCount = 0, recognitionCount = 0 }) {
    return (
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
                            <span className="text-base sm:text-xl md:text-2xl font-black text-gray-900 dark:text-white tracking-tight">{projectsCount}</span>
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
                            <span className="text-base sm:text-xl md:text-2xl font-black text-gray-900 dark:text-white tracking-tight">{researchCount}</span>
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
                            <span className="text-base sm:text-xl md:text-2xl font-black text-gray-900 dark:text-white tracking-tight">{recognitionCount}</span>
                            <span className="text-[9px] sm:text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">Awards</span>
                        </div>
                        <p className="hidden md:block text-[11px] font-medium text-gray-500 dark:text-gray-400 leading-snug line-clamp-1">
                            Recognition &amp; Awards
                        </p>
                    </div>
                </Link>
            </motion.div>
        </motion.div>
    );
}

export { HeroBentoGrid };
