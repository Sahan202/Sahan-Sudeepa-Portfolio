'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Github,
  Menu,
  Moon,
  Sun,
  X,
} from 'lucide-react';
import Link from 'next/link';
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import { navigation, profile } from '@/data/portfolio';

export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={reduced ? undefined : { y: [22, 0] }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function subscribeTheme(callback: () => void) {
  window.addEventListener('theme-change', callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener('theme-change', callback);
    window.removeEventListener('storage', callback);
  };
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeTheme,
    () => document.documentElement.dataset.theme || 'dark',
    () => 'dark'
  );
  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    document.documentElement.classList.toggle('dark', next === 'dark');
    try {
      localStorage.setItem('portfolio-theme', next);
    } catch {}
    window.dispatchEvent(new Event('theme-change'));
  }
  return (
    <button
      type="button"
      className="icon-button theme-toggle"
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}

export function Navigation({ detail = false }: { detail?: boolean }) {
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 30);
      if (detail) return;
      let current = 'home';
      let closestTop = -Infinity;
      for (const name of navigation) {
        const section = document.getElementById(name.toLowerCase());
        const top = (
          section?.closest('.chapter-world') || section
        )?.getBoundingClientRect().top;
        if (
          section &&
          top !== undefined &&
          top < Math.min(220, innerHeight * 0.3) &&
          top >= closestTop
        ) {
          current = section.id;
          closestTop = top;
        }
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [detail]);
  function closeMenu() {
    dialog.current?.close();
    setOpen(false);
  }
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const media = window.matchMedia('(min-width: 1050px)');
    const resize = () => {
      if (media.matches) closeMenu();
    };
    media.addEventListener('change', resize);
    return () => {
      document.body.style.overflow = previous;
      media.removeEventListener('change', resize);
    };
  }, [open]);
  const href = (name: string) => `${detail ? '/' : ''}#${name.toLowerCase()}`;
  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="nav-inner">
          <Link href="/#home" className="wordmark" aria-label="Sahan home">
            Sahan<span>.</span>
          </Link>
          <nav aria-label="Main navigation" className="desktop-nav">
            {navigation.map((name) => (
              <a
                key={name}
                href={href(name)}
                className={
                  (detail ? name === 'Projects' : active === name.toLowerCase())
                    ? 'active'
                    : ''
                }
                aria-current={
                  (detail ? name === 'Projects' : active === name.toLowerCase())
                    ? 'location'
                    : undefined
                }
              >
                {(detail
                  ? name === 'Projects'
                  : active === name.toLowerCase()) && (
                  <span className="nav-active-pill" />
                )}
                <span className="nav-label">{name}</span>
                {name === 'Projects' && (
                  <span className="nav-project-dot" aria-hidden="true" />
                )}
              </a>
            ))}
          </nav>
          <div className="nav-actions">
            <ThemeToggle />
            <a className="nav-contact" href={href('Contact')}>
              Let’s talk <ArrowUpRight size={15} />
            </a>
            <button
              ref={menuButton}
              className="icon-button menu-toggle"
              aria-label="Open navigation"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => {
                dialog.current?.showModal();
                setOpen(true);
              }}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>
      <dialog
        ref={dialog}
        id="mobile-menu"
        aria-label="Main navigation"
        className="mobile-menu"
        onClose={() => {
          setOpen(false);
          menuButton.current?.focus();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeMenu();
        }}
      >
        <div className="mobile-menu-inner">
          <div className="mobile-top">
            <span className="wordmark">
              Sahan<span>.</span>
            </span>
            <button
              className="icon-button"
              aria-label="Close navigation"
              onClick={closeMenu}
            >
              <X />
            </button>
          </div>
          <nav aria-label="Mobile navigation">
            <AnimatePresence>
              {open &&
                navigation.map((name, i) => (
                  <motion.a
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    key={name}
                    href={href(name)}
                    className={
                      (
                        detail
                          ? name === 'Projects'
                          : active === name.toLowerCase()
                      )
                        ? 'active'
                        : undefined
                    }
                    aria-current={
                      (
                        detail
                          ? name === 'Projects'
                          : active === name.toLowerCase()
                      )
                        ? 'location'
                        : undefined
                    }
                    onClick={closeMenu}
                  >
                    <span className="mono">0{i + 1}</span>
                    {name}
                    <ArrowUpRight size={22} />
                  </motion.a>
                ))}
            </AnimatePresence>
          </nav>
          <span className="eyebrow">
            BASED IN SRI LANKA · BUILDING FOR THE WEB
          </span>
        </div>
      </dialog>
    </>
  );
}

export function Cursor() {
  const cursor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = window.matchMedia(
      '(pointer: fine) and (prefers-reduced-motion: no-preference)'
    );
    if (!media.matches) return;
    let frame = 0;
    let x = -100;
    let y = -100;
    let currentX = -100;
    let currentY = -100;
    const tick = () => {
      currentX += (x - currentX) * 0.18;
      currentY += (y - currentY) * 0.18;
      if (cursor.current)
        cursor.current.style.transform = `translate3d(${currentX}px,${currentY}px,0)`;
      frame =
        Math.abs(x - currentX) + Math.abs(y - currentY) > 0.2
          ? requestAnimationFrame(tick)
          : 0;
    };
    const move = (event: PointerEvent) => {
      if (!media.matches) return;
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(tick);
      const target = event.target as Element;
      const project = target.closest('[data-project]');
      if (cursor.current) {
        cursor.current.dataset.state = project
          ? 'project'
          : target.closest('a,button,input,textarea')
            ? 'link'
            : '';
        cursor.current.style.opacity = '1';
      }
    };
    const hide = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (cursor.current) cursor.current.style.opacity = '0';
    };
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('mouseleave', hide);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
      document.removeEventListener('mouseleave', hide);
    };
  }, []);
  return (
    <div ref={cursor} className="custom-cursor" aria-hidden="true">
      <span>VIEW</span>
    </div>
  );
}

export function MagneticLink({
  href,
  children,
  className = '',
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();
  return (
    <a
      ref={ref}
      href={href}
      className={`button ${className}`}
      onPointerMove={(event) => {
        if (reduced || event.pointerType !== 'mouse') return;
        const box = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.transform = `translate(${(event.clientX - box.left - box.width / 2) * 0.09}px, ${(event.clientY - box.top - box.height / 2) * 0.12}px)`;
      }}
      onPointerLeave={() => {
        if (ref.current) ref.current.style.transform = '';
      }}
    >
      {children}
    </a>
  );
}

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  return (
    <section
      id="home"
      className="hero"
      ref={root}
      onPointerMove={(event) => {
        if (reduced || event.pointerType !== 'mouse' || !root.current) return;
        const box = root.current.getBoundingClientRect();
        root.current.style.setProperty(
          '--mouse-x',
          `${event.clientX - box.left}px`
        );
        root.current.style.setProperty(
          '--mouse-y',
          `${event.clientY - box.top}px`
        );
      }}
    >
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-content container">
        <div className="hero-topline">
          <span className="availability">
            <span /> Available for opportunities
          </span>
          <span className="eyebrow hero-location">
            SRI LANKA <span>↗</span> THE WORLD
          </span>
        </div>
        <div className="hero-layout">
          <div className="hero-copy">
            <motion.div
              initial={false}
              animate={reduced ? undefined : { y: [30, 0], opacity: [0.5, 1] }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="eyebrow hero-intro">
                <span className="tiny-line" /> HELLO, I’M
              </div>
              <h1>
                SAHAN
                <br />
                <span>
                  SUDEEPA<span className="hero-period">.</span>
                </span>
              </h1>
            </motion.div>
            <motion.div
              initial={false}
              animate={reduced ? undefined : { y: [18, 0], opacity: [0.4, 1] }}
              transition={{ duration: 0.9, delay: 0.15 }}
            >
              <p className="hero-role">
                Software Engineer <span>&</span> Full-Stack Developer
              </p>
              <p className="hero-description">
                I design and build modern digital products
                <br className="desktop-break" /> that solve real-world problems.
              </p>
              <div className="hero-buttons">
                <MagneticLink href="#projects" className="button-primary">
                  View My Work <ArrowUpRight size={18} />
                </MagneticLink>
                <MagneticLink href="#contact" className="button-outline">
                  Let’s Connect <ArrowUpRight size={18} />
                </MagneticLink>
                <MagneticLink href={profile.github} className="button-github">
                  <Github size={18} />
                  <span className="sr-only">View GitHub profile</span>
                </MagneticLink>
              </div>
            </motion.div>
          </div>
          <div
            className="orbital-scene"
            role="img"
            aria-label="An abstract orbital system connecting design, code and real-world ideas"
          >
            <div className="orbital-cross cross-one" />
            <div className="orbital-cross cross-two" />
            <div className="orbital-coordinate mono">
              SYSTEM 01 / ALWAYS EVOLVING
            </div>
            <div className="orbit orbit-outer" />
            <div className="orbit orbit-middle" />
            <div className="orbit orbit-inner" />
            <div className="orbit-path">
              <i />
            </div>
            <div className="orb-core">
              <div className="orb-core-grain" />
              <span className="orb-symbol">
                s<span>.</span>
              </span>
            </div>
            <span className="floating-tech tech-react">
              <span>✳</span> React
            </span>
            <span className="floating-tech tech-next">
              <b>N</b> Next.js
            </span>
            <span className="floating-tech tech-typescript">
              <b>TS</b> TypeScript
            </span>
            <span className="floating-tech tech-node">
              <b>⬡</b> Node.js
            </span>
            <div className="orbital-caption mono">
              <span className="status-dot" /> IDEAS INTO INTERFACES
            </div>
            <i className="particle p1" />
            <i className="particle p2" />
            <i className="particle p3" />
          </div>
        </div>
        <div className="hero-bottom">
          <a href="#about" className="scroll-link">
            <span className="scroll-icon">
              <ArrowDown size={14} />
            </span>{' '}
            SCROLL TO EXPLORE
          </a>
          <span className="hero-note">
            Thoughtful interfaces. <span>Solid engineering.</span>
          </span>
          <span className="mono hero-edition">
            PORTFOLIO / {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </section>
  );
}

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );
  return (
    <button
      className="text-link"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setCopied(true);
          setFailed(false);
          if (timer.current) clearTimeout(timer.current);
          timer.current = setTimeout(() => setCopied(false), 2500);
        } catch {
          setFailed(true);
        }
      }}
      aria-live="polite"
    >
      {copied ? (
        <>
          <Check size={16} /> Copied
        </>
      ) : failed ? (
        'Please copy the email address above'
      ) : (
        'Copy email address'
      )}
    </button>
  );
}
