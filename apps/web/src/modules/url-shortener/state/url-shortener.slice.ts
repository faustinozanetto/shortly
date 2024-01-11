import { Link } from '@prisma/client';
import { create } from 'zustand';

export type UrlShortenerSliceState = {
  shortenedURL: Link | null;
};

export type UrlShortenerSliceActions = {
  setShortenedURL: (url: Link) => void;
};

export const useUrlShortenerStore = create<UrlShortenerSliceState & UrlShortenerSliceActions>((set) => ({
  shortenedURL: null,
  setShortenedURL(url) {
    set({ shortenedURL: url });
  },
}));
