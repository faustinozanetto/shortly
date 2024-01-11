'use client';
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@modules/ui/components/tooltip/tooltip';
import Link from 'next/link';
import { Link as PrismaLink } from '@prisma/client';
import { getCompleteShortenedURL } from '@modules/url-shortener/lib/url-shortener.lib';

type LinkAliasProps = {
  link: PrismaLink | null;
  loading?: boolean;
};

const LinkAlias: React.FC<LinkAliasProps> = (props) => {
  const { link, loading = false } = props;

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0.25}>
        <TooltipTrigger asChild>
          <div className="hover:cursor-pointer">
            <Link
              href={link ? getCompleteShortenedURL(link.alias!) : '/'}
              className="text-primary block truncate font-semibold md:text-lg"
              prefetch={false}
              target="_blank"
            >{`@${link ? link.alias : 'Alias'}`}</Link>
          </div>
        </TooltipTrigger>
        <TooltipContent className="font-semibold">
          <p>Link Alias</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default LinkAlias;
