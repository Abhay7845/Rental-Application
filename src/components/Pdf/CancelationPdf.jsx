import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import TitanLogo from "../../Asset/Img/TitanLog.png";
import { CancelPdfHeders } from "./PDFHearders";

const CancelationPdf = () => {
  const CancelationRef = useRef(null);
  const CancelationPdf = useReactToPrint({
    content: () => CancelationRef.current,
  });
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
              margin:10mm;
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
                    <b className="text-center">
                      <img src={TitanLogo} alt="" width="45" height="45" />
                    </b>
                    <b>Store Address:</b>
                    <b>Bangluru, Electronic City, 560012, Karnatka</b>
                  </div>
                </td>
                <td colSpan="3">
                  <div className="d-flex flex-row justify-content-between">
                    <div className="d-flex flex-column">
                      <b>Invoice No: ACGFRDGG1235</b>
                      <b>Booking Reference No: ASDFGHJWERTY54</b>
                    </div>
                    <div className="d-flex flex-column space-in-pdf">
                      <b>Invoice Dated: 29/08/29</b>
                      <b>Booking Dated: 29/08/29</b>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  <div className="d-flex flex-row justify-content-between">
                    <div className="d-flex flex-column">
                      <b>GST NO: ACGFRDGG1235</b>
                      <b>State: Karnatka</b>
                      <b>Place of Supply: Bangluru</b>
                    </div>
                    <div className="d-flex flex-column space-in-pdf-two">
                      <b>PAN: ABCDE1234F</b>
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
                      <b>Address 1: Electronic City Fase-1</b>
                      <b>Address 2: Electronic City Fase-2</b>
                      <b>PinCode: 560012</b>
                      <b>State: Karnatka</b>
                      <b>Mobile No: +91 6305843583</b>
                    </div>
                    <div className="d-flex flex-column">
                      <b>Customer Profile Number: 784568475846</b>
                      <b>PAN: CEZPG25447G</b>
                      <b>GST No.: ABCDFRTNG234FRT</b>
                      <b>State Code:27</b>
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
                        <tr>
                          <td>1</td>
                          <td>CES946</td>
                          <td>32</td>
                          <td>Antique Gold Ruby Red Green Jhumka Earrings</td>
                          <td>32.581</td>
                          <td>223994.375</td>
                          <td>4</td>
                          <td>4,4450</td>
                          <td>4,4450</td>
                          <td>30000</td>
                          <td>-</td>
                          <td>38499</td>
                          <td>3,506</td>
                          <td>3,506</td>
                          <td>45,975</td>
                          <td>6578</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>CES946</td>
                          <td>32</td>
                          <td>Antique Gold Ruby Red Green Jhumka Earrings</td>
                          <td>32.581</td>
                          <td>223994.375</td>
                          <td>4</td>
                          <td>4,4450</td>
                          <td>4,4450</td>
                          <td>30000</td>
                          <td>-</td>
                          <td>38499</td>
                          <td>3,506</td>
                          <td>3,506</td>
                          <td>45,975</td>
                          <td>6765</td>
                        </tr>
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
                          <th>7654</th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="5" className="text-center">
                  <b>
                    The refund will be credited to your preffered Bank Account
                    within 5 days.
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

export default CancelationPdf;
