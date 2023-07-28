import React from "react";
import "../../Style/Navbar.css";
import { Link } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";
import brandName from "../../Asset/Img/Tanishq_Logo.png";

const Navbar = () => {
  return (
    <nav class="navbar sticky-top" style={{ backgroundColor: "#9861ce" }}>
      <div class="container-fluid">
        <div class="navbar-brand">
          <img src={brandName} alt="brandName" className="brandName" />
        </div>
        <ul class="navbar-nav me-auto d-flex flex-row">
          <li class="nav-item navbarLink">
            <Link class="nav-link navbarLink" to="/">
              Home
            </Link>
          </li>
          <li class="nav-item mx-3">
            <Link class="nav-link navbarLink" to="/">
              Home
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link navbarLink" to="/">
              Home
            </Link>
          </li>
        </ul>
        <div class="d-flex">
          <BiLogIn className="lououtBtn" size={30} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
