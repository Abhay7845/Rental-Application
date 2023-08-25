import React, { useState, useEffect } from "react";
import Navbar from "../common/Navbar";
import { BsFillTrashFill } from "react-icons/bs";
import moment from "moment";
import { ImageHeaders, packageDayOption, phonePan } from "../../Data/DataList";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";
import { HOST_URL } from "../../API/HostURL";
import Loader from "../common/Loader";
import { FetchImg } from "../../API/HostURL";

const NewBooking = () => {
  const [phonePanValue, setPhonePanValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [existedUserData, setExistedUserData] = useState({});
  const [itemDetailsId, setItemDetailsId] = useState(0);
  let [secuanceNo, setSecuanceNo] = useState(1);
  console.log("existedUserData==>", existedUserData);

  // NEW BOOKING USER INOPUTS VALUES
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerAddress1, setCustomerAddress1] = useState("");
  const [customerAddress2, setCustomerAddress2] = useState("");
  const [customerCity, setCustomerCity] = useState("");
  const [customerType, setCustomerType] = useState("");
  const [customerPinCode, setCustomerPinCode] = useState("");
  const [custonerIdNo, setCustonerIdNo] = useState("");
  const [packageDays, setPackageDays] = useState("");
  const [termCondition, setTermCondition] = useState("NO");
  const [withinCatchment, setWithinCatchment] = useState("");
  console.log("termCondition==>", termCondition);
  console.log("withinCatchment==>", withinCatchment);

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

  // FETCH CUSOMER UPLPAD IMAGE
  const [panImageUrl, setPanImgUrl] = useState("");

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

  // SEARCH ALLREDY EXISTING USER
  const paramType = !phonePanValue
    ? ""
    : phonePanValue[0].match(phonePan)
    ? "pancard"
    : "mobileNo";

  const FetchUserDetails = () => {
    setLoading(true);
    axios
      .get(`${HOST_URL}/rental/customer/details/${paramType}/${phonePanValue}`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setExistedUserData(response.data.value);
        } else if (response.data.code === "1001") {
          setExistedUserData({});
          alert("Data Not Found");
        }
        setLoading(false);
      })
      .then((error) => {
        console.log("error==>", error);
        setLoading(false);
      });
  };
  useEffect(() => {
    if (existedUserData.addressProofFileName) {
      axios
        .get(`${FetchImg}=${existedUserData.addressProofFileName}`, {
          headers: ImageHeaders,
        })
        .then((res) => res)
        .then((response) => {
          console.log("responseFetch==>", response.data);
          if (response.data) {
            setPanImgUrl(response.data);
          }
        })
        .catch((error) => console.log("error=>", error));
    }
  }, [existedUserData.addressProofFileName]);

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
  const bookingDate = moment(currentDate).format("YYYY-MM-DD");

  // UPDATE CUSTOMER TYPE
  useEffect(() => {
    if (existedUserData.custId && customerType) {
      setLoading(true);
      axios
        .get(
          `${HOST_URL}/update/customer/type/${existedUserData.custId}/${bookingDate}/${customerType}`
        )
        .then((res) => res)
        .then((response) => {
          if (response.data.code === "1000") {
            console.log("respons==>", response.data);
          }
          if (response.data.code === "1004") {
            console.log(response.data.value);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log("error=>", error);
          setLoading(false);
        });
    }
  }, [customerType, bookingDate, existedUserData.custId]);

  // WITHIN IN CATCHMENT OR NOT API CALIING
  useEffect(() => {
    if (existedUserData.customerCityPincode) {
      axios
        .get(
          `${HOST_URL}/rental/new/booking/catchments/MAMTHA/${existedUserData.customerCityPincode}`
        )
        .then((res) => res)
        .then((response) => {
          console.log("response==>", response.data.value);
          if (response.data.code === "1000") {
            setWithinCatchment(response.data.value[0]);
          }
        })
        .catch((error) => {
          console.log("error=>", error);
        });
    }
  }, [existedUserData.customerCityPincode]);

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

  // BOOKING YUOR PRODUCTS
  const BookYorProduct = () => {
    setSecuanceNo(secuanceNo + 1);
    const booingYear = currentDate.getFullYear();
    secuanceNo = (secuanceNo % 10000).toString().padStart(4, "0");
    console.log("secuanceNo==>", `MAMTHA-R-${booingYear}-${secuanceNo}`);
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
          <div className="col-md-3">
            <label className="form-label">Customer Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Customer Name"
              value={
                existedUserData.customerName
                  ? existedUserData.customerName
                  : customerName
              }
              disabled={existedUserData.customerName ? true : false}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Phone Number</label>
            <input
              type="number"
              className="form-control"
              placeholder="Phone Number"
              value={
                existedUserData.mobileNo
                  ? existedUserData.mobileNo
                  : customerPhone
              }
              disabled={existedUserData.mobileNo ? true : false}
              onChange={(e) => setCustomerPhone(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={
                existedUserData.emailId
                  ? existedUserData.emailId
                  : customerEmail
              }
              disabled={existedUserData.emailId ? true : false}
              onChange={(e) => setCustomerEmail(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Customer Type</label>
            <select
              className="form-control"
              onChange={(e) => setCustomerType(e.target.value)}
              disabled={!existedUserData.custId ? true : false}
            >
              <option value="">Select Type</option>
              <option value="purple">Purple</option>
              <option value="nonPurple">Non Purple</option>
              <option value="newCustomer">New Customer</option>
            </select>
          </div>
          <div className="col-12">
            <h6 className="bookingHeading mb-0">Customer Address</h6>
          </div>
          <div className="col-md-6">
            <label className="form-label">City</label>
            <input
              type="text"
              className="form-control"
              placeholder="City"
              value={
                existedUserData.customerCity
                  ? existedUserData.customerCity
                  : customerCity
              }
              disabled={existedUserData.customerCity ? true : false}
              onChange={(e) => setCustomerCity(e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Address Line-1</label>
            <textarea
              type="text"
              rows={1}
              className="form-control"
              placeholder="Address Line-1"
              value={
                existedUserData.customerAddress1
                  ? existedUserData.customerAddress1
                  : customerAddress1
              }
              disabled={existedUserData.customerAddress1 ? true : false}
              onChange={(e) => setCustomerAddress1(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Address Line-2</label>
            <textarea
              type="text"
              rows={1}
              className="form-control"
              placeholder="Address Line-2"
              value={
                existedUserData.customerAddress2
                  ? existedUserData.customerAddress2
                  : customerAddress2
              }
              disabled={existedUserData.customerAddress2 ? true : false}
              onChange={(e) => setCustomerAddress2(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Pin Code</label>
            <input
              type="number"
              className="form-control"
              placeholder="Pin Code"
              value={
                existedUserData.customerCityPincode
                  ? existedUserData.customerCityPincode
                  : customerPinCode
              }
              disabled={existedUserData.customerCityPincode ? true : false}
              onChange={(e) => setCustomerPinCode(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">ID Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="ID Number"
              value={
                existedUserData.addressProofIdNo
                  ? existedUserData.addressProofIdNo
                  : custonerIdNo
              }
              disabled={existedUserData.addressProofIdNo ? true : false}
              onChange={(e) => setCustonerIdNo(e.target.value)}
            />
          </div>
          {panImageUrl && (
            <div className="col-md-6 d-flex justify-content-center">
              <img
                src={`data:image/jpeg;base64,${panImageUrl}`}
                alt=""
                width="170"
                height="95"
              />
            </div>
          )}
          <div className="col-12 d-flex">
            <label className="form-label">With in Catchment?</label>
            <div className="mx-3">
              <input
                className="form-check-input border-dark"
                type="radio"
                name="catchment"
                defaultChecked
                onClick={() => setWithinCatchment("YES")}
              />
              <label className="form-check-label mx-1">YES</label>
            </div>
            <div>
              <input
                className="form-check-input border-dark"
                type="radio"
                name="catchment"
                defaultChecked
                onClick={() => setWithinCatchment("NO")}
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
                      <td className="d-flex">
                        <input
                          type="number"
                          disabled
                          placeholder="Deposit Amount"
                          onChange={(e) => setDepositAmount(e.target.value)}
                        />
                        <BsFillTrashFill
                          className="DeleteRow mx-1 mt-2"
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
                    <th>Product_Image</th>
                  </tr>
                </thead>
                <tbody>
                  {depositAmountTableRow.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td>{item.depositType}</td>
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
                      <th colSpan="2" className="text-end">
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
          <div className="col-12 d-flex">
            <label className="form-label">Terms & Conditions Agree</label>
            <div className="mx-3">
              <input
                className="form-check-input border-dark"
                type="radio"
                name="t&c"
                defaultChecked
                onClick={() => setTermCondition("YES")}
              />
              <label className="form-check-label mx-1">YES</label>
            </div>
            <div>
              <input
                className="form-check-input border-dark"
                type="radio"
                name="t&c"
                defaultChecked
                onClick={() => setTermCondition("NO")}
              />
              <label className="form-check-label mx-1">NO</label>
            </div>
          </div>
          <div className="col-12 mb-0">
            <h6 className="bookingHeading d-flex justify-content-between">
              Print Booking Acknowledgement & Upload
              <span className="printButtonStyle" onClick={PrintAcknowledgement}>
                Print
              </span>
            </h6>
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
          <div className="d-flex justify-content-end mb-4">
            <button
              type="button"
              className="CButton mx-2"
              onClick={BookYorProduct}
            >
              BOOK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBooking;
