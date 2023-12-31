import React from "react";
import Navbar from "../common/Navbar";
import AdminSideBar from "../common/AdminSideBar";
import AdminToggelSideBar from "../common/AdminToggelSideBar";

const DiscountApproval = () => {
  return (
    <div>
      <Navbar />
      <AdminSideBar />
      <div className="DropdownForAdmin">
        <AdminToggelSideBar />
      </div>
      <div className="main">
        <h6>DiscountApproval</h6>
      </div>
    </div>
  );
};

export default DiscountApproval;
