import React, { useState } from "react";
import SearchTab from "./components/SearchTab/SearchTab";
import RatedTab from "./components/RatedTab/RatedTab";
import { Tabs } from "antd";
import { fetchMovies } from "./api";
import { GenresProvider } from "./components/context/GenresContext";
import "./App.css";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("1");

  const handleSearch = async (value) => {
    setQuery(value);
    setCurrentPage(1);
    setLoading(true);
    try {
      const { results, total_results } = await fetchMovies(value);
      setMovies(results);
      setTotalResults(total_results);
    } catch (err) {
      setError("Failed to fetch movies.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = async (page) => {
    setCurrentPage(page);
    setLoading(true);
    try {
      const { results, total_results } = await fetchMovies(query, page);
      setMovies(results);
      setTotalResults(total_results);
    } catch (err) {
      setError("Failed to fetch movies.");
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const tabsItems = [
    {
      key: "1",
      label: "Search",
      children: (
        <SearchTab
          movies={movies}
          loading={loading}
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
      children: <RatedTab key={activeTab} />,
    },
  ];

  return (
    <GenresProvider>
      <div className="container">
        <Tabs
          defaultActiveKey="1"
          activeKey={activeTab}
          onChange={handleTabChange}
          items={tabsItems}
        />
      </div>
    </GenresProvider>
  );
};

export default App;
