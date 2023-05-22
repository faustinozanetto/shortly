'use client';
import React, { useState } from 'react';

import Button from '@modules/ui/components/button/button';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@modules/toasts/hooks/use-toast';
import { z } from 'zod';
import { linkValidationSchema } from '@modules/validations/lib/validations-link';
import { Link } from '@prisma/client';
import LoadingIcon from '@modules/ui/components/icons/loading-icon';
import { DateInput } from '@modules/ui/components/forms/date-input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@modules/ui/components/forms/forms';
import { Input } from '@modules/ui/components/forms/input';

type EditLinkFormData = z.infer<typeof linkValidationSchema>;

type UserLinkManagementEditFormProps = {
  link: Link;
  onEdited: (updatedLink: Link) => void;
};

const UserLinkManagementEditForm: React.FC<UserLinkManagementEditFormProps> = (props) => {
  const { link, onEdited } = props;
  const { toast } = useToast();

  const [isEditingLoading, setIsEditingLoading] = useState<boolean>(false);

  const form = useForm<EditLinkFormData>({
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="https://www.youtube.com" {...field} />
              </FormControl>
              <FormDescription>The URL to shorten</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="alias"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alias</FormLabel>
              <FormControl>
                <Input placeholder="custom-alias" {...field} />
              </FormControl>
              <FormDescription>Custom alias for the link</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="expiresAt"
          render={({ field }) => (
            <DateInput
              value={field.value ? new Date(field.value) : undefined}
              onChange={field.onChange}
              label="Expires At"
              description="Pick a expire date for the link"
            />
          )}
        />

        <Button
          type="submit"
          className="mt-2 w-full"
          disabled={isEditingLoading}
          icon={isEditingLoading ? <LoadingIcon /> : null}
        >
          Save Changes
        </Button>
      </form>
    </Form>
  );
};

export default UserLinkManagementEditForm;
