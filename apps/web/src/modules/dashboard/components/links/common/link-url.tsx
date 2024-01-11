'use client';
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@modules/ui/components/tooltip/tooltip';
import Link from 'next/link';
import { Link as PrismaLink } from '@prisma/client';

type LinkURLProps = {
  link: PrismaLink | null;
  loading?: boolean;
};

const LinkURL: React.FC<LinkURLProps> = (props) => {
  const { link, loading = false } = props;

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0.25}>
        <TooltipTrigger asChild>
          <div className="hover:cursor-pointer">
            <Link
              href={(link && link.url) ?? '/'}
              className="block max-w-[170px] truncate text-sm font-medium sm:max-w-[300px] md:max-w-[400px] lg:max-w-[550px] xl:max-w-full"
              target="_blank"
              prefetch={false}
            >
              {link?.url ?? 'Default URL'}
            </Link>
          </div>
        </TooltipTrigger>
        <TooltipContent className="font-semibold">
          <p>Link URL</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default LinkURL;
