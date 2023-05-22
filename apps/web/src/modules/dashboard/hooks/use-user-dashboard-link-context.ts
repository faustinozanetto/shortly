import { useContext } from 'react';
import { UserDashboardLinkContext } from '../context/link/user-dashboard-link-context';

export const useUserDashboardLinkContext = () => {
  const context = useContext(UserDashboardLinkContext);
  if (!context) throw new Error('Tried to use UserDashboardLinkContext with no context avaiable!');
  return context;
};
