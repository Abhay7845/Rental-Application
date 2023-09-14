import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateScreens = () => {
  return (
    <div>
      {localStorage.getItem("rsoRole") ? (
        <Outlet />
      ) : (
        <Navigate to="/JewRentalApp" />
      )}
    </div>
  );
};

export default PrivateScreens;
