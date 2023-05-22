'use client';
import React from 'react';
import Image from 'next/image';
import UserLinkStatsEntry from './common/user-link-stats-entry';
import UserLinkStatsCategory from './common/user-link-stats-category';
import { LinkStatsResponse } from '@modules/analytics/types/analytics.types';

const UserLinkStatsDevices = () => {
  return (
    <UserLinkStatsCategory
      category="Devices"
      dataType="device"
      renderContent={(data: LinkStatsResponse<string>) => {
        return (
          <>
            {data.map((device) => {
              return (
                <UserLinkStatsEntry
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
  );
};

export default UserLinkStatsDevices;
