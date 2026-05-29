import { motion, AnimatePresence } from "framer-motion";
import { useSubheaderToggle } from "../utils/subheaderToggle.js";

function Title(props) {
    const { isVisible } = useSubheaderToggle();
    return (
        <header className={`mb-20 text-center ${props.className || ''}`}>
            {props.badge && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-block px-4 py-1.5 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-6"
                >
                    {props.badge}
                </motion.div>
            )}
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-6xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tighter mb-8"
            >
                {props.title}
            </motion.h1>
            <AnimatePresence>
                {isVisible && (props.subtitle || props.description) && (
                    <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-500 text-xl font-medium max-w-2xl mx-auto leading-relaxed overflow-hidden"
                    >
                        {props.subtitle || props.description}
                    </motion.p>
                )}
            </AnimatePresence>
        </header>
    );
}

/**
 * FormattedText Component
 * Replaces **text** with <strong>text</strong> for simple markdown-style bolding.
 * Supports [[blue:text]] for blue highlighted text.
 * Supports [[status:text]] for underlined status text.
 */
function FormattedText({ text }) {
    if (!text) return null;

    // Split text by ** or [[tag:text]] patterns
    const parts = text.split(/(\*\*.*?\*\*|\[\[blue:.*?\]\]|\[\[status:.*?\]\])/g);

    return (
        <span>
            {parts.map((part, i) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={i} className="font-black text-gray-900 dark:text-white">{part.slice(2, -2)}</strong>;
                }
                if (part.startsWith('[[blue:') && part.endsWith(']]')) {
                    return <span key={i} className="text-blue-600 dark:text-blue-400 font-black">{part.slice(7, -2)}</span>;
                }
                if (part.startsWith('[[status:') && part.endsWith(']]')) {
                    return <span key={i} className="font-bold underline decoration-blue-500 underline-offset-4 text-gray-900 dark:text-white">{part.slice(9, -2)}</span>;
                }
                return part;
            })}
        </span>
    );
}

function SubTitle(props) {
    return (
        <>
            <div className="p-2 text-center">
                <h2 className="text-2xl font-bold text-black dark:text-white">{props.title}</h2>
            </div>
            {/* Spacing */}
            <div className="mx-auto rounded-full mt-5 mb-5"></div>
        </>
    );
}

export { Title, SubTitle, FormattedText };
