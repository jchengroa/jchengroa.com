import React from 'react';

/**
 * ToggleTile Component for Admin Dashboard
 * Square/card toggle tile with top icon, centered title, dynamic active highlights, and status indicator.
 * Self-contained inside the admin application.
 */
export function ToggleTile({
    icon: Icon,
    title,
    subtitle,
    enabled = false,
    onToggle,
    disabled = false,
    activeColor = 'blue', // 'blue', 'emerald', 'amber', 'rose', 'indigo', 'purple'
    className = "",
    statusText,
    badge
}) {
    const colorStyles = {
        blue: {
            active: 'border-blue-600 dark:border-blue-500 bg-blue-50/80 dark:bg-blue-950/40 ring-2 ring-blue-500/25 text-blue-900 dark:text-blue-200',
            iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/30',
            badge: 'bg-blue-600 text-white',
            dot: 'bg-blue-500'
        },
        emerald: {
            active: 'border-emerald-600 dark:border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 ring-2 ring-emerald-500/25 text-emerald-950 dark:text-emerald-200',
            iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/30',
            badge: 'bg-emerald-600 text-white',
            dot: 'bg-emerald-500'
        },
        amber: {
            active: 'border-amber-500 dark:border-amber-400 bg-amber-50/80 dark:bg-amber-950/40 ring-2 ring-amber-500/25 text-amber-950 dark:text-amber-200',
            iconBg: 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md shadow-amber-500/30',
            badge: 'bg-amber-500 text-white',
            dot: 'bg-amber-500'
        },
        rose: {
            active: 'border-rose-600 dark:border-rose-500 bg-rose-50/80 dark:bg-rose-950/40 ring-2 ring-rose-500/25 text-rose-950 dark:text-rose-200',
            iconBg: 'bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-md shadow-rose-500/30',
            badge: 'bg-rose-600 text-white',
            dot: 'bg-rose-500'
        },
        indigo: {
            active: 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/80 dark:bg-indigo-950/40 ring-2 ring-indigo-500/25 text-indigo-950 dark:text-indigo-200',
            iconBg: 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/30',
            badge: 'bg-indigo-600 text-white',
            dot: 'bg-indigo-500'
        }
    }[activeColor] || {
        active: 'border-blue-600 dark:border-blue-500 bg-blue-50/80 dark:bg-blue-950/40 ring-2 ring-blue-500/25 text-blue-900 dark:text-blue-200',
        iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/30',
        badge: 'bg-blue-600 text-white',
        dot: 'bg-blue-500'
    };

    return (
        <button
            type="button"
            onClick={onToggle}
            disabled={disabled}
            className={`relative flex flex-col items-center justify-center p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl border-2 transition-all duration-200 cursor-pointer min-h-[115px] sm:min-h-[130px] w-full text-center group ${
                enabled
                    ? `${colorStyles.active} shadow-sm`
                    : 'border-gray-200/90 dark:border-gray-800 bg-white/70 dark:bg-gray-900/40 hover:border-gray-300 dark:hover:border-gray-700 text-gray-700 dark:text-gray-300'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        >
            {badge && (
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    {badge}
                </span>
            )}

            {Icon && (
                <div className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl transition-all duration-300 mb-2 sm:mb-2.5 flex items-center justify-center ${
                    enabled
                        ? colorStyles.iconBg
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-200 group-hover:scale-105'
                }`}>
                    <Icon size={22} strokeWidth={2.2} />
                </div>
            )}

            <span className="text-xs sm:text-sm font-black tracking-tight leading-tight line-clamp-1">
                {title}
            </span>

            {subtitle && (
                <span className="text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-400 font-medium mt-1 line-clamp-2 leading-tight">
                    {subtitle}
                </span>
            )}

            <div className="mt-2.5 flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    enabled ? colorStyles.dot : 'bg-gray-300 dark:bg-gray-700'
                }`} />
                <span className={`text-[9px] font-black uppercase tracking-wider ${
                    enabled ? 'opacity-100 font-extrabold' : 'text-gray-400 dark:text-gray-500 font-semibold'
                }`}>
                    {statusText || (enabled ? 'Active' : 'Select')}
                </span>
            </div>
        </button>
    );
}

export default ToggleTile;
