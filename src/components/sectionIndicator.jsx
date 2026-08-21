import { motion } from 'framer-motion';
import { sectionIndicatorDotSpring } from '../animations/components.js';

export function SectionIndicator({ sectionsConfig, activeSection, scrollToSection }) {
    const activeSectionIndex = sectionsConfig.findIndex(item => item.id === activeSection);

    return (
        <div className="hidden md:flex fixed z-[80] transition-all duration-300 right-8 top-1/2 -translate-y-1/2 flex-col gap-3 items-center p-1 rounded-full bg-white/40 dark:bg-black/25 backdrop-blur-md border border-gray-200/25 dark:border-white/5 shadow-xl">
            {sectionsConfig.map((item) => (
                <div key={item.id} className="relative group flex items-center justify-center">
                    {/* Tooltip (Desktop only) */}
                    <span className="absolute right-8 px-2 py-1 rounded bg-gray-900/80 text-white dark:bg-white/80 dark:text-gray-950 text-[10px] font-black uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden md:block select-none whitespace-nowrap">
                        {item.label}
                    </span>
                    
                    {/* Dot Button */}
                    <button
                        onClick={() => scrollToSection(item.id)}
                        className="w-6 h-6 flex items-center justify-center relative cursor-pointer focus:outline-none"
                        aria-label={`Scroll to ${item.label}`}
                    >
                        {activeSection === item.id ? (
                            <motion.div
                                layoutId="activeDot"
                                className="absolute rounded-full bg-blue-600 dark:bg-blue-500 shadow-[0_0_12px_rgba(37,99,235,0.6)] w-5 h-2 md:w-2 md:h-5 cursor-grab active:cursor-grabbing"
                                transition={sectionIndicatorDotSpring}
                                drag="y"
                                dragConstraints={{ top: -activeSectionIndex * 36, bottom: (sectionsConfig.length - 1 - activeSectionIndex) * 36 }}
                                dragElastic={0.1}
                                dragMomentum={false}
                                onDragEnd={(event, info) => {
                                    const deltaIndex = Math.round(info.offset.y / 36);
                                    const newIndex = Math.max(0, Math.min(sectionsConfig.length - 1, activeSectionIndex + deltaIndex));
                                    scrollToSection(sectionsConfig[newIndex].id);
                                }}
                            />
                        ) : (
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400/50 hover:bg-gray-600 dark:bg-gray-600/50 dark:hover:bg-gray-400 transition-all duration-300" />
                        )}
                    </button>
                </div>
            ))}
        </div>
    );
}

export default SectionIndicator;
