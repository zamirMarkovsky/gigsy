
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLayout } from '../context/LayoutContext';
import { useTranslation } from '../context/TranslationContext';
import { useFilter } from '../context/FilterContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../../auth/context/AuthContext';
import { Home, Music, Mic, Drama, Users, Bot, X, Zap, Calendar, MapPin, Grid, LogOut } from 'lucide-react';

export const Sidebar = () => {
    const { isMobileMenuOpen, closeMobileMenu } = useLayout();
    const { translate, direction } = useTranslation();
    const {
        selectedCategory, setSelectedCategory,
        selectedDateFilter, setSelectedDateFilter,
        selectedLocationFilter, setSelectedLocationFilter
    } = useFilter();
    const { theme } = useTheme();
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
        { id: 'sports', labelKey: 'sports', icon: Grid },
        { id: 'theater', labelKey: 'theater', icon: Drama },
        { id: 'family', labelKey: 'family', icon: Users },
    ];

    const tools = [
        { id: 'playground', labelKey: 'playground', icon: Bot, path: '/playground' },
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

    const handleToolClick = (path) => {
        navigate(path);
        closeMobileMenu();
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
        lg:sticky lg:translate-x-0 lg:shadow-none flex flex-col
        ${sidebarBg}
        ${direction === 'rtl'
                    ? (isMobileMenuOpen ? 'translate-x-0 right-0' : 'translate-x-full right-0')
                    : (isMobileMenuOpen ? 'translate-x-0 left-0' : '-translate-x-full left-0')
                }
      `}>
                {/* Logo Area */}
                <div className={`h-20 flex items-center justify-between px-6 border-b shrink-0 ${isDark ? 'border-slate-800' : 'border-stone-200'}`}>
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <Zap className="w-5 h-5 text-white fill-white" />
                        </div>
                        <h1 className={`text-2xl font-black tracking-tight flex items-center gap-1 ${isDark ? 'text-white' : 'text-stone-900'}`}>
                            gigsy<span className="text-indigo-500">.</span>
                        </h1>
                    </div>
                    {/* Close Button (Mobile Only) */}
                    <button onClick={closeMobileMenu} className="lg:hidden text-slate-400 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8">

                    {/* Section 1: Discover */}
                    <div>
                        <h3 className={`text-xs font-bold uppercase tracking-wider mb-3 px-2 ${headingColor}`}>Discover</h3>
                        <nav className="space-y-1">
                            {categories.map((item) => {
                                const Icon = item.icon;
                                // Active logic: matches global category AND we are on home page
                                const isActive = selectedCategory === item.id && location.pathname === '/';

                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => handleCategoryClick(item.id)}
                                        className={`
                            w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all font-medium text-sm text-start
                            ${isActive ? activeItemBg : inactiveItemColor}
                        `}
                                    >
                                        <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-500' : 'text-current'}`} />
                                        <span>{translate(item.labelKey)}</span>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Section 2: Filters */}
                    <div>
                        <h3 className={`text-xs font-bold uppercase tracking-wider mb-3 px-2 ${headingColor}`}>{translate('filters')}</h3>
                        <div className="space-y-4 px-2">
                            {/* Date Filter */}
                            <div>
                                <div className={`flex items-center gap-2 text-sm mb-2 ${isDark ? 'text-slate-300' : 'text-stone-600'}`}>
                                    <Calendar className="w-4 h-4 opacity-70" />
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
                                <div className={`flex items-center gap-2 text-sm mb-2 ${isDark ? 'text-slate-300' : 'text-stone-600'}`}>
                                    <MapPin className="w-4 h-4 opacity-70" />
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

                    {/* Section 3: Tools */}
                    <div>
                        <h3 className={`text-xs font-bold uppercase tracking-wider mb-3 px-2 ${headingColor}`}>Tools</h3>
                        <nav className="space-y-1">
                            {tools.map((item) => {
                                const Icon = item.icon;
                                const isActive = location.pathname === item.path;

                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => handleToolClick(item.path)}
                                        className={`
                            w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all font-medium text-sm text-start
                            ${isActive
                                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                                                : inactiveItemColor
                                            }
                        `}
                                    >
                                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-indigo-400'}`} />
                                        <span>{translate(item.labelKey)}</span>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                </div>

                {/* Logout Button */}
                <div className={`p-4 border-t shrink-0 ${isDark ? 'border-slate-800' : 'border-stone-200'}`}>
                    <button
                        onClick={() => {
                            logout();
                            closeMobileMenu();
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${isDark
                                ? 'bg-red-600/10 text-red-400 hover:bg-red-600/20 border border-red-600/20'
                                : 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
                            }`}
                    >
                        <LogOut className="w-4 h-4" />
                        <span>{direction === 'rtl' ? 'התנתק' : 'Logout'}</span>
                    </button>
                </div>
            </aside>
        </>
    );
};
