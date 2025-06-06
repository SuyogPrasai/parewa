import { useState, useEffect } from 'react';
import Notice from '@/types/post_objects/notice';
import { NoticesResponse } from '@/types/post_objects/notice';
import { ITEMS_PER_PAGE, MAX_PAGES_TO_SHOW } from '@/config/site-config';
import axios from 'axios';

import getFormattedDate from '@/helpers/getDateInFormat'; // Assuming this helper exists

export const useNotices = (category: string, page: number, query: string, date: Date | null) => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotices = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        params.set('category', category);
        params.set('page', page.toString());
        params.set('limit', ITEMS_PER_PAGE.toString());
        if (query) {
          params.set('query', query);
        }
        // Only add date parameter if a date is selected
        if (date) {
          params.set('date', getFormattedDate(date)); // Ensure date is formatted correctly for API
        }

        const response = await axios.get<NoticesResponse>(
          `/api/get_news?${params.toString()}`
        );
        if (response.data.success) {
          setNotices(response.data.notices);
          setTotalPages(response.data.totalPages);
        } else {
          setNotices([]);
          setTotalPages(1);
          setError('Failed to fetch notices');
        }
      } catch (error) {
        console.error('Error fetching notices:', error);
        setNotices([]);
        setTotalPages(1);
        setError('Error fetching notices');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotices();
  }, [category, page, query, date]); // Add query and date to dependencies

  return { notices, totalPages, isLoading, error };
};