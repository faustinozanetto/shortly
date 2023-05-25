'use client';
import React, { useState } from 'react';
import Button from '@modules/ui/components/button/button';
import useURLShortener from '@modules/url-shortener/hooks/use-url-shortener';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@modules/toasts/hooks/use-toast';

import { z } from 'zod';
import { linkValidationSchema } from '@modules/validations/lib/validations-link';
import LoadingIcon from '@modules/ui/components/icons/loading-icon';
import { useURLShortenerContext } from '@modules/url-shortener/hooks/use-url-shortener-context';
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

type HomeShortenLinkFormData = z.infer<typeof linkValidationSchema>;

const HomeShortenForm: React.FC = (props) => {
  const {} = props;

  const [isShortenLoading, setIsShortenLoading] = useState<boolean>(false);

  const { toast } = useToast();
  const { setShortenedURL } = useURLShortenerContext();
  const { generateShortenedURL } = useURLShortener();

  const form = useForm<HomeShortenLinkFormData>({
    resolver: zodResolver(linkValidationSchema),
    mode: 'onTouched',
  });

  const handleFormSubmit = async (data: HomeShortenLinkFormData) => {
    try {
      setIsShortenLoading(true);
      const shortenedURL = await generateShortenedURL({ ...data });
      setShortenedURL(shortenedURL);
      setIsShortenLoading(false);
      toast({ variant: 'success', content: 'URL shortened successfully!' });
    } catch (error) {
      setIsShortenLoading(false);
      toast({ variant: 'error', content: error.message });
    }
  };

  return (
    <div className="bg-background rounded-lg border p-4 shadow-lg">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="flex flex-col gap-2 md:flex-row md:items-center"
        >
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>URL</FormLabel>
                <div className="flex">
                  <FormControl>
                    <Input className="rounded-r-none" placeholder="https://www.youtube.com" {...field} />
                  </FormControl>
                  <Button
                    type="submit"
                    className="rounded-l-none"
                    disabled={isShortenLoading}
                    icon={isShortenLoading ? <LoadingIcon /> : null}
                  >
                    Shorten
                  </Button>
                </div>
                <FormDescription>The URL to shorten</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default HomeShortenForm;
