import { nanoid } from 'nanoid';

export const CUSTOM_ALIAS_MAX_LENGTH = 14;

export const generateRandomURLAlias = (url: string): string => {
  return nanoid(CUSTOM_ALIAS_MAX_LENGTH);
};

export const getCompleteShortenedURL = (alias: string): string => {
  const BASE_PATH = process.env.NEXT_PUBLIC_URL;
  return `${BASE_PATH}/${alias}`;
};
