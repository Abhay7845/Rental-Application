import React, { useState } from "react";
import Navbar from "../common/Navbar";
import axios from "axios";
import { BsFillTrashFill } from "react-icons/bs";

const CashierPaymentDetails = () => {
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [singlePaymentData, setSinglePaymentData] = useState({});
  // PAYMENT DETAILS ROW
  const [depositTableId, setDepositTableId] = useState(0);
  const [depositAmountTableRow, setDepositAmountTableRow] = useState([]);
  const [depositType, setDepositType] = useState("");
  const [depositRefNmbr, setDepositRefNmbr] = useState("");
  const [depositAmont, setDepositAmont] = useState("");
  const [depositFile, setDepositFile] = useState("");
  const [addDipositRows, setAddDipositRows] = useState([]);
  const [depositRowCont, setDepositRowCont] = useState(0);

  const GetSearchPyamentDetials = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => res)
      .then((response) => setPaymentDetails(response.data))
      .catch((error) => {
        console.log("error=>", error);
      });
  };

  const OnSelectRow = (singleData) => {
    setSinglePaymentData(singleData);
  };
  console.log("singlePaymentData==>", singlePaymentData);

  const SaveRowTableDepositAmount = () => {
    setDepositTableId(depositTableId + 1);
    if (!depositType) {
      alert("Please Enter All Details");
    } else {
      const DepositeAmountTable = {
        id: depositTableId,
        depositType: depositType,
        refNumber: depositRefNmbr,
        depositAmount: depositAmont,
        depositFile: depositFile,
      };
      setDepositAmountTableRow([...depositAmountTableRow, DepositeAmountTable]);
      setAddDipositRows([]);
    }
  };

  // DEPOSITE ADD ROWS
  const AddRowTableDepositAmount = () => {
    setDepositRowCont(depositRowCont + 1);
    setAddDipositRows([...addDipositRows, depositRowCont + 1]);
  };

  const DeleteRowDepositAmount = (id) => {
    const updatedData = depositAmountTableRow.filter(
      (rowId) => rowId.id !== id
    );
    setDepositAmountTableRow(updatedData);
  };

  // DEPOSI AMOUNT FUNCTIONS
  const UploadDepositeFile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setDepositFile(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="mt-4 mx-2">
        <div className="row g-3 mx-0">
          <div className="col-md-11">
            <input
              type="type"
              className="form-control"
              placeholder="Search By Refrence ID"
              // value={phonePanValue.toUpperCase()}
              maxLength={10}
              // onChange={(e) => setPhonePanValue(e.target.value)}
            />
          </div>
          <div className="col-md-1 d-flex justify-content-end">
            <button
              type="button"
              // className={`${phonePanValue.length < 10 ? "CDisabled" : "CButton"}`}
              className="CButton"
              // disabled={phonePanValue.length < 10 ? true : false}
              onClick={GetSearchPyamentDetials}
            >
              Search
            </button>
          </div>
          {paymentDetails.length > 0 && (
            <div className="col-12 table-responsive mx-0">
              <table className="table table-bordered table-hover border-dark">
                <thead className="table-dark border-light">
                  <tr>
                    <th>Select</th>
                    <th>Image</th>
                    <th>Std Wt</th>
                    <th>Std UCP</th>
                    <th>Std_Rental_Value</th>
                    <th>Std_Deposit_Value</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentDetails.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td className="text-center">
                          <input
                            className="form-check-input border-dark"
                            type="radio"
                            name="select"
                            onClick={() => OnSelectRow(item)}
                          />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.phone}</td>
                        <td>{item.email}</td>
                        <td>{item.website}</td>
                        <td>{item.address.city}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          <div className="col-12">
            <h6 className="bookingHeading">Booking Amount Payment Details</h6>
            <div className="table-responsive">
              <table
                id="booking-payment-details"
                className="table table-bordered table-hover border-dark"
              >
                <thead className="table-dark border-light">
                  <tr>
                    <th>Payment For</th>
                    <th>Payment Type</th>
                    <th>Payment_Ref_No.</th>
                    <th>Amount</th>
                    <th>Amount Doc</th>
                  </tr>
                </thead>
                <tbody>
                  {depositAmountTableRow.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td>{item.depositType}</td>
                        <td>{item.refNumber}</td>
                        <td>{item.refNumber}</td>
                        <td>{item.depositAmount}</td>
                        <td className="d-flex justify-content-between">
                          <img
                            src={item.depositFile}
                            alt="depositFile"
                            className="imageStyle"
                          />
                          <BsFillTrashFill
                            className="DeleteRow"
                            onClick={() => DeleteRowDepositAmount(item.id)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                  {depositAmountTableRow.length > 0 && (
                    <tr>
                      <th colSpan="3" className="text-end">
                        Total Deposit Amount Paid
                      </th>
                      <th>12</th>
                      <th colSpan="1" />
                    </tr>
                  )}
                  {addDipositRows.length > 0 &&
                    addDipositRows.map((i) => {
                      return (
                        <tr key={i}>
                          <td>
                            <input type="number" placeholder="Payment For" />
                          </td>
                          <th>
                            <select
                              className="w-100"
                              onChange={(e) => setDepositType(e.target.value)}
                            >
                              <option>Select Type</option>
                              <option value="Creadit1">Creadit1</option>
                              <option value="Creadit2">Creadit2</option>
                            </select>
                          </th>
                          <th>
                            <input
                              type="text"
                              placeholder="Ref Number"
                              className="w-100"
                              onChange={(e) =>
                                setDepositRefNmbr(e.target.value)
                              }
                            />
                          </th>
                          <th>
                            <input
                              type="number"
                              placeholder="Amount"
                              className="w-100"
                              onChange={(e) => setDepositAmont(e.target.value)}
                            />
                          </th>
                          <th className="d-flex justify-content-between">
                            <input type="file" onChange={UploadDepositeFile} />
                            <BsFillTrashFill
                              className="DeleteRow mt-2"
                              onClick={() => setAddDipositRows([])}
                            />
                          </th>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-0">
            {addDipositRows.length > 0 ? (
              <button
                type="submit"
                className="CButton"
                onClick={SaveRowTableDepositAmount}
              >
                Save Row
              </button>
            ) : (
              <button
                type="submit"
                className="CButton"
                onClick={AddRowTableDepositAmount}
              >
                Add Row
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashierPaymentDetails;
