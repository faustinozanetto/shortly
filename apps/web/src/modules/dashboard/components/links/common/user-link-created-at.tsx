'use client';
import React from 'react';
import { Skeleton } from '@modules/ui/components/skeleton/skeleton';
import { Link } from '@prisma/client';
import CalendarIcon from '@modules/ui/components/icons/calendar-icon';

type UserLinkCreatedAtProps = {
  link: Link | null;
  loading?: boolean;
};

const UserLinkCreatedAt: React.FC<UserLinkCreatedAtProps> = (props) => {
  const { link, loading = false } = props;

  return (
    <Skeleton loading={loading || !link}>
      <div className="flex items-center gap-1 text-sm font-medium text-neutral-700 dark:text-neutral-200">
        <CalendarIcon />
        <span>{link ? new Date(link.createdAt).toLocaleDateString() : 'Created At'}</span>
      </div>
    </Skeleton>
  );
};

export default UserLinkCreatedAt;
