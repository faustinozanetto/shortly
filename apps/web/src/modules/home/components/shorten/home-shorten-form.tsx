'use client';
import Button from '@modules/ui/components/button/button';
import { TextInput } from '@modules/ui/components/forms/text-input';
import useURLShortener from '@modules/url-shortener/hooks/use-url-shortener';
import { urlValidationSchema } from '@modules/url-shortener/lib/url-shortener.lib';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';

const HomeShortenForm: React.FC = () => {
  const { generate } = useURLShortener();
  const { handleSubmit, control, formState } = useForm<{ url: string }>({
    resolver: zodResolver(urlValidationSchema),
    mode: 'onTouched',
  });
  const onSubmit = async (data: { url: string }) => {
    const hash = await generate(data.url);
    console.log({ hash });
  };

  return (
    <form className="flex items-end gap-1" onSubmit={handleSubmit(onSubmit)}>
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
