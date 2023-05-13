import HomeFeatures from '@modules/home/components/features/home-features';
import HomeHero from '@modules/home/components/hero/home-hero';
import HomeShorten from '@modules/home/components/shorten/home-shorten';
import HomeStats from '@modules/home/components/stats/home-stats';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home Page | Shortly',
  description: 'Shortly is a free and easy to use url shortner.',
};

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <HomeHero />
      <HomeShorten />
      <HomeFeatures />
      <HomeStats />
    </div>
  );
};

export default HomePage;
