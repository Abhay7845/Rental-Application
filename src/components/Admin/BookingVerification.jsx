import React from "react";
import Navbar from "../common/Navbar";
import AdminSideBar from "../common/AdminSideBar";
import AdminToggelSideBar from "../common/AdminToggelSideBar";

const BookingVerification = () => {
  return (
    <div>
      <Navbar />
      <div className="DropdownForAdmin">
        <AdminToggelSideBar />
      </div>
      <AdminSideBar />
      <div className="main">
        <h6>BookingVerification</h6>
      </div>
    </div>
  );
};

export default BookingVerification;
