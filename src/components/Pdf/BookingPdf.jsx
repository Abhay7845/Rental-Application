import React from "react";
import { WishListHeader } from "../../Data/DataList";
import BookingPageStyle from "../../Style/PdfStyle/BookingPageStyle";

const BookingPdf = (props) => {
  const { PrintBooking, myRef } = props;
  return (
    <div>
      <button onClick={PrintBooking} className="CButton">
        Print
      </button>
      <BookingPageStyle />
      <div className="table-container hide-on-screen" ref={myRef}>
        <h6 className="text-center">
          BOOKING ORDER CONFIRMATION/ADVANCE RECEIPT
        </h6>
        <table
          className="table table-bordered table-styles border-dark"
          style={{ fontSize: "15px" }}
        >
          <tbody>
            <tr>
              <td rowSpan="2" colSpan="2">
                <div className="d-flex flex-column">
                  <b>Titan Company Limited</b>
                  <b>Store Address:</b>
                </div>
              </td>
              <td colSpan="3">
                <div className="d-flex flex-row">
                  <div className="d-flex flex-column">
                    <b>Order No: -ACGFRDGG1235</b>
                    <b>Documnet No: ASDFGHJWERTY54</b>
                  </div>
                  <div className="d-flex flex-column mx-5">
                    <b className="mx-5">Date- 29/08/29</b>
                    <b className="mx-5">Date- 29/08/29</b>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                <div className="d-flex flex-row ">
                  <div className="d-flex flex-column">
                    <b>GST NO:- ACGFRDGG1235</b>
                    <b>State:StateCode:</b>
                    <b>Place of Supply:</b>
                  </div>
                  <div className="mx-5">
                    <b className="mx-5">PAN:- ABCDE1234F</b>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan="5">
                <div className="d-flex flex-row justify-content-between mx-3">
                  <div className="d-flex flex-column">
                    <b>Bill To & Ship to : </b>
                    <b>Address 1 : </b>
                    <b>Address 2 : </b>
                    <b>State : PinCode : GST No. :</b>
                    <b>State code : 27</b>
                  </div>
                  <div className="d-flex flex-column">
                    <b> Customer Profile Number : - 784568475846</b>
                    <b> PAN:CEZPG25447G</b>
                    <b> Mobile : +91 9500175011</b>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan="5">
                <div className="table-responsive hide-scrollbar">
                  <table className="table table-bordered inner-table border-dark">
                    <thead>
                      <tr>
                        {WishListHeader.map((heading, i) => {
                          return <td key={i}>{heading}</td>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>510</td>
                        <td>Antique</td>
                        <td>32.581</td>
                        <td>32.581</td>
                        <td>paymentDetails</td>
                        <td>E2507R</td>
                        <td>4</td>
                        <td>7000</td>
                      </tr>
                      <tr className="text-bold">
                        <th colSpan="5" className="text-end">
                          TOTAL
                        </th>
                        <th>234</th>
                        <th>123</th>
                        <th>345</th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan="4">
                <table className="table table-bordered border-dark">
                  <thead>
                    <tr>
                      <th colSpan="5">Payment Details:</th>
                    </tr>
                    <tr>
                      <th scope="col">Payment Mode</th>
                      <th scope="col">DOC No.</th>
                      <th scope="col">Date</th>
                      <th scope="col">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Card</td>
                      <td>-</td>
                      <td>21-10-2020</td>
                      <td>7000</td>
                    </tr>
                    <tr>
                      <th colSpan="3" className="text-end">
                        TOTAL
                      </th>
                      <th>3456</th>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td>
                <div className="d-flex justify-content-between">
                  <b>Total Value</b>
                  <b>IGST @ 0.00</b>
                  <b>SGST @ 9% </b>
                  <b>CGST @ 9%</b>
                  <b>Total Order Value:</b>
                </div>
                <div className="d-flex justify-content-between mt-3">
                  <b>123</b>
                  <b>45</b>
                  <b>56</b>
                  <b>567</b>
                  <b className="mx-5">567</b>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan="5">
                <div className="d-flex flex-row justify-content-around">
                  <b>Approx security deposite blocked:-</b>
                  <b>Mode:Card/UPI Card:-Card</b>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan="5">
                <div className="d-flex flex-row justify-content-between">
                  <b>Expected Date of Delivery:-</b>
                  <b>Expected Date of Pickup:-</b>
                  <b>Expected Date of Return Pickup:-</b>
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
                We hereby certify that our registration certificate under the
                Central Goods and Services Tax Act, 2017 is in force on the date
                on which the supply of the goods/services specified in this tax
                invoice is made by us and that the transaction of the sale
                covered by this tax Invoice/ Advance receipt voucher has been
                effected by us and it shall be accounted for in the turnover of
                supplies/advances while filing of return and the due tax, if any
                payable on the supply has been paid or shall be paid
              </td>
            </tr>
            <tr>
              <td colSpan="5">
                <div className="d-flex justify-content-between mx-3">
                  <div>
                    <h6>For Titan Company</h6>
                    <p className="mt-3">(Authorized Signatory)</p>
                  </div>
                  <div>
                    <h6>Customer Name : Abhay Aryan</h6>
                    <p className="mt-3">
                      Customer Signature : .........................
                    </p>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan="5" className="text-center">
                "Titan Company Limited Regd & Corporate Office: CIN : . Website:
                www.Titan.Co.in Contact Number: 11111111 Thank you for shopping
                at Titan Company. You can also write to us at (eMail Id) " E &
                OE
              </td>
            </tr>
            <tr>
              <td colSpan="5" className="text-center">
                For terms and conditions including late fee and product handling
                or damage charges, please refer: T&C section
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingPdf;
