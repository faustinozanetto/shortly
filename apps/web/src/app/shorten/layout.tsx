import Footer from '@modules/footer/components/footer';
import Navbar from '@modules/navbar/components/navbar';
import React from 'react';

export default async function ShortenLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* @ts-expect-error Server Component */}
      <Navbar />
      <div className="flex w-full flex-1 flex-col items-center">{children}</div>
      <Footer />
    </div>
  );
}
