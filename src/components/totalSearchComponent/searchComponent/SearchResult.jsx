import React from "react";
import "./SearchResult.css";
import { Link } from "react-router-dom";

export const SearchResult = ({ result }) => {
  console.log(result);
  const displayText = result.attributes.Title || result.attributes.Tag;
  console.log(result.attributes.Title);
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };
  return (
    <div className="search-result">
      <Link onClick={ClickHandler} to={`/highlight-single/${result.id}`}>
        {" "}
        {displayText}
      </Link>
    </div>
  );
};
