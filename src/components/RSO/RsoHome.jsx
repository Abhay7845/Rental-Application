import React, { useState } from "react";
import Navbar from "../common/Navbar";
import "../../Style/Home.css";
import axios from "axios";
import { phonePan } from "../../Data/DataList";
import { HOST_URL } from "../../API/HostURL";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Home = () => {
  const [phoneRefrence, setPhoneRefrence] = useState("");
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [btn, setBtn] = useState(false);
  const [selecttedProduct, setSelecttedProduct] = useState({});
  const storeCode = localStorage.getItem("storeCode");
  const navigate = useNavigate();

  const paramType = !phoneRefrence
    ? ""
    : phoneRefrence[0].match(phonePan)
    ? "BookingRefNo"
    : "Mobile_No";

  const CheckBookingDetails = (phonePanValue) => {
    const result = window.confirm(
      "Booking Not Available, Please Book Products"
    );
    if (result) {
      navigate("/products/details");
    }
  };

  const GetDetails = () => {
    setLoading(true);
    axios
      .get(
        `${HOST_URL}/get/booking/details/${storeCode}/${paramType}/${phoneRefrence}`
      )
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setProductData(response.data.value);
        } else if (response.data.code === "1001") {
          CheckBookingDetails();
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
  const RetunProducts = () => {
    console.log("selecttedProduct", selecttedProduct);
  };
  console.log("productData==>", productData);

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
            >
              Cancel
            </button>
            <button
              type="button"
              className={`${btn ? "CButton mx-2" : "CDisabled mx-2"}`}
              disabled={btn ? false : true}
            >
              Rental Issue
            </button>
            <button
              type="button"
              className={`${btn ? "CButton" : "CDisabled"}`}
              disabled={btn ? false : true}
              onClick={RetunProducts}
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
