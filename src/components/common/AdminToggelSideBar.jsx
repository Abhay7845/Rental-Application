import React, { useState } from "react";
import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import logo from "../../Asset/Img/Tanishq_Logo.png";
import "../../Style/AdminToggleSideBar.css";
import { BsXLg } from "react-icons/bs";

const AdminToggelSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ToggleSidebar = () => {
    isOpen === true ? setIsOpen(false) : setIsOpen(true);
  };

  return (
    <div>
      <Icon.TextLeft
        onClick={ToggleSidebar}
        size={30}
        className="text-dark mt-1 mx-2"
        cursor="pointer"
      />
      <div
        className={`sidebar light-theme  ${isOpen === true ? "active" : ""}`}
        style={{ background: "#008080" }}
      >
        <div className="d-flex justify-content-between">
          <img src={logo} alt="logo" className="Logo my-3 mx-4" />
          <BsXLg
            onClick={ToggleSidebar}
            size={20}
            className="text-light mt-3 mx-2"
            cursor="pointer"
          />
        </div>
        <div className="sd-body">
          <ul className="mt-4">
            <Link to="/admin/update/master/price" className="NavigationStyle">
              UPDATE MASTER PRICE
            </Link>
            <hr style={{ color: "#ffff" }} />
            <Link to="/admin/summary/reports" className="NavigationStyle">
              SUMMARY REPORTS
            </Link>
            <hr style={{ color: "#ffff" }} />
            <Link to="/admin/discount/validation" className="NavigationStyle">
              DISCOUNT VALIDATION
            </Link>
            <hr style={{ color: "#ffff" }} />
            <Link to="/admin/booking/verification" className="NavigationStyle">
              VERIFICATION
            </Link>
            <hr style={{ color: "#ffff" }} />
          </ul>
        </div>
      </div>
      {/* <div
        className={`sidebar-overlay ${isOpen === true ? "active" : ""}`}
        onClick={ToggleSidebar}
      /> */}
    </div>
  );
};

export default AdminToggelSideBar;
