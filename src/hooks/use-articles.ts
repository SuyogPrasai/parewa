import { useState, useEffect } from 'react';
import axios from 'axios';
import getFormattedDate from '@/helpers/getDateInFormat';
import { ArticlesSectionProps } from '@/types/Article';
import { ArticlesResponse } from '@/types/Article';
import { Article } from '@/types/Article';
import { ITEMS_PER_PAGE, MAX_PAGES_TO_SHOW } from '@/config/site-config';


export const useArticles = (category: string, page: number, query: string, date: Date | null) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
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

        const response = await axios.get<ArticlesResponse>(
          `/api/get_articles?${params.toString()}`
        );
        if (response.data.success) {
          setArticles(response.data.articles);
          setTotalPages(response.data.totalPages);
        } else {
          setArticles([]);
          setTotalPages(1);
          setError('Failed to fetch articles');
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
        setArticles([]);
        setTotalPages(1);
        setError('Error fetching articles');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [category, page, query, date]); // Add query and date to dependencies

  return { articles, totalPages, isLoading, error };
};