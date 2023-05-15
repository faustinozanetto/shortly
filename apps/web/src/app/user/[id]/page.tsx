import { prisma } from '@modules/database/lib/database.lib';

const UserPage = async ({ params }) => {
  const user = await prisma.user.findFirst({ where: { id: params.id } });

  return <div className="flex flex-col items-center justify-center">{JSON.stringify(user)}</div>;
};

export default UserPage;
