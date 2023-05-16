'use client';
import React, { useState } from 'react';

import Button from '@modules/ui/components/button/button';
import useURLShortener from '@modules/url-shortener/hooks/use-url-shortener';
import { TextInput } from '@modules/ui/components/forms/text-input';
import { completeUrlValidationSchema } from '@modules/url-shortener/lib/url-shortener.lib';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@modules/toasts/hooks/use-toast';
import useCopyToClipboard from '@modules/common/hooks/use-copy-to-clipboard';
import { z } from 'zod';
import { Session } from 'next-auth';

type GenerateLinkFormData = z.infer<typeof completeUrlValidationSchema>;

type URLShortenerFormProps = {
  user: Session['user'] | null;
};

const URLShortenerForm: React.FC<URLShortenerFormProps> = (props) => {
  const { user } = props;

  const { toast } = useToast();
  const { copyToClipboard } = useCopyToClipboard();
  const { generateShortenedURL } = useURLShortener();

  const [isShortenLoading, setIsShortenLoading] = useState<boolean>(false);

  const { handleSubmit, control } = useForm<GenerateLinkFormData>({
    resolver: zodResolver(completeUrlValidationSchema),
    mode: 'onTouched',
  });

  const handleFormSubmit = async (data: GenerateLinkFormData) => {
    if (!user) return;

    try {
      setIsShortenLoading(true);
      const shortenedURL = await generateShortenedURL({ ...data, userId: user.id });
      copyToClipboard(shortenedURL);
      toast({ variant: 'success', content: 'Shortened URL Copied to Clipboard!' }, 6000);
      setIsShortenLoading(false);
    } catch (error) {
      toast({ variant: 'error', content: error.message });
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
            error={fieldState.invalid}
            errorMessage={fieldState.error?.message!}
            help
            helpMessage="Establish a custom alias for your URLs"
            onValueChanged={onChange}
            onBlur={onBlur}
          />
        )}
      />
      <Button
        type="submit"
        className="h-10"
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

export default URLShortenerForm;
