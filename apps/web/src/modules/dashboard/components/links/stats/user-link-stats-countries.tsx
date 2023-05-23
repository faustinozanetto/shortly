'use client';
import React from 'react';
import Image from 'next/image';
import UserLinkStatsEntry from './common/user-link-stats-entry';
import UserLinkStatsCategory from './common/user-link-stats-category';
import { LinkStatsResponse } from '@modules/analytics/types/analytics.types';

const UserLinkStatsCountries = () => {
  return (
    <UserLinkStatsCategory
      category="Countries"
      dataType="country"
      renderContent={(data: LinkStatsResponse<string>, total) => {
        return (
          <>
            {data.map((country) => {
              return (
                <UserLinkStatsEntry
                  key={country.entry}
                  label={country.entry}
                  count={country.count}
                  total={total}
                  renderIcon={() => {
                    return (
                      <Image
                        src={`https://flag.vercel.app/m/${country.entry}.svg`}
                        alt={country.entry}
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

export default UserLinkStatsCountries;
