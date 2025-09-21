import React from 'react';
import './NewHomePage.css';

const NewHomePage = () => {
  return (
    <div className="new-home-container">
      <div className="overlay">
        <h1 className="welcome-text">Welcome to StreamLine</h1>
        <p className="sub-text">Your hub for evaluating and comparing streaming services.</p>
        <p className="sub-text">Head to the evaluate tab to find a plan for you!</p>
        <p className="sub-text">Enter two services of your choice and calculate your overlap to get recommendations on how you can save money by choosing one over the other!</p>
      </div>
    </div>
  );
};

export default NewHomePage;
