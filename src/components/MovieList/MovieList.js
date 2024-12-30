import React, { useContext } from "react";
import { Alert } from "antd";
import { GenresContext } from "../context/GenresContext";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieList.css";

const MovieList = ({ movies, error }) => {
  const genres = useContext(GenresContext);

  if (error) {
    return (
      <div className="container">
        <Alert message="Error" description={error} type="error" showIcon />
      </div>
    );
  }

  if (!movies?.length) {
    return (
      <div className="container">
        <Alert
          message="No movies found"
          description="Try adjusting your search query."
          type="info"
          showIcon
        />
      </div>
    );
  }

  return (
    <div className="container">
      <div className="movie-list">
        {movies.map((movie) => {
          const movieGenres =
            movie.genre_ids?.map((id) =>
              genres.find((genre) => genre.id === id)
            ) ||
            movie.genres ||
            [];

          return (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              date={movie.date || movie.release_date}
              description={movie.description || movie.overview}
              posterPath={movie.posterPath || movie.poster_path}
              rating={movie.rating || movie.vote_average}
              userRate={movie.userRate}
              genres={movieGenres.filter(Boolean)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MovieList;
