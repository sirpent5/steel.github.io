// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import EvaluatePage from './pages/EvaluatePage.jsx';
import HomePage from './pages/HomePage.jsx'; // The original homepage
import AboutPage from './pages/AboutPage.jsx';
import AttributesPage from './pages/AttributesPage.jsx';
import NewHomePage from './pages/NewHomePage.jsx'; // The new homepage

const AppContent = () => {
  const location = useLocation();
  const showHeader = location.pathname !== '/';

  return (
    <>
      {showHeader && <Header />}
      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* The original landing page */}
          <Route path="/app" element={<NewHomePage />} /> {/* The new main homepage */}
          <Route path="/evaluate" element={<EvaluatePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/attributes" element={<AttributesPage />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;