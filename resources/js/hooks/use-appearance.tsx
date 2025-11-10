import { useCallback, useEffect, useState } from 'react';

export type Appearance = 'light';

const prefersDark = () => {
    return false; // Always return false to force light mode
};

const setCookie = (name: string, value: string, days = 365) => {
    if (typeof document === 'undefined') {
        return;
    }

    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const applyTheme = (appearance: Appearance) => {
    // Always apply light theme
    document.documentElement.classList.remove('dark');
    document.documentElement.style.colorScheme = 'light';
};

const mediaQuery = () => {
    if (typeof window === 'undefined') {
        return null;
    }

    return window.matchMedia('(prefers-color-scheme: dark)');
};

const handleSystemThemeChange = () => {
    // Always use light mode
    const currentAppearance = 'light';
    applyTheme(currentAppearance);
};

export function initializeTheme() {
    // Always use light mode
    const savedAppearance = 'light';

    applyTheme(savedAppearance);

    // Remove event listener since we don't need it for light mode only
    // mediaQuery()?.addEventListener('change', handleSystemThemeChange);
}

export function useAppearance() {
    const [appearance, setAppearance] = useState<Appearance>('light');

    const updateAppearance = useCallback((mode: Appearance) => {
        // Always use light mode regardless of input
        const lightMode = 'light';
        setAppearance(lightMode);

        // Store in localStorage for client-side persistence...
        localStorage.setItem('appearance', lightMode);

        // Store in cookie for SSR...
        setCookie('appearance', lightMode);

        applyTheme(lightMode);
    }, []);

    useEffect(() => {
        // Always use light mode
        const lightMode = 'light';

        // eslint-disable-next-line react-hooks/set-state-in-effect
        updateAppearance(lightMode);

        // No need for event listener cleanup since we're not using it
        return () => {};
    }, [updateAppearance]);

    return { appearance, updateAppearance } as const;
}
