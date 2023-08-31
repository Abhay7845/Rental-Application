import React from "react";
import "../../Style/AdminSidebar.css";
import { Link } from "react-router-dom";

const AdminSideBar = () => {
  return (
    <div>
      <div className="AdminSidebarStyle">
        <ul className="mt-4">
          <Link to="/admin/update/master/price" className="NavigationStyle">
            UPDATE ITEM PRICE MASTER
          </Link>
          <hr style={{ color: "#ffff" }} />
          <Link to="/admin/discount/validation" className="NavigationStyle">
            DISCOUNT APPROVEL
          </Link>
          <hr style={{ color: "#ffff" }} />
          <Link to="/admin/booking/verification" className="NavigationStyle">
            VERIFICATION
          </Link>
          <hr style={{ color: "#ffff" }} />
          <Link to="/admin/summary/reports" className="NavigationStyle">
            REPORTS
          </Link>
          <hr style={{ color: "#ffff" }} />
        </ul>
      </div>
    </div>
  );
};

export default AdminSideBar;
