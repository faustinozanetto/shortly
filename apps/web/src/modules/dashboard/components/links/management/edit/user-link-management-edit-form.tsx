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
import LoadingIcon from '@modules/ui/components/icons/loading-icon';
import { DateInput } from '@modules/ui/components/forms/date-input';

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
      expiresAt: link.expiresAt ?? undefined,
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
      setIsEditingLoading(false);
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
            required
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
            required={false}
            error={fieldState.invalid}
            errorMessage={fieldState.error?.message!}
            help
            helpMessage="Establish a custom alias for your URLs"
            onValueChanged={onChange}
            onBlur={onBlur}
          />
        )}
      />
      <Controller
        name="expiresAt"
        control={control}
        render={({ field: { name, onBlur, value, onChange }, fieldState }) => (
          <DateInput
            id={name}
            value={value}
            required={false}
            label="Link Expire Date"
            error={fieldState.invalid}
            errorMessage={fieldState.error?.message!}
            onValueChanged={onChange}
            onBlur={onBlur}
          />
        )}
      />
      <Button
        type="submit"
        className="h-10"
        disabled={isEditingLoading}
        icon={isEditingLoading ? <LoadingIcon /> : null}
      >
        Save Changes
      </Button>
    </form>
  );
};

export default UserLinkManagementEditForm;
