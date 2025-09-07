// hooks/usePagination.ts
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export function usePagination<T>(items: T[], itemsPerPage: number, pageParam = 'page') {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get(pageParam) || '1');
    setCurrentPage(Math.max(1, pageFromUrl));
  }, [searchParams, pageParam]);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(pageParam, validPage.toString());
    setSearchParams(newSearchParams);
  };

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }, [currentPage, items, itemsPerPage]);

  return {
    currentPage,
    setCurrentPage: handlePageChange,
    totalPages,
    paginatedItems,
  };
}