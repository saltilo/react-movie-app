import React, { createContext, useState } from "react";
import { fetchGenres } from "../../api";

export const GenresContext = createContext();

export const GenresProvider = ({ children }) => {
  const [genres, setGenres] = useState([]);

  const loadGenres = async () => {
    if (genres.length === 0) {
      try {
        const fetchedGenres = await fetchGenres();
        setGenres(fetchedGenres);
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      }
    }
  };

  loadGenres();

  return (
    <GenresContext.Provider value={genres}>{children}</GenresContext.Provider>
  );
};
