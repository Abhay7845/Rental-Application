/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "../../Style/Navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";
import brandName from "../../Asset/Img/Tanishq_Logo.png";
import moment from "moment";
// import { BsCartFill } from "react-icons/bs";

const Navbar = () => {
  let time = new Date().toLocaleTimeString();
  const UserName = localStorage.getItem("rsoRole");
  const storeCode = localStorage.getItem("storeCode");
  const [CTime, setCTime] = useState(time);
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const Logout = () => {
    localStorage.clear();
    navigate("/JewRentalApp");
  };

  useEffect(() => {}, [path]);
  const currentDate = new Date();

  const ShowTime = () => {
    time = new Date().toLocaleTimeString();
    setCTime(time);
  };
  setInterval(ShowTime, 1000);

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
          <b className="navbarLink mx-2 mt-0 text-center">
            {storeCode.toUpperCase()}
            <br />
            {moment(currentDate).format("DD/MM/YYYY")}
            <span className="mx-2">{CTime}</span>
          </b>
          <BiLogIn className="lououtBtn mt-2 mx-2" onClick={Logout} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
