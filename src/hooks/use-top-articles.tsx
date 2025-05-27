import { useEffect, useState } from "react";
import axios from "axios";

import { ArticlesResponse } from '@/types/articlesResponse';
import { Article } from "@/types/articleSection";

export const useTopArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<ArticlesResponse>('/api/top_articles');
        if (response.data.success) {
          setArticles(response.data.articles || []);
        } else {
          setError('Failed to fetch top articles');
          setArticles([]);
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
        setArticles([]);
        setError('Error fetching articles');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return { articles, isLoading, error };
};