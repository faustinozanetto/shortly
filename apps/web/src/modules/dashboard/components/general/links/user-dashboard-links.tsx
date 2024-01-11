'use client';
import React, { useState } from 'react';
import UserDashboardLinksList from './list/user-dashboard-links-list';
import UserDashboardLinksFiltering from './filtering/user-dashboard-links-filtering';
import { Link } from '@prisma/client';

import UserDashboardLinksSorting from './sorting/user-dashboard-links-sorting';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@modules/ui/components/button/button';
import { Skeleton } from '@modules/ui/components/skeleton/skeleton';
import UserDashboardLinksTable from './table/user-dashboard-links-table';
import { useUserDashboardLinksStore } from '@modules/dashboard/state/user-dashboard-links.slice';
import ArrowLeftIcon from '@modules/ui/components/icons/arrow-left-icon';
import ArrowRightIcon from '@modules/ui/components/icons/arrow-right-icon copy';

type UserLinksAPIResponse = {
  links: Link[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasMore: boolean;
};

const UserDashboardLinks: React.FC = () => {
  const { setIsLoading, setLinks, isLoading } = useUserDashboardLinksStore();

  const [currentPage, setCurrentPage] = useState<number>(0);

  const { data, isPreviousData } = useQuery<UserLinksAPIResponse>([`user-links`, currentPage], {
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
    onError(err) {
      setIsLoading(false);
    },
    onSuccess(data) {
      setLinks(data.links);
      setIsLoading(false);
    },
  });

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNextPage = () => {
    if (!isPreviousData && data && data.hasMore) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="rounded border p-4 shadow md:p-6">
      <h2 className="leading-2 block text-xl font-bold md:text-2xl lg:text-3xl">Generated URLs</h2>
      <p className="mt-2">
        Manage and optimize your shortened URLs with our user-friendly platform. Edit, update, or delete links as needed
        and organize your URLs with ease.
      </p>

      {/* <UserDashboardLinksTable links={data?.links || []} /> */}

      <div className="mt-4 flex flex-col gap-4 md:mt-6 lg:flex-row">
        <div className="scrollbar-hide col-span-2 grid max-h-[calc(100vh-350px)] grid-rows-2 gap-4 overflow-auto md:grid-cols-2 md:grid-rows-1 lg:sticky lg:top-24 lg:min-w-[300px] lg:grid-cols-1 lg:grid-rows-2 lg:self-start">
          <UserDashboardLinksFiltering />
          <UserDashboardLinksSorting />
        </div>
        <div className="flex w-full flex-col gap-4">
          <UserDashboardLinksList />
          {/* Pagination Details */}
          <div className="grid items-center justify-between gap-2 sm:grid-flow-col md:gap-4">
            {isLoading ? (
              <Skeleton className="h-5 w-40" />
            ) : (
              <p className="text-sm md:text-base">
                Showing page <strong>{currentPage + 1}</strong> of <strong>{(data?.totalPages ?? 1) + 1}</strong>
              </p>
            )}
            <div className="flex gap-2">
              <Button aria-label="Previous Page" disabled={currentPage === 0} onClick={handlePrevPage} size="sm">
                <ArrowLeftIcon className="mr-2" />
                Prev Page
              </Button>
              <Button
                aria-label="Next Page"
                disabled={isPreviousData || !data?.hasMore}
                onClick={handleNextPage}
                size="sm"
              >
                Next Page
                <ArrowRightIcon className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardLinks;
