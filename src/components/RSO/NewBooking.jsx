/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Navbar from "../common/Navbar";
import moment from "moment";
import { ImageHeaders, WishListHeader, phonePan } from "../../Data/DataList";
import axios from "axios";
import { HOST_URL } from "../../API/HostURL";
import Loader from "../common/Loader";
import { FetchImg } from "../../API/HostURL";
import { useNavigate } from "react-router-dom";

const NewBooking = () => {
  const [phonePanValue, setPhonePanValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [existedUserData, setExistedUserData] = useState({});
  let [secuqanceNo, setSecquanceNo] = useState(1);
  const [bookingRSO, setBookingRSO] = useState("");
  const navigate = useNavigate();
  const storeCode = localStorage.getItem("storeCode");
  const cusType = localStorage.getItem("cusType");
  const packageDays = localStorage.getItem("packageDays");

  console.log("existedUserData==>", existedUserData);
  // FETCH CUSOMER UPLPAD IMAGE
  const [panImageUrl, setPanImgUrl] = useState("");
  const paramType = !phonePanValue
    ? ""
    : phonePanValue[0].match(phonePan)
    ? "pancard"
    : "mobileNo";

  const CheckUserRegistered = (phonePanValue) => {
    const result = window.confirm(
      "Customer Not Registered, Please Register the Customer Details"
    );
    if (result) {
      navigate("/new/customer");
    }
  };

  const FetchUserDetails = () => {
    setLoading(true);
    axios
      .get(`${HOST_URL}/rental/customer/details/${paramType}/${phonePanValue}`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setExistedUserData(response.data.value);
          localStorage.setItem("paramType", paramType);
          localStorage.setItem("phonePanValue", phonePanValue);
        } else if (response.data.code === "1001") {
          CheckUserRegistered(phonePanValue);
          setExistedUserData({});
        }
        setLoading(false);
      })
      .then((error) => {
        console.log("error==>", error);
        setLoading(false);
      });
  };

  // FETCH DOCUMENTS IMAGE
  useEffect(() => {
    if (existedUserData.addressProofFileName) {
      axios
        .get(`${FetchImg}${existedUserData.addressProofFileName}`, {
          headers: ImageHeaders,
        })
        .then((res) => res)
        .then((response) => {
          if (response.data) {
            setPanImgUrl(response.data);
          }
        })
        .catch((error) => console.log("error=>", error));
    }
  }, [existedUserData.addressProofFileName]);

  const currentDate = new Date();
  const bookingDate = moment(currentDate).format("YYYY-MM-DD");

  // BOOKING YUOR PRODUCTS
  const BookYorProduct = () => {
    setLoading(true);
    setSecquanceNo(secuqanceNo + 1);
    const booingYear = currentDate.getFullYear();
    secuqanceNo = (secuqanceNo % 10000).toString().padStart(4, "0");
    const bookingRefId = `MAMTHA-R-${booingYear}-${secuqanceNo}`;

    const BookingInputs = {
      bookingRefId: bookingRefId,
      storeCode: storeCode,
      addressProofIdNo: existedUserData.addressProofIdNo,
      custId: existedUserData.custId,
      customerType: cusType,
      addressProofIdType: existedUserData.addressProofIdType,
      addressProofFileName: existedUserData.addressProofFileName,
      panCardFileName: existedUserData.panCardNoFileName,
      customerPrevTXNFileName: "prvstxn2.jpg",
      totalProductValue: 3001.5,
      totalRentalAmount: 1231.5,
      totalDepositAmount: 3001.5,
      totalBookingAmount: 1001.7,
      tncFileName: "tncFile1.jpg",
      rsoName: bookingRSO,
      createdDate: existedUserData.createDate,
      updatedDate: existedUserData.updateDate,
      status: "active",
      tempRefNo: "Durgesh123987",
    };
    console.log("BookingInputs==>", BookingInputs);
    axios
      .post(`${HOST_URL}/rental/new/booking/details`, BookingInputs)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          console.log("response==>", response);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("error==>", error);
        setLoading(false);
      });
  };

  const CartData = JSON.parse(localStorage.getItem("itemsCartDetails"));
  const GetCartProductData = !CartData ? [] : CartData;

  // TOTAL COST OF PRODUCT VALUE
  const TProductValue = GetCartProductData.map((item) =>
    parseFloat(item.productValue)
  );
  const SumOfTProductValue = () => {
    let total = 0;
    for (let data of TProductValue) total = total + data;
    return total;
  };
  // TOTAL COST OF  RENTAL RATE
  const TRentalRate = GetCartProductData.map((item) => item.rentValue);

  const SumOfRentalRate = () => {
    let total = 0;
    for (let data of TRentalRate) total = total + data;
    return total;
  };

  // TOTAL COST OF DEPOSIT RATE
  const TDepositRate = GetCartProductData.map((item) => item.depositValue);
  const SumOfDepositRate = () => {
    let total = 0;
    for (let data of TDepositRate) total = total + data;
    return total;
  };

  return (
    <div>
      {loading === true && <Loader />}
      <Navbar />
      <div className="mt-4 mx-2">
        <div className="col-12">
          <h6 className="bookingHeading mx-2">Booking Details</h6>
        </div>
        <div className="row g-3 mx-0">
          <div className="col-md-3">
            <b>BOOKING DATE : {bookingDate}</b>
          </div>
          <div className="col-md-8">
            <input
              type="type"
              className="form-control"
              placeholder="Search Customer By Phone or PAN"
              value={phonePanValue.toUpperCase()}
              maxLength={10}
              onChange={(e) => setPhonePanValue(e.target.value)}
            />
          </div>
          <div className="col-md-1 d-flex justify-content-end">
            <button
              type="button"
              className={`${
                phonePanValue.length < 10 ? "CDisabled" : "CButton"
              }`}
              disabled={phonePanValue.length < 10 ? true : false}
              onClick={FetchUserDetails}
            >
              Search
            </button>
          </div>
          <div className="col-12">
            <h6 className="bookingHeading mb-0">Customer Details</h6>
          </div>
          <div className="col-3">
            <label className="form-label">CUSTOMER NAME</label>
            <h6>{existedUserData.customerName}</h6>
          </div>
          <div className="col-3">
            <label className="form-label">PHONE NUMBER</label>
            <h6>{existedUserData.mobileNo}</h6>
          </div>
          <div className="col-3">
            <label className="form-label">EMAIL</label>
            <h6>{existedUserData.emailId}</h6>
          </div>
          <div className="col-3">
            <label className="form-label">CUSTOMER TYPE</label>
            <h6>{cusType}</h6>
          </div>
          <div className="col-12">
            <h6 className="bookingHeading mb-0">Customer Address</h6>
          </div>
          <div className="col-4">
            <label className="form-label">CITY</label>
            <h6>{existedUserData.customerCity}</h6>
          </div>
          <div className="col-4">
            <label className="form-label">ADDRESS LINE-1</label>
            <h6>{existedUserData.customerAddress1}</h6>
          </div>
          <div className="col-4">
            <label className="form-label">ADDRESS LINE-2</label>
            <h6>{existedUserData.customerAddress2}</h6>
          </div>
          <div className="col-4">
            <label className="form-label">PIN CODE</label>
            <h6>{existedUserData.customerCityPincode}</h6>
          </div>
          <div className="col-4">
            <label className="form-label">ID NUMBER</label>
            <h6>{existedUserData.addressProofIdNo}</h6>
          </div>
          <div className="col-md-4">
            <img
              src={`data:image/jpeg;base64,${panImageUrl}`}
              alt=""
              width="180"
              height="85"
            />
          </div>
          <div className="col-4">
            <label className="form-label">RENT START DATE</label>
            <h6>{bookingDate}</h6>
          </div>
          <div className="col-4">
            <label className="form-label">PACKAGE DAYS</label>
            <h6>{packageDays} Days</h6>
          </div>
          {!existedUserData.customerBankName ||
          !existedUserData.customerAccountNumber ? (
            <div className="col-4">
              <label className="form-label text-danger">
                <b>PLEASE ADD YOUR BANK DETAILS</b>
              </label>
              <br />
              <button
                className="CButton"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                ADD ACCOUNT
              </button>
            </div>
          ) : null}
          <div className="col-12">
            <h6 className="bookingHeading">Item Details</h6>
            <div className="table-responsive">
              <table
                id="item-details-table"
                className="table table-bordered table-hover border-dark"
              >
                <thead className="table-dark border-light">
                  <tr>
                    {WishListHeader.map((heading, i) => {
                      return <td key={i}>{heading}</td>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {GetCartProductData.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td>{item.itemCode}</td>
                        <td>{item.pdtId}</td>
                        <td>{item.lotNo}</td>
                        <td>{item.cfa}</td>
                        <td>{item.grossWt}</td>
                        <td>{item.netWt}</td>
                        <td>{item.productValue}</td>
                        <td>{item.rentValue}</td>
                        <td>{item.depositValue}</td>
                      </tr>
                    );
                  })}
                  <tr className="text-bold">
                    <th colSpan="6" className="text-end">
                      TOTAL
                    </th>
                    <th>{SumOfTProductValue()}</th>
                    <th>{SumOfRentalRate()}</th>
                    <th>{SumOfDepositRate()}</th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="RSO Name"
              onChange={(e) => setBookingRSO(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-end mb-4">
            <button
              type="button"
              className="CButton mx-2"
              onClick={BookYorProduct}
            >
              Raise Payment Request
            </button>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Account Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body row g-3">
              <div className="col-md-6">
                <label className="form-label">Bank Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Bank Name"
                  // onChange={(e) => setCustomerBankName(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Account Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Account Number"
                  // onChange={(e) => setCustomerAccountNumber(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">IFSC CODE</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="IFSC CODE"
                  // onChange={(e) => setBankIfsc(e.target.value)}
                  // value={BanckIfcseCode}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">
                  Upload Cancelled Cheque Book
                </label>
                <input
                  type="file"
                  className="form-control"
                  // onChange={UploadBankCheque}
                  id="chequeBook"
                />
              </div>
            </div>
            <div className="d-flex justify-content-end mx-2 mb-2">
              <button type="button" className="CButton">
                SAVE UPDATE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBooking;
