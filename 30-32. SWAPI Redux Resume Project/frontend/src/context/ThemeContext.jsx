import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a CustomThemeProvider');
    }
    return context;
};

export const CustomThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark';
    });

    useEffect(() => {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    const toggleTheme = () => {
        setIsDark(prev => !prev);
    };

    // Material-UI theme configuration
    const muiTheme = createTheme({
        palette: {
            mode: isDark ? 'dark' : 'light',
            primary: {
                main: isDark ? '#66b3ff' : '#1976d2',
            },
            secondary: {
                main: isDark ? '#ffa726' : '#f57c00',
            },
            background: {
                default: isDark ? '#121212' : '#f5f5f5',
                paper: isDark ? '#1e1e1e' : '#ffffff',
            },
            text: {
                primary: isDark ? '#ffffff' : '#000000',
                secondary: isDark ? '#aaaaaa' : '#666666',
            },
        },
        typography: {
            fontFamily: '"Roboto", "Arial", sans-serif',
            h1: {
                fontWeight: 700,
            },
            h2: {
                fontWeight: 600,
            },
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: 'none',
                        borderRadius: 8,
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: 12,
                    },
                },
            },
        },
    });

    const value = {
        isDark,
        toggleTheme,
        theme: isDark ? 'dark' : 'light',
    };

    return (
        <ThemeContext.Provider value={value}>
            <ThemeProvider theme={muiTheme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};