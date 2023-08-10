import React, { useState } from "react";
import Navbar from "../common/Navbar";
import { DataList, packageDayOption } from "../../Data/DataList";

const ProductsDetails = () => {
  const [rentalDate, setRentalDate] = useState("");
  const [packageDays, setPackageDays] = useState("");
  console.log("rentalDate==>", rentalDate);
  return (
    <div>
      <Navbar />
      <div className="row g-3 mx-0 mt-3">
        <div className="col-md-5">
          <label className="form-label">Rent Start Date</label>
          <input
            type="date"
            className="form-control"
            value={rentalDate}
            onChange={(e) => setRentalDate(e.target.value)}
          />
        </div>
        <div className="col-md-5">
          <label className="form-label">Package Days</label>
          <select
            className="form-control"
            value={packageDays}
            onChange={(e) => setPackageDays(e.target.value)}
          >
            <option>Select Days</option>
            {packageDayOption.map((days, i) => {
              return (
                <option key={i} value={days}>
                  {days}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-md-2">
          <label className="form-label">.</label>
          <div className="d-flex justify-content-end">
            <button className="CButton">Check Availability</button>
          </div>
        </div>
        <div>
          <div className="col-12 table-responsive">
            <table className="table table-bordered table-hover border-dark">
              <thead className="table-dark border-light">
                <tr>
                  <th>Item Code</th>
                  <th>Image</th>
                  <th>Std Wt</th>
                  <th>Std UCP</th>
                  <th>Std_Rental_Value</th>
                  <th>Std_Deposit_Value</th>
                </tr>
              </thead>
              <tbody>
                {DataList.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>IKFDSVAKFVKNRESC</td>
                      <td>{item.name}</td>
                      <td>{item.phone}</td>
                      <td>{item.email}</td>
                      <td>{item.website}</td>
                      <td>{item.address.city}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetails;
