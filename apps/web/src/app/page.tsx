import HomeFeatures from '@modules/home/components/features/home-features';
import HomeHero from '@modules/home/components/hero/home-hero';
import HomeNewsletter from '@modules/home/components/newsletter/home-newsletter';
import HomeShorten from '@modules/home/components/shorten/home-shorten';
import HomeStats from '@modules/home/components/stats/home-stats';
import { HomeStatsData } from '@modules/home/types/home.types';
import {
  getTotalActiveUsers,
  getTotalLinksClicked,
  getTotalLinksShortened,
} from '@modules/url-shortener/lib/url-shortener-db';

const HomePage = async () => {
  const getHomeStatsData = async (): Promise<HomeStatsData> => {
    const totalLinksShortened = await getTotalLinksShortened();
    const totalActiveUsers = await getTotalActiveUsers();
    const totalLinksClicked = await getTotalLinksClicked();

    return {
      linksShortened: totalLinksShortened,
      activeUsers: totalActiveUsers,
      linksClicked: totalLinksClicked,
      uptimeServer: 99,
    };
  };

  const statsData = await getHomeStatsData();

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <HomeHero />
      <HomeShorten />
      <HomeFeatures />
      <HomeStats stats={statsData} />
      <HomeNewsletter />
    </div>
  );
};

export default HomePage;
