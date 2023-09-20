import React, { useState, useEffect } from "react";
import Navbar from "../common/Navbar";
import "../../Style/RentalIssue.css";
import {
  ImageHeaders,
  rentalIssuePage,
  addressTypeOption,
} from "../../Data/DataList";
import moment from "moment";
import axios from "axios";
import { HOST_URL } from "../../API/HostURL";
import Loader from "../common/Loader";
import { UploadImg } from "../../API/HostURL";

const RentalIssue = () => {
  const [loading, setLoading] = useState(false);
  const storeCode = localStorage.getItem("storeCode");
  const [productImgFile, setProductImgFile] = useState(null);
  const [sameCustomer, setSameCustomer] = useState(true);
  const [existedUserData, setExistedUserData] = useState({});
  const [RSOName, setRSOName] = useState("");

  // CUSTOMER BANK DETAIL FIELDS
  const [customerBankName, setCustomerBankName] = useState("");
  const [customerAccountNumber, setCustomerAccountNumber] = useState("");
  const [bankIfsc, setBankIfsc] = useState("");
  const [bankDetailFileName, setBankDetailFileName] = useState("");
  const [cancelChqueFileName, setCancelChqueFileName] = useState("");
  const BanckIfcseCode = bankIfsc.toUpperCase();
  const [retunTableData, setRetunTableData] = useState([]);
  const [productImg, setProductImg] = useState([]);
  const [productFileName, setProductFileName] = useState("");
  const [karigarQAFile, setKarigarQAFile] = useState([]);
  const [karigarQAFileName, setKarigarQAFileName] = useState("");
  const [karigarQAUrl, setKarigarQAUrl] = useState("");

  // SAME NOT SAME CUSTOME FOR PICKUP DETAILS
  const [sameCustName, setSameCustName] = useState("");
  const [sameCustIDType, setSameCustIDType] = useState("");
  const [sameCustIDNo, setSameCustIDNo] = useState("");
  const [sameCustFile, setSameCustFile] = useState("");

  console.log("productFileName==>", productFileName);
  console.log("karigarQAFileName==>", karigarQAFileName);

  const getProduct = JSON.parse(localStorage.getItem("selecttedReturnProduct"));
  const GetReturnProduct = !getProduct ? "" : getProduct;
  const currentDate = new Date();
  const bookingDate = moment(currentDate).format("YYYY-MM-DD");
  const RandomDigit = Math.floor(100000 + Math.random() * 900000);

  const UploadProductImg = (item) => {
    console.log("item==>", item);
    console.log("productImg==>", productImg);
    if (productImg.length === 0) {
      alert("Please Choose File");
    } else {
      setLoading(true);
      const formData = new FormData();
      const fileExtention = productImg.name.split(".");
      const productFile = `${existedUserData.mobileNo}${bookingDate}${RandomDigit}.${fileExtention[1]}`;
      setProductFileName(productFile);
      formData.append("ImgName", productFile);
      formData.append("files", productImg);
      axios
        .post(`${UploadImg}`, formData, {
          headers: ImageHeaders,
        })
        .then((res) => res)
        .then((response) => {
          console.log("response==>", response);
          if (response.data) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setProductImgFile(reader.result);
            };
            if (productImg) {
              reader.readAsDataURL(productImg);
            }
            alert("File Uploaded Successfully");
            setProductImg([]);
            setProductFileName("");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log("error==>", error);
          setLoading(false);
        });
    }
  };

  console.log("GetReturnProduct==>", GetReturnProduct);

  const getReturnDate = () => {
    const nextDate = new Date(GetReturnProduct.rentalDate);
    nextDate.setDate(
      nextDate.getDate() + parseInt(GetReturnProduct.packageSelected - 1)
    );
    return nextDate;
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${HOST_URL}/rental/customer/details/mobileNo/${GetReturnProduct.mobileNo}`
      )
      .then((res) => res)
      .then((response) => {
        console.log("response==>", response.data);
        if (response.data.code === "1000") {
          setExistedUserData(response.data.value);
        } else if (response.data.code === "1001") {
          setExistedUserData({});
        }
        setLoading(false);
      })
      .then((error) => {
        console.log("error==>", error);
        setLoading(false);
      });
  }, [GetReturnProduct.mobileNo]);

  const UploadBankCheque = (event) => {
    if (customerAccountNumber.length > 10) {
      setLoading(true);
      const file = event.target.files[0];
      const formData = new FormData();
      const fileEx = file.name.split(".");
      const fileExtention = `${customerAccountNumber}.${fileEx[1]}`;
      formData.append("ImgName", fileExtention);
      formData.append("files", file);
      axios
        .post(`${UploadImg}`, formData, {
          headers: ImageHeaders,
        })
        .then((res) => res)
        .then((response) => {
          console.log("response==>", response.data);
          if (response.data) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setBankDetailFileName(reader.result);
              setCancelChqueFileName(fileExtention);
            };
            if (file) {
              reader.readAsDataURL(file);
            }
            alert("Your Cheque Book Uploaded Successfully");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log("error==>", error);
          setLoading(false);
        });
    } else {
      alert("Please Enter Bank Details");
      document.getElementById("chequeBook").value = "";
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
        status: "active",
        rsoName: RSOName,
        customerBankName: customerBankName,
        customerAccountNumber: customerAccountNumber,
        bankIfsc: BanckIfcseCode,
        bankDetailFileName: cancelChqueFileName,
      };
      console.log("UpdateCustDetails==>", UpdateCustDetails);
      axios
        .post(`${HOST_URL}/rental/add/new/customer`, UpdateCustDetails)
        .then((res) => res)
        .then((response) => {
          console.log("response==>", response.data);
          if (response.data.code === "1000") {
            alert("Account Details has been Updated Successfully");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log("error==>", error);
          setLoading(false);
        });
    }
  };

  const UploadKarigarQA = () => {
    if (karigarQAFile.length === 0) {
      alert("Please Upload Karigar QA Report");
    } else {
      setLoading(true);
      const formData = new FormData();
      const fileExtention = karigarQAFile.name.split(".");
      const QAFile = `${existedUserData.mobileNo}${bookingDate}${RandomDigit}.${fileExtention[1]}`;
      setKarigarQAFileName(QAFile);
      formData.append("ImgName", QAFile);
      formData.append("files", karigarQAFile);
      axios
        .post(`${UploadImg}`, formData, {
          headers: ImageHeaders,
        })
        .then((res) => res)
        .then((response) => {
          console.log("response==>", response);
          if (response.data) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setKarigarQAUrl(reader.result);
            };
            if (karigarQAFile) {
              reader.readAsDataURL(karigarQAFile);
            }
            alert("File Uploaded Successfully");
            setKarigarQAFile([]);
            document.getElementById("QAfile").value = "";
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log("error==>", error);
          setLoading(false);
        });
    }
  };

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

  // TOTAL COST OF PRODUCT VALUE
  const TProductValue = retunTableData.map((item) =>
    parseFloat(item.productValue)
  );
  const SumOfTProductValue = () => {
    let total = 0;
    for (let data of TProductValue) total = total + data;
    return total;
  };

  // TOTAL COST OF  RENTAL RATE
  const TRentalRate = retunTableData.map((item) =>
    parseFloat(item.rentalAmount)
  );
  const SumOfRentalRate = () => {
    let total = 0;
    for (let data of TRentalRate) total = total + data;
    return total;
  };

  // TOTAL DEPOSITE AMOUNT
  const TDepositRate = retunTableData.map((item) =>
    parseFloat(item.depositAmount)
  );
  const SumOfTDepositRate = () => {
    let total = 0;
    for (let data of TDepositRate) total = total + data;
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
            <label className="form-label">Rental Start Date</label>
            <h6>{moment(GetReturnProduct.rentalDate).format("DD-MM- YYYY")}</h6>
          </div>
          <div className="col-2">
            <label className="form-label">Rental end Date</label>
            <h6>{moment(getReturnDate()).format("DD-MM- YYYY")}</h6>
          </div>
          <div className="col-2">
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
              onChange={(e) => setSameCustName(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Customer ID Type</label>
            <select
              className="form-control"
              disabled={sameCustomer ? true : false}
              onChange={(e) => setSameCustIDType(e.target.value)}
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
              onChange={(e) => setSameCustIDNo(e.target.value)}
            />
          </div>
          <div className="col-md-4 d-flex">
            <div>
              <label className="form-label">Upload ID</label>
              <input
                type="file"
                className="form-control"
                disabled={sameCustomer ? true : false}
                onChange={(e) => setSameCustFile(e.target.files([0]))}
              />
            </div>
            <div>
              <label className="form-label">.</label>
              <button
                className={sameCustomer ? "CDisabled mx-1" : "CButton mx-1"}
                disabled={sameCustomer ? true : false}
              >
                Upload
              </button>
            </div>
          </div>
          {!existedUserData.customerBankName ||
          !existedUserData.customerAccountNumber ||
          !existedUserData.bankIfsc ||
          !existedUserData.bankDetailFileName ? (
            <div className="col-12">
              <div className="d-flex justify-content-between">
                <label className="form-label text-danger">
                  <b>PLEASE ADD YOUR BANK DETAILS</b>
                </label>
                <br />
                <button
                  className="CButton"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#AddBankModal"
                >
                  ADD ACCOUNT
                </button>
              </div>
            </div>
          ) : (
            <div className="col-12">
              <span className="form-label text-success d-flex justify-content-end">
                <b>BANK DETAILS ARE AVAILABLE</b>
              </span>
            </div>
          )}
          {retunTableData.length > 0 && (
            <div className="col-12">
              <h6 className="bookingHeading">Item Details</h6>
              <div className="table-responsive">
                <table className="table table-bordered table-hover border-dark text-center">
                  <thead className="table-dark border-light">
                    <tr>
                      {rentalIssuePage.map((heading, i) => {
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
                          <td>
                            {parseFloat(item.depositAmount).toLocaleString(
                              "en-IN"
                            )}
                          </td>
                          <td>
                            <input
                              type="number"
                              className="w-100"
                              placeholder="Actual Wt At Delivery"
                            />
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <th colSpan="3" className="text-end">
                        TOTAL
                      </th>
                      <th>{SumOfTProductValue().toLocaleString("en-IN")}</th>
                      <th>{SumOfRentalRate().toLocaleString("en-IN")}</th>
                      <th>{SumOfTDepositRate().toLocaleString("en-IN")}</th>
                      <th colSpan="1" />
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div className="table-responsive">
            <table className="table table-bordered table-hover border-dark">
              <thead className="table-dark border-light text-center">
                <tr>
                  <th>Item Code</th>
                  <th>Upload Product Images</th>
                </tr>
              </thead>
              <tbody>
                {retunTableData.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{item.itemCode}</td>
                      <td className="d-flex justify-content-between">
                        <input
                          type="file"
                          id="prodcutFile"
                          className="form-control"
                          onChange={(e) => setProductImg(e.target.files[0])}
                        />
                        <button
                          className="CButton mx-2"
                          onClick={() => UploadProductImg(item)}
                        >
                          Upload
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="col-12 mb-0">
            <h6 className="bookingHeading d-flex justify-content-between">
              <span className="mt-1">Print Karigar QA Report</span>
              Print
            </h6>
          </div>
          <div className="col-md-4">
            <label className="form-label">Upload Karigar QA Report</label>
            <input
              type="file"
              id="QAfile"
              className="form-control"
              onChange={(e) => setKarigarQAFile(e.target.files[0])}
            />
          </div>
          <div className="col-md-2">
            <br />
            <button className="CButton mt-2" onClick={UploadKarigarQA}>
              Upload
            </button>
          </div>
          <div className="col-md-6">
            <label className="form-label">RSO Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="RSO Name"
              onChange={(e) => setRSOName(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            {karigarQAUrl && (
              <img src={karigarQAUrl} alt="Preview" height="50" />
            )}
          </div>
          <div className="d-flex justify-content-end mb-4">
            <button type="button" className="CButton">
              Raise Deposit Request
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
                {productImgFile && (
                  <img
                    src={productImgFile}
                    alt="Preview"
                    className="fullScreenImage"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*BANK DETAILS POP UP*/}
      <div
        className="modal fade"
        id="AddBankModal"
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
                  onChange={(e) => setCustomerBankName(e.target.value)}
                />
              </div>
              <div className="col-md-4">
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
              <div className="col-md-6">
                <label className="form-label">
                  Upload Cancelled Cheque Book
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={UploadBankCheque}
                  id="chequeBook"
                />
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
                SAVE UPDATE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalIssue;
