
import React from 'react';
import { Ticket, MapPin, ChevronRight, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getDayName, formatDateDDMM } from '../../../core/utils/date.utils'; // Added format helper
import { useTranslation } from '../../layout/context/TranslationContext';

export const EventCard = ({ event, onClick }) => {
    const { t, direction } = useTranslation();
    const [imageError, setImageError] = React.useState(false);
    const ArrowIcon = direction === 'rtl' ? ChevronLeft : ChevronRight;

    return (
        <div
            onClick={onClick}
            className="flex flex-col bg-slate-800 rounded-2xl overflow-hidden shadow-md border border-slate-700/50 active:scale-95 transition-all cursor-pointer group hover:border-indigo-500/30 h-full"
        >
            {/* Top: Image Section */}
            <div className="relative h-44 shrink-0 overflow-hidden bg-slate-900">
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

                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90" />

                {/* Source Badge */}
                <div className="absolute top-3 right-3 bg-slate-950/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10 flex items-center gap-1">
                    <Ticket className="w-3 h-3 text-indigo-400" />
                    {event.source}
                </div>
            </div>

            {/* Middle: Content Section */}
            <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold leading-tight text-white mb-1 line-clamp-2">
                            {t(event, 'artist')} - {t(event, 'title')}
                        </h3>
                        <div className="flex items-center gap-1 text-slate-400 text-xs">
                            <MapPin className="w-3 h-3 shrink-0" />
                            <span className="truncate">{t(event, 'venue')}, {t(event, 'city')}</span>
                        </div>
                    </div>
                    {/* Date Block */}
                    <div className="bg-slate-700/50 p-2 rounded-lg text-center min-w-[50px] shrink-0 border border-slate-600/50">
                        {/* Day Name (Fri/Sat) */}
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">{getDayName(event.date)}</div>
                        {/* DD/MM Format */}
                        <div className="text-lg font-black text-white leading-none mt-1 tracking-tight">{formatDateDDMM(event.date)}</div>
                    </div>
                </div>

                {/* Footer: Price & Action Button (Pushed to bottom using mt-auto) */}
                <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-700/50">
                    <div className="flex flex-col">
                        <span className="text-slate-400 text-xs">{direction === 'rtl' ? 'מחיר' : 'Price'}</span>
                        <span className="text-lg font-bold text-white">₪{event.price}</span>
                    </div>

                    <Link
                        to={`/event/${event.id}`}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg transition-colors flex items-center gap-2"
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
