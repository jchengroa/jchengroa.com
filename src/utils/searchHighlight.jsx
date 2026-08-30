import { useState, useEffect } from "react";
import { FormattedText } from "../components/typography.jsx";

export const SEARCH_HIGHLIGHT_STORAGE_KEY = 'jchengroa_search_highlight_enabled';

export function useSearchHighlight() {
    const [enabled, setEnabled] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem(SEARCH_HIGHLIGHT_STORAGE_KEY);
            if (saved !== null) return saved === 'true';
        }
        return true;
    });

    useEffect(() => {
        const handleSettingChange = (e) => {
            setEnabled(e.detail);
        };
        window.addEventListener('jchengroa_search_highlight_setting_changed', handleSettingChange);
        return () => {
            window.removeEventListener('jchengroa_search_highlight_setting_changed', handleSettingChange);
        };
    }, []);

    return enabled;
}

/**
 * HighlightText Component
 * Highlights searched words in the given text when search highlighting is enabled.
 * Uses an elegant golden/amber highlight with gentle rounded badges that adapt to light and dark themes.
 */
export function HighlightText({ text, query, className = "" }) {
    const highlightEnabled = useSearchHighlight();

    if (!text || typeof text !== 'string') return text || null;
    if (!query || !query.trim() || !highlightEnabled) {
        return <FormattedText text={text} />;
    }

    const trimmed = query.trim();
    // Split search query into non-empty tokens and escape regex characters
    const words = trimmed
        .split(/\s+/)
        .filter(w => w.length > 0)
        .map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

    if (words.length === 0) {
        return <FormattedText text={text} />;
    }

    // Match words case-insensitively
    const regex = new RegExp(`(${words.join('|')})`, 'gi');
    const parts = text.split(regex);

    return (
        <span className={className}>
            {parts.map((part, i) => {
                const isMatch = words.some(w => new RegExp(`^${w}$`, 'i').test(part));
                if (isMatch) {
                    return (
                        <mark
                            key={i}
                            className="bg-amber-200/90 dark:bg-amber-400/30 text-amber-950 dark:text-amber-100 font-black px-1.5 py-0.5 rounded-md shadow-xs ring-1 ring-amber-400/40 dark:ring-amber-400/30 transition-all duration-200 inline-block my-[-2px]"
                        >
                            {part}
                        </mark>
                    );
                }
                return <FormattedText key={i} text={part} />;
            })}
        </span>
    );
}

export default HighlightText;
