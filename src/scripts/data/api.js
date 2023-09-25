import { option } from "./option.js";

const API_KEY = option.api_key;
const BASE_URL = option.base_url;

export const getMovies = async (page = 2) => {
  let movies = [];
  try {
    const response = await fetch(
      `${BASE_URL}movie/popular?api_key=${API_KEY}&page=${page}`
    );
    const getTheMovies = await response.json();
    movies = getTheMovies.results;
  } catch (error) {
    console.log(error);
  }

  return movies;
};
