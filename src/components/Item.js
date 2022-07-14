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
import SingleItem from "./SingleItem.js";
import Records from "./Records.js";
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
export default Item;
