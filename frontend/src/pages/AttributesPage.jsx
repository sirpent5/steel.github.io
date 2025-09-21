import React from "react";
import "./AttributesPage.css"; // We'll create a CSS file for styling

const AttributesPage = () => {
  return (
    <div className="attributes-container">
      <h1>Attributes</h1>
      <ul className="attributes-list">
        <li>
          <strong>Underwater GIF on NewHomePage:</strong>{" "}
          <a
            href="https://tenor.com/view/underwater-bubbles-gif-13254400"
            target="_blank"
            rel="noopener noreferrer"
          >
            Underwater Bubbles GIF on Tenor
          </a>
        </li>
        <li>
          <strong>Bubbles animation on HomePage:</strong>{" "}
          <a
            href="https://codepen.io/jonitrythall/pen/DBeeqJ"
            target="_blank"
            rel="noopener noreferrer"
          >
            Adapted from Jonitrythall on CodePen
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AttributesPage;
