import Footer from '@modules/footer/components/footer';
import Navbar from '@modules/navbar/components/navbar';
import QueriesProvider from '@modules/queries/context/queries-context';
import React from 'react';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueriesProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex w-full flex-1 flex-col items-center">{children}</div>
        <Footer />
      </div>
    </QueriesProvider>
  );
}
