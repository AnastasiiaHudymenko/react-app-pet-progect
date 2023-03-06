import axios from "axios";

const API_KEY = "Ts0CvK6plP85itAs0B0l4Eef4POxoN3Gzvmp5JmT9QG1MeN9vEh3CZE8";
axios.defaults.baseURL = "https://api.pexels.com/v1/";
axios.defaults.headers.common["Authorization"] = API_KEY;
axios.defaults.params = {
  orientation: "landscape",
  per_page: 15,
};

export const getImages = async (query, page) => {
  const res = await axios.get(`search?query=${query}&page=${page}`);

  return res;
};
