
import React from 'react';
import { Ticket, Music, Mic, Drama, Users } from 'lucide-react';
import { useTranslation } from '../../layout/context/TranslationContext';

export const CategoryFilter = ({ selectedCategory, onSelect }) => {
    const { translate } = useTranslation();

    const categories = [
        { id: 'all', icon: Ticket },
        { id: 'music', icon: Music },
        { id: 'standup', icon: Mic },
        { id: 'theater', icon: Drama },
        { id: 'family', icon: Users }, // Added Family to match Sidebar/Context
    ];

    return (
        <div className="flex gap-3 overflow-x-auto mt-4 pb-1 no-scrollbar scroll-smooth">
            {categories.map(cat => (
                <button
                    key={cat.id}
                    onClick={() => onSelect(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm transition-all font-medium border
                        ${selectedCategory === cat.id
                            ? 'bg-white text-slate-900 shadow-lg border-white'
                            : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700 hover:text-slate-200'
                        }`}
                >
                    <cat.icon className="w-4 h-4" />
                    <span>{translate(cat.id)}</span>
                </button>
            ))}
        </div>
    );
};
