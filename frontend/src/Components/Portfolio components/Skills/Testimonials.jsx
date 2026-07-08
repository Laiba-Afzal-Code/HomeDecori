import React from "react";
import "./Testimonials.css";
import useGsapReveal from "../../../hooks/useGsapReveal";
function Testimonials() {
useGsapReveal('.test-card')
  
  return (
    <section className="testimonials">
      <h2 className="section-title">Testimonials</h2>

      <div className="test-grid">
        <div className="test-card">
          <p>"Excellent developer, delivered project on time!"</p>
          <h4>- Emma</h4>
        </div>

        <div className="test-card">
          <p>"Amazing UI/UX skills and clean code."</p>
          <h4>- Amelia</h4>
        </div>

        <div className="test-card">
          <p>"Very professional and responsive."</p>
          <h4>- Hannah</h4>
        </div>
      </div>
    </section>
  );
} 

export default Testimonials;