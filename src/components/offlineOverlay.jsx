import React from 'react';

export default function DatabaseOfflineOverlay({ onRetry, forceFallback, toggleForceFallback, mode = "offline" }) {
    const isUpdating = mode === "updating";
    const isMaintenance = mode === "maintenance";
    const isOffline = mode === "offline";

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-blue-50/90 dark:bg-gray-950/95 backdrop-blur-2xl transition-colors duration-500 isolate">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500/10 dark:bg-blue-600/15 blur-3xl pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-amber-500/10 dark:bg-amber-600/15 blur-3xl pointer-events-none animate-pulse delay-1000"></div>

            <div className="relative w-full max-w-lg p-8 md:p-12 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-100 dark:border-gray-800 rounded-[2.5rem] shadow-2xl text-center flex flex-col items-center overflow-hidden">
                {/* Subtle top highlight gradient */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${
                    isUpdating 
                        ? 'from-blue-500 via-indigo-500 to-purple-600' 
                        : isMaintenance 
                            ? 'from-amber-500 via-orange-500 to-amber-600' 
                            : 'from-red-500 via-rose-500 to-red-600'
                }`}></div>

                {/* Animated Status Icon */}
                <div className={`relative mb-8 flex items-center justify-center w-24 h-24 rounded-3xl border shadow-inner ${
                    isUpdating
                        ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-500 dark:text-blue-400 border-blue-200/50 dark:border-blue-900/40'
                        : isMaintenance 
                            ? 'bg-amber-50 dark:bg-amber-950/30 text-amber-500 dark:text-amber-400 border-amber-200/50 dark:border-amber-900/40' 
                            : 'bg-red-50 dark:bg-red-950/30 text-red-500 dark:text-red-400 border-red-200/50 dark:border-red-900/40'
                }`}>
                    <span className={`absolute inset-0 rounded-3xl border-2 ${
                        isUpdating ? 'border-blue-500/40' : isMaintenance ? 'border-amber-500/40' : 'border-red-500/40'
                    } animate-ping opacity-60`}></span>
                    
                    {isUpdating ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 animate-bounce">
                            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                        </svg>
                    ) : isMaintenance ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                            <ellipse cx="12" cy="5" rx="9" ry="3" />
                            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                            <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
                            <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                    )}
                </div>

                <span className={`text-[11px] font-black tracking-[0.25em] uppercase mb-3 block px-4 py-1.5 rounded-full border ${
                    isUpdating
                        ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
                        : isMaintenance 
                            ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' 
                            : 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20'
                }`}>
                    {isUpdating ? "Site Updating" : isMaintenance ? "Portfolio Offline" : "Connection Error"}
                </span>
                
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
                    {isUpdating ? "Website Currently Being Updated" : isMaintenance ? "Under Maintenance" : "Database Offline"}
                </h2>
                
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed mb-8 max-w-sm">
                    {isUpdating
                        ? "This portfolio website is currently undergoing active maintenance and site updates. Please check back shortly!"
                        : isMaintenance 
                            ? "This portfolio website is temporarily offline for maintenance. Please check back later!"
                            : forceFallback 
                                ? "You have intentionally forced the database offline in settings. Re-enable to restore live data."
                                : "We are currently unable to establish a secure connection to the live portfolio database. Please check your network or try again."
                    }
                </p>

                {isOffline && (
                    <div className="w-full flex flex-col items-center gap-3">
                        <button
                            onClick={onRetry}
                            className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-950 font-black rounded-2xl hover:bg-black dark:hover:bg-gray-100 transition-all hover:scale-[1.02] active:scale-98 shadow-xl shadow-gray-200 dark:shadow-none text-sm"
                        >
                            {forceFallback ? "Retry (Forced Mode)" : "Retry Connection"}
                        </button>

                        {forceFallback && (
                            <button
                                onClick={toggleForceFallback}
                                className="mt-1 text-xs font-bold text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 underline"
                            >
                                Disable Forced Offline Mode
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
