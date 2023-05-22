import React from 'react';
import Image from 'next/image';
import UserLinkDetailsStatsEntry from './user-link-details-stats-entry';
import UserLinkDetailsStatsCategory from './user-link-details-stats-category';
import { LinkStatsResponse } from '@modules/analytics/types/analytics.types';

type UserLinkDetailsStatsDevicesProps = {
  alias: string;
};

const UserLinkDetailsStatsDevices = (props: UserLinkDetailsStatsDevicesProps) => {
  const { alias } = props;

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <UserLinkDetailsStatsCategory
        category="Devices"
        alias={alias}
        dataType="device"
        renderContent={(data: LinkStatsResponse<string>) => {
          return (
            <>
              {data.map((device) => {
                return (
                  <UserLinkDetailsStatsEntry
                    key={device.entry}
                    label={device.entry}
                    count={device.count}
                    renderIcon={() => {
                      return (
                        <Image
                          src={
                            device.entry === 'Desktop'
                              ? `https://faisalman.github.io/ua-parser-js/images/types/default.png`
                              : `https://faisalman.github.io/ua-parser-js/images/types/${device.entry.toLowerCase()}.png`
                          }
                          alt={device.entry}
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

export default UserLinkDetailsStatsDevices;
