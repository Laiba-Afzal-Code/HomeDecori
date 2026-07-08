import React from "react";
import "./experience.css";
import useGsapReveal from "../../../hooks/useGsapReveal";

function Experience() {
  useGsapReveal(".exp-card");

  return (
    <section className="experience" id="experience">
      <h2 className="section-title">Experience</h2>
      <div className="exp-container">

      <div className="exp-card">
        <h3>MERN_Stack Developer</h3>
        <span>2023 - Now</span>
        <p>Developed full-stack applications using React .js, Node.js, Express.js & MongoDB.</p>
      </div>
        <div className="exp-card">
          <h3>SEO Specialist</h3>
          <span>2023 - 2026</span>
          <p>Optimized website content for search engines and improved organic traffic.</p>
        </div>


        <div className="exp-card">
          <h3>React Developer</h3>
          <span>2024 - Present</span>
          <p>Built responsive UI using React and modern CSS.</p>
        </div>
        <div className="exp-card">
          <h3>UI/UX Designer</h3>
          <span>2023</span>
          <p>Designed user-friendly interfaces in Figma. Graphic Designing skill in Canva</p>
        </div>
      </div>
    </section>
  );
}

export default Experience;