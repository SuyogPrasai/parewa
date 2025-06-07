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

export default interface Notice extends PostObject {
  _id: string;
  publisher: [
    {
      name: string;
      username: string;
    }
  ];
}