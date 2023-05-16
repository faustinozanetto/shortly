'use client';
import React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@modules/ui/components/dropdown-menu/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Session } from 'next-auth';
import Link from 'next/link';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

type NavbarUserDetailsProps = {
  user: Session['user'];
};

const NavbarUserDetails: React.FC<NavbarUserDetailsProps> = (props) => {
  const { user } = props;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-center">
        {user && user.image ? (
          <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
            <Image src={user.image} alt={`${user.name} Avatar`} width={200} height={200} />
          </div>
        ) : (
          <svg
            className="h-10 w-10 rounded-full bg-neutral-300 stroke-neutral-900 p-2 dark:bg-neutral-700 dark:stroke-neutral-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="12" cy="7" r="4" />
            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
          </svg>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-semibold">{user.name}</p>}
            {user.email && <p className="w-[200px] truncate text-sm">{user.email}</p>}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">
            <svg
              className="mr-2 h-4 w-4 stroke-neutral-900 dark:stroke-neutral-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="4" y1="19" x2="20" y2="19" />
              <polyline points="4 15 8 9 12 11 16 6 20 10" />
            </svg>
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(event) => {
            event.preventDefault();
            signOut({
              callbackUrl: `${window.location.origin}/`,
            });
          }}
        >
          <svg
            className="mr-2 h-4 w-4 stroke-neutral-900 dark:stroke-neutral-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
            <path d="M7 12h14l-3 -3m0 6l3 -3" />
          </svg>
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarUserDetails;
