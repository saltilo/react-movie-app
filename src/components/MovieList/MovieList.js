import React from "react";
import { Alert } from "antd";
import "./MovieList.css";
import MovieCard from "../MovieCard/MovieCard";

const MovieList = ({ movies, error }) => {
  if (error) {
    return (
      <div className="container">
        <Alert message="Error" description={error} type="error" showIcon />
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="container">
        <Alert
          message="No movies found"
          type="info"
          description="Try adjusting your search query."
          showIcon
        />
      </div>
    );
  }

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
