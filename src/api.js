const API_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchMovies = async (query) => {
  const response = await fetch(
    `${API_URL}/search/movie?query=${query}&api_key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await response.json();
  return data.results;
};
