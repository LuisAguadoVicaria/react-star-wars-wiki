import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { loadSearch, formatOut, urltoitem, objectType } from "./../Services";

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
    const handleClick = (e) =>
      e.target.tagName !== "INPUT" && e.target.tagName !== "ASIDE"
        ? clear()
        : null;
    document.body.addEventListener("click", handleClick);
    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    clear();
  }, [location]);

  const handleSearch = () => {
    setSearchResult(<li className="dropdown-item disabled">Searching...</li>);
    input.length === 0
      ? setSearchResult("")
      : input.length > 1
      ? loadSearch(input, searchlocation).then((r) =>
          setSearchResult(formatOut(r))
        )
      : setSearchResult(
          <li className="dropdown-item disabled">Invalid search</li>
        );
  };

  const parsedSearchResult = (searchResult) =>
    Array.isArray(searchResult) ? (
      searchResult.length > 0 &&
      searchResult[0].hasOwnProperty("properties") ? (
        [...searchResult].map((e, i) => (
          <Link
            className="dropdown-item"
            key={i}
            to={"/" + urltoitem(objectType(e.properties).url)}
          >
            {objectType(e.properties).name}
            {objectType(e.properties).title}
          </Link>
        ))
      ) : (
        <li className="dropdown-item disabled">No results</li>
      )
    ) : (
      searchResult
    );

  const results = parsedSearchResult(searchResult);
  return location.pathname.includes("films") ? (
    ""
  ) : (
    <nav className="input d-flex position-relative">
      <input
        value={input}
        onKeyUp={handleSearch}
        onChange={(e) => setinput(e.target.value)}
        className="text-start mb-3 input-group-text form-control shadow-none"
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
          className="ms-2 mb-3 btn btn-warning btn-small shadow-none"
          onClick={clear}
        >
          X
        </button>
      )}

      <aside
        className={
          "py-3 dropdown-menu w-100 " +
          (searchResult === "" ? "" : "show") +
          " position-absolute top-100 end-0"
        }
      >
        {results}
      </aside>
      <hr />
    </nav>
  );
};

export default Search;
