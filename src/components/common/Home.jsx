import React, { useState } from "react";
import Navbar from "./Navbar";
import "../../Style/Home.css";
import axios from "axios";

const Home = () => {
  const [phoneRefrence, setPhoneRefrence] = useState("");
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);

  const GetDetails = () => {
    if (phoneRefrence) {
      setLoading(true);
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((res) => res)
        .then((response) => setProductData(response.data))
        .catch((error) => console.log("error=>", error));
      setLoading(false);
    } else {
      alert("Please Enter Phone or Refrence Number");
    }
  };

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
            onChange={(e) => setPhoneRefrence(e.target.value)}
          />
          <span className="searchButton" onClick={GetDetails}>
            {loading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              <span className="sr-only">Search</span>
            )}
          </span>
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
                  <th>Phone_Number</th>
                  <th>Customer_Name</th>
                  <th>Rental_Date</th>
                  <th>Package</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {productData.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td className="text-center border-dark">
                        <input
                          className="form-check-input"
                          type="radio"
                          value=""
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.phone}</td>
                      <td>{item.email}</td>
                      <td>{item.website}</td>
                      <td>{item.address.city}</td>
                      <td>{item.address.city}</td>
                      <td>{item.address.city}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-end mx-2 mt-2 mb-4">
            <button type="button" className="CancelButton">
              CANCEL
            </button>
            <button type="button" className="CButton mx-2">
              ISSUE
            </button>
            <button type="button" className="CButton">
              RETURN
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
