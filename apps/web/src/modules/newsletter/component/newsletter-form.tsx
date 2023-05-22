'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@modules/ui/components/button/button';
import Link from 'next/link';
import React from 'react';
import { newsletterSubscribeFormValidation } from '../lib/newsletter.lib';
import { useForm } from 'react-hook-form';
import { NewsletterFormData } from '../types/newsletter.types';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@modules/ui/components/forms/forms';
import { Input } from '@modules/ui/components/forms/input';

type NewsletterFormProps = {
  onSubmitted: (data: NewsletterFormData) => void;
};

const NewsletterForm: React.FC<NewsletterFormProps> = (props) => {
  const { onSubmitted } = props;

  const form = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSubscribeFormValidation),
    mode: 'onTouched',
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitted)} className="flex flex-col gap-2 md:items-center">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email</FormLabel>
              <div className="flex">
                <FormControl>
                  <Input
                    className="rounded-r-none"
                    inputMode="email"
                    type="email"
                    placeholder="yourmail@mail.com"
                    {...field}
                  />
                </FormControl>
                <Button type="submit" className="rounded-l-none">
                  Subscribe
                </Button>
              </div>
              <FormDescription>Your personal email</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <p className="text-start text-sm text-neutral-900 dark:text-neutral-50">
          We care about your privacy, learn more at{' '}
          <Link href="/privacy" className="text-primary-800 dark:text-primary-300 font-semibold hover:underline">
            privacy
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default NewsletterForm;
