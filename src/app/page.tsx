import type { Metadata } from 'next';
import { Cursor, Navigation } from '@/components/portfolio/interactions';
import { ScrollHero } from '@/components/portfolio/scroll-hero';
import { ScrollChapter } from '@/components/portfolio/scroll-chapter';
import { ScrollJourney } from '@/components/portfolio/scroll-journey';
import {
  About,
  Contact,
  Education,
  Experience,
  Footer,
  GithubShowcase,
  ProcessInterlude,
  Resume,
  Skills,
  Work,
} from '@/sections/home-sections';
import { profile } from '@/data/portfolio';

export const metadata: Metadata = { alternates: { canonical: '/' } };

export default function Home() {
  return (
    <>
      <Navigation />
      <Cursor />
      <main id="main-content" className="scroll-home">
        <ScrollJourney />
        <ScrollHero />
        <div className="tech-ribbon" aria-label="Primary technologies">
          <div className="container">
            <span className="eyebrow">
              BUILT WITH PURPOSE.
              <br />
              POWERED BY THE STACK.
            </span>
            <div className="ribbon-items">
              <span>
                <b>✳</b> React
              </span>
              <i className="ribbon-dot" />
              <span>
                <b>Ⓝ</b> Next.js
              </span>
              <i className="ribbon-dot" />
              <span>
                <b>TS</b> TypeScript
              </span>
              <i className="ribbon-dot" />
              <span>
                <b>⬡</b> Node.js
              </span>
              <i className="ribbon-dot" />
              <span>
                <b>◈</b> Python
              </span>
              <i className="ribbon-dot" />
              <span>
                <b>↗</b> Supabase
              </span>
            </div>
          </div>
        </div>
        <ScrollChapter scene="about">
          <About />
        </ScrollChapter>
        <ScrollChapter scene="projects">
          <Work />
        </ScrollChapter>
        <ScrollChapter scene="skills">
          <Skills />
        </ScrollChapter>
        <ProcessInterlude />
        <ScrollChapter>
          <Experience />
        </ScrollChapter>
        <ScrollChapter tone="paper">
          <Education />
        </ScrollChapter>
        <ScrollChapter>
          <GithubShowcase />
        </ScrollChapter>
        <ScrollChapter tone="paper">
          <Resume />
        </ScrollChapter>
        <ScrollChapter scene="contact">
          <Contact />
        </ScrollChapter>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: profile.name,
            url: profile.url,
            sameAs: [profile.github, profile.linkedin],
            description:
              'Software Engineering student and Full-Stack Developer based in Sri Lanka.',
            knowsAbout: [
              'Software Engineering',
              'Full-Stack Development',
              'React',
              'Next.js',
              'TypeScript',
              'Machine Learning',
            ],
          }).replace(/</g, '\\u003c'),
        }}
      />
    </>
  );
}
