import React, { useState, useEffect } from "react";
import Navbar from "../common/Navbar";
import { DataList } from "../../Data/DataList";
import moment from "moment";

const Cancellation = () => {
  const [amount, setAmount] = useState();
  const [discountAmount, setDiscountAmount] = useState();
  const [numberDays, setNumberDays] = useState("");
  const getProduct = JSON.parse(localStorage.getItem("selecttedReturnProduct"));
  const GetReturnProduct = !getProduct ? "" : getProduct;
  console.log("GetReturnProduct==>", GetReturnProduct);

  useEffect(() => {
    const rentalDate = new Date(
      moment(GetReturnProduct.rentalDate).format("YYYY-MM-DD")
    );
    const currentDate = new Date(moment().format("2023-08-29"));
    if (rentalDate < currentDate) {
      const timeDifference = rentalDate - currentDate;
      const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
      setNumberDays(daysDifference);
    } else if (rentalDate > currentDate) {
      const timeDifference = rentalDate - currentDate;
      const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
      setNumberDays(daysDifference);
    }
  }, [GetReturnProduct.rentalDate]);

  let cancellationCharges = 0;
  if (numberDays <= 0) {
    cancellationCharges = amount; // 100% charge
  } else if (numberDays > 1 && numberDays <= 7) {
    cancellationCharges = 0.5 * amount; // 50% charge
  } else if (numberDays > 7 && numberDays <= 14) {
    cancellationCharges = 0.25 * amount; // 25% charge
  } else if (numberDays < 15) {
    cancellationCharges = amount; // 100% charge
  }
  console.log("amount==>", typeof parseInt(amount), parseInt(amount));
  console.log(
    "discountAmount==>",
    typeof parseInt(discountAmount),
    parseInt(discountAmount)
  );
  const netAmount =
    parseInt(amount) + parseInt(cancellationCharges) + parseInt(discountAmount);

  console.log("netAmount==>", netAmount);
  return (
    <div>
      <Navbar />
      <div className="mt-4 mx-2">
        <h6 className="bookingHeading">Booking Details</h6>
        <div className="row g-3">
          <div className="col-2">
            <label className="form-label">Booking Ref No</label>
            <h6>{GetReturnProduct.refId}</h6>
          </div>
          <div className="col-2">
            <label className="form-label">Booking Date</label>
            <h6>{moment(GetReturnProduct.bookingDate).format("YYYY-MM-DD")}</h6>
          </div>
          <div className="col-2">
            <label className="form-label">Rental Start Date</label>
            <h6>{moment(GetReturnProduct.rentalDate).format("YYYY-MM-DD")}</h6>
          </div>
          <div className="col-2">
            <label className="form-label">Rental Package</label>
            <h6>{GetReturnProduct.packageSelected} Days</h6>
          </div>
          <div className="col-2">
            <label className="form-label">Cancel Date</label>
            <h6>{moment().format("YYYY-MM-DD")}</h6>
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
                    <tr>
                      <th colSpan="4" className="text-end">
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
            <h6 className="bookingHeading mb-0">Cancellation Charges</h6>
          </div>

          <div className="col-md-3">
            <label className="form-label">Rental Amount</label>
            <input
              type="number"
              className="form-control"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Total cancellation Charges:</label>
            <input
              type="text"
              className="form-control"
              defaultValue={cancellationCharges}
              disabled
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Discount Amount</label>
            <input
              type="number"
              className="form-control"
              onChange={(e) => setDiscountAmount(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Net Amount</label>
            <input
              type="text"
              className="form-control"
              // defaultValue={netAmount}
              disabled
            />
          </div>
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

          {DataList.length > 0 && (
            <div className="col-12 mb-4">
              <h6 className="bookingHeading">Charges Overview</h6>
              <div className="table-responsive">
                <table className="table table-bordered table-hover border-dark">
                  <thead className="table-dark border-light">
                    <tr>
                      <th>Total_Booking_Paid</th>
                      <th>Total_Cancellation_Charge</th>
                      <th>Net Cancellation Charges</th>
                      <th>Total_Refund</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DataList.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td>1234</td>
                          <td>34634</td>
                          <td>12345</td>
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
        <div className="col-12 mb-3">
          <div className="d-flex justify-content-end">
            <button className="CButton">Raise Cancel Request</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cancellation;
