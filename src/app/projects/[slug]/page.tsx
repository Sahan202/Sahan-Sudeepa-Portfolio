import { PortfolioVideo } from '@/components/portfolio/lucky-travel-video';
import type { Metadata } from 'next';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Github,
  Radio,
} from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Cursor,
  Navigation,
  Reveal,
} from '@/components/portfolio/interactions';
import { ProjectVisual } from '@/components/portfolio/project-visual';
import { ScrollJourney } from '@/components/portfolio/scroll-journey';
import { profile, projects } from '@/data/portfolio';
import { Footer } from '@/sections/home-sections';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: `${project.title} | Sahan Sudeepa`,
      description: project.description,
      url: `/projects/${slug}`,
      images: ['/opengraph-image'],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: ['/opengraph-image'],
    },
  };
}
const sections = [
  'Overview',
  'Problem',
  'Solution',
  'Key Features',
  'Technology Stack',
  'Architecture',
  'Challenges',
  'What I Learned',
  'Links',
];
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const content = [
    <p key="overview">{project.description}</p>,
    <p key="problem">{project.problem}</p>,
    <p key="solution">{project.solution}</p>,
    <ul key="features">
      {project.features.map((feature) => (
        <li key={feature}>{feature}</li>
      ))}
    </ul>,
    <div className="project-tags" key="stack">
      {project.stack.map((tech) => (
        <span key={tech}>{tech}</span>
      ))}
    </div>,
    <div key="architecture">
      <p>A high-level view of the project’s workflow.</p>
      <div className="architecture">
        {project.architecture.map((step, i) => (
          <div key={step}>
            {step}
            {i < project.architecture.length - 1 && <ArrowRight size={13} />}
          </div>
        ))}
      </div>
      <p className="context-note">
        Conceptual workflow based on the project scope; this is not a deployment
        diagram.
      </p>
    </div>,
    <div key="challenges">
      <p>Engineering considerations for this project:</p>
      <ul>
        {project.considerations.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="context-note">
        These are design considerations, rather than claims about specific
        incidents or measured outcomes.
      </p>
    </div>,
    <div key="learning">
      <p>{project.learning}</p>
      <p className="context-note">
        Areas of learning explored by the project. A detailed personal
        retrospective will be added as the case study develops.
      </p>
    </div>,
    <div key="links">
      <p>
        {project.github || project.demo
          ? 'Explore the project through the links below.'
          : 'Public repository and live demo links have not been published here yet. Get in touch to discuss the project.'}
      </p>
      <div className="case-links">
        {project.github ? (
          <a
            className="button button-outline"
            href={project.github}
            target="_blank"
            rel="noreferrer"
          >
            <Github size={16} /> GitHub <ArrowUpRight size={16} />
          </a>
        ) : (
          <button className="button button-outline" disabled>
            <Github size={16} /> Repository unavailable
          </button>
        )}
        {project.demo ? (
          <a
            className="button button-primary"
            href={project.demo}
            target="_blank"
            rel="noreferrer"
          >
            Live demo <ArrowUpRight size={16} />
          </a>
        ) : (
          <button className="button button-outline" disabled>
            <Radio size={16} /> Live demo unavailable
          </button>
        )}
        <a
          className="button button-primary"
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
        >
          Let’s talk <ArrowUpRight size={16} />
        </a>
      </div>
    </div>,
  ];
  return (
    <>
      <Navigation detail />
      <Cursor />
      <main className="case-main container" id="main-content">
        <ScrollJourney detail />
        <Link href="/#projects" className="text-link case-back">
          <ArrowLeft size={15} /> Back to selected work
        </Link>
        <Reveal className="case-heading">
          <span className="eyebrow">{project.label} / PROJECT NOTES</span>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
          <div className="project-tags">
            {project.stack.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </Reveal>
        <Reveal className="case-art">
          {project.video ? (
            <PortfolioVideo detail src={project.video} title={project.title} />
          ) : (
            <ProjectVisual project={project} large />
          )}
        </Reveal>
        <p className="art-caption">
          {project.video
            ? `${project.title} website walkthrough. Use the video controls to play, seek or watch fullscreen.`
            : project.image
              ? `${project.title} — a screenshot of the application.`
              : 'An illustrative interface concept created for this portfolio, not a screenshot of the application.'}
        </p>
        <div className="case-body">
          <nav className="case-toc" aria-label="Case study sections">
            {sections.map((title, i) => (
              <a key={title} href={`#case-${i + 1}`}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                {title}
              </a>
            ))}
          </nav>
          <div>
            {sections.map((title, i) => (
              <section
                key={title}
                id={`case-${i + 1}`}
                className="case-section"
                data-scroll-scene={title}
              >
                <Reveal>
                  <h2>
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    {title}
                  </h2>
                  {content[i]}
                </Reveal>
              </section>
            ))}
          </div>
        </div>
        <div className="case-next">
          <span className="eyebrow">KEEP EXPLORING / NEXT PROJECT</span>
          <Link href={`/projects/${next.slug}`}>
            {next.title}
            <ArrowUpRight size={35} />
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
