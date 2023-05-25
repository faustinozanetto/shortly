import { useContext } from 'react';

import { UserDashboardLinksContext } from '../context/links/user-dashboard-links-context';

export const useUserDashboardLinksContext = () => {
  const context = useContext(UserDashboardLinksContext);
  if (!context) throw new Error('Tried to use UserDashboardLinksContext with no context avaiable!');
  return context;
};
