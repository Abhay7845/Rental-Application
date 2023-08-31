import React, { useEffect } from "react";
import "../../Style/Navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";
import brandName from "../../Asset/Img/Tanishq_Logo.png";
// import { BsCartFill } from "react-icons/bs";

const Navbar = () => {
  const UserName = localStorage.getItem("rsoRole");
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const Logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {}, [path]);

  return (
    <nav className="navbar" style={{ backgroundColor: "#008080" }}>
      <div className="container-fluid">
        <div className="navbar-brand">
          <img src={brandName} alt="brandName" className="brandName" />
        </div>
        {UserName.toUpperCase() === "RSO" && (
          <ul className="navbar-nav me-auto d-flex flex-row">
            <li className="nav-item navbarLink">
              <Link
                className={`nav-link navbarLink  ${
                  path === "/home" && "active"
                }`}
                to="/home"
              >
                Search Booking
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link
                className={`nav-link navbarLink  ${
                  path === "/products/details" && "active"
                }`}
                to="/products/details"
              >
                Search Products
              </Link>
            </li>
            <li>
              <Link
                className={`nav-link navbarLink  ${
                  path === "/new/customer" && "active"
                }`}
                to="/new/customer"
              >
                Customer
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link
                className={`nav-link navbarLink  ${
                  path === "/test/image" && "active"
                }`}
                to="/test/image"
              >
                Test
              </Link>
            </li>
          </ul>
        )}
        <div className="d-flex">
          <b className="navbarLink mx-2 mt-0">{UserName.toUpperCase()}</b>
          <BiLogIn className="lououtBtn" onClick={Logout} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
