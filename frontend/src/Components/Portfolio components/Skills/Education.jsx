import React from "react";
import "./education.css";
import useGsapReveal from "../../../hooks/useGsapReveal";

function Education() {
  useGsapReveal(".edu-card");

  return (
    <section className="education" id="education">
      <h2 className="section-title">Education</h2>

      <div className="edu-container">
        <div className="edu-card">
          <h3>BS Economicse</h3>
          <span>2026 - 2028</span>
          <p> Virtual University of Pakistan</p>
        </div>

        <div className="edu-card">
          <h3>Bachlor of Economics</h3>
          <span>2022</span>
          <p>Govt College & University of Faisalabad (GCUF)</p>
        </div>
      </div>
    </section>
  );
}

export default Education;