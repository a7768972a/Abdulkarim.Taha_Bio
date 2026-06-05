'use client';

import { useEffect, useRef } from 'react';

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  speed: number;
  drift: number;
  opacity: number;
  wobble: number;
  wobbleSpeed: number;
}

export default function SnowBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create snowflakes
    const snowflakeCount = Math.floor((width * height) / 4000);
    const snowflakes: Snowflake[] = [];

    for (let i = 0; i < snowflakeCount; i++) {
      snowflakes.push(createSnowflake());
    }

    function createSnowflake(): Snowflake {
      return {
        x: Math.random() * width,
        y: Math.random() * -height,
        radius: Math.random() * 2.5 + 0.5,
        speed: Math.random() * 1.2 + 0.3,
        drift: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.6 + 0.3,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.02 + 0.005,
      };
    }

    function drawSnowflake(sf: Snowflake) {
      if (!ctx) return;
      ctx.beginPath();
      ctx.arc(sf.x, sf.y, sf.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${sf.opacity})`;
      ctx.fill();

      // Add a subtle glow to bigger snowflakes
      if (sf.radius > 1.5) {
        ctx.beginPath();
        ctx.arc(sf.x, sf.y, sf.radius * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 220, 255, ${sf.opacity * 0.15})`;
        ctx.fill();
      }
    }

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Draw night sky gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#0a0e1a');
      gradient.addColorStop(0.4, '#0f1729');
      gradient.addColorStop(0.7, '#141e33');
      gradient.addColorStop(1, '#1a2540');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw subtle stars
      for (const star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.twinkle})`;
        ctx.fill();
      }

      // Update and draw snowflakes
      for (const sf of snowflakes) {
        sf.wobble += sf.wobbleSpeed;
        sf.x += sf.drift + Math.sin(sf.wobble) * 0.3;
        sf.y += sf.speed;

        drawSnowflake(sf);

        // Reset snowflake if it falls off screen
        if (sf.y > height + 10) {
          sf.y = -10;
          sf.x = Math.random() * width;
          sf.drift = (Math.random() - 0.5) * 0.5;
          sf.speed = Math.random() * 1.2 + 0.3;
          sf.opacity = Math.random() * 0.6 + 0.3;
        }
        if (sf.x < -10) sf.x = width + 10;
        if (sf.x > width + 10) sf.x = -10;
      }

      animationRef.current = requestAnimationFrame(animate);
    }

    // Create stars
    const starCount = Math.floor((width * height) / 8000);
    const stars: { x: number; y: number; radius: number; twinkle: number; speed: number; phase: number }[] = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.6, // Stars only in upper portion
        radius: Math.random() * 1.2 + 0.2,
        twinkle: Math.random() * 0.5 + 0.2,
        speed: Math.random() * 0.01 + 0.002,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Twinkle stars
    const twinkleStars = () => {
      for (const star of stars) {
        star.phase += star.speed;
        star.twinkle = 0.2 + Math.abs(Math.sin(star.phase)) * 0.6;
      }
    };

    const originalAnimate = animate;
    const animateWithTwinkle = () => {
      twinkleStars();
      originalAnimate();
    };

    // Override animate to include twinkling
    animationRef.current = requestAnimationFrame(function loop() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Draw night sky gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#0a0e1a');
      gradient.addColorStop(0.4, '#0f1729');
      gradient.addColorStop(0.7, '#141e33');
      gradient.addColorStop(1, '#1a2540');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw stars
      for (const star of stars) {
        star.phase += star.speed;
        star.twinkle = 0.15 + Math.abs(Math.sin(star.phase)) * 0.65;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 230, 255, ${star.twinkle})`;
        ctx.fill();
      }

      // Draw moon
      ctx.beginPath();
      ctx.arc(width * 0.85, height * 0.12, 30, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(240, 245, 255, 0.9)';
      ctx.fill();
      // Moon glow
      ctx.beginPath();
      ctx.arc(width * 0.85, height * 0.12, 50, 0, Math.PI * 2);
      const moonGlow = ctx.createRadialGradient(
        width * 0.85, height * 0.12, 20,
        width * 0.85, height * 0.12, 60
      );
      moonGlow.addColorStop(0, 'rgba(200, 220, 255, 0.15)');
      moonGlow.addColorStop(1, 'rgba(200, 220, 255, 0)');
      ctx.fillStyle = moonGlow;
      ctx.fill();

      // Update and draw snowflakes
      for (const sf of snowflakes) {
        sf.wobble += sf.wobbleSpeed;
        sf.x += sf.drift + Math.sin(sf.wobble) * 0.3;
        sf.y += sf.speed;

        drawSnowflake(sf);

        if (sf.y > height + 10) {
          sf.y = -10;
          sf.x = Math.random() * width;
          sf.drift = (Math.random() - 0.5) * 0.5;
          sf.speed = Math.random() * 1.2 + 0.3;
          sf.opacity = Math.random() * 0.6 + 0.3;
        }
        if (sf.x < -10) sf.x = width + 10;
        if (sf.x > width + 10) sf.x = -10;
      }

      animationRef.current = requestAnimationFrame(loop);
    });

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ pointerEvents: 'none' }}
    />
  );
}
