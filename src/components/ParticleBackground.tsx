import { memo, useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

const ParticleBackgroundComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 }); // start far away
  const animationRef = useRef<number | null>(null);
  const dprRef = useRef<number>(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // keep device pixel ratio to improve crispness and avoid resize flicker
    const setSize = () => {
      const dpr = window.devicePixelRatio || 1;
      dprRef.current = dpr;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createParticles = () => {
      const count = Math.min(60, Math.floor(window.innerWidth / 30));
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1,
      }));
    };

    let running = true;

    const animate = () => {
      if (!running) return;
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // draw particles and connections
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // simple wrap to avoid expensive boundary flips
        if (p.x < -10) p.x = window.innerWidth + 10;
        if (p.x > window.innerWidth + 10) p.x = -10;
        if (p.y < -10) p.y = window.innerHeight + 10;
        if (p.y > window.innerHeight + 10) p.y = -10;

        // mouse interaction (cheap)
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 0) {
          const f = (120 - dist) / 120;
          p.vx -= (dx / dist) * f * 0.01;
          p.vy -= (dy / dist) * f * 0.01;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(187, 80%, 55%, ${p.opacity})`;
        ctx.fill();

        // connections
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dd = (p.x - q.x) ** 2 + (p.y - q.y) ** 2;
          if (dd < 120 * 120) {
            const alpha = 0.12 * (1 - Math.sqrt(dd) / 120);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `hsla(187, 80%, 55%, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // throttle mouse updates to avoid forcing paints on every tiny move
    let lastMouseTs = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastMouseTs < 16) return; // ~60fps cap on mouse updates to reduce churn
      lastMouseTs = now;
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    // use passive listener for performance
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", () => {
      setSize();
      createParticles();
    });

    // initialize once
    setSize();
    createParticles();
    animate();

    // cleanup
    return () => {
      running = false;
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", () => {
        /* noop cleanup */
      });
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none -z-10"
      style={{
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
        willChange: "transform",
        display: "block",
        zIndex: -10,
      }}
    />
  );
};

export const ParticleBackground = memo(ParticleBackgroundComponent);
ParticleBackground.displayName = "ParticleBackground";
