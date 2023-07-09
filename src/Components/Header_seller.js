import "jquery/dist/jquery.slim.min.js";
import "popper.js/dist/umd/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import { Link } from "react-router-dom";
function Header_Seller() {
  return (
    <nav
      class="navbar navbar-expand-lg navbar-light bg-white w-100 navigation p-4 border-bottom"
      id="navbar"
    >
      <div class="container">
        <Link class="navbar-brand font-weight-bold">
          Cửa hàng sách
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#main-navbar"
          aria-controls="main-navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        {/* <div class="container-fluid">
          <form class="d-flex w-75">
            <input
                type="search"
                class="form-control rounded"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
            />
            <span class="input-group-text border-0 ml-4" id="search-addon">
              <i class="fas fa-search"></i>
            </span>
          </form>
        </div> */}
        <ul class="top-menu list-inline mb-0 d-lg-flex ml-14" id="top-menu">
            <li class="list-inline-item">
              <a href="#">
                <i class="tf-ion-ios-person mr-3"></i>
              </a>
            </li>
            <p className="mt-2" style={{ width : "83px"}}>cửa hàng</p>
        </ul>
      </div>
    </nav>
  );
}
export default Header_Seller;
