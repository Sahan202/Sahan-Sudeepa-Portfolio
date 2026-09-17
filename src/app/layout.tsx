import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@fontsource-variable/manrope';
import '@/index.css';
import './portfolio.css';
import './scroll-experience.css';
import './portfolio-journey.css';
import './cinematic-scenes.css';
import { profile } from '@/data/portfolio';
import { AmbientBackground } from '@/components/portfolio/ambient-background';

const title =
  'Sahan Sudeepa Gunawardhana | Software Engineer & Full-Stack Developer';
const description =
  'Portfolio of Sahan Sudeepa Gunawardhana, a Software Engineering student and Full-Stack Developer building modern web applications and real-world software solutions.';
export const metadata: Metadata = {
  metadataBase: new URL(profile.url),
  title: { default: title, template: '%s | Sahan Sudeepa' },
  description,
  openGraph: {
    title,
    description,
    url: profile.url,
    siteName: 'Sahan Sudeepa',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Sahan Sudeepa — Software Engineer & Full-Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/opengraph-image'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('portfolio-theme');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t;document.documentElement.classList.toggle('dark',t==='dark')}}catch(e){}`,
          }}
        />
      </head>
      <body id="top">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <div className="site-shell">
          <AmbientBackground />
          {children}
        </div>
      </body>
    </html>
  );
}
