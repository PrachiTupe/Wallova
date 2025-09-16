import axios from "axios";

const API_KEY = process.env.REACT_APP_PEXELS_API_KEY;
const BASE_URL = "https://api.pexels.com";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: API_KEY },
});

export const getCuratedPhotos = (perPage = 20, page = 1) =>
  api.get(`/v1/curated?per_page=${perPage}&page=${page}`);

export const searchPhotos = (query, perPage = 20, page = 1) =>
  api.get(`/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}&page=${page}`);

export const getPopularVideos = (perPage = 20, page = 1) =>
  api.get(`/videos/popular?per_page=${perPage}&page=${page}`);

export const searchVideos = (query, perPage = 20, page = 1) =>
  api.get(`/videos/search?query=${encodeURIComponent(query)}&per_page=${perPage}&page=${page}`);

export const getPhotoById = (id) =>
  api.get(`/v1/photos/${id}`);

export const getRelatedPhotos = async (keyword, perPage = 12) => {
  const response = await api.get(
    `/v1/search?query=${encodeURIComponent(keyword)}&per_page=${perPage}`
  );
  return response.data; // { photos: [...] }
};

export const getVideoDetails = (id) =>
  api.get(`/videos/videos/${id}`); // optional
