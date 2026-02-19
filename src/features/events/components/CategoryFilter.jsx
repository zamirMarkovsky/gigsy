import React from 'react';
import { Ticket, Music, Mic, Drama, Grid } from 'lucide-react';
import { useTranslation } from '../../layout/context/TranslationContext';
import { useTheme } from '../../layout/context/ThemeContext';

export const CategoryFilter = ({ selectedCategory, onSelect }) => {
    const { translate } = useTranslation();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const categories = [
        { id: 'all', icon: Ticket },
        { id: 'music', icon: Music },
        { id: 'theater', icon: Drama },
        { id: 'standup', icon: Mic },
        { id: 'sports', icon: Grid },
    ];

    return (
        <div className="flex gap-3 overflow-x-auto mt-4 pb-1 no-scrollbar scroll-smooth">
            {categories.map(cat => (
                <button
                    key={cat.id}
                    onClick={() => onSelect(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm transition-all font-medium border
                        ${selectedCategory === cat.id
                            ? (isDark ? 'bg-white text-slate-900 shadow-lg border-white' : 'bg-indigo-600 text-white shadow-lg border-indigo-600')
                            : (isDark
                                ? 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700 hover:text-slate-200'
                                : 'bg-white text-stone-500 border-stone-200 hover:bg-stone-50 hover:text-stone-900 hover:border-stone-300'
                            )
                        }`}
                >
                    <cat.icon className="w-4 h-4" />
                    <span>{translate(cat.id)}</span>
                </button>
            ))}
        </div>
    );
};
