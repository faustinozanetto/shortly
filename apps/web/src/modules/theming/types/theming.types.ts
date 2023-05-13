export type ThemeType = 'dark' | 'light';

export type ThemeContextState = {
  theme: ThemeType;
  toggle: () => void;
};
