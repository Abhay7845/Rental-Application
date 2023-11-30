import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateScreens = () => {
  return (
    <div>
      {localStorage.getItem("rsoRole") ? (
        <Outlet />
      ) : (
        <Navigate to="/UAT_RentalJewApp" />
      )}
    </div>
  );
};

export default PrivateScreens;
