
import React, { createContext, useContext, useState, useEffect } from 'react';

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
    const [language, setLanguage] = useState('he'); // 'he' or 'en'
    const [direction, setDirection] = useState('rtl'); // Derived from language, but keeping state available

    // Sync direction with language
    useEffect(() => {
        const newDir = language === 'he' ? 'rtl' : 'ltr';
        setDirection(newDir);
        document.documentElement.dir = newDir;
        document.documentElement.lang = language;
    }, [language]);

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'he' ? 'en' : 'he');
    };

    // Helper to get localized field from an object (e.g., event.title_he)
    const t = (obj, field) => {
        if (!obj) return '';
        return obj[`${field}_${language}`] || obj[field] || '';
    };

    // Simple string dictionary for static UI text
    const dictionary = {
        'he': {
            'search_placeholder': 'חפש אירועים, הופעות, אמנים...',
            'welcome': 'ברוכים הבאים',
            'dashboard': 'לוח בקרה',
            'music': 'מוזיקה',
            'sports': 'ספורט',
            'theater': 'תיאטרון',
            'family': 'משפחה',
            'standup': 'סטנדאפ',
            'all': 'הכל',
            'playground': 'מעבדת AI',
            'filters': 'סינונים',
            'date': 'תאריך',
            'location': 'מיקום'
        },
        'en': {
            'search_placeholder': 'Search events, concerts, artists...',
            'welcome': 'Welcome',
            'dashboard': 'Dashboard',
            'music': 'Music',
            'sports': 'Sports',
            'theater': 'Theater',
            'family': 'Family',
            'standup': 'Standup',
            'all': 'All',
            'playground': 'AI Playground',
            'filters': 'Filters',
            'date': 'Date',
            'location': 'Location'
        }
    };

    const translate = (key) => {
        return dictionary[language][key] || key;
    };

    return (
        <TranslationContext.Provider value={{
            language,
            direction,
            toggleLanguage,
            t, // Data helper
            translate // UI helper
        }}>
            {children}
        </TranslationContext.Provider>
    );
};

export const useTranslation = () => {
    const context = useContext(TranslationContext);
    if (!context) {
        throw new Error('useTranslation must be used within a TranslationProvider');
    }
    return context;
};
