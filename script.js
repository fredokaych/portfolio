// 1. Mobile Menu Toggle
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// 2. Scroll Animation (Intersection Observer)
const observerOptions = {
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-section').forEach(section => {
    observer.observe(section);
});

// 3. Dynamic Year in Footer
document.getElementById('year').textContent = new Date().getFullYear();

// 4. Palindrome Logic with Enhanced Feedback
function checkPalindrome() {
    const input = document.getElementById("palInput");
    const result = document.getElementById("palResult");
    const val = input.value.trim();

    // UI Reset
    result.classList.remove('status-success', 'status-error');

    if (!val) {
        result.textContent = "Please enter a word.";
        result.className = "status-neutral";
        return;
    }

    // Logic
    const cleaned = val.toLowerCase().replace(/[^a-z0-9]/g, "");
    const reversed = cleaned.split("").reverse().join("");

    if (cleaned === reversed) {
        result.textContent = `Yes, "${val}" is a palindrome!`;
        result.classList.add('status-success');
    } else {
        result.textContent = `No, "${val}" is not a palindrome.`;
        result.classList.add('status-error');
    }
}

// Allow "Enter" key to trigger palindrome check
document.getElementById('palInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        checkPalindrome();
    }
});

// 5. CANVAS ANIMATION WITH MOUSE INTERACTION (USER'S PREFERRED LOGIC)
// Integrated into the modern layout structure
const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');
let particlesArray;

// Mouse Object for Interaction
let mouse = {
    x: null,
    y: null,
    radius: 100 // Interaction radius
};

// Resize Canvas to fit the Hero Section (not full window)
function resizeCanvas() {
    const heroSection = document.getElementById('hero');
    canvas.width = window.innerWidth;
    canvas.height = heroSection.offsetHeight;
    initParticles();
}

// Track mouse position
window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Handle Mouse Leaving Window (Optional: stops interaction when mouse leaves)
window.addEventListener('mouseout', () => {
    mouse.x = undefined;
    mouse.y = undefined;
});

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

    // Draw particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    // Update particle position
    update() {
        // Move particle
        this.x += this.directionX;
        this.y += this.directionY;

        // Bounce off edges properly, considering particle size

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


        // --- MOUSE INTERACTION LOGIC ---
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius + this.size) {
            // Move particle away from mouse (Repulsion)
            let angle = Math.atan2(dy, dx);
            let force = (mouse.radius - distance) / mouse.radius;
            this.directionX -= force * Math.cos(angle) * 0.5;
            this.directionY -= force * Math.sin(angle) * 0.5;
        }

        // Slow particles back to original speed (Damping/Spring effect)
        this.directionX += (this.baseDirectionX - this.directionX) * 0.05;
        this.directionY += (this.baseDirectionY - this.directionY) * 0.05;
        // -----------------------------------------------------

        this.draw();
    }
}

function initParticles() {
    particlesArray = [];
    // Calculate number of particles based on canvas size
    // Adjusted density slightly to match cleaner aesthetic
    let numberOfParticles = (canvas.height * canvas.width) / 11000;

    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
        let color = '#3b82f6'; // Blue accent

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// Connect particles with lines
function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

            // Optimized distance check for lines to keep it clean
            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                opacityValue = 1 - (distance / 20000);
                ctx.strokeStyle = 'rgba(59, 130, 246,' + opacityValue + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight); // Clear full canvas

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

// Handle Window Resize
window.addEventListener('resize', () => {
    resizeCanvas();
});

// Initialize Animation
resizeCanvas();
animate();