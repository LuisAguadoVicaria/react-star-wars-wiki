import React, { useState, useEffect } from "react";
import { load } from "./../Services";
import { Link } from "react-router-dom";

const LinkLazy = ({ path }) => {
  const [tag, settag] = useState("Loading... " + path.split("/")[3]);

  useEffect(() => {
    let loading = true;
    load(path.split("/items").join("")).then((r) => {
      if (loading) settag(JSON.parse(r));
    });

    return () => (loading = false);
  }, [path]);

  return path === undefined ? (
    ""
  ) : (
    <Link
      className="btn btn-outline-warning btn-sm shadow-none mx-1 mb-2"
      to={path}
    >
      {typeof tag === "string" ? tag : tag.result.properties.name}
    </Link>
  );
};
export default LinkLazy;
