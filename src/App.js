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
import useRoutes from "./routes";
import useLinksNav from "./components/LinksNav";
import NavBar from "./components/NavBar";
let pages = ["planets", "people", "species", "starships", "vehicles", "films"];

//window.localStorage.clear()
//window.localStorage.setItem('favs-sw','')

const App = () => {
  const page = useLocation();
  const AllRoutes = useRoutes(pages);
  const LinksNav = useLinksNav(pages, page)


  return (
    <>
    <NavBar LinksNav={LinksNav} />

        <Routes>
          {AllRoutes}
          <Route path="*" element={<Navigate to="/planets/pages/1" />} />
        </Routes>

    </>
  );
};

export default App;
