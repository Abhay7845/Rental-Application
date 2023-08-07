import React, { useState } from "react";
import Navbar from "./Navbar";
import "../../Style/Home.css";
import axios from "axios";
import { BsFillXCircleFill, BsFillCheckCircleFill } from "react-icons/bs";
import { phonePan } from "../../Data/DataList";
import { HOST_URL } from "../../API/HostURL";

const Home = () => {
  const [phoneRefrence, setPhoneRefrence] = useState("");
  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(false);
  const [btn, setBtn] = useState(false);
  const [selecttedProduct, setSelecttedProduct] = useState({});

  const paramType = !phoneRefrence
    ? ""
    : phoneRefrence[0].match(phonePan)
    ? "pancard"
    : "mobileNo";

  const GetDetails = () => {
    setLoading(true);
    axios
      .get(`${HOST_URL}/rental/customer/details/${paramType}/${phoneRefrence}`)
      .then((res) => res)
      .then((response) => {
        if ((response.data.code = "1000")) {
          setProductData(response.data.value);
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
        <h5 className="heading">
          Find The Perfect Freelance Service <br />
          For Your Business
        </h5>
        <div className="searchField">
          <input
            type="text"
            className="searchStyle"
            placeholder="Search by Phone or Refrence No."
            value={phoneRefrence.toUpperCase()}
            maxLength={10}
            onChange={(e) => setPhoneRefrence(e.target.value)}
          />
          <button
            className={`${
              phoneRefrence.length < 10 ? "DisableSearch" : "searchButton"
            }`}
            onClick={GetDetails}
            disabled={phoneRefrence.length < 10 ? true : false}
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
                  <th>Select</th>
                  <th>Booking_Ref_ID</th>
                  <th>Booking_Date</th>
                  <th>Customer_Name</th>
                  <th>Phone_Number</th>
                  <th>Rental_Date</th>
                  <th>Package_Days</th>
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
                      <td>{item.name}</td>
                      <td>{item.phone}</td>
                      <td>{item.email}</td>
                      <td>{item.website}</td>
                      <td>{item.address.city}</td>
                      <td>{item.address.city}</td>
                      <td className="text-center">
                        <BsFillXCircleFill color="red" className="mx-1" />
                        <BsFillCheckCircleFill color="green" className="mx-1" />
                      </td>
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
              Rental Rerutn
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
