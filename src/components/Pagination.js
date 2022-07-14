import React, { useState, useEffect } from "react";
import {
  NavLink,
  Link,
  useLocation,
  useParams,
} from "react-router-dom";
import { load } from "./Services.js";

const Pagination = ({ total_records, total_pages }) => {
  const location = useLocation();
  let buffer = [];
  for (let i = 1; i <= total_pages; i++) {
    buffer.push(
      <li key={i} className="page-item">
        <NavLink
          className="page-link"
          to={
            location.pathname
              .split("/")
              .filter((i) => isNaN(parseInt(i)))
              .join("/") +
            "/" +
            i
          }
        >
          {i}
        </NavLink>
      </li>
    );
  }
  return <>{buffer}</>;
};
export default Pagination;
