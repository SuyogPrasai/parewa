import { PostObjectDB } from "@/types/postObject";
import PostObject from "@/types/postObject";

export interface NoticeDB extends PostObjectDB {
  _id: string;
  published_for: string;
}

export default interface Notice extends PostObject {
  _id?: string;
  published_for: string;
  publisher?: [
    {
      name: string;
      username: string;
      role: string;
      position?: string;
    }
  ];
}