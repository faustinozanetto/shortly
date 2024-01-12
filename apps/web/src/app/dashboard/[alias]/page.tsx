import { getCurrentUser } from '@modules/auth/lib/auth.lib';
import UserDashboardLink from '@modules/dashboard/components/links/dashobard-link';
import { getLinkExists } from '@modules/url-shortener/lib/url-shortener-db';

import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'User Dashboard',
  description: 'Keep track and manage your shortened URLs in one place.',
};

type DashboardLinkPageProps = {
  params: {
    alias: string;
  };
};

export default async function DashboardLinkPage(props: DashboardLinkPageProps) {
  const { params } = props;
  const { alias } = params;

  // Validate user logged in.
  const user = await getCurrentUser();
  if (!user) {
    console.error('User not logged in');
    return redirect('/sign-in');
  }

  // Validate link exists
  const linkExists = await getLinkExists({ alias });
  if (!linkExists) return redirect('/dashboard');

  return (
    <div className="container my-4 md:my-8">
      <UserDashboardLink alias={alias} />
    </div>
  );
}
