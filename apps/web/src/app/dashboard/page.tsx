import { getCurrentUser } from '@modules/auth/lib/auth.lib';
import UserDashboard from '@modules/dashboard/components/user-dashboard';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'User Dashboard',
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) return redirect('/auth/signin');

  return (
    <div className="mx-auto my-6 w-full max-w-6xl px-4 sm:px-6 md:my-14 lg:my-20">
      <UserDashboard user={user} />
    </div>
  );
}
