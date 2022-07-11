import { loadSearch, getFavs } from "./Services.js";
import { Routes, Route } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getFav, setFavs, delFavs } from "./Services.js";

const Favmark = ({ name, path }) => {
  const [active, setActive] = useState(false);
  const location = useLocation();
  const isFav = () => {
    const check = (e) => String(e.name) === String(name);
    let favs = getFavs();
    return favs.some(check);
  };
  useEffect(() => {
    isFav() ? setActive(true) : setActive(false);
  });

  const handleClick = () => {
    const check = (e) => String(e.path) === String(location.pathname);
    let favs = getFavs();
    let ee = favs.some(check);
    return active
      ? (delFavs(name, path), setActive(false))
      : (setFavs(name, path), setActive(true));
  };

  return (
    <nav className="d-flex">
      <div className="dropdown m-auto">
        <button
          className={
            "my-0 me-5 btn btn-success dropdown-toggle " +
            (getFavs()[0] === undefined ? "disabled" : "")
          }
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Favorites
        </button>

        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          {getFavs().map((e, i) => (
            <li key={i}>
              <Link className="dropdown-item" to={e.path}>
                {e.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={handleClick}
        className={
          "p-0 m-0 border-0 bg-transparent bi bi-star" +
          (active ? "-fill" : "") +
          " fs-1 text-warning"
        }
      ></button>
    </nav>
  );
};

export default Favmark;
