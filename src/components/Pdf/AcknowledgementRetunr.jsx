import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import TitanLogo from "../../Asset/Img/TitanLog.png";
import { AcknowledgementHeader } from "./PDFHearders";
import moment from "moment";

const AcknowledgementRetunr = (props) => {
  const AcknowledgementRef = useRef(null);
  const AcknowledgementPdf = useReactToPrint({
    content: () => AcknowledgementRef.current,
  });

  const {
    storeDetails,
    refactoreDataTable,
    existedUserData,
    GetReturnProduct,
  } = props;
  console.log("refactoreDataTable==>", refactoreDataTable);
  const { customerName, customerAddress1, customerAddress2 } = existedUserData;

  return (
    <div>
      <div>
        <button onClick={AcknowledgementPdf} className="CButton mx-2">
          Print
        </button>
        <style>
          {`
          @media screen{
            .hide-on-Acknowledgementscreen{
              display:none;
            }
          }
            @page {
              size: A4;
            }
          `}
        </style>
        <div
          className="table-container hide-on-Acknowledgementscreen"
          ref={AcknowledgementRef}
        >
          <h6 className="text-center mb-2">
            <b>ACKNOWLEDGEMENT OF RECIEPT OF RENTED PRODUCTS</b>
          </h6>
          <table
            className="table table-bordered table-styles border-dark"
            style={{ fontSize: "10px" }}
          >
            <tbody>
              <tr>
                <td rowSpan="2" colSpan="2" style={{ width: "30%" }}>
                  <div className="d-flex flex-column">
                    <b className="text-center">
                      <img src={TitanLogo} alt="" width="45" height="45" />
                    </b>
                    <b>Store Address:- {storeDetails.storeAddress}</b>
                  </div>
                </td>
                <td colSpan="3">
                  <div className="d-flex flex-row">
                    <div className="d-flex flex-column">
                      <b>Receipt No: ACGFRDGG1235</b>
                      <b>Booking Ref No:-{GetReturnProduct.refId}</b>
                    </div>
                    <div className="d-flex flex-column mx-5">
                      <b className="mx-5">
                        Date:- {moment().format("DD-MM-YYYY")}
                      </b>
                      <b className="mx-5">
                        Booking Date:-
                        {moment(GetReturnProduct.bookingDate).format(
                          "DD-MM-YYYY"
                        )}
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
                      <b>
                        Customer Name:-
                        {!customerName ? "" : customerName.toUpperCase()}
                      </b>
                      <b>
                        Address 1:-
                        {!customerAddress1
                          ? ""
                          : customerAddress1.toUpperCase()}
                      </b>
                      <b>
                        Address 2:-
                        {!customerAddress2
                          ? ""
                          : customerAddress2.toUpperCase()}
                      </b>
                      <b>PinCode:- {existedUserData.customerCityPincode}</b>
                      <b>Mobile No:- +91 {existedUserData.mobileNo}</b>
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
                          {AcknowledgementHeader.map((heading, i) => {
                            return <th key={i}>{heading}</th>;
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {refactoreDataTable.map((item, i) => {
                          return (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td>{item.itemCode}</td>
                              <td>{item.lotNo}</td>
                              <td>{item.description}</td>
                              <td>{item.grossWt}</td>
                              <td>{item.productValue}</td>
                              <td>N/A</td>
                              <td>{item.deliveredWt}</td>
                              <td>N/A</td>
                              <td>45</td>
                              <td>{item.packageDays}</td>
                              <td>N</td>
                            </tr>
                          );
                        })}
                        <tr className="text-bold">
                          <th colSpan="5" className="text-end">
                            TOTAL
                          </th>
                          <th>38765</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="5" className="text-left">
                  <div className="d-flex flex-column">
                    <b>
                      1. This is not an invoice. Final invoice will be generated
                      after completion of the product evaluation the rental
                      duration.
                    </b>
                    <b>
                      2. The Damage Protection Amount covers only part of the
                      product value.
                    </b>
                    <b>
                      3. The customer should return the product in products
                      returned should be in the the original condition, failing
                      which customers they would be held responsible for the
                      entire value of the products and not just the limited to
                      the Damage Protection Amount collected.
                    </b>
                    <b>
                      4. Upon successful validation of the products returned by
                      the customer, the refund of the Damage Protection Amount
                      shall be processed in minimum 5 working days after the
                      deduction of relevant charges as may be applicable.
                    </b>
                  </div>
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
                        {!customerName ? "" : customerName.toUpperCase()}
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

export default AcknowledgementRetunr;
