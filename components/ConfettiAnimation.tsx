"use client";

import { useEffect, useState } from "react";

export default function ConfettiAnimation() {
  const [confetti, setConfetti] = useState<
    Array<{
      id: number;
      left: number;
      animationDuration: number;
      animationDelay: number;
      color: string;
    }>
  >([]);

  useEffect(() => {
    // Generiere 50 Konfetti-Partikel
    const colors = ["#3b82f6", "#f59e0b", "#ef4444", "#10b981", "#8b5cf6"];
    const particles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 2 + Math.random() * 2,
      animationDelay: Math.random() * 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setConfetti(particles);

    // Entferne Konfetti nach 4 Sekunden
    const timeout = setTimeout(() => {
      setConfetti([]);
    }, 4000);

    return () => clearTimeout(timeout);
  }, []);

  if (confetti.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confetti.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-3 h-3 rounded-full animate-confetti-fall"
          style={{
            left: `${particle.left}%`,
            top: "-10px",
            backgroundColor: particle.color,
            animationDuration: `${particle.animationDuration}s`,
            animationDelay: `${particle.animationDelay}s`,
          }}
        />
      ))}
    </div>
  );
}
