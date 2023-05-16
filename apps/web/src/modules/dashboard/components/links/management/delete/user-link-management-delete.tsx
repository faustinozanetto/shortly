'use client';
import { useToast } from '@modules/toasts/hooks/use-toast';
import { DropdownMenuItem } from '@modules/ui/components/dropdown-menu/dropdown-menu';
import { Link } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

type UserLinkManagementDeleteProps = {
  link: Link;
};

const UserLinkManagementDelete: React.FC<UserLinkManagementDeleteProps> = (props) => {
  const { link } = props;
  const router = useRouter();
  const { toast } = useToast();
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  const handleUserLinkDelete = async () => {
    const deleteResponse = await fetch(`/api/links/${link.id}`, {
      method: 'DELETE',
    });

    if (deleteResponse && !deleteResponse.ok) {
      return toast({
        variant: 'error',
        content: 'An error occurred while deleting link!',
      });
    }

    router.refresh();
  };

  return (
    <DropdownMenuItem
      className="cursor-pointer"
      onSelect={async (event) => {
        event.preventDefault();
        await handleUserLinkDelete();
      }}
    >
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
  );
};

export default UserLinkManagementDelete;
