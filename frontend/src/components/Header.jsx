// frontend/src/components/Header.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

import logo from '../assets/StreamLineLogo.png';

const Header = () => {
  return (
    <nav className="header-tabs">
      <NavLink
        to="/app"
        className={({ isActive }) =>
          isActive ? "tab-link active-tab" : "tab-link"
        }
      >
        <img src={logo} alt="Project Logo" className="logo-icon" />
      </NavLink>
      <NavLink
        to="/evaluate"
        className={({ isActive }) =>
          isActive ? "tab-link active-tab" : "tab-link"
        }
      >
        Evaluate
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive ? "tab-link active-tab" : "tab-link"
        }
      >
        About Us
      </NavLink>
      <NavLink
        to="/attributes"
        className={({ isActive }) =>
          isActive ? "tab-link active-tab" : "tab-link"
        }
      >
        Attributes
      </NavLink>
    </nav>
  );
};

export default Header;