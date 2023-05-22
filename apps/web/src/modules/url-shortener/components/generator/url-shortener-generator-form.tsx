'use client';
import React, { useState } from 'react';

import Button from '@modules/ui/components/button/button';
import useURLShortener from '@modules/url-shortener/hooks/use-url-shortener';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@modules/toasts/hooks/use-toast';
import { z } from 'zod';
import { Session } from 'next-auth';
import { linkValidationSchema } from '@modules/validations/lib/validations-link';
import LoadingIcon from '@modules/ui/components/icons/loading-icon';
import { useURLShortenerContext } from '@modules/url-shortener/hooks/use-url-shortener-context';
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

type GenerateLinkFormData = z.infer<typeof linkValidationSchema>;

type URLShortenerGeneratorFormProps = {
  user: Session['user'] | null;
};

const URLShortenerGeneratorForm: React.FC<URLShortenerGeneratorFormProps> = (props) => {
  const { user } = props;

  const { toast } = useToast();
  const { setShortenedURL } = useURLShortenerContext();
  const { generateShortenedURL } = useURLShortener();

  const [isShortenLoading, setIsShortenLoading] = useState<boolean>(false);

  const form = useForm<GenerateLinkFormData>({
    resolver: zodResolver(linkValidationSchema),
    mode: 'onTouched',
  });

  const handleFormSubmit = async (data: GenerateLinkFormData) => {
    if (!user) return;

    try {
      setIsShortenLoading(true);
      const shortenedURL = await generateShortenedURL({ ...data, userEmail: user.email! });
      setShortenedURL(shortenedURL);
      setIsShortenLoading(false);
      toast({ variant: 'success', content: 'URL shortened successfully!' });
    } catch (error) {
      setIsShortenLoading(false);
      toast({ variant: 'error', content: error.message });
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
              value={field.value}
              onChange={field.onChange}
              label="Expires At"
              description="Pick a expire date for the link"
            />
          )}
        />

        <Button
          type="submit"
          className="mt-2 w-full"
          disabled={isShortenLoading}
          icon={isShortenLoading ? <LoadingIcon /> : null}
        >
          Shorten
        </Button>
      </form>
    </Form>
  );
};

export default URLShortenerGeneratorForm;
