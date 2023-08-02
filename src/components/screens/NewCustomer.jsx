import React, { useState } from "react";
import Navbar from "../common/Navbar";

const NewCustomer = () => {
  const [panFile, setPanFile] = useState(null);
  const [addressProof, setAddressProof] = useState(null);

  const UploadPanFile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPanFile(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const UploadAddressProof = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setAddressProof(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="mt-4 mx-2">
        <h6 className="bookingHeading">New Customer Details</h6>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Customer Name</label>
            <input
              type="type"
              className="form-control"
              placeholder="Customer Name"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Address Line 1</label>
            <input
              type="type"
              className="form-control"
              placeholder="Address Line 1"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Address Line 2</label>
            <input
              type="type"
              className="form-control"
              placeholder="Address Line 2"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">State</label>
            <input type="type" className="form-control" placeholder="State" />
          </div>
          <div className="col-md-4">
            <label className="form-label">City</label>
            <input type="type" className="form-control" placeholder="City" />
          </div>
          <div className="col-md-4">
            <label className="form-label">Pin Code</label>
            <input
              type="type"
              className="form-control"
              placeholder="Pin Code"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Phone Number</label>
            <input
              type="type"
              className="form-control"
              placeholder="Phone Number"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email ID</label>
            <input
              type="type"
              className="form-control"
              placeholder="Email ID"
            />
          </div>
          <div className="col-12">
            <h6 className="bookingHeading mb-0">Customer Document Details</h6>
          </div>
          <div className="col-md-4">
            <label className="form-label">PAN Number</label>
            <input
              type="type"
              className="form-control"
              placeholder="PAN Number"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Upload PAN</label>
            <input
              type="file"
              className="form-control"
              onChange={UploadPanFile}
            />
          </div>
          <div className="col-md-4 text-center">
            {panFile && <img src={panFile} alt="panfile" height="100px" />}
          </div>
          <div className="col-md-4">
            <label className="form-label">Address Proof ID Type</label>
            <select className="form-control">
              <option>Select</option>
              <option>1</option>
              <option>2</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Upload Address Proof</label>
            <input
              type="file"
              className="form-control"
              onChange={UploadAddressProof}
            />
          </div>
          <div className="col-md-4 text-center">
            {addressProof && <img src={panFile} alt="panfile" height="100px" />}
          </div>
          <div className="col-md-12">
            <label className="form-label">RSO Name</label>
            <input
              type="type"
              className="form-control"
              placeholder="RSO Name"
            />
          </div>
          <div className="col-12 d-flex justify-content-end mb-4">
            <button className="CButton">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCustomer;
