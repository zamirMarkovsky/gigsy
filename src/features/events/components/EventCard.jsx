
import React from 'react';
import { Ticket, MapPin, ChevronRight } from 'lucide-react';
import { getDayName } from '../../../core/utils/date.utils';

export const EventCard = ({ event, onClick }) => {
    return (
        <div onClick={onClick} className="bg-slate-800 rounded-2xl overflow-hidden shadow-md border border-slate-700/50 active:scale-95 transition-all cursor-pointer group hover:border-indigo-500/30">
            <div className="relative h-44 overflow-hidden">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90" />
                <div className="absolute top-3 right-3 bg-slate-950/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10 flex items-center gap-1"><Ticket className="w-3 h-3 text-indigo-400" />{event.source}</div>
                <div className="absolute bottom-3 right-3 text-white">
                    <h3 className="text-xl font-bold leading-tight shadow-sm">{event.title}</h3>
                    <div className="flex items-center gap-1 text-slate-300 text-xs mt-1"><MapPin className="w-3 h-3" />{event.venue}, {event.city}</div>
                </div>
                <div className="absolute bottom-3 left-3 bg-indigo-600 px-3 py-1.5 rounded-lg text-sm font-bold text-white shadow-lg">₪{event.price}</div>
            </div>
            <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-slate-700/50 p-2 rounded-lg text-center min-w-[50px]">
                        <div className="text-xs text-slate-400 font-medium">{getDayName(event.date)}</div>
                        <div className="text-lg font-bold text-white leading-none mt-0.5">{new Date(event.date).getDate()}</div>
                    </div>
                    <div className="h-8 w-px bg-slate-700"></div>
                    <div className="flex flex-col"><span className="text-slate-400 text-xs">שעה</span><span className="text-white font-medium">{event.time}</span></div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center group-hover:bg-indigo-600 transition-colors"><ChevronRight className="w-5 h-5 text-white" /></div>
            </div>
        </div>
    );
};
