const API_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchMovies = async (query, page = 1) => {
  const response = await fetch(
    `${API_URL}/search/movie?query=${query}&page=${page}&api_key=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await response.json();
  return data;
};
