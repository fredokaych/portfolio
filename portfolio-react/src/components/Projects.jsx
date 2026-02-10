import React from "react";
import fadeInSection from "../hooks/fadeInSection";

const projects = [
  {
    title: "Pathfinding Algorithm Visualizer",
    description:
      "An interactive in-browser visualization engine for graph traversal algorithms. Built from scratch using vanilla JavaScript, it renders a dynamic grid and animates BFS, DFS, and A* step-by-step with adjustable execution speed.",
    stack:
      "HTML • CSS • JavaScript • Algorithms • State Management • DOM Rendering",
    live: "projects/pathfinding-visualizer/index.html",
    github:
      "https://github.com/fredokaych/portfolio/tree/main/projects/pathfinding-visualizer",
  },
  {
    title: "Education Data Dashboard",
    description:
      "A dynamic, interactive dashboard that visualizes school performance data. Built with pure HTML, CSS, and JavaScript, it supports county and level filters, displays KPIs, tabular data, and renders custom charts using the Canvas API.",
    stack:
      "HTML • CSS • JavaScript • Data Visualization • DOM Manipulation • Canvas API",
    live: "projects/data-dashboard/index.html",
    github:
      "https://github.com/fredokaych/portfolio/tree/main/projects/data-dashboard",
  },
  {
    title: "Offline-First Task Manager",
    description:
      "A progressive web app that functions fully offline, allowing task creation, editing, and deletion. Implements Service Workers for caching and LocalStorage for persistent offline state, with simulated sync when online.",
    stack:
      "HTML • CSS • JavaScript • Service Workers • LocalStorage • PWA Principles",
    live: "projects/offline-notes/index.html",
    github:
      "https://github.com/fredokaych/portfolio/tree/main/projects/offline-notes",
  },
];

const Projects = () => {
  const sectionRef = fadeInSection();

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="fade-in-section"
      aria-labelledby="projects-header"
    >
      <div className="section-header">
        <h2 id="projects-header">Projects</h2>
        <p>
          Stuff I’ve coded, debugged, and shipped. Can build more. Can scale
          bigger. Only your imagination sets the limits.
        </p>
      </div>

      <div className="grid">
        {projects.map((project, index) => (
          <div
            key={index}
            className="project-card card"
            role="region"
            aria-labelledby={`project-title-${index}`}
          >
            <h3 id={`project-title-${index}`}>{project.title}</h3>

            <p>{project.description}</p>

            <p
              className="tech-stack"
              aria-label={`Tech stack: ${project.stack}`}
            >
              {project.stack}
            </p>

            <div className="card-links">
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo →
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
