import moment from "moment";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const KarigarQAReturnPdf = (props) => {
  const { refactoreDataTable } = props;
  const storeCode = localStorage.getItem("storeCode");

  const QARef = useRef(null);
  const QAPDF = useReactToPrint({
    content: () => QARef.current,
  });
  console.log("refactoreDataTable==>", refactoreDataTable);
  const rentStartDate = refactoreDataTable.map((date) => date.rentStartDate);
  const rentalDate = rentStartDate[0];
  const packageDays = refactoreDataTable.map((date) => date.packageDays);
  const SelePackage = packageDays[0];

  const getReturnDate = () => {
    const nextDate = new Date(rentalDate);
    nextDate.setDate(nextDate.getDate() + parseInt(SelePackage - 1));
    return nextDate;
  };
  const returnDate = moment(getReturnDate()).format("DD-MM-YYYY");
  console.log("returnDate==>", returnDate);

  return (
    <div>
      <button onClick={QAPDF} className="CButton">
        Print
      </button>
      <style>
        {`
          @media screen{
            .hide-on-screen{
              display:none;
            }
            .margin-on-ps{
                margin: 10px;
            }
          }
            @page {
              size: A4;
            }
            @media print{
              .margin-on-ps{
                margin: 10px !important;
              }
            }
          `}
      </style>
      <div ref={QARef} className="margin-on-ps hide-on-screen">
        <table
          className="table table-bordered border-dark"
          style={{ fontSize: "12px" }}
        >
          <tbody>
            <tr>
              <th colSpan="4" className="text-center">
                Product Quality Checklist
              </th>
            </tr>
            {refactoreDataTable.map((data, i) => {
              return (
                <>
                  <tr>
                    <td>
                      <div className="d-flex flex-column">
                        <b>User Name: {storeCode}</b>
                        <b>SKU Code: {data.itemCode}</b>
                        <b>Lot Number: {data.lotNo}</b>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex flex-column">
                        <b>
                          Handover Date:-
                          {moment(data.rentStartDate).format("DD-MM-YYYY")}
                        </b>
                        <b>RSO/Karigar Name: {storeCode}</b>
                      </div>
                    </td>
                    <td colSpan="2">
                      <div className="d-flex flex-column">
                        <b>Return Date:-{!returnDate ? "" : returnDate}</b>
                        <b>RSO/Karigar Name: {storeCode}</b>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "25%" }}>
                      <b>Checkpoints </b>
                      <input
                        className="form-check-input mx-4 border-dark"
                        type="checkbox"
                        style={{ height: "17px", width: "17px" }}
                      />
                    </td>
                    <td style={{ width: "35%" }}>
                      <b>Detailed Description</b>
                    </td>
                    <td>
                      <b>Handover to Customer</b>
                    </td>
                    <td>
                      <b>Return by Customer</b>
                    </td>
                  </tr>
                  <tr>
                    <td>Matching Design as per Catalog Vs TAG </td>
                    <td className="text-justify">
                      Check the product image in the system by entering the 14
                      digit code in the tag and ensure that the image matches
                      the product in hand
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr className="text-justify">
                    <td>Matching TAG Weight Vs Phy Weight (Gross weight)</td>
                    <td>Measure the gross weight of the product Vs TAG</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Proper falling</td>
                    <td className="text-justify">
                      Fall, fitting and comfort should be checked by allowing
                      the customer to wear the product. Any defect & Changes
                      should be noted (Shape ,Size )
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>No Non Gold item presence</td>
                    <td className="text-justify">
                      Foreign materials such as water or acid, non gold items
                      like steel pins, balls, wires etc Any dust, polishing
                      residue etc
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>No Kundan Missing/ Open</td>
                    <td>
                      Ensure kundan not missed and available in place , Any
                      damaged kundan should capture and update
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>No Stone Missing</td>
                    <td>
                      Inspect the product to ensure all stones are in place.
                      Capture missing & loose stones or bent prongs must be
                      fixed before handover
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Marking as per Std.</td>
                    <td>As per the marking Guideline (Momentary Jewellery )</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>No Design /Product Damage</td>
                    <td>
                      Capture any shape out or ball damage Capture bend or
                      deformation in product
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td colSpan="2">BTQ Sign:</td>
                    <td colSpan="2">Customer Sign:</td>
                  </tr>
                  <tr>
                    <td>Product life-cycle</td>
                    <td>
                      As per the product life-cycle Guideline (Momentary
                      Jewellery )
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>No Enamel Damage</td>
                    <td>Ensure no enamel should break, Miss and damaged</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>No Solder Broken</td>
                    <td>All O rings must be soldered and should not open</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>No Gold Item miss</td>
                    <td>Any design part should not missed,</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>No Solder joint weak/Crack</td>
                    <td>
                      Inspect the solder joints for weak soldering & Metal crack
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Proper Screw Function (No loose /Tight)</td>
                    <td>
                      Inspect the Screw function 10 times before handover (It
                      should be proper functioning)
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Proper Lock function (No Loose & Tight)</td>
                    <td>
                      Inspect the lock function 10 times before handover (It
                      should be proper functioning)
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>No Sharp-edges</td>
                    <td>
                      Comfortness should be checked by allowing the customer to
                      wear the product and should not feel any sharpness
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>No Colour variation in Dori</td>
                    <td>
                      Ensure no dori should damaged & Colour variation before
                      handover
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>No Diamond Broken</td>
                    <td>
                      No broken stones No chipped stones Silver foil should not
                      be visible
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Packing done as per standard</td>
                    <td>
                      Ensure Proper packing and updated to customer before
                      handover
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Discoloration</td>
                    <td>
                      Uniform Gold Colour No discolouration of Polki/GK etc
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td colSpan="2">BTQ Sign:</td>
                    <td colSpan="2">Customer Sign:</td>
                  </tr>
                  <tr>
                    <td colSpan="2" className="text-center">
                      <b>Further Verification By National Service Centre ?</b>
                    </td>
                    <td>
                      YES
                      <input
                        className="form-check-input mx-2 border-dark"
                        type="checkbox"
                        style={{
                          height: "17px",
                          width: "17px",
                          marginTop: "-1px",
                        }}
                      />
                    </td>
                    <td>
                      NO
                      <input
                        className="form-check-input mx-2 border-dark"
                        type="checkbox"
                        style={{
                          height: "17px",
                          width: "17px",
                          marginTop: "-1px",
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="4" />
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KarigarQAReturnPdf;
