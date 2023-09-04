import React, { useRef, useEffect, useState } from "react";
import { DeliveryListHearders } from "../../Data/DataList";
import { useReactToPrint } from "react-to-print";
import titanLogo from "../../Asset/Img/TitanLog.png";
import axios from "axios";

const DeliveryPdf = () => {
  const DelivetyRef = useRef(null);
  const [userData, setUserData] = useState([]);
  const DeliveryPDF = useReactToPrint({ content: () => DelivetyRef.current });

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => res)
      .then((response) => setUserData(response.data))
      .catch((error) => {
        console.log("error==>", error);
      });
  }, []);
  console.log("userData==>", userData);
  return (
    <div>
      <button onClick={DeliveryPDF} className="CButton">
        Print
      </button>
      <style>
        {`
          @media screen{
            .hide-on-screen{
              display:block;
            }
          }
            @page {
              size: A4;
            }
          `}
      </style>
      <div className="table-container hide-on-screen" ref={DelivetyRef}>
        <h6 className="text-center mb-2">
          <b>BOOKING ORDER CONFIRMATION/ADVANCE RECEIPT</b>
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
                    <img src={titanLogo} alt="" width="45" height="45" />
                  </b>
                  <b>Store Address:</b>
                  <b>Bangluru, Electronic City, 560012, Karnatka</b>
                </div>
              </td>
              <td colSpan="3">
                <div className="d-flex flex-row">
                  <div className="d-flex flex-column">
                    <b>Order No: ACGFRDGG1235</b>
                    <b>Documnet No: ASDFGHJWERTY54</b>
                  </div>
                  <div className="d-flex flex-column mx-5">
                    <b className="mx-5">Date: 29/08/29</b>
                    <b className="mx-5">Date: 29/08/29</b>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                <div className="d-flex flex-row">
                  <div className="d-flex flex-column">
                    <b>GST NO: ACGFRDGG1235</b>
                    <b>State: Karnatka</b>
                    <b>Place of Supply: Bangluru</b>
                  </div>
                  <div
                    className="d-flex flex-column"
                    style={{ marginLeft: "17%" }}
                  >
                    <b className="mx-5">PAN: ABCDE1234F</b>
                    <b className="mx-5">State Code: 27</b>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan="5">
                <div className="d-flex flex-row justify-content-between">
                  <div className="d-flex flex-column">
                    <b>Bill To & Ship to: </b>
                    <b>Address 1: Electronic City Fase-1</b>
                    <b>Address 2: Electronic City Fase-2</b>
                    <b>State: Karnatka, PinCode: 560012</b>
                    <b>State Code: 27</b>
                  </div>
                  <div
                    className="d-flex flex-column"
                    style={{ marginRight: "10.5%" }}
                  >
                    <b>Customer Profile Number: 784568475846</b>
                    <b>PAN: CEZPG25447G</b>
                    <b>GST No.: ABCDFRTNG234FRT</b>
                    <b>Mobile No.: +91 9500175011</b>
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
                        {DeliveryListHearders.map((heading, i) => {
                          return <th key={i}>{heading}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {userData.map((data, i) => {
                        return (
                          <tr key={i}>
                            <th>512621FFBSAA00</th>
                            <th>512621</th>
                            <th>32.581</th>
                            <th>32.581</th>
                            <th>678.09</th>
                            <th>456</th>
                            <th>47997</th>
                            <th>7000</th>
                          </tr>
                        );
                      })}
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
              <td colSpan="4" style={{ width: "40%" }}>
                <table className="table table-bordered border-dark">
                  <thead>
                    <tr>
                      <th colSpan="5">Payment Details:</th>
                    </tr>
                    <tr>
                      <th>Payment Mode</th>
                      <th>DOC No.</th>
                      <th>Date</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Card</th>
                      <th>-</th>
                      <th>Aug-01</th>
                      <th>700</th>
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
              <td colSpan="5">
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
                  <b>569</b>
                  <b style={{ marginRight: "17%" }}>567</b>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan="5">
                <div className="d-flex justify-content-around">
                  <b>Approx security deposite blocked:-</b>
                  <b>Mode:Card/UPI Card:-Card</b>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan="5">
                <div className="d-flex flex-row justify-content-between">
                  <b>Expected Date Delivery: 01/09/2023</b>
                  <b>Expected Date Pickup: 01/09/2023</b>
                  <b>Expected Date Return Pickup: 01/09/2023</b>
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
                  We hereby certify that our registration certificate under the
                  Central Goods and Services Tax Act, 2017 is in force on the
                  date on which the supply of the goods/services specified in
                  this tax invoice is made by us and that the transaction of the
                  sale covered by this tax Invoice/ Advance receipt voucher has
                  been effected by us and it shall be accounted for in the
                  turnover of supplies/advances while filing of return and the
                  due tax, if any payable on the supply has been paid or shall
                  be paid
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
                  Website: www.Titan.Co.in Contact Number: 11111111 Thank you
                  for shopping at Titan Company. You can also write to us at
                  (eMail Id) " E & OE
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
  );
};

export default DeliveryPdf;
