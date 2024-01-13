import React from 'react';

import { LinkStatEntry } from '@modules/analytics/types/analytics.types';
import Image from 'next/image';
import UserLinkStatsCategory, { LinkStatsListsCategoryProps } from './link-stats-lists-category';
import LinkStatsListsEntry from './link-stats-lists-entry';

type LinkStatsListsCategory = Pick<LinkStatsListsCategoryProps, 'title' | 'categoryType'> & {
  onRenderIcon: (entry: unknown) => JSX.Element;
};

const LINK_STATS_LISTS: LinkStatsListsCategory[] = [
  {
    title: 'Browsers',
    categoryType: 'browser',
    onRenderIcon: (entry: string) => {
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
    title: 'Countries',
    categoryType: 'country',
    onRenderIcon: (entry: string) => {
      return <Image src={`https://flag.vercel.app/m/${entry}.svg`} alt={entry} width={20} height={20} />;
    },
  },
  {
    title: 'Devices',
    categoryType: 'device',
    onRenderIcon: (entry: string) => {
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
    title: 'Operative System',
    categoryType: 'os',
    onRenderIcon: (entry: string) => {
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

const LinkStatsLists: React.FC = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {LINK_STATS_LISTS.map((stats) => {
        return (
          <UserLinkStatsCategory
            key={stats.title}
            title={stats.title}
            categoryType={stats.categoryType}
            onRenderContent={(data, total) => {
              return (
                <>
                  {data.map((statEntry: LinkStatEntry<string>) => {
                    return (
                      <LinkStatsListsEntry
                        key={statEntry.entry}
                        label={statEntry.entry}
                        count={statEntry.count}
                        total={total}
                        onRenderIcon={() => stats.onRenderIcon(statEntry.entry)}
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
  );
};

export default LinkStatsLists;
