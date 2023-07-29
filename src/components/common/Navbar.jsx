import React, { useEffect } from "react";
import "../../Style/Navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";
import brandName from "../../Asset/Img/Tanishq_Logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const Logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {}, [path]);

  return (
    <nav className="navbar sticky-top" style={{ backgroundColor: "#9861ce" }}>
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
            <Link className="nav-link navbarLink" to="/">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link navbarLink" to="/">
              Products
            </Link>
          </li>
        </ul>
        <div className="d-flex">
          <b className="navbarLink mx-2">Name</b>
          <BiLogIn className="lououtBtn" onClick={Logout} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
