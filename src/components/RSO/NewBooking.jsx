/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Navbar from "../common/Navbar";
import moment from "moment";
import {
  AddedToCartHeaders,
  phonePan,
  IMAGE_URL,
} from "../../Data/DataList";
import { toast } from 'react-toastify';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import axios from "axios";
import Swal from "sweetalert2";
import { HOST_URL } from "../../API/HostURL";
import Loader from "../common/Loader";
import { FetchImg, UploadImg } from "../../API/HostURL";
import { useNavigate } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";

const NewBooking = () => {
  const [phonePanValue, setPhonePanValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [existedUserData, setExistedUserData] = useState({});
  const [RSOName, setRSOName] = useState("");
  const navigate = useNavigate();
  const storeCode = localStorage.getItem("storeCode");
  const regNumber = localStorage.getItem("regNumber");
  const bookingRefId = localStorage.getItem("BookinTempId");
  const [tnxFile, setTnxFile] = useState([]);
  const RandomD = Math.floor(100000 + Math.random() * 900000);


  // CUSTOMER BANK DETAIL FIELDS
  const [customerBankName, setCustomerBankName] = useState("");
  const [customerAccountNumber, setCustomerAccountNumber] = useState("");
  const [bankIfsc, setBankIfsc] = useState("");
  const [customerNameAsBank, setCustomerNameAsBank] = useState("");
  const [bankDetailFileName, setBankDetailFileName] = useState("");
  const [cancelChqueFileName, setCancelChqueFileName] = useState("");
  const [transactionFile, setTransactionFile] = useState("");
  const [transactioUI, setTransactioUI] = useState("");
  const [cancelledChequeFile, setCancelledChequeFile] = useState("");
  const [getCartProductData, setGetCartProductData] = useState([])

  const customerType = getCartProductData.map(item => item.customerType)
  const custType = customerType[0]
  const packageDays = getCartProductData.map(item => item.packageDays)


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
        localStorage.setItem("searchBookingNo", phonePanValue ? phonePanValue : regNumber);
      }
    });
  };
  const FetchUDetailsBysearch = (phonePanValue) => {
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
  const FetchUDetailsOnlOad = (regNumber) => {
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
  const SerachInfoUserDetails = () => {
    if (regNumber) {
      FetchUDetailsOnlOad(regNumber)
    } else if (phonePanValue) {
      FetchUDetailsBysearch(phonePanValue)
    } else {
      toast.error("Please Enter Your Phone Number!", { theme: "colored", autoClose: 3000 })
    }
  }
  useEffect(() => {
    if (regNumber) {
      FetchUDetailsOnlOad(regNumber);
    } else if (phonePanValue) {
      FetchUDetailsBysearch(phonePanValue);
    }
  }, []);

  const currentDate = new Date();
  const bookingDate = moment(currentDate).format("DD-MM-YYYY");
  const GetAddToCartData = (bookingRefId) => {
    axios.get(`${HOST_URL}/store/booked/item/details/${bookingRefId}`).then(res => res).then(response => {
      if (response.data.code === "1000") {
        setGetCartProductData(response.data.value)
      } else if (response.data.code === "1001") {
        setGetCartProductData([])
      }
    }).catch(error => {
      setLoading(false)
    })
  }
  useEffect(() => {
    GetAddToCartData(bookingRefId)
  }, [bookingRefId])

  const rentalStrDate = getCartProductData.map((item) => item.rentalStartDate);
  // TOTAL COST OF PRODUCT VALUE
  const TProductValue = getCartProductData.map((item) =>
    parseInt(item.productValue)
  );
  const SumOfTProductValue = () => {
    let total = 0;
    for (let data of TProductValue) total = total + data;
    return total;
  };

  // TOTAL COST OF  RENTAL RATE
  const TRentalRate = getCartProductData.map((item) => item.rentValue);
  const SumOfRentalRate = () => {
    let total = 0;
    for (let data of TRentalRate) total = total + data;
    return total;
  };

  // TOTAL RENTAL WITH TAX

  const TRentalRateWithTx = getCartProductData.map(
    (item) => item.rentValue * 1.18
  );
  const SumOfRentalRateWithTx = () => {
    let total = 0;
    for (let data of TRentalRateWithTx) total = total + data;
    return total;
  };

  // TOTAL COST OF DEPOSIT RATE
  const TDepositRate = getCartProductData.map((item) => item.depositValue);
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
          toast.success("Uploaded Successfully", { theme: "colored", autoClose: 1000 });
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  const UploadBankCheque = () => {
    if (customerAccountNumber.length < 3) {
      toast.error("Please Enter Valid Bank Details", { theme: "colored", autoClose: 3000 });
    } else if (!cancelledChequeFile) {
      toast.error("Please Choose File", { theme: "colored", autoClose: 3000 });
    } else {
      setLoading(true);
      const formData = new FormData();
      const fileEx = cancelledChequeFile.name.split(".");
      const fileExtention = `${customerAccountNumber}_${RandomD}.${fileEx[1]}`;
      formData.append("ImgName", fileExtention);
      formData.append("files", cancelledChequeFile);
      axios
        .post(UploadImg, formData)
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
      bookingRefId: bookingRefId,
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
          toast.success("Uploaded Successfully", { theme: "colored", autoClose: 1000 });
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const UploadPreTransaction = () => {
    if (tnxFile.length === 0) {
      toast.error("Please Choose Transaction File", { theme: "colored", autoClose: 3000 });
    } else {
      setLoading(true);
      const formData = new FormData();
      const fileEx = tnxFile.name.split(".");
      const fileExtention = `${existedUserData.mobileNo}_${RandomD}.${fileEx[1]}`;
      formData.append("ImgName", fileExtention);
      formData.append("files", tnxFile);
      axios
        .post(UploadImg, formData)
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
    if (
      !customerBankName ||
      !customerAccountNumber ||
      !customerNameAsBank ||
      !cancelChqueFileName
    ) {
      toast.error("Please Enter All Details", { theme: "colored", autoClose: 3000 });
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
        customerNameasPerAccount: customerNameAsBank,
        bankIfsc: bankIfsc,
        bankDetailFileName: cancelChqueFileName,
      };
      axios
        .post(`${HOST_URL}/rental/add/new/customer`, UpdateCustDetails)
        .then((res) => res)
        .then((response) => {
          if (response.data.code === "1000") {
            toast.success("Account Details has been Updated Successfully", { theme: "colored", autoClose: 1000 });
            FetchUDetailsBysearch(phonePanValue);
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
      toast.error("Please Enter RSO Name", { theme: "colored", autoClose: 3000 });
    } else if (custType !== "New Customer" && transactionFile === "") {
      toast.error("Please Upload Previous Transaction File", { theme: "colored", autoClose: 3000 });
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
            Swal.fire({
              title: "Payment Request Raised",
              text: "Please Go to Cashier to Complete the Payment",
              icon: "success",
              confirmButtonColor: "#008080",
              confirmButtonText: "OK",
            });
            navigate("/home");
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  };
  const DeleteProductBookingTable = (data) => {
    const { pdtId, tempBookingRef } = data;
    axios.get(`${HOST_URL}/delete/item/from/booking/table/${pdtId}/${tempBookingRef}`).then(res => res).then(response => {
      if (response.data.code === "1000") {
        GetAddToCartData(bookingRefId)
        toast.success("Product Deleted Successfully", { theme: "colored", autoClose: 1000 })
      }
    }).catch(error => setLoading(false))
  }

  const DeleteProductFromCart = (data) => {
    setLoading(true);
    const { pdtId, tempBookingRef } = data;
    axios.get(`${HOST_URL}/delete/item/from/cart/${pdtId}/${tempBookingRef}`).then(res => res).then(response => {
      if (response.data.code === "1000") {
        DeleteProductBookingTable(data)
      }
      setLoading(false);
    }).catch(error => {
      setLoading(false);
    })
  }

  const DeleteProductBookingPage = (data) => {
    setLoading(true);
    const { pdtId, tempBookingRef } = data;
    axios.get(`${HOST_URL}/delete/item/booking/calendar/${pdtId}/${tempBookingRef}`).then(res => res).then(response => {
      if (response.data.code === "1000") {
        DeleteProductFromCart(data)
      }
      setLoading(false);
    }).catch(error => setLoading(false))
  }

  return (
    <div>
      <Navbar />
      {loading === true && <Loader />}
      <div className="mt-4 mx-2">
        <div className="col-12">
          <h6 className="bookingHeading mx-2">Booking Details</h6>
        </div>
        <div className="row g-3 mx-0">
          <div className="col-md-3">
            <b>BOOKING DATE : {bookingDate}</b>
          </div>
          <div className="col-md-8 d-flex">
            <input
              type="type"
              className="form-control"
              placeholder="Search Customer By Phone or PAN"
              maxLength={10}
              value={phonePanValue ? phonePanValue : regNumber}
              onChange={(e) => setPhonePanValue(e.target.value)}
              disabled={regNumber ? true : false}
            />
            <button
              type="button"
              className="CButton mx-1"
              onClick={SerachInfoUserDetails}
            >
              Search
            </button>
          </div>
          <div className="col-12">
            <h6 className="bookingHeading mb-0">Customer Details</h6>
          </div>
          <div className="col-md-3">
            <label className="form-label">CUSTOMER NAME</label>
            <h6>{existedUserData.customerName}</h6>
          </div>
          <div className="col-md-3">
            <label className="form-label">PHONE NUMBER</label>
            <h6>{existedUserData.mobileNo}</h6>
          </div>
          <div className="col-md-3">
            <label className="form-label">EMAIL</label>
            <h6>{existedUserData.emailId}</h6>
          </div>
          <div className="col-md-3">
            <label className="form-label">CUSTOMER TYPE</label>
            <h6>{custType}</h6>
          </div>
          <div className="col-12">
            <h6 className="bookingHeading mb-0">Customer Address</h6>
          </div>
          <div className="col-md-4">
            <label className="form-label">CITY</label>
            <h6>{existedUserData.customerCity}</h6>
          </div>
          <div className="col-md-4">
            <label className="form-label">ADDRESS LINE-1</label>
            <h6>{existedUserData.customerAddress1}</h6>
          </div>
          <div className="col-md-4">
            <label className="form-label">ADDRESS LINE-2</label>
            <h6>{existedUserData.customerAddress2}</h6>
          </div>
          <div className="col-md-4">
            <label className="form-label">PIN CODE</label>
            <h6>{existedUserData.customerCityPincode}</h6>
          </div>
          <div className="col-md-4">
            <label className="form-label">ID NUMBER</label>
            <h6>{existedUserData.addressProofIdNo}</h6>
          </div>
          <div className="col-md-4">
            {existedUserData.panCardNoFileName && <img
              src={`${FetchImg}${existedUserData.panCardNoFileName}`}
              alt=""
              width="180"
              height="85"
            />}
          </div>
          <div className="col-md-4">
            <label className="form-label">RENTAL START DATE</label>
            <h6>
              {rentalStrDate.length > 0 &&
                moment(rentalStrDate[0]).format("DD-MM-YYYY")}
            </h6>
          </div>
          <div className="col-md-4">
            <label className="form-label">PACKAGE DAYS</label>
            {packageDays.length > 0 && <h6>{packageDays[0]} Days</h6>}
          </div>
          {!existedUserData.customerBankName ||
            !existedUserData.customerAccountNumber ||
            !existedUserData.bankIfsc ? (
            <div className="col-md-4">
              <span className="form-label text-danger">
                <b>Please Add Your Bank Details</b>
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
            <div className="col-md-4">
              <label className="form-label text-success">
                <b>BANK DETAILS ARE AVAILABLE</b>
              </label>
            </div>
          )}
          {custType !== "New Customer" && (
            <div className="row d-flex mt-3">
              <div className="col-md-5">
                <label className="form-label">
                  Previous Transaction File<span className="text-danger">*</span>
                </label>
                <div className="d-flex justify-content-between">
                  <input
                    type="file"
                    accept=".png, .jpeg"
                    className="form-control"
                    onChange={(e) => setTnxFile(e.target.files[0])}
                  />
                  <button className="CButton mx-2" onClick={UploadPreTransaction}>
                    Upload
                  </button>
                </div>
              </div>
              <div className="col-md-3 text-center mt-3">
                {transactioUI && (
                  <img src={transactioUI} alt="" width="180" height="85" />
                )}
              </div>
            </div>
          )}
          <div className="col-12">
            <h6 className="bookingHeading">Item Details</h6>
            {getCartProductData.length > 0 && (
              <div className="table-responsive">
                <Table
                  id="item-details-table"
                  className="table table-bordered table-hover border-dark text-center"
                >
                  <Thead className="table-dark border-light">
                    <Tr style={{ fontSize: "15px" }}>
                      {AddedToCartHeaders.map((heading, i) => {
                        return <Th key={i}>{heading}</Th>;
                      })}
                      <Th>Delete</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {getCartProductData.map((item, i) => {
                      const { itemCode } = item;
                      const imageCode = itemCode.substring(2, 9);
                      const imageURL = `${IMAGE_URL}${imageCode}.jpg`;
                      return (
                        <Tr key={i}>
                          <Td>
                            <img
                              src={imageURL}
                              className="custom-image"
                              alt=""
                            />
                          </Td>
                          <Td>{item.itemCode}</Td>
                          <Td>{item.lotNo}</Td>
                          <Td>{item.grossWt}</Td>
                          <Td className="text-end">
                            {Math.round(item.productValue).toLocaleString(
                              "en-IN"
                            )}
                          </Td>
                          <Td className="text-end">
                            {Math.round(item.rentValue).toLocaleString("en-IN")}
                          </Td>
                          <Td className="text-end">
                            {parseFloat(item.rentValue * 1.18).toFixed(2)}
                          </Td>
                          <Td className="text-end">
                            {Math.round(item.depositValue).toLocaleString(
                              "en-IN"
                            )}
                          </Td>
                          <Td>
                            <BsFillTrashFill
                              className="text-danger"
                              onClick={() => DeleteProductBookingPage(item)}
                              cursor="pointer"
                            />
                          </Td>
                        </Tr>
                      );
                    })}
                    <Tr className="text-end">
                      <Th colSpan="4" >
                        TOTAL
                      </Th>
                      <Th>
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                          minimumFractionDigits: false,
                        }).format(SumOfTProductValue())}
                      </Th>
                      <Th>
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                          minimumFractionDigits: false,
                        }).format(SumOfRentalRate())}
                      </Th>
                      <Th>
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                          minimumFractionDigits: 2,
                        }).format(SumOfRentalRateWithTx())}
                      </Th>
                      <Th>
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                          minimumFractionDigits: false,
                        }).format(SumOfDepositRate())}
                      </Th>
                      <Th colSpan="1" />
                    </Tr>
                  </Tbody>
                </Table>
              </div>
            )}
          </div>
          <div className="col-md-12">
            <label className="form-label">RSO Name<span className="text-danger">*</span></label>
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
              className="CButton"
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
                <label className="form-label">
                  Bank Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Bank Name"
                  value={customerBankName}
                  onChange={(e) => {
                    let bankVal = e.target.value.replace(/[^a-zA-Z]/g, '');
                    setCustomerBankName(bankVal.toUpperCase())
                  }}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">
                  Account Number <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Account Number"
                  value={customerAccountNumber}
                  onChange={(e) => {
                    const phoneVAl = e.target.value.replace(/[^0-9]/g, '')
                    setCustomerAccountNumber(phoneVAl)
                  }}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">
                  Customer Name(As Per Bank A/c)
                  <span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Customer Name(As Per Bank A/c)"
                  value={customerNameAsBank}
                  onChange={(e) => setCustomerNameAsBank(e.target.value.toUpperCase())}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">
                  IFSC CODE <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="IFSC CODE"
                  onChange={(e) => setBankIfsc(e.target.value.toUpperCase())}
                  value={bankIfsc}
                />
              </div>
              <div className="col-md-10">
                <label className="form-label">
                  Cancelled Cheque <span className="text-danger">*</span>
                </label>
                <div className="d-flex">
                  <input
                    type="file"
                    accept=".png, .jpeg"
                    className="form-control"
                    id="chequeBook"
                    onChange={(e) => setCancelledChequeFile(e.target.files[0])}
                  />
                  <button className="CButton mx-1" onClick={UploadBankCheque}>
                    Upload
                  </button>
                </div>
              </div>
              <div className="col-md-12">
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
            <div className="d-flex justify-content-between mx-3 mb-3">
              <span className="text-danger">
                Please fill the all marks(*) are given field.
              </span>
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
