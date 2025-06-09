import { PostObjectDB } from "@/types/postObject";
import PostObject from "@/types/postObject";

export interface ArticleDB extends PostObjectDB {
  _id: string;
  author: string;
}

export default interface Article extends PostObject {
  _id?: string;
  author: string;
  publisher?: [
    {
      name: string;
      username: string;
      role: string;
      position?: string;
    }
  ];
}