import React from 'react';
import { useSession } from 'next-auth/react';

const NavbarUserDetails: React.FC = () => {
  const { data, status } = useSession();

  if (status === 'loading') return <>loading</>;

  if (status === 'unauthenticated') return null;

  return <div className="hidden gap-2 md:flex">{data?.user?.name}</div>;
};

export default NavbarUserDetails;
