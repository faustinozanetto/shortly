import { authOptions } from '@modules/auth/lib/auth.lib';
import UserDashboard from '@modules/dashboard/components/user-dashboard';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'User Dashboard',
};

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return redirect('/');

  return (
    <div className="mx-auto my-6 w-full max-w-6xl px-4 sm:px-6 md:my-14 lg:my-20">
      <UserDashboard session={session} />
    </div>
  );
};

export default DashboardPage;
