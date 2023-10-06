import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import TitanLogo from "../../Asset/Img/TitanLog.png";
import { CancelPdfHeders } from "./PDFHearders";
import moment from "moment";

const CancelationPdf = (props) => {
  const CancelationRef = useRef(null);
  const CancelationPdf = useReactToPrint({
    content: () => CancelationRef.current,
  });

  const {
    existedUserData,
    addedPdts,
    paymentDetails,
    storeDetails,
    regUserData,
    totalPaidAmount,
  } = props;
  // const {} = paymentDetails;
  const { cancellationCharges } = totalPaidAmount;
  console.log("totalPaidAmount==>", totalPaidAmount);

  const CutometProfileNo = addedPdts.map((data) => data.custId);
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
      netCharges: data.rentalAmount - totalPaidAmount.totalDiscountAmount,
    };
  });
  console.log("RefacotorData==>", RefacotorData);
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
                  <div className="d-flex flex-column">
                    <b className="text-center  my-2">
                      <img src={TitanLogo} alt="" width="45" height="45" />
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
                    <table className="table table-bordered inner-table border-dark">
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
                              <th>
                                {Math.round(item.productValue).toLocaleString(
                                  "en-IN"
                                )}
                              </th>
                              <th>
                                {Math.round(item.rentalAmount).toLocaleString(
                                  "en-IN"
                                )}
                              </th>
                              <th>{cancellationCharges}</th>
                              <th>0</th>
                              <th>{totalPaidAmount.totalDiscountAmount}</th>
                              <th>
                                {Math.round(item.rentalAmount).toLocaleString(
                                  "en-IN"
                                )}
                              </th>
                              <th>{item.sgst.toLocaleString("en-IN")}</th>
                              <th>{item.csgst.toLocaleString("en-IN")}</th>
                              <th>{item.netCharges}</th>
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

                        <tr className="text-bold">
                          <th colSpan="6" className="text-end">
                            TOTAL
                          </th>
                          <th>38765</th>
                          <th>34589</th>
                          <th>34589</th>
                          <th>34589</th>
                          <th>47,919</th>
                          <th>4,312</th>
                          <th>4,312</th>
                          <th>4,312</th>
                          <th>7654</th>
                          <th>7656</th>
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
                      within 5 days.
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
