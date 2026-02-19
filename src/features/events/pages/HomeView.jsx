import React from 'react';
import { Zap, Search, Loader2 } from 'lucide-react';
import logo from '../../../assets/gigsy-logo.png';

import { useNavigate } from 'react-router-dom';
import { useEvents } from '../../../hooks/useEvents';
import { CategoryFilter } from '../components/CategoryFilter';
import { EventCard } from '../components/EventCard';
import { useTranslation } from '../../layout/context/TranslationContext';
import { useFilter } from '../../layout/context/FilterContext';
import { useTheme } from '../../layout/context/ThemeContext'; // Import useTheme

export const HomeView = () => {
    const { translate, t, language, direction } = useTranslation();
    const { theme } = useTheme(); // Use theme
    const {
        searchQuery, setSearchQuery,
        selectedCategory, setSelectedCategory,
        selectedDateFilter,
        selectedLocationFilter
    } = useFilter();
    const navigate = useNavigate();
    const isDark = theme === 'dark';

    // NEW: Fetch events from API
    const { events: EVENTS_DATA, loading, error } = useEvents();

    const filteredEvents = EVENTS_DATA.filter(event => {
        // 1. Text Search
        const title = t(event, 'title').toLowerCase();
        const city = t(event, 'city').toLowerCase();
        const query = searchQuery.toLowerCase();
        const matchesSearch = title.includes(query) || city.includes(query);

        // 2. Category
        const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;

        // 3. Location Filter
        const matchesLocation = selectedLocationFilter === 'all' || event.region === selectedLocationFilter;

        // 4. Date Filter
        let matchesDate = true;
        if (selectedDateFilter !== 'all') {
            const eventDate = new Date(event.date);
            const today = new Date();

            if (selectedDateFilter === 'today') {
                matchesDate = eventDate.toDateString() === today.toDateString();
            } else if (selectedDateFilter === 'weekend') {
                const day = eventDate.getDay();
                matchesDate = day === 5 || day === 6;
            }
        }

        return matchesCategory && matchesSearch && matchesLocation && matchesDate;
    }).sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <div className="pb-24 animate-in fade-in duration-500">
            {/* Loading State */}
            {loading && (
                <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                        <Loader2 className="animate-spin h-12 w-12 text-indigo-500 mx-auto mb-4" />
                        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
                            {language === 'he' ? 'טוען אירועים...' : 'Loading events...'}
                        </p>
                    </div>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="flex items-center justify-center h-96">
                    <div className={`border rounded-xl p-6 max-w-md ${isDark ? 'bg-red-500/10 border-red-500/20' : 'bg-red-50 border-red-200'}`}>
                        <p className={`font-bold mb-2 ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                            {language === 'he' ? 'שגיאה בטעינת אירועים' : 'Error loading events'}
                        </p>
                        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>{error}</p>
                    </div>
                </div>
            )}

            {/* Success State (existing content) */}
            {!loading && !error && (
                <>
                    {/* Header Area */}
                    <div className={`
                        sticky top-0 z-10 pb-4 pt-4 px-4 rounded-b-2xl border-b transition-colors
                        ${isDark
                            ? 'bg-slate-900 border-indigo-900/50 shadow-lg'
                            : 'bg-white/80 border-stone-200 shadow-md backdrop-blur-md' // Brighter float
                        }
                    `}>
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 flex items-center justify-center">
                                    <img src={logo} alt="Gigsy Logo" className="w-7 h-7 object-contain copyright-protected-image" />
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <h1 className={`text-2xl font-black tracking-tight flex items-center gap-1 ${isDark ? 'text-white' : 'text-stone-900'}`}>
                                        gigsy<span className="text-indigo-500">.</span>
                                    </h1>
                                    <span className={`text-sm font-bold tracking-wide ${isDark ? 'text-slate-300' : 'text-stone-600'}`}>
                                        {language === 'he' ? 'כרטיסים בלי הדרמה' : 'Tickets without the drama'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Search Bar Restored under Headline */}
                        <div className="relative mb-4">
                            <input
                                type="text"
                                placeholder={translate('search_placeholder')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`
                            w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all border
                            ${isDark
                                        ? 'bg-slate-800/80 text-white placeholder-slate-500 border-slate-700'
                                        : 'bg-stone-50 text-stone-900 placeholder-stone-400 border-stone-200 shadow-sm'
                                    }
                            ${direction === 'rtl' ? 'pr-10' : 'pl-10'}
                        `}
                            />
                            <Search className={`
                                absolute top-3.5 w-5 h-5
                                ${isDark ? 'text-slate-500' : 'text-stone-400'}
                                ${direction === 'rtl' ? 'right-3' : 'left-3'}
                            `} />
                        </div>

                        <CategoryFilter selectedCategory={selectedCategory} onSelect={setSelectedCategory} />

                    </div>

                    {/* Event Grid */}
                    <div className="p-4 space-y-4">
                        <h2 className={`font-bold mb-2 text-lg ${isDark ? 'text-slate-200' : 'text-stone-900'}`}>
                            {searchQuery
                                ? (language === 'he' ? `תוצאות חיפוש (${filteredEvents.length})` : `Search Results (${filteredEvents.length})`)
                                : (language === 'he' ? 'אירועים חמים' : 'Hot Events')
                            }
                        </h2>

                        {filteredEvents.length === 0 ? (
                            <div className="text-center py-10 text-slate-500">
                                <p>{language === 'he' ? 'לא מצאנו כלום... נסה לשנות את הסינון.' : 'We found nothing... try changing sorting/filters.'}</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filteredEvents.map(event => (
                                    <EventCard
                                        key={event.id}
                                        event={event}
                                        onClick={() => navigate(`/event/${event.id}`)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
