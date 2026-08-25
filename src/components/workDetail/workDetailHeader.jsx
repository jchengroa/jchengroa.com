import { Link } from "react-router-dom";

export default function WorkDetailHeader({ backLink, backLabel, title, subtitle }) {
    return (
        <header className="mb-8 sm:mb-10">
            <Link
                to={backLink}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-3 sm:mb-4 group"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
                {backLabel}
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-3 sm:mb-4 text-gray-900 dark:text-white leading-tight">
                {title}
            </h1>
            {subtitle && (
                <p className="text-base sm:text-lg md:text-xl font-bold text-blue-600 dark:text-blue-400 tracking-normal">
                    {subtitle}
                </p>
            )}
        </header>
    );
}

export { WorkDetailHeader };
