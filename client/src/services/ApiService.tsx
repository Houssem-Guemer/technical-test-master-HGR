const api_url = "http://localhost:8000"

const getAllPosts = (pageNumber = 1) => {
  return fetch(api_url + "/posts?page=" + String(pageNumber));
};

const getPost = (id: string) => {
  return fetch(api_url + `/posts/${id}`);
};

const getUser = (id: string) => {
  return fetch(api_url + `/users/${id}`);
};

const ApiService = {
  getAllPosts,
  getPost,
  getUser,
};

export default ApiService;