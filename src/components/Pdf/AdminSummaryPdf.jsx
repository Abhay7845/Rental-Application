import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import {
  CustomerBankDlsHeaders,
  CustomerDlsHeaders,
  OrderSummaryDlsHeaders,
  PaymentDlsHeaders,
  ProductDlsHeaders,
} from "../../Data/DataList";
import moment from "moment";

const AdminSummaryPdf = (props) => {
  const summaryReptPdf = useRef(null);
  const PrintSummaryReports = useReactToPrint({
    content: () => summaryReptPdf.current,
  });

  const {
    orderData,
    commonTableData,
    previousTnxData,
    existedUser,
    totalPaidAmount,
  } = props;
  const cutName = commonTableData.map((name) => name.customerName);
  const cutPhone = commonTableData.map((name) => name.mobileNo);
  const customerName = cutName[0];
  const customerPhone = cutPhone[0];
  return (
    <div>
      <button
        onClick={PrintSummaryReports}
        className="CButton mx-2"
        style={{ marginTop: "-15px" }}
      >
        Print
      </button>
      <style>
        {`
          @media screen{
            .hide_on_pop_up_window{
              display:none;
            }
          }
            @page {
              size: A4;
              margin:15mm;
              margin-top:40mm;
              margin-top:40mm;
            }
          `}
      </style>
      <div ref={summaryReptPdf} className="hide_on_pop_up_window">
        <h6 className="my-3">ORDER DETAILS</h6>
        <div className="d-flex justify-content-between mx-1">
          <b>Booking Ref No. :- {orderData.bookingRefNo}</b>
          <b>Custome Name :- {customerName}</b>
          <b>Phone No. :- {customerPhone}</b>
        </div>
        <h6 className="mt-4">PRODUCTS DETAILS</h6>
        <table className="table table-bordered border-dark text-center">
          <thead className="table-dark border-light">
            <tr>
              {ProductDlsHeaders.map((heading, i) => {
                return <td key={i}>{heading}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {commonTableData.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{item.itemCode}</td>
                  <td>{item.lotNo}</td>
                  <td>{item.grossWt}</td>
                  <td>{item.productValue}</td>
                  <td>{parseInt(item.rentalAmount)}</td>
                  <td>{parseFloat(item.rentalAmount * 1.18).toFixed(2)}</td>
                  <td>{parseInt(item.depositAmount)}</td>
                </tr>
              );
            })}
            <tr>
              <th colSpan="3" />
              <th>
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  minimumFractionDigits: false,
                }).format(totalPaidAmount.totalProductValue)}
              </th>
              <th>
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  minimumFractionDigits: false,
                }).format(totalPaidAmount.totalRentalValue)}
              </th>
              <th>
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  minimumFractionDigits: 2,
                }).format(totalPaidAmount.totalBookingAmount)}
              </th>
              <th>
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  minimumFractionDigits: false,
                }).format(totalPaidAmount.totalDepositAmount)}
              </th>
            </tr>
          </tbody>
        </table>
        <h6 className="mt-4">ORDER SUMMARY</h6>
        <table className="table table-bordered border-dark text-center">
          <thead className="table-dark border-light">
            <tr style={{ fontSize: "11px", fontWeight: "bold" }}>
              {OrderSummaryDlsHeaders.map((heading, i) => {
                return <td key={i}>{heading}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {commonTableData.map((item, i) => {
              const { penaltyCharges, damageCharges } = item;
              return (
                <tr key={i} style={{ fontSize: "11px", fontWeight: "bold" }}>
                  <td>{item.itemCode}</td>
                  <td>{item.deliveredWt}</td>
                  <td>{item.actualWtReturn}</td>
                  <td>{parseFloat(item.rentalAmount * 1.18).toFixed(2)}</td>
                  <td>{parseInt(item.depositAmount)}</td>
                  <td>{penaltyCharges === "" ? 0 : penaltyCharges}</td>
                  <td>{damageCharges === "" ? 0 : damageCharges}</td>
                  <td>{item.itemCode}</td>
                  <td>{item.itemCode}</td>
                  <td>{item.itemCode}</td>
                </tr>
              );
            })}
            <tr>
              <th colSpan="3" className="text-end">
                TOTAL
              </th>
              <th>
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  minimumFractionDigits: false,
                }).format(totalPaidAmount.totalBookingAmount)}
              </th>
              <th>
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  minimumFractionDigits: false,
                }).format(totalPaidAmount.totalDepositAmount)}
              </th>
              <th>
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  minimumFractionDigits: false,
                }).format(totalPaidAmount.totalPenaltyCharges)}
              </th>
              <th>
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  minimumFractionDigits: false,
                }).format(totalPaidAmount.totalDamageCharges)}
              </th>
              <th>
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  minimumFractionDigits: false,
                }).format(totalPaidAmount.cancellationCharges)}
              </th>
              <th>
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  minimumFractionDigits: false,
                }).format(totalPaidAmount.totalDiscountAmount)}
              </th>
              <th>
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  minimumFractionDigits: false,
                }).format(0)}
              </th>
            </tr>
          </tbody>
        </table>
        <h6 className="mt-4">PAYMENT DETAILS</h6>
        <table className="table table-bordered border-dark text-center">
          <thead className="table-dark border-light">
            <tr>
              {PaymentDlsHeaders.map((heading, i) => {
                return <td key={i}>{heading}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {previousTnxData.map((item, i) => {
              return (
                <tr key={i}>
                  <th>
                    {item.paymentFor === "Payment_PendingFor_RentalReturn"
                      ? "Additional Charge"
                      : item.paymentFor === "Payment_PendingFor_NewBooking"
                      ? "Booking Amount"
                      : item.paymentFor === "Payment_PendingFor_RentalIssuance"
                      ? "Damage Protection Charge"
                      : ""}
                  </th>
                  <th>{item.paymentType}</th>
                  <th>{item.txnRefNo}</th>
                  <th className="text-end">{parseInt(item.amount)}</th>
                  <th>{item.paymentDocFileName}</th>
                  <th>{moment().format("DD-MM-YYYY")}</th>
                </tr>
              );
            })}
          </tbody>
        </table>
        <h6 className="mt-4">CUSTOMER DETAILS</h6>
        <table className="table table-bordered border-dark text-center">
          <thead className="table-dark border-light">
            <tr style={{ fontSize: "11px", fontWeight: "bold" }}>
              {CustomerDlsHeaders.map((heading, i) => {
                return <td key={i}>{heading}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            <tr style={{ fontSize: "11px", fontWeight: "bold" }}>
              <td>{existedUser.customerName}</td>
              <td>{existedUser.mobileNo}</td>
              <td>{existedUser.emailId}</td>
              <td>{existedUser.panCardNo}</td>
              <td>{existedUser.panCardNoFileName}</td>
              <td>
                {existedUser.customerCity},{existedUser.customerAddress1},
                {existedUser.customerAddress2},{existedUser.customerCityPincode}
              </td>
              <td>{existedUser.addressProofIdNo}</td>
              <td>{existedUser.addressProofFileName}</td>
            </tr>
          </tbody>
        </table>
        <table className="table table-bordered border-dark text-center">
          <thead className="table-dark border-light">
            <tr>
              {CustomerBankDlsHeaders.map((heading, i) => {
                return <td key={i}>{heading}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{existedUser.customerBankName}</td>
              <td>{existedUser.customerAccountNumber}</td>
              <td>{existedUser.bankIfsc}</td>
              <td>{existedUser.bankDetailFileName}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSummaryPdf;
