import { getCurrentUser } from '@modules/auth/lib/auth.lib';
import UserDashboardLink from '@modules/dashboard/components/links/user-dashobard-link';
import UserDashboardLinkProvider from '@modules/dashboard/context/link/user-dashboard-link-context';
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

  const user = await getCurrentUser();
  if (!user) return redirect('/sign-in');

  return (
    <UserDashboardLinkProvider>
      <div className="container my-4 md:my-8">
        <UserDashboardLink alias={alias} />
      </div>
    </UserDashboardLinkProvider>
  );
}
