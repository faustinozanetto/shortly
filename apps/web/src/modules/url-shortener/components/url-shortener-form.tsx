'use client';
import React from 'react';

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

  const { handleSubmit, control } = useForm<GenerateLinkFormData>({
    resolver: zodResolver(completeUrlValidationSchema),
    mode: 'onTouched',
  });

  const handleFormSubmit = async (data: GenerateLinkFormData) => {
    if (!user) return;

    try {
      const { url, alias } = data;
      const userId = user.id;
      const shortenedURL = await generateShortenedURL({ url, userId, alias });
      copyToClipboard(shortenedURL);
      toast({ variant: 'success', content: 'Shortened URL Copied to Clipboard!' }, 6000);
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
            placeholder="funnytwod"
            error={fieldState.invalid}
            errorMessage={fieldState.error?.message!}
            help
            helpMessage="Establish a custom alias for your URLs"
            onValueChanged={onChange}
            onBlur={onBlur}
          />
        )}
      />
      <Button type="submit" className="h-10">
        Shorten
      </Button>
    </form>
  );
};

export default URLShortenerForm;
