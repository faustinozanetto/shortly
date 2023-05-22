'use client';
import Button from '@modules/ui/components/button/button';
import DeleteIcon from '@modules/ui/components/icons/delete-icon';
import EditIcon from '@modules/ui/components/icons/edit-icon';

import React, { useState } from 'react';
import UserLinkManagementDelete from '../../management/delete/user-link-management-delete';
import UserLinkManagementEdit from '../../management/edit/user-link-management-edit';
import { Link } from '@prisma/client';
import { useRouter } from 'next/navigation';

type UserLinkDetailsProps = {
  link: Link;
};

const UserLinkDetailsManagement = (props: UserLinkDetailsProps) => {
  const { link } = props;

  const router = useRouter();

  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);

  const handleOnEdited = async (data: Link) => {
    router.replace(`/dashboard/${data.alias}`);
    setShowEditDialog(false);
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <Button
          icon={<EditIcon className="stroke-neutral-900 dark:stroke-neutral-50" size="sm" />}
          onClick={() => setShowEditDialog(true)}
        >
          Edit
        </Button>
        <Button
          variant="danger"
          icon={<DeleteIcon className="!stroke-neutral-900 dark:!stroke-neutral-50" size="sm" />}
          onClick={() => setShowDeleteAlert(true)}
        >
          Delete
        </Button>
      </div>

      {/* Edit Dialog  */}
      <UserLinkManagementEdit
        isOpen={showEditDialog}
        onOpenChange={setShowEditDialog}
        link={link}
        onEdited={handleOnEdited}
      />
      {/* Delete Alert Dialog */}
      <UserLinkManagementDelete isOpen={showDeleteAlert} onOpenChange={setShowDeleteAlert} link={link} />
    </>
  );
};

export default UserLinkDetailsManagement;
