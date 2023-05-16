import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@modules/ui/components/dialog/dialog';
import { Link } from '@prisma/client';
import React from 'react';
import UserLinkManagementEditForm from './user-link-management-edit-form';

type UserLinkManagementEditProps = {
  link: Link;
};

const UserLinkManagementEdit: React.FC<UserLinkManagementEditProps> = (props) => {
  const { link } = props;

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit Link</DialogTitle>
        <DialogDescription>Make changes to your ink here. Click save when you're done.</DialogDescription>
      </DialogHeader>
      <UserLinkManagementEditForm link={link} />
    </DialogContent>
  );
};

export default UserLinkManagementEdit;
