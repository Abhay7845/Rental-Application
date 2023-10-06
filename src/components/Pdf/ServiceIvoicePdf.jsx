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
    savePaymetRow,
    paymentDetails,
  } = props;
  const { totalDepositAmountPaidWithTax } = paymentDetails;

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
      lateFee: data.penaltyCharges === "" ? 0 : parseInt(data.penaltyCharges),
      damageCharges:
        data.damageCharges === "" ? 0 : parseInt(data.damageCharges),
      discountAmount: 0,
    };
  });
  const RefacotorTableData = RefacotorData.map((data) => {
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
      lateFee: data.lateFee,
      damageCharges: data.damageCharges,
      discountAmount: 0,
      totalChages: Math.round(
        data.rentalAmount +
          data.lateFee +
          data.damageCharges -
          data.discountAmount
      ).toLocaleString("en-IN"),
      sgst: parseFloat(
        (
          ((data.rentalAmount +
            data.lateFee +
            data.damageCharges -
            data.discountAmount) *
            9) /
          100
        ).toLocaleString("en-IN")
      ),
      cgst: parseFloat(
        (
          ((data.rentalAmount +
            data.lateFee +
            data.damageCharges -
            data.discountAmount) *
            9) /
          100
        ).toLocaleString("en-IN")
      ),
      totalAmount: (
        (data.rentalAmount +
          data.lateFee +
          data.damageCharges -
          data.discountAmount) *
        1.18
      ).toLocaleString("en-IN"),
    };
  });

  console.log("RefacotorTableData==>", RefacotorTableData);

  const TBasePrise = RefacotorTableData.map((data) => data.productValue);
  const SumOfBasePrise = () => {
    let total = 0;
    for (let num of TBasePrise) total = total + num;
    return total;
  };

  const TRentalAmont = RefacotorTableData.map((data) => data.rentalAmount);
  const SumOfTRentalAmont = () => {
    let total = 0;
    for (let num of TRentalAmont) total = total + num;
    return total;
  };

  const TLateFee = RefacotorTableData.map((data) => data.lateFee);
  const SumOfTLateFee = () => {
    let total = 0;
    for (let num of TLateFee) total = total + num;
    return total;
  };
  const TDamageCharges = RefacotorTableData.map((data) => data.damageCharges);
  const SumOfTDamageCharges = () => {
    let total = 0;
    for (let num of TDamageCharges) total = total + num;
    return total;
  };
  const TDiscountAmount = RefacotorTableData.map((data) => data.discountAmount);
  const SumOfTDiscountAmount = () => {
    let total = 0;
    for (let num of TDiscountAmount) total = total + num;
    return total;
  };

  const TTotalChages = RefacotorTableData.map((data) =>
    parseInt(data.totalChages.replace(/,/g, ""))
  );
  const SumOfTTotalChages = () => {
    let total = 0;
    for (let num of TTotalChages) total = total + num;
    return total;
  };

  const TSgst = RefacotorTableData.map((data) => data.sgst);
  const SumOfTSgst = () => {
    let total = 0;
    for (let num of TSgst) total = total + num;
    return total;
  };

  const TCgst = RefacotorTableData.map((data) => data.cgst);
  const SumOfTCgst = () => {
    let total = 0;
    for (let num of TCgst) total = total + num;
    return total;
  };

  const TTotalAmount = RefacotorTableData.map((data) =>
    parseFloat(data.totalAmount.replace(/,/g, ""))
  );
  const SumOfTTotalAmount = () => {
    let total = 0;
    for (let num of TTotalAmount) total = total + num;
    return total;
  };

  const TAmount = savePaymetRow.map((item) => parseInt(item.amount));
  const SumOfSaveAmount = () => {
    let total = 0;
    for (let num of TAmount) total = total + num;
    return total;
  };

  const TotalRefund =
    totalDepositAmountPaidWithTax + SumOfTTotalAmount() - SumOfTTotalAmount();

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
                      <b>Pin Code:-{existedUserData.customerCityPincode}</b>
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
                    <table className="table table-bordered inner-table border-dark text-center">
                      <thead>
                        <tr>
                          {ServiveInvoicePdfHeaders.map((heading, i) => {
                            return <th key={i}>{heading}</th>;
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {RefacotorTableData.map((item, i) => {
                          return (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td>{item.itemCode}</td>
                              <td>{item.lotNo}</td>
                              <td>{item.description}</td>
                              <td>{item.grossWt}</td>
                              <td>{item.packageDays}</td>
                              <td>
                                {item.productValue.toLocaleString("en-IN")}
                              </td>
                              <td>
                                {Math.round(item.rentalAmount).toLocaleString(
                                  "en-IN"
                                )}
                              </td>
                              <td>{item.lateFee}</td>
                              <td>{item.damageCharges}</td>
                              <td>{item.discountAmount}</td>
                              <td>{item.totalChages}</td>
                              <td>{item.sgst}</td>
                              <td>{item.cgst}</td>
                              <td>{item.totalAmount}</td>
                            </tr>
                          );
                        })}
                        <tr>
                          <th colSpan="6" className="text-end">
                            TOTAL
                          </th>
                          <th>₹{SumOfBasePrise().toLocaleString("en-IN")}</th>
                          <th>
                            ₹{SumOfTRentalAmont().toLocaleString("en-IN")}
                          </th>
                          <th>₹{SumOfTLateFee().toLocaleString("en-IN")}</th>
                          <th>
                            ₹{SumOfTDamageCharges().toLocaleString("en-IN")}
                          </th>
                          <th>
                            ₹{SumOfTDiscountAmount().toLocaleString("en-IN")}
                          </th>
                          <th>
                            ₹{SumOfTTotalChages().toLocaleString("en-IN")}
                          </th>
                          <th>₹{SumOfTSgst().toLocaleString("en-IN")}</th>
                          <th>₹{SumOfTCgst().toLocaleString("en-IN")}</th>
                          <th>
                            ₹{SumOfTTotalAmount().toLocaleString("en-IN")}
                          </th>
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
                        <th colSpan="6">Payment Details</th>
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
                      {savePaymetRow.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>
                              {item.paymentFor ===
                              "Payment_PendingFor_RentalReturn"
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
                        <th>
                          ₹
                          {(
                            totalDepositAmountPaidWithTax + SumOfTTotalAmount()
                          ).toLocaleString("en-IN")}
                        </th>
                        <th>₹{SumOfTTotalAmount().toLocaleString("en-IN")}</th>
                        <th>₹{TotalRefund.toLocaleString("en-IN")}</th>
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
                    been paid or shall be paid.
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
                        Customer Name :-
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
