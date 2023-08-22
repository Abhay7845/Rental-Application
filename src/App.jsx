import React, { useState } from "react";
import Login from "./user/Login";
import Alert from "./components/common/Alert";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/common/Home";
import PrivateScreens from "./components/common/PrivateScreens";
import NewBooking from "./components/screens/NewBooking";
import RentalIssue from "./components/screens/RentalIssue";
import "./App.css";
import "react-calendar/dist/Calendar.css";
import Cancellation from "./components/screens/Cancellation";
import RentalRetrun from "./components/screens/RentaRetrun";
import NewCustomer from "./components/screens/NewCustomer";
import TestImage from "./components/common/TestImage";
import ProductsDetails from "./components/screens/ProductsDetails";
import AddedCartData from "./components/common/AddedCartData";

const App = () => {
  const [alert, setAlert] = useState(null);
  const showAlert = (massage, type) => {
    setAlert({
      msg: massage,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return (
    <BrowserRouter>
      <Alert alert={alert} />
      <Routes>
        <Route>
          <Route index element={<Login showAlert={showAlert} />} />
          <Route path="/login" element={<Login showAlert={showAlert} />} />
          <Route element={<PrivateScreens />}>
            <Route path="/home" element={<Home showAlert={showAlert} />} />
            <Route
              path="/new/customer"
              element={<NewCustomer showAlert={showAlert} />}
            />
            <Route
              path="/booking"
              element={<NewBooking showAlert={showAlert} />}
            />
            <Route
              path="/rental/issue"
              element={<RentalIssue showAlert={showAlert} />}
            />
            <Route
              path="/rental/return"
              element={<RentalRetrun showAlert={showAlert} />}
            />
            <Route
              path="/cancellation"
              element={<Cancellation showAlert={showAlert} />}
            />
            <Route
              path="/products/details"
              element={<ProductsDetails showAlert={showAlert} />}
            />
            <Route
              path="/products/added/cart"
              element={<AddedCartData showAlert={showAlert} />}
            />
            <Route
              path="/test/image"
              element={<TestImage showAlert={showAlert} />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
