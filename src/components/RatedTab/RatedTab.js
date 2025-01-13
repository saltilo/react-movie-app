import React, { useState } from "react";
import { Alert } from "antd";
import MovieList from "../MovieList/MovieList";
import { RatingService } from "../../services/RatingService";

const RatedTab = () => {
  const [ratedMovies, setRatedMovies] = useState(
    RatingService.getRatedMovies()
  );
  const [error, setError] = useState(null);

  const handleUpdateRatedMovies = (movieId, rating) => {
    try {
      RatingService.rateMovie(movieId, rating);
      setRatedMovies(RatingService.getRatedMovies());
    } catch (err) {
      setError("Failed to update movie rating.");
    }
  };

  return (
    <div className="rated-tab">
      {error && (
        <Alert message="Error" description={error} type="error" showIcon />
      )}
      {ratedMovies.length > 0 ? (
        <MovieList
          movies={ratedMovies}
          onUpdateRatedMovies={handleUpdateRatedMovies}
        />
      ) : (
        !error && <Alert message="No rated movies yet." type="info" showIcon />
      )}
    </div>
  );
};

export default RatedTab;
