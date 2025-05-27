import { Article } from '@/types/articleSection';

export interface ArticlesResponse {
  success: boolean;
  articles: Article[];
}
