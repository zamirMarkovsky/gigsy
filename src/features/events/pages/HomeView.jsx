
import React from 'react';
import { Zap, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// Old hardcoded import (preserved per "Surgeon Rule"):
// import { events as EVENTS_DATA } from '../data/events.mock';
import { useEvents } from '../../../hooks/useEvents';
import { CategoryFilter } from '../components/CategoryFilter';
import { EventCard } from '../components/EventCard';
import { useTranslation } from '../../layout/context/TranslationContext';
import { useFilter } from '../../layout/context/FilterContext';

export const HomeView = () => {
    const { translate, t, language, direction } = useTranslation();
    const {
        searchQuery, setSearchQuery, // Re-enabled search in HomeView
        selectedCategory, setSelectedCategory,
        selectedDateFilter,
        selectedLocationFilter
    } = useFilter();
    const navigate = useNavigate();

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
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
                        <p className="text-slate-400">{language === 'he' ? 'טוען אירועים...' : 'Loading events...'}</p>
                    </div>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="flex items-center justify-center h-96">
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 max-w-md">
                        <p className="text-red-400 font-bold mb-2">{language === 'he' ? 'שגיאה בטעינת אירועים' : 'Error loading events'}</p>
                        <p className="text-slate-400 text-sm">{error}</p>
                    </div>
                </div>
            )}

            {/* Success State (existing content) */}
            {!loading && !error && (
                <>
                    {/* Header Area */}
                    <div className="bg-slate-900 sticky top-0 z-10 pb-4 pt-4 px-4 shadow-lg rounded-b-2xl border-b border-indigo-900/50">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                    <Zap className="w-5 h-5 text-white fill-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-1">
                                        gigsy<span className="text-indigo-500">.</span>
                                    </h1>
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
                            w-full bg-slate-800/80 text-white p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-500 border border-slate-700 transition-all
                            ${direction === 'rtl' ? 'pr-10' : 'pl-10'}
                        `}
                            />
                            <Search className={`absolute top-3.5 text-slate-500 w-5 h-5 ${direction === 'rtl' ? 'right-3' : 'left-3'}`} />
                        </div>

                        <CategoryFilter selectedCategory={selectedCategory} onSelect={setSelectedCategory} />

                    </div>

                    {/* Event Grid */}
                    <div className="p-4 space-y-4">
                        <h2 className="text-slate-200 font-bold mb-2 text-lg">
                            {searchQuery
                                ? (language === 'he' ? `תוצאות חיפוש (${filteredEvents.length})` : `Search Results (${filteredEvents.length})`)
                                : (language === 'he' ? 'הופעות חמות ב-Gigsy' : 'Hot Events in Gigsy')
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
