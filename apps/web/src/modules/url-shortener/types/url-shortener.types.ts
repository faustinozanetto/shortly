export type StoreShortenedURLPayload = { url: string; alias: string; userEmail: string | null };

export type OriginalUrlFromAliasPayload = {
  alias: string;
};

export type RetrieveShortenedURLPayload = {
  alias: string;
};

export type IncrementShortenedURLClicks = {
  alias: string;
};

export type GenerateShortenedURLPayload = { url: string; userEmail?: string; alias?: string };
