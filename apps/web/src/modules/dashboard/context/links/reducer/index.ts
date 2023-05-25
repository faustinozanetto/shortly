import { UserDashboardLinksActions, UserDashboardLinksState, UserDashboardLinksType } from './types';

export const reducer = (state: UserDashboardLinksState, action: UserDashboardLinksActions): UserDashboardLinksState => {
  switch (action.type) {
    case UserDashboardLinksType.SET_LINKS: {
      return {
        ...state,
        filteredLinks: action.payload.links,
        links: action.payload.links,
      };
    }

    case UserDashboardLinksType.SET_FILTER_BY: {
      return {
        ...state,
        filterBy: action.payload.filterBy,
      };
    }
    case UserDashboardLinksType.SET_SORT_BY: {
      return {
        ...state,
        sortBy: action.payload.sortBy,
      };
    }

    default:
      throw new Error('The action you requested does not exists!');
  }
};
