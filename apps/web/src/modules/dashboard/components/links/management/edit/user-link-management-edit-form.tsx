'use client';
import React, { useState } from 'react';

import Button from '@modules/ui/components/button/button';
import { TextInput } from '@modules/ui/components/forms/text-input';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@modules/toasts/hooks/use-toast';
import { z } from 'zod';
import { linkValidationSchema } from '@modules/validations/lib/validations-link';
import { Link } from '@prisma/client';
import { useRouter } from 'next/navigation';

type EditLinkFormData = z.infer<typeof linkValidationSchema>;

type UserLinkManagementEditFormProps = {
  link: Link;
};

const UserLinkManagementEditForm: React.FC<UserLinkManagementEditFormProps> = (props) => {
  const { link } = props;
  const router = useRouter();
  const { toast } = useToast();

  const [isEditingLoading, setIsEditingLoading] = useState<boolean>(false);

  const { handleSubmit, control } = useForm<EditLinkFormData>({
    resolver: zodResolver(linkValidationSchema),
    mode: 'onTouched',
    defaultValues: {
      alias: link.alias,
      url: link.url,
    },
  });

  const handleFormSubmit = async (data: EditLinkFormData) => {
    try {
      setIsEditingLoading(true);
      const editResponse = await fetch(`/api/links/${link.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (editResponse && !editResponse.ok) {
        return toast({
          variant: 'error',
          content: 'An error occurred while editing link!',
        });
      }

      router.refresh();
      setIsEditingLoading(false);

      return toast({
        variant: 'success',
        content: 'Link edited successfully!',
      });
    } catch (err) {
      toast({
        variant: 'error',
        content: 'An error occurred!',
      });
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(handleFormSubmit)}>
      <Controller
        name="url"
        control={control}
        render={({ field: { name, ref, onBlur, value, onChange }, fieldState }) => (
          <TextInput
            ref={ref}
            id={name}
            value={value}
            name={name}
            label="URL"
            placeholder="https://www.youtube.com/"
            error={fieldState.invalid}
            errorMessage={fieldState.error?.message!}
            onValueChanged={onChange}
            onBlur={onBlur}
          />
        )}
      />
      <Controller
        name="alias"
        control={control}
        render={({ field: { name, ref, onBlur, value, onChange }, fieldState }) => (
          <TextInput
            ref={ref}
            id={name}
            value={value}
            name={name}
            label="Alias"
            placeholder="funny-alias325"
            error={fieldState.invalid}
            errorMessage={fieldState.error?.message!}
            help
            helpMessage="Establish a custom alias for your URLs"
            onValueChanged={onChange}
            onBlur={onBlur}
          />
        )}
      />
      <Button
        type="submit"
        className="h-10"
        disabled={isEditingLoading}
        icon={
          isEditingLoading ? (
            <svg
              className="h-5 w-5 animate-spin stroke-neutral-900 dark:stroke-neutral-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="12" y1="6" x2="12" y2="3" />
              <line x1="16.25" y1="7.75" x2="18.4" y2="5.6" />
              <line x1="18" y1="12" x2="21" y2="12" />
              <line x1="16.25" y1="16.25" x2="18.4" y2="18.4" />
              <line x1="12" y1="18" x2="12" y2="21" />
              <line x1="7.75" y1="16.25" x2="5.6" y2="18.4" />
              <line x1="6" y1="12" x2="3" y2="12" />
              <line x1="7.75" y1="7.75" x2="5.6" y2="5.6" />
            </svg>
          ) : null
        }
      >
        Save Changes
      </Button>
    </form>
  );
};

export default UserLinkManagementEditForm;
