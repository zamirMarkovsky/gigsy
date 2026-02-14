
import React, { useState } from 'react';
import {
    ArrowLeft, Share2, Calendar, Clock, Sparkles, Info,
    PartyPopper, X, Utensils, MapPin, Map, Ticket
} from 'lucide-react';
import { formatDate } from '../../../core/utils/date.utils';
import { getArtistBio, getNightPlan } from '../../../core/services/ai.service';

export const EventDetailsView = ({ selectedEvent, onBack }) => {
    const [aiLoading, setAiLoading] = useState(false);
    const [aiResult, setAiResult] = useState(null);
    const [aiMode, setAiMode] = useState(null);

    if (!selectedEvent) return null;

    const handleShare = async () => {
        const shareData = {
            title: `הולכים ל-${selectedEvent.title} עם Gigsy!`,
            text: `מצאתי הופעה שווה ב-Gigsy: ${selectedEvent.title} ב${selectedEvent.venue}. מה אומר?`,
            url: selectedEvent.ticketLink
        };
        if (navigator.share) {
            try { await navigator.share(shareData); } catch (err) { console.log(err); }
        } else {
            window.open(`https://wa.me/?text=${encodeURIComponent(shareData.text)}`, '_blank');
        }
    };

    const handleAIAction = async (mode, event) => {
        if (aiLoading) return;
        if (aiMode === mode) { setAiMode(null); setAiResult(null); return; }

        setAiMode(mode);
        setAiLoading(true);
        setAiResult(null);

        let result;
        if (mode === 'bio') {
            result = await getArtistBio(event.artist, event.title);
        } else if (mode === 'plan') {
            const rawResult = await getNightPlan(event.title, event.city, event.time);
            try { result = JSON.parse(rawResult); } catch (e) { result = null; }
        }

        setAiResult(result);
        setAiLoading(false);
    };

    return (
        <div className="bg-slate-950 min-h-screen pb-24 animate-in slide-in-from-bottom-8 duration-300">
            <div className="fixed top-0 w-full z-20 flex justify-between items-center p-4 bg-gradient-to-b from-slate-950 to-transparent pointer-events-none">
                <button onClick={onBack} className="w-10 h-10 rounded-full bg-slate-900/40 backdrop-blur-md flex items-center justify-center text-white pointer-events-auto border border-white/5 hover:bg-slate-800 transition-colors"><ArrowLeft className="w-6 h-6" /></button>
                <button onClick={handleShare} className="w-10 h-10 rounded-full bg-indigo-600/90 hover:bg-indigo-600 backdrop-blur-md flex items-center justify-center text-white pointer-events-auto border border-white/10 transition-colors shadow-lg shadow-indigo-500/30"><Share2 className="w-5 h-5" /></button>
            </div>
            <div className="relative h-[45vh] w-full">
                <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-0 p-6 w-full">
                    <div className="flex gap-2 mb-4">{selectedEvent.tags.map(tag => (<span key={tag} className="px-2.5 py-1 bg-white/10 backdrop-blur-md rounded-md text-xs font-medium text-white border border-white/10">{tag}</span>))}</div>
                    <h1 className="text-4xl font-black text-white mb-2 leading-tight drop-shadow-lg">{selectedEvent.title}</h1>
                    <p className="text-slate-300 text-lg flex items-center gap-2 font-medium"><span className="w-1 h-1 bg-indigo-500 rounded-full"></span>{selectedEvent.artist}</p>
                </div>
            </div>
            <div className="px-5 -mt-8 relative z-10">
                <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-8">
                    <div className="flex justify-between items-center bg-slate-800/30 p-4 rounded-2xl border border-slate-800">
                        <div className="flex items-center gap-3">
                            <div className="bg-slate-800 p-2.5 rounded-xl text-indigo-400"><Calendar className="w-6 h-6" /></div>
                            <div><div className="text-xs text-slate-400">תאריך</div><div className="font-bold text-white">{formatDate(selectedEvent.date)}</div></div>
                        </div>
                        <div className="w-px h-8 bg-slate-800"></div>
                        <div className="flex items-center gap-3">
                            <div className="bg-slate-800 p-2.5 rounded-xl text-indigo-400"><Clock className="w-6 h-6" /></div>
                            <div><div className="text-xs text-slate-400">שעה</div><div className="font-bold text-white">{selectedEvent.time}</div></div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-white font-bold flex items-center gap-2 text-lg"><Sparkles className="w-5 h-5 text-amber-400 fill-amber-400" />Gigsy AI</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <button onClick={() => handleAIAction('bio', selectedEvent)} className={`relative p-4 rounded-2xl border transition-all text-right overflow-hidden group ${aiMode === 'bio' ? 'bg-indigo-900/40 border-indigo-500/50' : 'bg-slate-800 hover:bg-slate-750 border-slate-700'}`}>
                                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-bl-full -mr-6 -mt-6 transition-transform group-hover:scale-110" />
                                <Info className="w-6 h-6 text-indigo-400 mb-3" /><div className="text-base font-bold text-white">מי זה?</div><div className="text-xs text-slate-400 mt-1">הסבר קצר על האמן</div>
                            </button>
                            <button onClick={() => handleAIAction('plan', selectedEvent)} className={`relative p-4 rounded-2xl border transition-all text-right overflow-hidden group ${aiMode === 'plan' ? 'bg-amber-900/20 border-amber-500/50' : 'bg-slate-800 hover:bg-slate-750 border-slate-700'}`}>
                                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-500/10 to-transparent rounded-bl-full -mr-6 -mt-6 transition-transform group-hover:scale-110" />
                                <PartyPopper className="w-6 h-6 text-amber-400 mb-3" /><div className="text-base font-bold text-white">תכנן לי ערב</div><div className="text-xs text-slate-400 mt-1">מסעדה ודרינק ליד</div>
                            </button>
                        </div>
                        {(aiLoading || aiResult) && (
                            <div className="mt-4 rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300 border border-indigo-500/30 shadow-2xl shadow-indigo-900/20">
                                <div className="bg-slate-800/80 backdrop-blur-xl p-5">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider"><Sparkles className="w-3 h-3" /> {aiMode === 'bio' ? 'Gigsy Bio' : 'Gigsy Plan'}</div>
                                        {!aiLoading && (<button onClick={() => { setAiResult(null); setAiMode(null); }} className="text-slate-400 hover:text-white bg-slate-700/50 rounded-full p-1"><X className="w-4 h-4" /></button>)}
                                    </div>
                                    {aiLoading ? (
                                        <div className="space-y-3 py-2"><div className="h-4 bg-indigo-400/20 rounded-full animate-pulse w-3/4"></div><div className="h-4 bg-indigo-400/20 rounded-full animate-pulse w-1/2"></div><div className="h-4 bg-indigo-400/20 rounded-full animate-pulse w-5/6"></div></div>
                                    ) : (
                                        aiMode === 'plan' && typeof aiResult === 'object' && aiResult ? (
                                            <div className="relative border-r-2 border-slate-600/50 pr-6 space-y-8 mr-1.5 py-2">
                                                <div className="relative group"><div className="absolute -right-[33px] top-0 w-5 h-5 rounded-full bg-slate-900 border-4 border-emerald-500 z-10"></div><div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 hover:border-emerald-500/30 transition-colors"><div className="flex justify-between items-start mb-2"><div className="flex items-center gap-2 text-emerald-400 text-sm font-bold"><Utensils className="w-4 h-4" />לפני: {aiResult.restaurant?.name}</div></div><p className="text-slate-300 text-sm mb-3 line-clamp-2">{aiResult.restaurant?.description}</p><div className="flex gap-2 items-center mb-4"><span className="text-[10px] uppercase tracking-wide px-2 py-1 rounded bg-slate-800 text-slate-400 font-bold">{aiResult.restaurant?.cuisine}</span></div><a href={`https://www.google.com/search?q=להזמין שולחן ל${aiResult.restaurant?.name} ${selectedEvent.city}`} target="_blank" rel="noopener noreferrer" className="w-full text-center block bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-sm py-2.5 rounded-lg transition-all border border-emerald-500/20 font-medium">הזמן שולחן</a></div></div>
                                                <div className="relative"><div className="absolute -right-[33px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-900 border-4 border-indigo-500 z-10"></div><div className="text-indigo-200 text-sm font-medium py-1 px-2 bg-indigo-500/10 rounded-lg inline-block border border-indigo-500/20">ההופעה: {selectedEvent.venue} 🎵</div></div>
                                                <div className="relative group"><div className="absolute -right-[33px] top-0 w-5 h-5 rounded-full bg-slate-900 border-4 border-amber-500 z-10"></div><div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 hover:border-amber-500/30 transition-colors"><div className="flex items-center gap-2 text-amber-400 text-sm font-bold mb-2"><PartyPopper className="w-4 h-4" />אחרי: {aiResult.afterParty?.name}</div><p className="text-slate-300 text-sm mb-4 line-clamp-2">{aiResult.afterParty?.description}</p><a href={`https://www.google.com/maps/search/?api=1&query=${aiResult.afterParty?.name} ${selectedEvent.city}`} target="_blank" rel="noopener noreferrer" className="w-full text-center block bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-sm py-2.5 rounded-lg transition-all border border-amber-500/20 font-medium">נווט למקום</a></div></div>
                                            </div>
                                        ) : (<div className="prose prose-invert prose-sm max-w-none text-slate-200 leading-relaxed whitespace-pre-wrap font-light">{aiResult || "משהו השתבש, נסה שוב."}</div>)
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <hr className="border-slate-800" />
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center shrink-0 text-indigo-400"><MapPin className="w-6 h-6" /></div>
                        <div><h3 className="text-white font-bold text-lg mb-1">המיקום</h3><p className="text-slate-400 text-sm mb-2">{selectedEvent.venue}, {selectedEvent.city}</p><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${selectedEvent.venue}, ${selectedEvent.city}`)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-indigo-400 text-sm font-medium hover:text-indigo-300 transition-colors"><Map className="w-3 h-3" />נווט לשם</a></div>
                    </div>
                    <hr className="border-slate-800" />
                    <div><h3 className="text-white font-bold mb-3 flex items-center gap-2 text-lg"><Info className="w-5 h-5 text-slate-500" />על המופע</h3><p className="text-slate-300 text-sm leading-relaxed font-light">{selectedEvent.description}</p></div>
                    <div className="flex items-center gap-3 bg-slate-800/50 p-4 rounded-xl border border-slate-800"><div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs text-white font-bold">{selectedEvent.source[0]}</div><div><div className="text-xs text-slate-400">כרטיסים מסופקים ע״י</div><div className="text-sm text-white font-bold">{selectedEvent.source}</div></div></div>
                </div>
            </div>
            <div className="fixed bottom-0 w-full bg-slate-900/90 backdrop-blur-xl border-t border-slate-800 p-4 safe-area-pb z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                <div className="flex items-center justify-between max-w-md mx-auto">
                    <div className="flex flex-col"><span className="text-slate-400 text-xs font-medium">החל מ-</span><span className="text-3xl font-black text-white tracking-tight">₪{selectedEvent.price}</span></div>
                    <a href={selectedEvent.ticketLink} target="_blank" rel="noopener noreferrer" className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3.5 rounded-2xl font-bold shadow-xl shadow-indigo-600/20 transition-all flex items-center gap-2 transform active:scale-95"><Ticket className="w-5 h-5" />שריין כרטיס</a>
                </div>
            </div>
        </div>
    );
};
