import {
  Activity,
  ArrowUpRight,
  Check,
  FileText,
  Hand,
  Layers,
  MapPin,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import Image from 'next/image';
import type { Project } from '@/data/portfolio';

export function ProjectVisual({
  project,
  large = false,
}: {
  project: Project;
  large?: boolean;
}) {
  return (
    <div
      className={`project-visual visual-${project.accent} ${large ? 'visual-large' : ''} ${project.image ? 'has-project-screenshot' : ''}`}
      role="img"
      aria-label={
        project.image
          ? (project.imageAlt ?? `Project screenshot for ${project.title}`)
          : `Illustrative interface concept for ${project.title}`
      }
    >
      {project.image && (
        <div className="project-screenshot-frame">
          <Image
            className="project-screenshot"
            src={project.image}
            alt=""
            role="presentation"
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
          />
          <div className="project-screenshot-shade">
            <span className="project-screenshot-scan" />
          </div>
        </div>
      )}
      <div className="visual-grid" />
      <span className="concept-label">INTERFACE CONCEPT</span>
      {project.slug === 'ai-resume-analyzer' && (
        <div className="resume-preview">
          <div className="preview-sidebar">
            <span className="preview-brand">
              <Sparkles size={15} /> resume<span>ai</span>
            </span>
            <span className="preview-nav active">
              <Layers size={10} /> Overview
            </span>
            <span className="preview-nav">
              <FileText size={10} /> Documents
            </span>
            <span className="preview-nav">
              <Activity size={10} /> Insights
            </span>
            <div className="preview-avatar">
              S <span>My workspace</span>
            </div>
          </div>
          <div className="preview-main">
            <div className="preview-heading">
              Your next chapter starts here.
              <span>Understand your fit. Find your direction.</span>
            </div>
            <div className="resume-results">
              <div className="match-orb">
                <Check size={23} />
                <span>Match analysis</span>
              </div>
              <div className="analysis-lines">
                <span>
                  Skills alignment <i />
                </span>
                <b />
                <b />
                <b />
                <span className="analysis-pill">
                  <Sparkles size={10} /> AI-powered insights
                </span>
              </div>
            </div>
            <div className="preview-bottom">
              <FileText size={14} />
              <span>
                Resume analysis<small>Personalized recommendations</small>
              </span>
              <ArrowUpRight size={15} />
            </div>
          </div>
        </div>
      )}
      {project.slug === 'lucky-travel' && (
        <div className="travel-preview">
          <div className="travel-top">
            <b>
              <MapPin size={13} /> lucky<span>travel</span>
            </b>
            <span>Explore &nbsp; Plan a trip &nbsp; ↗</span>
          </div>
          <div className="travel-landscape">
            <div className="sun-disc" />
            <div className="mountain mountain-back" />
            <div className="mountain mountain-front" />
            <div className="travel-copy">
              <span>THE ISLAND IS CALLING</span>
              <strong>
                Somewhere new.
                <br />
                Something you.
              </strong>
              <span className="travel-cta">
                Find your Sri Lanka <ArrowUpRight size={10} />
              </span>
            </div>
            <div className="destination-card">
              <MapPin size={12} />
              <span>
                Ella, Sri Lanka<small>Your next adventure</small>
              </span>
            </div>
          </div>
          <div className="travel-search">
            <span>
              Destination <b>Sri Lanka</b>
            </span>
            <span>
              Your interests <b>Nature & discovery</b>
            </span>
            <span className="travel-search-button">
              <Sparkles size={13} /> Plan with AI
            </span>
          </div>
        </div>
      )}
      {project.slug === 'krish-fx-swing-lab' && (
        <div className="mobile-app-preview swing-preview">
          <div className="mobile-device-top">
            <span>9:41</span>
            <span>● ● ▰</span>
          </div>
          <div className="mobile-app-heading">
            <span>Good morning, Krish</span>
            <strong>
              Keep learning.
              <br />
              Keep moving.
            </strong>
          </div>
          <div className="mobile-course-card">
            <span className="eyebrow">CONTINUE LEARNING</span>
            <strong>FX Swing Foundations</strong>
            <div>
              <i />
              <span>Lesson 08 of 12</span>
              <b>67%</b>
            </div>
          </div>
          <div className="mobile-app-row">
            <span>Live class tonight</span>
            <b>Join Zoom ↗</b>
          </div>
          <div className="mobile-device-nav">
            <span>⌂</span>
            <span className="selected">▦</span>
            <span>◉</span>
            <span>◎</span>
          </div>
        </div>
      )}
      {project.slug === 'campusmate' && (
        <div className="mobile-app-preview campus-preview">
          <div className="mobile-device-top">
            <span>9:41</span>
            <span>● ● ▰</span>
          </div>
          <div className="campus-brand">
            <span>Campus</span>Mate <b>☼</b>
          </div>
          <div className="campus-greeting">
            Your week, in view.<small>Here’s what needs your attention.</small>
          </div>
          <div className="campus-stats">
            <div>
              <span>Next deadline</span>
              <strong>Database Systems</strong>
              <small>Tomorrow · 10:00 AM</small>
            </div>
            <div>
              <span>Current GPA</span>
              <strong>3.68</strong>
              <small>Keep going</small>
            </div>
          </div>
          <div className="campus-list">
            <span>
              <i />
              Assignments <b>04</b>
            </span>
            <span>
              <i />
              Study plan <b>03</b>
            </span>
            <span>
              <i />
              Notes <b>12</b>
            </span>
          </div>
          <div className="mobile-device-nav">
            <span className="selected">⌂</span>
            <span>▦</span>
            <span>◷</span>
            <span>◎</span>
          </div>
        </div>
      )}
      {project.slug === 'bird-smash' && (
        <div className="game-preview">
          <div className="game-top">
            <span>BIRD / SMASH</span>
            <span className="game-status">
              <i /> HAND TRACKING
            </span>
          </div>
          <div className="game-target target-one">✦</div>
          <div className="game-target target-two">✦</div>
          <div className="game-target target-three">✦</div>
          <div className="hand-target">
            <Hand size={70} strokeWidth={0.8} />
            <span />
            <i />
          </div>
          <div className="game-bottom">
            <span>MOVE. CONNECT. PLAY.</span>
            <span>WEBCAM × COMPUTER VISION</span>
          </div>
        </div>
      )}
      {project.slug === 'wattdeal' && (
        <div className="bid-preview">
          <div className="bid-top">
            <b>
              wattdeal<span>↗</span>
            </b>
            <span>Discover &nbsp; Marketplace</span>
          </div>
          <div className="bid-content">
            <div className="product-object">
              <div className="speaker">
                <i />
                <i />
                <span />
              </div>
              <span>A NEW WAY TO TRADE</span>
            </div>
            <div className="bid-details">
              <span className="eyebrow">THE MARKETPLACE</span>
              <strong>
                Find it.
                <br />
                Bid on it.
                <br />
                Make it yours.
              </strong>
              <div className="bid-action">
                Explore bidding <ArrowUpRight size={14} />
              </div>
            </div>
          </div>
        </div>
      )}
      {project.slug === 'cinema-crowd-prediction' && (
        <div className="cinema-preview">
          <div className="cinema-top">
            <Activity size={14} />
            <b>Cinema intelligence</b>
            <span>RESEARCH DASHBOARD</span>
          </div>
          <div className="chart-title">
            See the pattern.
            <br />
            <span>Understand the prediction.</span>
          </div>
          <div className="chart-bars">
            {[
              28, 43, 35, 60, 48, 73, 67, 91, 79, 62, 85, 98, 78, 65, 55, 42,
            ].map((height, i) => (
              <i key={i} style={{ height: `${height}%` }} />
            ))}
          </div>
          <div className="chart-footer">
            <span>DEMAND SIGNALS</span>
            <span>
              <i /> PREDICTION CONCEPT
            </span>
          </div>
        </div>
      )}
      {project.slug === 'botcalm' && (
        <div className="compliance-preview">
          <div className="compliance-symbol">
            <ShieldCheck size={52} strokeWidth={1} />
          </div>
          <span className="eyebrow">BOTCALM</span>
          <strong>
            Built on trust.
            <br />
            Refined through detail.
          </strong>
          <div className="compliance-tags">
            <span>
              <Check size={12} /> UI quality
            </span>
            <span>
              <Check size={12} /> Collaboration
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
