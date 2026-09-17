'use client';

import { useEffect, useRef } from 'react';
import type { MotionValue } from 'framer-motion';

const clamp = (n: number) => Math.max(0, Math.min(1, n));
const modelCache = new Map<string, Float32Array>();

/** Project a baked 3D line sculpture; the browser needs no model loader or WebGL. */
export function WireframeFigure({
  progress,
  paused,
  mode = 'hero',
  visibility,
  artwork,
  phase,
}: {
  progress: MotionValue<number>;
  paused: boolean;
  mode?: 'hero' | 'journey';
  visibility?: MotionValue<number>;
  artwork?: MotionValue<string>;
  phase?: MotionValue<number>;
}) {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = root.current;
    const element = canvas.current;
    const ctx = element?.getContext('2d');
    if (!host || !element || !ctx) return;
    const abort = new AbortController();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let points: Float32Array | undefined;
    let previous: Float32Array | undefined;
    let morphStarted = 0;
    let requestedModel = '';
    let width = 1;
    let height = 1;
    let frame = 0;
    let visible = true;
    let lastTime = 0;
    let elapsed = 0;
    let ink = '#f1f0e9';
    let accent = '#e9b783';
    const projected = new Float32Array(6);

    function render(now: number) {
      frame = 0;
      if (
        !points ||
        !visible ||
        document.hidden ||
        (visibility && visibility.get() <= 0)
      )
        return;
      if (!reduced.matches && !paused && now - lastTime < 32) {
        frame = requestAnimationFrame(render);
        return;
      }
      if (!reduced.matches && !paused)
        elapsed += Math.min(now - lastTime, 40) / 1000;
      lastTime = now;
      const p = reduced.matches ? 0 : progress.get();
      const journey = mode === 'journey';
      const local = phase?.get() ?? p;
      const morph =
        reduced.matches || paused || !previous
          ? 1
          : clamp((now - morphStarted) / 1000);
      const blend = morph * morph * (3 - 2 * morph);
      if (morph === 1) previous = undefined;
      const turn =
        -0.45 +
        (journey ? local * 1.35 : p * 3.7) +
        Math.sin(elapsed * 0.35) * 0.12;
      const cos = Math.cos(turn);
      const sin = Math.sin(turn);
      const dissolve = journey
        ? Math.sin(morph * Math.PI) * 0.38
        : clamp((p - 0.58) / 0.42);
      const explosion = dissolve * dissolve;
      const mobile = width < 768;
      const currentArt = artwork?.get();
      const scale =
        (journey
          ? Math.min(height * 0.29, width * (mobile ? 0.32 : 0.4))
          : Math.min(height * (mobile ? 0.28 : 0.33), width * 0.44) *
            (1 + Math.sin(p * Math.PI) * 0.23)) *
        (journey && currentArt === 'paper-plane' ? 0.68 : 1);
      const centerX =
        width *
        (journey
          ? mobile
            ? 0.6
            : 0.5 + Math.cos(p * Math.PI * 4) * 0.19
          : mobile
            ? 0.59
            : 0.73 - clamp(p * 2) * 0.2);
      const centerY =
        height *
          (journey && currentArt === 'paper-plane'
            ? 0.76
            : mobile
              ? 0.47
              : 0.5) +
        p * height * 0.04;
      ctx!.clearRect(0, 0, width, height);
      ctx!.lineWidth = mobile ? 0.6 : 0.7;
      // Two batched paths keep thousands of segments inexpensive to draw.
      for (let pass = 0; pass < 2; pass++) {
        ctx!.beginPath();
        for (
          let i = 0;
          i < points.length;
          i += journey ? (mobile ? 12 : 6) : mobile ? 18 : 12
        ) {
          const segment = i / 6;
          if ((segment % 11 === 0 ? 1 : 0) !== pass) continue;
          const spreadX = Math.sin(segment * 127.1) * explosion * 4.4;
          const spreadY = Math.cos(segment * 78.23) * explosion * 3;
          const spreadZ = Math.sin(segment * 39.7) * explosion * 2;
          for (let end = 0; end < 2; end++) {
            const offset = i + end * 3;
            const oldOffset = previous
              ? (i % previous.length) + end * 3
              : offset;
            const x = previous
              ? previous[oldOffset] * (1 - blend) +
                points[offset] * blend +
                spreadX
              : points[offset] + spreadX;
            const y = previous
              ? previous[oldOffset + 1] * (1 - blend) +
                points[offset + 1] * blend +
                spreadY
              : points[offset + 1] + spreadY;
            const z = previous
              ? previous[oldOffset + 2] * (1 - blend) +
                points[offset + 2] * blend +
                spreadZ
              : points[offset + 2] + spreadZ;
            const depth = -x * sin + z * cos;
            const perspective = 4.8 / (4.8 - depth);
            projected[end * 3] =
              centerX + (x * cos + z * sin) * scale * perspective;
            projected[end * 3 + 1] = centerY - y * scale * perspective;
          }
          ctx!.moveTo(projected[0], projected[1]);
          ctx!.lineTo(projected[3], projected[4]);
        }
        ctx!.strokeStyle = pass ? accent : ink;
        ctx!.globalAlpha =
          (journey ? (pass ? 0.8 : 0.48) : pass ? 0.62 : 0.28) *
          (1 - dissolve * 0.7);
        ctx!.stroke();
      }
      ctx!.globalAlpha = 1;
      host!.dataset.ready = 'true';
      if (!reduced.matches && !paused) frame = requestAnimationFrame(render);
    }
    function schedule() {
      if (!frame && !document.hidden && visible)
        frame = requestAnimationFrame(render);
    }
    const resize = new ResizeObserver(() => {
      width = host.clientWidth;
      height = host.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      element.width = Math.round(width * dpr);
      element.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      schedule();
    });
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    function theme() {
      const style = getComputedStyle(document.documentElement);
      ink = style.getPropertyValue('--ink').trim();
      accent = style.getPropertyValue('--accent').trim();
      schedule();
    }
    const themeObserver = new MutationObserver(theme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    const unsubscribe = progress.on('change', schedule);
    const unsubscribeVisibility = visibility?.on('change', schedule);
    const unsubscribePhase = phase?.on('change', schedule);
    resize.observe(host);
    intersection.observe(host);
    reduced.addEventListener('change', schedule);
    document.addEventListener('visibilitychange', schedule);
    theme();
    async function loadModel(name: string) {
      if (requestedModel === name) return;
      requestedModel = name;
      host!.style.setProperty(
        '--figure-fallback',
        `url('/models/${name}.svg')`
      );
      try {
        let next = modelCache.get(name);
        if (!next) {
          const response = await fetch(`/models/${name}.bin`, {
            signal: abort.signal,
          });
          if (!response.ok) throw new Error('Sculpture unavailable');
          next = new Float32Array(await response.arrayBuffer());
          if (next.length < 6 || next.length % 6 !== 0)
            throw new Error('Invalid sculpture');
          modelCache.set(name, next);
        }
        if (abort.signal.aborted || requestedModel !== name) return;
        previous = points;
        points = next;
        morphStarted = performance.now();
        host!.dataset.artwork = name;
        schedule();
      } catch {
        if (abort.signal.aborted || requestedModel !== name) return;
        // Use this sculpture's SVG; never substitute the introduction's figure.
        points = undefined;
        host!.dataset.artwork = name;
        host!.dataset.ready = 'false';
        ctx!.clearRect(0, 0, width, height);
      }
    }
    const unsubscribeArtwork = artwork?.on(
      'change',
      (name) => void loadModel(name)
    );
    void loadModel(artwork?.get() ?? 'human-wireframe');
    return () => {
      abort.abort();
      cancelAnimationFrame(frame);
      resize.disconnect();
      intersection.disconnect();
      themeObserver.disconnect();
      unsubscribe();
      unsubscribeVisibility?.();
      unsubscribeArtwork?.();
      unsubscribePhase?.();
      reduced.removeEventListener('change', schedule);
      document.removeEventListener('visibilitychange', schedule);
    };
  }, [progress, paused, mode, visibility, artwork, phase]);

  return (
    <div className="wireframe-figure" ref={root} aria-hidden="true">
      <div className="wireframe-fallback" />
      <canvas ref={canvas} />
    </div>
  );
}
