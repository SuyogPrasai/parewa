import PostObject from "../postObject";
export default interface Article extends PostObject {
  author: string;
}