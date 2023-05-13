'use client';
import React from 'react';
import clsx from 'clsx';
import Button from '@modules/ui/components/button/button';
import useURLShortener from '@modules/url-shortener/hooks/use-url-shortener';
import { TextInput } from '@modules/ui/components/forms/text-input';
import { getCompleteShortenedURl, urlValidationSchema } from '@modules/url-shortener/lib/url-shortener.lib';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@modules/toasts/hooks/use-toast';
import useCopyToClipboard from '@modules/common/hooks/use-copy-to-clipboard';

const HomeShortenForm: React.FC = () => {
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  const { toast } = useToast();
  const { generate } = useURLShortener();
  const { handleSubmit, control, formState } = useForm<{ url: string }>({
    resolver: zodResolver(urlValidationSchema),
    mode: 'onTouched',
  });

  const onSubmit = async (data: { url: string }) => {
    const hash = await generate(data.url);
    const completeURL = getCompleteShortenedURl(hash.hash);
    copyToClipboard(completeURL);
    toast({ variant: 'success', content: 'URL hash generated: ' + completeURL });
  };

  return (
    <form className="flex flex-col gap-2 md:flex-row md:items-end" onSubmit={handleSubmit(onSubmit)}>
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
