import React, { useState } from "react";
import Navbar from "../common/Navbar";
import { DataList } from "../../Data/DataList";

const NewBooking = () => {
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
      <div className="container mt-4">
        <h6 className="bookingHeading">Booking Details</h6>
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
          <div className="col-md-12">
            <label className="form-label">Search By Phone or PAN</label>
            <input
              type="type"
              className="form-control"
              placeholder="Search By Phone or PAN"
            />
          </div>
          <h6 className="bookingHeading mx-2">Customer Details</h6>
          <div className="col-md-4">
            <label className="form-label">Customer Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Customer Name"
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
          <h6 className="bookingHeading mx-2">Customer Address</h6>
          <div className="col-md-4">
            <label className="form-label">State</label>
            <input type="text" className="form-control" placeholder="State" />
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
          <h6 className="bookingHeading mx-2">Required Documents</h6>
          <div className="col-md-6">
            <label className="form-label">Addeess ID Proof Type</label>
            <select className="form-control">
              <option>Select Type</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Customer Type</label>
            <select className="form-control">
              <option>Select Type</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Upload PAN</label>
            <input
              type="file"
              className="form-control"
              onChange={handleImageChange}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Address Proof ID No.</label>
            <input
              type="file"
              className="form-control"
              onChange={handleImageChange}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Customer Previous Trasaction</label>
            <input
              type="file"
              className="form-control"
              onChange={handleImageChange}
            />
          </div>
          <div className="col-md-4 d-flex justify-content-center">
            {image && (
              <img src={image} alt="Preview" height="100px" width="200px" />
            )}
          </div>
          <div className="col-md-4 d-flex justify-content-center">
            {image && (
              <img src={image} alt="Preview" height="100px" width="200px" />
            )}
          </div>
          <div className="col-md-4 d-flex justify-content-center">
            {image && (
              <img src={image} alt="Preview" height="100px" width="200px" />
            )}
          </div>
          <div className="col-md-4 d-flex justify-content-between">
            <label className="form-label">With in Catchment?</label>
            <div>
              <input
                className="form-check-input"
                type="radio"
                name="gridRadios"
                defaultChecked
              />
              <label className="form-check-label mx-2">YES</label>
            </div>
            <div>
              <input
                className="form-check-input"
                type="radio"
                name="gridRadios"
                defaultChecked
              />
              <label className="form-check-label mx-2">NO</label>
            </div>
          </div>
          {DataList.length > 0 && (
            <div className="col-12">
              <h6 className="bookingHeading">Item Details</h6>
              <div className="table-responsive">
                <table className="table table-bordered table-hover border-dark">
                  <thead className="table-dark border-light">
                    <tr>
                      <th>Item Code</th>
                      <th>Lot No.</th>
                      <th>Package_Days</th>
                      <th>Actual_Weight </th>
                      <th>Product_Value</th>
                      <th>Rental_Amount</th>
                      <th>Deposit_Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DataList.map((item, i) => {
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
                    <tr>
                      <th colSpan="4" className="text-end">
                        TOTAL
                      </th>
                      <th>234</th>
                      <th>124</th>
                      <th>678</th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div className="d-flex justify-content-end mb-4">
            <button type="button" className="CButton">
              NEXT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBooking;
