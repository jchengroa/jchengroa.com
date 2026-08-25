import { motion } from 'framer-motion';
import {
    workDetailSectionVariants,
    workDetailMetricCardVariants
} from '../../animations/workDetail.js';

export default function WorkDetailMetrics({ stats, title = "Key Metrics" }) {
    if (!stats || stats.length === 0) return null;

    return (
        <motion.section
            id="metrics"
            variants={workDetailSectionVariants}
            className="scroll-mt-36"
        >
            <h3 className="text-xs font-black tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500 mb-4 sm:mb-5">
                {title}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                {stats.map((stat, i) => (
                    <motion.div 
                        key={i} 
                        variants={workDetailMetricCardVariants}
                        className="p-5 sm:p-6 bg-gray-50 dark:bg-gray-900 rounded-[1.75rem] border border-gray-100 dark:border-gray-800 hover:shadow-lg dark:hover:shadow-black/30 transition-all"
                    >
                        <div className="text-2xl sm:text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400 mb-1.5 tracking-tight">
                            {stat.value}
                        </div>
                        <div className="text-xs sm:text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider mb-1">
                            {stat.label}
                        </div>
                        {stat.detail && (
                            <div className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                                {stat.detail}
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}

export { WorkDetailMetrics };
