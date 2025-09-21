import React ,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/rightFacingFish.png'; // 👈 The variable is named 'logo'
import Finallogo from '../assets/StreamLineLogo.png';
import './Home.css';
import BubblesAnimation from '../components/BubblesAnimation.jsx';


const HomePage = () => {

  const [showMenu, setShowMenu] = useState(false);
  const [isFishClicked, setIsFishClicked] = useState(false);
  const navigate = useNavigate();



  const handleFishClick = () => {
    setIsFishClicked(true);
    setTimeout(() => {
      setShowMenu(true);
    }, 1000); // Delay menu appearance to sync with the end of the swim-to-center animation
  };

  const handleMenuClick = (path) => {
    navigate(path);
  };

  return (
     <div className="home-container">
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
{/*  

  {isFishClicked ? (
        <img
          src={StreamLineLogo}
          alt="StreamLine Logo"
          className="finalFish swim-away"
          onClick={handleFishClick}
        />
      ) : (
        <img
          src={StreamLineLogo}
          alt="StreamLine Logo"
          className="finalFish"
          onClick={handleFishClick}
        />
      )}

{/*  */}
      {showMenu && (
        <div className="menu-options">
          <div className="menu-item" onClick={() => handleMenuClick('/about')}>
            <p>About</p>
          </div>
          <div className="menu-item" onClick={() => handleMenuClick('/attributes')}>
            <p>Attributes</p>
          </div>
          <div className="menu-item" onClick={() => handleMenuClick('/evaluate')}>
            <p>Evaluate</p>
          </div>
          <div className="menu-item" onClick={() => handleMenuClick('/documentation')}>
            <p>Documentation</p>
          </div>
        </div>
      )} 
    </div>

  );
};

export default HomePage;