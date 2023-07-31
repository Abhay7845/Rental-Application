import React, { useState } from "react";
import Navbar from "../common/Navbar";
import "../../Style/RentalIssue.css";
import { DataList } from "../../Data/DataList";

const RentalIssue = () => {
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
        {DataList.length > 0 && (
          <div>
            <div className="table-responsive">
              <h4 className="text-center my-3">Table Details</h4>
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
                </tbody>
              </table>
            </div>
            <ul className="d-flex flex-row justify-content-end">
              <li>Total Product Value = 455,</li>
              <li className="mx-5">Total Rental Amount =123,</li>
              <li>Total Deposit Amount =987</li>
            </ul>
          </div>
        )}
        {DataList.length > 0 && (
          <div>
            <div className="table-responsive">
              <table className="table table-bordered table-hover border-dark">
                <thead className="table-dark border-light">
                  <tr>
                    <th>Type</th>
                    <th>Ref No.</th>
                    <th>Amount</th>
                    <th>Upload</th>
                    <th>View</th>
                  </tr>
                </thead>
                <tbody>
                  {DataList.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td>
                          <select className="w-100">
                            <option>Slect Type</option>
                            <option>Creadit Note</option>
                            <option>Creadit Card</option>
                          </select>
                        </td>
                        <td>
                          <input
                            type="text"
                            className="w-100"
                            placeholder="Ref Number"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="w-100"
                            placeholder="Amount"
                          />
                        </td>
                        <td className="d-flex justify-content-center">
                          <input
                            type="file"
                            onChange={handleImageChange}
                            style={{ cursor: "pointer" }}
                          />
                        </td>
                        <td>
                          {image && (
                            <img
                              src={image}
                              alt="Preview"
                              height="80px"
                              width="100%"
                            />
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RentalIssue;
