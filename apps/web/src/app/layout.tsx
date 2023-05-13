import '../styles/global.css';

import React from 'react';
import { Source_Sans_Pro } from 'next/font/google';
import Navbar from '@modules/navbar/components/navbar';
import Footer from '@modules/footer/components/footer';
import ThemeProvider from '@modules/theming/context/theme-context';

const sourceSansPro = Source_Sans_Pro({
  variable: '--font-sans',
  weight: ['400', '600', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sourceSansPro.variable}>
      <body className="flex flex-col antialiased transition-colors duration-300 ">
        <ThemeProvider>
          <main className="bg-neutral-50 dark:bg-neutral-900">
            <Navbar />
            <div style={{ minHeight: 'calc(100vh - 80px)' }}>{children}</div>
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
