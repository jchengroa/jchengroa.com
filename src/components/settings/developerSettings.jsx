import { useData } from "../../context/dataContext.jsx";
import { ToggleSwitch } from "./toggleSwitch.jsx";

export default function DeveloperSettings({ onShowChangelog }) {
    const { dbStatus, forceFallback, toggleForceFallback } = useData();

    const handleShowCookieBanner = () => {
        localStorage.removeItem('jchengroa_analytics_consent');
        window.dispatchEvent(new CustomEvent('jchengroa_reset_consent'));
    };

    const getStatusDetails = () => {
        switch (dbStatus) {
            case 'connected':
                return {
                    label: 'Connected',
                    color: 'text-green-600 dark:text-green-400 bg-green-500/10 border-green-500/25',
                    dot: 'bg-green-500',
                    desc: 'Successfully connected to Supabase database. Content is live.'
                };
            case 'forced_offline':
                return {
                    label: 'Forced Offline',
                    color: 'text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/25',
                    dot: 'bg-blue-500',
                    desc: 'Database connection bypassed. Currently loading offline backup files.'
                };
            case 'fallback':
            default:
                return {
                    label: 'Fallback Mode',
                    color: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/25',
                    dot: 'bg-amber-500',
                    desc: 'Database query failed or timed out. Loaded local offline backup.'
                };
        }
    };

    const status = getStatusDetails();

    return (
        <div className="space-y-10">
            {/* Database & Fallback Controls */}
            <div>
                <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
                    Database Status
                </h3>
                <div className="space-y-4">
                    {/* Status Indicator */}
                    <div className="flex items-center gap-4 p-5 bg-gray-50 dark:bg-gray-800/30 rounded-3xl border border-gray-100 dark:border-gray-800">
                        <div className={`flex items-center justify-center p-2 rounded-xl border ${status.color} shrink-0`}>
                            <span className="relative flex h-3.5 w-3.5">
                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${status.dot} opacity-75`}></span>
                                <span className={`relative inline-flex rounded-full h-3.5 w-3.5 ${status.dot}`}></span>
                            </span>
                        </div>
                        <div className="text-left">
                            <p className="text-gray-900 dark:text-white font-bold text-sm">
                                Database Status: <span className="underline decoration-2">{status.label}</span>
                            </p>
                            <p className="text-gray-500 dark:text-gray-400 text-xs font-medium mt-0.5 leading-relaxed">
                                {status.desc}
                            </p>
                        </div>
                    </div>

                    {/* Force Fallback Toggle */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/30 rounded-2xl border border-gray-100 dark:border-gray-800">
                        <div className="flex-1 pr-4 text-left">
                            <p className="text-gray-900 dark:text-white font-bold text-sm">Force Offline Fallback</p>
                            <p className="text-gray-500 dark:text-gray-400 text-xs font-medium mt-0.5 leading-relaxed">
                                Disables database requests and loads local fallback files (ideal for offline development or testing).
                            </p>
                        </div>
                        <ToggleSwitch enabled={forceFallback} onChange={toggleForceFallback} label="Toggle Force Offline Fallback" />
                    </div>
                </div>
            </div>

            {/* Dev Tools Actions */}
            <div>
                <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
                    Dev Tools
                </h3>
                <div className="space-y-3">
                    <div className="p-5 bg-gray-50 dark:bg-gray-800/30 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                            <div className="flex-1">
                                <p className="text-gray-900 dark:text-white font-bold text-sm">Changelog Popup</p>
                                <p className="text-gray-500 dark:text-gray-400 text-xs font-medium mt-0.5">Force-show the update prompt regardless of version state.</p>
                            </div>
                            <button
                                type="button"
                                onClick={onShowChangelog}
                                className="shrink-0 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-black rounded-xl hover:bg-blue-600 dark:hover:bg-blue-600 dark:hover:text-white transition-all duration-200"
                            >
                                Show Popup
                            </button>
                        </div>
                    </div>

                    <div className="p-5 bg-gray-50 dark:bg-gray-800/30 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                            <div className="flex-1">
                                <p className="text-gray-900 dark:text-white font-bold text-sm">Analytics Notice</p>
                                <p className="text-gray-500 dark:text-gray-400 text-xs font-medium mt-0.5">Re-trigger the Vercel Analytics notice banner.</p>
                            </div>
                            <button
                                type="button"
                                onClick={handleShowCookieBanner}
                                className="shrink-0 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-black rounded-xl hover:bg-blue-600 dark:hover:bg-blue-600 dark:hover:text-white transition-all duration-200"
                            >
                                Show Banner
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { DeveloperSettings };
