import React from "react";
import "./skills.css";
import useGsapReveal from "../../../hooks/useGsapReveal";

  function Services() {
  useGsapReveal('.serviceport-card')
  return (
    <section className="services" id="services">
      <h2 className="section-title">Services</h2>

      <div className="service-grid">
        <div className="serviceport-card">
          <h3>Web Development</h3>
          <p>Modern and responsive websites using React & Node.js</p>
        </div>

        <div className="serviceport-card">
          <h3>UI/UX Design</h3>
          <p>Clean and user-friendly interface designs in Figma</p>
        </div>

        <div className="serviceport-card">
          <h3>Backend APIs</h3>
          <p>Secure REST APIs using Node.js & Express</p>
        </div>

        <div className="serviceport-card">
          <h3>SEO Optimization</h3>
          <p>Improve search engine visibility and drive organic traffic by off and on page seo</p>
        </div>
      </div>
    </section>
  );
}

export default Services;