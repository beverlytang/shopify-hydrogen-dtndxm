import {lazy, Suspense} from 'react';

const Fallback = () => <div>loading...</div>;
const Hero = import.meta.env.SSR
  ? Fallback
  : lazy(() =>
      import('./Hero.client.jsx').then((mod) => ({
        default: mod.Hero,
      })),
    );

export default function HeroLazy(props) {
  if (typeof document !== 'undefined') {
    return (
      <Suspense fallback={<Fallback />}>
        <Hero {...props} />
      </Suspense>
    );
  }
}
