'use client';

import { useEffect, useRef, useState } from 'react';
import { useMotionValue } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import { WireframeFigure } from './wireframe-figure';

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const sculptures = [
  'radio',
  'knot',
  'laptop',
  'aviator',
  'gears',
  'book',
  'network',
  'pen',
  'paper-plane',
];

/** One scroll listener coordinates the entire page, including filtered projects. */
export function ScrollJourney({ detail = false }: { detail?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);
  const visibility = useMotionValue(0);
  const artwork = useMotionValue(sculptures[0]);
  const phase = useMotionValue(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const host = root.current;
    const main = host?.closest('main');
    if (!host || !main) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const title = host.querySelector<HTMLElement>('.journey-current');
    const number = host.querySelector<HTMLElement>('.journey-number');
    const track = host.querySelector<HTMLElement>('.journey-progress > i');
    const hero = main.querySelector<HTMLElement>('.scroll-hero');
    let scenes: HTMLElement[] = [];
    let slots: HTMLElement[] = [];
    let frame = 0;

    function draw() {
      frame = 0;
      const vh = innerHeight;
      const start = hero ? hero.offsetHeight - vh * 0.2 : 0;
      const shown = detail ? 1 : clamp((scrollY - start) / (vh * 0.35));
      host!.style.setProperty('--journey-visible', String(shown));
      host!.dataset.active = String(shown > 0.8);
      visibility.set(shown);
      const total = clamp(
        scrollY / Math.max(1, document.documentElement.scrollHeight - vh)
      );
      if (track) track.style.transform = `scaleX(${total})`;
      let current = 0;
      let local = 0;
      scenes.forEach((scene, index) => {
        const box = scene.getBoundingClientRect();
        const chapterBox =
          scene.closest('.chapter-world')?.getBoundingClientRect() || box;
        const entered = clamp((vh * 0.95 - box.top) / (vh * 0.5));
        const through = clamp(
          (vh * 0.6 - box.top) / Math.max(box.height, vh * 0.6)
        );
        if (chapterBox.top < (detail ? Math.min(240, vh * 0.3) : vh * 0.5)) {
          current = index;
          local = through;
        }
        // Scroll changes only these CSS variables, never the content's opacity.
        scene.style.setProperty(
          '--scene-enter',
          String(reduced.matches ? 1 : entered)
        );
        scene.style.setProperty(
          '--scene-progress',
          String(reduced.matches ? 0.5 : through)
        );
        scene.style.setProperty(
          '--scene-shift',
          `${reduced.matches ? 0 : (1 - entered) * 28}px`
        );
      });
      const scene = scenes[current];
      const label = scene?.dataset.scrollScene || 'Introduction';
      host!.dataset.chapter = label;
      if (title && title.textContent !== label) title.textContent = label;
      const indexLabel = String(current + 1).padStart(2, '0');
      if (number && number.textContent !== indexLabel)
        number.textContent = indexLabel;
      progress.set((current + local) / Math.max(1, scenes.length));
      phase.set(local);
      artwork.set(sculptures[current % sculptures.length]);
      host!.dataset.artwork = sculptures[current % sculptures.length];

      const grid = main!.querySelector<HTMLElement>('.project-grid');
      if (grid) {
        const top = grid.getBoundingClientRect().top;
        const gap = parseFloat(getComputedStyle(grid).rowGap) || 0;
        let offset = 0;
        const stack = !reduced.matches && innerWidth >= 1024 && vh >= 740;
        slots.forEach((slot, index) => {
          const naturalTop = top + offset;
          offset += slot.offsetHeight + gap;
          const obscured =
            stack && index < slots.length - 1 && top + offset < 170;
          if (slot.dataset.covered !== String(obscured)) {
            slot.dataset.covered = String(obscured);
            slot.dispatchEvent(new Event('portfolio-card-visibility'));
          }
          const covered = stack
            ? clamp((128 - naturalTop) / Math.max(slot.offsetHeight + 80, 1))
            : 0;
          slot.style.setProperty('--card-scale', String(1 - covered * 0.055));
          slot.style.setProperty(
            '--card-rise',
            `${reduced.matches ? 0 : clamp((naturalTop - vh * 0.5) / (vh * 0.5)) * 45}px`
          );
        });
      }
      main!
        .querySelectorAll<HTMLAnchorElement>('.case-toc a')
        .forEach((link) => {
          if (link.hash === `#${scene?.id}`)
            link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(draw);
    }
    function collect() {
      scenes = Array.from(
        main!.querySelectorAll<HTMLElement>('[data-scroll-scene]')
      );
      slots = Array.from(
        main!.querySelectorAll<HTMLElement>('[data-project-stack]')
      );
      schedule();
    }
    const resize = new ResizeObserver(schedule);
    const mutations = new MutationObserver(collect);
    // Only child changes matter (filters / tabs); observing style would loop.
    mutations.observe(main, { subtree: true, childList: true });
    resize.observe(main);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    reduced.addEventListener('change', schedule);
    collect();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      mutations.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      reduced.removeEventListener('change', schedule);
    };
  }, [detail, progress, visibility, artwork, phase]);

  return (
    <div className="portfolio-journey" ref={root}>
      {detail && (
        <div className="journey-backdrop" aria-hidden="true">
          <div className="journey-guides" />
          <WireframeFigure
            progress={progress}
            paused={paused}
            mode="journey"
            visibility={visibility}
            artwork={artwork}
            phase={phase}
          />
        </div>
      )}
      <div className="journey-rail" aria-label="Page journey">
        <span className="journey-number" aria-hidden="true">
          01
        </span>
        <span className="journey-current">
          {detail ? 'Overview' : 'The person'}
        </span>
        <span className="journey-progress" aria-hidden="true">
          <i />
        </span>
        {detail && (
          <button
            type="button"
            onClick={() => setPaused(!paused)}
            aria-pressed={paused}
            aria-label={
              paused ? 'Resume background motion' : 'Pause background motion'
            }
          >
            {paused ? <Play size={12} /> : <Pause size={12} />}
          </button>
        )}
      </div>
    </div>
  );
}
