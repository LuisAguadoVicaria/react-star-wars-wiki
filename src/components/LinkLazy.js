import React, { useState, useEffect } from "react";
import { load } from "./Services.js";
import { Link } from "react-router-dom";

const LinkLazy = ({ path }) => {
  const isBug = path === "/" || path === "";
  const [tag, settag] = useState("Loading... " + path.split("/")[3]);
  const routeandpage = path.split("/items").join("");
  

 useEffect(() => {
	 let loading = true
    load(routeandpage).then((r) => {
		
     if(loading)settag(JSON.parse(r));
	  });
	  
	  return () => loading = false
	  
  },[]);

  return isBug ? (
    ""
  ) : (
    <Link className="list-group-item list-group-item-action" to={path}>
      {typeof tag === "string" ? tag : { ...tag.result.properties }.name}
    </Link>
  );
};
export default LinkLazy;
