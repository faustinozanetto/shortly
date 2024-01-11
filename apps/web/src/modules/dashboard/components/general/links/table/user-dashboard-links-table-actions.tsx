import { Button } from '@modules/ui/components/button/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@modules/ui/components/dropdown-menu/dropdown-menu';
import { Link as PrismaLink } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

type UserDhasboardLinksTableActionsProps = {
  link: PrismaLink;
};

const UserDashboardLinksTableActions: React.FC<UserDhasboardLinksTableActionsProps> = (props) => {
  const { link } = props;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open actions menu</span>
          <svg
            className="h-4 w-4 stroke-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="5" cy="12" r="1" />
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Link Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <svg
            className="mr-2 h-4 w-4 stroke-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="9" y1="6" x2="20" y2="6" />
            <line x1="9" y1="12" x2="20" y2="12" />
            <line x1="9" y1="18" x2="20" y2="18" />
            <line x1="5" y1="6" x2="5" y2="6.01" />
            <line x1="5" y1="12" x2="5" y2="12.01" />
            <line x1="5" y1="18" x2="5" y2="18.01" />
          </svg>
          <Link href={`/dashboard/${link.alias}`}>Details</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDashboardLinksTableActions;
