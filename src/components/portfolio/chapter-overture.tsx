'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

const chapters = {
  about: {
    number: '01',
    label: 'THE HUMAN BEHIND THE CODE',
    first: 'Curiosity.',
    second: 'Made real.',
    copy: 'I’m Sahan. A software engineer in the making, turning thoughtful ideas into things people can use.',
    word: 'HUMAN',
    link: 'Meet the developer',
    target: 'about',
  },
  projects: {
    number: '02',
    label: 'SELECTED DIGITAL EXPERIENCES',
    first: 'Less theory.',
    second: 'More making.',
    copy: 'AI experiments. Full-stack products. Interfaces with a little more personality. This is where the ideas become real.',
    word: 'WORK',
    link: 'Explore the projects',
    target: 'projects',
  },
  skills: {
    number: '03',
    label: 'THE TOOLS BEHIND THE THINKING',
    first: 'Many tools.',
    second: 'One mindset.',
    copy: 'From the first component to the final API. A connected toolkit for building the entire experience.',
    word: 'BUILD',
    link: 'Inside the toolkit',
    target: 'skills',
  },
  contact: {
    number: '04',
    label: 'THE NEXT CHAPTER IS OPEN',
    first: 'Your idea.',
    second: 'Our next move.',
    copy: 'Have something in mind? Let’s turn a conversation into something worth putting out into the world.',
    word: 'HELLO',
    link: 'Start a conversation',
    target: 'contact',
  },
};

export type ChapterScene = keyof typeof chapters;

export function ChapterOverture({ scene }: { scene: ChapterScene }) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const scrollYProgress = useMotionValue(0);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let frame = 0;
    // Measure the untransformed track. This also handles restored scroll and
    // dynamic project filters without relying on cached native timeline bounds.
    const measure = () => {
      frame = 0;
      const box = element.getBoundingClientRect();
      element.dataset.ready = 'true';
      scrollYProgress.set(
        Math.max(
          0,
          Math.min(1, (innerHeight - box.top) / (box.height + innerHeight))
        )
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    const resize = new ResizeObserver(schedule);
    resize.observe(document.body);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    measure();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [scrollYProgress]);
  const reveal = useTransform(
    scrollYProgress,
    [0, 0.32],
    ['inset(14% 8% 14% 8% round 80px)', 'inset(0% 0% 0% 0% round 0px)']
  );
  const x = useTransform(
    scrollYProgress,
    [0, 0.34, 0.65, 1],
    ['6%', '0%', '-2%', '-10%']
  );
  const secondX = useTransform(
    scrollYProgress,
    [0, 0.34, 0.65, 1],
    ['-6%', '0%', '2%', '10%']
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.35, 0.7, 1],
    [0.85, 1, 1.04, 1.12]
  );
  const rotate = useTransform(scrollYProgress, [0, 1], [-12, 18]);
  const visualY = useTransform(scrollYProgress, [0, 1], ['12%', '-12%']);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.7, 0.96],
    [0, 1, 1, 0]
  );
  const wordX = useTransform(scrollYProgress, [0, 1], ['18%', '-24%']);
  const wash = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['0%', '45%', '100%']
  );
  const chapter = chapters[scene];

  return (
    <div className="chapter-overture" ref={root} data-overture={scene}>
      <motion.section
        className="overture-stage"
        aria-label={`${chapter.target} introduction`}
        style={reduced ? undefined : { clipPath: reveal }}
      >
        <motion.div
          className="overture-wash"
          aria-hidden="true"
          style={reduced ? undefined : { left: wash, rotate }}
        />
        <div className="overture-grid" aria-hidden="true" />
        <div className="overture-topline">
          <span>
            {chapter.number} / {chapter.label}
          </span>
          <span>SAHAN — SELECTED CHAPTERS</span>
        </div>
        <motion.div
          className="overture-watermark"
          aria-hidden="true"
          style={reduced ? undefined : { x: wordX }}
        >
          {chapter.word}
        </motion.div>
        <motion.div
          className={`overture-art overture-art-${scene}`}
          aria-hidden="true"
          style={reduced ? undefined : { scale, rotate, y: visualY }}
        >
          {scene === 'projects' ? (
            <div className="overture-browser">
              <div className="overture-browser-bar">
                <i />
                <i />
                <i />
                <span>SELECTED WORK / KRISH FX</span>
              </div>
              <Image
                src="/images/krish-fx-landing.png"
                alt=""
                width={1200}
                height={800}
                sizes="(max-width: 767px) 80vw, 48vw"
              />
            </div>
          ) : scene === 'skills' ? (
            <div className="overture-tool-orbit">
              <span>React</span>
              <span>Next.js</span>
              <span>Python</span>
              <span>TypeScript</span>
              <b>{'{ }'}</b>
            </div>
          ) : scene === 'contact' ? (
            <ArrowUpRight className="overture-arrow" strokeWidth={0.65} />
          ) : (
            <div className="overture-sculpture">
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <span>
                Always
                <br />
                curious.
              </span>
            </div>
          )}
        </motion.div>
        <motion.div
          className="overture-copy"
          style={reduced ? undefined : { opacity }}
        >
          <h2>
            <motion.span style={reduced ? undefined : { x }}>
              {chapter.first}
            </motion.span>
            <motion.em style={reduced ? undefined : { x: secondX }}>
              {chapter.second}
            </motion.em>
          </h2>
          <p>{chapter.copy}</p>
          <a href={`#${chapter.target}`}>
            {chapter.link}
            <ArrowDownRight size={21} />
          </a>
        </motion.div>
        <div className="overture-bottom">
          <span>SCROLL TO DISCOVER</span>
          <div>
            <motion.i
              style={reduced ? undefined : { scaleX: scrollYProgress }}
            />
          </div>
          <span>{chapter.number} — 04</span>
        </div>
      </motion.section>
    </div>
  );
}
