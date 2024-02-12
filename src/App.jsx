import React from "react";
import Login from "./user/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/RSO/RsoHome";
import PrivateScreens from "./components/common/PrivateScreens";
import NewBooking from "./components/RSO/NewBooking";
import RentalIssue from "./components/RSO/RentalIssue";
import "./App.css";
import { ToastContainer } from 'react-toastify';
import Cancellation from "./components/RSO/Cancellation";
import RentalRetrun from "./components/RSO/RentalRetrun";
import NewCustomer from "./components/RSO/NewCustomer";
import ProductsDetails from "./components/RSO/ProductsDetails";
import SummaryReports from "./components/Admin/SummaryReports";
import BookingVerification from "./components/Admin/BookingVerification";
import UpdateMasterPrice from "./components/Admin/UpdateMasterPrice";
import CashierPaymentDetails from "./components/Cashier/CashierPaymentDetails";
import FactoryQARequired from "./components/RSO/FactoryQARequired";
import DiscountApproval from "./components/Admin/DiscountApproval";
import TestComponets from "./components/common/TestComponets";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route>
          <Route
            path="/UAT_RentalJewApp"
            element={<Login />}
          />
          <Route element={<PrivateScreens />}>
            <Route path="/home" element={<Home />} />
            <Route
              path="/new/customer"
              element={<NewCustomer />}
            />
            <Route
              path="/booking"
              element={<NewBooking />}
            />
            <Route
              path="/cancellation"
              element={<Cancellation />}
            />
            <Route
              path="/rental/issue"
              element={<RentalIssue />}
            />
            <Route
              path="/rental/return"
              element={<RentalRetrun />}
            />
            <Route
              path="/factory/qa/required"
              element={<FactoryQARequired />}
            />
            <Route
              path="/products/details"
              element={<ProductsDetails />}
            />
            <Route
              path="/test"
              element={<TestComponets />}
            />
            {/* ADMIN COMPONENTS */}
            <Route
              path="/admin/update/master/price"
              element={<UpdateMasterPrice />}
            />
            <Route
              path="/admin/summary/reports"
              element={<SummaryReports />}
            />
            <Route
              path="/admin/discount/validation"
              element={<DiscountApproval />}
            />
            <Route
              path="/admin/booking/verification"
              element={<BookingVerification />}
            />
            {/* CASHIER COMPONENTS */}
            <Route
              path="/cashier/payment"
              element={<CashierPaymentDetails />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
