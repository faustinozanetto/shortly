import { prisma } from '@shortly/database';

const UserPage = async ({ params }) => {
  const user = await prisma.user.findFirst({ where: { id: params.id } });
  console.log({ user });
  return <div className="flex flex-col items-center justify-center">{JSON.stringify(user)}</div>;
};

export default UserPage;
