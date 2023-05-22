import React from 'react';
import Image from 'next/image';
import UserLinkDetailsStatsEntry from './user-link-details-stats-entry';
import UserLinkDetailsStatsCategory from './user-link-details-stats-category';
import { LinkStatsResponse } from '@modules/analytics/types/analytics.types';

type UserLinkDetailsStatsBrowsersProps = {
  alias: string;
};

const UserLinkDetailsStatsBrowsers = (props: UserLinkDetailsStatsBrowsersProps) => {
  const { alias } = props;

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <UserLinkDetailsStatsCategory
        category="Browsers"
        alias={alias}
        dataType="browser"
        renderContent={(data: LinkStatsResponse<string>) => {
          return (
            <>
              {data.map((browser) => {
                return (
                  <UserLinkDetailsStatsEntry
                    key={browser.entry}
                    label={browser.entry}
                    count={browser.count}
                    renderIcon={() => {
                      return (
                        <Image
                          src={`https://faisalman.github.io/ua-parser-js/images/browsers/${browser.entry.toLowerCase()}.png`}
                          alt={browser.entry}
                          width={20}
                          height={20}
                        />
                      );
                    }}
                  />
                );
              })}
            </>
          );
        }}
      />
    </>
  );
};

export default UserLinkDetailsStatsBrowsers;
