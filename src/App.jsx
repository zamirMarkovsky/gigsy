
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './features/layout';
import { HomeView } from './features/events/pages/HomeView';
import { EventDetailsView } from './features/events/pages/EventDetailsView';
import { PlaygroundView } from './features/playground/PlaygroundView';

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/event/:id" element={<EventDetailsView />} />
          <Route path="/playground" element={<PlaygroundView />} />
          {/* Fallback route - could be a 404 page or redirect to home */}
          <Route path="*" element={<HomeView />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;