'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import IconButton from '@modules/ui/components/icon-button/icon-button';
import Link from 'next/link';

const NavbarUserDetails: React.FC = () => {
  const { data, status } = useSession();

  if (status === 'loading') return <>loading</>;
  if (status === 'unauthenticated') return null;
  if (!data) return null;

  return (
    <Link href={`/user/${data.user.id}`}>
      <IconButton
        icon={
          <svg
            className="h-5 w-5 stroke-black dark:stroke-white"
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
        }
      />
    </Link>
  );
};

export default NavbarUserDetails;
