import React from "react";
import { Route } from "react-router-dom";
import Content from "./components/Content.js";
const useRoutes = (pages) =>
  pages.map((e, k) => {
    return (
      <React.Fragment key={k}>
        <Route path={e + "/items"} element={<Content />}>
          <Route path=":Id" element={<Content />} />
        </Route>
        <Route path={e + "/pages"} element={<Content />}>
          <Route path=":Id" element={<Content />} />
        </Route>
      </React.Fragment>
    );
  });
export default useRoutes;
