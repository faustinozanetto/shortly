export type StoreShortenedURLPayload = {
  originalURL: string;
  hash: string;
};

export type RetrieveShortenedURLPayload = {
  hash: string;
};
