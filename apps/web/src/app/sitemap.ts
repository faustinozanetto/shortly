export default async function sitemap() {
  const routes = ['', '/shorten', '/contact', '/dashboard'].map((route) => ({
    url: `https://shortlyto.vercel.app${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes];
}
