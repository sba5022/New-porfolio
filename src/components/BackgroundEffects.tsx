"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

export default function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Mouse Spotlight Follow
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isHovering) setIsHovering(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHovering]);

  // Canvas Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 45;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.25 + 0.05,
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around bounds
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 107, 84, ${p.alpha})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = "#ff6b54";
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    drawParticles();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-background">
      {/* 1. Grid Overlay */}
      <div className="absolute inset-0 grid-overlay opacity-30"></div>

      {/* 2. Noise Overlay */}
      <div className="noise-overlay"></div>

      {/* 3. Mouse Spotlight Glow */}
      {isHovering && (
        <div
          className="absolute inset-0 transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(450px at ${mousePos.x}px ${mousePos.y}px, rgba(255, 107, 84, 0.04), transparent 75%)`,
          }}
        />
      )}

      {/* 4. Floating Blurred Gradient Blobs */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-accent/8 blur-[100px] -top-20 -left-20"
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 40, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-primary/4 blur-[120px] bottom-10 right-10"
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -40, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 5. Canvas Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      
      {/* 6. Geometric Background Lines/Shapes */}
      <div className="absolute top-1/4 right-[10%] w-[120px] h-[120px] border border-outline-variant/10 rounded-lg rotate-12 pointer-events-none opacity-20 hidden md:block"></div>
      <div className="absolute bottom-1/4 left-[8%] w-[80px] h-[80px] border-t-2 border-l-2 border-outline-variant/10 rounded-tl-full pointer-events-none opacity-20 hidden md:block"></div>
    </div>
  );
}
