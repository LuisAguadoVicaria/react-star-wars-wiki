import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { setFavs, delFavs, getFavs } from "./../Services";

const Favmark = ({ name, path }) => {
  const [active, setActive] = useState(false);
  const isFavCheck = () => {
    const check = (e) => String(e.name) === String(name);
    const favs = getFavs();
    return favs.some(check);
  };
  const isFav = isFavCheck();
  useEffect(() => {
    if (isFav) setActive(true);
    return () => setActive(false);
  }, [isFav]);

  const handleClick = () => {
    return active
      ? (delFavs(name, path), setActive(false))
      : (setFavs(name, path), setActive(true));
  };

  return (
    <div className="mx-3 d-flex">
      <button
        onClick={handleClick}
        className={
          "me-3 p-0 m-0 border-0 bg-transparent bi bi-star" +
          (active ? "-fill" : "") +
          " fs-1 text-warning"
        }
      ></button>
      <div className="dropdown dropend m-auto">
        <button
          className={
            "my-0 btn btn-outline-warning shadow-none dropdown-toggle " +
            (getFavs()[0] === undefined ? "disabled" : "")
          }
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Favorites
        </button>

        <ul
          className="dropdown-menu ms-2"
          aria-labelledby="dropdownMenuButton1"
        >
          {getFavs().map((e, i) => (
            <li key={i}>
              <Link className="dropdown-item" to={e.path}>
                {e.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Favmark;
