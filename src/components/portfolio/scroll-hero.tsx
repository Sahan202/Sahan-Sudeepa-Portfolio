'use client';

import {
  motion,
  useReducedMotion,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { ArrowDown, ArrowUpRight, Pause, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { WireframeFigure } from './wireframe-figure';

export function ScrollHero() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const scrollYProgress = useMotionValue(0);
  useEffect(() => {
    const section = root.current;
    if (!section) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const box = section.getBoundingClientRect();
      scrollYProgress.set(
        reduced
          ? 0
          : Math.max(
              0,
              Math.min(
                1,
                -box.top / Math.max(1, box.height - window.innerHeight)
              )
            )
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(section);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    measure();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [scrollYProgress, reduced]);
  const introOpacity = useTransform(scrollYProgress, [0, 0.16, 0.3], [1, 1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const introScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.3]);
  const stageColor = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    ['#10110f', '#263d39', '#6b4535']
  );
  const glowX = useTransform(scrollYProgress, [0, 1], ['-55%', '45%']);
  const glowRotate = useTransform(scrollYProgress, [0, 1], [-30, 90]);
  const middleOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.34, 0.6, 0.72],
    [0, 1, 1, 0]
  );
  const middleY = useTransform(
    scrollYProgress,
    [0.2, 0.48, 0.72],
    [100, 0, -100]
  );
  const endOpacity = useTransform(scrollYProgress, [0.67, 0.84, 1], [0, 1, 1]);
  const endY = useTransform(scrollYProgress, [0.67, 1], [80, 0]);
  const number = useTransform(scrollYProgress, (p): string =>
    p < 0.28 ? '01' : p < 0.7 ? '02' : '03'
  );
  const chapter = useTransform(scrollYProgress, (p): string =>
    p < 0.28
      ? 'THE INTRODUCTION'
      : p < 0.7
        ? 'THE HUMAN SIDE'
        : 'THE POSSIBILITIES'
  );

  return (
    <section
      id="home"
      className="scroll-hero"
      ref={root}
      aria-label="Introduction"
    >
      <motion.div
        className="scroll-stage"
        style={reduced ? undefined : { backgroundColor: stageColor }}
      >
        <motion.div
          className="hero-scene-glow"
          aria-hidden="true"
          style={reduced ? undefined : { x: glowX, rotate: glowRotate }}
        />
        <div className="scroll-stage-grid" aria-hidden="true" />
        <div className="scroll-topline">
          <span className="availability">
            <span /> Available for opportunities
          </span>
          <span className="mono">
            SRI LANKA <span className="scroll-small-star">✳</span> WORLDWIDE
          </span>
        </div>

        <WireframeFigure progress={scrollYProgress} paused={paused} />

        <motion.div
          className="scroll-intro"
          style={
            reduced
              ? undefined
              : { opacity: introOpacity, y: introY, scale: introScale }
          }
        >
          <p className="eyebrow">A LITTLE CURIOSITY. A LOT OF POSSIBILITY.</p>
          <h1>
            SAHAN
            <br />
            <span>
              SUDEEPA<span className="scroll-period">.</span>
            </span>
          </h1>
          <p className="scroll-role">
            Software Engineer <span>&</span> Full-Stack Developer
          </p>
        </motion.div>

        <motion.div
          className="scroll-statement scroll-statement-middle"
          aria-hidden="true"
          style={{ opacity: middleOpacity, y: middleY }}
        >
          <span className="eyebrow">
            THOUGHTFUL INTERFACES. SOLID ENGINEERING.
          </span>
          <p>
            I give ideas
            <br />a <em>human</em> touch.
          </p>
        </motion.div>
        <motion.div
          className="scroll-statement scroll-statement-end"
          aria-hidden="true"
          style={{ opacity: endOpacity, y: endY }}
        >
          <span className="eyebrow">
            FROM THE FIRST QUESTION TO THE FINAL DETAIL.
          </span>
          <p>
            Built with purpose.
            <br />
            <em>Made to matter.</em>
          </p>
        </motion.div>

        <div className="scroll-side-note" aria-hidden="true">
          <span>DESIGN</span>
          <i />
          <span>DEVELOPMENT</span>
          <i />
          <span>EXPERIMENTS</span>
        </div>
        <div className="scroll-bottom">
          <div className="scroll-chapter" aria-hidden="true">
            <motion.span>{number}</motion.span>
            <div>
              <motion.span>{chapter}</motion.span>
              <div className="scroll-chapter-track">
                <motion.i style={{ scaleX: scrollYProgress }} />
              </div>
            </div>
            <span>/ 03</span>
          </div>
          <div className="scroll-hero-links">
            <a className="scroll-work-link" href="#projects">
              Explore my work <ArrowUpRight size={19} />
            </a>
            <a className="scroll-about-link" href="#about">
              Meet the developer <ArrowDown size={15} />
            </a>
          </div>
        </div>
        <div className="scroll-cue">
          <ArrowDown size={13} />
          <span>SCROLL TO UNFOLD</span>
        </div>
        {!reduced && (
          <button
            className="scroll-motion-toggle"
            onClick={() => setPaused(!paused)}
            aria-label={paused ? 'Resume figure motion' : 'Pause figure motion'}
            aria-pressed={paused}
          >
            {paused ? <Play size={13} /> : <Pause size={13} />}
            <span>Motion {paused ? 'off' : 'on'}</span>
          </button>
        )}
      </motion.div>
    </section>
  );
}
