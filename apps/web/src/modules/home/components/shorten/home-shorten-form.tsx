'use client';
import React, { useState } from 'react';
import clsx from 'clsx';
import Button from '@modules/ui/components/button/button';
import useURLShortener from '@modules/url-shortener/hooks/use-url-shortener';
import { TextInput } from '@modules/ui/components/forms/text-input';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@modules/toasts/hooks/use-toast';

import { z } from 'zod';
import { Session } from 'next-auth';
import { linkValidationSchema } from '@modules/validations/lib/validations-link';
import LoadingIcon from '@modules/ui/components/icons/loading-icon';
import { useURLShortenerContext } from '@modules/url-shortener/hooks/use-url-shortener-context';

type HomeShortenLinkFormData = z.infer<typeof linkValidationSchema>;

type HomeShortenFormProps = {
  user: Session['user'] | null;
};

const HomeShortenForm: React.FC<HomeShortenFormProps> = (props) => {
  const { user } = props;

  const [isShortenLoading, setIsShortenLoading] = useState<boolean>(false);

  const { toast } = useToast();
  const { setShortenedURL } = useURLShortenerContext();
  const { generateShortenedURL } = useURLShortener();

  const { handleSubmit, control, formState } = useForm<HomeShortenLinkFormData>({
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
    <form className="flex flex-col gap-2 md:flex-row md:items-center" onSubmit={handleSubmit(handleFormSubmit)}>
      <Controller
        name="url"
        control={control}
        render={({ field: { name, ref, onBlur, value, onChange }, fieldState }) => (
          <TextInput
            ref={ref}
            className="rounded-r-none"
            id={name}
            value={value}
            name={name}
            label="URL"
            placeholder="https://www.youtube.com/"
            error={fieldState.invalid}
            errorMessage={fieldState.error?.message!}
            onValueChanged={onChange}
            onBlur={onBlur}
          >
            <Button
              type="submit"
              className="h-12 rounded-l-none"
              disabled={isShortenLoading}
              icon={isShortenLoading ? <LoadingIcon /> : null}
            >
              Shorten
            </Button>
          </TextInput>
        )}
      />
    </form>
  );
};

export default HomeShortenForm;
