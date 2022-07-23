import logo from "../logo.svg";
const NavBar = ({ LinksNav }) => (
  <>
    <div className="d-flex min-vh-100">
      <div
        className="collapse collapse-horizontal show"
        id="collapseWidthExample"
      >
        <div className="w-custom p-3 bg-transparent">
          <a href="/">
            <img src={logo} className="img-fluid bi p-0 m-0" alt="logo" />
          </a>
          <ul className="list-group mt-3">{LinksNav}</ul>
        </div>
      </div>
      <button
        className="shadow btn btn-sm btn-outline-warning rounded-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseWidthExample"
        aria-expanded="true"
        aria-controls="collapseWidthExample"
      >
        <i className="bi bi-list fs-2"></i>
      </button>
    </div>
  </>
);
export default NavBar;
