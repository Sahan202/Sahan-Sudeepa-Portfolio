'use client';

import { useEffect, useRef } from 'react';

/* A lightweight particle field inspired by React Bits' Particles background. */

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  phase: number;
  color: number;
};

type Streak = {
  x: number;
  y: number;
  length: number;
  speed: number;
  alpha: number;
  color: number;
};

const darkPalette = ['#e9b783', '#c77c76', '#8b6c9b'];
const lightPalette = ['#8c5024', '#704731', '#634855'];

function toRgb(hex: string) {
  const value = parseInt(hex.replace('#', ''), 16);
  return `${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}`;
}

function getPalette() {
  const palette =
    document.documentElement.dataset.theme === 'light'
      ? lightPalette
      : darkPalette;
  return palette.map(toRgb);
}

function random(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function createParticle(width: number, height: number): Particle {
  return {
    x: random(0, width),
    y: random(0, height),
    vx: random(-0.16, 0.16),
    vy: random(-0.1, 0.1),
    radius: random(0.7, 2.1),
    alpha: random(0.24, 0.74),
    phase: random(0, Math.PI * 2),
    color: Math.floor(random(0, darkPalette.length)),
  };
}

function createStreak(width: number, height: number): Streak {
  return {
    x: random(-width, width),
    y: random(0, height),
    length: random(26, 110),
    speed: random(0.3, 1.05),
    alpha: random(0.06, 0.2),
    color: Math.floor(random(0, darkPalette.length)),
  };
}

export function AmbientParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const pointer = { x: -1000, y: -1000, active: false };
    let width = 0;
    let height = 0;
    let devicePixelRatio = 1;
    let particles: Particle[] = [];
    let streaks: Streak[] = [];
    let palette = getPalette();
    let frameId = 0;
    let lastTime = performance.now();
    let isVisible = document.visibilityState === 'visible';

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      devicePixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(width * devicePixelRatio);
      canvas.height = Math.floor(height * devicePixelRatio);
      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

      const particleCount = Math.min(
        124,
        Math.max(48, Math.round((width * height) / 13_500))
      );
      particles = Array.from({ length: particleCount }, () =>
        createParticle(width, height)
      );
      streaks = Array.from(
        { length: Math.min(18, Math.max(8, Math.round(width / 100))) },
        () => createStreak(width, height)
      );
    };

    const draw = (elapsed: number, delta: number) => {
      context.clearRect(0, 0, width, height);

      const linkDistance = Math.min(175, Math.max(125, width * 0.13));
      const motionScale = reduceMotion ? 0 : delta;

      for (const streak of streaks) {
        streak.x += streak.speed * motionScale;
        streak.y -= streak.speed * 0.17 * motionScale;
        if (streak.x - streak.length > width || streak.y < -40) {
          streak.x = -streak.length - random(0, width * 0.6);
          streak.y = random(height * 0.2, height * 1.1);
        }
        context.beginPath();
        context.moveTo(streak.x, streak.y);
        context.lineTo(
          streak.x - streak.length,
          streak.y + streak.length * 0.28
        );
        context.strokeStyle = `rgba(${palette[streak.color]}, ${streak.alpha})`;
        context.lineWidth = 0.8;
        context.stroke();
      }

      for (const particle of particles) {
        const sway = Math.sin(elapsed * 0.48 + particle.phase) * 0.018;
        particle.x += (particle.vx + sway) * motionScale;
        particle.y +=
          (particle.vy + Math.cos(elapsed * 0.37 + particle.phase) * 0.012) *
          motionScale;

        if (pointer.active && !reduceMotion) {
          const dx = particle.x - pointer.x;
          const dy = particle.y - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 180 && distance > 0) {
            const force = ((180 - distance) / 180) * 0.018;
            particle.x += (dx / distance) * force * delta;
            particle.y += (dy / distance) * force * delta;
          }
        }

        if (particle.x < -24) particle.x = width + 24;
        if (particle.x > width + 24) particle.x = -24;
        if (particle.y < -24) particle.y = height + 24;
        if (particle.y > height + 24) particle.y = -24;
      }

      context.lineWidth = 0.55;
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const first = particles[i];
          const second = particles[j];
          const distance = Math.hypot(first.x - second.x, first.y - second.y);
          if (distance > linkDistance) continue;
          const opacity = (1 - distance / linkDistance) * 0.16;
          context.beginPath();
          context.moveTo(first.x, first.y);
          context.lineTo(second.x, second.y);
          context.strokeStyle = `rgba(${palette[first.color]}, ${opacity})`;
          context.stroke();
        }
      }

      for (const particle of particles) {
        const pulse = 0.76 + Math.sin(elapsed * 1.6 + particle.phase) * 0.24;
        const radius = particle.radius * pulse;
        const glow = context.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          radius * 8
        );
        glow.addColorStop(
          0,
          `rgba(${palette[particle.color]}, ${particle.alpha * 0.8})`
        );
        glow.addColorStop(1, `rgba(${palette[particle.color]}, 0)`);
        context.fillStyle = glow;
        context.beginPath();
        context.arc(particle.x, particle.y, radius * 8, 0, Math.PI * 2);
        context.fill();
        context.fillStyle = `rgba(${palette[particle.color]}, ${particle.alpha})`;
        context.beginPath();
        context.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
        context.fill();
      }
    };

    const animate = (time: number) => {
      if (!isVisible) return;
      const delta = Math.min(2, Math.max(0, time - lastTime) / 16.667);
      lastTime = time;
      draw(time * 0.001, delta);
      frameId = requestAnimationFrame(animate);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    const onVisibilityChange = () => {
      isVisible = document.visibilityState === 'visible';
      if (isVisible && !reduceMotion) {
        lastTime = performance.now();
        frameId = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(frameId);
      }
    };

    const themeObserver = new MutationObserver(() => {
      palette = getPalette();
    });

    resize();
    draw(0, 0);
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibilityChange);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    if (!reduceMotion) {
      frameId = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      themeObserver.disconnect();
    };
  }, []);

  return (
    <div className="ambient-particle-field" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
