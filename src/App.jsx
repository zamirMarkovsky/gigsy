import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Calendar, 
  MapPin, 
  Music, 
  Mic, 
  Ticket, 
  ChevronRight, 
  Share2, 
  Info,
  Clock,
  ArrowLeft,
  Drama,
  Sparkles,
  Utensils,
  PartyPopper,
  X,
  ExternalLink,
  Map,
  Zap // Icon for energy/gigsy vibe
} from 'lucide-react';

// --- Mock Data ---
const MOCK_EVENTS = [
  {
    id: 1,
    title: "שלמה ארצי - הופעה חגיגית",
    artist: "שלמה ארצי",
    venue: "זאפה אמפי שוני",
    source: "זאפה",
    city: "בנימינה",
    date: "2023-11-15",
    time: "21:00",
    price: 249,
    category: "music",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800",
    description: "שלמה ארצי במופע חורף מיוחד באמפי שוני. כל הלהיטים הגדולים מכל הזמנים בערב בלתי נשכח תחת כיפת השמיים.",
    ticketLink: "https://www.zappa-club.co.il", 
    tags: ["רומנטי", "ישראלי", "מומלץ"]
  },
  {
    id: 2,
    title: "אדיר מילר - אלתורים",
    artist: "אדיר מילר",
    venue: "היכל התרבות",
    source: "Ticketmaster",
    city: "תל אביב",
    date: "2023-11-18",
    time: "21:30",
    price: 159,
    category: "standup",
    image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&q=80&w=800",
    description: "מופע האלתורים המפורסם של אדיר מילר. ערב של צחוק בלתי פוסק שבו הקהל הוא חלק מהמופע.",
    ticketLink: "https://www.tmisrael.co.il",
    tags: ["קורע מצחוק", "מבוקש"]
  },
  {
    id: 3,
    title: "בלקן ביט בוקס",
    artist: "Balkan Beat Box",
    venue: "בארבי",
    source: "בארבי",
    city: "תל אביב",
    date: "2023-11-20",
    time: "22:00",
    price: 110,
    category: "music",
    image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=800",
    description: "ההרכב הבינלאומי חוזר לבארבי להרים את הגג עם אנרגיות שיעיפו אתכם באוויר.",
    ticketLink: "https://www.barby.co.il",
    tags: ["מסיבה", "עמידה"]
  },
  {
    id: 4,
    title: "עלובי החיים",
    artist: "תיאטרון הבימה",
    venue: "תיאטרון הבימה",
    source: "הבימה",
    city: "תל אביב",
    date: "2023-11-25",
    time: "20:00",
    price: 320,
    category: "theater",
    image: "https://images.unsplash.com/photo-1503095392269-27528ca38116?auto=format&fit=crop&q=80&w=800",
    description: "המחזמר המצליח בכל הזמנים בהפקה חדשה ומרשימה של התיאטרון הלאומי.",
    ticketLink: "https://www.habima.co.il",
    tags: ["קלאסיקה", "דרמה"]
  },
  {
    id: 5,
    title: "רביד פלוטניק",
    artist: "רביד פלוטניק",
    venue: "מועדון הגריי",
    source: "Gray",
    city: "מודיעין",
    date: "2023-11-22",
    time: "21:30",
    price: 135,
    category: "music",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800",
    description: "רביד פלוטניק מגיע לגריי מודיעין למופע להקה מלא. כל השירים מהאלבום החדש ועוד הפתעות.",
    ticketLink: "https://grayclub.co.il",
    tags: ["היפ הופ", "אנרגטי"]
  },
  {
    id: 6,
    title: "פסטיבל הג'אז",
    artist: "אמנים שונים",
    venue: "נמל אילת",
    source: "Eventim",
    city: "אילת",
    date: "2023-12-01",
    time: "19:00",
    price: 280,
    category: "festival",
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=800",
    description: "פסטיבל הג'אז הבינלאומי חוזר לאילת עם האמנים הגדולים מהארץ ומהעולם.",
    ticketLink: "https://www.eventim.co.il",
    tags: ["פסטיבל", "ג'אז"]
  }
];

const CATEGORIES = [
  { id: 'all', label: 'הכל', icon: Ticket },
  { id: 'music', label: 'מוזיקה', icon: Music },
  { id: 'standup', label: 'סטנדאפ', icon: Mic },
  { id: 'theater', label: 'תיאטרון', icon: Drama },
];

// --- Gemini API Helper ---
const generateGeminiContent = async (prompt, isJson = false) => {
  const apiKey = ""; // Provided by environment
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
  };

  if (isJson) {
     payload.generationConfig = { responseMimeType: "application/json" };
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("API Call Failed");

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState(MOCK_EVENTS);
  
  // AI State
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [aiMode, setAiMode] = useState(null); 

  // Filter logic
  useEffect(() => {
    const lowerQuery = searchQuery.toLowerCase();
    const filtered = MOCK_EVENTS.filter(event => {
      const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
      const matchesSearch = event.title.toLowerCase().includes(lowerQuery) || 
                            event.venue.toLowerCase().includes(lowerQuery) ||
                            event.artist.toLowerCase().includes(lowerQuery) ||
                            event.city.toLowerCase().includes(lowerQuery);
      return matchesCategory && matchesSearch;
    });
    setFilteredEvents(filtered);
  }, [searchQuery, selectedCategory]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setActiveTab('details');
    setAiResult(null); 
    setAiMode(null);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setActiveTab('home');
    setSelectedEvent(null);
    setAiResult(null);
  };

  const handleShare = async () => {
    if (!selectedEvent) return;
    
    const shareData = {
      title: `הולכים ל-${selectedEvent.title} עם Gigsy!`,
      text: `מצאתי הופעה שווה ב-Gigsy: ${selectedEvent.title} ב${selectedEvent.venue}. מה אומר?`,
      url: selectedEvent.ticketLink 
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      const text = encodeURIComponent(`${shareData.text} \n${shareData.url}`);
      window.open(`https://wa.me/?text=${text}`, '_blank');
    }
  };

  const handleAIAction = async (mode, event) => {
    if (aiLoading) return;

    if (aiMode === mode) {
      setAiMode(null);
      setAiResult(null);
      return;
    }

    setAiMode(mode);
    setAiLoading(true);
    setAiResult(null);

    let prompt = "";
    let isJson = false;

    if (mode === 'bio') {
      prompt = `
        כתוב הסבר קצר (2-3 משפטים) ותמציתי בעברית על האמן או המופע "${event.artist}" בהקשר של "${event.title}".
        תאר את סגנון המוזיקה/המופע ולמי הוא מתאים. תהיה קליל וכיפי.
        אל תכתוב הקדמות.
      `;
    } else if (mode === 'plan') {
      isJson = true;
      prompt = `
        Act as an event planner in Israel.
        User context: Going to "${event.title}" by "${event.artist}" at "${event.venue}", "${event.city}". Time: ${event.time}.
        
        Create a plan for the general public with:
        1. A highly rated restaurant nearby (before the show). Good atmosphere.
        2. A bar or dessert place nearby (after the show).
        
        Return STRICT JSON format:
        {
          "restaurant": {
            "name": "Restaurant Name",
            "cuisine": "Cuisine type",
            "description": "Short vibe description"
          },
          "afterParty": {
            "name": "Place Name",
            "type": "Bar/Dessert",
            "description": "Short vibe description"
          }
        }
      `;
    }

    const result = await generateGeminiContent(prompt, isJson);
    
    if (isJson && result) {
        try {
            setAiResult(JSON.parse(result));
        } catch (e) {
            setAiResult(null);
        }
    } else {
        setAiResult(result);
    }
    
    setAiLoading(false);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('he-IL', { day: 'numeric', month: 'long' });
  };

  const getDayName = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('he-IL', { weekday: 'long' });
  };

  // --- Views ---

  const HomeView = () => (
    <div className="pb-24 animate-in fade-in duration-500">
      {/* Brand Header */}
      <div className="bg-slate-900 sticky top-0 z-10 pb-4 pt-4 px-4 shadow-lg rounded-b-2xl border-b border-indigo-900/50">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            {/* Logo Icon */}
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-1">
                gigsy<span className="text-indigo-500">.</span>
              </h1>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold border border-slate-700">
            א
          </div>
        </div>
        
        <div className="relative">
          <input
            type="text"
            placeholder="מה בא לך לראות היום?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800/80 text-white p-3 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-500 border border-slate-700 transition-all"
          />
          <Search className="absolute left-3 top-3.5 text-slate-500 w-5 h-5" />
        </div>

        <div className="flex gap-3 overflow-x-auto mt-4 pb-1 no-scrollbar scroll-smooth">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm transition-all font-medium ${
                selectedCategory === cat.id 
                  ? 'bg-white text-slate-900 shadow-lg' 
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Events Feed */}
      <div className="p-4 space-y-4">
        <h2 className="text-slate-200 font-bold mb-2 text-lg">
          {searchQuery ? `תוצאות חיפוש (${filteredEvents.length})` : 'הופעות חמות ב-Gigsy'}
        </h2>
        
        {filteredEvents.length === 0 ? (
          <div className="text-center py-10 text-slate-500">
            <p>לא מצאנו כלום... אולי נסה לחפש משהו אחר?</p>
          </div>
        ) : (
          filteredEvents.map(event => (
            <div 
              key={event.id}
              onClick={() => handleEventClick(event)}
              className="bg-slate-800 rounded-2xl overflow-hidden shadow-md border border-slate-700/50 active:scale-95 transition-all cursor-pointer group hover:border-indigo-500/30"
            >
              <div className="relative h-44 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90" />
                
                <div className="absolute top-3 right-3 bg-slate-950/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10 flex items-center gap-1">
                  <Ticket className="w-3 h-3 text-indigo-400" />
                  {event.source}
                </div>
                
                <div className="absolute bottom-3 right-3 text-white">
                    <h3 className="text-xl font-bold leading-tight shadow-sm">{event.title}</h3>
                    <div className="flex items-center gap-1 text-slate-300 text-xs mt-1">
                        <MapPin className="w-3 h-3" />
                        {event.venue}, {event.city}
                    </div>
                </div>

                <div className="absolute bottom-3 left-3 bg-indigo-600 px-3 py-1.5 rounded-lg text-sm font-bold text-white shadow-lg">
                  ₪{event.price}
                </div>
              </div>
              
              <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-700/50 p-2 rounded-lg text-center min-w-[50px]">
                        <div className="text-xs text-slate-400 font-medium">{getDayName(event.date)}</div>
                        <div className="text-lg font-bold text-white leading-none mt-0.5">{new Date(event.date).getDate()}</div>
                    </div>
                    <div className="h-8 w-px bg-slate-700"></div>
                    <div className="flex flex-col">
                        <span className="text-slate-400 text-xs">שעה</span>
                        <span className="text-white font-medium">{event.time}</span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                    <ChevronRight className="w-5 h-5 text-white" />
                  </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const EventDetailsView = () => {
    if (!selectedEvent) return null;

    return (
      <div className="bg-slate-950 min-h-screen pb-24 animate-in slide-in-from-bottom-8 duration-300">
        <div className="fixed top-0 w-full z-20 flex justify-between items-center p-4 bg-gradient-to-b from-slate-950 to-transparent pointer-events-none">
          <button 
            onClick={handleBack}
            className="w-10 h-10 rounded-full bg-slate-900/40 backdrop-blur-md flex items-center justify-center text-white pointer-events-auto border border-white/5 hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={handleShare}
            className="w-10 h-10 rounded-full bg-indigo-600/90 hover:bg-indigo-600 backdrop-blur-md flex items-center justify-center text-white pointer-events-auto border border-white/10 transition-colors shadow-lg shadow-indigo-500/30"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        <div className="relative h-[45vh] w-full">
          <img 
            src={selectedEvent.image} 
            alt={selectedEvent.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          
          <div className="absolute bottom-0 p-6 w-full">
            <div className="flex gap-2 mb-4">
              {selectedEvent.tags.map(tag => (
                <span key={tag} className="px-2.5 py-1 bg-white/10 backdrop-blur-md rounded-md text-xs font-medium text-white border border-white/10">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl font-black text-white mb-2 leading-tight drop-shadow-lg">
              {selectedEvent.title}
            </h1>
            <p className="text-slate-300 text-lg flex items-center gap-2 font-medium">
              <span className="w-1 h-1 bg-indigo-500 rounded-full"></span>
              {selectedEvent.artist}
            </p>
          </div>
        </div>

        <div className="px-5 -mt-8 relative z-10">
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-8">
            
            {/* Quick Info Grid */}
            <div className="flex justify-between items-center bg-slate-800/30 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="bg-slate-800 p-2.5 rounded-xl text-indigo-400">
                        <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-xs text-slate-400">תאריך</div>
                        <div className="font-bold text-white">{formatDate(selectedEvent.date)}</div>
                    </div>
                </div>
                <div className="w-px h-8 bg-slate-800"></div>
                <div className="flex items-center gap-3">
                    <div className="bg-slate-800 p-2.5 rounded-xl text-indigo-400">
                        <Clock className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-xs text-slate-400">שעה</div>
                        <div className="font-bold text-white">{selectedEvent.time}</div>
                    </div>
                </div>
            </div>

            {/* AI Features Section */}
            <div className="space-y-4">
              <h3 className="text-white font-bold flex items-center gap-2 text-lg">
                <Sparkles className="w-5 h-5 text-amber-400 fill-amber-400" />
                Gigsy AI
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => handleAIAction('bio', selectedEvent)}
                  className={`relative p-4 rounded-2xl border transition-all text-right overflow-hidden group ${aiMode === 'bio' ? 'bg-indigo-900/40 border-indigo-500/50' : 'bg-slate-800 hover:bg-slate-750 border-slate-700'}`}
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-bl-full -mr-6 -mt-6 transition-transform group-hover:scale-110" />
                  <Info className="w-6 h-6 text-indigo-400 mb-3" />
                  <div className="text-base font-bold text-white">מי זה?</div>
                  <div className="text-xs text-slate-400 mt-1">הסבר קצר על האמן</div>
                </button>

                <button 
                   onClick={() => handleAIAction('plan', selectedEvent)}
                   className={`relative p-4 rounded-2xl border transition-all text-right overflow-hidden group ${aiMode === 'plan' ? 'bg-amber-900/20 border-amber-500/50' : 'bg-slate-800 hover:bg-slate-750 border-slate-700'}`}
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-500/10 to-transparent rounded-bl-full -mr-6 -mt-6 transition-transform group-hover:scale-110" />
                  <PartyPopper className="w-6 h-6 text-amber-400 mb-3" />
                  <div className="text-base font-bold text-white">תכנן לי ערב</div>
                  <div className="text-xs text-slate-400 mt-1">מסעדה ודרינק ליד</div>
                </button>
              </div>

              {(aiLoading || aiResult) && (
                <div className="mt-4 rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300 border border-indigo-500/30 shadow-2xl shadow-indigo-900/20">
                  <div className="bg-slate-800/80 backdrop-blur-xl p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                        <Sparkles className="w-3 h-3" /> 
                        {aiMode === 'bio' ? 'Gigsy Bio' : 'Gigsy Plan'}
                      </div>
                      {!aiLoading && (
                        <button onClick={() => {setAiResult(null); setAiMode(null);}} className="text-slate-400 hover:text-white bg-slate-700/50 rounded-full p-1">
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    
                    {aiLoading ? (
                      <div className="space-y-3 py-2">
                        <div className="h-4 bg-indigo-400/20 rounded-full animate-pulse w-3/4"></div>
                        <div className="h-4 bg-indigo-400/20 rounded-full animate-pulse w-1/2"></div>
                        <div className="h-4 bg-indigo-400/20 rounded-full animate-pulse w-5/6"></div>
                      </div>
                    ) : (
                       aiMode === 'plan' && typeof aiResult === 'object' ? (
                          <div className="relative border-r-2 border-slate-600/50 pr-6 space-y-8 mr-1.5 py-2">
                            {/* Before */}
                            <div className="relative group">
                                <div className="absolute -right-[33px] top-0 w-5 h-5 rounded-full bg-slate-900 border-4 border-emerald-500 z-10"></div>
                                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 hover:border-emerald-500/30 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
                                            <Utensils className="w-4 h-4" />
                                            לפני: {aiResult.restaurant.name}
                                        </div>
                                    </div>
                                    <p className="text-slate-300 text-sm mb-3 line-clamp-2">{aiResult.restaurant.description}</p>
                                    <div className="flex gap-2 items-center mb-4">
                                        <span className="text-[10px] uppercase tracking-wide px-2 py-1 rounded bg-slate-800 text-slate-400 font-bold">{aiResult.restaurant.cuisine}</span>
                                    </div>
                                    <a 
                                        href={`https://www.google.com/search?q=להזמין שולחן ל${aiResult.restaurant.name} ${selectedEvent.city}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full text-center block bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-sm py-2.5 rounded-lg transition-all border border-emerald-500/20 font-medium"
                                    >
                                        הזמן שולחן
                                    </a>
                                </div>
                            </div>

                            {/* Event */}
                            <div className="relative">
                                <div className="absolute -right-[33px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-900 border-4 border-indigo-500 z-10"></div>
                                <div className="text-indigo-200 text-sm font-medium py-1 px-2 bg-indigo-500/10 rounded-lg inline-block border border-indigo-500/20">
                                    ההופעה: {selectedEvent.venue} 🎵
                                </div>
                            </div>

                            {/* After */}
                            <div className="relative group">
                                <div className="absolute -right-[33px] top-0 w-5 h-5 rounded-full bg-slate-900 border-4 border-amber-500 z-10"></div>
                                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 hover:border-amber-500/30 transition-colors">
                                    <div className="flex items-center gap-2 text-amber-400 text-sm font-bold mb-2">
                                        <PartyPopper className="w-4 h-4" />
                                        אחרי: {aiResult.afterParty.name}
                                    </div>
                                    <p className="text-slate-300 text-sm mb-4 line-clamp-2">{aiResult.afterParty.description}</p>
                                    <a 
                                        href={`https://www.google.com/maps/search/?api=1&query=${aiResult.afterParty.name} ${selectedEvent.city}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full text-center block bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-sm py-2.5 rounded-lg transition-all border border-amber-500/20 font-medium"
                                    >
                                        נווט למקום
                                    </a>
                                </div>
                            </div>
                          </div>
                       ) : (
                          <div className="prose prose-invert prose-sm max-w-none text-slate-200 leading-relaxed whitespace-pre-wrap font-light">
                            {aiResult}
                          </div>
                       )
                    )}
                  </div>
                </div>
              )}
            </div>

            <hr className="border-slate-800" />

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center shrink-0 text-indigo-400">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">המיקום</h3>
                <p className="text-slate-400 text-sm mb-2">{selectedEvent.venue}, {selectedEvent.city}</p>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${selectedEvent.venue}, ${selectedEvent.city}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-indigo-400 text-sm font-medium hover:text-indigo-300 transition-colors"
                >
                  <Map className="w-3 h-3" />
                  נווט לשם
                </a>
              </div>
            </div>

            <hr className="border-slate-800" />

            <div>
              <h3 className="text-white font-bold mb-3 flex items-center gap-2 text-lg">
                <Info className="w-5 h-5 text-slate-500" />
                על המופע
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed font-light">
                {selectedEvent.description}
              </p>
            </div>
            
            <div className="flex items-center gap-3 bg-slate-800/50 p-4 rounded-xl border border-slate-800">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs text-white font-bold">
                    {selectedEvent.source[0]}
                </div>
                <div>
                    <div className="text-xs text-slate-400">כרטיסים מסופקים ע״י</div>
                    <div className="text-sm text-white font-bold">{selectedEvent.source}</div>
                </div>
            </div>

          </div>
        </div>

        {/* Sticky Footer CTA */}
        <div className="fixed bottom-0 w-full bg-slate-900/90 backdrop-blur-xl border-t border-slate-800 p-4 safe-area-pb z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
          <div className="flex items-center justify-between max-w-md mx-auto">
            <div className="flex flex-col">
              <span className="text-slate-400 text-xs font-medium">החל מ-</span>
              <span className="text-3xl font-black text-white tracking-tight">₪{selectedEvent.price}</span>
            </div>
            <a 
              href={selectedEvent.ticketLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3.5 rounded-2xl font-bold shadow-xl shadow-indigo-600/20 transition-all flex items-center gap-2 transform active:scale-95"
            >
              <Ticket className="w-5 h-5" />
              שריין כרטיס
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 font-sans selection:bg-indigo-500/30" dir="rtl">
      {activeTab === 'home' ? <HomeView /> : <EventDetailsView />}
    </div>
  );
}