import React from 'react';
import Image from 'next/image';
import UserLinkDetailsStatsEntry from './common/user-link-details-stats-entry';
import UserLinkDetailsStatsCategory from './common/user-link-details-stats-category';
import { LinkStatsResponse } from '@modules/analytics/types/analytics.types';

type UserLinkDetailsStatsOSProps = {
  alias: string;
};

const UserLinkDetailsStatsOS = (props: UserLinkDetailsStatsOSProps) => {
  const { alias } = props;

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <UserLinkDetailsStatsCategory
        category="Operative System"
        alias={alias}
        dataType="os"
        renderContent={(data: LinkStatsResponse<string>) => {
          return (
            <>
              {data.map((os) => {
                return (
                  <UserLinkDetailsStatsEntry
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
    </>
  );
};

export default UserLinkDetailsStatsOS;
