import React from "react";
import "./Skills.css";

import useGsapReveal from "../../../hooks/useGsapReveal";
function Skills() {
  useGsapReveal(".skill-card" );
  return (
    <section className="skills" id="skills">
      <h2 className="section-title">My Skills</h2>

      <div className="skills-container">
        <div className="skill-card">
          <h3>Frontend</h3>
          <p>React, Next.js, HTML, CSS, JavaScript, Bootstrap, Framework, Axios</p>
        </div>

        <div className="skill-card">
          <h3>Backend</h3>
          <p>Node.js, Express, MongoDB, PostgreSQL, Modules, API Development</p>
        </div>

        <div className="skill-card">
          <h3>Account Management</h3>
          <p>Financial Analysis, Budgeting, Reporting, Economic Planning</p>
        </div>

        <div className="skill-card">
          <h3>Design</h3>
          <p>Figma, UI/UX, Photoshop, Canva, Graphic Design</p>
        </div>
        <div className="skill-card">
          <h3>SEO</h3>
          <p>Off-Page SEO, Authority Backlink Building, Brand Boosting</p>
        </div>
        <div className="skill-card">
          <h3>Dashboard Skills</h3>
          <p>Microsoft Excel & Financial
            Reporting, Mailling, RESTful API Development, Windows 8 10 11, VSCode, Git & GitHub</p>
        </div>
        <div className="skill-card">
          <h3>Artificial Intelligence</h3>
          <p>Ai Learning, Machine Learning, Deep Learning, Natural Language Processing</p>
        </div>
        <div className="skill-card">
          <h3>E-Commerce</h3>
          <p>Shopify, Payment Integration, Advertising, Theme Reredesign</p>
        </div>

      </div>
    </section>
  );
}

export default Skills;