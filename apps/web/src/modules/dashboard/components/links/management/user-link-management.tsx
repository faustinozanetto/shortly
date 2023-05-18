'use client';
import Button from '@modules/ui/components/button/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@modules/ui/components/dropdown-menu/dropdown-menu';
import { Link } from '@prisma/client';
import React, { useState } from 'react';
import UserLinkManagementDelete from './delete/user-link-management-delete';
import UserLinkManagementEdit from './edit/user-link-management-edit';
import EditIcon from '@modules/ui/components/icons/edit-icon';
import DeleteIcon from '@modules/ui/components/icons/delete-icon';
import QRIcon from '@modules/ui/components/icons/qr-icon';
import UserLinkManagementQRCode from './qr-code/user-link-management-qr-code';
import useQRCode from '@modules/common/hooks/use-qr-code';
import { URL_QR_DEFAULT_OPTIONS, getCompleteShortenedURL } from '@modules/url-shortener/lib/url-shortener.lib';

type UserLinkManagementProps = {
  link: Link;
};

const UserLinkManagement: React.FC<UserLinkManagementProps> = (props) => {
  const { link } = props;

  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
  const [showQRDialog, setShowQRDialog] = useState<boolean>(false);

  const { generateQRCode, encodedQR } = useQRCode(URL_QR_DEFAULT_OPTIONS);

  const handleQRCodeGeneration = async () => {
    if (!link) return;

    const completeURL = getCompleteShortenedURL(link.alias);
    await generateQRCode(completeURL);
    setShowQRDialog(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open actions menu</span>
            <svg
              className="h-4 w-4 stroke-neutral-900 dark:stroke-neutral-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="5" cy="12" r="1" />
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
            </svg>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Link Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/* Edit Link Trigger */}
          <DropdownMenuItem className="cursor-pointer" onSelect={() => setShowEditDialog(true)}>
            <EditIcon className="mr-2 stroke-blue-600 dark:stroke-blue-400" size="sm" />
            Edit
          </DropdownMenuItem>
          {/* Delete Link */}
          <DropdownMenuItem className="cursor-pointer" onSelect={() => setShowDeleteAlert(true)}>
            <DeleteIcon className="mr-2" size="sm" />
            Delete
          </DropdownMenuItem>
          {/* QR Code */}
          <DropdownMenuItem className="cursor-pointer" onSelect={handleQRCodeGeneration}>
            <QRIcon className="mr-2" size="sm" />
            QR Code
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* QR Code Dialog */}
      <UserLinkManagementQRCode isOpen={showQRDialog} onOpenChange={setShowQRDialog} encodedQR={encodedQR} />
      {/* Edit Dialog  */}
      <UserLinkManagementEdit isOpen={showEditDialog} onOpenChange={setShowEditDialog} link={link} />
      {/* Delete Alert Dialog */}
      <UserLinkManagementDelete isOpen={showDeleteAlert} onOpenChange={setShowDeleteAlert} link={link} />
    </>
  );
};

export default UserLinkManagement;
