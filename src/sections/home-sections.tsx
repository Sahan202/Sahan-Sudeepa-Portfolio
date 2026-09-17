import {
  ArrowDownToLine,
  ArrowUpRight,
  ArrowUp,
  BookOpen,
  Braces,
  Code2,
  ExternalLink,
  FileText,
  Github,
  Globe2,
  GraduationCap,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
  Terminal,
  Workflow,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { ContactForm } from '@/components/portfolio/contact-form';
import { CopyEmail, Reveal } from '@/components/portfolio/interactions';
import { profile } from '@/data/portfolio';
import { ProjectGallery, SkillsExplorer } from '@/sections/work-and-skills';

export function SectionHeading({
  number,
  label,
  title,
  accent,
  description,
}: {
  number: string;
  label: string;
  title: string;
  accent?: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <span className="section-label">
          <span>{number}</span>
          <span className="tiny-line" />
          {label}
        </span>
        <h2>
          {title}
          {accent && (
            <>
              <br />
              <span>{accent}</span>
            </>
          )}
        </h2>
      </div>
      {description && <p>{description}</p>}
    </div>
  );
}

export function About() {
  return (
    <section
      id="about"
      className="section about-section"
      data-scroll-scene="The person"
    >
      <div className="container">
        <Reveal>
          <SectionHeading
            number="01"
            label="THE PERSON BEHIND THE CODE"
            title="Building with curiosity."
            accent="Engineering with purpose."
          />
        </Reveal>
        <div className="about-layout">
          <Reveal className="owner-portrait">
            <figure>
              <div className="owner-portrait-frame">
                <Image
                  src={profile.portrait}
                  alt="Sahan Sudeepa standing by the ocean in Sri Lanka"
                  width={1086}
                  height={1448}
                  sizes="(max-width: 767px) 90vw, 42vw"
                  className="owner-portrait-image"
                />
                <span className="portrait-note">
                  THE PERSON BEHIND THE PIXELS
                </span>
              </div>
              <figcaption>
                <div>
                  <strong>Sahan Sudeepa</strong>
                  <span>Developer. Curious by nature.</span>
                </div>
                <span className="portrait-signature" aria-hidden="true">
                  Sahan ↗
                </span>
              </figcaption>
            </figure>
          </Reveal>
          <Reveal className="about-copy" delay={0.1}>
            <p className="large-copy">
              I’m Sahan, a Software Engineering student and Full-Stack Developer
              based in Sri Lanka.
            </p>
            <p>
              I build modern web applications that connect thoughtful interfaces
              with dependable backend systems. My work spans AI-powered
              products, database-driven applications and interactive
              experiences.
            </p>
            <p>
              I enjoy the whole process: understanding a problem, exploring the
              possibilities and turning an idea into something people can use.
              There’s always a better question to ask and a new technology to
              understand.
            </p>
            <div className="about-location">
              <MapPin size={15} /> Sri Lanka <span>·</span> Open to meaningful
              opportunities
            </div>
          </Reveal>
        </div>
        <div className="principle-grid">
          {[
            {
              icon: Layers3,
              title: 'Full-stack thinking',
              copy: 'From the interface to the database.',
            },
            {
              icon: Sparkles,
              title: 'Curiosity, applied',
              copy: 'Exploring AI through real products.',
            },
            {
              icon: Braces,
              title: 'Built with intention',
              copy: 'Readable code. Thoughtful decisions.',
            },
            {
              icon: Github,
              title: 'Learning in the open',
              copy: 'Explore my work at @Sahan202.',
            },
          ].map(({ icon: Icon, title, copy }, i) => (
            <Reveal key={title} delay={i * 0.04} className="principle-card">
              <Icon size={22} strokeWidth={1.4} />
              <h3>{title}</h3>
              <p>{copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section
      id="skills"
      className="section skills-section"
      data-scroll-scene="The toolkit"
    >
      <div className="skills-layout container">
        <Reveal className="skills-introduction">
          <SectionHeading
            number="03"
            label="MY TOOLKIT"
            title="Different tools."
            accent="One connected experience."
            description="A practical toolkit for building across the stack — from the first pixel to the last API response."
          />
        </Reveal>
        <SkillsExplorer />
      </div>
    </section>
  );
}

export function Work() {
  return (
    <section
      id="projects"
      className="section work-section"
      data-scroll-scene="Selected work"
    >
      <div className="container">
        <Reveal>
          <SectionHeading
            number="02"
            label="SELECTED WORK"
            title="Ideas, made real."
            description="A collection of products, experiments and research. Each one, a different problem worth solving."
          />
        </Reveal>
        <ProjectGallery />
        <div className="work-end">
          <span>There’s more behind the code.</span>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            <Github size={16} /> Explore my GitHub <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section
      id="experience"
      className="section experience-section"
      data-scroll-scene="In practice"
    >
      <div className="experience-layout container">
        <Reveal>
          <SectionHeading
            number="04"
            label="IN PRACTICE"
            title="Building software."
            accent="Growing through the work."
          />
          <p className="section-intro">
            Good engineering happens in the details — and in the way we work
            together.
          </p>
          <span className="experience-decoration" aria-hidden="true">
            <Workflow size={100} strokeWidth={0.7} />
          </span>
        </Reveal>
        <Reveal className="timeline">
          <article className="timeline-item">
            <span className="timeline-node" />
            <span className="eyebrow">PROFESSIONAL PROJECT EXPERIENCE</span>
            <h3>Botcalm</h3>
            <span className="timeline-subtitle">Compliance Platform</span>
            <p className="timeline-role">
              Software Engineering / Full-Stack Development
            </p>
            <p>
              Contributing to a compliance platform through frontend
              development, UI improvements and focused issue resolution.
            </p>
            <ul className="focus-list">
              <li>
                Building and refining interfaces with Next.js, React and
                TypeScript
              </li>
              <li>
                Resolving bugs and QA issues with attention to user experience
              </li>
              <li>Collaborating through Git workflows and API integration</li>
              <li>Working toward production-quality code with SonarQube</li>
            </ul>
            <div className="project-tags">
              {[
                'Next.js',
                'TypeScript',
                'React',
                'Git',
                'APIs',
                'SonarQube',
              ].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <Link className="text-link" href="/projects/botcalm">
              Explore the project <ArrowUpRight size={15} />
            </Link>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

export function ProcessInterlude() {
  return (
    <section
      className="journey-interlude"
      id="process"
      data-scroll-scene="The process"
      aria-labelledby="process-title"
    >
      <div className="interlude-stage">
        <span className="section-label">THE THINKING BEHIND THE BUILD</span>
        <h2 id="process-title">
          <span>More than code.</span>
          <em>A little human.</em>
        </h2>
        <div className="interlude-caption">
          <span className="mono">CURIOSITY → CRAFT → CONNECTION</span>
          <p>
            Thoughtful questions. Considered details.
            <br />
            Software built around people.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Education() {
  return (
    <section
      id="education"
      className="section education-section"
      data-scroll-scene="Always learning"
    >
      <div className="container">
        <Reveal>
          <SectionHeading
            number="05"
            label="FOUNDATIONS & EXPLORATION"
            title="Always a student."
            accent="Especially of what’s next."
          />
        </Reveal>
        <div className="education-grid">
          <Reveal className="education-card">
            <div className="education-icon">
              <GraduationCap size={24} />
            </div>
            <span className="eyebrow">ACADEMIC FOUNDATION</span>
            <h3>
              Computer Science &<br />
              Software Engineering
            </h3>
            <p>
              Building a foundation in how software is designed, structured and
              delivered.
            </p>
            <div className="education-subjects">
              {[
                'Software engineering',
                'Object-oriented programming',
                'Client-server architectures',
                'Databases',
                'Web development',
              ].map((subject) => (
                <span key={subject}>
                  <span />
                  {subject}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal className="education-card research-card" delay={0.1}>
            <div className="education-icon">
              <BookOpen size={24} />
            </div>
            <span className="eyebrow">FINAL-YEAR RESEARCH</span>
            <h3>
              Making predictions.
              <br />
              Making them explainable.
            </h3>
            <p>
              Exploring machine learning for real-time cinema crowd prediction
              and capacity optimization, with explainable AI at the center.
            </p>
            <div className="project-tags">
              <span>Machine Learning</span>
              <span>SHAP</span>
              <span>Python</span>
            </div>
            <Link
              href="/projects/cinema-crowd-prediction"
              className="text-link"
            >
              Inside the research <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function GithubShowcase() {
  return (
    <section
      id="github"
      className="github-section"
      aria-labelledby="github-title"
      data-scroll-scene="Behind the work"
    >
      <div className="container">
        <Reveal className="github-panel">
          <div>
            <span className="section-label">
              <Github size={18} />
              CODE, COMMIT, REPEAT
            </span>
            <h2 id="github-title">
              The work behind
              <br />
              <span>the work.</span>
            </h2>
            <p>
              Experiments, projects and the process of getting better.
              <br />
              Follow along on GitHub.
            </p>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="button button-outline"
            >
              <Github size={17} /> View GitHub <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="github-terminal">
            <div className="terminal-bar">
              <span>
                <i />
                <i />
                <i />
              </span>
              <span className="mono">sahan / workspace</span>
              <Terminal size={13} />
            </div>
            <div className="terminal-body">
              <p>
                <span>~</span> whoami
              </p>
              <strong>Sahan202</strong>
              <p className="terminal-comment">
                {'// building, learning, iterating'}
              </p>
              <div className="code-line">
                <span>const</span> developer = {'{'}
              </div>
              <div className="code-line indent">
                focus: <em>&apos;real-world software&apos;</em>,
              </div>
              <div className="code-line indent">
                mindset: <em>&apos;always learning&apos;</em>,
              </div>
              <div className="code-line indent">
                next: <em>&apos;something meaningful&apos;</em>
              </div>
              <div className="code-line">{'}'};</div>
              <p className="terminal-prompt">
                <span>➜</span> <i />
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Resume() {
  const available = existsSync(
    path.join(process.cwd(), 'public', 'resume.pdf')
  );
  return (
    <section
      id="resume"
      className="resume-section"
      aria-labelledby="resume-title"
      data-scroll-scene="The next chapter"
    >
      <div className="container">
        <Reveal className="resume-panel">
          <div className="resume-icon">
            <FileText size={29} strokeWidth={1.3} />
          </div>
          <div>
            <span className="eyebrow">THE SHORT VERSION</span>
            <h2 id="resume-title">Let’s build something meaningful.</h2>
            <p>
              {available
                ? 'A closer look at my background, skills and work.'
                : 'My resume will be available here soon. Let’s connect on LinkedIn in the meantime.'}
            </p>
          </div>
          <div className="resume-actions">
            {available ? (
              <>
                <a
                  className="button button-primary"
                  href="/resume.pdf"
                  download
                >
                  Download Resume <ArrowDownToLine size={16} />
                </a>
                <a
                  className="text-link"
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  View Resume <ExternalLink size={14} />
                </a>
              </>
            ) : (
              <>
                <button className="button button-outline" disabled>
                  Download Resume <ArrowDownToLine size={16} />
                </button>
                <button className="text-link" disabled>
                  View Resume <ExternalLink size={14} />
                </button>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section
      id="contact"
      className="section contact-section"
      data-scroll-scene="Let’s connect"
    >
      <div className="container">
        <span className="section-label">
          <span>06</span>
          <span className="tiny-line" />
          LET’S CONNECT
        </span>
        <div className="contact-layout">
          <Reveal className="contact-copy">
            <h2>
              Have an idea?
              <br />
              <span>Let’s build it.</span>
              <ArrowUpRight className="contact-arrow" strokeWidth={0.8} />
            </h2>
            <p>
              I’m open to software engineering roles, internships, freelance
              projects and thoughtful collaborations.
            </p>
            <div className="contact-links">
              {profile.email ? (
                <div>
                  <a href={`mailto:${profile.email}`}>
                    <Mail size={19} />
                    <span>
                      <small>DROP ME A LINE</small>
                      {profile.email}
                    </span>
                    <ArrowUpRight size={18} />
                  </a>
                  <CopyEmail email={profile.email} />
                </div>
              ) : (
                <div className="email-unavailable">
                  <Mail size={19} />
                  <span>
                    <small>EMAIL</small>Email contact coming soon
                  </span>
                </div>
              )}
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                <Linkedin size={19} />
                <span>
                  <small>LET’S TALK</small>Connect on LinkedIn
                </span>
                <ArrowUpRight size={18} />
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer">
                <Github size={19} />
                <span>
                  <small>EXPLORE THE CODE</small>github.com/Sahan202
                </span>
                <ArrowUpRight size={18} />
              </a>
              <a href={profile.phoneHref}>
                <Phone size={19} />
                <span>
                  <small>CALL OR TEXT</small>
                  {profile.phone}
                </span>
                <ArrowUpRight size={18} />
              </a>
              <a href={profile.whatsappHref} target="_blank" rel="noreferrer">
                <MessageCircle size={19} />
                <span>
                  <small>WHATSAPP</small>
                  Message me on WhatsApp
                </span>
                <ArrowUpRight size={18} />
              </a>
            </div>
            <div className="contact-location">
              <Globe2 size={16} />
              <span>Based in Sri Lanka. Open to the world.</span>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <Link href="/#home" className="wordmark">
            Sahan<span>.</span>
          </Link>
          <span>Sahan Sudeepa Gunawardhana</span>
          <a href="#top" className="back-to-top">
            BACK TO TOP <ArrowUp size={15} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Sahan Sudeepa Gunawardhana</span>
          <span>
            <Code2 size={13} /> Designed & built with Next.js.
          </span>
          <div>
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub <ArrowUpRight size={12} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <ArrowUpRight size={12} />
            </a>
            {profile.email ? (
              <a href={`mailto:${profile.email}`}>
                Email <ArrowUpRight size={12} />
              </a>
            ) : null}
            <a href={profile.whatsappHref} target="_blank" rel="noreferrer">
              WhatsApp <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
