export type StoreShortenedURLPayload = { url: string; alias: string; userId?: string };

export type RetrieveShortenedURLPayload = {
  alias: string;
};

export type GenerateShortenedURLPayload = { url: string; userId?: string; alias?: string };
