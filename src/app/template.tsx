'use client';

import { MotionConfig, motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

export default function Template({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial={false}
        animate={reduced ? undefined : { opacity: [0.8, 1] }}
        transition={{ duration: 0.35 }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
