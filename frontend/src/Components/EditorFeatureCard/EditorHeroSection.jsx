import React from "react";
import "./EditorFeatureCard.css";
import editorImage from "../../assets/texteditor.jpg"; // Add your image here
import { Link } from "react-router-dom";

const EditorHeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-container">
        
        {/* Left Content */}
        <div className="hero-left">
          <h1 className="hero-title">
            Powerful Online Text Editor
          </h1>
          <p className="hero-description">
            Edit, format, and export your text professionally with advanced
            tools including PDF export, styling options, and real-time preview.
          </p>

          <ul className="hero-features">
            <li>✔ Uppercase / Lowercase Conversion</li>
            <li>✔ Bold, Italic & Font Styling</li>
            <li>✔ Remove Extra Spaces & Wrong Words</li>
            <li>✔ Undo / Redo Support</li>
            <li>✔ Export as PDF, TXT & DOCX</li>
            <li>✔ Live Preview & Custom Colors</li>
          </ul>

          <div className="hero-buttons">
            <Link to={"/texteditor"} className="a">
            <button className="primary-btn">Try Editor Now</button>
            </Link>
            <Link to={"/about-us"} className="a">
            <button className="secondary-btn">Learn More</button>
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="hero-right">
          <img src={editorImage} alt="Text Editor Preview" />
        </div>

      </div>
    </section>
  );
};

export default EditorHeroSection;
