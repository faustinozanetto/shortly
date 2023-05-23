export type StoreLinkPayload = {
  url: string;
  alias: string;
  password?: string;
  expiresAt?: Date;
  userEmail?: string;
};

export type OriginalUrlFromAliasPayload = {
  alias: string;
};

export type RetrieveShortenedURLPayload = {
  alias: string;
};

export type IncrementShortenedURLClicks = {
  alias: string;
};

export type GenerateShortenedURLPayload = {
  url: string;
  password?: string;
  expiresAt?: Date;
  userEmail?: string;
  alias?: string;
};
