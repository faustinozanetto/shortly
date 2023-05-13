import HomeHero from '@modules/home/components/hero/home-hero';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home Page | Shortly',
  description: 'Shortly is a free and easy to use url shortner.',
};

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <HomeHero />
    </div>
  );
};

export default HomePage;
