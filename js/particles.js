const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const particleImage = new Image();
particleImage.src = "../assets/partikoil.png";

const particles = [];
const PARTICLE_COUNT = 15;

function createParticle() {
  return {
    x: Math.random() * window.innerWidth,
    y: canvas.height + 20, // spawn from the bottom
    size: Math.random() * 45 + 10,
    speedY: -(0.8 + Math.random() * 1.4), // move upward
    speedX: 0.2 + Math.random() * 0.3, // move rightward
    drift: (Math.random() - 0.5) * 0.25,
    angle: Math.random() * Math.PI * 2,
    angularSpeed: (Math.random() - 0.5) * 0.01,
    opacity: 0.8 + Math.random() * 0.4,
    // Lower max fade speed so particles can reach lower on screen
    fadeSpeed: 0.001 + Math.random() * 0.002,
    wobblePhase: Math.random() * Math.PI * 2,
    wobbleSpeed: 0.008 + Math.random() * 0.01,
  };
}

for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push(createParticle());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    // Fade out over time (random per particle)
    p.opacity -= p.fadeSpeed;
    if (p.opacity <= 0) {
      // Immediately respawn from the top
      Object.assign(p, createParticle());
      return;
    }

    // Drift + gentle sway
    p.y += p.speedY;
    p.x += p.speedX + p.drift + Math.sin(p.wobblePhase) * 0.35;
    p.wobblePhase += p.wobbleSpeed;

    // Rotate like a leaf tumbling in the air
    p.angle += p.angularSpeed;

    ctx.save();
    ctx.globalAlpha = p.opacity;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.shadowColor = 'rgba(172, 243, 255, 0.98)';
    ctx.shadowBlur = 15;
    ctx.drawImage(particleImage, -p.size / 2, -p.size / 2, p.size, p.size);
    ctx.restore();

    // Wrap particles around so they continually float
    if (p.x < -80) p.x = canvas.width + 80;
    if (p.x > canvas.width + 80) p.x = -80;
    if (p.y > canvas.height + 80) p.y = -80;
    if (p.y < -80) p.y = canvas.height + 80;
  });

  requestAnimationFrame(animate);
}

animate();