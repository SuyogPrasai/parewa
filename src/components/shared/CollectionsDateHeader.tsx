"use client";

import { useSearchParams } from 'next/navigation';
import React, { useMemo } from 'react';
import CollectionsSearch from './CollectionsSearch';
import { DatePicker } from './DatePicker';
import { Suspense } from 'react';

interface CollectionsDateHeaderProps {
  initialDate: string;
  initialPage: number;
  initialQuery: string;
}

function CollectionsDateHeader({
  initialDate,
  initialPage,
  initialQuery,
}: CollectionsDateHeaderProps) {
  const searchParams = useSearchParams();

  const page = useMemo(
    () => parseInt(searchParams.get('page') || initialPage.toString(), 10),
    [searchParams, initialPage]
  );
  const date = useMemo(
    () => searchParams.get('date') || initialDate,
    [searchParams, initialDate]
  );
  const query = useMemo(
    () => searchParams.get('query') || initialQuery,
    [searchParams, initialQuery]
  );

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
      <div className="relative w-full sm:w-1/2">

        <CollectionsSearch />

      </div>
      <div className="flex justify-center md:justify-end mt-4 sm:mt-0">

        <DatePicker />
      </div>
    </div>
  );
}

export default CollectionsDateHeader;