import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Web - Turborepo Example',
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1 className="mx-auto text-center text-6xl font-extrabold tracking-tight text-black sm:text-7xl lg:text-8xl xl:text-8xl">
        Web
        <span className="from-brandred to-brandblue block bg-gradient-to-r bg-clip-text px-2 text-transparent">
          Turborepo Example
        </span>
      </h1>
    </div>
  );
}
