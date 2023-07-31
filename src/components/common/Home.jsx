import React, { useState } from "react";
import Navbar from "./Navbar";
import "../../Style/Home.css";
import axios from "axios";

const Home = () => {
  const [phoneRefrence, setPhoneRefrence] = useState("");
  const [tableDetails, setTableDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const GetDetails = () => {
    setLoading(true);
    console.log("phoneRefrence==>", phoneRefrence);
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => res)
      .then((response) => {
        setTableDetails(response.data);
      })
      .catch((error) => console.log("error=>", error));
    setLoading(false);
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
      {tableDetails.length > 0 && (
        <div className="table-responsive mx-2 mt-5">
          <h4 className="text-center mb-3">Table Details</h4>
          <table className="table table-bordered table-hover border-dark">
            <thead className="table-dark border-light">
              <tr>
                <th>Select</th>
                <th>Booking Ref ID</th>
                <th>Booking Date</th>
                <th>Phone Number</th>
                <th>Customer Name</th>
                <th>Rental Date</th>
                <th>Package</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tableDetails.map((item, i) => {
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

          <div className="d-flex justify-content-end mb-5">
            <button type="button" className="CButton mx-2">
              RENTAL RETURN
            </button>
            <button type="button" className="CancelButton">
              CANCELATION
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
