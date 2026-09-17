import type { ReactNode } from 'react';
import { ChapterOverture, type ChapterScene } from './chapter-overture';

/** Full-screen scene followed by the complete, naturally flowing content. */
export function ScrollChapter({
  children,
  scene,
  tone = 'night',
}: {
  children: ReactNode;
  scene?: ChapterScene;
  tone?: 'night' | 'paper';
}) {
  return (
    <div className={`chapter-world chapter-world-${scene || tone}`}>
      {scene && <ChapterOverture scene={scene} />}
      <div className="full-page-chapter">
        <div className="scroll-chapter-stage">
          <div className="scroll-chapter-content">{children}</div>
        </div>
      </div>
    </div>
  );
}
