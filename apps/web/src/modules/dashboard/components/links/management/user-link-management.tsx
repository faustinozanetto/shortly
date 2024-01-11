'use client';
import { Button } from '@modules/ui/components/button/button';
import DeleteIcon from '@modules/ui/components/icons/delete-icon';
import EditIcon from '@modules/ui/components/icons/edit-icon';

import React, { useState } from 'react';

import { Link } from '@prisma/client';
import { useRouter } from 'next/navigation';
import UserLinkManagementDelete from './delete/user-link-management-delete';
import UserLinkManagementEdit from './edit/user-link-management-edit';

import { useUserDashboardLinkStore } from '@modules/dashboard/state/user-dashboard-link.slice';

const UserLinkManagement: React.FC = () => {
  const router = useRouter();
  const { link } = useUserDashboardLinkStore();

  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);

  const handleOnEdited = async (data: Link) => {
    // If we did not modify the alias refresh page, else push to new alias rout
    if (data.alias === link?.alias) router.refresh();
    else router.replace(`/dashboard/${data.alias}`);
  };

  const handleOnDeleted = () => {
    router.push('/dashboard');
  };

  return (
    <>
      <div className="flex flex-row items-center justify-center gap-2 md:flex-col">
        <Button aria-label="Edit Link" className="w-full" onClick={() => setShowEditDialog(true)}>
          <EditIcon className="mr-2 stroke-current" size="sm" />
          Edit
        </Button>
        <Button
          aria-label="Delete Link"
          className="w-full"
          variant="destructive"
          onClick={() => setShowDeleteAlert(true)}
        >
          <DeleteIcon className="mr-2 stroke-current" size="sm" />
          Delete
        </Button>
      </div>

      {/* Dialogs  */}
      {link ? (
        <>
          <UserLinkManagementEdit
            isOpen={showEditDialog}
            onOpenChange={setShowEditDialog}
            link={link}
            onEdited={handleOnEdited}
          />
          <UserLinkManagementDelete
            isOpen={showDeleteAlert}
            onOpenChange={setShowDeleteAlert}
            link={link}
            onDeleted={handleOnDeleted}
          />
        </>
      ) : null}
    </>
  );
};

export default UserLinkManagement;
