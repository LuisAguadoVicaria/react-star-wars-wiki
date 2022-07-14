import React, { useState, useEffect } from "react";
import {
  NavLink,
  Link,
  useLocation,
  useParams,
} from "react-router-dom";
import { load } from "./Services.js";
import Search from "./Search.js";
import Favmark from "./Favmark.js";
import LinkLazy from "./LinkLazy.js";
import Pagination from "./Pagination.js";

const Records = ({ data }) => {
  const page = useParams();

  const urltoitem = (url) => "/" + url.slice(27).split("/").join("/items/");
  const parseData = (obj) =>
    obj.hasOwnProperty("results") ? obj.results : obj.result;
  const parseFilms = (arr) =>
    arr[0] !== undefined
      ? [...arr][0].hasOwnProperty("properties")
        ? arr.map((e) => e.properties)
        : arr
      : "";
  const result = parseFilms(parseData(data));

  const content = [...result].map((e, i) => (
    <li key={i} className="list-group fs-5 fw-bold">
      <Link
        className="my-1 d-flex list-group-item list-group-item-action p-3"
        to={e.url === undefined ? "/" : urltoitem(e.url)}
      >
        <span className="d-flex badge bg-success rounded-pill me-3 align-items-center">
          {e.uid === undefined ? i + 1 : e.uid}
        </span>
        {e.name}
        {e.title}
      </Link>
    </li>
  ));

  return (
    <>
      <article className="">
        <Search />
        {content}
      </article>

      {data.total_pages !== undefined ? (
        <nav aria-label="...">
          <ul className="pagination mt-4 justify-content-center">
            <li
              className={`page-item ${
                data.previous === null ? "disabled" : ""
              }`}
            >
              <NavLink
                to={
                  data.previous === null ? "" : "./" + (parseInt(page.Id) - 1)
                }
                className="page-link"
              >
                Previous
              </NavLink>
            </li>

            <Pagination
              total_pages={data.total_pages}
              total_records={data.total_records}
            />

            <li className={`page-item ${data.next === null ? "disabled" : ""}`}>
              <NavLink
                to={data.next === null ? "" : "./" + (parseInt(page.Id) + 1)}
                className="page-link"
              >
                Next
              </NavLink>
            </li>
          </ul>
        </nav>
      ) : (
        ""
      )}
    </>
  );
};
export default Records;
