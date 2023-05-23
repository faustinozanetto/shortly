'use client';
import Button from '@modules/ui/components/button/button';
import DeleteIcon from '@modules/ui/components/icons/delete-icon';
import EditIcon from '@modules/ui/components/icons/edit-icon';

import React, { useState } from 'react';

import { Link } from '@prisma/client';
import { useRouter } from 'next/navigation';
import UserLinkManagementDelete from './delete/user-link-management-delete';
import UserLinkManagementEdit from './edit/user-link-management-edit';
import { useUserDashboardLinkContext } from '@modules/dashboard/hooks/use-user-dashboard-link-context';
import { Skeleton } from '@modules/ui/components/skeleton/skeleton';

const UserLinkManagement = () => {
  const { link, loading } = useUserDashboardLinkContext();

  const router = useRouter();

  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);

  const handleOnEdited = async (data: Link) => {
    if (data.alias === link?.alias) {
      router.refresh();
    } else {
      router.replace(`/dashboard/${data.alias}`);
    }
    setShowEditDialog(false);
  };

  const handleOnDeleted = () => {
    router.push('/dashboard');
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <Skeleton className="w-full" loading={loading || !link}>
          <Button
            aria-label="Edit Link"
            className="w-full"
            icon={<EditIcon className="stroke-neutral-900 dark:stroke-neutral-50" size="sm" />}
            onClick={() => setShowEditDialog(true)}
          >
            Edit
          </Button>
        </Skeleton>
        <Skeleton className="w-full" loading={loading || !link}>
          <Button
            aria-label="Delete Link"
            className="w-full"
            variant="danger"
            icon={<DeleteIcon className="!stroke-neutral-900 dark:!stroke-neutral-50" size="sm" />}
            onClick={() => setShowDeleteAlert(true)}
          >
            Delete
          </Button>
        </Skeleton>
      </div>

      {/* Edit Dialog  */}

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
