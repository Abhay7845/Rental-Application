import React, { useState } from "react";
import Navbar from "../common/Navbar";
import "../../Style/Home.css";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";
import { phonePan } from "../../Data/DataList";
import { HOST_URL } from "../../API/HostURL";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [phoneRefrence, setPhoneRefrence] = useState("");
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selecttedProduct, setSelecttedProduct] = useState({});
  const storeCode = localStorage.getItem("storeCode");
  const navigate = useNavigate();
  console.log("selecttedProduct==>", selecttedProduct);

  const currentDate = moment(new Date()).format("YYYY-MM-DD");
  console.log("currentDate==>", currentDate);

  const paramType = !phoneRefrence
    ? ""
    : phoneRefrence[0].match(phonePan)
    ? "BookingRefNo"
    : "Mobile_No";

  const CheckBookingDetails = () => {
    Swal.fire({
      title: "No Booking Found For This Phone Number",
      text: `Click on "Cancel" to Search Agian or Click on "Book Now" to Procced For New Booking`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008080",
      cancelButtonColor: "#d33",
      confirmButtonText: "Book Now",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/products/details");
      }
    });
  };
  const ShowPending = () => {
    Swal.fire({
      title: "Payment Pending",
      text: "Please Reach out to Cashier To Complete The Payment",
      icon: "warning",
      confirmButtonColor: "#008080",
      confirmButtonText: "OK",
    });
  };

  const GetBookingDetails = () => {
    setLoading(true);
    axios
      .get(
        `${HOST_URL}/get/booking/details/${storeCode}/${paramType}/${phoneRefrence}`
      )
      .then((res) => res)
      .then((response) => {
        console.log("response==>", response.data);
        if (response.data.code === "1000") {
          setProductData(response.data.value);
          if (response.data.value.length === 0) {
            CheckBookingDetails();
          }
        }
        setLoading(false);
      })
      .then((error) => {
        console.log("error==>", error);
        setLoading(false);
      });
  };

  const OnSelectRow = (data) => {
    setSelecttedProduct(data);
  };

  const CancelProducts = () => {
    localStorage.setItem(
      "selecttedReturnProduct",
      JSON.stringify(selecttedProduct)
    );
    navigate("/cancellation");
  };

  const RentalIssueProducts = () => {
    localStorage.setItem(
      "selecttedReturnProduct",
      JSON.stringify(selecttedProduct)
    );
    navigate("/rental/issue");
  };

  const RentalRetunProducts = () => {
    localStorage.setItem(
      "selecttedReturnProduct",
      JSON.stringify(selecttedProduct)
    );
    navigate("/rental/return");
  };
  const Status = !selecttedProduct.status ? "" : selecttedProduct.status;
  const statusPending = Status.substring(0, 18);

  console.log("Status==>", Status);
  const rentalDate = moment(new Date(selecttedProduct.rentalDate)).format(
    "YYYY-MM-DD"
  );
  console.log("rentalDate==>", rentalDate);

  return (
    <div>
      <Navbar />
      <div className="HomeTextStyle">
        <h3 className="heading my-4">WELCOME</h3>
        <div className="searchField">
          <input
            type="text"
            className="searchStyle"
            placeholder="Search by Customer Phone Number or Refrence No."
            value={phoneRefrence.toUpperCase()}
            maxLength={14}
            onChange={(e) => setPhoneRefrence(e.target.value)}
          />
          <button
            className={`${
              phoneRefrence.length < 5 ? "DisableSearch" : "searchButton"
            }`}
            onClick={GetBookingDetails}
            disabled={phoneRefrence.length < 5 ? true : false}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm" />
            ) : (
              <span className="sr-only">Search</span>
            )}
          </button>
        </div>
      </div>
      {productData.length > 0 && (
        <div>
          <h4 className="text-center my-3">Booking Details</h4>
          <div className="table-responsive mx-2">
            <table className="table table-bordered table-hover border-dark">
              <thead className="table-dark border-light">
                <tr>
                  <th className="text-center">Select</th>
                  <th>Customer Name</th>
                  <th>Booking Ref No.</th>
                  <th>Phone No.</th>
                  <th>Package Days</th>
                  <th>Rental_Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {productData.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td className="text-center border-dark">
                        <input
                          className="form-check-input border-dark"
                          type="radio"
                          name="select"
                          onClick={() => OnSelectRow(item)}
                        />
                      </td>
                      <td>{item.customerName}</td>
                      <td>{item.refId}</td>
                      <td>{item.mobileNo}</td>
                      <td>{item.packageSelected}</td>
                      <td>{moment(item.rentalDate).format("YYYY-MM-DD")}</td>
                      <td>{item.status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {statusPending === "Payment_PendingFor" ? (
            <span>{ShowPending()}</span>
          ) : (
            <div className="d-flex justify-content-end mx-2 mt-2 mb-4">
              <button
                type="button"
                className={
                  Status === "Booked&ReadyForDespatch"
                    ? "CancelButton"
                    : "CnDisabled"
                }
                disabled={Status === "Booked&ReadyForDespatch" ? false : true}
                onClick={CancelProducts}
              >
                Cancel Booking
              </button>
              <button
                type="button"
                className={
                  currentDate >= rentalDate &&
                  Status === "Booked&ReadyForDespatch"
                    ? "CButton mx-2"
                    : "CDisabled mx-2"
                }
                disabled={
                  currentDate >= rentalDate &&
                  Status === "Booked&ReadyForDespatch"
                    ? false
                    : true
                }
                onClick={RentalIssueProducts}
              >
                Rental Issue
              </button>
              <button
                type="button"
                className={Status === "ProductIssued" ? "CButton" : "CDisabled"}
                disabled={Status === "ProductIssued" ? false : true}
                onClick={RentalRetunProducts}
              >
                Rental Return
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
