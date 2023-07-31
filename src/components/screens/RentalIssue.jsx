import React, { useState } from "react";
import Navbar from "../common/Navbar";
import axios from "axios";

const RentalIssue = () => {
  const [tableDetails, setTableDetails] = useState([]);

  const GetDetails = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => res)
      .then((response) => {
        setTableDetails(response.data);
      })
      .catch((error) => console.log("error=>", error));
  };
  return (
    <div>
      <Navbar />
      <div className="container">
        <h4 className="text-center my-4">RENTAL ISSUE</h4>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Booking Ref No</label>
            <input
              type="type"
              className="form-control"
              placeholder="Booking Ref No"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Issue Date</label>
            <input type="date" className="form-control" />
          </div>
          <div className="col-md-4">
            <label className="form-label">Customer Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Customer Name"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Customer ID Type</label>
            <select className="form-control">
              <option>Select Type</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">2</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Customer ID No</label>
            <input
              type="text"
              className="form-control"
              placeholder="Customer ID No"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Upload ID</label>
            <input type="file" className="form-control" />
          </div>
          <div className="col-md-2">
            <img
              src="https://png.pngtree.com/png-vector/20220610/ourmid/pngtree-driver-license-id-icon-png-image_4957432.png"
              alt="id_image"
              height="100px"
              width="100%"
            />
          </div>
          <div className="col-md-12">
            <label className="form-label">Delivery Address</label>
            <textarea
              type="text"
              className="form-control"
              placeholder="Delivery Address"
            />
          </div>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-primary"
              onClick={GetDetails}
            >
              Next
            </button>
          </div>
        </div>
        {tableDetails.length > 0 && (
          <div className="table-responsive">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default RentalIssue;
