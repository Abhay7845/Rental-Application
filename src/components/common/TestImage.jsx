import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const TestImage = () => {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>PRODUCT DETAILS</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="table-responsive">
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
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>ORDER SUMMARY</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="table-responsive">
            <table className="table table-bordered border-dark text-center">
              <thead className="table-dark border-light">
                <tr>
                  {OrderSummaryDlsHeaders.map((heading, i) => {
                    return <td key={i}>{heading}</td>;
                  })}
                </tr>
              </thead>
              <tbody>
                {commonTableData.map((item, i) => {
                  const { penaltyCharges, damageCharges } = item;
                  return (
                    <tr key={i}>
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
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>PAYMENT DETAILS</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="table-responsive">
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
                          : item.paymentFor ===
                            "Payment_PendingFor_RentalIssuance"
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
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4a-content"
          id="panel4a-header"
        >
          <Typography>CUSTOMER DETAILS</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="table-responsive">
            <table className="table table-bordered border-dark text-center">
              <thead className="table-dark border-light">
                <tr>
                  {CustomerDlsHeaders.map((heading, i) => {
                    return <td key={i}>{heading}</td>;
                  })}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{existedUser.customerName}</td>
                  <td>{existedUser.mobileNo}</td>
                  <td>{existedUser.emailId}</td>
                  <td>{existedUser.panCardNo}</td>
                  <td>{existedUser.panCardNoFileName}</td>
                  <td>
                    {existedUser.customerCity},{existedUser.customerAddress1},
                    {existedUser.customerAddress2},
                    {existedUser.customerCityPincode}
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
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default TestImage;
