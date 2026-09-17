'use client';

import { Maximize, Minimize, Pause, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type PortfolioVideoProps = {
  detail?: boolean;
  src?: string;
  title?: string;
};

export function PortfolioVideo({
  detail = false,
  src = '/videos/lucky-travel.webm',
  title = 'Lucky Travel',
}: PortfolioVideoProps) {
  const container = useRef<HTMLDivElement>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [fullscreenError, setFullscreenError] = useState('');
  const video = useRef<HTMLVideoElement>(null);
  const manuallyPaused = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const update = () =>
      setFullscreen(document.fullscreenElement === container.current);
    document.addEventListener('fullscreenchange', update);
    return () => document.removeEventListener('fullscreenchange', update);
  }, []);

  async function toggleFullscreen() {
    setFullscreenError('');
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (container.current?.requestFullscreen)
        await container.current.requestFullscreen();
      else {
        const element = video.current as
          | (HTMLVideoElement & { webkitEnterFullscreen?: () => void })
          | null;
        if (element?.webkitEnterFullscreen) element.webkitEnterFullscreen();
        else
          setFullscreenError(
            'Fullscreen is unavailable in this browser. Use the video controls or open the video below.'
          );
      }
    } catch {
      setFullscreenError(
        'Could not enter fullscreen. You can open the video below.'
      );
    }
  }

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const slot = element.closest<HTMLElement>('[data-project-stack]');
    let inView = false;
    function updatePlayback() {
      if (
        inView &&
        !document.hidden &&
        !reduced.matches &&
        !manuallyPaused.current &&
        slot?.dataset.covered !== 'true'
      ) {
        void element!.play().catch(() => {});
      } else {
        element!.pause();
      }
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting && entry.intersectionRatio >= 0.15;
        updatePlayback();
      },
      { threshold: 0.15 }
    );
    observer.observe(element);
    slot?.addEventListener('portfolio-card-visibility', updatePlayback);
    reduced.addEventListener('change', updatePlayback);
    document.addEventListener('visibilitychange', updatePlayback);
    return () => {
      observer.disconnect();
      slot?.removeEventListener('portfolio-card-visibility', updatePlayback);
      reduced.removeEventListener('change', updatePlayback);
      document.removeEventListener('visibilitychange', updatePlayback);
    };
  }, []);

  return (
    <div
      ref={container}
      className={`project-visual lucky-travel-video ${detail ? 'video-detail' : ''} ${playing ? 'is-playing' : ''}`}
    >
      <div className="video-chrome">
        <span className="video-window-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="video-window-title">{title}</span>
        <span className="video-window-state">
          <i />
          {playing ? 'Playing' : 'Preview'}
        </span>
      </div>
      <div className="video-screen">
        <video
          ref={video}
          muted
          loop
          playsInline
          controls={detail || fullscreen}
          preload="metadata"
          aria-label={`${title} website walkthrough`}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          <source src={src} type="video/webm" />
          Your browser does not support this video.
        </video>
        {!detail && !fullscreen && (
          <button
            type="button"
            className="video-playback-toggle"
            aria-label={
              playing ? `Pause ${title} video` : `Play ${title} video`
            }
            onClick={() => {
              const element = video.current;
              if (!element) return;
              if (element.paused) {
                manuallyPaused.current = false;
                void element.play().catch(() => {});
              } else {
                manuallyPaused.current = true;
                element.pause();
              }
            }}
          >
            {playing ? <Pause size={15} /> : <Play size={15} />}
            {playing ? 'Pause' : 'Play'}
          </button>
        )}
        <button
          type="button"
          className="video-fullscreen-toggle"
          onClick={() => void toggleFullscreen()}
          aria-label={
            fullscreen ? 'Exit fullscreen' : `Watch ${title} fullscreen`
          }
        >
          {fullscreen ? <Minimize size={17} /> : <Maximize size={17} />}
          <span>{fullscreen ? 'Exit fullscreen' : 'Fullscreen'}</span>
        </button>
      </div>
      <div className="video-caption-bar">
        <span>PROJECT WALKTHROUGH</span>
        <span>
          EXPLORE IN FULLSCREEN <Maximize size={10} />
        </span>
      </div>
      {fullscreenError && (
        <div className="video-fullscreen-error" role="status">
          {fullscreenError}{' '}
          <a href={src} target="_blank" rel="noreferrer">
            Open video
          </a>
        </div>
      )}
    </div>
  );
}

export function LuckyTravelVideo({ detail = false }: { detail?: boolean }) {
  return <PortfolioVideo detail={detail} />;
}
