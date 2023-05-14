export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
      },
    ],
    sitemap: 'https://shortlyto.vercel.app/sitemap.xml',
    host: 'https://shortlyto.vercel.app',
  };
}
