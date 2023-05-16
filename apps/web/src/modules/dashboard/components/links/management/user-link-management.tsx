'use client';
import Button from '@modules/ui/components/button/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@modules/ui/components/dropdown-menu/dropdown-menu';
import { Link } from '@prisma/client';
import React from 'react';
import UserLinkManagementDelete from './delete/user-link-management-delete';

type UserLinkManagementProps = {
  link: Link;
};

const UserLinkManagement: React.FC<UserLinkManagementProps> = (props) => {
  const { link } = props;

  return <UserLinkManagementDelete link={link} />;
};

export default UserLinkManagement;
