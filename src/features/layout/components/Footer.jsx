import React from 'react';
import { useTranslation } from '../context/TranslationContext';
import { useTheme } from '../context/ThemeContext';

export const Footer = () => {
    const { language } = useTranslation();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <footer className={`
            py-8 px-4 mt-auto border-t transition-colors
            ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-stone-100 border-stone-200'}
        `}>
            <div className="max-w-6xl mx-auto">
                {/* Disclaimers */}
                <div className="space-y-2 text-center mb-6">
                    <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-stone-500'}`}>
                        {language === 'he'
                            ? 'Gigsy הינו אגרגטור עצמאי ואינו קשור לספקי כרטיסים כלשהם, אלא אם צוין במפורש.'
                            : 'Gigsy is an independent aggregator and is not affiliated with any ticket provider unless explicitly stated.'}
                    </p>
                    <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-stone-500'}`}>
                        {language === 'he'
                            ? 'כל זכויות היוצרים והסימנים המסחריים שייכים לבעליהם בהתאמה. התוכן משמש למטרות מידע בלבד.'
                            : 'All copyrights and trademarks belong to their respective owners. Content is used for informational purposes only.'}
                    </p>
                </div>

                {/* Links */}
                <div className="flex justify-center gap-6 mb-6">
                    <a
                        href="#"
                        className={`text-xs transition-colors ${isDark ? 'text-slate-400 hover:text-indigo-400' : 'text-stone-600 hover:text-indigo-600'}`}
                        onClick={(e) => e.preventDefault()}
                    >
                        {language === 'he' ? 'תנאי שימוש' : 'Terms of Service'}
                    </a>
                    <span className={`${isDark ? 'text-slate-700' : 'text-stone-300'}`}>|</span>
                    <a
                        href="#"
                        className={`text-xs transition-colors ${isDark ? 'text-slate-400 hover:text-indigo-400' : 'text-stone-600 hover:text-indigo-600'}`}
                        onClick={(e) => e.preventDefault()}
                    >
                        {language === 'he' ? 'מדיניות פרטיות' : 'Privacy Policy'}
                    </a>
                </div>

                {/* Copyright */}
                <p className={`text-center text-xs ${isDark ? 'text-slate-600' : 'text-stone-400'}`}>
                    © {new Date().getFullYear()} Gigsy • Tickets without the drama
                </p>
            </div>
        </footer>
    );
};
