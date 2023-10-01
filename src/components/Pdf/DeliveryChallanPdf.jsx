import React, { useRef } from "react";
import { DeliveryListHearders } from "../../Data/DataList";
import { useReactToPrint } from "react-to-print";
import TitanLogo from "../../Asset/Img/TitanLog.png";
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
  } = props;
  const CutometProfileNo = addedPdts.map((data) => data.custId);

  // TOTAL BOOKING CHARGES
  const TDamagValue = addedPdts.map((item) => parseInt(item.depositAmount));
  const SumOfDamagCharge = () => {
    let total = 0;
    for (let data of TDamagValue) total = total + data;
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
        <button onClick={DeliveryChalanPDF} className="CButton">
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
            }
           @media print {
            .space-in-pdf {
              margin-right: 20mm; 
            }
             .space-in-pdf-two {
              margin-right: 28mm;
          }
            }
          `}
        </style>
        <div className="table-container hide-on-screen" ref={DeliveryChalanRef}>
          <h6 className="text-center mb-2">
            <b>Delivery Challan Cum Damage Protection Amount</b>
          </h6>
          <table
            className="table table-bordered table-styles border-dark"
            style={{ fontSize: "10px" }}
          >
            <tbody>
              <tr>
                <td rowSpan="2" colSpan="2" style={{ width: "20%" }}>
                  <div className="d-flex flex-column">
                    <b className="text-center my-2">
                      <img src={TitanLogo} alt="" width="45" height="45" />
                    </b>
                    <b>Store Address:- {storeDetails.storeAddress}</b>
                  </div>
                </td>
                <td colSpan="3">
                  <div className="d-flex flex-row justify-content-between">
                    <div className="d-flex flex-column">
                      <b>Challan No:-{paymentDetails.bookingRefNo}-D</b>
                      <b>Booking Ref No:-{paymentDetails.bookingRefNo}</b>
                    </div>
                    <div className="d-flex flex-column space-in-pdf">
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
                    <div className="d-flex flex-column space-in-pdf-two">
                      <b>PAN:-{storeDetails.pan}</b>
                      <b>State Code:-{storeDetails.StateCode}</b>
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
                    <div className="d-flex flex-column">
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
                              <td>{i + 1}</td>
                              <td>{item.itemCode}</td>
                              <td>{item.lotNo}</td>
                              <td>{item.description}</td>
                              <td>{item.grossWt}</td>
                              <td>{item.deliveredWt}</td>
                              <td>{item.packageDays}</td>
                              <td>0</td>
                              <td>
                                {Math.round(item.depositAmount).toLocaleString(
                                  "en-IN"
                                )}
                              </td>
                            </tr>
                          );
                        })}
                        <tr className="text-bold">
                          <th colSpan="7" className="text-end">
                            TOTAL
                          </th>
                          <th>₹ 0</th>
                          <th>
                            ₹
                            {Math.round(SumOfDamagCharge()).toLocaleString(
                              "en-IN"
                            )}
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
                    <table className="table table-bordered border-dark">
                      <thead>
                        <tr>
                          <th colSpan="6">Payment Details:</th>
                        </tr>
                        <tr>
                          <th>Sr.No</th>
                          <th>Amount Type</th>
                          <th>Payment Mode</th>
                          <th>DOC No.</th>
                          <th>Date</th>
                          <th>Amount(Rs)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {savePaymetRow.map((item, i) => {
                          return (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td>
                                {item.paymentFor ===
                                "Payment_PendingFor_Issuance"
                                  ? "Damge Protection Charge"
                                  : ""}
                              </td>
                              <td>{item.paymentType}</td>
                              <td>{item.txnRefNo}</td>
                              <td>{moment().format("DD-MM-YYYY")}</td>
                              <td>
                                {item.amount.toString().toLocaleString("en-IN")}
                              </td>
                            </tr>
                          );
                        })}
                        {savePaymetRow.length > 0 && (
                          <tr>
                            <th colSpan="5" className="text-end">
                              TOTAL
                            </th>
                            <th>
                              ₹
                              {Math.round(SumOfSaveAmount()).toLocaleString(
                                "en-In"
                              )}
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
                      <b>Customer Name : Abhay Aryan</b>
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
                    handling or damage charges, please refer: T&C section
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
