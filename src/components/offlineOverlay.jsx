import React from 'react';

export default function DatabaseOfflineOverlay({ onRetry, forceFallback, toggleForceFallback, isMaintenance }) {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-blue-50/80 dark:bg-gray-950/90 backdrop-blur-xl transition-colors duration-300 isolate">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-red-500/10 dark:bg-red-600/15 blur-3xl pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-orange-500/10 dark:bg-orange-600/15 blur-3xl pointer-events-none animate-pulse delay-1000"></div>

            <div className="relative w-full max-w-md p-8 md:p-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-100 dark:border-gray-800 rounded-[2.5rem] shadow-2xl text-center flex flex-col items-center">
                {/* Pulsing Disconnected Database Icon */}
                <div className={`relative mb-8 flex items-center justify-center w-20 h-20 rounded-3xl border ${isMaintenance ? 'bg-amber-50 dark:bg-amber-950/30 text-amber-500 dark:text-amber-400 border-amber-100 dark:border-amber-900/30' : 'bg-red-50 dark:bg-red-950/30 text-red-500 dark:text-red-400 border-red-100 dark:border-red-900/30'}`}>
                    <span className={`absolute inset-0 rounded-3xl border-2 ${isMaintenance ? 'border-amber-500/50' : 'border-red-500/50'} animate-ping opacity-75`}></span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                        {isMaintenance ? (
                            <>
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </>
                        ) : (
                            <>
                                <ellipse cx="12" cy="5" rx="9" ry="3" />
                                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                                <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
                                <line x1="1" y1="1" x2="23" y2="23" />
                            </>
                        )}
                    </svg>
                </div>

                <span className={`text-[10px] font-black tracking-[0.25em] uppercase mb-3 block ${isMaintenance ? 'text-amber-500 dark:text-amber-400' : 'text-red-500 dark:text-red-400'}`}>
                    {isMaintenance ? "Portfolio Offline" : "Connection Error"}
                </span>
                
                <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter mb-4">
                    {isMaintenance ? "Under Maintenance" : "Database Offline"}
                </h2>
                
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed mb-8 max-w-xs">
                    {isMaintenance 
                        ? "This portfolio website is temporarily offline for maintenance. Please check back later!"
                        : forceFallback 
                            ? "You have intentionally forced the database offline in settings. Re-enable to restore live data."
                            : "We are currently unable to establish a secure connection to the live portfolio database. Please check your network or try again."
                    }
                </p>

                {!isMaintenance && (
                    <div className="w-full flex flex-col items-center gap-3">
                        <button
                            onClick={onRetry}
                            className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-950 font-black rounded-2xl hover:bg-black dark:hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-gray-200 dark:shadow-none"
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
