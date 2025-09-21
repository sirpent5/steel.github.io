import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/rightFacingFish.png'; // 👈 The variable is named 'logo'
import Finallogo from '../assets/StreamLineLogo.png';
import './Home.css';
import BubblesAnimation from '../components/BubblesAnimation.jsx';

const HomePage = () => {
  return (
    <div>
      {/* Container for the fish */}
      {/* Use the correct variable name 'logo' here */}
      <img src={logo} alt="right-facing fish" className="fish" />
      <img src={Finallogo} alt="Normal Fish" className="finalFish" />

      {/* Containers for the bubbles */}
      <div className="bubbles"></div>
      <div className="bubbles bubble-2"></div>
      <div className="bubbles bubble-3"></div>
      <div className="bubbles bubble-4"></div>
      <div className="bubbles bubble-5"></div>
      <div className="bubbles bubble-6"></div>
      <div className="bubbles bubble-7"></div>
      <div className="bubbles bubble-8"></div>
    </div>
  );
};

export default HomePage;