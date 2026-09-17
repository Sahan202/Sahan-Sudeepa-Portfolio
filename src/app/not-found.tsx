import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Navigation } from '@/components/portfolio/interactions';
import { Footer } from '@/sections/home-sections';
export default function NotFound() {
  return (
    <>
      <Navigation detail />
      <main id="main-content" className="not-found container">
        <span className="eyebrow">404 / A SMALL DETOUR</span>
        <h1>This page isn’t here.</h1>
        <p>Let’s get you back to something worth exploring.</p>
        <Link href="/#projects" className="button button-primary">
          Explore my work <ArrowUpRight size={17} />
        </Link>
      </main>
      <Footer />
    </>
  );
}
