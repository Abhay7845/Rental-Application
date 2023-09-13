import React, { useState, useEffect } from "react";
import Navbar from "../common/Navbar";
import "../../Style/RentalIssue.css";
import { BsFillEyeFill } from "react-icons/bs";
import moment from "moment";
import BookingPdf from "../Pdf/BookingPdf";
import axios from "axios";
import Loader from "../common/Loader";
import { ReturnPage, addressTypeOption } from "../../Data/DataList";
import { HOST_URL } from "../../API/HostURL";

const RentalReturn = () => {
  const [loading, setLoading] = useState(false);
  const storeCode = localStorage.getItem("storeCode");
  const [sameCustomer, setSameCustomer] = useState(true);

  const [retunTableData, setRetunTableData] = useState([]);
  // DELIVERY INSPECTION PRODUCTS INPUT VALUES
  const [deliveryProductFile, setDeliveryProductImg] = useState(null);

  const UploadDeliveryProductImg = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setDeliveryProductImg(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // STARTED BY 06-09-2023
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
          <div className="col-3">
            <label className="form-label">Return Date</label>
            <h6>{moment(GetReturnProduct.rentalDate).format("YYYY-MM-DD")}</h6>
          </div>
          <div className="col-3">
            <label className="form-label">Issue Date</label>
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
          <div className="col-md-3">
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
          <div className="col-md-3">
            <div className="d-flex justify-content-between">
              <label className="form-label">Upload ID</label>
              <span className="mx-2">
                {deliveryProductFile && (
                  <BsFillEyeFill
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    style={{ cursor: "pointer" }}
                  />
                )}
              </span>
            </div>
            <input
              type="file"
              className="form-control"
              onChange={UploadDeliveryProductImg}
              disabled={sameCustomer ? true : false}
            />
          </div>

          {retunTableData.length > 0 && (
            <div className="col-12">
              <h6 className="bookingHeading">Item Details</h6>
              <div className="table-responsive">
                <table className="table table-bordered table-hover border-dark">
                  <thead className="table-dark border-light">
                    <tr>
                      {ReturnPage.map((heading, i) => {
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
                          <td>{item.deliveredWt}</td>
                          <td>
                            <input
                              type="number"
                              placeholder="Actual_Wt at Return"
                            />
                          </td>
                          <td>{item.rentalAmount}</td>
                          <td>{item.productValue}</td>
                          <td>{item.penaltyValue}</td>
                          <td>{item.penaltyValue}</td>
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
                      <th colSpan="7" className="text-end">
                        TOTAL
                      </th>
                      <th>234</th>
                      <th>124</th>
                      <th colSpan="2" />
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div className="col-md-3">
            <label className="form-label">Customer Name</label>
            <input type="file" className="form-control" />
          </div>
          <div className="col-12 mb-0">
            <h6 className="bookingHeading d-flex justify-content-between">
              <span className="mt-1">
                Signed Acknowledgement of Product Received after Inspection
              </span>
              <BookingPdf />
            </h6>
          </div>
          <div className="col-md-3 mt-0">
            <input type="file" className="form-control" />
          </div>
          <div className="col-md-2 mt-0">
            {deliveryProductFile && (
              <img
                src={deliveryProductFile}
                alt="Preview"
                height="80px"
                width="100%"
              />
            )}
          </div>
          <div className="d-flex justify-content-end mb-4">
            <button type="button" className="CButton">
              Save
            </button>
          </div>
        </div>
      </div>
      <div className="col-12 d-flex justify-content-end mt-1">
        <div
          className="modal fade"
          id="exampleModal"
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
                {deliveryProductFile && (
                  <img
                    src={deliveryProductFile}
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
  );
};

export default RentalReturn;
