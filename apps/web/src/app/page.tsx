'use client';
import HomeFeatures from '@modules/home/components/features/home-features';
import HomeHero from '@modules/home/components/hero/home-hero';
import HomeNewsletter from '@modules/home/components/newsletter/home-newsletter';
import HomeShorten from '@modules/home/components/shorten/home-shorten';
import HomeStats from '@modules/home/components/stats/home-stats';
import { LazyMotion, domAnimation } from 'framer-motion';

const HomePage: React.FC = () => {
  return (
    <LazyMotion features={domAnimation}>
      <div className="flex flex-col items-center justify-center">
        <HomeHero />
        <HomeShorten />
        <HomeFeatures />
        <HomeStats />
        <HomeNewsletter />
      </div>
    </LazyMotion>
  );
};

export default HomePage;
