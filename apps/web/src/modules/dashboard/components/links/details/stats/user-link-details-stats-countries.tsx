import React from 'react';
import Image from 'next/image';
import UserLinkDetailsStatsEntry from './common/user-link-details-stats-entry';
import UserLinkDetailsStatsCategory from './common/user-link-details-stats-category';
import { LinkStatsResponse } from '@modules/analytics/types/analytics.types';

type UserLinkDetailsStatsCountriesProps = {
  alias: string;
};

const UserLinkDetailsStatsCountries = (props: UserLinkDetailsStatsCountriesProps) => {
  const { alias } = props;

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <UserLinkDetailsStatsCategory
        category="Countries"
        alias={alias}
        dataType="country"
        renderContent={(data: LinkStatsResponse<string>) => {
          return (
            <>
              {data.map((country) => {
                return (
                  <UserLinkDetailsStatsEntry
                    key={country.entry}
                    label={country.entry}
                    count={country.count}
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
    </>
  );
};

export default UserLinkDetailsStatsCountries;
