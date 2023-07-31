import React from "react";
import Navbar from "../common/Navbar";

const NewBooking = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <h6 className="TableHeading">Booking Details</h6>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Reference ID</label>
            <input
              type="type"
              className="form-control"
              placeholder="Reference ID"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Store Code</label>
            <input
              type="text"
              className="form-control"
              placeholder="Store Code"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Booking Date</label>
            <input type="date" className="form-control" />
          </div>
        </div>
        <h6 className="TableHeading">Customer Details</h6>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Fisr Name</label>
            <input
              type="type"
              className="form-control"
              placeholder="Reference ID"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Store Code"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Phone Number</label>
            <input
              type="number"
              className="form-control"
              placeholder="Phone Number"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" placeholder="Email" />
          </div>
          <div className="col-md-4">
            <label className="form-label">City</label>
            <input type="text" className="form-control" placeholder="City" />
          </div>
          <div className="col-md-4">
            <label className="form-label">Pin Code</label>
            <input
              type="number"
              className="form-control"
              placeholder="Pin Code"
            />
          </div>
          <h6 className="TableHeading mx-2">Customer Address</h6>
          <div className="col-md-6">
            <label className="form-label">Address Line-1</label>
            <textarea
              type="text"
              className="form-control"
              placeholder="Address Line-1"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Address Line-2</label>
            <textarea
              type="text"
              className="form-control"
              placeholder="Address Line-2"
            />
          </div>
        </div>
        <div className="p-2" style={{ backgroundColor: "#fac0e1" }}>
          <h5 className="customer-heading col-md-12">Required Documents:</h5>
        </div>
        <div className="card-body">
          <div>
            <b>Upload Pancard</b>
            <input type="file" />
            <button type="submit">Upload</button>
          </div>
        </div>
        <div className="p-2" style={{ backgroundColor: "#fac0e1" }}>
          <h5 className="customer-heading col-md-12">Product Details:</h5>
        </div>
        <div
          className="card-body table-resposive"
          style={{ maxHeight: "400px", overflowY: "auto" }}
        >
          <table className="table table-hover border table-bordered">
            <thead className="table-light">
              <tr>
                <th>Item Code</th>
                <th>Lot Number</th>
                <th>Rent Start Date</th>
                <th>Package Days</th>
                <th>Product Value</th>
                <th>Rental Amount</th>
                <th>Deposit Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NewBooking;
