import { useState, useEffect } from 'react';

const VIEW_STORAGE_KEY = 'jchengroa_view_preference';

export const useViewSwitcher = (defaultView = 'grid') => {
    const [view, setView] = useState(() => {
        return localStorage.getItem(VIEW_STORAGE_KEY) || defaultView;
    });

    const toggleView = () => {
        const nextView = view === 'grid' ? 'list' : 'grid';
        setView(nextView);
        localStorage.setItem(VIEW_STORAGE_KEY, nextView);
        window.dispatchEvent(new CustomEvent('viewChange', { detail: nextView }));
    };

    useEffect(() => {
        const handleViewChange = (e) => {
            setView(e.detail);
        };
        window.addEventListener('viewChange', handleViewChange);
        return () => window.removeEventListener('viewChange', handleViewChange);
    }, []);

    return { view, toggleView };
};
