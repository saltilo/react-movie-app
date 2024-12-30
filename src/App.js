import React, { useState } from "react";

import SearchTab from "./components/SearchTab/SearchTab";
import RatedTab from "./components/RatedTab/RatedTab";
import { Alert, Tabs } from "antd";
import { fetchMovies } from "./api";
import { GenresProvider } from "./components/context/GenresContext";
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

  const tabsItems = [
    {
      key: "1",
      label: "Search",
      children: (
        <SearchTab
          movies={movies}
          loading={loading}
          hasSearched={hasSearched}
          error={error}
          query={query}
          totalResults={totalResults}
          currentPage={currentPage}
          onSearch={handleSearch}
          onPageChange={handlePageChange}
        />
      ),
    },
    {
      key: "2",
      label: "Rated",
      children: <RatedTab />,
    },
  ];

  return (
    <GenresProvider>
      <div className="container">
        <div className="tabs-wrapper">
          <Tabs defaultActiveKey="1" items={tabsItems} />
        </div>
      </div>
    </GenresProvider>
  );
};

export default App;
