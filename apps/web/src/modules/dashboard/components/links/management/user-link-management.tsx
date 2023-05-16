'use client';
import Button from '@modules/ui/components/button/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@modules/ui/components/dropdown-menu/dropdown-menu';
import { Link } from '@prisma/client';
import React, { useState } from 'react';
import UserLinkManagementDelete from './delete/user-link-management-delete';

type UserLinkManagementProps = {
  link: Link;
};

const UserLinkManagement: React.FC<UserLinkManagementProps> = (props) => {
  const { link } = props;

  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open actions menu</span>
            <svg
              className="h-4 w-4 stroke-neutral-900 dark:stroke-neutral-50"
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
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onSelect={() => setShowDeleteAlert(true)}>
            <svg
              className="mr-2 h-4 w-4 stroke-red-600 dark:stroke-red-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
            </svg>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Alert Dialogs */}
      <UserLinkManagementDelete link={link} showDeleteAlert={showDeleteAlert} setShowDeleteAlert={setShowDeleteAlert} />
    </>
  );
};

export default UserLinkManagement;
