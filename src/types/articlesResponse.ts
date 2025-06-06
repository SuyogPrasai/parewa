import { Article } from '@/types/Article';

export interface ArticlesResponse {
  success: boolean;
  articles: Article[];
}
