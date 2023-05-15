import { authOptions } from '@modules/auth/lib/auth.lib';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return redirect('/');

  return <div className="flex flex-col items-center justify-center"></div>;
};

export default DashboardPage;
