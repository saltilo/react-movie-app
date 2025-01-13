import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import MovieList from "../MovieList/MovieList";
import { Alert, Spin, Pagination } from "antd";

const SearchTab = ({
  movies,
  loading,
  error,
  query,
  totalResults,
  currentPage,
  onSearch,
  onPageChange,
}) => {
  return (
    <div className="SearchTab">
      <SearchBar onSearch={onSearch} />
      {loading && (
        <div className="spinner-container">
          <Spin size="large" />
        </div>
      )}
      {!loading && error && (
        <Alert message="Error" description={error} type="error" showIcon />
      )}
      {!loading && !error && movies.length > 0 && (
        <>
          <MovieList movies={movies} />
          <Pagination
            current={currentPage}
            total={totalResults}
            pageSize={20}
            onChange={onPageChange}
            className="pagination"
          />
        </>
      )}
      {!loading && !error && movies.length === 0 && (
        <Alert message="No movies found" type="info" showIcon />
      )}
    </div>
  );
};

export default SearchTab;
