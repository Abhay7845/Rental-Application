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
  const [btn, setBtn] = useState(false);
  const [selecttedProduct, setSelecttedProduct] = useState({});
  const storeCode = localStorage.getItem("storeCode");
  const navigate = useNavigate();
  console.log("productData==>", productData);

  const paramType = !phoneRefrence
    ? ""
    : phoneRefrence[0].match(phonePan)
    ? "BookingRefNo"
    : "Mobile_No";

  const CheckBookingDetails = (phonePanValue) => {
    Swal.fire({
      title: "Booking Not Available",
      text: "Do You Want Book Products",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#008080",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/products/details");
      }
    });
  };

  const GetDetails = () => {
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
    setBtn(true);
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

  return (
    <div>
      <Navbar />
      <div className="HomeTextStyle">
        <h3 className="heading my-4">WELCOME</h3>
        <div className="searchField">
          <input
            type="text"
            className="searchStyle"
            placeholder="Search by Phone or Refrence No."
            value={phoneRefrence.toUpperCase()}
            maxLength={14}
            onChange={(e) => setPhoneRefrence(e.target.value)}
          />
          <button
            className={`${
              phoneRefrence.length < 5 ? "DisableSearch" : "searchButton"
            }`}
            onClick={GetDetails}
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
          <h4 className="text-center my-3">Table Details</h4>
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
          <div className="d-flex justify-content-end mx-2 mt-2 mb-4">
            <button
              type="button"
              className={`${btn ? "CancelButton" : "CnDisabled"}`}
              disabled={btn ? false : true}
              onClick={CancelProducts}
            >
              Cancel Booking
            </button>
            <button
              type="button"
              className={`${btn ? "CButton mx-2" : "CDisabled mx-2"}`}
              disabled={btn ? false : true}
              onClick={RentalIssueProducts}
            >
              Rental Issue
            </button>
            <button
              type="button"
              className={`${btn ? "CButton" : "CDisabled"}`}
              disabled={btn ? false : true}
              onClick={RentalRetunProducts}
            >
              Rental Return
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
