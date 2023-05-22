import { getCurrentUser } from '@modules/auth/lib/auth.lib';
import UserDashboardLinkDetails from '@modules/dashboard/components/links/details/user-link-details';
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
  if (!user) return redirect('/auth/signin');

  return (
    <div className="container my-4 md:my-8">
      {/* @ts-expect-error Server Component */}
      <UserDashboardLinkDetails alias={alias} />
    </div>
  );
}
