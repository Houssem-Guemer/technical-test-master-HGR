import type UserData from "./User";

export default interface PostData {
    id: number,
    user_id: string,
    title: string,
    body: string,
    created_at: string,
    updated_at: string,
    user: UserData,
  }