/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Navbar from "../common/Navbar";
import moment from "moment";
import {
  AddedTocCart,
  ImageHeaders,
  phonePan,
  IMAGE_URL,
} from "../../Data/DataList";
import axios from "axios";
import Swal from "sweetalert2";
import { HOST_URL } from "../../API/HostURL";
import Loader from "../common/Loader";
import { FetchImg, UploadImg } from "../../API/HostURL";
import { useNavigate } from "react-router-dom";

const NewBooking = () => {
  const [phonePanValue, setPhonePanValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [existedUserData, setExistedUserData] = useState({});
  const [RSOName, setRSOName] = useState("");
  const navigate = useNavigate();
  const storeCode = localStorage.getItem("storeCode");
  const regNumber = localStorage.getItem("regNumber");
  const custType = localStorage.getItem("custType");
  const packageDays = localStorage.getItem("packageDays");
  const bookingRefId = localStorage.getItem("BookinTempId");
  const [tnxFile, setTnxFile] = useState([]);

  // FETCH CUSOMER UPLPAD IMAGE
  const [panImageUrl, setPanImgUrl] = useState("");

  // CUSTOMER BANK DETAIL FIELDS
  const [customerBankName, setCustomerBankName] = useState("");
  const [customerAccountNumber, setCustomerAccountNumber] = useState("");
  const [bankIfsc, setBankIfsc] = useState("");
  const [bankDetailFileName, setBankDetailFileName] = useState("");
  const [cancelChqueFileName, setCancelChqueFileName] = useState("");
  const [transactionFile, setTransactionFile] = useState("");
  const [transactioUI, setTransactioUI] = useState("");
  const BanckIfcseCode = bankIfsc.toUpperCase();
  const [cancelledChequeFile, setCancelledChequeFile] = useState("");

  const paramType = !phonePanValue
    ? ""
    : phonePanValue[0].match(phonePan)
    ? "pancard"
    : "mobileNo";

  const CheckUserRegistered = () => {
    Swal.fire({
      title: "Customer Not Registered",
      text: "Do You Want Register",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#008080",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/new/customer");
        localStorage.setItem("serachBookingNo", phonePanValue);
      }
    });
  };

  const FetchUDetailsBysearch = () => {
    setLoading(true);
    axios
      .get(`${HOST_URL}/rental/customer/details/${paramType}/${phonePanValue}`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setExistedUserData(response.data.value);
        } else if (response.data.code === "1001") {
          CheckUserRegistered(phonePanValue);
          setExistedUserData({});
        }
        setLoading(false);
      })
      .then((error) => {
        setLoading(false);
      });
  };
  const FetchUDetailsOnlOad = () => {
    setLoading(true);
    axios
      .get(`${HOST_URL}/rental/customer/details/mobileNo/${regNumber}`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setExistedUserData(response.data.value);
        } else if (response.data.code === "1001") {
          CheckUserRegistered(phonePanValue);
          setExistedUserData({});
        }
        setLoading(false);
      })
      .then((error) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (regNumber) {
      FetchUDetailsOnlOad();
    } else if (phonePanValue) {
      FetchUDetailsBysearch();
    }
  }, []);

  // FETCH DOCUMENTS IMAGE
  useEffect(() => {
    if (existedUserData.panCardNoFileName) {
      axios
        .get(`${FetchImg}${existedUserData.panCardNoFileName}`, {
          headers: ImageHeaders,
        })
        .then((res) => res)
        .then((response) => {
          if (response.data) {
            setPanImgUrl(response.data);
          }
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  }, [existedUserData.panCardNoFileName]);

  const currentDate = new Date();
  const bookingDate = moment(currentDate).format("DD-MM-YYYY");

  const CartData = JSON.parse(localStorage.getItem("itemsCartDetails"));
  const GetCartProductData = !CartData ? [] : CartData;

  // TOTAL COST OF PRODUCT VALUE
  const TProductValue = GetCartProductData.map((item) =>
    parseInt(item.productValue)
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

  const TotalWithGstAmount = SumOfRentalRate() + SumOfRentalRate() * 0.18;

  const UpdCancelledChequeDetails = (imgName) => {
    const CancelledFileinp = {
      bookingRefId: "",
      contentFor: "newBooking",
      createdDate: moment().format("YYYY-MM-DD"),
      documentType: "cancelledCheue",
      fileName: imgName,
      fileSize: `${cancelledChequeFile.size}`,
      fileType: `${cancelledChequeFile.type}`,
      fileURL: `${FetchImg}${imgName}`,
      updatedDate: null,
    };
    axios
      .post(`${HOST_URL}/insert/image/details`, CancelledFileinp)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          alert("Uploaded Successfully");
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  const UploadBankCheque = () => {
    if (customerAccountNumber.length < 10) {
      alert("Please Enter Valid Bank Details");
    } else if (!cancelledChequeFile) {
      alert("Please Choose File");
    } else {
      setLoading(true);
      const formData = new FormData();
      const fileEx = cancelledChequeFile.name.split(".");
      const fileExtention = `${customerAccountNumber}.${fileEx[1]}`;
      formData.append("ImgName", fileExtention);
      formData.append("files", cancelledChequeFile);
      axios
        .post(`${UploadImg}`, formData, {
          headers: ImageHeaders,
        })
        .then((res) => res)
        .then((response) => {
          if (response.data) {
            UpdCancelledChequeDetails(fileExtention);
            const reader = new FileReader();
            reader.onloadend = () => {
              setBankDetailFileName(reader.result);
              setCancelChqueFileName(fileExtention);
            };
            if (cancelledChequeFile) {
              reader.readAsDataURL(cancelledChequeFile);
            }
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  };

  const UploadTnxDetails = (imgName) => {
    const TnxIputsDetails = {
      bookingRefId: "",
      contentFor: "newBooking",
      createdDate: moment().format("YYYY-MM-DD"),
      documentType: "tnxPreviousFile",
      fileName: imgName,
      fileSize: `${tnxFile.size}`,
      fileType: `${tnxFile.type}`,
      fileURL: `${FetchImg}${imgName}`,
      updatedDate: null,
    };
    axios
      .post(`${HOST_URL}/insert/image/details`, TnxIputsDetails)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          alert("Uploaded Successfully");
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const UploadPreTransaction = () => {
    if (tnxFile.length === 0) {
      alert("Please Upload Transaction File");
    } else {
      setLoading(true);
      const formData = new FormData();
      const fileEx = tnxFile.name.split(".");
      const fileExtention = `${existedUserData.mobileNo}.${fileEx[1]}`;
      formData.append("ImgName", fileExtention);
      formData.append("files", tnxFile);
      axios
        .post(`${UploadImg}`, formData, {
          headers: ImageHeaders,
        })
        .then((res) => res)
        .then((response) => {
          if (response.data) {
            UploadTnxDetails(fileExtention);
            const reader = new FileReader();
            reader.onloadend = () => {
              setTransactionFile(fileExtention);
              setTransactioUI(reader.result);
            };
            if (tnxFile) {
              reader.readAsDataURL(tnxFile);
            }
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  };
  const UpdateCustomerBankDetails = () => {
    if (!customerBankName || !customerAccountNumber) {
      alert("Please Enter All Details");
    } else {
      setLoading(true);
      const UpdateCustDetails = {
        customerName: existedUserData.customerName,
        customerAddress1: existedUserData.customerAddress1,
        customerAddress2: existedUserData.customerAddress2,
        customerCity: existedUserData.customerCity,
        customerCityPincode: existedUserData.customerCityPincode,
        mobileNo: existedUserData.mobileNo,
        emailId: existedUserData.emailId,
        panCardNo: existedUserData.panCardNo,
        panCardNoFileName: existedUserData.panCardNoFileName,
        addressProofIdType: "",
        addressProofIdNo: existedUserData.addressProofIdNo,
        addressProofFileName: existedUserData.addressProofFileName,
        createDate: bookingDate,
        updateDate: null,
        status: "Active",
        rsoName: RSOName,
        customerBankName: customerBankName,
        customerAccountNumber: customerAccountNumber,
        bankIfsc: BanckIfcseCode,
        bankDetailFileName: cancelChqueFileName,
      };
      axios
        .post(`${HOST_URL}/rental/add/new/customer`, UpdateCustDetails)
        .then((res) => res)
        .then((response) => {
          if (response.data.code === "1000") {
            alert("Account Details has been Updated Successfully");
            FetchUDetailsBysearch();
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  };

  // BOOKING YUOR PRODUCTS
  const RaiseBookPaymentReq = () => {
    if (!RSOName) {
      alert("Please Enter RSO Name");
    } else if (custType !== "New Customer" && transactionFile === "") {
      alert("Please Upload Previous Transaction File");
    } else {
      setLoading(true);
      const BookingInputs = {
        bookingRefId: "",
        storeCode: storeCode,
        addressProofIdNo: existedUserData.addressProofIdNo,
        custId: existedUserData.custId,
        customerType: custType,
        addressProofIdType: existedUserData.addressProofIdType,
        addressProofFileName: existedUserData.addressProofFileName,
        panCardFileName: existedUserData.panCardNoFileName,
        customerPrevTXNFileName: transactionFile,
        totalProductValue: SumOfTProductValue(),
        totalRentalAmount: SumOfRentalRate(),
        totalDepositAmount: SumOfDepositRate(),
        totalBookingAmount: TotalWithGstAmount,
        tncFileName: "",
        rsoName: RSOName,
        createdDate: existedUserData.createDate,
        updatedDate: existedUserData.updateDate,
        status: "Payment_PendingFor_NewBooking",
        tempRefNo: bookingRefId,
      };
      axios
        .post(`${HOST_URL}/rental/new/booking/details`, BookingInputs)
        .then((res) => res)
        .then((response) => {
          if (response.data.code === "1000") {
            Swal.fire(
              "Payment Request Raised",
              "Please Go to Cashier to Complete the Payment",
              "success"
            );
            localStorage.removeItem("itemsCartDetails");
            navigate("/products/details");
          }

          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
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
              onClick={FetchUDetailsBysearch}
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
            <h6>{custType}</h6>
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
            {panImageUrl && (
              <img
                src={`data:image/jpeg;base64,${panImageUrl}`}
                alt=""
                width="180"
                height="85"
              />
            )}
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
              <span className="form-label text-danger">
                <b>PLEASE ADD YOUR BANK DETAILS</b>
              </span>
              <br />
              <button
                className="CButton"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#bookingModal"
              >
                Add Account
              </button>
            </div>
          ) : (
            <div className="col-4">
              <label className="form-label text-success">
                <b>BANK DETAILS ARE AVAILABLE</b>
              </label>
            </div>
          )}
          {custType !== "New Customer" && (
            <div className="d-flex">
              <div className="col-md-4">
                <label className="form-label">
                  Upload Previous Transaction File
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setTnxFile(e.target.files[0])}
                />
              </div>
              <div className="col-md-2 mt-2 mx-2">
                <br />
                <button className="CButton" onClick={UploadPreTransaction}>
                  Upload
                </button>
              </div>
            </div>
          )}
          <div className="col-md-3 text-center">
            {transactioUI && (
              <img src={transactioUI} alt="" width="180" height="85" />
            )}
          </div>
          <div className="col-12">
            <h6 className="bookingHeading">Item Details</h6>
            {GetCartProductData.length > 0 && (
              <div className="table-responsive">
                <table
                  id="item-details-table"
                  className="table table-bordered table-hover border-dark text-center"
                >
                  <thead className="table-dark border-light">
                    <tr>
                      {AddedTocCart.map((heading, i) => {
                        return <td key={i}>{heading}</td>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {GetCartProductData.map((item, i) => {
                      const { itemCode } = item;
                      const imageCode = itemCode.substring(2, 9);
                      const imageURL = `${IMAGE_URL}${imageCode}.jpg`;
                      return (
                        <tr key={i}>
                          <td>
                            <img
                              src={imageURL}
                              className="custom-image"
                              alt=""
                            />
                          </td>
                          <td>{item.itemCode}</td>
                          <td>{item.lotNo}</td>
                          <td>{item.grossWt}</td>
                          <td>
                            {Math.round(item.productValue).toLocaleString(
                              "en-IN"
                            )}
                          </td>
                          <td>
                            {Math.round(item.rentValue).toLocaleString("en-IN")}
                          </td>
                          <td>
                            {Math.round(item.depositValue).toLocaleString(
                              "en-IN"
                            )}
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <th colSpan="3" className="text-end">
                        TOTAL
                      </th>
                      <th>₹ {SumOfTProductValue().toLocaleString("en-IN")}</th>
                      <th>₹ {SumOfRentalRate().toLocaleString("en-IN")}</th>
                      <th>₹ {SumOfDepositRate().toLocaleString("en-IN")}</th>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="col-md-12">
            <label className="form-label">RSO Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="RSO Name"
              onChange={(e) => setRSOName(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-end mb-4">
            <button
              type="button"
              className="CButton mx-2"
              onClick={RaiseBookPaymentReq}
            >
              Raise Payment Request
            </button>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="bookingModal"
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
              {loading === true && <Loader />}
              <div className="col-md-6">
                <label className="form-label">Bank Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Bank Name"
                  onChange={(e) => setCustomerBankName(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Account Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Account Number"
                  onChange={(e) => setCustomerAccountNumber(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">IFSC CODE</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="IFSC CODE"
                  onChange={(e) => setBankIfsc(e.target.value)}
                  value={BanckIfcseCode}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Cancelled Cheque</label>
                <input
                  type="file"
                  className="form-control"
                  id="chequeBook"
                  onChange={(e) => setCancelledChequeFile(e.target.files[0])}
                />
              </div>
              <div className="col-md-1">
                <br />
                <button className="CButton mt-2" onClick={UploadBankCheque}>
                  Upload
                </button>
              </div>
              <div className="col-md-12 text-center">
                {bankDetailFileName && (
                  <img
                    src={bankDetailFileName}
                    alt=""
                    width="180"
                    height="85"
                  />
                )}
              </div>
            </div>
            <div className="d-flex justify-content-end mx-2 mb-2">
              <button
                type="button"
                className="CButton"
                onClick={UpdateCustomerBankDetails}
                data-bs-dismiss={customerAccountNumber && "modal"}
              >
                Save & Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBooking;
