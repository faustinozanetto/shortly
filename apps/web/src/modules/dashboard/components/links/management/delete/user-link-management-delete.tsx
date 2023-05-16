'use client';
import { useToast } from '@modules/toasts/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@modules/ui/components/alert-dialog/alert-dialog';
import { Link } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

type UserLinkManagementDeleteProps = {
  link: Link;
  showDeleteAlert: boolean;
  setShowDeleteAlert: (show: boolean) => void;
};

const UserLinkManagementDelete: React.FC<UserLinkManagementDeleteProps> = (props) => {
  const { link, showDeleteAlert, setShowDeleteAlert } = props;

  const router = useRouter();
  const { toast } = useToast();
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  const handleUserLinkDelete = async () => {
    const deleteResponse = await fetch(`/api/links/${link.id}`, {
      method: 'DELETE',
    });

    if (deleteResponse && !deleteResponse.ok) {
      toast({
        variant: 'error',
        content: 'An error occurred while deleting link!',
      });
      return false;
    }

    return true;
  };

  return (
    <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this Link?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async (event) => {
              event.preventDefault();
              setIsDeleteLoading(true);

              const deleted = await handleUserLinkDelete();
              if (deleted) {
                setIsDeleteLoading(false);
                setShowDeleteAlert(false);
                router.refresh();
              }
            }}
            className="!bg-red-600 focus:!ring-red-600"
          >
            {!isDeleteLoading ? (
              <svg
                className="mr-2 h-4 w-4 animate-spin stroke-neutral-900 dark:stroke-neutral-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="12" y1="6" x2="12" y2="3" />
                <line x1="16.25" y1="7.75" x2="18.4" y2="5.6" />
                <line x1="18" y1="12" x2="21" y2="12" />
                <line x1="16.25" y1="16.25" x2="18.4" y2="18.4" />
                <line x1="12" y1="18" x2="12" y2="21" />
                <line x1="7.75" y1="16.25" x2="5.6" y2="18.4" />
                <line x1="6" y1="12" x2="3" y2="12" />
                <line x1="7.75" y1="7.75" x2="5.6" y2="5.6" />
              </svg>
            ) : null}{' '}
            <span>Delete</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UserLinkManagementDelete;
