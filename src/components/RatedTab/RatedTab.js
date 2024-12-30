import React, { useState } from "react";
import { Alert } from "antd";
import MovieList from "../MovieList/MovieList";
import { RatingService } from "../../services/RatingService";

const RatedTab = () => {
  const [ratedMovies, setRatedMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const loadRatedMovies = () => {
    try {
      setError(null);
      const movies = RatingService.getRatedMovies();

      setRatedMovies(movies);
    } catch (err) {
      console.error("Failed to fetch rated movies:", err.message);
      setError(err.message || "Failed to fetch rated movies.");
    } finally {
      setIsInitialized(true);
    }
  };

  const handleUpdateRatedMovies = (movieId, rating) => {
    console.log(`Updating rating for Movie ID: ${movieId}, Rating: ${rating}`);
    loadRatedMovies();
  };

  if (!isInitialized) {
    loadRatedMovies();
  }

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
