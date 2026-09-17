import { AmbientParticleField } from './ambient-particle-field';

export function AmbientBackground() {
  return (
    <div className="ambient-background" aria-hidden="true">
      <AmbientParticleField />
      <span className="ambient-orb ambient-orb-one" />
      <span className="ambient-orb ambient-orb-two" />
      <span className="ambient-orb ambient-orb-three" />
      <span className="ambient-scan" />
      <span className="ambient-cross ambient-cross-one" />
      <span className="ambient-cross ambient-cross-two" />
    </div>
  );
}
