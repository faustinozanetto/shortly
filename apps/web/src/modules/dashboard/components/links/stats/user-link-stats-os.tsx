'use client';
import React from 'react';
import Image from 'next/image';
import UserLinkStatsEntry from './common/user-link-stats-entry';
import UserLinkStatsCategory from './common/user-link-stats-category';
import { LinkStatsResponse } from '@modules/analytics/types/analytics.types';

const UserLinkStatsOS = () => {
  return (
    <UserLinkStatsCategory
      category="Operative System"
      dataType="os"
      renderContent={(data: LinkStatsResponse<string>) => {
        return (
          <>
            {data.map((os) => {
              return (
                <UserLinkStatsEntry
                  key={os.entry}
                  label={os.entry}
                  count={os.count}
                  renderIcon={() => {
                    return (
                      <Image
                        src={`https://faisalman.github.io/ua-parser-js/images/os/${os.entry.toLowerCase()}.png`}
                        alt={os.entry}
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

export default UserLinkStatsOS;
