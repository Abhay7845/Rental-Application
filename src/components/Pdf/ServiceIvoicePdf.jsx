import React, { useRef } from "react";
import { ServiveInvoicePdfHeaders } from "../Pdf/PDFHearders";
import { useReactToPrint } from "react-to-print";
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
    previousTnxData,
    invoiceNo,
  } = props;

  const bookingDate = regUserData.map((data) => data.bookingDate);
  const PaymentDetails = [...previousTnxData, ...savePaymetRow];
  console.log("PaymentDetails==>", PaymentDetails);

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

  const TAmount = PaymentDetails.map((item) => parseFloat(item.amount));
  console.log("TAmount==>", TAmount);
  const SumOfSaveAmount = () => {
    let total = 0;
    for (let num of TAmount) total = total + num;
    return total;
  };

  const TotalRefund = SumOfSaveAmount() - SumOfTTotalAmount();

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
              margin:15mm;
              margin-bottom:48mm;
            }
          `}
        </style>
        <div
          className="table-container hide-on-screen"
          ref={ServiceInvoiceRef}
          style={{ marginTop: "16%" }}
        >
          <h6 className="text-center mb-2">
            <b>SERVICE INVOICE</b>
          </h6>
          <table
            className="table table-bordered table-styles border-dark"
            style={{ fontSize: "9px" }}
          >
            <tbody>
              <tr>
                <td rowSpan="2" colSpan="2" style={{ width: "20%" }}>
                  <div className="text-center mt-4">
                    <b className="mt-2">
                      Store Address:- {storeDetails.storeAddress}
                    </b>
                  </div>
                </td>
                <td colSpan="3">
                  <div className="d-flex flex-row">
                    <div className="d-flex flex-column">
                      <b>Invoice No: {invoiceNo}</b>
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
                      style={{ marginLeft: "26%" }}
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
                      style={{ marginRight: "17%" }}
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
                        <tr style={{ fontSize: "7px", fontWeight: "bold" }}>
                          {ServiveInvoicePdfHeaders.map((heading, i) => {
                            return <th key={i}>{heading}</th>;
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {RefacotorTableData.map((item, i) => {
                          return (
                            <tr
                              key={i}
                              style={{ fontSize: "6.5px", fontWeight: "bold" }}
                            >
                              <td>{i + 1}</td>
                              <td>{item.itemCode}</td>
                              <td>{item.lotNo}</td>
                              <td>{item.description}</td>
                              <td>{item.grossWt}</td>
                              <td>{item.packageDays}</td>
                              <td className="text-end">
                                {item.productValue.toLocaleString("en-IN")}
                              </td>
                              <td className="text-end">
                                {item.rentalAmount.toLocaleString("en-IN")}
                              </td>
                              <td className="text-end">{item.lateFee}</td>
                              <td className="text-end">{item.damageCharges}</td>
                              <td className="text-end">
                                {item.discountAmount}
                              </td>
                              <td className="text-end">{item.totalChages}</td>
                              <td className="text-end">{item.sgst}</td>
                              <td className="text-end">{item.cgst}</td>
                              <td className="text-end">{item.totalAmount}</td>
                            </tr>
                          );
                        })}
                        <tr
                          className="text-end"
                          style={{ fontSize: "7px", fontWeight: "bold" }}
                        >
                          <th colSpan="6">TOTAL</th>
                          <th>
                            {new Intl.NumberFormat("en-IN", {
                              style: "currency",
                              currency: "INR",
                              minimumFractionDigits: false,
                            }).format(SumOfBasePrise())}
                          </th>
                          <th>
                            {new Intl.NumberFormat("en-IN", {
                              style: "currency",
                              currency: "INR",
                              minimumFractionDigits: false,
                            }).format(SumOfTRentalAmont())}
                          </th>
                          <th>
                            {new Intl.NumberFormat("en-IN", {
                              style: "currency",
                              currency: "INR",
                              minimumFractionDigits: false,
                            }).format(SumOfTLateFee())}
                          </th>
                          <th>
                            {new Intl.NumberFormat("en-IN", {
                              style: "currency",
                              currency: "INR",
                              minimumFractionDigits: false,
                            }).format(SumOfTDamageCharges())}
                          </th>
                          <th>
                            {new Intl.NumberFormat("en-IN", {
                              style: "currency",
                              currency: "INR",
                              minimumFractionDigits: false,
                            }).format(SumOfTDiscountAmount())}
                          </th>
                          <th>
                            {new Intl.NumberFormat("en-IN", {
                              style: "currency",
                              currency: "INR",
                              minimumFractionDigits: false,
                            }).format(SumOfTTotalChages())}
                          </th>
                          <th>
                            {new Intl.NumberFormat("en-IN", {
                              style: "currency",
                              currency: "INR",
                              minimumFractionDigits: 2,
                            }).format(SumOfTSgst())}
                          </th>
                          <th>
                            {new Intl.NumberFormat("en-IN", {
                              style: "currency",
                              currency: "INR",
                              minimumFractionDigits: 2,
                            }).format(SumOfTCgst())}
                          </th>
                          <th>
                            {new Intl.NumberFormat("en-IN", {
                              style: "currency",
                              currency: "INR",
                              minimumFractionDigits: 2,
                            }).format(SumOfTTotalAmount())}
                          </th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="4" style={{ width: "40%" }}>
                  <table className="table table-bordered border-dark text-center">
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
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PaymentDetails.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>
                              {item.paymentFor ===
                              "Payment_PendingFor_RentalReturn"
                                ? "Additional Charge"
                                : item.paymentFor ===
                                  "Payment_PendingFor_NewBooking"
                                ? "Booking Amount"
                                : item.paymentFor ===
                                  "Payment_PendingFor_RentalIssuance"
                                ? "Damage Protection Charge"
                                : ""}
                            </td>
                            <td>{item.paymentType}</td>
                            <td>{item.txnRefNo}</td>
                            <td>{moment().format("DD-MM-YYYY")}</td>
                            <td className="text-end">
                              {parseInt(item.amount)}
                            </td>
                          </tr>
                        );
                      })}
                      <tr className="text-end">
                        <th colSpan="5">TOTAL</th>
                        <th>
                          {new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                            minimumFractionDigits: false,
                          }).format(SumOfSaveAmount())}
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
                          {new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                            minimumFractionDigits: 2,
                          }).format(SumOfSaveAmount())}
                        </th>
                        <th>
                          {new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                            minimumFractionDigits: 2,
                          }).format(SumOfTTotalAmount())}
                        </th>
                        <th>
                          {new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                            minimumFractionDigits: 2,
                          }).format(TotalRefund)}
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td colSpan="5" className="text-center">
                  <b>
                    The refund, if any, will be credited to your preffered Bank
                    Account within 10 days.
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

export default ServiceIvoicePdf;
