'use client';
import React from 'react';
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
  const { toast } = useToast();
  const { copyToClipboard } = useCopyToClipboard();
  const { generateShortenedURL } = useURLShortener();

  const { handleSubmit, control, formState } = useForm<HomeShortenLinkFormData>({
    resolver: zodResolver(urlValidationSchema),
    mode: 'onTouched',
  });

  const handleFormSubmit = async (data: HomeShortenLinkFormData) => {
    try {
      const { url } = data;
      let shortenedURL: string;
      if (user) shortenedURL = await generateShortenedURL({ url, userId: user.id });
      else shortenedURL = await generateShortenedURL({ url });

      copyToClipboard(shortenedURL);
      toast({ variant: 'success', content: 'Shortened URL Copied to Clipboard!' }, 6000);
    } catch (error) {
      toast({ variant: 'error', content: error.message });
    }
  };

  return (
    <form className="flex flex-col gap-2 md:flex-row md:items-end" onSubmit={handleSubmit(handleFormSubmit)}>
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
      <Button type="submit" className={clsx(formState.errors?.url?.message !== undefined ? 'mb-5' : '0')}>
        Shorten
      </Button>
    </form>
  );
};

export default HomeShortenForm;
