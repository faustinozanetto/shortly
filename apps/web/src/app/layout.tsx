import '../styles/global.css';

import React from 'react';
import { Source_Sans_Pro } from 'next/font/google';
import Navbar from '@modules/navbar/components/navbar';
import Footer from '@modules/footer/components/footer';
import ThemeProvider from '@modules/theming/context/theme-context';
import ToastsContainer from '@modules/toasts/components/toasts-container';
import { ToastProvider } from '@modules/toasts/context/toasts-context';
import { Metadata } from 'next';

import { headers } from 'next/headers';
import AuthContext from '@modules/auth/context/auth-context';
import { getSession } from '@modules/auth/lib/auth.lib';

const sourceSansPro = Source_Sans_Pro({
  variable: '--font-sans',
  weight: ['400', '600', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Home | Shortly',
    template: '%s | Shortly',
  },
  description: 'Shortly is a free and easy to use URL Shortener webesite.',
  openGraph: {
    title: 'Shortly',
    description: 'Shortly is a free and easy to use URL Shortener webesite.',
    url: 'https://shortlyto.vercel.app/',
    siteName: 'Shortly',
    images: [
      {
        url: 'https://shortlyto.vercel.app/assets/banner.webp',
        width: 2000,
        height: 1500,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'Shortly',
    card: 'summary_large_image',
  },
  icons: {
    shortcut: '/favicon.ico',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession(headers().get('cookie') ?? '');

  return (
    <html lang="en" className={sourceSansPro.variable}>
      <body className="antialiased transition-colors duration-300">
        <AuthContext session={session}>
          <ThemeProvider>
            <ToastProvider>
              <main className="flex min-h-screen flex-col bg-neutral-50 dark:bg-neutral-900">
                <Navbar />
                <div className="flex flex-grow">{children}</div>
                <Footer />
              </main>
              <ToastsContainer />
            </ToastProvider>
          </ThemeProvider>
        </AuthContext>
      </body>
    </html>
  );
}
