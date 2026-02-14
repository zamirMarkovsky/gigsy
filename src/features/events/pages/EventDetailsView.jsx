
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Ticket, Calendar, Clock, MapPin, Sparkles, Utensils, Info, ExternalLink, Footprints, Car } from 'lucide-react';
import { events as EVENTS_DATA } from '../data/events.mock';
import { useTranslation } from '../../layout/context/TranslationContext';
import { useTheme } from '../../layout/context/ThemeContext';
import { getDayName, formatDateDDMM } from '../../../core/utils/date.utils';
import { getArtistBio, getNightPlan } from '../../../core/services/ai.service';

export const EventDetailsView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t, direction, language } = useTranslation();
    const { theme } = useTheme();

    // AI Toggle Logic: Default is null (closed)
    const [activeTab, setActiveTab] = useState(null);
    const [imageError, setImageError] = useState(false);

    const [aiContent, setAiContent] = useState({ about: null, plan: null }); // Plan will be object now
    const [loading, setLoading] = useState({ about: false, plan: false });

    // Find event
    const event = EVENTS_DATA.find(e => e.id.toString() === id);

    // Update Document Title
    React.useEffect(() => {
        if (event) {
            document.title = `${t(event, 'artist')} - ${t(event, 'title')} | Gigsy`;
        }
    }, [event, t]);

    if (!event) return null;

    const ArrowIcon = ArrowLeft;

    // Helper to calculate dinner time (2 hours before)
    const getDinnerTime = () => {
        const [hours, minutes] = event.time.split(':');
        const d = new Date();
        d.setHours(parseInt(hours), parseInt(minutes));
        d.setHours(d.getHours() - 2);
        return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    };

    const handleTabChange = async (tab) => {
        // Toggle: If same tab clicked, close it (set to null)
        if (activeTab === tab) {
            setActiveTab(null);
            return;
        }

        setActiveTab(tab);

        // If content exists, just show it
        if (aiContent[tab] || loading[tab]) return;

        setLoading(prev => ({ ...prev, [tab]: true }));
        try {
            let content;
            if (tab === 'about') {
                content = await getArtistBio(t(event, 'artist'), language);
            } else if (tab === 'plan') {
                const jsonStr = await getNightPlan(t(event, 'title'), t(event, 'city'), event.time, language);
                try {
                    // Parser safety
                    content = JSON.parse(jsonStr);
                } catch (e) {
                    console.error("Failed to parse AI JSON", e);
                    content = { reason: "Could not load plan at this time." };
                }
            }
            setAiContent(prev => ({ ...prev, [tab]: content }));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(prev => ({ ...prev, [tab]: false }));
        }
    };

    // Theme Helpers
    const isDark = theme === 'dark';
    const cardBg = isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-stone-200';
    const textColor = isDark ? 'text-white' : 'text-stone-900';
    const subTextColor = isDark ? 'text-slate-300' : 'text-stone-600';
    const labelColor = isDark ? 'text-slate-500' : 'text-stone-400';
    const iconBg = isDark ? 'bg-slate-800' : 'bg-stone-100';

    return (
        <div className="animate-in slide-in-from-bottom-4 duration-500 flex flex-col min-h-full">
            {/* Hero Image */}
            <div className="relative h-64 md:h-96 w-full shrink-0 bg-slate-900">
                {!imageError ? (
                    <img
                        src={event.image}
                        alt={t(event, 'title')}
                        className="w-full h-full object-cover masking-gradient-b"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600">
                        <div className="text-center">
                            <Sparkles className="w-12 h-12 mx-auto mb-2 opacity-20" />
                            <span className="text-lg font-bold opacity-50">No Image Found</span>
                        </div>
                    </div>
                )}
                <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-slate-950 via-slate-950/20' : 'from-[#F5F5F0] via-transparent'} to-transparent`} />

                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-4 start-4 p-2 bg-black/30 backdrop-blur-md rounded-full text-white hover:bg-black/50 transition-colors z-10"
                >
                    <ArrowIcon className={`w-6 h-6 ${direction === 'rtl' ? 'rotate-180' : ''}`} />
                </button>
            </div>

            {/* Content Wrapper */}
            <div className="px-4 -mt-20 relative z-10 flex flex-col flex-1">
                <div className={`${cardBg} backdrop-blur-md border p-6 rounded-2xl shadow-xl mb-4`}>

                    {/* Header Info */}
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-500 text-xs font-bold mb-2 border border-indigo-500/20">
                                <Ticket className="w-3 h-3" />
                                {event.category.toUpperCase()}
                            </div>
                            <h1 className={`text-3xl md:text-4xl font-black ${textColor} leading-tight mb-2`}>
                                {t(event, 'title')}
                            </h1>
                            <div className="text-xl text-indigo-500 font-bold">
                                {t(event, 'artist')}
                            </div>
                        </div>
                        <div className={`${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-stone-200'} p-3 rounded-xl border text-center shadow-sm`}>
                            <div className={`text-sm ${labelColor} font-bold`}>{getDayName(event.date)}</div>
                            <div className={`text-lg font-black ${textColor}`}>{formatDateDDMM(event.date)}</div>
                        </div>
                    </div>

                    {/* Meta Data */}
                    <div className={`grid gap-4 py-6 border-t ${isDark ? 'border-slate-800/50' : 'border-stone-200'} border-b mb-6`}>
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full ${iconBg} flex items-center justify-center text-indigo-500`}>
                                <Calendar className="w-5 h-5" />
                            </div>
                            <div>
                                <div className={`text-xs ${labelColor} font-bold uppercase tracking-wider`}>{language === 'he' ? 'תאריך' : 'Date'}</div>
                                <div className={`${textColor} font-medium`}>{event.date}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full ${iconBg} flex items-center justify-center text-pink-500`}>
                                <Clock className="w-5 h-5" />
                            </div>
                            <div>
                                <div className={`text-xs ${labelColor} font-bold uppercase tracking-wider`}>{language === 'he' ? 'שעה' : 'Time'}</div>
                                <div className={`${textColor} font-medium`}>{event.time}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full ${iconBg} flex items-center justify-center text-cyan-500`}>
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                                <div className={`text-xs ${labelColor} font-bold uppercase tracking-wider`}>{language === 'he' ? 'מיקום' : 'Location'}</div>
                                <div className={`${textColor} font-medium`}>{t(event, 'venue')}, {t(event, 'city')}</div>
                            </div>
                        </div>
                    </div>

                    {/* Basic Description */}
                    <div className="mb-8">
                        <h3 className={`text-lg font-bold ${textColor} mb-2`}>{language === 'he' ? 'פרטים נוספים' : 'Details'}</h3>
                        <p className={`${subTextColor} leading-relaxed text-sm md:text-base`}>
                            {t(event, 'description')}
                        </p>
                    </div>

                    {/* AI Tabs Buttons */}
                    <div className="mt-8">
                        <div className="flex items-center gap-2 mb-4 overflow-x-auto no-scrollbar">
                            {event.category !== 'sports' && (
                                <button
                                    onClick={() => handleTabChange('about')}
                                    className={`
                                        flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all border whitespace-nowrap
                                        ${activeTab === 'about'
                                            ? 'bg-indigo-600 text-white border-indigo-500'
                                            : `${isDark ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-stone-100 text-stone-500 border-stone-200'} hover:opacity-80`
                                        }
                                    `}
                                >
                                    <Info className="w-4 h-4" />
                                    {language === 'he' ? 'על האמן (AI)' : 'About Artist (AI)'}
                                </button>
                            )}
                            <button
                                onClick={() => handleTabChange('plan')}
                                className={`
                                    flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all border whitespace-nowrap
                                    ${activeTab === 'plan'
                                        ? 'bg-purple-600 text-white border-purple-500'
                                        : `${isDark ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-stone-100 text-stone-500 border-stone-200'} hover:opacity-80`
                                    }
                                `}
                            >
                                <Utensils className="w-4 h-4" />
                                {language === 'he' ? 'תכנן לי את הערב (AI)' : 'Plan My Evening (AI)'}
                            </button>
                        </div>

                        {/* AI Content Area (Only if activeTab) */}
                        {activeTab && (
                            <div className={`
                                animate-in fade-in zoom-in-95 duration-200
                                ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-stone-100 border-stone-200'} 
                                rounded-xl p-6 border min-h-[120px] shadow-inner relative
                            `}>

                                {loading[activeTab] ? (
                                    <div className="flex flex-col items-center justify-center h-24 gap-3 text-slate-400 animate-pulse">
                                        <Sparkles className="w-6 h-6 text-indigo-400 animate-spin-slow" />
                                        <span className="text-sm">Gemini is thinking...</span>
                                    </div>
                                ) : aiContent[activeTab] ? (
                                    <div className="max-w-none">

                                        {/* ABOUT TAB */}
                                        {activeTab === 'about' && (
                                            <p className={`whitespace-pre-wrap leading-relaxed ${subTextColor} prose-sm`}>{aiContent['about']}</p>
                                        )}

                                        {/* PLAN TAB - TIMELINE */}
                                        {activeTab === 'plan' && aiContent['plan'] && (
                                            <div className="relative">
                                                {/* Timeline Line */}
                                                <div className={`absolute top-2 bottom-2 start-[27px] w-0.5 ${isDark ? 'bg-slate-700' : 'bg-stone-300'}`}></div>

                                                {/* Node 1: Dinner */}
                                                <div className="relative flex gap-6 mb-8 group">
                                                    {/* Icon */}
                                                    <div className={`relative z-10 w-14 h-14 rounded-full ${isDark ? 'bg-slate-800 border-slate-600' : 'bg-white border-stone-300'} border-4 flex items-center justify-center text-purple-500 shrink-0 shadow-lg`}>
                                                        <Utensils className="w-6 h-6" />
                                                    </div>

                                                    {/* Content */}
                                                    <div className="flex-1 pt-1.5">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${isDark ? 'bg-purple-900/40 text-purple-300' : 'bg-purple-100 text-purple-700'}`}>
                                                                {getDinnerTime()}
                                                            </span>
                                                        </div>

                                                        <div className={`${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-stone-200'} p-4 rounded-xl border shadow-sm transition-all hover:shadow-md`}>
                                                            <div className="mb-2">
                                                                <a
                                                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(aiContent['plan'].searchQuery || aiContent['plan'].name)}`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className={`text-lg font-bold underline hover:text-purple-500 transition-colors flex items-center gap-1 ${textColor}`}
                                                                >
                                                                    {aiContent['plan'].name}
                                                                    <ExternalLink className="w-4 h-4 opacity-50" />
                                                                </a>
                                                                <div className={`text-xs ${labelColor} font-bold uppercase`}>{aiContent['plan'].cuisine}</div>
                                                            </div>
                                                            <p className={`text-sm ${subTextColor} leading-relaxed`}>
                                                                {aiContent['plan'].reason}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Connector Info */}
                                                <div className="relative flex gap-6 mb-8">
                                                    <div className="w-14 shrink-0 flex justify-center">
                                                        {/* Just space for line */}
                                                    </div>
                                                    <div className="flex-1 -mt-4">
                                                        <div className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full border ${isDark ? 'bg-slate-900 border-slate-700 text-slate-400' : 'bg-white border-stone-200 text-stone-500'}`}>
                                                            {aiContent['plan'].travelTime && aiContent['plan'].travelTime.includes('walk') ? <Footprints className="w-3 h-3" /> : <Car className="w-3 h-3" />}
                                                            <span>{aiContent['plan'].travelTime || '10 min'}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Node 2: Show */}
                                                <div className="relative flex gap-6">
                                                    {/* Icon */}
                                                    <div className={`relative z-10 w-14 h-14 rounded-full ${isDark ? 'bg-slate-800 border-slate-600' : 'bg-white border-stone-300'} border-4 flex items-center justify-center text-indigo-500 shrink-0 shadow-lg`}>
                                                        <Ticket className="w-6 h-6" />
                                                    </div>

                                                    {/* Content */}
                                                    <div className="flex-1 pt-3.5">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${isDark ? 'bg-indigo-900/40 text-indigo-300' : 'bg-indigo-100 text-indigo-700'}`}>
                                                                {event.time}
                                                            </span>
                                                        </div>
                                                        <h4 className={`text-lg font-bold ${textColor}`}>{t(event, 'title')}</h4>
                                                        <div className={`text-sm ${labelColor}`}>{t(event, 'venue')}</div>
                                                    </div>
                                                </div>

                                            </div>
                                        )}

                                    </div>
                                ) : (
                                    <div className="text-center text-sm text-red-400 py-4">
                                        Failed to load content. Please try again.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {/* Bottom Sticky Action */}
            <div className={`sticky bottom-0 mt-auto p-4 z-20 backdrop-blur-xl border-t transition-all ${isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-[#F5F5F0]/80 border-stone-200'}`}>
                <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
                    <div className="hidden md:block">
                        <div className={`text-xs ${labelColor}`}>{language === 'he' ? 'מחיר לכרטיס' : 'Price per ticket'}</div>
                        <div className={`text-2xl font-bold ${textColor}`}>₪{event.price}</div>
                    </div>
                    {event.ticketUrl ? (
                        <a
                            href={event.ticketUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-3 md:py-4 rounded-xl shadow-lg shadow-indigo-600/20 transform active:scale-95 transition-all text-center block"
                        >
                            {language === 'he' ? 'הזמן כרטיסים עכשיו' : 'Book Tickets Now'} • ₪{event.price}
                        </a>
                    ) : (
                        <button
                            disabled
                            onClick={() => alert(language === 'he' ? 'קישור לא זמין' : 'Link not available')}
                            className={`flex-1 font-bold py-3 md:py-4 rounded-xl text-center block cursor-not-allowed ${isDark ? 'bg-slate-800 text-slate-500' : 'bg-stone-200 text-stone-400'}`}
                        >
                            {language === 'he' ? 'לא זמין לרכישה' : 'Not Available'}
                        </button>
                    )}
                </div>
            </div>

        </div>
    );
};
