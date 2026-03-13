import React from "react";
import { useNavigate } from "react-router-dom";
import "./contact.css";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Minicompo/Navbar/Navbar";

const WriteWithUs = () => {
  const navigate = useNavigate();

  const goToContact = () => {
    navigate("/contact-us");
  };
    const goTodecorim = () => {
    navigate("/blogrequest");
  };

  return (
    <>
      <Navbar />
      <section className="write-section">
        <div className="write-container">
          <div className="write-text">
            <h2 className="fih2">Write With HomeDecorim</h2>

            <p>
              Are you passionate about interior design, home décor, or creative
              living spaces? HomeDecorim invites designers, writers, and décor
              enthusiasts to share their ideas and inspiration with our growing
              community.
            </p>

            <p>
              Whether you want to write about modern room designs, wall décor
              ideas, peaceful living spaces, or practical home styling tips,
              your creativity can inspire thousands of readers looking to
              transform their homes.
            </p>

            <p>
              Join us and become part of a platform that celebrates creativity,
              innovation, and beautiful living spaces.
            </p>

            <button className="contact-btn" onClick={goToContact}>
              Contact Us to Write
            </button>
             <button className="contact-btn" onClick={goTodecorim}>
              Write your Blog Ideas
            </button>
          </div>

          <div className="write-features">
            <div className="feature-card">
              <h3>Share Your Ideas</h3>
              <p>
                Publish your home décor inspiration and help others create
                beautiful living spaces.
              </p>
            </div>

            <div className="feature-card">
              <h3>Grow Your Audience</h3>
              <p>
                Reach readers who are actively searching for modern home design
                inspiration.
              </p>
            </div>

            <div className="feature-card">
              <h3>Build Your Portfolio</h3>
              <p>
                Showcase your creativity and writing skills on a growing
                interior design platform.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default WriteWithUs;
