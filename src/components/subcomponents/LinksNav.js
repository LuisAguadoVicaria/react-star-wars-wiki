import { NavLink } from "react-router-dom";
const useLinksNav = (pages, page) =>
  pages.map((e, k) => (
    <NavLink
      to={e + "/pages/1"}
      key={k}
      className={
        page.pathname.includes(e)
          ? "text-capitalize fs-5 list-group-item list-group-item-action active"
          : "text-capitalize fs-5 list-group-item list-group-item-action "
      }
    >
      {e}
    </NavLink>
  ));
export default useLinksNav;
