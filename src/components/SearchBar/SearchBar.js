import React from "react";
import { Input } from "antd";
import { debounce } from "lodash";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const handleInput = debounce((e) => {
    const trimmedValue = e.target.value.trim();
    if (trimmedValue) {
      onSearch(trimmedValue);
    }
  }, 500);

  return (
    <div className="search-bar">
      <Input
        placeholder="Type to search..."
        onChange={handleInput}
        allowClear
      />
    </div>
  );
};

export default SearchBar;
