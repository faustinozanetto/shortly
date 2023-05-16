'use client';
import React, { useState } from 'react';
import clsx from 'clsx';
import Button from '@modules/ui/components/button/button';
import useURLShortener from '@modules/url-shortener/hooks/use-url-shortener';
import { TextInput } from '@modules/ui/components/forms/text-input';
import { urlValidationSchema } from '@modules/url-shortener/lib/url-shortener.lib';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@modules/toasts/hooks/use-toast';
import useCopyToClipboard from '@modules/common/hooks/use-copy-to-clipboard';

import { z } from 'zod';
import { Session } from 'next-auth';

type HomeShortenLinkFormData = z.infer<typeof urlValidationSchema>;

type HomeShortenFormProps = {
  user: Session['user'] | null;
};

const HomeShortenForm: React.FC<HomeShortenFormProps> = (props) => {
  const { user } = props;

  const [isShortenLoading, setIsShortenLoading] = useState<boolean>(false);

  const { toast } = useToast();
  const { copyToClipboard } = useCopyToClipboard();
  const { generateShortenedURL } = useURLShortener();

  const { handleSubmit, control, formState } = useForm<HomeShortenLinkFormData>({
    resolver: zodResolver(urlValidationSchema),
    mode: 'onTouched',
  });

  const handleFormSubmit = async (data: HomeShortenLinkFormData) => {
    try {
      setIsShortenLoading(true);
      const shortenedURL = await generateShortenedURL({ ...data, userId: user?.id });
      copyToClipboard(shortenedURL);
      toast({ variant: 'success', content: 'Shortened URL Copied to Clipboard!' }, 6000);
      setIsShortenLoading(false);
    } catch (error) {
      toast({ variant: 'error', content: error.message });
    }
  };

  return (
    <form className="flex flex-col gap-2 md:flex-row md:items-center" onSubmit={handleSubmit(handleFormSubmit)}>
      <Controller
        name="url"
        control={control}
        render={({ field: { name, ref, onBlur, value, onChange }, fieldState }) => (
          <TextInput
            ref={ref}
            className="h-12"
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
      <Button
        type="submit"
        className={clsx(formState.errors.url ? 'md:mt-2' : 'md:mt-6')}
        disabled={isShortenLoading}
        icon={
          isShortenLoading ? (
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
        Shorten
      </Button>
    </form>
  );
};

export default HomeShortenForm;
