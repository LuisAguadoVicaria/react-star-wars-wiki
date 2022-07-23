import { useLocation } from "react-router-dom";
import Favmark from "./subcomponents/Favmark";
import LinkLazy from "./subcomponents/LinkLazy";
import {
  urltoitem,
  filterMain,
  filterRestof,
  parseDate,
  objectType,
  formatOut,
} from "./Services";

const SingleItem = ({ data }) => {
  const location = useLocation();
  const content = objectType(formatOut(data)).properties;

  const main = filterMain({ ...content });
  const restof = filterRestof({ ...content });

  const path = location.pathname.split("/")[1].toLowerCase();
  const imageLocation = path === "people" ? "characters" : path;

  const toLink = (path) => (
    <LinkLazy key={path} path={path}>
      {path}
    </LinkLazy>
  );

  const convertLinks = (value) =>
    String(value).includes("swapi.tech")
      ? Array.isArray(value)
        ? [...value].map((e = "") => toLink(urltoitem(e)))
        : toLink(urltoitem(value))
      : value;

  return (
    <>
      {" "}
      <article className="position-relative">
        <header className="d-flex">
          <h1 className="m-0 mt-auto">
            {main.name}
            {main.title}
          </h1>
          <Favmark
            name={main.title === undefined ? main.name : main.title}
            path={location.pathname}
          />
        </header>

        <div className="mt-4 me-3 position-absolute top-0 end-0">
          <img
            className="mt-4 img-fluid rounded"
            src={`https://starwars-visualguide.com/assets/img/${imageLocation}/${
              location.pathname.split("/")[3]
            }.jpg`}
            type="image/png"
            alt="front"
          />
        </div>

        <dl className="row g-1 p-3 list-group">
          {Object.entries({ ...restof })
            .reverse()
            .map(([key, value]) => (
              <span
                className="col-auto m-1
            "
                key={key}
              >
                <dt className="text-capitalize text-muted border-bottom mb-2">
                  {key.split("_").join(" ")}
                </dt>
                <dd className="text-capitalize">{convertLinks(value)}</dd>
              </span>
            ))}
        </dl>

        <aside className="mt-1 d-flex">
          <small className="text-muted text-end m-auto me-0">
            Created: {parseDate(new Date(Date.parse(main.created)))} | Edited:{" "}
            {parseDate(new Date(Date.parse(main.edited)))} |{" "}
            <a className="mx-1" href="https://github.com/LuisAguadoVicaria">
              LuisAguadoVicaría
            </a>{" "}
            |{" "}
            <a className="mx-1" href="https://www.swapi.tech/">
              swapi.tech
            </a>{" "}
            |
          </small>
        </aside>
      </article>
    </>
  );
};
export default SingleItem;
