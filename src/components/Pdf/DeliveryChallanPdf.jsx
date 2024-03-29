import React, { useRef } from "react";
import { DeliveryListHearders } from "../Pdf/PDFHearders";
import { useReactToPrint } from "react-to-print";
import moment from "moment";

const DeliveryChallanPdf = (props) => {
  const DeliveryChalanRef = useRef(null);
  const DeliveryChalanPDF = useReactToPrint({
    content: () => DeliveryChalanRef.current,
  });
  const {
    savePaymetRow,
    existedUserData,
    addedPdts,
    paymentDetails,
    storeDetails,
    regUserData,
    challanNo,
  } = props;
  const CutometProfileNo = addedPdts.map((data) => data.custId);

  // TOTAL BOOKING CHARGES
  const TDamagValue = addedPdts.map((item) => parseInt(item.depositAmount));
  const SumOfDamagCharge = () => {
    let total = 0;
    for (let data of TDamagValue) total = total + data;
    return total;
  };
  const TBasePrive = addedPdts.map((item) => parseInt(item.productValue));
  const SumOfBasePrice = () => {
    let total = 0;
    for (let num of TBasePrive) total = total + num;
    return total;
  };
  const TAmount = savePaymetRow.map((item) => parseInt(item.amount));
  const SumOfSaveAmount = () => {
    let total = 0;
    for (let num of TAmount) total = total + num;
    return total;
  };
  const bookingDate = regUserData.map((data) => data.bookingDate);
  const rentalDate = regUserData.map((data) => data.rentalDate);

  const DateOfPic = addedPdts.map((date) => date.rentStartDate);
  const packageDays = addedPdts.map((date) => date.packageDays);

  const getReturnDate = () => {
    const nextDate = new Date(DateOfPic[0]);
    nextDate.setDate(nextDate.getDate() + parseInt(packageDays[0] - 1));
    return nextDate;
  };

  return (
    <div>
      <div>
        <button
          onClick={DeliveryChalanPDF}
          className="CButton"
        // className={savePaymetRow.length > 0 ? "CButton" : "CDisabled"}
        // disabled={savePaymetRow.length > 0 ? false : true}
        >
          Print
        </button>
        <style>
          {`
          @media screen{
            .hide-on-screen{
              display:none;
            }
          }
            @page {
              size: A4;
              margin:15mm;
              margin-top:35mm;
              margin-bottom:52mm;
            }
            }
          `}
        </style>
        <div
          className="table-container hide-on-screen"
          ref={DeliveryChalanRef}
          style={{ marginTop: "16%" }}
        >
          <h6 className="text-center mb-2">
            <b>Delivery Challan Cum Damage Protection Amount</b>
          </h6>
          <table
            className="table table-bordered table-styles border-dark"
            style={{ fontSize: "10px" }}
          >
            <tbody>
              <tr>
                <td rowSpan="2" colSpan="2" style={{ width: "13%" }}>
                  <div className="text-center mt-4">
                    <b className="mt-2">
                      Store Address:- {storeDetails.storeAddress}
                    </b>
                  </div>
                </td>
                <td colSpan="3">
                  <div className="d-flex flex-row justify-content-between">
                    <div className="d-flex flex-column">
                      <b>Challan No:-{challanNo}</b>
                      <b>Booking Ref No:-{paymentDetails.bookingRefNo}</b>
                    </div>
                    <div
                      className="d-flex flex-column"
                      style={{ marginRight: "15%" }}
                    >
                      <b>Challan Date: {moment().format("DD-MM-YYYY")}</b>
                      <b>
                        Rental Start Date:
                        {moment(rentalDate[0]).format("DD-MM-YYYY")}
                      </b>
                      <b>
                        Booking Date:
                        {moment(bookingDate[0]).format("DD-MM-YYYY")}
                      </b>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  <div className="d-flex flex-row justify-content-between">
                    <div className="d-flex flex-column">
                      <b>GST NO:-{storeDetails.gstin}</b>
                      <b>State:-{storeDetails.state}</b>
                      <b>Place of Supply:-{storeDetails.city}</b>
                    </div>
                    <div
                      className="d-flex flex-column"
                      style={{ marginRight: "14%" }}
                    >
                      <b className="mx-5">PAN:-{storeDetails.gstin}</b>
                      <b className="mx-5">
                        State Code: {storeDetails.stateCode}
                      </b>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="5">
                  <div className="d-flex flex-row justify-content-between">
                    <div className="d-flex flex-column">
                      <b>Bill To:</b>
                      <b>
                        Customer Name:-
                        {existedUserData.customerName.toUpperCase()}
                      </b>
                      <b>
                        Address 1:-
                        {existedUserData.customerAddress1.toUpperCase()}
                      </b>
                      <b>
                        Address 2:-
                        {existedUserData.customerAddress2.toUpperCase()}
                      </b>
                      <b>PinCode:-{existedUserData.customerCityPincode}</b>
                      <b>Mobile No:- +91 {existedUserData.mobileNo}</b>
                    </div>
                    <div
                      className="d-flex flex-column"
                      style={{ marginRight: "13.5%" }}
                    >
                      <b>Customer Profile No.: {CutometProfileNo[0]}</b>
                      <b>PAN:-{existedUserData.panCardNo}</b>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="5">
                  <b>ITEM DETAILS</b>
                  <div className="table">
                    <table className="table table-bordered inner-table border-dark text-center">
                      <thead>
                        <tr>
                          {DeliveryListHearders.map((heading, i) => {
                            return <th key={i}>{heading}</th>;
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {addedPdts.map((item, i) => {
                          return (
                            <tr key={i}>
                              <th>{i + 1}</th>
                              <th>{item.itemCode}</th>
                              <th>{item.lotNo}</th>
                              <th>{item.description}</th>
                              <th>{item.grossWt}</th>
                              <th>{item.deliveredWt}</th>
                              <th>{item.packageDays}</th>
                              <th className="text-end">
                                {new Intl.NumberFormat("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                  minimumFractionDigits: 2,
                                }).format(item.productValue)}
                              </th>
                              <th className="text-end">
                                {new Intl.NumberFormat("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                  minimumFractionDigits: 2,
                                }).format(item.depositAmount)}
                              </th>
                            </tr>
                          );
                        })}
                        <tr className="text-end">
                          <th colSpan="7">TOTAL</th>
                          <th>
                            {new Intl.NumberFormat("en-IN", {
                              style: "currency",
                              currency: "INR",
                              minimumFractionDigits: 2,
                            }).format(SumOfBasePrice())}
                          </th>
                          <th>
                            {new Intl.NumberFormat("en-IN", {
                              style: "currency",
                              currency: "INR",
                              minimumFractionDigits: 2,
                            }).format(SumOfDamagCharge())}
                          </th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="4" style={{ width: "60%" }}>
                  {savePaymetRow.length > 0 && (
                    <table className="table table-bordered border-dark text-center">
                      <thead>
                        <tr className="text-start">
                          <th colSpan="6">Payment Details</th>
                        </tr>
                        <tr className="text-center">
                          <th>SR.No</th>
                          <th>Amount Type</th>
                          <th>Payment Mode</th>
                          <th>DOC No.</th>
                          <th>Date</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {savePaymetRow.map((item, i) => {
                          return (
                            <tr key={i}>
                              <th>{i + 1}</th>
                              <th>
                                {item.paymentFor ===
                                  "Payment_PendingFor_RentalIssuance"
                                  ? "Damge Protection Charge"
                                  : ""}
                              </th>
                              <th>{item.paymentType}</th>
                              <th>{item.txnRefNo}</th>
                              <th>{moment().format("DD-MM-YYYY")}</th>
                              <th className="text-end">
                                {new Intl.NumberFormat("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                  minimumFractionDigits: 2,
                                }).format(item.amount)}
                              </th>
                            </tr>
                          );
                        })}
                        {savePaymetRow.length > 0 && (
                          <tr className="text-end">
                            <th colSpan="5">TOTAL</th>
                            <th>
                              {new Intl.NumberFormat("en-IN", {
                                style: "currency",
                                currency: "INR",
                                minimumFractionDigits: 2,
                              }).format(SumOfSaveAmount())}
                            </th>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  )}
                </td>
              </tr>
              <tr>
                <td colSpan="5">
                  <b>
                    Date of Return:-
                    {moment(getReturnDate()).format("DD-MM-YYYY")}
                  </b>
                </td>
              </tr>
              <tr>
                <td colSpan="5" className="text-center">
                  <b>
                    We hereby certify that our registration certificate under
                    the Central Goods and Services Tax Act, 2017 is in force on
                    the date on which the supply of the goods/services specified
                    in this tax invoice is made by us and that the transaction
                    of the sale covered by this tax Invoice/ Advance receipt
                    voucher has been effected by us and it shall be accounted
                    for in the turnover of supplies/advances while filing of
                    return and the due tax, if any payable on the supply has
                    been paid or shall be paid
                  </b>
                </td>
              </tr>
              <tr>
                <td colSpan="5">
                  <div className="d-flex justify-content-between">
                    <div>
                      <b>For Titan Company Limited</b>
                      <h6 className="mt-4">(Authorized Signatory)</h6>
                    </div>
                    <div>
                      <b>
                        Customer Name :
                        {existedUserData.customerName.toUpperCase()}
                      </b>
                      <h6 className="mt-4">
                        Customer Signature : ..............................
                      </h6>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="5" className="text-center">
                  <b>
                    "Titan Company Limited Regd & Corporate Office: CIN : .
                    Website: www.titancompany.in Contact Number: 1800-266-0123
                    Thank you for shopping at Titan Company. You can also write
                    to us at customercare@titan.co.in " E & OE
                  </b>
                </td>
              </tr>
              <tr>
                <td colSpan="5" className="text-center">
                  <b>
                    For terms and conditions including late fee and product
                    handling or damage charges, please refer: T&C section in
                    booking confirmation document.
                  </b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DeliveryChallanPdf;
