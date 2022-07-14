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



const SingleItem = ({ data }) => {
  const location = useLocation();

  const urltoitem = (url) => "/" + url.slice(27).split("/").join("/items/");

  const parseData = (obj) =>
    obj.hasOwnProperty("result") ? obj.result.properties : obj;

  const res = parseData(data);

  const toLink = (path) =>
    path === "/" ? (
      ""
    ) : (
      <LinkLazy key={path} path={path}>
        {path}
      </LinkLazy>
    );

  const main = Object.fromEntries(
    new Map(
      Object.entries({ ...res }).filter(
        ([key, value]) =>
          key === "name" ||
          key === "created" ||
          key === "edited" ||
          key === "title"
      )
    )
  );

  const restof = Object.fromEntries(
    new Map(
      Object.entries({ ...res }).filter(
        ([key, value]) =>
          key !== "name" &&
          key !== "created" &&
          key !== "edited" &&
          key !== "url" &&
          key !== "title"
      )
    )
  );

  const parseDate = (date) =>
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  const convertLinks = (value) =>
    Array.isArray(value)
      ? [...value].map((e = "") => toLink(urltoitem(String(e))))
      : String(value).includes("swapi.tech")
      ? toLink(urltoitem(value))
      : value;

  return (
    <article className="card shadow bg-light p-4">
      <section className="card-body">
        <header className="card-title d-flex justify-content-between flex-wrap text-nowrap">
          <h1>{main.name}
          {main.title}</h1>
          <Favmark
            name={main.title === undefined ? main.name : main.title}
            path={location.pathname}
          />
        </header>
        <dl className="card-text mt-5">
          {Object.entries({ ...restof })
            .reverse()
            .map(([key, value]) => (
              <span key={key}>
                <dt className="mt-4 fw-semibold">{key.split("_").join(" ").toUpperCase()}</dt>
                <dd className="list-group card-body m-3 fw-light lh-lg">{convertLinks(value)}</dd>
              </span>
            ))}
        </dl>
        <aside className="card-text text-end">
          <small className="text-muted">
            Created: {parseDate(new Date(Date.parse(main.created)))} | Edited:{" "}
            {parseDate(new Date(Date.parse(main.edited)))}
          </small>
        </aside>
      </section>
    </article>
  );
};
export default SingleItem;
