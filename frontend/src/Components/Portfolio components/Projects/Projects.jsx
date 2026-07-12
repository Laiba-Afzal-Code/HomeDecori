import React, { useState } from "react";
import "./projects.css";
import { projects } from "../../../data/projects";

function Projects() {
  const [filter, setFilter] = useState("all");

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <section className="projects" id="projects">
      <h2 className="section-title">My Projects</h2>

      {/* FILTER BUTTONS */}
      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("frontend")}>Frontend</button>
        <button onClick={() => setFilter("backend")}>Backend</button>
        <button onClick={() => setFilter("fullstack")}>Full Stack</button>
      </div> 

      {/* PROJECT GRID */}
      <div className="project-grid">
        {filteredProjects.map((project) => (
          <div className="project-card" key={project.id}>
            <div className="project-img">
              <img src={project.image} alt={project.title} />
            </div>

            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>

              <div className="tech">
                {project.tech.map((t, i) => (
                  <span key={i}>{t}</span>
                ))}
              </div>

              <div className="links">
                <a href={project.github}>GitHub</a>
                <a href={project.live}>Live Demo</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;