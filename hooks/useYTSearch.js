import { useRef } from 'react';
import { useFetch } from "./useFetch";

export const useYTSearch = (query, countryCode, options = {}) => {
  // Prevents infinite loop. 'options' shouldn't change between renders.
  const fetchOptions = useRef(options);
  let endpoint;

  if (!query) {
    endpoint = `/api/yt-search/`;
  } else {
    endpoint = `/api/yt-search/${query}/${countryCode}`;
  }

  return useFetch(endpoint, fetchOptions);
}