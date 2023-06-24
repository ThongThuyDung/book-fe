import React from "react";
import "jquery/dist/jquery.slim.min.js";
import "popper.js/dist/umd/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import { Link , Route} from "react-router-dom";

function Sidebar() {
  return (
    <div class=" navbar-collapse " id="main-navbar">
      <ul class="navbar-nav mx-auto">
        <li class="nav-item active">
          <Link class="nav-link" to={{ pathname: "/" }}>
            Home
          </Link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            About Us
          </a>
        </li>

        <li class="nav-item dropdown dropdown-slide">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown4"
            role="button"
            data-delay="350"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Pages.
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown4">
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">Blog Single</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <a href="#">404 Page</a>
            </li>
            <li>
              <a href="#">FAQ</a>
            </li>
          </ul>
        </li>
        <li class="nav-item dropdown dropdown-slide">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown3"
            role="button"
            data-delay="350"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Shop.
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown3">
            <li>
              <Link to={{ pathname: "/shop" }}>Shop</Link>
            </li>
            <li>
              <Link to={{ pathname: "/single-product" }}>Product Details</Link>
            </li>
            <li>
              <Link to={{ pathname: "/checkout" }}>Checkout</Link>
            </li>
            <li>
              <Link to={{ pathname: "/cart" }}>Cart</Link>
            </li>
          </ul>
        </li>

        <li class="nav-item dropdown dropdown-slide">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown5"
            role="button"
            data-delay="350"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Account.
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown5">
            <li>
              <Link to={{ pathname: "/login" }}>Login Page</Link>
            </li>
            <li>
              <Link to={{ pathname: "/signup" }}>SignUp Page</Link>
            </li>
            <li>
              <Link to={{ pathname: "/forgot-password" }}>Forgot Password</Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
