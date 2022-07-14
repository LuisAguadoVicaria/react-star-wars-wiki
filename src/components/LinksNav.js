import {
  NavLink
} from "react-router-dom";
const useLinksNav = (pages, page) => pages.map((e, k) => (
  <NavLink
    to={e + "/pages/1"}
    key={k}
    className={
      page.pathname.includes(e)
        ? "nav-item nav-link active"
        : "nav-item nav-link"
    }
  >
    {e.toUpperCase()}
  </NavLink>
));
export default useLinksNav;
