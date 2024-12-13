import React, { useState } from "react";
import MovieList from "./components/MovieList/MovieList";
import SearchBar from "./components/SearchBar/SearchBar";
import { Spin, Alert, Pagination } from "antd";
import { fetchMovies } from "./api";
import "./App.css";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);

  const loadMovies = async (searchQuery, page = 1) => {
    if (!isOnline) {
      setError("You are offline. Please check your internet connection.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { results, total_results } = await fetchMovies(searchQuery, page);
      setMovies(results);
      setTotalResults(total_results);
    } catch (err) {
      setError(err.message || "Failed to fetch movies.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setQuery(value);
    setCurrentPage(1);
    setHasSearched(true);
    loadMovies(value, 1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    loadMovies(query, page);
  };

  const setupNetworkListeners = () => {
    const checkNetworkStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", checkNetworkStatus);
    window.addEventListener("offline", checkNetworkStatus);

    return () => {
      window.removeEventListener("online", checkNetworkStatus);
      window.removeEventListener("offline", checkNetworkStatus);
    };
  };

  if (!movies.length && !error && !loading && !hasSearched) {
    setupNetworkListeners();
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
      <SearchBar onSearch={handleSearch} />
      {loading && (
        <div className="spinner-container">
          <Spin size="large" tip="Loading movies..." />
        </div>
      )}
      {!loading && !hasSearched && (
        <Alert message="Type to search..." type="info" showIcon />
      )}
      {!loading && error && (
        <Alert message="Error" description={error} type="error" showIcon />
      )}
      {!loading && hasSearched && movies.length === 0 && (
        <Alert message="No movies found" type="info" showIcon />
      )}
      {!loading && hasSearched && movies.length > 0 && (
        <>
          <MovieList movies={movies} />
          <Pagination
            current={currentPage}
            total={totalResults}
            pageSize={20}
            onChange={handlePageChange}
            className="pagination"
          />
        </>
      )}
    </div>
  );
};

export default App;
