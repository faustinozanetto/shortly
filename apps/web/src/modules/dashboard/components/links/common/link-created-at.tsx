'use client';
import React from 'react';
import { Link } from '@prisma/client';
import CalendarIcon from '@modules/ui/components/icons/calendar-icon';

type LinkCreatedAtProps = {
  link: Link | null;
  loading?: boolean;
};

const LinkCreatedAt: React.FC<LinkCreatedAtProps> = (props) => {
  const { link, loading = false } = props;

  return (
    <div className="text-foreground/80 flex items-center gap-1 text-sm font-medium">
      <CalendarIcon />
      <span>{link ? new Date(link.createdAt).toDateString() : 'Created At'}</span>
    </div>
  );
};

export default LinkCreatedAt;
