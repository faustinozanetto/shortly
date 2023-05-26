'use client';
import React, { useEffect, useState } from 'react';
import UserDashboardLinksList from './list/user-dashboard-links-list';
import UserDashboardLinksFiltering from './filtering/user-dashboard-links-filtering';
import { Link } from '@prisma/client';
import { useUserDashboardLinksContext } from '@modules/dashboard/hooks/use-user-dashboard-links-context';
import { UserDashboardLinksType } from '@modules/dashboard/context/links/reducer/types';
import UserDashboardLinksSorting from './sorting/user-dashboard-links-sorting';
import { useQuery } from '@tanstack/react-query';
import Button from '@modules/ui/components/button/button';

type UserLinksAPIResponse = {
  links: Link[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasMore: boolean;
};

const UserDashboardLinks: React.FC = () => {
  const { dispatch } = useUserDashboardLinksContext();

  const [currentPage, setCurrentPage] = useState<number>(0);

  const { isLoading, isError, error, data, isFetching, isPreviousData } = useQuery<UserLinksAPIResponse>(
    [`user-links`, currentPage],
    {
      queryFn: async () => {
        const url = new URL(`/api/links`, process.env.NEXT_PUBLIC_URL);
        url.searchParams.set('page', String(currentPage));
        const response = await fetch(url, {
          method: 'GET',
        });
        const data: UserLinksAPIResponse = await response.json();
        return data;
      },
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    if (data && data.links) dispatch({ type: UserDashboardLinksType.SET_LINKS, payload: { links: data.links } });
  }, [data]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNextPage = () => {
    if (!isPreviousData && data && data.hasMore) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="bg-foreground rounded-lg border p-4 shadow-lg md:p-6">
      <h2 className="leading-2 block text-2xl font-bold text-neutral-800 dark:text-white md:text-3xl lg:text-4xl">
        Generated URLs
      </h2>
      <p className="mt-2 text-neutral-800 dark:text-neutral-100 md:text-lg">
        Manage and optimize your shortened URLs with our user-friendly platform. Edit, update, or delete links as needed
        and organize your URLs with ease.
      </p>

      <div className="mt-4 flex flex-col gap-4 md:mt-6 lg:flex-row">
        <div className="scrollbar-hide col-span-2 grid max-h-[calc(100vh-350px)] grid-rows-2 gap-4 overflow-auto md:grid-cols-2 md:grid-rows-1 lg:sticky lg:top-24 lg:min-w-[300px] lg:grid-cols-1 lg:grid-rows-2 lg:self-start">
          <UserDashboardLinksFiltering />
          <UserDashboardLinksSorting />
        </div>
        <UserDashboardLinksList />
      </div>

      <div className="mt-2 flex justify-end gap-4 md:mt-4">
        <div className="flex gap-2">
          <Button aria-label="Previous Page" disabled={currentPage === 0} onClick={handlePrevPage}>
            Prev Page
          </Button>
          <Button aria-label="Next Page" disabled={isPreviousData || !data?.hasMore} onClick={handleNextPage}>
            Next Page
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardLinks;
