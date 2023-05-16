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
import { Dialog, DialogTrigger } from '@modules/ui/components/dialog/dialog';
import UserLinkManagementEdit from './edit/user-link-management-edit';
import EditIcon from '@modules/ui/components/icons/edit-icon';
import DeleteIcon from '@modules/ui/components/icons/delete-icon';

type UserLinkManagementProps = {
  link: Link;
};

const UserLinkManagement: React.FC<UserLinkManagementProps> = (props) => {
  const { link } = props;

  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);

  return (
    <>
      <Dialog>
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
            <DropdownMenuLabel>Link Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* Edit Link Trigger */}
            <DialogTrigger asChild>
              <DropdownMenuItem className="cursor-pointer">
                <EditIcon className="mr-2 stroke-blue-600 dark:stroke-blue-400" size="sm" />
                Edit
              </DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuSeparator />
            {/* Delete Link */}
            <DropdownMenuItem className="cursor-pointer" onSelect={() => setShowDeleteAlert(true)}>
              <DeleteIcon className="mr-2" size="sm" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Edit Dialog  */}
        <UserLinkManagementEdit link={link} />
        {/* Delete Alert Dialog */}
        <UserLinkManagementDelete
          link={link}
          showDeleteAlert={showDeleteAlert}
          setShowDeleteAlert={setShowDeleteAlert}
        />
      </Dialog>
    </>
  );
};

export default UserLinkManagement;
