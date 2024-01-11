'use client';
import React, { useState } from 'react';

import { Button } from '@modules/ui/components/button/button';

import { useToast } from '@modules/toasts/hooks/use-toast';
import { Link } from '@prisma/client';
import LoadingIcon from '@modules/ui/components/icons/loading-icon';
import URLShortenerBaseForm, { URLBaseFormData } from '@modules/url-shortener/components/forms/url-shortener-base-form';

type UserLinkManagementEditFormProps = {
  link: Link;
  onEdited: (updatedLink: Link) => void;
};

const UserLinkManagementEditForm: React.FC<UserLinkManagementEditFormProps> = (props) => {
  const { link, onEdited } = props;
  const { toast } = useToast();

  const [isEditingLoading, setIsEditingLoading] = useState<boolean>(false);

  const handleFormSubmit = async (data: URLBaseFormData) => {
    try {
      setIsEditingLoading(true);
      const editResponse = await fetch(`/api/links/${link.alias}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (editResponse && !editResponse.ok) {
        setIsEditingLoading(false);
        return toast({
          variant: 'error',
          content: 'An error occurred while editing link!',
        });
      }

      const editData = await editResponse.json();

      onEdited(editData.updatedLink);
      setIsEditingLoading(false);

      toast({
        variant: 'success',
        content: 'Link edited successfully!',
      });
    } catch (err) {
      setIsEditingLoading(false);
      toast({
        variant: 'error',
        content: 'An error occurred!',
      });
    }
  };

  return (
    <URLShortenerBaseForm
      initialData={{
        alias: link.alias,
        url: link.url,
        expiresAt: link.expiresAt ?? undefined,
      }}
      renderButton={() => {
        return (
          <Button type="submit" className="w-full" disabled={isEditingLoading}>
            {isEditingLoading ? <LoadingIcon className="mr-2 stroke-current" /> : null}
            Save Changes
          </Button>
        );
      }}
      onSubmitted={handleFormSubmit}
    />
  );
};

export default UserLinkManagementEditForm;
