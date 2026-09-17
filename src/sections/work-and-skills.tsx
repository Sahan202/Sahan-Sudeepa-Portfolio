'use client';

import { PortfolioVideo } from '@/components/portfolio/lucky-travel-video';

import { ArrowUpRight, Braces, Github } from 'lucide-react';
import Link from 'next/link';
import { useState, type CSSProperties } from 'react';
import { projects, skillGroups } from '@/data/portfolio';
import { ProjectVisual } from '@/components/portfolio/project-visual';

export function SkillsExplorer() {
  const [group, setGroup] = useState<keyof typeof skillGroups>('Frontend');
  return (
    <div className="skills-explorer">
      <div
        className="skill-tabs"
        role="tablist"
        aria-label="Technology categories"
      >
        {Object.keys(skillGroups).map((name, i) => (
          <button
            key={name}
            role="tab"
            id={`tab-${name}`}
            aria-controls={`panel-${name}`}
            aria-selected={group === name}
            tabIndex={group === name ? 0 : -1}
            onClick={() => setGroup(name as keyof typeof skillGroups)}
            onKeyDown={(event) => {
              const keys = Object.keys(
                skillGroups
              ) as (keyof typeof skillGroups)[];
              let index = i;
              if (event.key === 'ArrowRight') index = (i + 1) % keys.length;
              else if (event.key === 'ArrowLeft')
                index = (i - 1 + keys.length) % keys.length;
              else if (event.key === 'Home') index = 0;
              else if (event.key === 'End') index = keys.length - 1;
              else return;
              event.preventDefault();
              setGroup(keys[index]);
              document.getElementById(`tab-${keys[index]}`)?.focus();
            }}
          >
            <span className="mono">0{i + 1}</span>
            {name}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`panel-${group}`}
        aria-labelledby={`tab-${group}`}
        className="skill-grid"
        tabIndex={0}
      >
        {skillGroups[group].map(([name, description, symbol], index) => (
          <div
            className="skill-card"
            key={name}
            tabIndex={0}
            style={{ '--skill-index': index } as CSSProperties}
          >
            <div
              className={`tech-symbol symbol-${symbol.toLowerCase().replace(/[^a-z]/g, '')}`}
            >
              {symbol}
            </div>
            <div>
              <h3>{name}</h3>
              <p>{description}</p>
            </div>
            <ArrowUpRight size={16} />
          </div>
        ))}
      </div>
      <div className="skills-caption">
        <Braces size={16} />
        <span>The right tools, chosen for the problem.</span>
        <span className="mono">ALWAYS LEARNING ↗</span>
      </div>
    </div>
  );
}

const filters = ['All work', 'AI & Data', 'Full-Stack', 'Interactive'] as const;
export function ProjectGallery() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All work');
  const visible = projects.filter(
    (project) => filter === 'All work' || project.category === filter
  );
  return (
    <>
      <div className="project-filter" aria-label="Filter projects">
        {filters.map((name) => (
          <button
            key={name}
            onClick={() => setFilter(name)}
            aria-pressed={filter === name}
          >
            {name}
            {name === 'All work' && (
              <span>{String(projects.length).padStart(2, '0')}</span>
            )}
          </button>
        ))}
        <span className="filter-note mono" aria-live="polite">
          {String(visible.length).padStart(2, '0')} SELECTED PROJECTS
        </span>
      </div>
      <div className="project-grid">
        {visible.map((project, index) => (
          <div
            key={project.slug}
            className="project-stack-slot"
            data-project-stack
            onFocusCapture={(event) => {
              // Keyboard users can return to a card covered by the next one.
              if (!(event.target as HTMLElement).matches(':focus-visible'))
                return;
              const slot = event.currentTarget;
              const grid = slot.parentElement!;
              const gap = parseFloat(getComputedStyle(grid).rowGap) || 0;
              const siblings = Array.from(grid.children) as HTMLElement[];
              const offset = siblings
                .slice(0, siblings.indexOf(slot))
                .reduce((sum, item) => sum + item.offsetHeight + gap, 0);
              const top =
                grid.getBoundingClientRect().top +
                window.scrollY +
                offset -
                128;
              if (window.scrollY > top + slot.offsetHeight * 0.4)
                window.scrollTo({ top, behavior: 'instant' });
            }}
          >
            <article className="project-card">
              {project.video ? (
                <div className="project-cover-link">
                  <PortfolioVideo src={project.video} title={project.title} />
                  <Link
                    href={`/projects/${project.slug}`}
                    className="project-open"
                    aria-label={`View ${project.title} case study`}
                  >
                    <ArrowUpRight size={22} />
                  </Link>
                </div>
              ) : (
                <Link
                  href={`/projects/${project.slug}`}
                  className="project-cover-link"
                  data-project
                  aria-label={`View ${project.title} case study`}
                >
                  <ProjectVisual project={project} />
                  <span className="project-open">
                    <ArrowUpRight size={22} />
                  </span>
                </Link>
              )}
              <div className="project-card-body">
                <div className="project-card-index" aria-hidden="true">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <span>
                    SELECTED WORK / {String(visible.length).padStart(2, '0')}
                  </span>
                </div>
                <div className="project-meta">
                  <span className="eyebrow">{project.label}</span>
                  <span className="mono">{project.category}</span>
                </div>
                <h3>
                  <Link href={`/projects/${project.slug}`}>
                    {project.title}
                    <ArrowUpRight size={20} />
                  </Link>
                </h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.stack.slice(0, 4).map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                  {project.stack.length > 4 && (
                    <span>+{project.stack.length - 4}</span>
                  )}
                </div>
                <div className="project-links">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-link"
                  >
                    Explore case study <ArrowUpRight size={14} />
                  </Link>
                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-link"
                    >
                      <Github size={13} /> Source
                    </a>
                  ) : (
                    <button
                      className="text-link source-note"
                      disabled
                      title="Repository link has not been published"
                    >
                      <Github size={13} /> GitHub unavailable
                    </button>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-link"
                    >
                      Live demo <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    </>
  );
}
