import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateScreens = () => {
  return (
    <div>
      {localStorage.getItem("rsoRole") ? <Outlet /> : <Navigate to="/login" />}
    </div>
  );
};

export default PrivateScreens;
