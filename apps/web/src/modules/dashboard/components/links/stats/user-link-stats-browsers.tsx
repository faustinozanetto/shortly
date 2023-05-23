'use client';
import React from 'react';
import Image from 'next/image';
import UserLinkStatsEntry from './common/user-link-stats-entry';
import UserLinkStatsCategory from './common/user-link-stats-category';
import { LinkStatsResponse } from '@modules/analytics/types/analytics.types';

const UserLinkStatsBrowsers = () => {
  return (
    <UserLinkStatsCategory
      category="Browsers"
      dataType="browser"
      renderContent={(data: LinkStatsResponse<string>, total) => {
        return (
          <>
            {data.map((browser) => {
              return (
                <UserLinkStatsEntry
                  key={browser.entry}
                  label={browser.entry}
                  count={browser.count}
                  total={total}
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
  );
};

export default UserLinkStatsBrowsers;
