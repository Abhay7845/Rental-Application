import React, { useState } from "react";
import Navbar from "../common/Navbar";
import { packageDayOption } from "../../Data/DataList";
import axios from "axios";
import { HOST_URL } from "../../API/HostURL";
import Loader from "../common/Loader";

const ProductsDetails = () => {
  const [rentalDate, setRentalDate] = useState("");
  const [packageDays, setPackageDays] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState({});
  const storeCode = localStorage.getItem("rsoRole");

  const GetProductDetails = () => {
    setLoading(true);
    axios
      .get(`${HOST_URL}/rental/product/view/details/MAMTHA/${itemCode}`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setProductDetails(response.data.value);
        }
        if (response.data.code === "1001") {
          console.log("daata");
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const CheckAvaiblity = () => {
    setLoading(true);
    const CheckAvaiblity = {
      bookedDate: "",
      bookingDate: rentalDate,
      endDate: "",
      image: "",
      itemCode: itemCode,
      packageDays: packageDays,
      stdUCP: "",
      stdWt: "",
      storeCode: storeCode,
    };
    console.log("CheckAvaiblity==>", CheckAvaiblity);
    axios
      .post(`${HOST_URL}/check/item/availability`, CheckAvaiblity)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          if (response.data.value === "Available") {
            GetProductDetails();
          } else {
            alert("Product Not Available");
          }
        }
        if (response.data.code === "1001") {
          console.log(response.data.value);
        }
        setLoading(false);
      })
      .catch((errro) => {
        setLoading(false);
      });
  };
  return (
    <div>
      <Navbar />
      {loading === true && <Loader />}
      <div className="row g-3 mx-0 mt-3">
        <div className="col-md-3">
          <label className="form-label">Item Code</label>
          <input
            type="text"
            className="form-control"
            placeholder="Item Code"
            onChange={(e) => setItemCode(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Rent Start Date</label>
          <input
            type="date"
            className="form-control"
            value={rentalDate}
            onChange={(e) => setRentalDate(e.target.value)}
          />
        </div>
        <div className="col-md-3">
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
            <button className="CButton" onClick={CheckAvaiblity}>
              Check Availability
            </button>
          </div>
        </div>
        {productDetails.pdtID && (
          <div className="col-12 table-responsive">
            <table className="table table-bordered table-hover border-dark">
              <thead className="table-dark border-light">
                <tr>
                  <th>PdtID</th>
                  <th>HUID</th>
                  <th>Item Code</th>
                  <th>Lot No.</th>
                  <th>CFA</th>
                  <th>Gross Wt</th>
                  <th>Net Wt</th>
                  <th>Product Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{productDetails.pdtID}</td>
                  <td>{productDetails.huID}</td>
                  <td>{productDetails.itemCode}</td>
                  <td>{productDetails.lotNo}</td>
                  <td>{productDetails.cfa}</td>
                  <td>{productDetails.grossWt}</td>
                  <td>{productDetails.netWt}</td>
                  <td>{productDetails.productValue}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsDetails;
