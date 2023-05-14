import HomeFeatures from '@modules/home/components/features/home-features';
import HomeHero from '@modules/home/components/hero/home-hero';
import HomeNewsletter from '@modules/home/components/newsletter/home-newsletter';
import HomeShorten from '@modules/home/components/shorten/home-shorten';
import HomeStats from '@modules/home/components/stats/home-stats';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@modules/auth/lib/auth.lib';

const HomePage = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <div className="flex flex-col items-center justify-center">
      <HomeHero />
      <HomeShorten />
      <HomeFeatures />
      <HomeStats />
      <HomeNewsletter />
    </div>
  );
};

export default HomePage;
