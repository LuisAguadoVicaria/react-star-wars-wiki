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

const Item = () => {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  useEffect(() => {
    const single = location.pathname.includes("pages");

    const routeandpage = location.pathname.split(single ? "/pages/" : "/items");

    single
      ? load(routeandpage[0], routeandpage[1]).then((r) => {
          setContent(JSON.parse(r));
          setLoading(false);
        })
      : load(routeandpage[0] + routeandpage[1], false).then((r) => {
          setContent(JSON.parse(r));
          setLoading(false);
        });

    return () => {
      setLoading(true);
    };
  }, [location]);

  return loading ? (
    <div className="d-flex m-auto spinner-grow text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  ) : (
    <main className="container-fluid overflow-auto p-3 m-3 m-auto">
      {location.pathname.includes("pages") ? (
        <Records data={content} />
      ) : (
        <SingleItem data={content} />
      )}
    </main>
  );
};

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
export default Item;
