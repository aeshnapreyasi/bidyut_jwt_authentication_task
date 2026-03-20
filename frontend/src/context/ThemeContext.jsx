import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // 1. Determine the initial theme
    const getInitialTheme = () => {
        const savedTheme = localStorage.getItem('app-theme');
        if (savedTheme) {
            return savedTheme; // Return user's saved preference
        }
        // Fallback to OS system preference
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
    };

    const [theme, setTheme] = useState(getInitialTheme);

    // 2. Apply the theme to the HTML document and save to localStorage whenever it changes
    useEffect(() => {
        document.documentElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem('app-theme', theme);
    }, [theme]);

    // 3. Toggle function
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};