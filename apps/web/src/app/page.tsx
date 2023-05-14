import HomeFeatures from '@modules/home/components/features/home-features';
import HomeHero from '@modules/home/components/hero/home-hero';
import HomeNewsletter from '@modules/home/components/newsletter/home-newsletter';
import HomeShorten from '@modules/home/components/shorten/home-shorten';
import HomeStats from '@modules/home/components/stats/home-stats';

const HomePage = async () => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <HomeHero />
      <HomeShorten />
      <HomeFeatures />
      <HomeStats />
      <HomeNewsletter />
    </div>
  );
};

export default HomePage;
