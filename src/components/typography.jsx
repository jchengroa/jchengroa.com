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

    // Section specific fixed color mappings: 'projects' (blue), 'research' (indigo), 'recognition'/'awards' (amber)
    const colorTheme = props.colorTheme || (
        props.title?.toLowerCase().includes("project") ? "projects" :
        props.title?.toLowerCase().includes("research") ? "research" :
        (props.title?.toLowerCase().includes("recognition") || props.title?.toLowerCase().includes("award")) ? "recognition" :
        "default"
    );

    const themeStyles = {
        projects: {
            iconBg: "bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/20 dark:border-blue-500/30",
            badge: "bg-blue-500/10 dark:bg-blue-500/20 border-blue-500/20 dark:border-blue-500/30 text-blue-600 dark:text-blue-400",
            highlightText: "text-blue-600 dark:text-blue-400"
        },
        research: {
            iconBg: "bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border-indigo-500/20 dark:border-indigo-500/30",
            badge: "bg-indigo-500/10 dark:bg-indigo-500/20 border-indigo-500/20 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400",
            highlightText: "text-indigo-600 dark:text-indigo-400"
        },
        recognition: {
            iconBg: "bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/20 dark:border-amber-500/30",
            badge: "bg-amber-500/10 dark:bg-amber-500/20 border-amber-500/20 dark:border-amber-500/30 text-amber-600 dark:text-amber-400",
            highlightText: "text-amber-600 dark:text-amber-400"
        },
        default: {
            iconBg: "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border-blue-100/50 dark:border-blue-900/40",
            badge: "bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900/30 text-blue-600 dark:text-blue-400",
            highlightText: "text-blue-600 dark:text-blue-400"
        }
    }[colorTheme] || {
        iconBg: "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border-blue-100/50 dark:border-blue-900/40",
        badge: "bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900/30 text-blue-600 dark:text-blue-400",
        highlightText: "text-blue-600 dark:text-blue-400"
    };

    return (
        <header className={`${isLeft ? 'text-left' : 'text-center'} ${props.className ? props.className : 'mb-4 sm:mb-6 md:mb-8'}`}>
            {props.badge && (
                <motion.div
                    variants={titleBadgeVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className={`inline-block px-3.5 py-1 border rounded-full text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] mb-2 sm:mb-3 ${themeStyles.badge}`}
                >
                    {props.badge}
                </motion.div>
            )}
            <motion.div
                variants={titleContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`flex items-center gap-2.5 sm:gap-3 mb-1.5 sm:mb-2.5 ${isLeft ? 'justify-start text-left' : 'justify-center text-center'}`}
            >
                {Icon && (
                    <div className={`p-1.5 sm:p-2 rounded-xl sm:rounded-2xl border shadow-sm shrink-0 flex items-center justify-center ${props.iconClassName ? props.iconClassName : themeStyles.iconBg}`}>
                        <Icon size={20} strokeWidth={2.5} className="sm:w-5 sm:h-5" />
                    </div>
                )}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
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
                        className={`text-gray-500 dark:text-gray-400 text-xs sm:text-sm md:text-base font-normal max-w-2xl leading-relaxed overflow-hidden ${isLeft ? 'text-left mx-0' : 'text-center mx-auto'}`}
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
