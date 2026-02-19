import React from 'react';
import { MapPin, ChevronRight, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getDayName, formatDateDDMM } from '../../../core/utils/date.utils';
import { useTranslation } from '../../layout/context/TranslationContext';
import { useTheme } from '../../layout/context/ThemeContext';

export const EventCard = ({ event, onClick }) => {
    const { t, direction } = useTranslation();
    const { theme } = useTheme();
    const [imageError, setImageError] = React.useState(false);
    const ArrowIcon = direction === 'rtl' ? ChevronLeft : ChevronRight;
    const isDark = theme === 'dark';

    // Badge Positioning: LTR -> Top Left, RTL -> Top Right
    // In Tailwind, 'start-3' positions based on direction (RTL=Right, LTR=Left).
    // User requested: "if RTL display top right... move to other side if LTR".
    // "start-3" does exactly that:
    // RTL: start = Right. Correct.
    // LTR: start = Left. Correct.
    const badgePositionClass = "top-3 start-3";

    return (
        <div
            onClick={onClick}
            className={`
                flex flex-col rounded-2xl overflow-hidden shadow-lg border transition-all cursor-pointer group h-full active:scale-95
                ${isDark
                    ? 'bg-slate-800 border-slate-700/50 hover:border-indigo-500/30'
                    : 'bg-white border-stone-200 hover:border-indigo-400 hover:shadow-xl'
                }
            `}
        >
            {/* Top: Image Section */}
            <div className={`relative h-44 shrink-0 overflow-hidden ${isDark ? 'bg-slate-900' : 'bg-stone-100'}`}>
                {!imageError ? (
                    <img
                        src={event.image}
                        alt={t(event, 'title')}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600">
                        <span className="text-sm font-bold opacity-50">No Image Found</span>
                    </div>
                )}

                <div className={`absolute inset-0 bg-gradient-to-t opacity-90 ${isDark ? 'from-slate-900 via-transparent' : 'from-black/20 via-transparent'}`} />

                {/* Source Badge - Text Only, Dynamic Position */}
                <div className={`
                    absolute ${badgePositionClass} px-3 py-1.5 rounded-full backdrop-blur-md shadow-sm border
                    flex items-center gap-1.5 transition-all
                    ${isDark
                        ? 'bg-slate-900/90 border-slate-700 text-indigo-300'
                        : 'bg-white/95 border-stone-200 text-indigo-600 shadow-md'
                    }
                `}>
                    <span className="text-sm font-bold tracking-wide whitespace-nowrap">{event.source}</span>
                </div>
            </div>

            {/* Middle: Content Section */}
            <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                        <h3 className={`text-xl font-bold leading-tight mb-1 line-clamp-2 ${isDark ? 'text-white' : 'text-stone-900'}`}>
                            {t(event, 'artist')} - {t(event, 'title')}
                        </h3>
                        <div className={`flex items-center gap-1 text-xs ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
                            <MapPin className="w-3 h-3 shrink-0" />
                            <span className="truncate">{t(event, 'venue')}, {t(event, 'city')}</span>
                        </div>
                    </div>
                    {/* Date Block */}
                    <div className={`
                        p-2 rounded-lg text-center min-w-[50px] shrink-0 border
                        ${isDark
                            ? 'bg-slate-700/50 border-slate-600/50'
                            : 'bg-stone-100 border-stone-200'
                        }
                    `}>
                        {/* Day Name (Fri/Sat) */}
                        <div className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-indigo-600'}`}>
                            {getDayName(event.date)}
                        </div>
                        {/* DD/MM Format */}
                        <div className={`text-lg font-black leading-none mt-1 tracking-tight ${isDark ? 'text-white' : 'text-stone-900'}`}>
                            {formatDateDDMM(event.date)}
                        </div>
                    </div>
                </div>

                {/* Footer: Price & Action Button */}
                <div className={`mt-auto pt-4 flex items-center justify-between border-t ${isDark ? 'border-slate-700/50' : 'border-stone-100'}`}>
                    <div className="flex flex-col">
                        <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
                            {direction === 'rtl' ? 'מחיר' : 'Price'}
                        </span>
                        <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                            ₪{event.price}
                        </span>
                    </div>

                    <Link
                        to={`/event/${event.id}`}
                        className={`
                            px-4 py-2 rounded-lg text-sm font-bold shadow-lg transition-all flex items-center gap-2
                            ${isDark
                                ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
                            }
                        `}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {direction === 'rtl' ? 'כרטיסים' : 'Tickets'}
                        <ArrowIcon className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
};
