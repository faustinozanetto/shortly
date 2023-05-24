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
  renderButton: () => JSX.Element;
  onSubmitted: (data: URLBaseFormData) => void;
};

const URLShortenerBaseForm: React.FC<URLShortenerBaseFormProps> = (props) => {
  const { renderButton, onSubmitted, initialData } = props;

  const form = useForm<URLBaseFormData>({
    resolver: zodResolver(linkValidationSchema),
    mode: 'onTouched',
    defaultValues: initialData,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitted)} className="space-y-4">
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

        <Accordion type="multiple" className="w-full">
          <AccordionItem
            value="expiration"
            className="overflow-hidden border-b border-neutral-300 py-2 last:border-none dark:border-neutral-700"
          >
            <AccordionTrigger className="group flex w-full items-center justify-between">Expiration</AccordionTrigger>
            <AccordionContent>
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
          <AccordionItem
            value="protection"
            className="overflow-hidden border-b border-neutral-300 py-3 last:border-none dark:border-neutral-800"
          >
            <AccordionTrigger className="group flex w-full items-center justify-between">Protection</AccordionTrigger>
            <AccordionContent>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="secure-password" {...field} />
                    </FormControl>
                    <FormDescription>Secure your url</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {renderButton()}
      </form>
    </Form>
  );
};

export default URLShortenerBaseForm;
