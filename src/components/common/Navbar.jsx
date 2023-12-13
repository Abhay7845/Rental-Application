/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "../../Style/Navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BiLogIn, BiSolidCart } from "react-icons/bi";
import brandName from "../../Asset/Img/Tanishq_Logo.png";
import moment from "moment";

const Navbar = () => {
  let time = new Date().toLocaleTimeString();
  const UserName = localStorage.getItem("rsoRole");
  const storeCode = localStorage.getItem("storeCode");
  const cartList = localStorage.getItem("addedCart")
  const [CTime, setCTime] = useState(time);
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const Logout = () => {
    localStorage.clear();
    navigate("/UAT_RentalJewApp");
  };

  useEffect(() => { }, [path]);
  const currentDate = moment().format("ll");

  const ShowTime = () => {
    time = moment().calendar().substring(9, 18);
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
                className={`nav-link navbarLink  ${path === "/home" && "active"
                  }`}
                to="/home"
              >
                Search Booking
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link
                className={`nav-link navbarLink  ${path === "/products/details" && "active"
                  }`}
                to="/products/details"
              >
                Search Products
              </Link>
            </li>
          </ul>
        )}
        <div className="d-flex">
          {UserName.toUpperCase() === "RSO" && <Link className="nav-link navbarLink" to="/your/wishlist">
            <BiSolidCart size={28} className="mt-3" />
            <span className="badge">{cartList ? cartList : 0}</span>
          </Link>}
          <span className="navbarLink mx-4 mt-0 text-center" style={{ fontSize: "14px" }}>
            {storeCode.toUpperCase()}
            <br />
            {currentDate.toUpperCase()},<span className="mx-2">{CTime}</span>
          </span>
          <span className="navbarLink mt-2">{UserName.toUpperCase()}</span>
          <BiLogIn className="lououtBtn mt-1 mx-2" onClick={Logout} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
