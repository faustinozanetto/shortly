export type StoreShortenedURLPayload = { url: string; alias: string; userId: string | null };

export type OriginalUrlFromAliasPayload = {
  alias: string;
};

export type RetrieveShortenedURLPayload = {
  alias: string;
};

export type IncrementShortenedURLClicks = {
  alias: string;
};

export type GenerateShortenedURLPayload = { url: string; userId?: string; alias?: string };
