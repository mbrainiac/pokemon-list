'use client';

import React, { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MAX_ITEM_PER_PAGE } from './poke-service';

export interface PaginationProps {
  page: number;
  total: number;
  pageSize?: number;
  previousLabel?: string;
  nextLabel?: string;
  onNext?: (page: number) => void;
  onPrevious?: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  total,
  page,
  pageSize = MAX_ITEM_PER_PAGE,
  previousLabel = 'Prev ',
  nextLabel = 'Next ',
  onPrevious,
  onNext,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handlePrev = (event: React.MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault();
    if (page > 1) {
      router.push(`?${createQueryString('page', `${page - 1}`)}`);
    }
  };

  const handleNext = (event: React.MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault();
    if (page < total / pageSize) {
      router.push(`?${createQueryString('page', `${page + 1}`)}`);
    }
  };

  return (
    <div className="flex flex-col items-center mt-8 mb-8">
      <span className="text-sm text-black">
        Showing{' '}
        <span className="font-semibold text-black">
          {pageSize * (page - 1) + 1}
        </span>{' '}
        to{' '}
        <span className="font-semibold text-black">
          {Math.min(pageSize * page, total)}
        </span>{' '}
        of <span className="font-semibold text-black">{total}</span> items
      </span>
      <div className="inline-flex mt-2 xs:mt-0">
        <button
          className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          onClick={handlePrev}
        >
          <svg
            className="w-3.5 h-3.5 me-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 5H1m0 0 4 4M1 5l4-4"
            />
          </svg>
          &nbsp;&nbsp;{previousLabel}
        </button>
        <button
          className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          onClick={handleNext}
        >
          {nextLabel}&nbsp;&nbsp;
          <svg
            className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export { Pagination };
