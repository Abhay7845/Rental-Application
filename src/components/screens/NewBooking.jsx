import React, { useState } from "react";
import Navbar from "../common/Navbar";
import { BsFillTrashFill } from "react-icons/bs";
import moment from "moment";
import { packageDays } from "../../Data/DataList";
import jsPDF from "jspdf";
import "jspdf-autotable";
// <img src={imageUrl} alt="Preview" height="100px" width="200px" />

const NewBooking = () => {
  const [itemDetailsId, setItemDetailsId] = useState(0);

  // ITEMS DETAILS ADD ROWS
  const [itemRowCont, setItemRowCont] = useState(0);
  const [addItemDetails, setAddItemDetails] = useState([]);

  // ITEMS DETAILS SET INPUT VALUE
  const [itemCode, setItemCode] = useState("");
  const [lotNumber, setLotNumber] = useState("");
  const [CFANCode, setCFANCode] = useState("");
  const [grossWeight, setGrossWeight] = useState("");
  const [productValue, setProductValue] = useState("");
  const [rentalAmount, setRentalAmount] = useState("");
  const [depositAmount, setDepositAmount] = useState("");

  // ITEM DETAILS TABLE
  const [itemDetailsTableRow, setItemDetailsTableRow] = useState([]);
  // DEPOSITE ADD ROWS
  const [depositTableId, setDepositTableId] = useState(0);
  const [depositRowCont, setDepositRowCont] = useState(0);
  const [addDipositRows, setAddDipositRows] = useState([]);

  // DEPOSIT AMOUNT DETAILS INPUT VALUE
  const [depositType, setDepositType] = useState("");
  const [depositRefNmbr, setDepositRefNmbr] = useState("");
  const [depositAmont, setDepositAmont] = useState("");
  const [depositFile, setDepositFile] = useState("");
  // DEPOSIT AMOUNT DETAILS TABLE
  const [depositAmountTableRow, setDepositAmountTableRow] = useState([]);

  // ITEMS DETAILS ADD REOWS
  const AddRowTableItemDetails = () => {
    setItemRowCont(itemRowCont + 1);
    setAddItemDetails([...addItemDetails, itemRowCont + 1]);
  };
  // DEPOSITE ADD ROWS
  const AddRowTableDepositAmount = () => {
    setDepositRowCont(depositRowCont + 1);
    setAddDipositRows([...addDipositRows, itemRowCont + 1]);
  };

  // SAVE ITEM DETAILS
  const SaveItemsDetails = () => {
    if (!itemCode) {
      alert("Please Enter All Details");
    } else {
      setItemDetailsId(itemDetailsId + 1);
      const ItemDetailTable = {
        id: itemDetailsId,
        itemCode: itemCode,
        lotNumber: lotNumber,
        CFANCode: CFANCode,
        grossWeight: grossWeight,
        productValue: productValue,
        rentalAmount: rentalAmount,
        depositAmont: depositAmount,
      };
      setItemDetailsTableRow([...itemDetailsTableRow, ItemDetailTable]);
      setAddItemDetails([]);
    }
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

  const DeleteRowsItemDetails = (id) => {
    const updatedData = itemDetailsTableRow.filter((rowId) => rowId.id !== id);
    setItemDetailsTableRow(updatedData);
  };

  const DeleteRowDepositAmount = (id) => {
    const updatedData = depositAmountTableRow.filter(
      (rowId) => rowId.id !== id
    );
    setDepositAmountTableRow(updatedData);
  };
  const currentDate = new Date();
  const bookingDate = moment(currentDate).format("l");

  // PRINT PrintAcknowledgement FUNCTION

  const PrintAcknowledgement = async () => {
    const doc = new jsPDF({
      orientation: "landscape",
    });
    doc.text("Items Details", 15, 10);
    doc.autoTable({ html: "#item-details-table" });
    doc.autoTable({ html: "#booking-payment-details" });
    doc.save("BookingDetails.pdf");
  };
  return (
    <div>
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
              placeholder="Search By Phone or PAN"
            />
          </div>
          <div className="col-md-1 d-flex justify-content-end">
            <button type="button" className="CButton">
              Search
            </button>
          </div>
          <div className="col-12">
            <h6 className="bookingHeading mb-0">Customer Details</h6>
          </div>
          <div className="col-md-4">
            <label className="form-label">Customer Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Customer Name"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Phone Number</label>
            <input
              type="number"
              className="form-control"
              placeholder="Phone Number"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" placeholder="Email" />
          </div>
          <div className="col-12">
            <h6 className="bookingHeading mb-0">Customer Address</h6>
          </div>
          <div className="col-md-6">
            <label className="form-label">Address Line-1</label>
            <textarea
              type="text"
              className="form-control"
              placeholder="Address Line-1"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Address Line-2</label>
            <textarea
              type="text"
              className="form-control"
              placeholder="Address Line-2"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">State</label>
            <input type="text" className="form-control" placeholder="State" />
          </div>
          <div className="col-md-4">
            <label className="form-label">City</label>
            <input type="text" className="form-control" placeholder="City" />
          </div>
          <div className="col-md-4">
            <label className="form-label">Pin Code</label>
            <input
              type="number"
              className="form-control"
              placeholder="Pin Code"
            />
          </div>
          <div className="col-12">
            <h6 className="bookingHeading">Customer Address</h6>
          </div>
          <div className="col-md-6">
            <label className="form-label">Addeess ID Proof Type</label>
            <select className="form-control">
              <option>Select Type</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Customer Type</label>
            <select className="form-control">
              <option>Select Type</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="col-md-4 d-flex justify-content-center">
            <h5>Image will come from DB</h5>
          </div>
          <div className="col-md-4 d-flex justify-content-center">
            <h5>Image will come from DB</h5>
          </div>
          <div className="col-md-4 d-flex justify-content-center">
            <h5>Image will come from DB</h5>
          </div>
          <div className="col-12 d-flex">
            <label className="form-label">With in Catchment?</label>
            <div className="mx-3">
              <input
                className="form-check-input"
                type="radio"
                name="catchment"
                defaultChecked
              />
              <label className="form-check-label mx-1">YES</label>
            </div>
            <div>
              <input
                className="form-check-input"
                type="radio"
                name="catchment"
                defaultChecked
              />
              <label className="form-check-label mx-1">NO</label>
            </div>
          </div>
          <div className="col-md-6">
            <label className="form-label">Rent Start Date</label>
            <input type="date" className="form-control" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Package Days</label>
            <select className="form-control">
              <option>Select Days</option>
              {packageDays.map((days, i) => {
                return (
                  <option key={i} value={days}>
                    {days}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-12">
            <h6 className="bookingHeading">Item Details</h6>
            <div className="table-responsive">
              <table
                id="item-details-table"
                className="table table-bordered table-hover border-dark"
              >
                <thead className="table-dark border-light">
                  <tr>
                    <th>Item Code</th>
                    <th>Lot No.</th>
                    <th>CFA Code</th>
                    <th>Gross_Weight</th>
                    <th>Product_Value</th>
                    <th>Rental_Amount</th>
                    <th>Deposit_Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {itemDetailsTableRow.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td>{item.itemCode}</td>
                        <td>{item.lotNumber}</td>
                        <td>{item.CFANCode}</td>
                        <td>{item.grossWeight}</td>
                        <td>{item.productValue}</td>
                        <td>{item.rentalAmount}</td>
                        <td className="d-flex justify-content-between">
                          {item.depositAmont} 12
                          <BsFillTrashFill
                            className="DeleteRow"
                            onClick={() => DeleteRowsItemDetails(item.id)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                  {itemDetailsTableRow.length > 0 && (
                    <tr className="text-bold">
                      <th colSpan="4" className="text-end">
                        TOTAL
                      </th>
                      <th>234</th>
                      <th>124</th>
                      <th>678</th>
                    </tr>
                  )}
                  {addItemDetails.length > 0 && (
                    <tr>
                      <td>
                        <input
                          type="text"
                          placeholder="Item Code"
                          onChange={(e) => setItemCode(e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          placeholder="Lot Number"
                          disabled
                          onChange={(e) => setLotNumber(e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          disabled
                          placeholder="CFA Code"
                          onChange={(e) => setCFANCode(e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          disabled
                          placeholder="Gross Weight"
                          onChange={(e) => setGrossWeight(e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          disabled
                          placeholder="Product Value"
                          onChange={(e) => setProductValue(e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          disabled
                          placeholder="Rental Amount"
                          onChange={(e) => setRentalAmount(e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          disabled
                          placeholder="Deposit Amount"
                          onChange={(e) => setDepositAmount(e.target.value)}
                        />
                      </td>
                      <td className="text-center">
                        <BsFillTrashFill
                          className="DeleteRow"
                          onClick={() => setAddItemDetails([])}
                        />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-0">
            {addItemDetails.length > 0 ? (
              <button
                type="submit"
                className="CButton mt-3"
                onClick={SaveItemsDetails}
              >
                Save Row
              </button>
            ) : (
              <button
                type="submit"
                className="CButton"
                onClick={AddRowTableItemDetails}
              >
                Add Row
              </button>
            )}
          </div>
          <div className="col-12">
            <h6 className="bookingHeading">Booking Amount Payment Details</h6>
            <div className="table-responsive">
              <table
                id="booking-payment-details"
                className="table table-bordered table-hover border-dark"
              >
                <thead className="table-dark border-light">
                  <tr>
                    <th>Type</th>
                    <th>Reference_No.</th>
                    <th>Amount</th>
                    <th>View</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {depositAmountTableRow.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td>{item.depositType}</td>
                        <td>{item.refNumber}</td>
                        <td>{item.depositAmount}</td>
                        <td className="text-center">
                          <img
                            src={item.depositFile}
                            alt="depositFile"
                            className="imageStyle"
                          />
                        </td>
                        <td className="text-center">
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
                      <td colSpan="2" className="text-end">
                        Total Deposit Amount Paid
                      </td>
                      <td>
                        <input
                          type="text"
                          value={6}
                          className="w-100"
                          disabled
                        />
                      </td>
                      <td colSpan="2" />
                    </tr>
                  )}
                  {addDipositRows.length > 0 &&
                    addDipositRows.map((i) => {
                      return (
                        <tr key={i}>
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
                          <th>
                            <input type="file" onChange={UploadDepositeFile} />
                          </th>
                          <th className="text-center">
                            <BsFillTrashFill
                              className="DeleteRow"
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
          <div className="col-12 d-flex">
            <label className="form-label">Terms & Conditions Agree</label>
            <div className="mx-3">
              <input
                className="form-check-input"
                type="radio"
                name="t&c"
                defaultChecked
              />
              <label className="form-check-label mx-1">YES</label>
            </div>
            <div>
              <input
                className="form-check-input"
                type="radio"
                name="t&c"
                defaultChecked
              />
              <label className="form-check-label mx-1">NO</label>
            </div>
          </div>
          <div className="col-md-6">
            <input type="file" className="form-control" />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Cashier Name"
            />
          </div>
          <div className="col-md-12">
            <h6 className="bookingHeading">Print Booking Acknowledgement</h6>
          </div>
          <div className="d-flex justify-content-end mb-4">
            <button
              type="button"
              className="CButton mx-2"
              onClick={PrintAcknowledgement}
            >
              Print
            </button>
          </div>
          <div className="d-flex justify-content-end mb-4">
            <button type="button" className="CButton mx-2">
              NEXT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBooking;
