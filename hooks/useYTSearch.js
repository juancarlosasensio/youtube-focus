import { useRef } from 'react';
import { useFetch } from "./useFetch";

export const useYTSearch = (query, options = {}) => {
  // Prevents infinite loop. 'options' shouldn't change between renders.
  const fetchOptions = useRef(options);

  return useFetch(`/api/yt-search/${query}`, fetchOptions);
}