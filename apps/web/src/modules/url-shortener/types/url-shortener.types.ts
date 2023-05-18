export type StoreShortenedURLPayload = { url: string; alias: string; expiresAt: Date | null; userEmail: string | null };

export type OriginalUrlFromAliasPayload = {
  alias: string;
};

export type RetrieveShortenedURLPayload = {
  alias: string;
};

export type IncrementShortenedURLClicks = {
  alias: string;
};

export type GenerateShortenedURLPayload = { url: string; expiresAt?: Date; userEmail?: string; alias?: string };
