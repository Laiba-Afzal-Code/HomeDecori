import React from "react";
import "./aboutport.css";
import CountUp from "react-countup";

function About() {
  return (
    <section className="about" id="about">
      <div className="about-left">
        <div className="about-card">
          <h2>About Me</h2>
          <p>
            I am a Full Stack Developer (MERN) and UI/UX Designer with a passion
            for building modern, scalable, and user-friendly web applications.
          </p>

          <div className="stats">
            <div>
              <h3>
                <CountUp end={25} duration={2} />+
              </h3>
              <p>Projects</p>
            </div>

            <div>
              <h3>
                <CountUp end={3} duration={2} />+
              </h3>
              <p>Years Exp</p>
            </div>

            <div>
              <h3>
                <CountUp end={5} duration={2} />+
              </h3>
              <p>Clients</p>
            </div>
          </div>
        </div>
      </div>

      <div className="about-right">
        <div className="glass-box">
          <h3>What I Do</h3>
          <ul>
            <li>•Frontend Development (React, Next.js)</li>
            <li>•Backend APIs (Node.js, Express)</li>
            <li>•Database Design (MongoDB, MySQL)</li>
            <li>•UI/UX Design (Figma)</li>
            <li>•Deployment (Vercel, AWS)</li><li>•Search Engine Optimization (SEO)</li>
            <li>•Digital Marketing</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default About;