export default interface Notice {
  _id: string;
  title: string;
  content: string;
  publishedIn: string;
  postTags: string[];
  voteCount: number;
  username: string;
  trashed: boolean;
}