import Footer from '@modules/footer/components/footer';
import Navbar from '@modules/navbar/components/navbar';
import React from 'react';

export default async function ShortenLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col bg-neutral-50 dark:bg-neutral-900">
      {/* @ts-expect-error Server Component */}
      <Navbar />
      <div className="flex w-full flex-col items-center">{children}</div>
      <Footer />
    </main>
  );
}
