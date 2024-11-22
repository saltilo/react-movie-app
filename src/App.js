import React, { useState } from "react";
import MovieList from "./components/MovieList/MovieList";
import { fetchMovies } from "./api";
import "./App.css";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  if (!movies.length && !error) {
    fetchMovies("return")
      .then((results) => setMovies(results))
      .catch((err) => setError(err.message));
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return <MovieList movies={movies} />;
};

export default App;
