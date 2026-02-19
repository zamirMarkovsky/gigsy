import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../../assets/gigsy-logo.png';

import { useLayout } from '../context/LayoutContext';
import { useTranslation } from '../context/TranslationContext';
import { useFilter } from '../context/FilterContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../../auth/context/AuthContext';
import { Home, Music, Mic, Drama, Grid, X, Calendar, MapPin, LogOut, Moon, Sun, Globe } from 'lucide-react';

export const Sidebar = () => {
    const { isMobileMenuOpen, closeMobileMenu } = useLayout();
    const { translate, direction, toggleLanguage, language } = useTranslation();
    const {
        selectedCategory, setSelectedCategory,
        selectedDateFilter, setSelectedDateFilter,
        selectedLocationFilter, setSelectedLocationFilter
    } = useFilter();
    const { theme, toggleTheme } = useTheme();
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const isDark = theme === 'dark';
    const sidebarBg = isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200';
    const headingColor = isDark ? 'text-slate-500' : 'text-stone-400';
    const activeItemBg = isDark ? 'bg-indigo-600/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600';
    const inactiveItemColor = isDark ? 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200' : 'text-stone-500 hover:bg-stone-50 hover:text-stone-800';
    const filterActiveBg = isDark ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-indigo-600 text-white border-indigo-600';
    const filterInactiveBg = isDark ? 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700' : 'bg-white text-stone-500 border-stone-200 hover:bg-stone-50';

    const categories = [
        { id: 'all', labelKey: 'dashboard', icon: Home },
        { id: 'music', labelKey: 'music', icon: Music },
        { id: 'theater', labelKey: 'theater', icon: Drama },
        { id: 'standup', labelKey: 'standup', icon: Mic },
        { id: 'sports', labelKey: 'sports', icon: Grid },
    ];

    const handleCategoryClick = (id) => {
        setSelectedCategory(id);
        closeMobileMenu();
        if (location.pathname !== '/') {
            navigate('/');
        }
    };

    const handleFilterClick = (type, value) => {
        if (type === 'date') {
            setSelectedDateFilter(prev => prev === value ? 'all' : value);
        } else if (type === 'location') {
            setSelectedLocationFilter(prev => prev === value ? 'all' : value);
        }
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={closeMobileMenu}
                />
            )}

            {/* Sidebar Container */}
            <aside className={`
        fixed top-0 bottom-0 z-50 w-72 border-e shadow-2xl transition-transform duration-300 ease-in-out
        lg:sticky lg:translate-x-0 lg:shadow-none flex flex-col h-screen
        ${sidebarBg}
        ${direction === 'rtl'
                    ? (isMobileMenuOpen ? 'translate-x-0 right-0' : 'translate-x-full right-0')
                    : (isMobileMenuOpen ? 'translate-x-0 left-0' : '-translate-x-full left-0')
                }
      `}>
                {/* Logo Area */}
                <div className={`flex items-center justify-between px-6 border-b shrink-0 py-3 ${isDark ? 'border-slate-800' : 'border-stone-200'}`}>
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="flex items-center justify-center">
                            <img src={logo} alt="Gigsy Logo" className="w-9 h-9 object-contain copyright-protected-image" />
                        </div>
                        <div className="flex flex-col leading-none">
                            <h1 className={`font-black tracking-tight leading-none flex items-center gap-0.5 ${isDark ? 'text-white' : 'text-stone-900'}`}
                                style={{ fontSize: '2.25rem', lineHeight: '2.25rem' }}>
                                gigsy<span className="text-indigo-500">.</span>
                            </h1>
                            <p className={`text-sm font-medium mt-0.5 ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
                                {language === 'he' ? 'כרטיסים בלי הדרמה' : 'Tickets without the drama'}
                            </p>
                        </div>
                    </div>
                    {/* Close Button (Mobile Only) */}
                    <button onClick={closeMobileMenu} className="lg:hidden text-slate-400 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Main Content — flex-col distributed, no scroll */}
                <div className="flex-1 flex flex-col justify-between min-h-0 px-4 py-4">

                    {/* Nav sections */}
                    <div className="space-y-5">
                        {/* Section 1: Discover */}
                        <div>
                            <h3 className={`text-xs font-bold uppercase tracking-wider mb-2 px-2 ${headingColor}`}>Discover</h3>
                            <nav className="space-y-0.5">
                                {categories.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = selectedCategory === item.id && location.pathname === '/';

                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => handleCategoryClick(item.id)}
                                            className={`
                            w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all font-medium text-sm text-start
                            ${isActive ? activeItemBg : inactiveItemColor}
                        `}
                                        >
                                            <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-500' : 'text-current'}`} />
                                            <span>{translate(item.labelKey)}</span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>

                        {/* Section 2: Filters */}
                        <div>
                            <h3 className={`text-xs font-bold uppercase tracking-wider mb-2 px-2 ${headingColor}`}>{translate('filters')}</h3>
                            <div className="space-y-3 px-2">
                                {/* Date Filter */}
                                <div>
                                    <div className={`flex items-center gap-2 text-xs mb-1.5 ${isDark ? 'text-slate-300' : 'text-stone-600'}`}>
                                        <Calendar className="w-3.5 h-3.5 opacity-70" />
                                        <span>{translate('date')}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {['today', 'weekend'].map(filter => (
                                            <button
                                                key={filter}
                                                onClick={() => handleFilterClick('date', filter)}
                                                className={`text-xs px-2 py-1 rounded-md transition-all border
                                        ${selectedDateFilter === filter ? filterActiveBg : filterInactiveBg}`}
                                            >
                                                {filter === 'today' ? 'Today' : 'Weekend'}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Location Filter */}
                                <div>
                                    <div className={`flex items-center gap-2 text-xs mb-1.5 ${isDark ? 'text-slate-300' : 'text-stone-600'}`}>
                                        <MapPin className="w-3.5 h-3.5 opacity-70" />
                                        <span>{translate('location')}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {['center', 'north', 'south'].map(filter => (
                                            <button
                                                key={filter}
                                                onClick={() => handleFilterClick('location', filter)}
                                                className={`text-xs px-2 py-1 rounded-md transition-all border capitalize
                                        ${selectedLocationFilter === filter ? filterActiveBg : filterInactiveBg}`}
                                            >
                                                {filter}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Actions — always visible at bottom */}
                    <div className={`pt-4 border-t space-y-1.5 ${isDark ? 'border-slate-800' : 'border-stone-200'}`}>

                        {/* Theme Toggle Switch */}
                        <div className={`flex items-center justify-between px-3 py-2 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-white border border-stone-200'}`}>
                            <div className="flex items-center gap-2">
                                {isDark ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
                                <span className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-stone-600'}`}>
                                    {language === 'he' ? (isDark ? 'מצב כהה' : 'מצב בהיר') : (isDark ? 'Dark Mode' : 'Light Mode')}
                                </span>
                            </div>
                            <button
                                onClick={toggleTheme}
                                className={`
                                    w-10 h-5 rounded-full relative transition-colors focus:outline-none ring-offset-2 focus:ring-2 ring-indigo-500
                                    ${isDark ? 'bg-indigo-600' : 'bg-slate-300'}
                                `}
                            >
                                <div className={`
                                    absolute top-1 w-3 h-3 rounded-full bg-white shadow-sm transition-transform duration-200
                                    ${isDark ? 'inset-inline-start-[22px]' : 'inset-inline-start-1'}
                                `} />
                            </button>
                        </div>

                        {/* Language Toggle */}
                        <button
                            onClick={toggleLanguage}
                            className={`
                                w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all
                                ${isDark
                                    ? 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                    : 'text-stone-600 hover:bg-white hover:text-indigo-600 hover:shadow-sm border border-transparent hover:border-stone-200'
                                }
                            `}
                        >
                            <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4" />
                                <span>{language === 'he' ? 'שפה / Language' : 'Language / שפה'}</span>
                            </div>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-stone-200 text-stone-600'}`}>
                                {language === 'he' ? 'עברית' : 'EN'}
                            </span>
                        </button>

                        {/* Logout Button */}
                        <button
                            onClick={() => {
                                logout();
                                closeMobileMenu();
                            }}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all font-medium text-sm ${isDark
                                ? 'text-red-400 hover:bg-red-500/10'
                                : 'text-red-600 hover:bg-red-50'
                                }`}
                        >
                            <LogOut className="w-4 h-4" />
                            <span>{direction === 'rtl' ? 'התנתק' : 'Logout'}</span>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};
