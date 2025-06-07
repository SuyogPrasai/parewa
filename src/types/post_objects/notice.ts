import { PostObjectDB } from "@/types/postObject";
import PostObject from "@/types/postObject";

export interface NoticeDB extends PostObjectDB {
  publisher?: [
    {
      name: string;
      username: string;
    }
  ];
}

export default interface Article extends PostObject {
  publisher: [
    {
      name: string;
      username: string;
    }
  ];
}