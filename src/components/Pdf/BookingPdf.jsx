import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import TitanLogo from "../../Asset/Img/TitanLog.png";
import { BookingOrderHearders } from "./PDFHearders";
import moment from "moment";
const BookingPdf = (props) => {
  const BookinRef = useRef(null);
  const BookingPDF = useReactToPrint({ content: () => BookinRef.current });
  const {
    savePaymetRow,
    existedUserData,
    addedPdts,
    bookingRefID,
    regUserData,
    totalPaidAmount,
  } = props;
  const { totalDepositAmount } = totalPaidAmount;

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
  const SgstData = RefacotorData.map((item) => item.sgst);
  const CsgstData = RefacotorData.map((item) => item.csgst);
  const RentalData = RefacotorData.map((item) => item.rentalAmount);
  const TotalDSP = [...SgstData, ...CsgstData, ...RentalData];

  const SumOfTotalAmount = () => {
    let total = 0;
    for (let data of TotalDSP) total = total + data;
    return total;
  };

  const TSGST = RefacotorData.map((item) => parseInt(item.sgst));
  const SumOfSGST = () => {
    let total = 0;
    for (let data of TSGST) total = total + data;
    return total;
  };
  const TCGST = RefacotorData.map((item) => parseInt(item.csgst));
  const SumOfCGST = () => {
    let total = 0;
    for (let data of TCGST) total = total + data;
    return total;
  };

  // TOTAL BOOKING CHARGES
  const TProductValue = RefacotorData.map((item) =>
    parseInt(item.rentalAmount)
  );
  const SumOfBookinCharge = () => {
    let total = 0;
    for (let data of TProductValue) total = total + data;
    return total;
  };

  const TAmount = savePaymetRow.map((item) => parseInt(item.amount));
  const SumOfSaveAmount = () => {
    let total = 0;
    for (let num of TAmount) total = total + num;
    return total;
  };
  const DateOfPic = RefacotorData.map((date) => date.rentStartDate);
  const packageDays = RefacotorData.map((date) => date.packageDays);

  const getReturnDate = () => {
    const nextDate = new Date(DateOfPic[0]);
    nextDate.setDate(nextDate.getDate() + parseInt(packageDays[0] - 1));
    return nextDate;
  };
  const bookingDate = regUserData.map((data) => data.bookingDate);

  return (
    <div>
      <div>
        <button onClick={BookingPDF} className="CButton">
          Print
        </button>
        <style>
          {`
            @media screen {
              .hide-on-screen {
                display: none;
              }
            }
             @page {
                size: A4;
              }
            @media print {
              .space-in-pdf {
                margin-right: 17mm;
              }
              .rental-terms {
                page-break-before: always;
              }
            }
          `}
        </style>
        <div className="table-container hide-on-screen" ref={BookinRef}>
          <h6 className="text-center mb-2">
            <b>BOOKING ORDER CONFIRMATION</b>
          </h6>
          <table
            className="table table-bordered table-styles border-dark"
            style={{ fontSize: "10px" }}
          >
            <tbody>
              <tr>
                <td rowSpan="2" colSpan="1" style={{ width: "30%" }}>
                  <div className="d-flex flex-column">
                    <b className="text-center">
                      <img src={TitanLogo} alt="" width="45" height="45" />
                    </b>
                    <b>Store Address:</b>
                    <b>Bangluru, Electronic City, 560012, Karnatka</b>
                  </div>
                </td>
                <td colSpan="4">
                  <div className="d-flex flex-row justify-content-between">
                    <b>Booking Ref No:-{bookingRefID}</b>
                    <b className="space-in-pdf">
                      Booking Date:-
                      {moment(bookingDate[0]).format("DD-MM-YYYY")}
                    </b>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  <div className="d-flex flex-row justify-content-between">
                    <div className="d-flex flex-column">
                      <b>GST NO:-</b>
                      <b>State:-</b>
                      <b>Place of Supply: Bangluru</b>
                    </div>
                    <div className="d-flex flex-column space-in-pdf-two">
                      <b>PAN:-</b>
                      <b>State Code: 27</b>
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
                      <b>PinCode:- {existedUserData.customerCityPincode}</b>
                      <b>Mobile No:- +91 {existedUserData.mobileNo}</b>
                    </div>
                    <div className="d-flex flex-column">
                      <b>Customer Profile Number:-{existedUserData.custId}</b>
                      <b>PAN: {existedUserData.panCardNo}</b>
                    </div>
                  </div>
                </td>
              </tr>
              {RefacotorData.length > 0 && (
                <tr>
                  <td colSpan="5">
                    <b>ITEM DETAILS</b>
                    <div className="table">
                      <table className="table table-bordered inner-table border-dark">
                        <thead>
                          <tr>
                            {BookingOrderHearders.map((heading, i) => {
                              return <th key={i}>{heading}</th>;
                            })}
                          </tr>
                        </thead>
                        <tbody>
                          {RefacotorData.map((item, i) => {
                            return (
                              <tr key={i}>
                                <th>{i + 1}</th>
                                <th>{item.itemCode}</th>
                                <th>{item.lotNo}</th>
                                <th>{item.description}</th>
                                <th>{item.grossWt}</th>
                                <th>
                                  {moment(item.rentStartDate).format(
                                    "DD-MM-YYYY"
                                  )}
                                </th>
                                <th>
                                  {Math.round(item.productValue).toLocaleString(
                                    "en-IN"
                                  )}
                                </th>
                                <th>{item.packageDays} Days</th>
                                <th>
                                  {Math.round(item.rentalAmount).toLocaleString(
                                    "en-IN"
                                  )}
                                </th>
                                <th>0</th>
                                <th>0</th>
                                <th>
                                  {Math.round(item.rentalAmount).toLocaleString(
                                    "en-IN"
                                  )}
                                </th>
                                <th>{item.sgst.toLocaleString("en-IN")}</th>
                                <th>{item.csgst.toLocaleString("en-IN")}</th>
                                <th>
                                  {(
                                    item.rentalAmount +
                                    item.sgst +
                                    item.csgst
                                  ).toLocaleString("en-IN")}
                                </th>
                              </tr>
                            );
                          })}
                          <tr>
                            <th colSpan="8" className="text-end">
                              TOTAL
                            </th>
                            <th>
                              ₹{SumOfBookinCharge().toLocaleString("en-IN")}
                            </th>
                            <th>₹0</th>
                            <th>₹0</th>
                            <th>
                              ₹{SumOfBookinCharge().toLocaleString("en-IN")}
                            </th>
                            <th>₹{SumOfSGST().toLocaleString("en-IN")}</th>
                            <th>₹{SumOfCGST().toLocaleString("en-IN")}</th>
                            <th>
                              ₹{SumOfTotalAmount().toLocaleString("en-IN")}
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
              <tr>
                <td colSpan="4" style={{ width: "60%" }}>
                  <table className="table table-bordered border-dark">
                    <thead>
                      <tr>
                        <th colSpan="5">Payment Details</th>
                      </tr>
                      <tr>
                        <th>Sr.No</th>
                        <th>Payment Mode</th>
                        <th>Doc No.</th>
                        <th>Date</th>
                        <th>Amount(Rs)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {savePaymetRow.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
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
                          <th colSpan="4" className="text-end">
                            TOTAL
                          </th>
                          <th>₹{SumOfSaveAmount().toString()}</th>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td colSpan="5">
                  <b>
                    Approx damage protection Amount to be collected:-
                    {Math.round(totalDepositAmount).toLocaleString("en-IN")}
                  </b>
                </td>
              </tr>
              <tr>
                <td colSpan="5">
                  <div className="d-flex justify-content-around">
                    <b>
                      Date of Pickup:-
                      {moment(DateOfPic[0]).format("DD-MM-YYYY")}
                    </b>
                    <b>
                      Date of return:-
                      {moment(getReturnDate()).format("DD-MM-YYYY")}
                    </b>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="5">
                  <b>Documents to be verified:-</b>
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
                  <b>
                    I have read, understood and agree to all Terms and
                    Conditions overleaf.
                  </b>
                  <div className="d-flex justify-content-between mt-3">
                    <div>
                      <b>For Titan Company Limited</b>
                      <h6 className="mt-4">(Authorized Signatory)</h6>
                    </div>
                    <div>
                      <b>
                        Customer Name:-{" "}
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
                    handling or damage charges, please refer to the Terms and
                    Conditions overleaf
                  </b>
                </td>
              </tr>
              <tr>
                <td colSpan="5">
                  <div className="d-flex flex-column">
                    <b>RENTAL JEWELLERY</b>
                    <b> TERMS AND CONDITIONS</b>
                    <b>
                      Titan Company Limited, a company incorporated under the
                      Companies Act, 1956 having its corporate office at
                      “Integrity”, No. 193, Veerasandra, Electronics City P.O.,
                      Off Hosur Main Road, Bengaluru 560100 (“Titan”/the
                      “Company”) provides you an option to rent Tanishq
                      jewellery products as selected in the Booking-cum-Advance
                      Receipt mentioned in the overleaf, subject to the
                      following Terms and Conditions (“Terms”). These Terms
                      create a legally binding agreement between you and Titan
                      and is deemed to be executed in Bengaluru. Please read
                      them carefully.
                    </b>
                    <b> 1. Jewellery Rental Booking</b>
                    <b>
                      1.1. Subject to these Terms, you may avail the jewellery
                      rental service of Titan by booking for the same in advance
                      from our participating Tanishq stores.
                    </b>
                    <b>
                      1.2. This jewellery rental service is available on a
                      “First Come First Serve” basis.
                    </b>
                    <b>
                      1.3. Rental jewellery is available for 4-day or 8-day
                      rental period (pick-up date and return date included). You
                      will accordingly be charged applicable rental fee when you
                      place your advance booking at the store.
                    </b>
                    <b>
                      1.4. At no time Products worth more than Rupees Thirty
                      lakhs will be permitted for taking on rent.
                    </b>
                    <b>
                      1.5. At the time of booking, you must specify the rental
                      period and the date on which you will collect the
                      jewellery from the store.
                    </b>
                    <b>
                      1.6. On the start date of the rental period as stated
                      during the booking, you must visit the store in person to
                      collect the product. No home deliveries will be made, and
                      no other person in place of you will be permitted to
                      collect the jewellery.
                    </b>
                    <b>
                      1.7. The rented jewellery is strictly for personal use
                      only and cannot be used for commercial purposes.
                    </b>
                    <b className="mb-2">
                      1.8. Every reasonable effort will be made to handover the
                      selected product on your selected date. If Titan is unable
                      to provide the selected jewellery on the specified date
                      due to any reasons directly attributable to Titan, Titan
                      will refund the rental fees or provide you with an
                      alternative jewellery item on rent of an equal or greater
                      value at no additional cost. The refund of rental fee or
                      providing an alternative option will be Titan’s sole
                      liability and your sole remedy and Titan will in no event
                      be liable for any other damages whatsoever.
                    </b>
                    <b>2. Cancellation</b>
                    <b>
                      2.1. In the event of cancellation of the jewellery rental
                      service booking or failure to collect the selected
                      jewellery on the specified date or any time during the
                      rental period selected, you will be charged cancellation
                      charges as per the below mentioned table: Time of
                      cancellation Cancellation Charges (as % of rental fee) 14
                      days prior to the start date 0% 7-13 days before the start
                      date 25% Before 7 days but not on or after start date 50%
                      On or after start date 100%
                    </b>
                    <b>
                      2.2. Any cancellation of booking must be done at the store
                      only.
                    </b>
                    <b className="mb-3">
                      2.3. The applicable Cancellation Charges will be adjusted
                      from the rental fee and the remainder, if any, will be
                      refunded to you within 7 business days from the date of
                      cancellation.
                    </b>
                    <b>3. Return of Jewellery</b>
                    <b>
                      3.1. All jewellery items rented must be returned by the
                      return date specified at the time of booking. It is
                      imperative that Titan receives the products at the same
                      store from where it was collected on the return date
                      agreed.
                    </b>
                    <b>
                      3.2. The jewellery items must be re-packaged in its
                      original jewellery box. You will be provided with a proof
                      that you delivered the package and without the receipt you
                      can be held responsible if jewellery items are not
                      returned to Titan.
                    </b>
                    <b>
                      3.3. You will be required to return the product at the
                      store in person and you cannot assign others to return the
                      products on your behalf.
                    </b>
                    <b>
                      3.4. In the event you anticipate that you will not be able
                      to return the jewellery item on the return date, you can
                      extend your rental period by contacting the store. If
                      Titan is able to accommodate your request, Titan will
                      provide a revised return schedule which will be for a
                      maximum of 4 additional days beyond the original rental
                      duration, subject to the availability of product and an
                      additional cost.
                    </b>
                    <b>
                      3.5. Notwithstanding anything stated to the contrary in
                      these Terms, in the event of failure to return the rented
                      jewellery items on the return date agreed, in addition to
                      the charges and fees Titan may levy under Clause 4 of
                      these Terms, Titan shall have the unfettered right to
                      forthwith take any action or recourse available under law
                      against you.
                    </b>
                    <b className="mt-3">
                      4. Rental Fee, Late Fee, Damage Protection Amount
                    </b>
                    <b>
                      4.1. You agree to pay the entire rental fee as may be
                      applicable for either 4-days or 8-days rental period,
                      upfront at the time of booking. Titan shall determine the
                      rental fees to be paid at it is sole discretion depending
                      upon various factors including type and price of the
                      products. The rental fees are exclusive of applicable
                      taxes which shall be borne by you.
                    </b>
                    <b>
                      4.2. All rental fees are non-refundable, except in the
                      instance specified in Clause 1.9.
                    </b>
                    <b>
                      4.3. To help protect Titan against any loss or damages, in
                      addition to the rental fee, you shall be required to pay a
                      Damage Protection Amount at the time of collection of the
                      selected jewellery. Titan reserves the right, in its sole
                      discretion, to determine the retail value of the
                      jewellery, and to require a Damage Protection Amount
                      calculated in accordance with Titan’s assessment criteria.
                    </b>
                    <b>
                      4.4. The Damage Protection Amount (less any applicable
                      fees or charges due) will be refunded upon return of the
                      jewellery on the specified date subsequent to inspection
                      and quality checks. If Titan determines that the jewellery
                      returned is in the same condition as when delivered to
                      you, Titan will refund the Damage Protection Amount no
                      earlier than 7 days from the date of receipt of the
                      jewellery product.
                    </b>
                    <b>
                      4.5. If, however Titan determines that the jewellery
                      returned is not as per the original condition, Titan shall
                      have the right to make deductions from the Damage
                      Protection Amount for the cost of repair or cleaning. In
                      the event of damage to any jewellery item that is beyond
                      repair or in the event of non-return of product on the
                      specified date, in addition to forfeiting the entire
                      Damage Protection Amount, Titan reserves the right to
                      charge you up to 100% of the value of the jewellery item
                      as per the rate mentioned in the Booking-cum-Advance
                      Receipt in the overleaf. The amount to be charged shall be
                      at Titan’s sole discretion based on Titan’s assessment of
                      the damage.
                    </b>
                    <b>
                      4.6. You will be notified through email if an increase in
                      your Damage Protection Amount is required, and you shall
                      within 24 hours make the payment of the additional Damage
                      Protection Amount.
                    </b>
                    <b>
                      4.7. If you do not return the rented jewellery to the
                      store by the specified return date, late fees will be
                      assessed for every extra day at a rate decided by Titan
                      (exclusive of additional taxes and fee applicable) till
                      the date of actual return of the jewellery to the store.
                      Titan reserves the right to deduct late fees from the
                      Damage Protection Amount.
                    </b>
                    <b className="mt-3">5. Care of Jewelry</b>
                    <b>
                      5.1. You acknowledge that each jewellery item rented from
                      Titan is a high value item and you covenant to treat it
                      and handle it with the utmost of care, as if it were your
                      own.
                    </b>
                    <b>
                      5.2. You should always keep the rented jewellery items in
                      your possession and under your control. You are prohibited
                      from letting anyone else use or wear it for any purpose.
                    </b>
                    <b>
                      5.3. You agree to never place the rented jewellery in a
                      checked-in bag when traveling by air and covenant to wear
                      the jewellery or keep it with you when you are en-route.
                    </b>
                    <b>
                      5.4. You shall not leave the jewellery unattended and
                      unprotected.
                    </b>
                    <b className="mt-3">6. Standard Terms </b>
                    <b>
                      6.1. Only individual Indian citizens who have attained the
                      age of majority and are competent to contract shall be
                      eligible to avail jewellery rental services, NRIs cannot
                      participate in the same.
                    </b>
                    <b>
                      6.2. You will be required to submit necessary documents
                      and information at the time of booking. Identity/ address
                      proof, bank account details and PAN card are mandatory to
                      be provided at the time of booking.
                    </b>
                    <b>
                      6.3. All information provided by you must be true,
                      accurate, current and complete. Titan reserves the right
                      to confirm and validate the information and other details
                      provided by you at any point in time. Further, Titan also
                      reserves the right to ask for additional information in
                      certain cases. If upon confirmation, your details are
                      found to be false or incorrect (partially or completely)
                      or if Titan has reasonable grounds to suspect that such
                      information is false, inaccurate, incomplete, not current,
                      Titan reserves the right to refuse to provide you the
                      jewellery rental services. If you have already taken the
                      jewellery on rent, Titan reserves the right to cancel your
                      rental at any time in its sole discretion. Immediately
                      upon cancellation of your rental for any reason, you shall
                      return all jewellery immediately. All rental fees are
                      non-refundable.
                    </b>
                    <b>
                      6.4. You consent and confirm that you have no objection in
                      permitting Titan and its associates/agents to conduct a
                      background verification of you and generate credit report.
                      You acknowledge that this information may be used to make
                      decisions, including but not limited to acceptance,
                      placement, or rejection of rental, adjustments in the
                      Damage Protection Amount, etc.
                    </b>
                    <b>
                      6.5. In case of any change in contact or address details
                      or any other details given, you shall immediately contact
                      the store for effecting the changes, as may be applicable.
                      Such modifications made shall be subject to the
                      satisfaction and discretion of Titan.{" "}
                    </b>
                    <b>
                      6.6. Nothing in these Terms, whether express or implied,
                      is intended to or shall confer you with any ownership or
                      title or any other rights in the jewellery products taken
                      on rent by you pursuant to availing the rental services.{" "}
                    </b>
                    <b>
                      6.7. Any payments to be made shall be made only through
                      credit / debit cards, NEFT/ RTGS or through local cheques
                      in favour of “Titan Company Limited”. In case of cheque
                      payment, rental services confirmation shall be subject to
                      cheque clearance. Payment through cash or international
                      credit/debit cards is not permitted.
                    </b>
                    <b>
                      6.8. You acknowledge that to the maximum extent allowed by
                      applicable laws, Titan provides this service on an “as-is”
                      and “as-available” basis, and grants no warranties of any
                      kind, whether express, implied, statutory or otherwise
                      including without limitation any implied warranties of
                      satisfactory quality, merchantability, fitness for a
                      particular purpose or non-infringement.
                    </b>
                    <b>
                      6.9. You are solely liable for the safety and security of
                      the jewellery, and you shall be solely liable for any
                      defects, or damages, or loss or theft of the rented
                      jewellery. You shall not assign or otherwise transfer your
                      rented jewellery or any of your rights or obligations
                      hereunder to any other party.
                    </b>
                    <b>
                      6.10. You agree to indemnify Titan for claims arising from
                      your use of the service.
                    </b>
                    <b>
                      6.11. In no event will Titan or its affiliates or agents
                      be liable to you or any third party including without
                      limitation for any indirect, consequential, exemplary,
                      incidental, special or punitive damages, including,
                      without limitation, loss of goodwill, damages for loss,
                      service interruptions and procurement of substitute
                      services, even if Titan has been advised of the
                      possibility of such damages and the maximum liability of
                      Titan under any circumstance whatsoever shall be limited
                      to the rental fee paid by you.
                    </b>
                    <b>
                      6.12. In no event shall Titan be liable for any failure or
                      delay in performance of its obligations hereunder if such
                      failure or delay is due to causes beyond reasonable
                      control including, but not limited to acts of God, fire or
                      explosion, war, invasion, riot, or other civil unrest,
                      governmental laws, orders, restrictions, actions,
                      embargoes, or blockages, epidemics, pandemics, national or
                      regional emergency, failure of common carriers, strikes,
                      lockouts, labour trouble, or other industrial
                      disturbances. It is at the sole discretion of Titan to
                      provide any service during any Force Majeure period.
                    </b>
                    <b>
                      6.13. Titan reserves the right to alter, amend, add, or
                      delete part or whole of the services or these Terms
                      without prior notice.
                    </b>
                    <b>
                      6.14. Titan reserves the right to suspend or discontinue
                      the jewellery rental services at any time.
                    </b>
                    <b>
                      6.15. Disputes if any will be subject to the Courts in
                      Bengaluru jurisdiction only, to the exclusion of any other
                      court's jurisdiction.
                    </b>
                    <b>
                      ------------------------------------------------------------------------------------------------------------------------------------------
                    </b>
                    <b className="mt-4">
                      I, ________________[name], aged about ____[age] years,
                      residing at
                      ____________________________________________[address]
                      hereby declare and confirm that I have read, understood,
                      and agree to all Terms and Conditions as detailed above.
                    </b>
                    <b className="mt-4">___________________ </b>
                    <b>(Customer’s Signature)</b>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingPdf;
