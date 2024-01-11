'use client';
import React from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { linkValidationSchema } from '@modules/validations/lib/validations-link';
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@modules/ui/components/accordion/accordion';
import { PasswordInput } from '@modules/ui/components/forms/password-input';

export type URLBaseFormData = z.infer<typeof linkValidationSchema>;

type URLShortenerBaseFormProps = {
  initialData?: URLBaseFormData;
  children: React.ReactNode;
  onSubmitted: (data: URLBaseFormData) => void;
};

const URLShortenerBaseForm: React.FC<URLShortenerBaseFormProps> = (props) => {
  const { children, onSubmitted, initialData } = props;

  const form = useForm<URLBaseFormData>({
    resolver: zodResolver(linkValidationSchema),
    mode: 'onTouched',
    defaultValues: initialData,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitted)}>
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className="mb-2">
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

        <Accordion type="multiple" className="w-full">
          <AccordionItem value="expiration" className="overflow-hidden border-b py-2 last:border-none">
            <AccordionTrigger className="group flex w-full items-center justify-between">Expiration</AccordionTrigger>
            <AccordionContent className="px-1">
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
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="protection" className="overflow-hidden border-b py-3 last:border-none">
            <AccordionTrigger className="group flex w-full items-center justify-between">Protection</AccordionTrigger>
            <AccordionContent className="px-1">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="secure-password" {...field} />
                    </FormControl>
                    <FormDescription>Secure your link with a private password</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {children}
      </form>
    </Form>
  );
};

export default URLShortenerBaseForm;
