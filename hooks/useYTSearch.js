import { useFetch } from "./useFetch";

export const useYTSearch = (query, options) => {
  return useFetch(`/api/yt-search/${query}`, options);
}