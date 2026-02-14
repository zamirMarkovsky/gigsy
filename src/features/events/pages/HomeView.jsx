
import React, { useState } from 'react';
import { Search, Zap } from 'lucide-react';
import { EVENTS_DATA } from '../data/events.mock';
import { CategoryFilter } from '../components/CategoryFilter';
import { EventCard } from '../components/EventCard';

export const HomeView = ({ onEventClick }) => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredEvents = EVENTS_DATA.filter(event => {
        const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.city.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="pb-24 animate-in fade-in duration-500">
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
                    <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold border border-slate-700">א</div>
                </div>
                <div className="relative">
                    <input type="text" placeholder="מה בא לך לראות היום?" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-slate-800/80 text-white p-3 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-500 border border-slate-700 transition-all" />
                    <Search className="absolute left-3 top-3.5 text-slate-500 w-5 h-5" />
                </div>

                <CategoryFilter selectedCategory={selectedCategory} onSelect={setSelectedCategory} />

            </div>
            <div className="p-4 space-y-4">
                <h2 className="text-slate-200 font-bold mb-2 text-lg">{searchQuery ? `תוצאות חיפוש (${filteredEvents.length})` : 'הופעות חמות ב-Gigsy'}</h2>
                {filteredEvents.length === 0 ? (
                    <div className="text-center py-10 text-slate-500"><p>לא מצאנו כלום... אולי נסה לחפש משהו אחר?</p></div>
                ) : (
                    filteredEvents.map(event => (
                        <EventCard key={event.id} event={event} onClick={() => onEventClick(event)} />
                    ))
                )}
            </div>
        </div>
    );
};
