import { PostObjectDB } from "@/types/postObject";
import PostObject from "@/types/postObject";

export interface AnnouncementDB extends PostObjectDB {
  _id: string;
}

export default interface Announcement extends PostObject {
  _id?: string;
  publisher?: [
    {
      name: string;
      username: string;
      role: string;
    }
  ];
}