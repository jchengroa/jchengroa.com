import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { supabase } from './adminSupabase.js';
import AdminLogin from './components/AdminLogin.jsx';

// Lazy-load all heavy dashboard tabs & modals ONLY when authenticated
const UserProfileModal = lazy(() => import('./components/UserProfileModal.jsx'));
const ConfirmModal = lazy(() => import('./components/ConfirmModal.jsx'));

const GeneralTab = lazy(() => import('./tabs/GeneralTab.jsx'));
const HomeTab = lazy(() => import('./tabs/HomeTab.jsx'));
const PagesTab = lazy(() => import('./tabs/PagesTab.jsx'));
const NavFooterTab = lazy(() => import('./tabs/NavFooterTab.jsx'));
const CommonTab = lazy(() => import('./tabs/CommonTab.jsx'));
const RawJsonTab = lazy(() => import('./tabs/RawJsonTab.jsx'));
const ProjectsAdminTab = lazy(() => import('./tabs/ProjectsAdminTab.jsx'));
const ResearchAdminTab = lazy(() => import('./tabs/ResearchAdminTab.jsx'));
const RecognitionAdminTab = lazy(() => import('./tabs/RecognitionAdminTab.jsx'));
const ContactsAdminTab = lazy(() => import('./tabs/ContactsAdminTab.jsx'));
const ChangelogsAdminTab = lazy(() => import('./tabs/ChangelogsAdminTab.jsx'));

const TOP_LEVEL_TABS = [
    { id: 'site_content', label: 'Site Content & Prompts', icon: '🌐' },
    { id: 'projects', label: 'Projects (Live Preview)', icon: '🚀' },
    { id: 'research', label: 'Research (Live Preview)', icon: '🔬' },
    { id: 'recognition', label: 'Recognition (Live Preview)', icon: '🏆' },
    { id: 'contacts', label: 'Contacts & Socials', icon: '📇' },
    { id: 'changelogs', label: 'Changelogs', icon: '📜' },
];

const PROMPT_SUB_TABS = [
    { id: 'general', label: 'Status & Theme', icon: '⚡' },
    { id: 'home', label: 'Home Page', icon: '🏠' },
    { id: 'pages', label: 'Page Headings', icon: '📄' },
    { id: 'navfooter', label: 'Nav & Footer', icon: '🧭' },
    { id: 'common', label: 'Dialogues & Microcopy', icon: '💬' },
    { id: 'raw', label: 'Raw JSON & SQL Setup', icon: '🧩' },
];

export default function AdminApp() {
    // Auth Session state
    const [session, setSession] = useState(null);
    const [authChecking, setAuthChecking] = useState(true);
    const [profileModalOpen, setProfileModalOpen] = useState(false);

    // Data Loading & Feedback state
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [notification, setNotification] = useState(null);

    // Database tables data
    const [allSiteContent, setAllSiteContent] = useState({});
    const [projectsList, setProjectsList] = useState([]);
    const [researchList, setResearchList] = useState([]);
    const [recognitionList, setRecognitionList] = useState([]);
    const [contactsList, setContactsList] = useState([]);
    const [socialsList, setSocialsList] = useState([]);
    const [changelogsList, setChangelogsList] = useState([]);

    // Tab Navigation
    const [mainTab, setMainTab] = useState('site_content');
    const [promptSubTab, setPromptSubTab] = useState('general');

    // Confirm Modal
    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        title: '',
        message: '',
        confirmText: 'Confirm',
        cancelText: 'Cancel',
        isDanger: false,
        onConfirm: () => {}
    });

    // Dark mode state
    const [adminDark, setAdminDark] = useState(() => {
        return document.documentElement.classList.contains('dark') || 
               localStorage.getItem('themeMode') === 'dark';
    });

    const toggleAdminDark = () => {
        const next = !adminDark;
        setAdminDark(next);
        if (next) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    };

    const showToast = (type, message) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 4500);
    };

    // 1. Check Supabase Auth State (Zero DB queries if unauthenticated)
    useEffect(() => {
        if (!supabase) {
            setAuthChecking(false);
            return;
        }

        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setAuthChecking(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setAuthChecking(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    // 2. Load all 7 tables from Supabase ONLY when authenticated
    const loadAllTables = useCallback(async () => {
        if (!session) return;
        setLoading(true);

        try {
            const [
                { data: siteContentRows, error: scErr },
                { data: pData },
                { data: rData },
                { data: recData },
                { data: cData },
                { data: sData },
                { data: clData }
            ] = await Promise.all([
                supabase.from('site_content').select('*'),
                supabase.from('projects').select('*').order('created_at', { ascending: false }),
                supabase.from('research').select('*').order('created_at', { ascending: false }),
                supabase.from('recognition').select('*').order('created_at', { ascending: false }),
                supabase.from('contacts').select('*').order('created_at', { ascending: false }),
                supabase.from('socials').select('*').order('created_at', { ascending: false }),
                supabase.from('changelogs').select('*').order('created_at', { ascending: false })
            ]);

            if (scErr) console.warn('site_content warning:', scErr.message);

            const map = {};
            (siteContentRows || []).forEach(row => { map[row.key] = row.value; });

            if (map.site_active === undefined) map.site_active = true;
            if (map.default_theme_mode === undefined) map.default_theme_mode = 'light';
            if (map.default_accent_color === undefined) map.default_accent_color = 'blue';
            if (map.custom_accent_hex === undefined) map.custom_accent_hex = '#2563eb';
            if (!map.home) map.home = {};
            if (!map.projects) map.projects = {};
            if (!map.research) map.research = {};
            if (!map.recognition) map.recognition = {};
            if (!map.contact) map.contact = {};
            if (!map.socials) map.socials = {};
            if (!map.legal) map.legal = {};
            if (!map.changelog) map.changelog = {};
            if (!map.navbar) map.navbar = { name: 'jchengroa', links: [] };
            if (!map.navigation_data) map.navigation_data = { subLinks: { more: [] } };
            if (!map.footer) map.footer = {};
            if (!map.common) map.common = {};

            setAllSiteContent(map);
            setProjectsList(pData || []);
            setResearchList(rData || []);
            setRecognitionList(recData || []);
            setContactsList(cData || []);
            setSocialsList(sData || []);
            setChangelogsList(clData || []);
        } catch (err) {
            console.error('Error fetching database:', err);
            showToast('error', `Failed to fetch data: ${err.message}`);
        } finally {
            setLoading(false);
        }
    }, [session]);

    useEffect(() => {
        if (session) {
            loadAllTables();
        }
    }, [session, loadAllTables]);

    // Sign out handler
    const handleSignOut = async () => {
        if (supabase) {
            await supabase.auth.signOut();
            setSession(null);
            setProfileModalOpen(false);
            showToast('info', 'Signed out successfully.');
        }
    };

    // Helpers for General Tab
    const rawSiteActive = allSiteContent.site_active;
    const siteActiveStr = String(rawSiteActive !== undefined ? rawSiteActive : true).replace(/^"+|"+$/g, '').toLowerCase().trim();
    const siteActiveStatus = (siteActiveStr === 'dev') ? 'dev' : (siteActiveStr === 'false' || rawSiteActive === false) ? 'offline' : 'active';

    const setSiteActiveStatus = (status) => {
        let val = true;
        if (status === 'dev') val = 'dev';
        else if (status === 'offline') val = false;
        setAllSiteContent(prev => ({ ...prev, site_active: val }));
    };

    // Save site_content
    const handleSaveSiteContent = async () => {
        if (!supabase) return;
        setSaving(true);
        try {
            const rows = Object.entries(allSiteContent).map(([key, value]) => ({ key, value }));
            const { error } = await supabase.from('site_content').upsert(rows, { onConflict: 'key' });
            if (error) throw error;
            showToast('success', 'site_content saved successfully to Supabase!');
        } catch (err) {
            showToast('error', `Save error: ${err.message}`);
        } finally {
            setSaving(false);
        }
    };

    // Projects CRUD
    const handleSaveProject = async (projectItem) => {
        setSaving(true);
        try {
            const { error } = await supabase.from('projects').upsert([projectItem], { onConflict: 'id' });
            if (error) throw error;
            showToast('success', `Project "${projectItem.title}" saved!`);
            loadAllTables();
        } catch (err) {
            showToast('error', `Project save error: ${err.message}`);
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteProject = (id) => {
        setConfirmModal({
            isOpen: true,
            title: 'Delete Project?',
            message: `Delete project ID: ${id}? This cannot be undone.`,
            confirmText: 'Delete Permanently',
            isDanger: true,
            onConfirm: async () => {
                setConfirmModal(prev => ({ ...prev, isOpen: false }));
                const { error } = await supabase.from('projects').delete().eq('id', id);
                if (error) showToast('error', `Delete error: ${error.message}`);
                else {
                    showToast('success', 'Project deleted.');
                    loadAllTables();
                }
            }
        });
    };

    // Research CRUD
    const handleSaveResearch = async (researchItem) => {
        setSaving(true);
        try {
            const { error } = await supabase.from('research').upsert([researchItem], { onConflict: 'id' });
            if (error) throw error;
            showToast('success', `Research "${researchItem.title}" saved!`);
            loadAllTables();
        } catch (err) {
            showToast('error', err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteResearch = (id) => {
        setConfirmModal({
            isOpen: true,
            title: 'Delete Research?',
            message: `Delete research ID: ${id}?`,
            confirmText: 'Delete',
            isDanger: true,
            onConfirm: async () => {
                setConfirmModal(prev => ({ ...prev, isOpen: false }));
                const { error } = await supabase.from('research').delete().eq('id', id);
                if (error) showToast('error', error.message);
                else {
                    showToast('success', 'Publication deleted.');
                    loadAllTables();
                }
            }
        });
    };

    // Recognition CRUD
    const handleSaveRecognition = async (recItem) => {
        setSaving(true);
        try {
            const { error } = await supabase.from('recognition').upsert([recItem], { onConflict: 'id' });
            if (error) throw error;
            showToast('success', `Recognition "${recItem.title}" saved!`);
            loadAllTables();
        } catch (err) {
            showToast('error', err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteRecognition = (id) => {
        setConfirmModal({
            isOpen: true,
            title: 'Delete Recognition?',
            message: `Delete recognition record ID: ${id}?`,
            confirmText: 'Delete',
            isDanger: true,
            onConfirm: async () => {
                setConfirmModal(prev => ({ ...prev, isOpen: false }));
                const { error } = await supabase.from('recognition').delete().eq('id', id);
                if (error) showToast('error', error.message);
                else {
                    showToast('success', 'Recognition deleted.');
                    loadAllTables();
                }
            }
        });
    };

    // Contacts & Socials CRUD
    const handleSaveContact = async (contactItem) => {
        setSaving(true);
        try {
            const { error } = await supabase.from('contacts').upsert([contactItem], { onConflict: 'id' });
            if (error) throw error;
            showToast('success', 'Contact saved!');
            loadAllTables();
        } catch (err) {
            showToast('error', err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteContact = async (id) => {
        const { error } = await supabase.from('contacts').delete().eq('id', id);
        if (error) showToast('error', error.message);
        else {
            showToast('success', 'Contact deleted.');
            loadAllTables();
        }
    };

    const handleSaveSocial = async (socialItem) => {
        setSaving(true);
        try {
            const { error } = await supabase.from('socials').upsert([socialItem], { onConflict: 'id' });
            if (error) throw error;
            showToast('success', 'Social profile saved!');
            loadAllTables();
        } catch (err) {
            showToast('error', err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteSocial = async (id) => {
        const { error } = await supabase.from('socials').delete().eq('id', id);
        if (error) showToast('error', error.message);
        else {
            showToast('success', 'Social deleted.');
            loadAllTables();
        }
    };

    // Changelogs CRUD
    const handleSaveChangelog = async (clItem) => {
        setSaving(true);
        try {
            const { error } = await supabase.from('changelogs').upsert([clItem], { onConflict: 'version' });
            if (error) throw error;
            showToast('success', `Changelog v${clItem.version} saved!`);
            loadAllTables();
        } catch (err) {
            showToast('error', err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteChangelog = async (version) => {
        const { error } = await supabase.from('changelogs').delete().eq('version', version);
        if (error) showToast('error', error.message);
        else {
            showToast('success', 'Changelog version deleted.');
            loadAllTables();
        }
    };

    // Show initial session loader
    if (authChecking) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-gray-950 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    // If unauthenticated, display ONLY the minimal AdminLogin component (zero admin bundles loaded)
    if (!session) {
        return <AdminLogin onLoginSuccess={(newSession) => setSession(newSession)} />;
    }

    const userMetadata = session?.user?.user_metadata || {};
    const adminDisplayName = userMetadata.display_name || userMetadata.full_name || session?.user?.email?.split('@')[0] || 'John Carlo Cheng Roa';
    const adminAvatar = userMetadata.avatar_url || '';
    const avatarInitial = adminDisplayName.charAt(0).toUpperCase() || 'J';

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col pb-24">
            <Suspense fallback={null}>
                {/* User Profile & Account Management Popup */}
                {profileModalOpen && (
                    <UserProfileModal
                        isOpen={profileModalOpen}
                        onClose={() => setProfileModalOpen(false)}
                        session={session}
                        onShowToast={showToast}
                        onSignOut={handleSignOut}
                        onUserUpdated={(updatedUser) => {
                            setSession(prev => ({ ...prev, user: updatedUser }));
                        }}
                    />
                )}

                {/* Confirmation Dialog */}
                {confirmModal.isOpen && (
                    <ConfirmModal
                        isOpen={confirmModal.isOpen}
                        title={confirmModal.title}
                        message={confirmModal.message}
                        confirmText={confirmModal.confirmText}
                        cancelText={confirmModal.cancelText}
                        isDanger={confirmModal.isDanger}
                        onConfirm={confirmModal.onConfirm}
                        onCancel={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                    />
                )}
            </Suspense>

            {/* Top Navigation Header */}
            <header className="sticky top-0 z-40 bg-white/85 dark:bg-gray-900/85 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
                    {/* Left: User Avatar Management Button & Display Name */}
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setProfileModalOpen(true)}
                            title="Click to edit Display Name, Avatar, and Profile settings"
                            className="group relative flex items-center gap-3 p-1 sm:pr-3.5 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-all text-left"
                        >
                            <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-indigo-600 border border-white dark:border-gray-700 shadow-sm flex items-center justify-center text-white font-black text-sm group-hover:scale-105 transition-transform flex-shrink-0">
                                {adminAvatar ? (
                                    <img
                                        src={adminAvatar}
                                        alt={adminDisplayName}
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.target.style.display = 'none'; }}
                                    />
                                ) : (
                                    avatarInitial
                                )}
                                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-gray-900" />
                            </div>

                            <div className="hidden sm:block">
                                <div className="flex items-center gap-1.5">
                                    <h1 className="font-extrabold text-sm tracking-tight text-gray-900 dark:text-white truncate max-w-[160px]">
                                        {adminDisplayName}
                                    </h1>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-blue-600 transition-colors"><path d="m6 9 6 6 6-6"/></svg>
                                </div>
                                <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400">
                                    jchengroa Admin
                                </p>
                            </div>
                        </button>
                    </div>

                    {/* Right: Theme Toggle & Sign Out */}
                    <div className="flex items-center gap-2 sm:gap-2.5">
                        <button
                            type="button"
                            onClick={toggleAdminDark}
                            title="Toggle Admin Theme"
                            className="p-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/60 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
                        >
                            {adminDark ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={handleSignOut}
                            title="Sign Out"
                            className="p-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                        </button>
                    </div>
                </div>

                {/* Primary Tabs */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-1 overflow-x-auto no-scrollbar border-t border-gray-100 dark:border-gray-800/80">
                    {TOP_LEVEL_TABS.map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setMainTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-3 text-xs font-black whitespace-nowrap border-b-2 transition-all ${
                                mainTab === tab.id
                                    ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-blue-50/40 dark:bg-blue-950/20'
                                    : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/40'
                            }`}
                        >
                            <span>{tab.icon}</span>
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Secondary Subtabs for site_content */}
                {mainTab === 'site_content' && (
                    <div className="bg-gray-50/70 dark:bg-gray-950/70 border-t border-gray-200/50 dark:border-gray-800/50">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-1 overflow-x-auto no-scrollbar py-1.5">
                            {PROMPT_SUB_TABS.map(sub => (
                                <button
                                    key={sub.id}
                                    type="button"
                                    onClick={() => setPromptSubTab(sub.id)}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                                        promptSubTab === sub.id
                                            ? 'bg-blue-600 text-white shadow-sm'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200/50 dark:hover:bg-gray-800/50'
                                    }`}
                                >
                                    <span className="mr-1.5">{sub.icon}</span>
                                    <span>{sub.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </header>

            {/* Notification Toast */}
            {notification && (
                <div className="fixed bottom-24 right-5 z-50 max-w-md animate-bounce-short">
                    <div className={`px-4 py-3 rounded-2xl shadow-2xl border flex items-center gap-3 backdrop-blur-md ${
                        notification.type === 'success'
                            ? 'bg-emerald-600 text-white border-emerald-400'
                            : notification.type === 'error'
                            ? 'bg-rose-600 text-white border-rose-500'
                            : 'bg-blue-600 text-white border-blue-500'
                    }`}>
                        <div className="text-xs sm:text-sm font-bold">
                            {notification.message}
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
                {loading ? (
                    <div className="py-24 flex flex-col items-center justify-center gap-4 text-center">
                        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-sm font-bold text-gray-500 dark:text-gray-400">
                            Connecting & Syncing all Supabase tables...
                        </p>
                    </div>
                ) : (
                    <Suspense fallback={
                        <div className="py-20 flex justify-center items-center">
                            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    }>
                        {/* TAB 1: SITE_CONTENT */}
                        {mainTab === 'site_content' && (
                            <div>
                                {promptSubTab === 'general' && (
                                    <GeneralTab
                                        siteActiveStatus={siteActiveStatus}
                                        setSiteActiveStatus={setSiteActiveStatus}
                                        defaultThemeMode={allSiteContent.default_theme_mode || 'light'}
                                        setDefaultThemeMode={(val) => setAllSiteContent(prev => ({ ...prev, default_theme_mode: val }))}
                                        defaultAccentColor={allSiteContent.default_accent_color || 'blue'}
                                        setDefaultAccentColor={(val) => setAllSiteContent(prev => ({ ...prev, default_accent_color: val }))}
                                        customAccentHex={allSiteContent.custom_accent_hex || '#2563eb'}
                                        setCustomAccentHex={(val) => setAllSiteContent(prev => ({ ...prev, custom_accent_hex: val }))}
                                    />
                                )}

                                {promptSubTab === 'home' && (
                                    <HomeTab
                                        homeData={allSiteContent.home || {}}
                                        onChangeHomeData={(updated) => setAllSiteContent({ ...allSiteContent, home: updated })}
                                    />
                                )}

                                {promptSubTab === 'pages' && (
                                    <PagesTab
                                        projectsData={allSiteContent.projects || {}}
                                        onChangeProjectsData={(updated) => setAllSiteContent({ ...allSiteContent, projects: updated })}
                                        researchData={allSiteContent.research || {}}
                                        onChangeResearchData={(updated) => setAllSiteContent({ ...allSiteContent, research: updated })}
                                        recognitionData={allSiteContent.recognition || {}}
                                        onChangeRecognitionData={(updated) => setAllSiteContent({ ...allSiteContent, recognition: updated })}
                                        contactData={allSiteContent.contact || {}}
                                        onChangeContactData={(updated) => setAllSiteContent({ ...allSiteContent, contact: updated })}
                                        socialsData={allSiteContent.socials || {}}
                                        onChangeSocialsData={(updated) => setAllSiteContent({ ...allSiteContent, socials: updated })}
                                        legalData={allSiteContent.legal || {}}
                                        onChangeLegalData={(updated) => setAllSiteContent({ ...allSiteContent, legal: updated })}
                                        changelogData={allSiteContent.changelog || {}}
                                        onChangeChangelogData={(updated) => setAllSiteContent({ ...allSiteContent, changelog: updated })}
                                    />
                                )}

                                {promptSubTab === 'navfooter' && (
                                    <NavFooterTab
                                        navbarData={allSiteContent.navbar || {}}
                                        onChangeNavbarData={(updated) => setAllSiteContent({ ...allSiteContent, navbar: updated })}
                                        navigationData={allSiteContent.navigation_data || {}}
                                        onChangeNavigationData={(updated) => setAllSiteContent({ ...allSiteContent, navigation_data: updated })}
                                        footerData={allSiteContent.footer || {}}
                                        onChangeFooterData={(updated) => setAllSiteContent({ ...allSiteContent, footer: updated })}
                                    />
                                )}

                                {promptSubTab === 'common' && (
                                    <CommonTab
                                        commonData={allSiteContent.common || {}}
                                        onChangeCommonData={(updated) => setAllSiteContent({ ...allSiteContent, common: updated })}
                                    />
                                )}

                                {promptSubTab === 'raw' && (
                                    <RawJsonTab
                                        allSiteContent={allSiteContent}
                                        onChangeAllSiteContent={setAllSiteContent}
                                        onShowToast={showToast}
                                    />
                                )}
                            </div>
                        )}

                        {/* TAB 2: PROJECTS (WITH LIVE PREVIEW) */}
                        {mainTab === 'projects' && (
                            <ProjectsAdminTab
                                projects={projectsList}
                                onSaveProject={handleSaveProject}
                                onDeleteProject={handleDeleteProject}
                            />
                        )}

                        {/* TAB 3: RESEARCH (WITH LIVE PREVIEW) */}
                        {mainTab === 'research' && (
                            <ResearchAdminTab
                                research={researchList}
                                onSaveResearch={handleSaveResearch}
                                onDeleteResearch={handleDeleteResearch}
                            />
                        )}

                        {/* TAB 4: RECOGNITION (WITH LIVE PREVIEW) */}
                        {mainTab === 'recognition' && (
                            <RecognitionAdminTab
                                recognition={recognitionList}
                                onSaveRecognition={handleSaveRecognition}
                                onDeleteRecognition={handleDeleteRecognition}
                            />
                        )}

                        {/* TAB 5: CONTACTS & SOCIALS */}
                        {mainTab === 'contacts' && (
                            <ContactsAdminTab
                                contacts={contactsList}
                                onSaveContact={handleSaveContact}
                                onDeleteContact={handleDeleteContact}
                                socials={socialsList}
                                onSaveSocial={handleSaveSocial}
                                onDeleteSocial={handleDeleteSocial}
                            />
                        )}

                        {/* TAB 6: CHANGELOGS */}
                        {mainTab === 'changelogs' && (
                            <ChangelogsAdminTab
                                changelogs={changelogsList}
                                onSaveChangelog={handleSaveChangelog}
                                onDeleteChangelog={handleDeleteChangelog}
                            />
                        )}
                    </Suspense>
                )}
            </main>

            {/* Bottom Floating Bar for site_content tab */}
            {mainTab === 'site_content' && (
                <div className="fixed bottom-0 inset-x-0 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 shadow-2xl py-3.5 px-4 sm:px-6">
                    <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Editing Site Content & Prompts</span>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3">
                            <button
                                type="button"
                                onClick={loadAllTables}
                                className="px-4 py-2.5 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors"
                            >
                                Reload DB
                            </button>
                            <button
                                type="button"
                                onClick={handleSaveSiteContent}
                                disabled={saving}
                                className="px-6 py-2.5 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25 transition-all disabled:opacity-50 flex items-center gap-2"
                            >
                                {saving && <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                                <span>{saving ? 'Saving...' : 'Save All Prompts to Supabase'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
