import React from "react";
import "../../Style/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";
import brandName from "../../Asset/Img/Tanishq_Logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <nav className="navbar sticky-top" style={{ backgroundColor: "#9861ce" }}>
      <div className="container-fluid">
        <div className="navbar-brand">
          <img src={brandName} alt="brandName" className="brandName" />
        </div>
        <ul className="navbar-nav me-auto d-flex flex-row">
          <li className="nav-item navbarLink">
            <Link className="nav-link navbarLink" to="/home">
              HOME
            </Link>
          </li>
          <li className="nav-item mx-3">
            <Link className="nav-link navbarLink" to="/">
              ABOUT
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link navbarLink" to="/">
              PRODUCT
            </Link>
          </li>
        </ul>
        <div className="d-flex">
          <BiLogIn className="lououtBtn" size={30} onClick={Logout} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
