import React, { useState } from "react";
import "./NotFound.css";
import { FaHome, FaCouch, FaChair, FaArrowLeft, FaBlogger } from "react-icons/fa";

export default function NotFound() {
  const [darkMode, setDarkMode] = useState(false);

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className={darkMode ? "notfound dark" : "notfound"}>
      <button className="themeBtn" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀ Light" : "🌙 Dark"}
      </button>

      <div className="floating-icons">
        <FaCouch className="icon couch" />
        <FaChair className="icon chair" />
        <FaHome className="icon homeIcon" />
         <FaBlogger className="icon blogicon"/>
      </div>

      <div className="glass-card">
        <h1 className="code">404</h1>

        <h2>Page Not Found</h2>

        <p>
          Oops! The page you're looking for doesn’t exist or has been moved.
          Let’s go back and explore beautiful home designs.
        </p>

        <div className="buttons">
          <button onClick={goBack} className="backBtn">
            <FaArrowLeft /> Go Back
          </button>

          <a href="/" className="homeBtn">
            <FaHome /> Home
          </a>
        </div>
      </div>
    </div>
  );
}
