import { useContext } from 'react';
import { URLShortenerContext } from '../context/url-shortener-context';

export const useURLShortenerContext = () => {
  const context = useContext(URLShortenerContext);
  if (!context) throw new Error('Tried to use URLShortenerContext with no context avaiable!');
  return context;
};
