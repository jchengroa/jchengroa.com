import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import DatabaseOfflineOverlay from '../components/offlineOverlay.jsx';

const DataContext = createContext(null);

export function DataProvider({ children }) {
    const [forceFallback, setForceFallbackState] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('forceFallback') === 'true';
        }
        return false;
    });
    
    const [retryCount, setRetryCount] = useState(0);

    const [data, setData] = useState({
        projects: [],
        research: [],
        recognition: [],
        socials: [],
        changelogs: [],
        siteContent: {},
        dbStatus: 'connected',
        loading: true
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
            setData(prev => ({ ...prev, loading: true }));

            if (forceFallback) {
                setData(prev => ({
                    ...prev,
                    dbStatus: 'forced_offline',
                    loading: false
                }));
                return;
            }

            try {
                if (!supabase) {
                    throw new Error("Supabase credentials missing. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel settings.");
                }
                const [
                    { data: projects, error: projectsErr },
                    { data: research, error: researchErr },
                    { data: recognition, error: recognitionErr },
                    { data: socials, error: socialsErr },
                    { data: changelogs, error: changelogsErr },
                    { data: siteContentRows, error: siteContentErr }
                ] = await Promise.all([
                    supabase.from('projects').select('*').order('created_at', { ascending: true }),
                    supabase.from('research').select('*').order('created_at', { ascending: true }),
                    supabase.from('recognition').select('*').order('created_at', { ascending: true }),
                    supabase.from('socials').select('*').order('created_at', { ascending: true }),
                    supabase.from('changelogs').select('*').order('created_at', { ascending: true }),
                    supabase.from('site_content').select('*')
                ]);

                if (projectsErr || researchErr || recognitionErr || socialsErr || changelogsErr || siteContentErr) {
                    throw new Error("One or more database requests failed.");
                }

                // Construct siteContent object from key-value rows
                let siteContentObj = {};
                if (siteContentRows && siteContentRows.length > 0) {
                    siteContentRows.forEach(row => {
                        siteContentObj[row.key] = row.value;
                    });
                }

                // CHECK REMOTE MASTER SWITCH
                if (siteContentObj.site_active === false) {
                    setData({
                        projects: [],
                        research: [],
                        recognition: [],
                        socials: [],
                        changelogs: [],
                        siteContent: {},
                        dbStatus: 'site_offline',
                        loading: false
                    });
                    return;
                }

                setData({
                    projects: projects || [],
                    research: research || [],
                    recognition: recognition || [],
                    socials: socials || [],
                    changelogs: changelogs || [],
                    siteContent: siteContentObj,
                    dbStatus: 'connected',
                    loading: false
                });
            } catch (err) {
                console.error("Error loading database content:", err);
                setData(prev => ({
                    ...prev,
                    dbStatus: 'fallback',
                    loading: false
                }));
            }
        }

        loadAllData();
    }, [forceFallback, retryCount]);

    const isOffline = data.dbStatus === 'fallback' || data.dbStatus === 'forced_offline';
    const isMaintenance = data.dbStatus === 'site_offline';

    return (
        <DataContext.Provider value={{ ...data, forceFallback, toggleForceFallback }}>
            {data.loading ? (
                // Render initial spinner while connecting
                <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-950 transition-colors duration-300">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : isMaintenance ? (
                <DatabaseOfflineOverlay 
                    isMaintenance={true}
                />
            ) : isOffline ? (
                <DatabaseOfflineOverlay 
                    onRetry={triggerRetry} 
                    forceFallback={forceFallback}
                    toggleForceFallback={toggleForceFallback}
                    isMaintenance={false}
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
