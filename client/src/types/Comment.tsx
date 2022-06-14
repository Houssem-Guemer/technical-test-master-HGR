import type PostData from "./Post";
import type UserData from "./User";

export default interface CommentData {
    id: string,
    post_id: string,
    user_id: string,
    body: string,
    created_at: string,
    updated_at: string,
    user: UserData,
    post: PostData,
  }