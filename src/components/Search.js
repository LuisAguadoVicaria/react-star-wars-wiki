import { Routes, Route } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

import { loadSearch } from "./Services.js";

const Search = () => {
  const location = useLocation();
  const searchlocation = location.pathname.split("/")[1];

  const [input, setinput] = useState("");
  const [searchResult, setSearchResult] = useState(" ");
  const clear = () => {
    setinput("");
    setSearchResult("");
  };

  useEffect(() => {
    clear();
  }, [location]);

  const handleSearch = () => {
    setSearchResult(<li className="dropdown-item disabled">Searching...</li>);
    input.length === 0
      ? setSearchResult("")
      : input.length > 1
      ? loadSearch(input, searchlocation).then((r) => setSearchResult(r))
      : setSearchResult(
          <li className="dropdown-item disabled">Invalid search</li>
        );
  };
  const urlconvert = (url) =>
    url.split("https://www.swapi.tech/api/")[1].split("/").join("/items/");

  const formatOut = (searchResult) =>
    !searchResult.hasOwnProperty("results") &&
    !searchResult.hasOwnProperty("result")
      ? searchResult
      : searchResult.hasOwnProperty("results")
      ? searchResult.results
      : searchResult.result;

  const divide = (resultings) =>
    resultings.hasOwnProperty("properties")
      ? resultings.properties
      : resultings;
  const parsedSearchResult = (searchResult) =>
    Array.isArray(searchResult)
      ? searchResult.length > 0
        ? searchResult.map((e, i) => (
            <Link
              className="dropdown-item"
              key={i}
              to={
                "/" +
                divide(e)
                  .url.split("https://www.swapi.tech/api/")[1]
                  .split("/")
                  .join("/items/")
              }
            >
              {divide(e).name}
              {divide(e).title}
            </Link>
          ))
        : (<li className="dropdown-item disabled">No results</li>)
      : searchResult;

  const content = parsedSearchResult(formatOut(searchResult));

  return location.pathname.includes("films") ? (
    ""
  ) : (
    <nav className="navbar input-group mb-3 mt-2">
      <input
        value={input}
        onKeyUp={handleSearch}
        onChange={(e) => setinput(e.target.value)}
        className="form-control shadow-none"
        type="search."
        placeholder={
          "Search in " +
          searchlocation.charAt(0).toUpperCase() +
          searchlocation.slice(1)
        }
        aria-label="Search"
      />
      {searchResult === "" ? (
        ""
      ) : (
        <button
          className="btn btn-outline-danger btn-small shadow-none"
          onClick={clear}
        >
          X
        </button>
      )}

      <aside
        className={
          "dropdown-menu w-100 " +
          (content === "" ? "" : "show") +
          " position-absolute top-100 end-0"
        }
      >
        {content}
      </aside>
      <hr />
    </nav>
  );
};

export default Search;
