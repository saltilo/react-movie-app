import React, { useState } from "react";
import MovieList from "./components/MovieList/MovieList";
import { Spin, Alert } from "antd";
import { fetchMovies } from "./api";
import "./App.css";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const checkNetworkStatus = () => {
    setIsOnline(navigator.onLine);
  };

  const setupNetworkListeners = () => {
    window.addEventListener("online", checkNetworkStatus);
    window.addEventListener("offline", checkNetworkStatus);

    return () => {
      window.removeEventListener("online", checkNetworkStatus);
      window.removeEventListener("offline", checkNetworkStatus);
    };
  };

  const loadMovies = async () => {
    if (!isOnline) {
      setError("You are offline. Please check your internet connection.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const results = await fetchMovies("return");
      setMovies(results);
    } catch (err) {
      setError(err.message || "Failed to fetch movies.");
    } finally {
      setLoading(false);
    }
  };

  if (!movies.length && !error && !loading) {
    setupNetworkListeners();
    loadMovies();
  }

  if (!isOnline) {
    return (
      <div className="container">
        <Alert
          message="No network connection"
          type="error"
          description="Please check your internet connection."
          showIcon
        />
      </div>
    );
  }

  return (
    <div className="container">
      {loading && (
        <div className="spinner-container">
          <Spin size="large" />
        </div>
      )}
      {!loading && <MovieList movies={movies} error={error} />}
    </div>
  );
};

export default App;
