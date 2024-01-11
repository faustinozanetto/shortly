'use client';
import React from 'react';
import { Link } from '@prisma/client';
import CalendarIcon from '@modules/ui/components/icons/calendar-icon';

type UserLinkCreatedAtProps = {
  link: Link | null;
  loading?: boolean;
};

const UserLinkCreatedAt: React.FC<UserLinkCreatedAtProps> = (props) => {
  const { link, loading = false } = props;

  return (
    <div className="text-foreground/80 flex items-center gap-1 text-sm font-medium">
      <CalendarIcon />
      <span>{link ? new Date(link.createdAt).toDateString() : 'Created At'}</span>
    </div>
  );
};

export default UserLinkCreatedAt;
