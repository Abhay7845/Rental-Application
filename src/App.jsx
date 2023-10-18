import React, { useState } from "react";
import Login from "./user/Login";
import Alert from "./components/common/Alert";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/RSO/RsoHome";
import PrivateScreens from "./components/common/PrivateScreens";
import NewBooking from "./components/RSO/NewBooking";
import RentalIssue from "./components/RSO/RentalIssue";
import "./App.css";
import "react-calendar/dist/Calendar.css";
import Cancellation from "./components/RSO/Cancellation";
import RentalRetrun from "./components/RSO/RentaRetrun";
import NewCustomer from "./components/RSO/NewCustomer";
import TestImage from "./components/common/TestImage";
import ProductsDetails from "./components/RSO/ProductsDetails";
import SummaryReports from "./components/Admin/SummaryReports";
import BookingVerification from "./components/Admin/BookingVerification";
import DiscountValidation from "./components/Admin/DiscountValidation";
import UpdateMasterPrice from "./components/Admin/UpdateMasterPrice";
import CashierPaymentDetails from "./components/Cashier/CashierPaymentDetails";

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
          <Route
            path="/UAT_RentalJewApp"
            element={<Login showAlert={showAlert} />}
          />
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
              path="/test/image"
              element={<TestImage showAlert={showAlert} />}
            />
            {/* ADMIN COMPONENTS */}
            <Route
              path="/admin/update/master/price"
              element={<UpdateMasterPrice showAlert={showAlert} />}
            />
            <Route
              path="/admin/summary/reports"
              element={<SummaryReports showAlert={showAlert} />}
            />
            <Route
              path="/admin/discount/validation"
              element={<DiscountValidation showAlert={showAlert} />}
            />
            <Route
              path="/admin/booking/verification"
              element={<BookingVerification showAlert={showAlert} />}
            />
            {/* CASHIER COMPONENTS */}
            <Route
              path="/cashier/payment"
              element={<CashierPaymentDetails showAlert={showAlert} />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
