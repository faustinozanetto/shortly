'use client';
import React, { useState } from 'react';

import { useToast } from '@modules/toasts/hooks/use-toast';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@modules/ui/components/forms/forms';
import { PasswordInput } from '@modules/ui/components/forms/password-input';
import { linkPasswordValidationSchema } from '@modules/validations/lib/validations-link';
import { Button } from '@modules/ui/components/button/button';
import LoadingIcon from '@modules/ui/components/icons/loading-icon';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

type FormData = z.infer<typeof linkPasswordValidationSchema>;

type URLShortenerProtectionFormProps = {
  alias: string;
};

const URLShortenerProtectionForm: React.FC<URLShortenerProtectionFormProps> = (props) => {
  const { alias } = props;

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<FormData>({
    mode: 'onTouched',
  });

  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);

  const handleFormSubmit = async (data: FormData) => {
    try {
      setIsFormLoading(true);
      const response = await fetch('/api/links/access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          alias,
          password: data.password,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        setIsFormLoading(false);
        return toast({ variant: 'error', content: responseData.message });
      }

      router.push(responseData.url);
      setIsFormLoading(false);
      toast({ variant: 'success', content: 'URL accessed successfully!' });
    } catch (error) {
      setIsFormLoading(false);
      toast({ variant: 'error', content: error.message });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="secure-password" {...field} />
              </FormControl>
              <FormDescription>URL access password</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isFormLoading}>
          {isFormLoading ? <LoadingIcon className="mr-2 stroke-current" /> : null}
          Access
        </Button>
      </form>
    </Form>
  );
};

export default URLShortenerProtectionForm;
