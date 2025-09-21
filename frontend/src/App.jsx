// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx'; // Assuming you create a components folder
import EvaluatePage from './pages/EvaluatePage.jsx'; // Assuming you create a pages folder
import HomePage from './pages/HomePage.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Header /> {/* The Header is outside the Routes so it's always visible */}
      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/evaluate" element={<EvaluatePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;