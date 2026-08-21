import { motion, AnimatePresence } from "framer-motion";
import { useSubheaderToggle } from "../utils/subheaderToggle.js";
import {
    titleBadgeVariants,
    titleContainerVariants,
    titleSubtitleVariants
} from "../animations/components.js";

function Title(props) {
    const { isVisible } = useSubheaderToggle();
    const Icon = props.icon;
    const isLeft = props.align === 'left';
    return (
        <header className={`${isLeft ? 'text-left' : 'text-center'} ${props.className ? props.className : 'mb-6 md:mb-10'}`}>
            {props.badge && (
                <motion.div
                    variants={titleBadgeVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="inline-block px-4 py-1.5 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-4"
                >
                    {props.badge}
                </motion.div>
            )}
            <motion.div
                variants={titleContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`flex items-center gap-3 md:gap-3.5 mb-2 md:mb-3.5 ${isLeft ? 'justify-start text-left' : 'justify-center text-center'}`}
            >
                {Icon && (
                    <div className="p-2 sm:p-2.5 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-100/50 dark:border-blue-900/40 shadow-sm shrink-0 flex items-center justify-center">
                        <Icon size={22} strokeWidth={2.5} className="sm:w-6 sm:h-6" />
                    </div>
                )}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white tracking-tighter leading-tight">
                    {props.title}
                </h1>
            </motion.div>
            <AnimatePresence>
                {isVisible && (props.subtitle || props.description) && (
                    <motion.p
                        variants={titleSubtitleVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className={`text-gray-500 dark:text-gray-400 text-xs sm:text-sm md:text-base font-medium max-w-2xl leading-relaxed overflow-hidden ${isLeft ? 'text-left mx-0' : 'text-center mx-auto'}`}
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
