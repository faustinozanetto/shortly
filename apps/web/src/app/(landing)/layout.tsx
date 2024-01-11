import Footer from '@modules/footer/components/footer';
import Navbar from '@modules/navbar/components/navbar';
import React from 'react';

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
