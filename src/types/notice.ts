export default interface Notice {
  _id: string;
  title: string;
  content: string;
  publishedIn: string;
  postTags: string[];
  voteCount: number;
  author: string;
  trashed: boolean;
  link: string;
}

export interface NoticesResponse {
  success: boolean;
  notices: Notice[];
  totalPages: number;
}