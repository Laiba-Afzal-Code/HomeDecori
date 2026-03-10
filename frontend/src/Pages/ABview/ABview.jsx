import React, { useState } from "react";
import "./ABview.css";
import beforeImg from "../../assets/before.jpg";
import afterImg from "../../assets/after.jpg";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Minicompo/Navbar/Navbar";
import AIRoomDesigner from "./AIRoomDesigner";

const ABview = () => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e) => {
    setSliderPosition(e.target.value);
  };

  return (
    <>
      <Navbar />

      <div className="abview-container">
        {/* Slider Section */}
        <section className="slider-section">
          <h1 className="section-title">Before & After Room Transformation</h1>
          <div className="before-after-wrapper">
            <img src={beforeImg} alt="Before Room" className="before-img" />
            <img
              src={afterImg}
              alt="After Room"
              className="after-img"
              style={{ width: `${sliderPosition}%` }}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              className="slider"
              onChange={handleSliderChange}
            />
          </div>
        </section>

        {/* Informative Section */}
        <section className="info-section">
          <h2>Transform Your Space, Transform Your Life</h2>
          <p>
            A thoughtfully designed room does more than look beautiful—it shapes your mood, energy,
            and creativity. With careful <strong>wall design</strong>, calming colors, and
            harmonious layouts, any room can become a peaceful sanctuary.
          </p>
          <div className="info-cards">
            <div className="card">
              <h3>Modern Wall Design</h3>
              <p>Use textures, accent walls, and color palettes to create visual depth and style.</p>
            </div>
            <div className="card">
              <h3>Peaceful Layout</h3>
              <p>Minimal furniture and organized space promote relaxation and focus.</p>
            </div>
            <div className="card">
              <h3>Inspired Living</h3>
              <p>Your surroundings influence your mind—curate a space that nurtures creativity and calm.</p>
            </div>
          </div>
          <p>
            Explore <strong>modern interior designs</strong> that reflect your lifestyle and
            personality. Let your room not just be a place to stay, but a place that inspires and rejuvenates.
          </p>
        </section>

<AIRoomDesigner/>
<section className="decor-explain">
      <div className="decor-container">

        <h2 className="decor-title">What is Home Decor?</h2>

        <p className="decor-text">
          Home decor is the art of designing and styling your living space to
          make it beautiful, comfortable, and meaningful. It includes the
          arrangement of furniture, wall colors, lighting, textures, and
          decorative elements that reflect your personality and lifestyle.
        </p>

        <p className="decor-text">
          A well-decorated home creates a peaceful environment where you can
          relax, feel inspired, and enjoy your daily life. From modern living
          rooms to cozy bedrooms, the right design choices can transform any
          empty space into a warm and welcoming place.
        </p>

        <p className="decor-text">
          On our platform, you can discover creative home decor ideas, explore
          before-and-after room designs, and even use AI tools to visualize how
          your own room could look with modern interior design.
        </p>

      </div>
    </section>
      </div>
      

      <Footer />
    </>
  );
};

export default ABview;