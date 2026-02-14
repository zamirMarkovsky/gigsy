
import React, { useState } from 'react';
import { HomeView, EventDetailsView } from './features/events';
import { PlaygroundView } from './features/playground';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setActiveTab('details');
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setActiveTab('home');
    setSelectedEvent(null);
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 font-sans selection:bg-indigo-500/30" dir="rtl">
      {/* Temporary Navigation for testing */}
      <div className="fixed top-0 left-0 p-2 z-50 opacity-20 hover:opacity-100 transition-opacity">
        <button onClick={() => setActiveTab('playground')} className="text-xs bg-slate-800 text-white px-2 py-1 rounded border border-slate-700">Dev: Playground</button>
      </div>

      {activeTab === 'playground' ? (
        <div dir="ltr"><PlaygroundView /></div>
      ) : activeTab === 'home' ? (
        <HomeView onEventClick={handleEventClick} />
      ) : (
        <EventDetailsView selectedEvent={selectedEvent} onBack={handleBack} />
      )}
    </div>
  );
}