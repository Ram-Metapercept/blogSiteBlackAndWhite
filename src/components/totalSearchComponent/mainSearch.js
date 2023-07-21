import { useState } from "react";
import "./App.css";
import { SearchBar } from "./searchComponent/SearchBar";
import { SearchResultsList } from "./searchComponent/SearchResultsList";

function MainSearch() {
  const [results, setResults] = useState([]);

  return (
    <div className="App">
      <div className="search-bar-container">
        <SearchBar setResults={setResults} />
        {results && results.length > 0 && (
          <SearchResultsList results={results} />
        )}
      </div>
    </div>
  );
}

export default MainSearch;
