import React from "react";
import { Input } from "antd";
import { debounce } from "lodash";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const handleInput = debounce((e) => {
    onSearch(e.target.value);
  }, 500);

  return (
    <div className="search-bar">
      <Input
        placeholder="Type to search..."
        onChange={(e) => handleInput(e)}
        allowClear
      />
    </div>
  );
};

export default SearchBar;
