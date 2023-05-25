'use client';
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@modules/ui/components/tooltip/tooltip';
import { Skeleton } from '@modules/ui/components/skeleton/skeleton';
import Link from 'next/link';
import { Link as PrismaLink } from '@prisma/client';
import { getCompleteShortenedURL } from '@modules/url-shortener/lib/url-shortener.lib';

type UserLinkAliasProps = {
  link: PrismaLink | null;
  loading?: boolean;
};

const UserLinkAlias: React.FC<UserLinkAliasProps> = (props) => {
  const { link, loading = false } = props;

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0.25}>
        <TooltipTrigger asChild>
          <div className="hover:cursor-pointer">
            <Skeleton loading={loading || !link}>
              <Link
                href={link ? getCompleteShortenedURL(link.alias!) : '/'}
                className="text-primary-600 block truncate font-semibold dark:text-purple-400 md:text-lg"
                target="_blank"
              >{`@${link ? link.alias : 'Alias'}`}</Link>
            </Skeleton>
          </div>
        </TooltipTrigger>
        <TooltipContent className="font-semibold">
          <p>Link Alias</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default UserLinkAlias;
