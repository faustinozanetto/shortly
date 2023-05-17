import { SiteConfig } from './types/config.types';

export const siteConfig: SiteConfig = {
  name: 'Shortly',
  description: 'Shortly is a free and easy to use URL Shortener webesite.',
  url: process.env.NEXT_PUBLIC_URL!,
};
