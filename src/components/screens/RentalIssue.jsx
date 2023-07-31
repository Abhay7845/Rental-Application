import React, { useState, useEffect } from "react";
import Navbar from "../common/Navbar";
import axios from "axios";
import "../../Style/RentalIssue.css";

const RentalIssue = () => {
  const [tableDetails, setTableDetails] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => res)
      .then((response) => {
        setTableDetails(response.data);
      })
      .catch((error) => console.log("error=>", error));
  }, []);

  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
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
            <input
              type="file"
              className="form-control"
              onChange={handleImageChange}
            />
          </div>
          <div className="col-md-2">
            {image && (
              <img
                src={image}
                alt="Preview"
                className="fullScreenImage"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              />
            )}
            <div
              className="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-xl">
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body">
                    {image && (
                      <img
                        src={image}
                        alt="Preview"
                        className="fullScreenImage"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {tableDetails.length > 0 && (
          <div className="table-responsive my-3">
            <h4 className="text-center mb-3">Table Details</h4>
            <table className="table table-bordered table-hover border-dark">
              <thead className="table-dark border-light">
                <tr>
                  <th>Item Code</th>
                  <th>Lot No.</th>
                  <th>Package_Days</th>
                  <th>Product_Value</th>
                  <th>Rental_Amount</th>
                  <th>Deposit_Amount</th>
                  <th>Actual_Weight </th>
                </tr>
              </thead>
              <tbody>
                {tableDetails.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td className="text-center border-dark">
                        IKFDSVAKFVKNRESC
                      </td>
                      <td>{item.name}</td>
                      <td>{item.phone}</td>
                      <td>{item.email}</td>
                      <td>{item.website}</td>
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
