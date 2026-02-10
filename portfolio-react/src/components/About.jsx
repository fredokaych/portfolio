import React from "react";
import fadeInSection from "../hooks/fadeInSection";

const About = () => {
  const sectionRef = fadeInSection();

  return (
    <section id="about" ref={sectionRef} className="fade-in-section"  aria-labelledby="about-header" >
      <div className="section-header">
        <h2 id="about-header">About Me</h2>
      </div>

      <div className="card">
        <p>
          I’m a developer with a strong foundation in web technologies and a
          passion for building systems that actually solve problems. I bridge
          the gap between design and engineering, combining clean code with
          intuitive user interfaces. I am constantly learning new tools and frameworks to stay ahead in the fast-paced tech world.
          <br /><br />
          I write code that actually does stuff - frontend, backend, or both. If
          it solves problems, I’m on it. Constantly learning, always shipping.
        </p>
      </div>
    </section>
  );
};

export default About;
