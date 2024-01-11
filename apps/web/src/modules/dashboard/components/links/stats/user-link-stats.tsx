import React from 'react';
import UserLinkStatsCategory, { UserLinkStatsCategoryProps } from './common/user-link-stats-category';
import { LinkStatEntry } from '@modules/analytics/types/analytics.types';
import UserLinkStatsEntry from './common/user-link-stats-entry';
import Image from 'next/image';

type UserLinkStatsCategory = Pick<UserLinkStatsCategoryProps, 'category' | 'dataType'> & {
  renderIcon: (entry: unknown) => JSX.Element;
};

const USER_LINK_STATS: UserLinkStatsCategory[] = [
  {
    category: 'Browsers',
    dataType: 'browser',
    renderIcon: (entry: string) => {
      return (
        <Image
          src={`https://faisalman.github.io/ua-parser-js/images/browsers/${entry.toLowerCase()}.png`}
          alt={entry}
          width={20}
          height={20}
        />
      );
    },
  },
  {
    category: 'Countries',
    dataType: 'country',
    renderIcon: (entry: string) => {
      return <Image src={`https://flag.vercel.app/m/${entry}.svg`} alt={entry} width={20} height={20} />;
    },
  },
  {
    category: 'Devices',
    dataType: 'device',
    renderIcon: (entry: string) => {
      return (
        <Image
          src={
            entry === 'Desktop'
              ? `https://faisalman.github.io/ua-parser-js/images/types/default.png`
              : `https://faisalman.github.io/ua-parser-js/images/types/${entry.toLowerCase()}.png`
          }
          alt={entry}
          width={20}
          height={20}
        />
      );
    },
  },
  {
    category: 'Operative System',
    dataType: 'os',
    renderIcon: (entry: string) => {
      return (
        <Image
          src={`https://faisalman.github.io/ua-parser-js/images/os/${entry.toLowerCase()}.png`}
          alt={entry}
          width={20}
          height={20}
        />
      );
    },
  },
];

const UserLinkStats: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded border p-4 shadow">
        <h2 className="leading-2 block text-xl font-bold md:text-2xl lg:text-3xl">Link Stats</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {USER_LINK_STATS.map((stats) => {
          return (
            <UserLinkStatsCategory
              key={stats.category}
              category={stats.category}
              dataType={stats.dataType}
              renderContent={(data, total) => {
                return (
                  <>
                    {data.map((statEntry: LinkStatEntry<string>) => {
                      return (
                        <UserLinkStatsEntry
                          key={statEntry.entry}
                          label={statEntry.entry}
                          count={statEntry.count}
                          total={total}
                          renderIcon={() => stats.renderIcon(statEntry.entry)}
                        />
                      );
                    })}
                  </>
                );
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default UserLinkStats;
