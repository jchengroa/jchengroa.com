import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchPocketBaseData } from '../utils/pocketbaseClient';
import DatabaseOfflineOverlay from '../components/offlineOverlay.jsx';

const DataContext = createContext(null);
const DB_CACHE_KEY = 'jchengroa_db_cache_v2';

function getInitialCachedData() {
    if (typeof window === 'undefined') return null;
    try {
        const cached = localStorage.getItem(DB_CACHE_KEY);
        if (cached) {
            const parsed = JSON.parse(cached);
            if (parsed && parsed.siteContent && Object.keys(parsed.siteContent).length > 0) {
                return {
                    projects: parsed.projects || [],
                    research: parsed.research || [],
                    recognition: parsed.recognition || [],
                    contacts: parsed.contacts || [],
                    socials: parsed.socials || [],
                    changelogs: parsed.changelogs || [],
                    siteContent: parsed.siteContent || {},
                    dbStatus: 'connected',
                    loading: false
                };
            }
        }
    } catch (e) {
        console.warn("Failed reading cached db data:", e);
    }
    return null;
}

export function DataProvider({ children }) {
    const [forceFallback, setForceFallbackState] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('forceFallback') === 'true';
        }
        return false;
    });
    
    const [retryCount, setRetryCount] = useState(0);

    const [data, setData] = useState(() => {
        const initial = getInitialCachedData();
        if (initial) return initial;
        return {
            projects: [],
            research: [],
            recognition: [],
            contacts: [],
            socials: [],
            changelogs: [],
            siteContent: {},
            dbStatus: 'connected',
            loading: true
        };
    });

    const toggleForceFallback = () => {
        const newVal = !forceFallback;
        localStorage.setItem('forceFallback', String(newVal));
        setForceFallbackState(newVal);
    };

    const triggerRetry = () => {
        setRetryCount(prev => prev + 1);
    };

    useEffect(() => {
        async function loadAllData() {
            // Only set loading to true if there is no data at all in memory
            setData(prev => {
                const hasExistingData = prev.siteContent && Object.keys(prev.siteContent).length > 0;
                return hasExistingData ? prev : { ...prev, loading: true };
            });

            if (forceFallback) {
                setData(prev => ({
                    ...prev,
                    dbStatus: 'forced_offline',
                    loading: false
                }));
                return;
            }

            try {
                const {
                    projects,
                    research,
                    recognition,
                    contacts,
                    socials,
                    changelogs,
                    siteContentRows
                } = await fetchPocketBaseData();

                const activeContacts = (contacts && contacts.length > 0) ? contacts : (socials || []);

                // Construct siteContent object from key-value rows
                let siteContentObj = {};
                if (siteContentRows && siteContentRows.length > 0) {
                    siteContentRows.forEach(row => {
                        siteContentObj[row.key] = row.value;
                    });
                }

                // CHECK REMOTE MASTER SWITCH (site_active)
                const rawSiteActive = siteContentObj.site_active;
                const siteActiveStr = String(rawSiteActive !== undefined ? rawSiteActive : true)
                    .replace(/^"+|"+$/g, '')
                    .toLowerCase()
                    .trim();
                const isDevOptionsEnabled = import.meta.env.VITE_SHOW_DEV_OPTIONS === 'true' || import.meta.env.VITE_SHOW_DEV_OPTIONS === true;

                if (siteActiveStr === 'false' || rawSiteActive === false) {
                    // Show classic Maintenance / Portfolio Offline screen
                    setData({
                        projects: [],
                        research: [],
                        recognition: [],
                        contacts: [],
                        socials: [],
                        changelogs: [],
                        siteContent: siteContentObj,
                        dbStatus: 'site_offline',
                        loading: false
                    });
                    return;
                }

                if (siteActiveStr === 'dev') {
                    // If VITE_SHOW_DEV_OPTIONS is false, show "Website Currently Being Updated" screen!
                    if (!isDevOptionsEnabled) {
                        setData({
                            projects: [],
                            research: [],
                            recognition: [],
                            contacts: [],
                            socials: [],
                            changelogs: [],
                            siteContent: siteContentObj,
                            dbStatus: 'site_updating',
                            loading: false
                        });
                        return;
                    }
                }

                const freshPayload = {
                    projects: projects || [],
                    research: research || [],
                    recognition: recognition || [],
                    contacts: activeContacts,
                    socials: activeContacts,
                    changelogs: changelogs || [],
                    siteContent: siteContentObj,
                    dbStatus: 'connected',
                    loading: false
                };

                setData(freshPayload);

                try {
                    localStorage.setItem(DB_CACHE_KEY, JSON.stringify(freshPayload));
                } catch (_) {}
            } catch (err) {
                console.error("Error loading database content:", err);
                // If we already have data in memory/cache, keep showing it smoothly without interrupting the user
                setData(prev => {
                    const hasData = prev.siteContent && Object.keys(prev.siteContent).length > 0;
                    return {
                        ...prev,
                        dbStatus: hasData ? prev.dbStatus : 'fallback',
                        loading: false
                    };
                });
            }
        }

        loadAllData();
    }, [forceFallback, retryCount]);

    const isOffline = data.dbStatus === 'fallback' || data.dbStatus === 'forced_offline';
    const isMaintenance = data.dbStatus === 'site_offline';
    const isUpdating = data.dbStatus === 'site_updating';

    return (
        <DataContext.Provider value={{ ...data, forceFallback, toggleForceFallback }}>
            {data.loading ? (
                // Render initial spinner while connecting
                <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-950 transition-colors duration-300">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : isUpdating ? (
                <DatabaseOfflineOverlay mode="updating" />
            ) : isMaintenance ? (
                <DatabaseOfflineOverlay mode="maintenance" />
            ) : isOffline ? (
                <DatabaseOfflineOverlay 
                    mode="offline"
                    onRetry={triggerRetry} 
                    forceFallback={forceFallback}
                    toggleForceFallback={toggleForceFallback}
                />
            ) : (
                children
            )}
        </DataContext.Provider>
    );
}

export function useData() {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
}
