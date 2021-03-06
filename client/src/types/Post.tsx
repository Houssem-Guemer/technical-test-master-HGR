import type CommentData from "./Comment";
import type UserData from "./User";

export default interface PostData {
    id: string,
    user_id: string,
    title: string,
    body: string,
    created_at: string,
    updated_at: string,
    user: UserData,
    comments: CommentData[],
  }