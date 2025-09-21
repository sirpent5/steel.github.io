import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/StreamLineLogo-removebg-preview.png';
import './HomePage.css';
import BubblesAnimation from '../components/BubblesAnimation.jsx';

const HomePage = () => {
  return (
    <div className="home-container">
      <Link to="/app" className="logo-link">
        <img src={logo} alt="Project Logo" />
        <p>Click fish to StreamLine!</p>
      </Link>
      <BubblesAnimation /> {/* Add the bubbles component here */}
    </div>
  );
};

export default HomePage;