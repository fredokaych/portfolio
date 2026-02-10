import React from "react";
import fadeInSection from "../hooks/fadeInSection";


const Contact = () => {
    const sectionRef = fadeInSection();
    
    return (
        <section id="contact" className="fade-in-section" ref={sectionRef} aria-labelledby="contact-header">
            <div className="section-header">
                <h2 id="contact-header">Get In Touch</h2>
                <p>I'm currently available for freelance work or full-time opportunities.</p>
            </div>

            <div className="contact-links">
                {/* <!-- Email --> */}
                <a href="mailto:fredokaych@gmail.com" className="contact-item" aria-label="Email Me">
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                            d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                </a>

                {/* <!-- GitHub --> */}
                <a href="https://github.com/fredokaych" target="_blank" rel="noopener noreferrer" className="contact-item"
                    aria-label="GitHub">
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                            d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                    </svg>
                </a>

                {/* <!-- LinkedIn --> */}
                <a href="https://www.linkedin.com/in/fredokaych/" target="_blank" rel="noopener noreferrer"
                    className="contact-item" aria-label="LinkedIn">
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                            d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7 0h3.78v2.16h.05c.53-1 1.83-2.16 3.77-2.16 4.03 0 4.78 2.65 4.78 6.09V24h-4v-7.77c0-1.85-.03-4.23-2.58-4.23-2.58 0-2.98 2.02-2.98 4.11V24h-4V8z" />
                    </svg>
                </a>

                {/* <!-- Twitter --> */}
                <a href="https://x.com/fredokaych" target="_blank" rel="noopener noreferrer" className="contact-item"
                    aria-label="X / Twitter">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" height="20"
                        width="20">
                        <path
                            d="M12.6 0.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867 -5.07 -4.425 5.07H0.316l5.733 -6.57L0 0.75h5.063l3.495 4.633L12.601 0.75Zm-0.86 13.028h1.36L4.323 2.145H2.865z"
                            stroke-width="1" />
                    </svg>
                </a>



                {/* <!-- Whatsapp --> */}
                <a href="https://wa.me/254717905039?text=Hi%20Fred%2C%20I%E2%80%99m%20reaching%20out%20from%20your%20portfolio%20website%21"
                    target="_blank" rel="noopener noreferrer" className="contact-item" aria-label="WhatsApp">
                    <svg role="img" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                        height="24" width="24">
                        <path
                            d="M17.472 14.382c-0.297 -0.149 -1.758 -0.867 -2.03 -0.967 -0.273 -0.099 -0.471 -0.148 -0.67 0.15 -0.197 0.297 -0.767 0.966 -0.94 1.164 -0.173 0.199 -0.347 0.223 -0.644 0.075 -0.297 -0.15 -1.255 -0.463 -2.39 -1.475 -0.883 -0.788 -1.48 -1.761 -1.653 -2.059 -0.173 -0.297 -0.018 -0.458 0.13 -0.606 0.134 -0.133 0.298 -0.347 0.446 -0.52 0.149 -0.174 0.198 -0.298 0.298 -0.497 0.099 -0.198 0.05 -0.371 -0.025 -0.52 -0.075 -0.149 -0.669 -1.612 -0.916 -2.207 -0.242 -0.579 -0.487 -0.5 -0.669 -0.51 -0.173 -0.008 -0.371 -0.01 -0.57 -0.01 -0.198 0 -0.52 0.074 -0.792 0.372 -0.272 0.297 -1.04 1.016 -1.04 2.479 0 1.462 1.065 2.875 1.213 3.074 0.149 0.198 2.096 3.2 5.077 4.487 0.709 0.306 1.262 0.489 1.694 0.625 0.712 0.227 1.36 0.195 1.871 0.118 0.571 -0.085 1.758 -0.719 2.006 -1.413 0.248 -0.694 0.248 -1.289 0.173 -1.413 -0.074 -0.124 -0.272 -0.198 -0.57 -0.347m-5.421 7.403h-0.004a9.87 9.87 0 0 1 -5.031 -1.378l-0.361 -0.214 -3.741 0.982 0.998 -3.648 -0.235 -0.374a9.86 9.86 0 0 1 -1.51 -5.26c0.001 -5.45 4.436 -9.884 9.888 -9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-0.003 5.45 -4.437 9.884 -9.885 9.884m8.413 -18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 0.16 5.335 0.157 11.892c0 2.096 0.547 4.142 1.588 5.945L0.057 24l6.305 -1.654a11.882 11.882 0 0 0 5.683 1.448h0.005c6.554 0 11.89 -5.335 11.893 -11.893a11.821 11.821 0 0 0 -3.48 -8.413Z"
                            stroke-width="1" />
                    </svg>
                </a>


            </div>
        </section>
    );
};

export default Contact;
