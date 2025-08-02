"use client";

import { useEffect, useRef } from "react";
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 300;

    startTimeRef.current = Date.now();
    particlesRef.current = [];

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTimeRef.current;

      // Clear canvas
      ctx.fillStyle = "rgba(17, 24, 39, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

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
  }, [element1, element2, reaction, onComplete]);

  const createParticles = (
    animationType: string,
    width: number,
    height: number,
  ) => {
    const centerX = width / 2;
    const centerY = height / 2;

    switch (animationType) {
      case "water":
        // Blue droplets falling
        for (let i = 0; i < 3; i++) {
          particlesRef.current.push({
            x: centerX + (Math.random() - 0.5) * 100,
            y: centerY - 50,
            vx: (Math.random() - 0.5) * 2,
            vy: Math.random() * 3 + 2,
            size: Math.random() * 8 + 4,
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
            x: centerX + (Math.random() - 0.5) * 80,
            y: centerY + (Math.random() - 0.5) * 80,
            vx: 0,
            vy: 0,
            size: Math.random() * 6 + 3,
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
            vx: (Math.random() - 0.5) * 1,
            vy: -Math.random() * 2 - 1,
            size: Math.random() * 15 + 8,
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
            size: Math.random() * 4 + 2,
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
            x: centerX + (Math.random() - 0.5) * 100,
            y: centerY + (Math.random() - 0.5) * 100,
            vx: (Math.random() - 0.5) * 0.5,
            vy: Math.random() * 1 + 0.5,
            size: Math.random() * 8 + 4,
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
            x: centerX + (Math.random() - 0.5) * 80,
            y: centerY,
            vx: (Math.random() - 0.5) * 2,
            vy: -Math.random() * 1.5 - 0.5,
            size: Math.random() * 12 + 6,
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
            x: centerX + (Math.random() - 0.5) * 60,
            y: centerY + 20,
            vx: (Math.random() - 0.5) * 1,
            vy: -Math.random() * 2 - 1,
            size: Math.random() * 10 + 5,
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
            x: centerX + (Math.random() - 0.5) * 70,
            y: centerY,
            vx: (Math.random() - 0.5) * 1.5,
            vy: -Math.random() * 1 - 0.5,
            size: Math.random() * 14 + 7,
            color: `rgba(255, 255, 0, ${0.4 + Math.random() * 0.3})`,
            life: 80,
            maxLife: 80,
            type: "toxic",
          });
        }
        break;

      case "impossible":
        // Red X or failure particles
        for (let i = 0; i < 3; i++) {
          particlesRef.current.push({
            x: centerX + (Math.random() - 0.5) * 40,
            y: centerY + (Math.random() - 0.5) * 40,
            vx: 0,
            vy: 0,
            size: Math.random() * 6 + 4,
            color: `hsl(0, 80%, ${50 + Math.random() * 30}%)`,
            life: 80,
            maxLife: 80,
            type: "spark",
          });
        }
        break;

      case "alloy":
        // Metallic glitter
        for (let i = 0; i < 6; i++) {
          particlesRef.current.push({
            x: centerX + (Math.random() - 0.5) * 60,
            y: centerY + (Math.random() - 0.5) * 60,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 3 + 1,
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
            x: centerX + (Math.random() - 0.5) * 80,
            y: centerY,
            vx: (Math.random() - 0.5) * 2,
            vy: -Math.random() * 2 - 1,
            size: Math.random() * 10 + 5,
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
            size: Math.random() * 6 + 3,
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
            x: centerX + (Math.random() - 0.5) * 60,
            y: centerY,
            vx: (Math.random() - 0.5) * 2,
            vy: -Math.random() * 2 - 1,
            size: Math.random() * 8 + 4,
            color: `hsl(${Math.random() * 360}, 60%, 60%)`,
            life: 60,
            maxLife: 60,
            type: "smoke",
          });
        }
    }
  };

  const updateParticles = (ctx: CanvasRenderingContext2D) => {
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
          ctx.beginPath();
          ctx.arc(
            particle.x,
            particle.y,
            particle.size * alpha,
            0,
            Math.PI * 2,
          );
          ctx.fill();
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
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="border border-gray-600 rounded-lg bg-gray-900"
          width={400}
          height={300}
        />

        {/* Reaction info overlay */}
        <div className="absolute top-2 left-2 bg-black bg-opacity-75 rounded px-2 py-1 text-sm text-white">
          {element1.symbol} + {element2.symbol} → {reaction.productFormula}
        </div>

        {/* Energy indicator */}
        <div
          className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold ${
            reaction.energyChange === "exothermic"
              ? "bg-red-600 text-white"
              : "bg-blue-600 text-white"
          }`}
        >
          {reaction.energyChange === "exothermic"
            ? "🔥 Releases Heat"
            : "❄️ Absorbs Heat"}
        </div>

        {/* Temperature and pressure indicators */}
        {reaction.temperature && reaction.temperature > 298 && (
          <div className="absolute bottom-2 left-2 bg-orange-600 bg-opacity-90 rounded px-2 py-1 text-xs text-white">
            🌡️ {reaction.temperature}K
          </div>
        )}

        {reaction.pressure && reaction.pressure > 1 && (
          <div className="absolute bottom-2 right-2 bg-purple-600 bg-opacity-90 rounded px-2 py-1 text-xs text-white">
            ⚡ {reaction.pressure} atm
          </div>
        )}

        {reaction.catalyst && (
          <div className="absolute bottom-8 right-2 bg-green-600 bg-opacity-90 rounded px-2 py-1 text-xs text-white">
            🧪 {reaction.catalyst}
          </div>
        )}
      </div>

      {/* Reaction details */}
      <div className="text-center max-w-md">
        <h3 className="text-xl font-bold text-white mb-2">
          {reaction.productName}
        </h3>
        <p className="text-gray-300 text-sm mb-2">{reaction.description}</p>
        <p className="text-cyan-400 text-xs font-mono">
          {reaction.balancedEquation}
        </p>
      </div>
    </div>
  );
};
