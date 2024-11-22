import React from "react";
import "./MovieList.css";
import MovieCard from "../MovieCard/MovieCard";

const MovieList = ({ movies }) => {
  return (
    <div className="container">
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            date={movie.release_date}
            description={movie.overview}
            posterPath={movie.poster_path}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
