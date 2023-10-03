import React, { useState } from "react";
import Navbar from "../common/Navbar";
import axios from "axios";
import Swal from "sweetalert2";
import { HOST_URL } from "../../API/HostURL";
import Loader from "../common/Loader";
import {
  ImageHeaders,
  PaymentHeading1,
  PaymentHeading2,
} from "../../Data/DataList";
import { UploadImg, FetchImg } from "../../API/HostURL";
import { BsFillTrashFill } from "react-icons/bs";
import moment from "moment/moment";
import { useEffect } from "react";
import BookingPdf from "../Pdf/BookingPdf";
import CancelationPdf from "../Pdf/CancelationPdf";
import DeliveryChallanPdf from "../Pdf/DeliveryChallanPdf";
import ServiceIvoicePdf from "../Pdf/ServiceIvoicePdf";

const CashierPaymentDetails = () => {
  const [loading, setLoading] = useState(false);
  const storeCode = localStorage.getItem("storeCode");
  const currentDate = moment().format("YYYY-MM-DD");
  const RandomDigit = Math.floor(100000 + Math.random() * 900000);
  const bookingRefID = `${storeCode}-R-${currentDate}-${RandomDigit}`;
  const [bookingGenNo, setBookingGenNo] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [getPaymentData, setGetPaymentData] = useState([]);
  const [storeDetails, setStoreDetails] = useState({});
  const [addedPdts, setAddedPdts] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState({});
  const [existedUserData, setExistedUserData] = useState({});
  const [documentType, setDocumentType] = useState("");
  const [collectedAmount, setCollectedAmount] = useState();
  const [alertMessage, setAlertMessage] = useState();
  const [bookedStatus, setBookedStatus] = useState("");
  const [amontErrMassage, setAmontErrMassage] = useState("");
  const [regUserData, setRegUserData] = useState([]);
  const [totalPaidAmount, setTotalPaidAmount] = useState({});

  const {
    paymentRequestFor,
    rentValue,
    refundValue,
    depositValue,
    bookingRefNo,
  } = paymentDetails;

  const { totalDamageCharges, totalPenaltyCharges } = totalPaidAmount;

  console.log("paymentDetails==>", paymentDetails);
  const CollectedAmount =
    parseInt(depositValue) -
    (parseInt(totalDamageCharges) + parseInt(totalPenaltyCharges));

  // ADD ROW
  const [count, setCount] = useState(0);
  const [addPaymentRows, setAddPaymentRows] = useState([]);
  const [paymentRowId, setPaymentRowId] = useState(0);
  const [savePaymetRow, setSavePaymetRow] = useState([]);
  const [paymentType, setPaymentType] = useState("");
  const [tnxRefNo, setTnxRefNo] = useState("");
  const [amount, setAmount] = useState("");
  const [fileUpload, setFileUpload] = useState("");
  const [fileName, setFileName] = useState("");

  // TERMS AND CONDITION FILE UPLOAD
  const [printFile, setPrintFile] = useState("");
  const [deliveryChallan, setDeliveryChallan] = useState([]);
  const [tnCFileName, setTnCFileName] = useState("");
  const [dlrChalalnFileName, setDlrChalalnFileName] = useState("");
  const [cashierName, setCashierName] = useState("");

  // OTP VERIFICATION
  const [Otp, setOtp] = useState("");
  const [inputOtp, setInputOtp] = useState("");
  const [verifiedOtp, setVerifiedOtp] = useState(false);
  const FetchUserDetails = (phoneNo) => {
    axios
      .get(`${HOST_URL}/rental/customer/details/mobileNo/${phoneNo}`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setExistedUserData(response.data.value);
        }
      })
      .then((error) => {
        console.log("error==>", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    axios
      .get(`${HOST_URL}/store/details/for/pdf/${storeCode}`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setStoreDetails(response.data.value);
        }
      })
      .catch((error) => console.log("error==>", error));
  }, [storeCode]);

  const GetRegistreUserData = () => {
    axios
      .get(
        `${HOST_URL}/get/booking/details/${storeCode}/Mobile_No/${searchValue}`
      )
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setRegUserData(response.data.value);
        }
      })
      .catch((error) => {
        console.log("error==>", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (bookingRefNo) {
      axios
        .get(
          `${HOST_URL}/fetch/sumOf/amounts/common/${storeCode}/${bookingRefNo}`
        )
        .then((res) => res)
        .then((response) => {
          console.log("responsesum==>", response.data);
          if (response.data.code === "1000") {
            setTotalPaidAmount(response.data.value);
          }
        })
        .catch((error) => {
          console.log("error==>", error);
          setLoading(false);
        });
    }
  }, [storeCode, bookingRefNo]);

  useEffect(() => {
    if (paymentDetails.tempBookingRef) {
      setLoading(true);
      axios
        .get(
          `${HOST_URL}/fetch/table/common/data/${storeCode}/""/${paymentDetails.tempBookingRef}`
        )
        .then((res) => res)
        .then((response) => {
          console.log("responseCommon==>", response.data);
          if (response.data.code === "1000") {
            setAddedPdts(response.data.value);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log("error==>", error);
          setLoading(false);
        });
    }
  }, [storeCode, paymentDetails.tempBookingRef]);

  const GetPyamentDetials = () => {
    setLoading(true);
    axios
      .get(
        `${HOST_URL}/get/payment/request/details/for/cashier/${storeCode}/${searchValue}`
      )
      .then((res) => res)
      .then((response) => {
        console.log("response==>", response.data);
        if (response.data.code === "1000") {
          const PendingStatusData = response.data.value.filter(
            (data) =>
              data.paymentRequestFor.substring(0, 18) === "Payment_PendingFor"
          );
          setGetPaymentData(PendingStatusData);
          FetchUserDetails(searchValue);
          GetRegistreUserData();
        }
        if (response.data.code === "1001") {
          setGetPaymentData({});
          setPaymentDetails({});
          Swal.fire({
            title: "Not Found",
            text: "Data Not Available",
            icon: "warning",
            confirmButtonColor: "#008080",
            confirmButtonText: "OK",
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("error==>", error);
        setLoading(false);
      });
  };

  const OnSelectRow = (seletedData) => {
    setPaymentDetails(seletedData);
  };
  console.log("paymentDetails==>", paymentDetails);

  useEffect(() => {
    if (paymentRequestFor === "Payment_PendingFor_RentalCancellation") {
      setCollectedAmount(parseFloat(refundValue));
      setAlertMessage("Booking Successfully Cancelled");
      setBookedStatus("Cancellation_After_Booking");
      setAmontErrMassage(
        "Total Amount Not Equal to Net Cancellation Charges & Please ensure to Save the Payment"
      );
      setBookingGenNo(paymentDetails.bookingRefNo);
    }
    if (paymentRequestFor === "Payment_PendingFor_RentalIssuance") {
      setCollectedAmount(Math.round(depositValue));
      setAlertMessage("Item Issued. Rental Period Started");
      setBookedStatus("Issued_Rental_Period");
      setAmontErrMassage(
        "Total Amount Not Equal to Damage Protection Charge & Please ensure to Save the Payment"
      );
      setBookingGenNo(paymentDetails.bookingRefNo);
    }
    if (paymentRequestFor === "Payment_PendingFor_NewBooking") {
      setCollectedAmount(Math.round(rentValue));
      setAlertMessage("Payment Submited Successfully and Order Booked");
      setBookedStatus("Booked");
      setAmontErrMassage(
        "Total Amount Not Equal to Rental Amount & Please ensure to Save the Payment"
      );
      setBookingGenNo(bookingRefID);
    }
    if (paymentRequestFor === "Payment_PendingFor_RentalReturn") {
      setCollectedAmount(CollectedAmount);
      setAlertMessage("Item Return Successfully");
      setBookedStatus("ProductReturned");
      setAmontErrMassage(
        "Total Amount Not Equal to Rental Return & Please ensure to Save the Payment"
      );
      setBookingGenNo(paymentDetails.bookingRefNo);
    }
  }, [
    rentValue,
    paymentRequestFor,
    depositValue,
    refundValue,
    bookingRefID,
    paymentDetails.bookingRefNo,
    CollectedAmount,
  ]);

  const AddPaymentRows = () => {
    setCount(count + 1);
    setAddPaymentRows([...addPaymentRows, count + 1]);
  };
  const SavePaymentRow = () => {
    if (!fileName || !amount) {
      alert("Please Fill All Details");
    } else {
      setPaymentRowId(paymentRowId + 1);
      const savePaymentDetails = {
        id: paymentRowId,
        amount: Math.round(amount),
        bookingRefId: parseInt(paymentDetails.bookingId),
        createDate: null,
        fileName: fileName,
        paymentFor: paymentRequestFor,
        paymentType: paymentType,
        txnRefNo: tnxRefNo,
        tempRefNo: paymentDetails.tempBookingRef,
        status: "Completed",
      };
      setSavePaymetRow([...savePaymetRow, savePaymentDetails]);
      setAddPaymentRows([]);
      setFileName("");
    }
  };

  const PaymentFileImage = (UploadFileName) => {
    const paymentUploadFile = {
      bookingRefId: bookingGenNo,
      contentFor: "newBooking",
      createdDate: currentDate,
      documentType: "PaymentDocument",
      fileName: UploadFileName,
      fileSize: `${fileUpload.size}`,
      fileType: `${fileUpload.type}`,
      fileURL: `${FetchImg}${UploadFileName}`,
      updatedDate: null,
    };
    console.log("paymentUploadFile==>", paymentUploadFile);
    axios
      .post(`${HOST_URL}/insert/image/details`, paymentUploadFile)
      .then((res) => res)
      .then((response) => {
        console.log("response==>", response.data);
        if (response.data.code === "1000") {
          alert("Uploaded Successfully");
        }
      })
      .catch((error) => {
        console.log("error==>", error);
        setLoading(false);
      });
  };

  const UploadPaymentFile = () => {
    if (fileUpload.length === 0) {
      alert("Please Upload Payment Receipt");
    } else {
      setLoading(true);
      const formData = new FormData();
      const fileExtention = fileUpload.name.split(".");
      const UploadFileName = `${paymentDetails.mobileNo}${currentDate}${RandomDigit}.${fileExtention[1]}`;
      setFileName(UploadFileName);
      formData.append("ImgName", UploadFileName);
      formData.append("files", fileUpload);
      axios
        .post(`${UploadImg}`, formData, {
          headers: ImageHeaders,
        })
        .then((res) => res)
        .then((response) => {
          console.log("response==>", response);
          if (response.data) {
            PaymentFileImage(UploadFileName);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log("error==>", error);
          setLoading(false);
        });
    }
  };
  const DeletePaymentRow = (id) => {
    const updatedData = savePaymetRow.filter((rowId) => rowId.id !== id);
    setSavePaymetRow(updatedData);
  };
  const TAmount = savePaymetRow.map((item) => item.amount);
  const SumOfTAmount = () => {
    let total = 0;
    for (let num of TAmount) total = total + num;
    return total;
  };
  let TotalAmount = SumOfTAmount();
  useEffect(() => {
    if (paymentRequestFor === "Payment_PendingFor_NewBooking") {
      setDocumentType("tncDocument");
    }
    if (paymentRequestFor === "Payment_PendingFor_RentalIssuance") {
      setDocumentType("KarigarQAReport");
    }
    if (paymentRequestFor === "Payment_PendingFor_RentalReturn") {
      setDocumentType("LoanClosureDocument");
    }
  }, [paymentRequestFor]);

  // VERIFY OTP
  const GetPhoneOTP = () => {
    setLoading(true);
    axios
      .get(`${HOST_URL}/get/mobile/otp/${paymentDetails.mobileNo}`)
      .then((res) => res)
      .then((response) => {
        console.log("GERoTP==>", response.data);
        if (response.data.code === "1000") {
          setOtp(response.data.otp);
          alert(
            `OTP has been sent your Register XXXX${paymentDetails.mobileNo.substring(
              6,
              10
            )}`
          );
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("error==>", error);
        setLoading(false);
      });
  };

  const VerifyOTP = () => {
    if (parseInt(Otp) === parseInt(inputOtp)) {
      alert("OTP verified successfully");
      setVerifiedOtp(true);
    } else {
      alert("Invalid OTP");
    }
  };

  const UpdateBookingFile = (printFileName) => {
    const updateBookingInput = {
      bookingRefId: bookingGenNo,
      contentFor: `${paymentRequestFor}`,
      createdDate: currentDate,
      documentType: !documentType ? dlrChalalnFileName : documentType,
      fileName: printFileName,
      fileSize: `${printFile.size}`,
      fileType: `${printFile.type}`,
      fileURL: `${FetchImg}${printFileName}`,
      updatedDate: null,
    };
    console.log("updateBookingInput==>", updateBookingInput);
    axios
      .post(`${HOST_URL}/insert/image/details`, updateBookingInput)
      .then((res) => res)
      .then((response) => {
        console.log("response==>", response.data);
        if (response.data.code === "1000") {
          alert("Uploaded Successfully");
        }
      })
      .catch((error) => {
        console.log("error==>", error);
        setLoading(false);
      });
  };

  // UPLOAD TNC FUNCTION
  const UploadPrintFile = () => {
    if (!printFile) {
      alert("Please Choose File");
    } else {
      setLoading(true);
      const formData = new FormData();
      const fileExtention = printFile.name.split(".");
      const printFileName = `${storeCode}-${paymentRequestFor}-${currentDate}-${RandomDigit}.${fileExtention[1]}`;
      setTnCFileName(printFileName);
      formData.append("ImgName", printFileName);
      formData.append("files", printFile);
      axios
        .post(`${UploadImg}`, formData, {
          headers: ImageHeaders,
        })
        .then((res) => res)
        .then((response) => {
          console.log("response==>", response);
          if (response.data) {
            UpdateBookingFile(printFileName);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log("error==>", error);
          setLoading(false);
        });
    }
  };
  // UPLOAD TNC FUNCTION
  const UploadDeliveryChallan = () => {
    if (deliveryChallan.length === 0) {
      alert("Please Choose File");
    } else {
      setLoading(true);
      const formData = new FormData();
      const fileExtention = deliveryChallan.name.split(".");
      const deliveryChallanFile = `${paymentRequestFor}-challan-${currentDate}-${RandomDigit}.${fileExtention[1]}`;
      formData.append("ImgName", deliveryChallanFile);
      formData.append("files", deliveryChallan);
      axios
        .post(`${UploadImg}`, formData, {
          headers: ImageHeaders,
        })
        .then((res) => res)
        .then((response) => {
          console.log("response==>", response);
          if (response.data) {
            setDlrChalalnFileName(deliveryChallanFile);
            alert("Uploaded Successfully");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log("error==>", error);
          setLoading(false);
        });
    }
  };

  const TnxStatusUpdate = (bookingId) => {
    axios
      .get(
        `${HOST_URL}/update/txn/status/${paymentDetails.bookingId}/${paymentRequestFor}`
      )
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          Swal.fire({
            title: "Success",
            text: alertMessage,
            icon: "success",
            confirmButtonColor: "#008080",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((error) => {
        console.log("error=>", error);
      });
  };

  const CompletePayment = () => {
    const submitPaymentData = {
      bookingRefNo: bookingGenNo,
      cashierName: cashierName,
      status: bookedStatus,
      tempRefNo: paymentDetails.tempBookingRef,
      tncFileName: tnCFileName,
    };
    console.log("submitPaymentData==>", submitPaymentData);
    axios
      .post(`${HOST_URL}/update/summary/table/atCashier`, submitPaymentData)
      .then((res) => res)
      .then((response) => {
        console.log("update/summary==>", response.data);
        if (response.data.code === "1000") {
          Swal.fire({
            title: "Success",
            text: alertMessage,
            icon: "success",
            confirmButtonColor: "#008080",
            confirmButtonText: "OK",
          });
          GetPyamentDetials();
          setPaymentDetails({});
          setGetPaymentData([]);
          setSavePaymetRow([]);
          setCashierName("");
          setVerifiedOtp(false);
          setPrintFile([]);
          setDeliveryChallan([]);
          setCollectedAmount(0);
          setVerifiedOtp(false);
        }
      })
      .then((error) => {
        console.log("error=>", error);
        setLoading(false);
      });
  };
  const CallPaymentAPI = () => {
    setLoading(true);
    axios
      .post(`${HOST_URL}/insert/payment/details`, savePaymetRow)
      .then((res) => res)
      .then((response) => {
        console.log("response==>", response.data);
        if (response.data.code === "1000") {
          if (paymentRequestFor === "Payment_PendingFor_NewBooking") {
            CompletePayment();
          } else {
            TnxStatusUpdate();
          }
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("error=>", error);
        setLoading(false);
      });
  };
  const SubmitPayment = () => {
    if (paymentRequestFor === "Payment_PendingFor_RentalCancellation") {
      CallPaymentAPI();
    } else {
      if (collectedAmount === parseInt(TotalAmount)) {
        CallPaymentAPI();
      } else {
        alert(amontErrMassage);
      }
    }
  };

  const SubmitPaymentDetails = () => {
    if (!cashierName) {
      alert("Please Enter Cashier Name");
    } else if (!tnCFileName) {
      alert("Please Upload Print File/PDF");
    } else if (!verifiedOtp) {
      alert("Please Verify OTP");
    } else {
      SubmitPayment();
    }
  };
  return (
    <div>
      <Navbar />
      {loading === true && <Loader />}
      <div className="row g-3 mt-3 mx-0">
        <div className="col-md-10">
          <input
            type="type"
            className="form-control"
            placeholder="Search By Customer Phone Number"
            maxLength={10}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="col-md-2 d-flex justify-content-end">
          <button
            type="button"
            className={`${searchValue.length < 10 ? "CDisabled" : "CButton"}`}
            disabled={searchValue.length < 10 ? true : false}
            onClick={GetPyamentDetials}
          >
            Search
          </button>
        </div>

        {getPaymentData.length > 0 && (
          <div className="table-responsive">
            <table className="table table-bordered border-dark text-center">
              <thead className="table-dark border-light">
                <tr>
                  <td>SELECT</td>
                  {PaymentHeading1.map((heading, i) => {
                    return <td key={i}>{heading}</td>;
                  })}
                </tr>
              </thead>
              <tbody>
                {getPaymentData.map((data, i) => {
                  return (
                    <tr key={i}>
                      <td className="text-center">
                        <input
                          className="form-check-input border-dark"
                          type="radio"
                          name="select"
                          onClick={() => OnSelectRow(data)}
                          // disabled={
                          //   paymentDetails.id !== data.id ? true : false
                          // }
                        />
                      </td>
                      <td>{data.customerName}</td>
                      <td>{data.mobileNo}</td>
                      <td>{data.paymentRequestFor}</td>
                      <td>
                        {Math.round(data.productValue).toLocaleString("en-IN")}
                      </td>
                      <td>
                        {Math.round(data.rentValue).toLocaleString("en-IN")}
                      </td>
                      <td>
                        {Math.round(data.depositValue).toLocaleString("en-IN")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {paymentDetails.bookingId && (
          <div className="row g-3 mt-3 mx-0">
            <div className="col-md-4 mt-0">
              <label className="form-label">
                <b>Damage Charges</b>
              </label>
              <h6>₹ {totalDamageCharges}</h6>
            </div>
            <div className="col-md-4 mt-0">
              <label className="form-label">
                <b>Penalty Charges</b>
              </label>
              <h6>₹ {totalPenaltyCharges}</h6>
            </div>
            <div className="col-md-4 mt-0">
              <label className="form-label">
                <b>Amount to be Collected/Refunded</b>
              </label>
              <h6>₹ {collectedAmount}</h6>
            </div>
            <div className="col-12 table-responsive mx-0">
              <table className="table table-bordered table-hover border-dark text-center">
                <thead className="table-dark border-light">
                  <tr>
                    {PaymentHeading2.map((heading, i) => {
                      return <td key={i}>{heading}</td>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {savePaymetRow.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td>{item.paymentFor}</td>
                        <td>{item.paymentType}</td>
                        <td>{item.txnRefNo}</td>
                        <td>{item.amount.toString()}</td>
                        <td className="d-flex justify-content-between">
                          {item.fileName}
                        </td>
                        <td>
                          <BsFillTrashFill
                            onClick={() => DeletePaymentRow(item.id)}
                            style={{ cursor: "pointer", color: "red" }}
                          />
                        </td>
                      </tr>
                    );
                  })}
                  {savePaymetRow.length > 0 && (
                    <tr>
                      <th colSpan="3" className="text-end">
                        TOTAL
                      </th>
                      <th>₹ {TotalAmount.toString()}</th>
                      <td colSpan="2" />
                    </tr>
                  )}
                  {addPaymentRows.length > 0 && (
                    <tr>
                      <td>{paymentRequestFor}</td>
                      <td>
                        <select
                          className="form-control"
                          onChange={(e) => setPaymentType(e.target.value)}
                        >
                          <option value="">Select Type</option>
                          <option value="Card">Card</option>
                          <option value="TEP">TEP</option>
                          <option value="NEFT">NEFT</option>
                          <option value="RTGS">RTGS</option>
                          <option value="Bank Transfer">Bank Transfer</option>
                        </select>
                      </td>
                      <td>
                        <input
                          className="form-control"
                          placeholder="Payment Ref No."
                          onChange={(e) => setTnxRefNo(e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Amount"
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </td>
                      <td className="d-flex">
                        <input
                          type="file"
                          onChange={(e) => setFileUpload(e.target.files[0])}
                          accept=".jpg, .jpeg, .png, .pdf"
                        />
                        <button
                          className="CButton mx-1"
                          onClick={UploadPaymentFile}
                        >
                          Upload
                        </button>
                      </td>
                      <td>
                        <BsFillTrashFill
                          onClick={() => setAddPaymentRows([])}
                          style={{ cursor: "pointer", color: "red" }}
                        />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-end mt-0">
              {addPaymentRows.length > 0 ? (
                <div className="d-flex justify-content-between w-100">
                  <b className="text-danger">
                    Note:- Please fill the all (*) marks filed
                  </b>
                  <button
                    type="submit"
                    className="CButton"
                    onClick={SavePaymentRow}
                  >
                    Save Payment
                  </button>
                </div>
              ) : (
                <div className="d-flex justify-content-between">
                  <button
                    type="submit"
                    className="CButton"
                    onClick={AddPaymentRows}
                  >
                    Add Payment
                  </button>
                </div>
              )}
            </div>
            {paymentRequestFor === "Payment_PendingFor_NewBooking" && (
              <div>
                <div className="col-12 mb-0">
                  <h6 className="bookingHeading d-flex justify-content-between">
                    <span className="mt-1">Print Booking Confirmation</span>
                    {addedPdts.length > 0 && (
                      <BookingPdf
                        savePaymetRow={savePaymetRow}
                        existedUserData={existedUserData}
                        addedPdts={addedPdts}
                        bookingRefID={bookingGenNo}
                        storeDetails={storeDetails}
                        regUserData={regUserData}
                      />
                    )}
                  </h6>
                </div>
                <div className="col-md-6 d-flex">
                  <input
                    type="file"
                    className="form-control mx-2"
                    accept=".jpg, .jpeg, .png"
                    onChange={(e) => setPrintFile(e.target.files[0])}
                  />
                  <button className="CButton" onClick={UploadPrintFile}>
                    Upload
                  </button>
                </div>
              </div>
            )}

            {paymentRequestFor === "Payment_PendingFor_RentalReturn" && (
              <div className="row g-2 mx-0">
                <div className="col-12 mb-0">
                  <h6 className="bookingHeading d-flex justify-content-between">
                    <span className="mt-1">Print - Service Invoice</span>
                    {addedPdts.length > 0 && (
                      <ServiceIvoicePdf
                        savePaymetRow={savePaymetRow}
                        existedUserData={existedUserData}
                        addedPdts={addedPdts}
                        bookingRefID={bookingGenNo}
                        storeDetails={storeDetails}
                        regUserData={regUserData}
                      />
                    )}
                  </h6>
                </div>
                <div className="col-md-5">
                  <label className="form-label">Upload Service Invoice</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setPrintFile(e.target.files[0])}
                  />
                </div>
                <div className="col-md-1">
                  <br />
                  <button
                    className="CButton mt-2 mx-1"
                    onClick={UploadPrintFile}
                  >
                    Upload
                  </button>
                </div>
                <div className="col-md-5">
                  <label className="form-label">Invoice</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setPrintFile(e.target.files[0])}
                  />
                </div>
                <div className="col-md-1">
                  <br />
                  <button
                    className="CButton mt-2 mx-1"
                    onClick={UploadPrintFile}
                  >
                    Upload
                  </button>
                </div>
              </div>
            )}

            {paymentRequestFor === "Payment_PendingFor_RentalIssuance" && (
              <div className="row g-2 mx-0">
                <div className="col-12 mb-0">
                  <h6 className="bookingHeading d-flex justify-content-between">
                    <span className="mt-1">Print - Delivery Challan</span>
                    {addedPdts.length > 0 && (
                      <DeliveryChallanPdf
                        savePaymetRow={savePaymetRow}
                        existedUserData={existedUserData}
                        addedPdts={addedPdts}
                        paymentDetails={paymentDetails}
                        storeDetails={storeDetails}
                        regUserData={regUserData}
                        bookingRefID={bookingGenNo}
                      />
                    )}
                  </h6>
                </div>
                <div className="input-group">
                  <div className="input-group-text">Loan Document Upload</div>
                  <input
                    type="file"
                    className="form-control"
                    accept=".jpg, .jpeg, .png, .pdf"
                    onChange={(e) => setPrintFile(e.target.files[0])}
                  />
                  <button className="CButton mx-1" onClick={UploadPrintFile}>
                    Upload
                  </button>
                </div>
                <div className="input-group">
                  <div className="input-group-text">
                    Acknowledged Delivery Challan
                  </div>
                  <input
                    type="file"
                    className="form-control"
                    accept=".jpg, .jpeg, .png, .pdf"
                    onChange={(e) => setDeliveryChallan(e.target.files[0])}
                  />
                  <button
                    className="CButton mx-1"
                    onClick={UploadDeliveryChallan}
                  >
                    Upload
                  </button>
                </div>
              </div>
            )}
            {paymentRequestFor === "Payment_PendingFor_RentalCancellation" && (
              <div>
                <div className="col-12 mb-0">
                  <h6 className="bookingHeading d-flex justify-content-between">
                    <span className="mt-1">Cancellation Invoice</span>
                    <CancelationPdf />
                  </h6>
                </div>
                <div className="col-md-6 d-flex">
                  <input
                    type="file"
                    className="form-control mx-2"
                    accept=".jpg, .jpeg, .png. pdf"
                    onChange={(e) => setPrintFile(e.target.files[0])}
                  />
                  <button className="CButton" onClick={UploadPrintFile}>
                    Upload
                  </button>
                </div>
              </div>
            )}

            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                placeholder="Cashier Name"
                onChange={(e) => setCashierName(e.target.value)}
              />
            </div>
            <div className="col-md-1">
              <button className="CButton" onClick={GetPhoneOTP}>
                GET_OTP
              </button>
            </div>
            {Otp && (
              <div className="col-md-6">
                {!verifiedOtp ? (
                  <div className="d-flex">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="OTP"
                      onChange={(e) => setInputOtp(e.target.value)}
                    />
                    <button className="CButton mx-2" onClick={VerifyOTP}>
                      Verify
                    </button>
                  </div>
                ) : (
                  <p className="phoneVeryfiedStyle">OTP is Verified</p>
                )}
              </div>
            )}
            <div className="col-12 d-flex justify-content-end mb-4">
              <button className="CButton" onClick={SubmitPaymentDetails}>
                {paymentRequestFor ===
                  "Payment_PendingFor_RentalCancellation" && (
                  <span>Cancel Booking</span>
                )}
                {paymentRequestFor === "Payment_PendingFor_RentalIssuance" && (
                  <span>Complete Product Delivery</span>
                )}
                {paymentRequestFor === "Payment_PendingFor_RentalReturn" && (
                  <span>Close Booking</span>
                )}
                {paymentRequestFor === "Payment_PendingFor_NewBooking" && (
                  <span>Complete Booking</span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CashierPaymentDetails;
