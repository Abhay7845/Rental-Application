import React, { useState } from "react";
import Navbar from "../common/Navbar";
import axios from "axios";
import { HOST_URL } from "../../API/HostURL";
import Loader from "../common/Loader";

const CashierPaymentDetails = () => {
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({});
  const GetPyamentDetials = () => {
    setLoading(true);
    axios
      .get(`${HOST_URL}/get/payment/request/details/for/cashier/${searchValue}`)
      .then((res) => res)
      .then((response) => {
        console.log("response==>", response.data);
        if (response.data.code === "1000") {
          setPaymentDetails(response.data.value);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("error==>", error);
        setLoading(false);
      });
  };
  return (
    <div>
      <Navbar />
      {loading === true && <Loader />}
      <div className="row g-3 mt-3 mx-0">
        <div className="col-md-11">
          <input
            type="type"
            className="form-control"
            placeholder="Search By Refrence ID"
            maxLength={10}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="col-md-1 d-flex justify-content-end">
          <button
            type="button"
            className={`${searchValue.length < 10 ? "CDisabled" : "CButton"}`}
            disabled={searchValue.length < 10 ? true : false}
            onClick={GetPyamentDetials}
          >
            Search
          </button>
        </div>
        {paymentDetails.pdtId && (
          <div className="col-12 table-responsive mx-0">
            <table className="table table-bordered table-hover border-dark">
              <thead className="table-dark border-light">
                <tr>
                  <th>Prodcut_ID</th>
                  <th>Customer_Name</th>
                  <th>Phone_Number</th>
                  <th>Payment_Req_For</th>
                  <th>Product_Value</th>
                  <th>Rent_Value</th>
                  <th>Deposit_Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{paymentDetails.pdtId}</td>
                  <td>{paymentDetails.customerName}</td>
                  <td>{paymentDetails.mobileNo}</td>
                  <td>{paymentDetails.paymentRequestFor}</td>
                  <td>{paymentDetails.productValue}</td>
                  <td>{paymentDetails.rentValue}</td>
                  <td>{paymentDetails.depositValue}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CashierPaymentDetails;
