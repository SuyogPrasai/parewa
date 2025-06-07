import { PostObjectDB } from "@/types/postObject";
import PostObject from "@/types/postObject";

export interface ArticleDB extends PostObjectDB {
  author: string;
  publisher?: [{
    name: string;
    username: string;
  }];
}

export default interface Article extends PostObject {
  author: string;
  publisher: [
    {
      name: string;
      username: string;
    }
  ];
}