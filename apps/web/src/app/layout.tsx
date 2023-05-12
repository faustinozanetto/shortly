import './globals.css';
import clsx from 'clsx';
import React from 'react';
import { Source_Sans_Pro } from 'next/font/google';

const sourceSansPro = Source_Sans_Pro({
  variable: '--font-sans',
  weight: ['400', '600', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={clsx('bg-neutral-50 dark:bg-neutral-900', sourceSansPro.variable)}>
      <body className="antialiased">
        <main className="mt-6 flex min-w-0 flex-auto flex-col px-2 md:mt-0 md:px-0">{children}</main>
      </body>
    </html>
  );
}
