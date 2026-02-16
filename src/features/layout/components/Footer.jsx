// src/features/layout/components/Footer.jsx
import React from 'react';
import { useTranslation } from '../context/TranslationContext';

export const Footer = () => {
    const { language } = useTranslation();

    return (
        <footer className="bg-slate-900 border-t border-slate-800 py-6 px-4 mt-auto">
            <div className="max-w-6xl mx-auto">
                {/* Disclaimers */}
                <div className="space-y-2 text-center mb-4">
                    <p className="text-xs text-slate-500">
                        {language === 'he'
                            ? 'Gigsy הינו אגרגטור עצמאי ואינו קשור לספקי כרטיסים כלשהם, אלא אם צוין במפורש.'
                            : 'Gigsy is an independent aggregator and is not affiliated with any ticket provider unless explicitly stated.'}
                    </p>
                    <p className="text-xs text-slate-500">
                        {language === 'he'
                            ? 'כל זכויות היוצרים והסימנים המסחריים שייכים לבעליהם בהתאמה. התוכן משמש למטרות מידע בלבד.'
                            : 'All copyrights and trademarks belong to their respective owners. Content is used for informational purposes only.'}
                    </p>
                </div>

                {/* Links */}
                <div className="flex justify-center gap-6 mb-4">
                    <a
                        href="#"
                        className="text-xs text-slate-400 hover:text-indigo-400 transition-colors"
                        onClick={(e) => e.preventDefault()}
                    >
                        {language === 'he' ? 'תנאי שימוש' : 'Terms of Service'}
                    </a>
                    <span className="text-slate-700">|</span>
                    <a
                        href="#"
                        className="text-xs text-slate-400 hover:text-indigo-400 transition-colors"
                        onClick={(e) => e.preventDefault()}
                    >
                        {language === 'he' ? 'מדיניות פרטיות' : 'Privacy Policy'}
                    </a>
                </div>

                {/* Copyright */}
                <p className="text-center text-xs text-slate-600">
                    © {new Date().getFullYear()} Gigsy • Tickets without the drama
                </p>
            </div>
        </footer>
    );
};
