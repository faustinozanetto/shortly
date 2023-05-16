import React from 'react';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex w-full flex-col items-center">{children}</div>;
}
