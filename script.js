/* =========================================
   Particle Background Animation (Canvas) - Enhanced
   ========================================= */

const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');
let particlesArray;
let mouse = { x: null, y: null, radius: 100 };

// Resize Canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Track mouse
window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Particle class
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

        // Move particle
        this.x += this.directionX;
        this.y += this.directionY;

        // Mouse interaction - simple repulsion
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);

        if (distance < mouse.radius + this.size) {
            // Move particle away from mouse
            let angle = Math.atan2(dy, dx);
            let force = (mouse.radius - distance) / mouse.radius;
            this.directionX -= force * Math.cos(angle) * 0.5;
            this.directionY -= force * Math.sin(angle) * 0.5;
        }

        // Slow particles back to original speed
        this.directionX *= 0.95;
        this.directionY *= 0.95;

        this.draw();
    }
}

// Initialize particles
function initParticles() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * (canvas.width - size * 4)) + size * 2;
        let y = (Math.random() * (canvas.height - size * 4)) + size * 2;
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
        let color = '#3b82f6';
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// Connect particles
function connect() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let dx = particlesArray[a].x - particlesArray[b].x;
            let dy = particlesArray[a].y - particlesArray[b].y;
            let distance = dx * dx + dy * dy;

            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                let opacityValue = 1 - distance / 20000;
                ctx.strokeStyle = `rgba(59,130,246,${opacityValue})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// Animate particles
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => p.update());
    connect();
}

// Handle resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// Initialize
initParticles();
animate();
