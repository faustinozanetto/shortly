import './globals.css';

import clsx from 'clsx';
import React from 'react';
import { Source_Sans_Pro } from 'next/font/google';
import Navbar from '@modules/navbar/components/navbar';

const sourceSansPro = Source_Sans_Pro({
  variable: '--font-sans',
  weight: ['400', '600', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={clsx('bg-neutral-50 dark:bg-neutral-900', sourceSansPro.variable)}>
      <body className="flex flex-col antialiased transition-all">
        <Navbar />
        <main style={{ minHeight: 'calc(100vh - 80px)' }}>{children}</main>
      </body>
    </html>
  );
}
