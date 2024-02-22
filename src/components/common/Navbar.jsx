/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "../../Style/Navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";
import brandName from "../../Asset/Img/Tanishq_Logo.png";
import moment from "moment";
import { BsBook } from "react-icons/bs";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";


const Navbar = () => {
  let time = new Date().toLocaleTimeString();
  const UserName = localStorage.getItem("rsoRole");
  const storeCode = localStorage.getItem("storeCode");
  const [CTime, setCTime] = useState(time);
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const [passwordShown, setPasswordShown] = useState(false);


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
                className={`nav-link navbarLink  ${path === "/home" && "active"}`}
                to="/home"
              >
                Search Booking
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link
                className={`nav-link navbarLink  ${path === "/products/details" && "active"}`}
                to="/products/details"
              >
                Search Products
              </Link>
            </li>
          </ul>
        )}
        <div className="d-flex">
          {UserName.toUpperCase() === "RSO" && path === "/booking" ? "" : < BsBook className="navbarLink mx-4 mt-4" data-bs-toggle="modal" data-bs-target="#bookingPwdModal" style={{ cursor: "pointer" }} />}
          <span className="navbarLink timeShowStyle">
            {storeCode.toUpperCase()}
            <br />
            {currentDate.toUpperCase()},<span className="mx-2">{CTime}</span>
          </span>
          <span className="navbarLink mt-2">{UserName.toUpperCase()}</span>
          <BiLogIn className="lououtBtn mt-1 mx-2" onClick={Logout} />
        </div>
      </div>
      <div className="modal fade" id="bookingPwdModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <b>Password <span className="text-danger"> *</span></b>
              <div className="d-flex">
                <input
                  type={passwordShown ? "text" : "password"}
                  placeholder="Password"
                  className="GInput"
                  name="password"
                />
                <span className="border-bottom">
                  {passwordShown ? (
                    <FaRegEye
                      size={20}
                      cursor="pointer"
                      onClick={() => setPasswordShown(!passwordShown)}
                      style={{ marginTop: 15 }}
                    />
                  ) : (
                    <FaRegEyeSlash
                      size={20}
                      cursor="pointer"
                      onClick={() => setPasswordShown(!passwordShown)}
                      style={{ marginTop: 15 }}
                    />
                  )}
                </span>
              </div>
            </div>
            <div className="d-flex justify-content-end p-3">
              <button type="button" className="CancelButton mx-2" data-bs-dismiss="modal">Close</button>
              <button type="button" className="CButton">Next</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
