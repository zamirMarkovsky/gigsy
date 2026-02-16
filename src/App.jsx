
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './features/layout';
import { HomeView } from './features/events/pages/HomeView';
import { EventDetailsView } from './features/events/pages/EventDetailsView';
import { PlaygroundView } from './features/playground/PlaygroundView';
import { AuthProvider, useAuth } from './features/auth/context/AuthContext';
import { LoginView } from './features/auth/pages/LoginView';

function AppContent() {
  const { isAuthenticated } = useAuth();

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginView />;
  }

  // Show main app if authenticated
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/event/:id" element={<EventDetailsView />} />
          <Route path="/playground" element={<PlaygroundView />} />
          <Route path="*" element={<HomeView />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;