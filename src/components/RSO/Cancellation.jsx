import React from "react";
import Navbar from "../common/Navbar";
import { DataList } from "../../Data/DataList";
import moment from "moment";

const Cancellation = () => {
  // STARTED BY 06-09-2023
  const getProduct = JSON.parse(localStorage.getItem("selecttedReturnProduct"));
  const GetReturnProduct = !getProduct ? "" : getProduct;
  return (
    <div>
      <Navbar />
      <div className="mt-4 mx-2">
        <h6 className="bookingHeading">Booking Details</h6>
        <div className="row g-3">
          <div className="col-3">
            <label className="form-label">Booking Ref No</label>
            <h6>{GetReturnProduct.refId}</h6>
          </div>
          <div className="col-3">
            <label className="form-label">Return Date</label>
            <h6>{moment(GetReturnProduct.rentalDate).format("YYYY-MM-DD")}</h6>
          </div>
          <div className="col-3">
            <label className="form-label">Customer Name</label>
            <h6>{GetReturnProduct.customerName}</h6>
          </div>
          <div className="col-3">
            <label className="form-label">Phone Number</label>
            <h6>{GetReturnProduct.mobileNo}</h6>
          </div>
          <div className="col-md-6">
            <label className="form-label">Reason For Cancellation</label>
            <select className="form-control">
              <option>Select Type</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">2</option>
            </select>
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
                      <th>Rent_Start_Date</th>
                      <th>Package_Days</th>
                      <th>Product_Value</th>
                      <th>Rental_Amount</th>
                      <th>Deposit_Amount</th>
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
                          <td>{item.address.city}</td>
                        </tr>
                      );
                    })}
                    <tr>
                      <th colSpan="5" className="text-end">
                        TOTAL
                      </th>
                      <th>124</th>
                      <th>678</th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div className="col-12">
            <h6 className="bookingHeading mb-0">Amount Paid Reference</h6>
          </div>
          <div className="col-md-4">
            <label className="form-label">Booking Type</label>
            <select className="form-control">
              <option>Select Type</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">2</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Refrence Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="Refrence Number"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Amount</label>
            <input
              type="text"
              className="form-control"
              placeholder="Amount"
              value={123}
              disabled
            />
          </div>
          <div className="col-12">
            <h6 className="bookingHeading mb-0">Deposit</h6>
          </div>
          <div className="col-md-4">
            <label className="form-label">Deposit Type</label>
            <select className="form-control">
              <option>Select Type</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">2</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Refrence Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="Refrence Number"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Amount</label>
            <input
              type="text"
              className="form-control"
              placeholder="Amount"
              value={234}
              disabled
            />
          </div>
          {DataList.length > 0 && (
            <div className="col-12 mb-4">
              <h6 className="bookingHeading">Total Overview</h6>
              <div className="table-responsive">
                <table className="table table-bordered table-hover border-dark">
                  <thead className="table-dark border-light">
                    <tr>
                      <th>Total_Booking_Paid</th>
                      <th>Total_Deposit_Paid</th>
                      <th>Total_Cancellation_Charge</th>
                      <th>Discount</th>
                      <th>Total_Net_Refund</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DataList.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td>1234</td>
                          <td>34634</td>
                          <td>12345</td>
                          <td>123</td>
                          <td>12543</td>
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
    </div>
  );
};

export default Cancellation;
