import React from "react";
import "./SearchResultsList.css";
import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results }) => {
  return (
    <div className="results-list">
      {results.length === 0 ? (
        <p>No results found</p>
      ) : (
        results.map((result, id) => <SearchResult result={result} key={id} />)
      )}
    </div>
  );
};
