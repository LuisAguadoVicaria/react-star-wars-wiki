import { Link, useLocation } from "react-router-dom";
import { urltoitem, formatOut, objectType, arrayType } from "./Services";
import Search from "./subcomponents/Search.js";
import Pagination from "./subcomponents/Pagination";

const AllItems = ({ data }) => {
  const formated = arrayType(objectType(formatOut(data)));
  const location = useLocation();

  const path = location.pathname.split("/")[1].toLowerCase();
  const imageLocation = path === "people" ? "characters" : path;

  const cards = [...formated].map((e, i) => (
    <div className="col" key={i}>
      <Link
        to={
          e.url === undefined ? urltoitem(e.properties.url) : urltoitem(e.url)
        }
        className="h-100 text-decoration-none card text-white bg-secondary"
      >
        <div className="card-header">
          <h4 className="card-title m-0 p-0">
            <span className="badge bg-warning rounded-pill me-1">
              {e.uid === undefined ? i + 1 : e.uid}
            </span>{" "}
            {e.name === undefined ? e.properties.title : e.name}{" "}
          </h4>{" "}
        </div>
        <div className="card-body">
          <img
            className="img-fluid rounded mx-auto d-block"
            src={`https://starwars-visualguide.com/assets/img/${imageLocation}/${e.uid}.jpg`}
            type="image/png"
            alt={`${'\u00A0'}${e.name}.jpg`}
          />
        </div>
      </Link>
    </div>
  ));

  return (
    <>
      {" "}
      <Search />
      <article className="row row-cols-1 row-cols-md-2 g-3">
        {cards}
        <Pagination data={data} />
      </article>
    </>
  );
};

export default AllItems;
