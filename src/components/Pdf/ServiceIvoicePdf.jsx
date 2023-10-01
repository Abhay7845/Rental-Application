import React, { useRef } from "react";
import { ServiveInvoicePdfHeaders } from "../Pdf/PDFHearders";
import { useReactToPrint } from "react-to-print";
import TitanLogo from "../../Asset/Img/TitanLog.png";
import moment from "moment";

const ServiceIvoicePdf = (props) => {
  const ServiceInvoiceRef = useRef(null);
  const ServiceInvoicePDF = useReactToPrint({
    content: () => ServiceInvoiceRef.current,
  });

  const {
    addedPdts,
    bookingRefID,
    existedUserData,
    storeDetails,
    regUserData,
  } = props;

  const bookingDate = regUserData.map((data) => data.bookingDate);

  const RefacotorData = addedPdts.map((data) => {
    return {
      actualWtReturn: data.actualWtReturn,
      bookingRefId: data.bookingRefId,
      cfa: data.cfa,
      custId: data.custId,
      customerName: data.customerName,
      deliveredWt: data.deliveredWt,
      depositAmount: data.depositAmount,
      description: data.description,
      grossWt: data.grossWt,
      id: data.id,
      itemCode: data.itemCode,
      itemPriceId: data.itemPriceId,
      lotNo: data.lotNo,
      mobileNo: data.mobileNo,
      netWt: data.netWt,
      noOfPc: data.noOfPc,
      packageDays: data.packageDays,
      pdtId: data.pdtId,
      productHUID: data.productHUID,
      productValue: parseInt(data.productValue),
      rateId: data.rateId,
      refId: data.refId,
      rentStartDate: data.rentStartDate,
      rentalAmount: parseInt(data.rentalAmount),
      tempBookingRefNo: data.tempBookingRefNo,
      sgst: (parseInt(data.rentalAmount) * 9) / 100,
      csgst: (parseInt(data.rentalAmount) * 9) / 100,
    };
  });
  // RENTAL CHARGES + LATE FEE +DAMGA CHARGE -DISCOUNT = TOTAL CHARGES

  // SGST = (TOTAL CHARGES *9)/100
  // CGST = (TOTAL CHARGES *9)/100
  // TOTAL =TOTAL CHARGES + SGST +CGST

  // TOTAL REFUND  AMOUNT =TOTAL AMOUNT PAID - TOTAL CHARGES

  return (
    <div>
      <div>
        <button onClick={ServiceInvoicePDF} className="CButton">
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
          `}
        </style>
        <div className="table-container hide-on-screen" ref={ServiceInvoiceRef}>
          <h6 className="text-center mb-2">
            <b>SERVICE INVOICE</b>
          </h6>
          <table
            className="table table-bordered table-styles border-dark"
            style={{ fontSize: "10px" }}
          >
            <tbody>
              <tr>
                <td rowSpan="2" colSpan="2" style={{ width: "30%" }}>
                  <div className="d-flex flex-column">
                    <b className="text-center my-2">
                      <img src={TitanLogo} alt="" width="45" height="45" />
                    </b>
                    <b>Store Address: - {storeDetails.storeAddress}</b>
                  </div>
                </td>
                <td colSpan="3">
                  <div className="d-flex flex-row">
                    <div className="d-flex flex-column">
                      <b>Invoice No: ACGFRDGG1235</b>
                      <b>Booking Ref No: {bookingRefID}</b>
                    </div>
                    <div className="d-flex flex-column mx-5">
                      <b className="mx-5">
                        Invoice Date:-{moment().format("DD-MM-YYYY")}
                      </b>
                      <b className="mx-5">
                        Booking Date:-
                        {moment(bookingDate[0]).format("DD-MM-YY")}
                      </b>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  <div className="d-flex flex-row">
                    <div className="d-flex flex-column">
                      <b>GST NO:-{storeDetails.gstin}</b>
                      <b>State:-{storeDetails.state}</b>
                      <b>Place of Supply:-{storeDetails.city}</b>
                    </div>
                    <div
                      className="d-flex flex-column"
                      style={{ marginLeft: "17%" }}
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
                      <b>Bill To: </b>
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
                        {existedUserData.customerAddress1.toUpperCase()}
                      </b>
                      <b>PinCode:-{existedUserData.customerCityPincode}</b>
                      <b>Mobile No: +91 {existedUserData.mobileNo}</b>
                    </div>
                    <div
                      className="d-flex flex-column"
                      style={{ marginRight: "10.5%" }}
                    >
                      <b>Customer Profile No.:-{existedUserData.custId}</b>
                      <b>PAN: {existedUserData.panCardNo}</b>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="5">
                  <b>ITEM DETAILS</b>
                  <div className="table">
                    <table className="table table-bordered inner-table border-dark">
                      <thead>
                        <tr>
                          {ServiveInvoicePdfHeaders.map((heading, i) => {
                            return <th key={i}>{heading}</th>;
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {RefacotorData.map((item, i) => {
                          return (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td>{item.itemCode}</td>
                              <td>{item.lotNo}</td>
                              <td>{item.description}</td>
                              <td>{item.grossWt}</td>
                              <td>0</td>
                              <td>{item.packageDays}</td>
                              <td>
                                {Math.round(item.rentalAmount).toLocaleString(
                                  "en-IN"
                                )}
                              </td>
                              <td>N/A</td>
                              <td>N/A</td>
                              <td>0</td>
                              <td>N/A</td>
                              <td>N/A</td>
                              <td>N/A</td>
                              <td>N/A</td>
                            </tr>
                          );
                        })}
                        <tr className="text-bold">
                          <th colSpan="5" className="text-end">
                            TOTAL
                          </th>
                          <th>38765</th>
                          <th>-</th>
                          <th>34589</th>
                          <th>34589</th>
                          <th>34589</th>
                          <th>-</th>
                          <th>47,919</th>
                          <th>4,312</th>
                          <th>4,312</th>
                          <th>4,312</th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="4" style={{ width: "40%" }}>
                  <table className="table table-bordered border-dark">
                    <thead>
                      <tr>
                        <th colSpan="6">Payment Details:</th>
                      </tr>
                      <tr>
                        <th>Sr.No</th>
                        <th>Payment Type</th>
                        <th>Payment Mode</th>
                        <th>DOC No.</th>
                        <th>Date</th>
                        <th>Amount(Rs)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>1</th>
                        <th>Card</th>
                        <th>RTGS/NEFT</th>
                        <th>-</th>
                        <th>Aug-01</th>
                        <th>700</th>
                      </tr>
                      <tr>
                        <th colSpan="5" className="text-end">
                          TOTAL
                        </th>
                        <th>3456</th>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td colSpan="4" style={{ width: "40%" }}>
                  <table className="table table-bordered border-dark">
                    <thead>
                      <tr>
                        <th colSpan="6">Total Amount Details</th>
                      </tr>
                      <tr>
                        <th>Total Amount Paid</th>
                        <th>Total charges</th>
                        <th>Total Refund</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>1234</th>
                        <th>4345</th>
                        <th>3456</th>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td colSpan="5" className="text-center">
                  <b>
                    The refund, if any, will be credited to your preffered Bank
                    Account within 5 days.
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

export default ServiceIvoicePdf;
