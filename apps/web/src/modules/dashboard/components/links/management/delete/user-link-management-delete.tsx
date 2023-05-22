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
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleted: () => void;
};

const UserLinkManagementDelete: React.FC<UserLinkManagementDeleteProps> = (props) => {
  const { link, isOpen, onOpenChange, onDeleted } = props;

  const router = useRouter();
  const { toast } = useToast();
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  const handleUserLinkDelete = async () => {
    try {
      setIsDeleteLoading(true);
      const deleteResponse = await fetch(`/api/links/${link.alias}`, {
        method: 'DELETE',
      });

      if (deleteResponse && !deleteResponse.ok) {
        setIsDeleteLoading(false);
        onOpenChange(false);
        return toast({
          variant: 'error',
          content: 'An error occurred while deleting link!',
        });
      }

      onDeleted();
      setIsDeleteLoading(false);
      onOpenChange(false);

      return toast({
        variant: 'success',
        content: 'Link deleted successfully!',
      });
    } catch (error) {
      setIsDeleteLoading(false);
      onOpenChange(false);
      toast({
        variant: 'error',
        content: 'An error occurred!',
      });
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
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
            {isDeleteLoading ? <LoadingIcon className="mr-2" /> : null}
            <span>Delete</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UserLinkManagementDelete;
