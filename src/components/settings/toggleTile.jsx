export default function ToggleTile({ 
    icon: Icon, 
    title, 
    enabled, 
    onToggle, 
    enabledText = "Enabled", 
    disabledText = "Disabled",
    className = "" 
}) {
    return (
        <button
            type="button"
            onClick={onToggle}
            aria-pressed={enabled}
            className={`group relative p-3.5 sm:p-5 rounded-2xl border transition-all duration-200 flex flex-col items-center justify-center text-center cursor-pointer min-h-[105px] sm:min-h-[120px] ${
                enabled
                    ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-500/50 dark:border-blue-500/50 shadow-sm ring-1 ring-blue-500/25'
                    : 'bg-gray-50 dark:bg-gray-800/30 border-gray-100 dark:border-gray-800 hover:bg-gray-100/60 dark:hover:bg-gray-800/50 hover:border-gray-200 dark:hover:border-gray-700'
            } ${className}`}
        >
            <div
                className={`p-2.5 sm:p-3 rounded-2xl mb-2 transition-all duration-200 ${
                    enabled
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 scale-105'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-200 group-hover:scale-105'
                }`}
            >
                {Icon && <Icon className="w-5 h-5 sm:w-6 sm:h-6" />}
            </div>
            <p className={`text-xs sm:text-sm font-bold transition-colors line-clamp-1 ${
                enabled
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200'
            }`}>
                {title}
            </p>
            <p className="text-[10px] sm:text-[11px] text-gray-400 dark:text-gray-500 font-semibold mt-0.5">
                {enabled ? enabledText : disabledText}
            </p>
        </button>
    );
}

export { ToggleTile };

