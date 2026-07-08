import React, { useEffect, useRef } from "react";
import "./heroport.css";
import Typed from "typed.js";
// import Scene from "../Scene";

function Hero() {


  const typedRef = useRef(null);
  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        "Frontend Developer",
        "MERN Stack Engineer",
        "UI/UX Designer",
        "Backend Developer",
        "AI Enthusiast",
        "Open Source Contributor",
        "Tech Blogger",
        "Active Learner",
        "Accomplished Problem Solver",
        "Creative Thinker",
        "Accountant",
      ],
      typeSpeed: 60,
      backSpeed: 40,
      loop: true,
    });

    return () => typed.destroy();
  }, []);
  const handleViewProjects = () => {
    // You can scroll to projects section or navigate
    const section = document.getElementById("projects");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      console.log("Projects section not found");
    }
  };

  const handleDownloadCV = () => {
    // Replace with your real CV link
    const cvUrl = "/cv.pdf";

    const link = document.createElement("a");
    link.href = cvUrl;
    link.download = "LaibaAfzal_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };



  return (
    <section className="heroport" id="home">
      <div className="Heroport-content">
        <h1>Hi, I'm <span>Laiba Afzal</span></h1>

        <h2 className="Heroport-typed">
          I'm a <span ref={typedRef}></span>
        </h2>

        <p>
          I build modern, responsive, and high-performance web applications
          using React and Node.js.
        </p>

        <div className="Heroport-buttons">
          <button className="primary" onClick={handleViewProjects}>
            View Projects
          </button>

          <button className="secondary" onClick={handleDownloadCV}>
            Download CV
          </button>
        </div>


      </div>

      {/* <Scene /> */}
      <div className="Heroport-glow">
      </div>
    </section>
  );
}

export default Hero;