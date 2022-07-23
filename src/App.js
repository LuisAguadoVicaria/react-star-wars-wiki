import "./App.css";
import "./bootstrap.css";
import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import useRoutes from "./Routes";
import useLinksNav from "./components/subcomponents/LinksNav";
import NavBar from "./components/NavBar";
let pages = ["films", "people", "planets", "species", "starships", "vehicles"];

//window.localStorage.clear()
//window.localStorage.setItem('favs-sw','')

const App = () => {
  const page = useLocation();
  const AllRoutes = useRoutes(pages);
  const LinksNav = useLinksNav(pages, page);

  return (
    <div className="vh-100 vw-100 overflow-hidden d-flex bg-transparent position-relative">
      <div className="star"></div>
      <div className="star2"></div>
      <NavBar LinksNav={LinksNav} />

      <Routes>
        {AllRoutes}
        <Route path="*" element={<Navigate to="/planets/pages/1" />} />
      </Routes>
    </div>
  );
};

export default App;
