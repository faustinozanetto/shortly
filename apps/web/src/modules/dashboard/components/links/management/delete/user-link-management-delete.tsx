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
import LoadingIcon from '@modules/ui/components/icons/loading-icon';
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
    try {
      setIsDeleteLoading(true);
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
      setIsDeleteLoading(false);
      setShowDeleteAlert(false);

      return toast({
        variant: 'success',
        content: 'Link deleted successfully!',
      });
    } catch (error) {
      toast({
        variant: 'error',
        content: 'An error occurred!',
      });
    }
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
              await handleUserLinkDelete();
            }}
            variant="danger"
          >
            {isDeleteLoading ? <LoadingIcon /> : null}
            <span>Delete</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UserLinkManagementDelete;
