import React, { useEffect } from "react";
import "../../Style/Navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";
import brandName from "../../Asset/Img/Tanishq_Logo.png";

const Navbar = () => {
  const UserName = localStorage.getItem("storCode");
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const Logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {}, [path]);

  return (
    <nav className="navbar sticky-top" style={{ backgroundColor: "#008080" }}>
      <div className="container-fluid">
        <div className="navbar-brand">
          <img src={brandName} alt="brandName" className="brandName" />
        </div>
        <ul className="navbar-nav me-auto d-flex flex-row">
          <li className="nav-item navbarLink">
            <Link
              className={`nav-link navbarLink  ${
                path === "/home" ? "active" : ""
              }`}
              to="/home"
            >
              Home
            </Link>
          </li>
          <li className="nav-item mx-2">
            <Link
              className={`nav-link navbarLink  ${
                path === "/booking" ? "active" : ""
              }`}
              to="/booking"
            >
              New Booking
            </Link>
          </li>
          <Link
            className={`nav-link navbarLink  ${
              path === "/new/customer" ? "active" : ""
            }`}
            to="/new/customer"
          >
            New Customer
          </Link>
          <li className="nav-item mx-2">
            <Link
              className={`nav-link navbarLink  ${
                path === "/rental/issue" ? "active" : ""
              }`}
              to="/rental/issue"
            >
              Rental Issue
            </Link>
          </li>
          <li className="nav-item mx-2">
            <Link
              className={`nav-link navbarLink  ${
                path === "/rental/return" ? "active" : ""
              }`}
              to="/rental/return"
            >
              Rental Return
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link navbarLink  ${
                path === "/cancellation" ? "active" : ""
              }`}
              to="/cancellation"
            >
              Cancellation
            </Link>
          </li>
          <li className="nav-item mx-2">
            <Link
              className={`nav-link navbarLink  ${
                path === "/products/details" ? "active" : ""
              }`}
              to="/products/details"
            >
              Products
            </Link>
          </li>
          <li className="nav-item mx-2">
            <Link
              className={`nav-link navbarLink  ${
                path === "/test/image" ? "active" : ""
              }`}
              to="/test/image"
            >
              Test Image
            </Link>
          </li>
        </ul>
        <div className="d-flex">
          <b className="navbarLink mx-2 mt-0">{UserName.toUpperCase()}</b>
          <BiLogIn className="lououtBtn" onClick={Logout} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
