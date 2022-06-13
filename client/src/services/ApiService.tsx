const api_url = "http://localhost:8000"
const getAllPosts = () => {
  return fetch(api_url + "/posts");
};
const getPost = (id: number) => {
  return fetch(api_url + `/posts/${id}`);
};

const ApiService = {
  getAllPosts,
  getPost,
};
export default ApiService;