import { useEffect, useState } from "react";

const SUBHEADER_STORAGE_KEY = "jchengroa_subheader_visible";

export const useSubheaderToggle = () => {
    const [isVisible, setIsVisible] = useState(() => {
        return localStorage.getItem(SUBHEADER_STORAGE_KEY) !== "false";
    });

    const toggleSubheader = () => {
        const nextState = !isVisible;
        setIsVisible(nextState);
        localStorage.setItem(SUBHEADER_STORAGE_KEY, nextState.toString());
        window.dispatchEvent(new CustomEvent("subheaderToggle", { detail: nextState }));
    };

    useEffect(() => {
        const handleToggle = (e) => {
            setIsVisible(e.detail);
        };
        window.addEventListener("subheaderToggle", handleToggle);
        return () => window.removeEventListener("subheaderToggle", handleToggle);
    }, []);

    return { isVisible, toggleSubheader };
};
