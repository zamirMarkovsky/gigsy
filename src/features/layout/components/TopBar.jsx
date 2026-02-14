
import React from 'react';
import { Menu, Sun, Moon, Globe } from 'lucide-react'; // Added Moon
import { useLayout } from '../context/LayoutContext';
import { useTranslation } from '../context/TranslationContext';
import { useFilter } from '../context/FilterContext';
import { useTheme } from '../context/ThemeContext';

export const TopBar = () => {
    const { toggleMobileMenu } = useLayout();
    const { translate, toggleLanguage, language } = useTranslation();
    const { theme, toggleTheme } = useTheme();

    return (
        <header className={`
        sticky top-0 z-40 h-20 backdrop-blur-md border-b flex items-center justify-between px-6 transition-all
        ${theme === 'dark' ? 'bg-slate-950/80 border-slate-800/50' : 'bg-[#F5F5F0]/80 border-stone-200'}
    `}>
            {/* Start: Mobile Menu Toggle */}
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleMobileMenu}
                    className={`lg:hidden p-2 -ms-2 rounded-lg transition-colors
            ${theme === 'dark' ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-stone-500 hover:text-stone-900 hover:bg-stone-200'}
          `}
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* End: Actions */}
            <div className="flex items-center gap-3">
                {/* Language Toggle */}
                <button
                    onClick={toggleLanguage}
                    className={`
            flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all text-xs font-bold
            ${theme === 'dark'
                            ? 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white hover:border-slate-500'
                            : 'bg-white border-stone-200 text-stone-600 hover:text-stone-900 hover:border-stone-400'
                        }
          `}
                >
                    <Globe className="w-3.5 h-3.5" />
                    <span>{language === 'he' ? 'EN' : 'עברית'}</span>
                </button>

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className={`p-2.5 rounded-full transition-colors
                ${theme === 'dark'
                            ? 'text-slate-400 hover:text-amber-400 hover:bg-slate-900'
                            : 'text-stone-500 hover:text-indigo-600 hover:bg-white'
                        }
            `}
                >
                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
            </div>
        </header>
    );
};
