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
import { UploadImg } from "../../API/HostURL";
import { BsFillTrashFill } from "react-icons/bs";
import PaymentTnCPdf from "../Pdf/PaymentTnCPdf";

const CashierPaymentDetails = () => {
  const [loading, setLoading] = useState(false);
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
  const miliSecond = new Date().getUTCMilliseconds();
  // TERMS AND CONDITION FILE UPLOAD
  const [tnCfile, setTnCfile] = useState("");
  const [tnCFileName, setTnCFileName] = useState("");
  console.log("tnCFileName==>", tnCFileName);

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
    if (!fileName) {
      Swal.fire("Please Upload File");
    } else {
      setPaymentRowId(paymentRowId + 1);
      const savePaymentDetails = {
        id: paymentRowId,
        amount: parseInt(amount),
        bookingRefId: "",
        createDate: "2023-09-08T06:54:32.865Z",
        fileName: fileName,
        paymentFor: paymentDetails.paymentRequestFor,
        paymentType: paymentType,
        txnRefNo: tnxRefNo,
      };
      setSavePaymetRow([...savePaymetRow, savePaymentDetails]);
      setAddPaymentRows([]);
      setFileName("");
    }
  };

  console.log("savePaymetRow==>", savePaymetRow);

  const UploadFile = () => {
    setLoading(true);
    const formData = new FormData();
    const fileExtention = fileUpload.name.split(".");
    const UploadFileName = `${paymentType}${miliSecond}.${fileExtention[1]}`;
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
          Swal.fire({
            title: "File Uploaded Successfully",
            icon: "success",
            confirmButtonColor: "green",
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

  // UPLOAD TNC FUNCTION
  const UploadTnCFile = () => {
    if (!tnCfile) {
      alert("Please Choose File");
    } else {
      setLoading(true);
      const formData = new FormData();
      const fileExtention = tnCfile.name.split(".");
      const tncFileName = `${paymentType}${miliSecond}.${fileExtention[1]}`;
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
            Swal.fire({
              title: "File Uploaded Successfully",
              icon: "success",
              confirmButtonColor: "green",
              confirmButtonText: "OK",
            });
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
    setLoading(true);
    console.log("savePaymetRow==>", savePaymetRow);
    axios
      .post(`${HOST_URL}/insert/payment/details`, savePaymetRow)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          console.log("response==>", response);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("error=>", error);
        setLoading(false);
      });
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
            placeholder="Search By Refrence ID"
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
                    <td>{item.paymentFor}</td>
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
                  <th>{SumOfTAmount()}</th>
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
                    />
                    <button className="CButton mx-1" onClick={UploadFile}>
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
            onChange={(e) => setTnCfile(e.target.files[0])}
          />
          <button className="CButton" onClick={UploadTnCFile}>
            Upload
          </button>
        </div>
        <div className="col-12 d-flex justify-content-end mb-4">
          <button className="CButton">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default CashierPaymentDetails;
