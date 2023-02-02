import { useRef } from 'react';
import { useFetch } from "./useFetch";

export const useYTSearch = (query, countryCode, options = {}) => {
  // Prevents infinite loop. 'options' shouldn't change between renders.
  const fetchOptions = useRef(options);
  let endpoint;

  if (query && countryCode) {
    endpoint = `/api/yt-search/${query}/${countryCode}`;
  } else if (query) {
    endpoint = `/api/yt-search/${query}`;
  }


  // useFetch will handle empty endpoint
  return useFetch(endpoint, fetchOptions);
}