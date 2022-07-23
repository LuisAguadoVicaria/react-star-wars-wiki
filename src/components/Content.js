import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { load } from "./Services";
import AllItems from "./AllItems";
import SingleItem from "./SingleItem";

const Content = () => {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  useEffect(() => {
    const is_pages = location.pathname.includes("pages");

    const routeandpage = location.pathname.split(
      is_pages ? "/pages/" : "/items"
    );

    is_pages
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
    <div className="d-flex m-auto spinner-grow text-warning" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  ) : (
    <main className="w-100 p-3 overflow-auto">
      {location.pathname.includes("pages") ? (
        <AllItems data={content} />
      ) : (
        <SingleItem data={content} />
      )}
    </main>
  );
};
export default Content;
