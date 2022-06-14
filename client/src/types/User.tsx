import type CommentData from "./Comment";
import type PostData from "./Post";

export default interface UserData {
    id: string,
    first_name: string,
    last_name: string,
    user_name: string,
    email: string,
    age: string,
    image_url: string,
    created_at: string,
    updated_at: string,
    comments: CommentData[],
    posts: PostData[],
  }