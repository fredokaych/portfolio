import React, { useRef, useEffect } from "react";
import fadeInSection from "../hooks/fadeInSection";

const Hero = () => {
  const sectionRef = fadeInSection();
  const canvasRef = useRef(null);
  const particlesArrayRef = useRef([]);
  const mouseRef = useRef({ x: null, y: null, radius: 100 });

  // Particle class
  class Particle {
    constructor(x, y, directionX, directionY, size, color) {
      this.x = x;
      this.y = y;
      this.directionX = directionX;
      this.directionY = directionY;
      this.baseDirectionX = directionX;
      this.baseDirectionY = directionY;
      this.size = size;
      this.color = color;
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    update(ctx, canvas) {
      // Move particle
      this.x += this.directionX;
      this.y += this.directionY;

      // Bounce off edges
      if (this.x + this.size > canvas.width) {
        this.x = canvas.width - this.size;
        this.directionX = -this.directionX;
        this.baseDirectionX = -this.baseDirectionX;
      }
      if (this.x - this.size < 0) {
        this.x = this.size;
        this.directionX = -this.directionX;
        this.baseDirectionX = -this.baseDirectionX;
      }
      if (this.y + this.size > canvas.height) {
        this.y = canvas.height - this.size;
        this.directionY = -this.directionY;
        this.baseDirectionY = -this.baseDirectionY;
      }
      if (this.y - this.size < 0) {
        this.y = this.size;
        this.directionY = -this.directionY;
        this.baseDirectionY = -this.baseDirectionY;
      }

      // Mouse interaction
      if (mouseRef.current.x && mouseRef.current.y) {
        let dx = mouseRef.current.x - this.x;
        let dy = mouseRef.current.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRef.current.radius + this.size) {
          let angle = Math.atan2(dy, dx);
          let force = (mouseRef.current.radius - distance) / mouseRef.current.radius;
          this.directionX -= force * Math.cos(angle) * 0.5;
          this.directionY -= force * Math.sin(angle) * 0.5;
        }
      }

      // Damping back to original speed
      this.directionX += (this.baseDirectionX - this.directionX) * 0.05;
      this.directionY += (this.baseDirectionY - this.directionY) * 0.05;

      this.draw(ctx);
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Resize canvas
    const resizeCanvas = () => {
      const heroSection = canvas.parentElement;
      canvas.width = window.innerWidth;
      canvas.height = heroSection.offsetHeight;
      initParticles();
    };

    const initParticles = () => {
      particlesArrayRef.current = [];
      const numberOfParticles = (canvas.width * canvas.height) / 11000;

      for (let i = 0; i < numberOfParticles; i++) {
        let size = Math.random() * 2 + 1;
        let x = Math.random() * (canvas.width - size * 2) + size * 2;
        let y = Math.random() * (canvas.height - size * 2) + size * 2;
        let directionX = Math.random() * 0.4 - 0.2;
        let directionY = Math.random() * 0.4 - 0.2;
        let color = "#16a34a"; // Green accent
        particlesArrayRef.current.push(new Particle(x, y, directionX, directionY, size, color));
      }
    };

    const connectParticles = () => {
      for (let a = 0; a < particlesArrayRef.current.length; a++) {
        for (let b = a; b < particlesArrayRef.current.length; b++) {
          let dx = particlesArrayRef.current[a].x - particlesArrayRef.current[b].x;
          let dy = particlesArrayRef.current[a].y - particlesArrayRef.current[b].y;
          let distance = dx * dx + dy * dy;

          if (distance < (canvas.width / 7) * (canvas.height / 7)) {
            let opacity = 1 - distance / 20000;
            ctx.strokeStyle = `rgba(22, 163, 74,${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArrayRef.current[a].x, particlesArrayRef.current[a].y);
            ctx.lineTo(particlesArrayRef.current[b].x, particlesArrayRef.current[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArrayRef.current.forEach((p) => p.update(ctx, canvas));
      connectParticles();
      requestAnimationFrame(animate);
    };

    // Mouse events
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    const handleMouseOut = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("resize", resizeCanvas);

    // Initialize
    resizeCanvas();
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    // <section id="hero" className="hero-section relative overflow-hidden">
    //   <canvas
    //     ref={canvasRef}
    //     id="canvas-bg"
    //     className="absolute top-0 left-0 w-full h-full"
    //   />
    //   <div className="hero-content relative z-10 text-center text-white">
    //     <h1 className="text-5xl font-bold">Welcome to My Portfolio</h1>
    //     <p className="mt-4 text-xl">Interactive Hero with constellation effect</p>
    //   </div>
    // </section>

    <section id="hero" aria-label="Hero section">
      <canvas id="canvas-bg" canvas ref={canvasRef} aria-hidden="true">Your browser does not support HTML5 Canvas</canvas>
      <div className="hero-content fade-in-section" ref={sectionRef}>
        <p className="hero-subtitle">Hi, my name is</p>
        <h1 className="hero-title">Fred Okech.</h1>
        <p className="hero-desc">
          I build practical, scalable web solutions and interactive digital experiences.
          Let's turn ideas into reality.
        </p>
        <div className="hero-btns">
          <a href="#projects" className="btn btn-primary">View Projects</a>
          <a href="#contact" className="btn btn-outline">Contact Me</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
