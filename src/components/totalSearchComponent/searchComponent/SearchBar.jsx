import { useState } from "react";

import globalEnv from "../../../api/globalenv";
import "./SearchBar.css";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [searchError, setSearchError] = useState(false);

  const fetchData = (value) => {
    if (value) {
      fetch(`${globalEnv.api}/api/articles?title_contains=${value}&populate=*`)
        .then((response) => response.json())
        .then((json) => {
          const Titles = json.data.filter((item) => {
            return (
              (item &&
                item.attributes.Title &&
                item.attributes.Title.toLowerCase().includes(value)) ||
              (item.attributes.Tag &&
                item.attributes.Tag.toLowerCase().includes(value))
            );
          });

          setResults(Titles);
          setShowResults(true);
          setSearchError(Titles.length === 0);
        });
    } else {
      setShowResults(false); // Hide the search results if input is empty
    }
  };

  const handleChange = (value) => {
    setInput(value);
    setSearchError(false);
  };
  const SubmitHandler = (e) => {
    e.preventDefault();
  };
  const handleSearchClick = () => {
    fetchData(input.toLowerCase());
  };

  return (
    <div className="input-wrapper">
      <form onSubmit={SubmitHandler}>
        <div>
          <input
            type="text"
            className="form-control"
            placeholder="Search here..."
            value={input}
            onChange={(e) => handleChange(e.target.value)}
          />
          <button type="submit" onClick={handleSearchClick}>
            <i className="fi flaticon-magnifiying-glass"></i>
          </button>
        </div>
      </form>

      {showResults && !searchError && (
        <div className="search-results">
          {/* Render the search results here */}
        </div>
      )}
      {showResults && searchError && (
        <div className="no-results">No results found.</div>
      )}
    </div>
  );
};
