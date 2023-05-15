import React from 'react';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <div className="mx-4 flex w-full flex-col items-center md:mx-0">{children}</div>;
}
