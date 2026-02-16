
import React from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { Footer } from './components/Footer';
import { LayoutProvider } from './context/LayoutContext';
import { TranslationProvider, useTranslation } from './context/TranslationContext';
import { FilterProvider } from './context/FilterContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';

// Internal layout component to consume context
const LayoutContent = ({ children }) => {
    const { direction } = useTranslation();
    const { theme } = useTheme();

    // Theme Styles
    // Dark: bg-slate-950 text-slate-200
    // Light: bg-stone-50 text-stone-900
    const bgClass = theme === 'dark' ? 'bg-slate-950' : 'bg-[#F5F5F0]'; // Beige/Stone tint
    const textClass = theme === 'dark' ? 'text-slate-200' : 'text-stone-800';

    return (
        <div className={`flex min-h-screen transition-all font-sans ${bgClass} ${textClass}`} dir={direction}>

            {/* Sidebar (Responsive) */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 transition-all">
                <TopBar />

                <main className="flex-1 p-4 lg:p-6 overflow-y-auto w-full">
                    <div className="max-w-[1600px] mx-auto w-full">
                        {children}
                    </div>
                </main>

                {/* Footer - appears on all authenticated pages */}
                <Footer />
            </div>

        </div>
    );
};

export const MainLayout = ({ children }) => {
    return (
        <ThemeProvider>
            <TranslationProvider>
                <FilterProvider>
                    <LayoutProvider>
                        <LayoutContent>
                            {children}
                        </LayoutContent>
                    </LayoutProvider>
                </FilterProvider>
            </TranslationProvider>
        </ThemeProvider>
    );
};
