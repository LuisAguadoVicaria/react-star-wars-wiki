import { NavLink, useLocation, useParams } from "react-router-dom";

const Pagination = ({ data }) => {
  const location = useLocation();
  const page = useParams();

  let buffer = [];
  for (let i = 1; i <= data.total_pages; i++) {
    buffer.push(
      <li
        key={i}
        className={"page-item " + (parseInt(page.Id) === i ? "active" : "")}
      >
        <NavLink
          className="page-link"
          to={
            location.pathname
              .split("/")
              .filter((i) => isNaN(parseInt(i)))
              .join("/") +
            "/" +
            i
          }
        >
          {i}
        </NavLink>
      </li>
    );
  }

  return data.total_pages !== undefined ? (
    <nav className="d-flex w-100 justify-content-center" aria-label="...">
      <ul className="pagination pagination-md">
        <li className={`page-item ${data.previous === null ? "disabled" : ""}`}>
          <NavLink
            to={data.previous === null ? "" : "./" + (parseInt(page.Id) - 1)}
            className="page-link"
          >
            Previous
          </NavLink>
        </li>

        {buffer}

        <li className={`page-item ${data.next === null ? "disabled" : ""}`}>
          <NavLink
            to={data.next === null ? "" : "./" + (parseInt(page.Id) + 1)}
            className="page-link"
          >
            Next
          </NavLink>
        </li>
      </ul>
    </nav>
  ) : (
    ""
  );
};
export default Pagination;
