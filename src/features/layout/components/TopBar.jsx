import React from 'react';
import { Menu } from 'lucide-react';
import { useLayout } from '../context/LayoutContext';
import { useTheme } from '../context/ThemeContext';

export const TopBar = () => {
    const { toggleMobileMenu } = useLayout();
    const { theme } = useTheme();

    return (
        <header className={`
        sticky top-0 z-40 h-20 backdrop-blur-md border-b flex items-center justify-between px-6 transition-all
        ${theme === 'dark' ? 'bg-slate-950/80 border-slate-800/50' : 'bg-white/80 border-stone-200'}
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

            {/* End: Actions (Empty for now, can be used for User Profile or Search later) */}
            <div className="flex items-center gap-3">
            </div>
        </header>
    );
};
