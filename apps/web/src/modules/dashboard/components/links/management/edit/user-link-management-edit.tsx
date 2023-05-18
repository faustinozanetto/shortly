import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@modules/ui/components/dialog/dialog';
import { Link } from '@prisma/client';
import React from 'react';
import UserLinkManagementEditForm from './user-link-management-edit-form';

type UserLinkManagementEditProps = {
  link: Link;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const UserLinkManagementEdit: React.FC<UserLinkManagementEditProps> = (props) => {
  const { link, isOpen, onOpenChange } = props;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Link</DialogTitle>
          <DialogDescription>
            Make changes to your link here. Click &apos;Save Changes&apos; when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <UserLinkManagementEditForm link={link} />
      </DialogContent>
    </Dialog>
  );
};

export default UserLinkManagementEdit;
