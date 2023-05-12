import './globals.css';
import clsx from 'clsx';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={clsx('bg-neutral-50 dark:bg-neutral-900')}>
      <body className="antialiased">
        <main className="mt-6 flex min-w-0 flex-auto flex-col px-2 md:mt-0 md:px-0">{children}</main>
      </body>
    </html>
  );
}
