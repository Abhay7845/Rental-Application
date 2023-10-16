import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import TitanLogo from "../../Asset/Img/TitanLogo.png";
import { CancelPdfHeders } from "./PDFHearders";
import moment from "moment";

const CancelationPdf = (props) => {
  const CancelationRef = useRef(null);
  const CancelationPdf = useReactToPrint({
    content: () => CancelationRef.current,
  });

  const [numberDays, setNumberDays] = useState("");

  const {
    existedUserData,
    addedPdts,
    paymentDetails,
    storeDetails,
    regUserData,
    totalPaidAmount,
  } = props;
  const { totalDiscountAmount } = totalPaidAmount;
  const CutometProfileNo = addedPdts.map((data) => data.custId);
  const bookingDate = regUserData.map((data) => data.bookingDate);

  const rentalDate = addedPdts.map((data) => data.rentStartDate);
  const rentalStartDate = rentalDate[0];
  useEffect(() => {
    const rentalDate = new Date(moment(rentalStartDate).format("YYYY-MM-DD"));
    const currentDate = new Date(moment().format("YYYY-MM-DD"));
    if (rentalDate < currentDate) {
      const timeDifference = rentalDate - currentDate;
      const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
      setNumberDays(daysDifference);
    } else if (rentalDate > currentDate) {
      const timeDifference = rentalDate - currentDate;
      const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
      setNumberDays(daysDifference);
    }
  }, [rentalStartDate, numberDays]);

  let cancelCharge = 0;
  if (numberDays <= 0) {
    cancelCharge = 1; // 100% charge
  } else if (numberDays > 0 && numberDays <= 7) {
    cancelCharge = 0.5; // 50% charge
  } else if (numberDays > 7 && numberDays <= 14) {
    cancelCharge = 0.25; // 25% charge
  } else if (numberDays > 14) {
    cancelCharge = 0; // 100% charge
  }
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
      productValue: parseFloat(data.productValue),
      rateId: data.rateId,
      refId: data.refId,
      rentStartDate: data.rentStartDate,
      bookingCanCharges: parseFloat(data.rentalAmount * 1.18),
      cancellationCherge: parseFloat(data.rentalAmount * cancelCharge),
      otherCharges: 0,
      totalCharges: parseFloat(data.rentalAmount * cancelCharge) + 0,
      tempBookingRefNo: data.tempBookingRefNo,
      sgst: (parseInt(data.rentalAmount) * 9) / 100,
      csgst: (parseInt(data.rentalAmount) * 9) / 100,
      netCharges: data.rentalAmount - totalPaidAmount.totalDiscountAmount,
    };
  });

  const TBasePrice = RefacotorData.map((item) => item.productValue);
  const SumOfTBasePrice = () => {
    let total = 0;
    for (let data of TBasePrice) total = total + data;
    return total;
  };
  const TBookingCharge = RefacotorData.map((item) => item.bookingCanCharges);
  const SumOfTBookingCharge = () => {
    let total = 0;
    for (let data of TBookingCharge) total = total + data;
    return total;
  };

  const TCancelCharge = RefacotorData.map((item) => item.cancellationCherge);
  const SumOfTCancelCharge = () => {
    let total = 0;
    for (let data of TCancelCharge) total = total + data;
    return total;
  };

  const TTotalCharges = RefacotorData.map((item) => item.totalCharges);
  const SumOfTTotalCharges = () => {
    let total = 0;
    for (let data of TTotalCharges) total = total + data;
    return total;
  };

  const NetCharges = SumOfTTotalCharges() - totalDiscountAmount;

  return (
    <div>
      <div>
        <button onClick={CancelationPdf} className="CButton">
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
            @media print{
              .space-in-pdf{
                margin-right: 20mm;
              }
              .space-in-pdf-two{
                margin-right: 28mm;
              }
            }
          `}
        </style>
        <div className="table-container hide-on-screen" ref={CancelationRef}>
          <h6 className="text-center mb-2">
            <b>BOOKING CANCELLATION INVOICE</b>
          </h6>
          <table
            className="table table-bordered table-styles border-dark"
            style={{ fontSize: "10px" }}
          >
            <tbody>
              <tr>
                <td rowSpan="2" colSpan="2" style={{ width: "30%" }}>
                  <div className="d-flex flex-column text-center">
                    <b>
                      <img src={TitanLogo} alt="" width="140" height="75" />
                    </b>
                    <b>Store Address:- {storeDetails.storeAddress}</b>
                  </div>
                </td>
                <td colSpan="3">
                  <div className="d-flex flex-row justify-content-between">
                    <div className="d-flex flex-column">
                      <b>Invoice No: ACGFRDGG1235</b>
                      <b>Booking Ref No:-{paymentDetails.bookingRefNo}</b>
                    </div>
                    <div className="d-flex flex-column space-in-pdf">
                      <b>
                        Invoice Date:-
                        {moment().format("DD-MM-YYYY")}
                      </b>
                      <b>
                        Booking Date:-
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
                          {CancelPdfHeders.map((heading, i) => {
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
                              <th>{item.packageDays} Days</th>
                              <th className="text-end">
                                {Math.round(item.productValue).toFixed(2)}
                              </th>
                              <th className="text-end">
                                {item.bookingCanCharges.toFixed(2)}
                              </th>
                              <th className="text-end">
                                {Math.round(item.cancellationCherge).toFixed(2)}
                              </th>
                              <th className="text-end">{item.otherCharges}</th>
                              <th className="text-end">
                                {Math.round(item.totalCharges).toFixed(2)}
                              </th>
                            </tr>
                          );
                        })}
                        <tr className="text-end">
                          <th colSpan="6">TOTAL</th>
                          <th>₹{Math.round(SumOfTBasePrice()).toFixed(2)}</th>
                          <th>₹{SumOfTBookingCharge().toFixed(2)}</th>
                          <th>
                            ₹{Math.round(SumOfTCancelCharge()).toFixed(2)}
                          </th>
                          <th>₹0</th>
                          <th>
                            ₹{Math.round(SumOfTTotalCharges()).toFixed(2)}
                          </th>
                        </tr>
                        <tr className="text-end">
                          <th colSpan="10">DISCOUNT</th>
                          <th>₹{totalDiscountAmount}</th>
                        </tr>
                        <tr className="text-end">
                          <th colSpan="10" className="text-end">
                            NET CHARGES
                          </th>
                          <th>₹{NetCharges}</th>
                        </tr>
                        <tr className="text-end">
                          <th colSpan="10" className="text-end">
                            SGST (@9%)
                          </th>
                          <th>₹{(NetCharges * 0.09).toFixed(2)}</th>
                        </tr>
                        <tr className="text-end">
                          <th colSpan="10" className="text-end">
                            CGST (@9%)
                          </th>
                          <th>₹{(NetCharges * 0.09).toFixed(2)}</th>
                        </tr>
                        <tr className="text-end">
                          <th colSpan="10" className="text-end">
                            TOTAL
                          </th>
                          <th>₹{(NetCharges * 1.18).toFixed(2)}</th>
                        </tr>
                        <tr className="text-end">
                          <th colSpan="10" className="text-end">
                            REFUND
                          </th>
                          <th>
                            ₹
                            {(
                              SumOfTBookingCharge() -
                              NetCharges * 1.18
                            ).toFixed(2)}
                          </th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>

              <tr>
                <td colSpan="5" className="text-center">
                  <h6>
                    <b>
                      The refund will be credited to your preffered Bank Account
                      within 10 days.
                    </b>
                  </h6>
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
                        Customer Name:-
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

export default CancelationPdf;
