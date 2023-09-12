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
import PaymentTnCPdf from "../Pdf/PaymentTnCPdf";
import moment from "moment/moment";

const CashierPaymentDetails = () => {
  const [loading, setLoading] = useState(false);
  const storeCode = localStorage.getItem("storeCode");
  const currentDate = moment().format("YYYY-MM-DD");
  const RandomDigit = Math.floor(100000 + Math.random() * 900000);
  const bookingRefID = `${storeCode}-R-${currentDate}-${RandomDigit}`;
  const [searchValue, setSearchValue] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({});
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
  const [tnCfile, setTnCfile] = useState("");
  const [tnCFileName, setTnCFileName] = useState("");
  const [cashierName, setCashierName] = useState("");
  console.log("tnCFileName===>", tnCFileName);
  console.log("cashierName===>", cashierName);

  const GetPyamentDetials = () => {
    setLoading(true);
    axios
      .get(`${HOST_URL}/get/payment/request/details/for/cashier/${searchValue}`)
      .then((res) => res)
      .then((response) => {
        console.log("response==>", response.data);
        if (response.data.code === "1000") {
          setPaymentDetails(response.data.value);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("error==>", error);
        setLoading(false);
      });
  };

  const AddPaymentRows = () => {
    setCount(count + 1);
    setAddPaymentRows([...addPaymentRows, count + 1]);
  };
  const SavePaymentRow = () => {
    // if (!fileName) {
    //   alert("Please Upload File");
    // } else {
    setPaymentRowId(paymentRowId + 1);
    const savePaymentDetails = {
      // id: paymentRowId,
      amount: parseFloat(amount),
      bookingId: parseInt(paymentDetails.bookingId),
      createDate: null,
      fileName: fileName,
      paymentFor: paymentDetails.paymentRequestFor,
      paymentType: paymentType,
      txnRefNo: tnxRefNo,
      tempRefNo: paymentDetails.tempBookingRef,
      status: "Completed",
    };
    setSavePaymetRow([...savePaymetRow, savePaymentDetails]);
    setAddPaymentRows([]);
    setFileName("");
    // }
  };

  const PaymentFileImage = (UploadFileName) => {
    const paymentUploadFile = {
      bookingRefId: bookingRefID,
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
  const TotalAmount = SumOfTAmount();

  const UpdateBookingFile = (tncFileName) => {
    const updateBookingInput = {
      bookingRefId: bookingRefID,
      contentFor: "newBooking",
      createdDate: currentDate,
      documentType: "tncDocument",
      fileName: tncFileName,
      fileSize: `${tnCfile.size}`,
      fileType: `${tnCfile.type}`,
      fileURL: `${FetchImg}${tncFileName}`,
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
  const UploadTnCFile = () => {
    if (!tnCfile) {
      alert("Please Choose File");
    } else {
      setLoading(true);
      const formData = new FormData();
      const fileExtention = tnCfile.name.split(".");
      const tncFileName = `tnc${paymentDetails.mobileNo}${currentDate}${RandomDigit}.${fileExtention[1]}`;
      setTnCFileName(tncFileName);
      formData.append("ImgName", tncFileName);
      formData.append("files", tnCfile);
      axios
        .post(`${UploadImg}`, formData, {
          headers: ImageHeaders,
        })
        .then((res) => res)
        .then((response) => {
          console.log("response==>", response);
          if (response.data) {
            UpdateBookingFile(tncFileName);
            document.getElementById("tncFile").value = "";
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log("error==>", error);
          setLoading(false);
        });
    }
  };

  const SubmitPayment = () => {
    if (parseInt(paymentDetails.rentValue) === TotalAmount) {
      setLoading(true);
      console.log("savePaymetRow==>", savePaymetRow);
      axios
        .post(`${HOST_URL}/insert/payment/details`, savePaymetRow)
        .then((res) => res)
        .then((response) => {
          console.log("response==>", response.data);
          if (response.data.code === "1000") {
            Swal.fire({
              title: "Success",
              text: "Payment Submited Successfully",
              icon: "success",
              confirmButtonColor: "#008080",
              confirmButtonText: "OK",
            });
            setSavePaymetRow([]);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log("error=>", error);
          setLoading(false);
        });
    } else {
      alert("Total Amount Not Equal to Rental Amount");
    }
  };
  const SubmitPaymentDetails = () => {
    const submitPaymentData = {
      bookingRefNo: bookingRefID,
      cashierName: cashierName,
      status: "bookinCompleted",
      tempRefNo: paymentDetails.tempBookingRef,
      tncFileName: tnCFileName,
    };
    console.log("submitPaymentData===>", submitPaymentData);
    if (!cashierName) {
      alert("Please Enter Cashier Name");
    }
    if (!tnCFileName) {
      alert("Please Upload T&C File");
    } else {
      axios
        .post(`${HOST_URL}/update/summary/table/atCashier`, submitPaymentData)
        .then((res) => res)
        .then((response) => {
          console.log("response==>", response.data);
          if (response.data.code === "1000") {
            Swal.fire({
              title: "Success",
              text: "Payment Saved Successfully",
              icon: "success",
              confirmButtonColor: "#008080",
              confirmButtonText: "OK",
            });
            setAddPaymentRows([]);
            setPaymentDetails({});
            setCashierName("");
          }
        })
        .then((error) => {
          console.log("error=>", error);
          setLoading(false);
        });
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
            placeholder="Search By Phone Number"
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
        <div className="col-12 table-responsive mx-0">
          <table className="table table-bordered table-hover border-dark">
            <thead className="table-dark border-light">
              <tr>
                {PaymentHeading1.map((heading, i) => {
                  return <td key={i}>{heading}</td>;
                })}
              </tr>
            </thead>
            {paymentDetails.pdtId && (
              <tbody>
                <tr>
                  <td>{paymentDetails.pdtId}</td>
                  <td>{paymentDetails.customerName}</td>
                  <td>{paymentDetails.mobileNo}</td>
                  <td>{paymentDetails.paymentRequestFor}</td>
                  <td>{paymentDetails.productValue}</td>
                  <td>{paymentDetails.rentValue}</td>
                  <td>{paymentDetails.depositValue}</td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
        <div className="col-12 table-responsive mx-0">
          <table className="table table-bordered table-hover border-dark">
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
                      <BsFillTrashFill
                        className="DeleteRow"
                        onClick={() => DeletePaymentRow(item.id)}
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
                  <th>{TotalAmount.toString()}</th>
                  <td colSpan="1" />
                </tr>
              )}
              {addPaymentRows.length > 0 && (
                <tr>
                  <td>
                    <BsFillTrashFill
                      className="DeleteRow"
                      style={{ marginTop: "-5px" }}
                      onClick={() => setAddPaymentRows([])}
                    />
                    {paymentDetails.paymentRequestFor}
                  </td>
                  <td>
                    <select
                      className="form-control"
                      onChange={(e) => setPaymentType(e.target.value)}
                    >
                      <option value="">Select Type</option>
                      <option value="Card">Card</option>
                      <option value="Credit Note">Credit Note</option>
                      <option value="TEP">TEP</option>
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
                      className="form-control"
                      onChange={(e) => setFileUpload(e.target.files[0])}
                      accept=".jpg, .jpeg, .png"
                    />
                    <button
                      className="CButton mx-1"
                      onClick={UploadPaymentFile}
                    >
                      Upload
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-end mt-0">
          {addPaymentRows.length > 0 ? (
            <button type="submit" className="CButton" onClick={SavePaymentRow}>
              Save Payment
            </button>
          ) : (
            <div className="d-flex justify-content-between">
              <button
                type="submit"
                className="CButton mx-2"
                onClick={AddPaymentRows}
              >
                Add Payment
              </button>
              {savePaymetRow.length > 0 && (
                <button
                  type="submit"
                  className="CButton"
                  onClick={SubmitPayment}
                >
                  Submit Payment
                </button>
              )}
            </div>
          )}
        </div>
        <div className="col-12 mb-0">
          <h6 className="bookingHeading d-flex justify-content-between">
            <span className="mt-1">Print Terms & Condition</span>
            <PaymentTnCPdf />
          </h6>
        </div>
        <div className="col-md-6 d-flex">
          <input
            type="file"
            id="tncFile"
            className="form-control mx-2"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => setTnCfile(e.target.files[0])}
          />
          <button className="CButton" onClick={UploadTnCFile}>
            Upload
          </button>
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Cashier Name"
            onChange={(e) => setCashierName(e.target.value)}
          />
        </div>
        <div className="col-12 d-flex justify-content-end mb-4">
          <button className="CButton" onClick={SubmitPaymentDetails}>
            Save Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CashierPaymentDetails;
