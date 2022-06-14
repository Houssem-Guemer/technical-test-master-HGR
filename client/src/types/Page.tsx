import type PostData from "./Post";

export default interface PageData {
    current_page: number,
    per_page: number,
    total: number,
    data: PostData[]
  }