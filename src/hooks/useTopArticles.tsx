import { useEffect, useState } from "react";
import axios from "axios";

import { ArticlesResponse } from '@/types/api-responses';
import Article from "@/types/post_objects/article";

export const useTopArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<ArticlesResponse>('/api/get_articles?top_articles=true');
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