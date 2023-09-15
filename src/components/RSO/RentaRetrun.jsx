import React, { useState, useEffect } from "react";
import Navbar from "../common/Navbar";
import "../../Style/RentalIssue.css";
import moment from "moment";
import BookingPdf from "../Pdf/BookingPdf";
import axios from "axios";
import Loader from "../common/Loader";
import { renatlReturnPage, addressTypeOption } from "../../Data/DataList";
import { HOST_URL } from "../../API/HostURL";

const RentalReturn = () => {
  const [loading, setLoading] = useState(false);
  const storeCode = localStorage.getItem("storeCode");
  const [sameCustomer, setSameCustomer] = useState(true);
  const [retunTableData, setRetunTableData] = useState([]);

  const getProduct = JSON.parse(localStorage.getItem("selecttedReturnProduct"));
  const GetReturnProduct = !getProduct ? "" : getProduct;

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${HOST_URL}/fetch/table/common/data/${storeCode}/${GetReturnProduct.refId}`
      )
      .then((res) => res)
      .then((response) => {
        console.log("response==>", response.data);
        if (response.data.code === "1000") {
          setRetunTableData(response.data.value);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("error==>", error);
        setLoading(false);
      });
  }, [storeCode, GetReturnProduct.refId]);

  const getReturnDate = () => {
    const nextDate = new Date(GetReturnProduct.rentalDate);
    nextDate.setDate(
      nextDate.getDate() + parseInt(GetReturnProduct.packageSelected - 1)
    );
    return nextDate;
  };

  // TOTAL COST OF  CALCULATION
  const TProductValue = retunTableData.map((item) =>
    parseFloat(item.productValue)
  );
  const SumOfTProductValue = () => {
    let total = 0;
    for (let data of TProductValue) total = total + data;
    return total;
  };

  const TRentalRateRate = retunTableData.map((item) =>
    parseFloat(item.rentalAmount)
  );
  const SumOfTRentalRate = () => {
    let total = 0;
    for (let data of TRentalRateRate) total = total + data;
    return total;
  };
  return (
    <div>
      {loading === true && <Loader />}
      <Navbar />
      <div className="mt-4 mx-2">
        <h6 className="bookingHeading">Booking Details</h6>
        <div className="row g-3 mb-4">
          <div className="col-3">
            <label className="form-label">Booking Ref No</label>
            <h6>{GetReturnProduct.refId}</h6>
          </div>
          <div className="col-2">
            <label className="form-label">Renatl Start Date</label>
            <h6>{moment(GetReturnProduct.rentalDate).format("DD-MM-YYYY")}</h6>
          </div>
          <div className="col-3">
            <label className="form-label">Rental End Date</label>
            <h6>{moment(getReturnDate()).format("DD-MM-YYYY")}</h6>
          </div>
          <div className="col-2">
            <label className="form-label">Customer Name</label>
            <h6>{GetReturnProduct.customerName}</h6>
          </div>
          <div className="col-2">
            <label className="form-label">Phone Number</label>
            <h6>{GetReturnProduct.mobileNo}</h6>
          </div>
          <div className="col-md-12">
            <b>Same Customer Pickup</b>
            <input
              className="form-check-input mx-3 border-dark"
              type="checkbox"
              checked={sameCustomer}
              onChange={() => setSameCustomer(!sameCustomer)}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Customer Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Customer Name"
              disabled={sameCustomer ? true : false}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Customer ID Type</label>
            <select
              className="form-control"
              disabled={sameCustomer ? true : false}
            >
              {addressTypeOption.map((item, i) => {
                return (
                  <option key={i} value={item.value}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Customer ID No.</label>
            <input
              type="text"
              className="form-control"
              placeholder="Customer ID No."
              disabled={sameCustomer ? true : false}
            />
          </div>
          <div className="col-md-4 d-flex">
            <div>
              <label className="form-label">Upload ID</label>
              <input
                type="file"
                className="form-control"
                disabled={sameCustomer ? true : false}
              />
            </div>
            <div>
              <label className="form-label">.</label>
              <button className="CButton mx-2">Upload</button>
            </div>
          </div>

          {retunTableData.length > 0 && (
            <div className="col-12">
              <h6 className="bookingHeading">Item Details</h6>
              <div className="table-responsive">
                <table className="table table-bordered table-hover border-dark text-center">
                  <thead className="table-dark border-light">
                    <tr>
                      {renatlReturnPage.map((heading, i) => {
                        return <td key={i}>{heading}</td>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {retunTableData.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td>{item.itemCode}</td>
                          <td>{item.lotNo}</td>
                          <td>{item.grossWt}</td>
                          <td>DATA</td>
                          <td>
                            <input
                              type="number"
                              placeholder="Actual_Wt at Return"
                            />
                          </td>
                          <td>
                            {parseFloat(item.productValue).toLocaleString(
                              "en-IN"
                            )}
                          </td>
                          <td>
                            {parseFloat(item.rentalAmount).toLocaleString(
                              "en-IN"
                            )}
                          </td>
                          <td>NA</td>
                          <td>
                            <input
                              type="number"
                              className="w-100"
                              placeholder="Damage Charges"
                            />
                          </td>
                          <td>
                            <select className="w-100">
                              <option>NO</option>
                              <option>Yes</option>
                            </select>
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <th colSpan="5" className="text-end">
                        TOTAL
                      </th>
                      <th>{SumOfTProductValue().toLocaleString("en-IN")}</th>
                      <th>{SumOfTRentalRate().toLocaleString("en-IN")}</th>
                      <th>124</th>
                      <th>124</th>
                      <th colSpan="1" />
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div className="col-12 mb-0">
            <h6 className="bookingHeading d-flex justify-content-between">
              <span className="mt-1">Print Karigar QA Report</span>
              <BookingPdf />
            </h6>
          </div>
          <div className="col-12 d-flex">
            <label>Upload Signed Karigar QA Report</label>
            <input type="file" className="form-control" />
            <div>
              <b>Factory QA Required ?</b>
              <input type="checkbox" className="mx-2" />
            </div>
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="RSO Name"
              // onChange={(e) => setRSOName(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-end mb-4">
            <button type="button" className="CButton">
              Print Acknowledgement & Close || Raise Closure Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalReturn;
