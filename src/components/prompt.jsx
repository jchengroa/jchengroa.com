import { motion, AnimatePresence } from "framer-motion";
import { keywordsData } from "../data/keywords";
import { FormattedText } from "./typography.jsx";

/**
 * Prompt Component
 * A modal that displays details about a specific keyword.
 */
function Prompt({ isOpen, onClose, keyword }) {
    const data = keywordsData[keyword] || {
        definition: "Definition not found for this keyword.",
        metrics: "No metrics available."
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800"
                    >
                        <div className="p-8 md:p-12">
                            {/* Header */}
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <span className="text-[10px] font-black tracking-[0.2em] text-blue-600 uppercase mb-2 block">
                                        Keyword Detail
                                    </span>
                                    <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">
                                        {keyword}
                                    </h2>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors group"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 dark:text-gray-600 group-hover:text-gray-900 dark:group-hover:text-white transition-colors"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                </button>
                            </div>

                            {/* Content */}
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">Definition</h3>
                                    <p className="text-lg text-gray-600 dark:text-gray-400 font-medium leading-relaxed italic">
                                        "<FormattedText text={data.definition} />"
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">Metrics / Key Insight</h3>
                                    <div className="p-5 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                                        <p className="text-blue-900 dark:text-blue-200 font-bold leading-relaxed">
                                            <FormattedText text={data.metrics} />
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="mt-12 flex justify-end">
                                <button
                                    onClick={onClose}
                                    className="px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-black rounded-xl hover:bg-black dark:hover:bg-gray-100 transition-all hover:scale-105"
                                >
                                    Close
                                </button>
                            </div>
                        </div>

                        {/* Subtle accent line */}
                        <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 to-indigo-600" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

export { Prompt };
