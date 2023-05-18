import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@modules/ui/components/button/button';
import { TextInput } from '@modules/ui/components/forms/text-input';
import Link from 'next/link';
import React from 'react';
import { newsletterSubscribeFormValidation } from '../lib/newsletter.lib';
import { Controller, useForm } from 'react-hook-form';
import { NewsletterFormData } from '../types/newsletter.types';
import clsx from 'clsx';

type NewsletterFormProps = {
  onSubmitted: (data: NewsletterFormData) => void;
};

const NewsletterForm: React.FC<NewsletterFormProps> = (props) => {
  const { onSubmitted } = props;

  const { handleSubmit, control, formState } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSubscribeFormValidation),
    mode: 'onTouched',
  });

  return (
    <form onSubmit={handleSubmit(onSubmitted)}>
      <div className="flex flex-col gap-2 md:w-auto md:flex-row md:items-end">
        <Controller
          name="email"
          control={control}
          render={({ field: { name, ref, onBlur, value, onChange }, fieldState }) => (
            <TextInput
              ref={ref}
              id={name}
              value={value}
              name={name}
              label="Email"
              placeholder="youremail@mail.com"
              inputMode="email"
              type="email"
              required
              error={fieldState.invalid}
              errorMessage={fieldState.error?.message!}
              onValueChanged={onChange}
              onBlur={onBlur}
            />
          )}
        />
        <Button type="submit" className={clsx(formState.errors?.email?.message !== undefined ? 'mb-8' : '0')}>
          Subscribe
        </Button>
      </div>
      <p className="text-start text-sm  text-neutral-900 dark:text-neutral-50">
        We care about your privacy, learn more at{' '}
        <Link href="/privacy" className="text-primary-800 dark:text-primary-300 font-semibold hover:underline">
          privacy
        </Link>
      </p>
    </form>
  );
};

export default NewsletterForm;
