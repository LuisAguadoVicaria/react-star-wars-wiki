import React from "react";
import {
  Routes,
  Route,
  NavLink,
  useLocation,
  Navigate,
} from "react-router-dom";
import Item from "./components/Item.js";
const useRoutes = (pages) => pages.map((e, k) => {
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
export default useRoutes;
