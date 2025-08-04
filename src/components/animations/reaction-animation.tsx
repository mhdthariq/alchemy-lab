"use client";

import { useEffect, useRef, useCallback } from "react";
import { Element, Reaction } from "@/lib/data";

interface ReactionAnimationProps {
  element1: Element;
  element2: Element;
  reaction: Reaction;
  onComplete?: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
  type: "spark" | "smoke" | "bubble" | "flame" | "crystal" | "toxic";
}

export const ReactionAnimation = ({
  element1,
  element2,
  reaction,
  onComplete,
}: ReactionAnimationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const startTimeRef = useRef<number>(0);

  const createParticles = useCallback(
    (animationType: string, width: number, height: number) => {
      const centerX = width / 2;
      const centerY = height / 2;

      switch (animationType) {
        case "water":
          // Blue droplets falling
          for (let i = 0; i < 3; i++) {
            particlesRef.current.push({
              x: centerX + (Math.random() - 0.5) * 60,
              y: centerY - 30,
              vx: (Math.random() - 0.5) * 2,
              vy: Math.random() * 3 + 2,
              size: Math.random() * 12 + 8,
              color: `hsl(200, 80%, ${50 + Math.random() * 30}%)`,
              life: 60,
              maxLife: 60,
              type: "bubble",
            });
          }
          break;

        case "salt":
          // Crystalline formation
          for (let i = 0; i < 2; i++) {
            particlesRef.current.push({
              x: centerX + (Math.random() - 0.5) * 50,
              y: centerY + (Math.random() - 0.5) * 40,
              vx: 0,
              vy: 0,
              size: Math.random() * 10 + 8,
              color: `hsl(0, 0%, ${80 + Math.random() * 20}%)`,
              life: 120,
              maxLife: 120,
              type: "crystal",
            });
          }
          break;

        case "carbonMonoxide":
        case "carbonDioxide":
          // Dark smoke
          for (let i = 0; i < 4; i++) {
            particlesRef.current.push({
              x: centerX + (Math.random() - 0.5) * 60,
              y: centerY,
              vx: (Math.random() - 0.5) * 2,
              vy: -Math.random() * 3 - 1,
              size: Math.random() * 20 + 12,
              color: `rgba(60, 60, 60, ${0.6 + Math.random() * 0.4})`,
              life: 80,
              maxLife: 80,
              type: "smoke",
            });
          }
          break;

        case "magnesiumOxide":
        case "aluminumOxide":
        case "calciumOxide":
          // Bright white sparks
          for (let i = 0; i < 8; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 4 + 2;
            particlesRef.current.push({
              x: centerX,
              y: centerY,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              size: Math.random() * 8 + 6,
              color: `hsl(60, 100%, ${80 + Math.random() * 20}%)`,
              life: 40,
              maxLife: 40,
              type: "spark",
            });
          }
          break;

        case "ironOxide":
          // Reddish rust particles
          for (let i = 0; i < 5; i++) {
            particlesRef.current.push({
              x: centerX + (Math.random() - 0.5) * 60,
              y: centerY + (Math.random() - 0.5) * 50,
              vx: (Math.random() - 0.5) * 1,
              vy: Math.random() * 2 + 1,
              size: Math.random() * 12 + 8,
              color: `hsl(${15 + Math.random() * 10}, 70%, ${40 + Math.random() * 20}%)`,
              life: 100,
              maxLife: 100,
              type: "smoke",
            });
          }
          break;

        case "ammonia":
          // Pungent green-yellow gas
          for (let i = 0; i < 6; i++) {
            particlesRef.current.push({
              x: centerX + (Math.random() - 0.5) * 60,
              y: centerY,
              vx: (Math.random() - 0.5) * 2,
              vy: -Math.random() * 2 - 1,
              size: Math.random() * 16 + 10,
              color: `rgba(173, 255, 47, ${0.5 + Math.random() * 0.3})`,
              life: 70,
              maxLife: 70,
              type: "toxic",
            });
          }
          break;

        case "methane":
          // Clear gas bubbles
          for (let i = 0; i < 4; i++) {
            particlesRef.current.push({
              x: centerX + (Math.random() - 0.5) * 50,
              y: centerY + 15,
              vx: (Math.random() - 0.5) * 1,
              vy: -Math.random() * 2 - 1,
              size: Math.random() * 14 + 8,
              color: `rgba(200, 200, 255, ${0.3 + Math.random() * 0.4})`,
              life: 60,
              maxLife: 60,
              type: "bubble",
            });
          }
          break;

        case "hydrogenSulfide":
          // Yellow-green toxic gas
          for (let i = 0; i < 5; i++) {
            particlesRef.current.push({
              x: centerX + (Math.random() - 0.5) * 50,
              y: centerY,
              vx: (Math.random() - 0.5) * 1.5,
              vy: -Math.random() * 1 - 0.5,
              size: Math.random() * 18 + 12,
              color: `rgba(255, 255, 0, ${0.4 + Math.random() * 0.3})`,
              life: 80,
              maxLife: 80,
              type: "toxic",
            });
          }
          break;

        case "impossible":
          // Educational visualization showing non-reaction
          // Create bouncing particles that repel each other
          const element1Particles = 3;
          const element2Particles = 3;

          // Element 1 particles (left side)
          for (let i = 0; i < element1Particles; i++) {
            particlesRef.current.push({
              x: centerX - 40 + Math.random() * 25,
              y: centerY + (Math.random() - 0.5) * 40,
              vx: Math.random() * 1.5 + 1, // Moving toward center initially
              vy: (Math.random() - 0.5) * 1,
              size: Math.random() * 15 + 10,
              color: element1.color || "#ff6b6b",
              life: 120,
              maxLife: 120,
              type: "spark",
            });
          }

          // Element 2 particles (right side)
          for (let i = 0; i < element2Particles; i++) {
            particlesRef.current.push({
              x: centerX + 40 + Math.random() * 25,
              y: centerY + (Math.random() - 0.5) * 40,
              vx: -(Math.random() * 1.5 + 1), // Moving toward center initially
              vy: (Math.random() - 0.5) * 1,
              size: Math.random() * 15 + 10,
              color: element2.color || "#4ecdc4",
              life: 120,
              maxLife: 120,
              type: "spark",
            });
          }

          // Add some "barrier" particles to show repulsion
          if (Math.random() < 0.3) {
            particlesRef.current.push({
              x: centerX + (Math.random() - 0.5) * 15,
              y: centerY + (Math.random() - 0.5) * 15,
              vx: 0,
              vy: -1,
              size: 4,
              color: "rgba(255, 255, 255, 0.6)",
              life: 40,
              maxLife: 40,
              type: "spark",
            });
          }
          break;

        case "alloy":
          // Metallic glitter
          for (let i = 0; i < 6; i++) {
            particlesRef.current.push({
              x: centerX + (Math.random() - 0.5) * 50,
              y: centerY + (Math.random() - 0.5) * 40,
              vx: (Math.random() - 0.5) * 1,
              vy: (Math.random() - 0.5) * 1,
              size: Math.random() * 6 + 4,
              color: `hsl(${45 + Math.random() * 15}, 60%, ${70 + Math.random() * 20}%)`,
              life: 90,
              maxLife: 90,
              type: "spark",
            });
          }
          break;

        case "dangerous":
          // Purple toxic particles
          for (let i = 0; i < 7; i++) {
            particlesRef.current.push({
              x: centerX + (Math.random() - 0.5) * 60,
              y: centerY,
              vx: (Math.random() - 0.5) * 2,
              vy: -Math.random() * 2 - 1,
              size: Math.random() * 14 + 8,
              color: `rgba(147, 51, 234, ${0.6 + Math.random() * 0.4})`,
              life: 60,
              maxLife: 60,
              type: "toxic",
            });
          }
          break;

        case "radioactive":
          // Green glowing particles
          for (let i = 0; i < 8; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 3 + 1;
            particlesRef.current.push({
              x: centerX,
              y: centerY,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              size: Math.random() * 10 + 6,
              color: `hsl(120, 100%, ${50 + Math.random() * 30}%)`,
              life: 100,
              maxLife: 100,
              type: "spark",
            });
          }
          break;

        default:
          // Generic reaction
          for (let i = 0; i < 4; i++) {
            particlesRef.current.push({
              x: centerX + (Math.random() - 0.5) * 50,
              y: centerY,
              vx: (Math.random() - 0.5) * 2,
              vy: -Math.random() * 2 - 1,
              size: Math.random() * 12 + 8,
              color: `hsl(${Math.random() * 360}, 60%, 60%)`,
              life: 60,
              maxLife: 60,
              type: "smoke",
            });
          }
      }
    },
    [element1, element2],
  );

  const updateParticles = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      // Special physics for impossible reactions - particles repel each other
      if (reaction.animation === "impossible") {
        const centerX = ctx.canvas.width / 2;
        const centerY = ctx.canvas.height / 2;

        particlesRef.current.forEach((particle) => {
          // Apply repulsion from center
          const dx = particle.x - centerX;
          const dy = particle.y - centerY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 30 && distance > 0) {
            const repulsionForce = 0.4;
            particle.vx += (dx / distance) * repulsionForce;
            particle.vy += (dy / distance) * repulsionForce;
          }

          // Apply friction to slow down particles
          particle.vx *= 0.98;
          particle.vy *= 0.98;

          // Bounce off canvas edges
          if (particle.x <= 8 || particle.x >= ctx.canvas.width - 8) {
            particle.vx *= -0.8;
          }
          if (particle.y <= 8 || particle.y >= ctx.canvas.height - 8) {
            particle.vy *= -0.8;
          }
        });
      }

      particlesRef.current = particlesRef.current.filter((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Apply gravity for certain types
        if (particle.type === "bubble" || particle.type === "smoke") {
          particle.vy += 0.1;
        }

        // Fade out
        particle.life--;

        // Render particle
        const alpha = particle.life / particle.maxLife;
        ctx.save();

        switch (particle.type) {
          case "spark":
            ctx.shadowBlur = 20;
            ctx.shadowColor = particle.color;
            ctx.fillStyle = particle.color;
            ctx.globalAlpha = alpha;

            // Special handling for impossible reactions - show repulsion
            if (reaction.animation === "impossible") {
              // Gentle pulsing effect for educational visualization
              const pulse = Math.sin(Date.now() * 0.005) * 0.1 + 1;
              const size = particle.size * alpha * pulse;

              ctx.beginPath();
              ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
              ctx.fill();

              // Add subtle outer ring to show "no bonding"
              ctx.strokeStyle = particle.color;
              ctx.lineWidth = 1;
              ctx.globalAlpha = alpha * 0.3;
              ctx.beginPath();
              ctx.arc(particle.x, particle.y, size * 1.2, 0, Math.PI * 2);
              ctx.stroke();
            } else {
              ctx.beginPath();
              ctx.arc(
                particle.x,
                particle.y,
                particle.size * alpha,
                0,
                Math.PI * 2,
              );
              ctx.fill();
            }
            break;

          case "smoke":
            ctx.fillStyle = particle.color;
            ctx.globalAlpha = alpha * 0.7;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            break;

          case "bubble":
            ctx.strokeStyle = particle.color;
            ctx.fillStyle = particle.color.replace(/[\d.]+\)/, "0.1)");
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            break;

          case "flame":
            ctx.shadowBlur = 15;
            ctx.shadowColor = "#ff4500";
            ctx.fillStyle = particle.color;
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            break;

          case "crystal":
            ctx.fillStyle = particle.color;
            ctx.globalAlpha = alpha;
            ctx.fillRect(
              particle.x - particle.size / 2,
              particle.y - particle.size / 2,
              particle.size,
              particle.size,
            );
            break;

          case "toxic":
            ctx.shadowBlur = 10;
            ctx.shadowColor = particle.color;
            ctx.fillStyle = particle.color;
            ctx.globalAlpha = alpha * 0.8;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            break;
        }

        ctx.restore();

        return particle.life > 0;
      });
    },
    [reaction.animation],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 200;
    canvas.height = 150;

    startTimeRef.current = Date.now();
    particlesRef.current = [];

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTimeRef.current;

      // Clear canvas with transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create new particles based on reaction type
      if (elapsed < 3000) {
        createParticles(reaction.animation, canvas.width, canvas.height);
      }

      // Update and render particles
      updateParticles(ctx);

      // Continue animation
      if (elapsed < 4000) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        onComplete?.();
      }
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [
    element1,
    element2,
    reaction,
    onComplete,
    createParticles,
    updateParticles,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="rounded-lg mx-auto block"
      width={200}
      height={150}
      style={{ width: "200px", height: "150px" }}
    />
  );
};
