
import React from 'react';
import { Ticket, Music, Mic, Drama } from 'lucide-react';
import { CATEGORIES } from '../data/events.mock';

export const CategoryFilter = ({ selectedCategory, onSelect }) => {
    return (
        <div className="flex gap-3 overflow-x-auto mt-4 pb-1 no-scrollbar scroll-smooth">
            {CATEGORIES.map(cat => (
                <button key={cat.id} onClick={() => onSelect(cat.id)} className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm transition-all font-medium ${selectedCategory === cat.id ? 'bg-white text-slate-900 shadow-lg' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>
                    {cat.id === 'all' && <Ticket className="w-4 h-4" />}
                    {cat.id === 'music' && <Music className="w-4 h-4" />}
                    {cat.id === 'standup' && <Mic className="w-4 h-4" />}
                    {cat.id === 'theater' && <Drama className="w-4 h-4" />}
                    {cat.label}
                </button>
            ))}
        </div>
    );
};
