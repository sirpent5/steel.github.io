import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/rightFacingFish.png'; 
import Finallogo from '../assets/StreamLineLogo.png';
import './HomePage.css';
import BubblesAnimation from '../components/BubblesAnimation.jsx';

const HomePage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/app'); // 👈 Navigate to the new homepage
  };

  return (
    <div className="home-container">
      {/* Clickable fish logo */}
      <img
        src={logo}
        alt="Right-facing fish"
        className="fish"
        onClick={handleLogoClick} // 👈 Make it clickable
        style={{ cursor: 'pointer' }} // 👈 Show hand cursor
      />

      <img
        src={Finallogo}
        alt="StreamLine Logo"
        className="finalFish"
        onClick={handleLogoClick} // 👈 Also clickable
        style={{ cursor: 'pointer' }}
      />

      {/* Bubble decorations */}
      <div className="bubbles"></div>
      <div className="bubbles bubble-2"></div>
      <div className="bubbles bubble-3"></div>
      <div className="bubbles bubble-4"></div>
      <div className="bubbles bubble-5"></div>
      <div className="bubbles bubble-6"></div>
      <div className="bubbles bubble-7"></div>
      <div className="bubbles bubble-8"></div>

      {showMenu && (
        <div className="menu-options">
          <div className="menu-item" onClick={() => navigate('/about')}>
            <p>About</p>
          </div>
          <div className="menu-item" onClick={() => navigate('/attributes')}>
            <p>Attributes</p>
          </div>
          <div className="menu-item" onClick={() => navigate('/evaluate')}>
            <p>Evaluate</p>
          </div>
          <div className="menu-item" onClick={() => navigate('/documentation')}>
            <p>Documentation</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
