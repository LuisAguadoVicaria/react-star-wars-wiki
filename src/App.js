import logo from "./logo.svg";
import "./App.css";
import React from "react";
import {
  Routes,
  Route,
  NavLink,
  useLocation,
  Navigate,
} from "react-router-dom";
import Item from "./components/Content.js";

let pages = ["planets", "people", "species", "starships", "vehicles", "films"];

//window.localStorage.clear()
//window.localStorage.setItem('favs-sw','')

const App = () => {
  const page = useLocation();
  const routes = pages.map((e, k) => {
    return (
      <React.Fragment key={k}>
        <Route path={e + "/items"} element={<Item />}>
          <Route path=":Id" element={<Item />} />
        </Route>
        <Route path={e + "/pages"} element={<Item />}>
          <Route path=":Id" element={<Item />} />
        </Route>
      </React.Fragment>
    );
  });

  const LinksNav = pages.map((e, k) => (
    <NavLink
      to={e + "/pages/1"}
      key={k}
      className={
        page.pathname.includes(e)
          ? "nav-item nav-link active"
          : "nav-item nav-link"
      }
    >
      {e.toUpperCase()}
    </NavLink>
  ));

  return (
    <>
      <div className="d-flex min-vh-100">
        <div className="d-flex menuwrap position-relative ">
          <div
            className="collapse collapse-horizontal show"
            id="collapseWidthExample"
          >
            <nav className="p-3 bg-body pe-5">
              <a
                href="/"
                className="mt-4 d-flex align-items-center text-decoration-none link-dark"
              >
                <img
                  src={logo}
                  className="bi pe-none"
                  width="40"
                  height="32"
                  alt="logo"
                />
                <span className="fs-3">Swapi.tech</span>
              </a>
              <ul className="nav nav-pills flex-column mt-4">{LinksNav}</ul>
            </nav>
          </div>
          <button
            className="shadow btn border-end border-start btn btn btn-light rounded-0 h-100 ms-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseWidthExample"
            aria-expanded="true"
            aria-controls="collapseWidthExample"
          >
            <i className="bi bi-list fs-2 position-fixed top-50"></i>
			<i className="bi bi-list fs-2 invisible"></i>
          </button>
        </div>
        <Routes>
          {routes}
          <Route path="*" element={<Navigate to="/planets/pages/1" />} />
        </Routes>
      </div>
    </>
  );
};

export default App;