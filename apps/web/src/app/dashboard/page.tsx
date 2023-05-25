import { getCurrentUser } from '@modules/auth/lib/auth.lib';
import UserDashboard from '@modules/dashboard/components/general/user-dashboard';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'User Dashboard',
  description: 'Keep track and manage your shortened URLs in one place.',
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) return redirect('/sign-in');

  return (
    <div className="container my-4 md:my-8 ">
      {/* @ts-expect-error Server Component */}
      <UserDashboard user={user} />
    </div>
  );
}
