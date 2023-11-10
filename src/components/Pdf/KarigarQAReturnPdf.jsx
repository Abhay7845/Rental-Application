import moment from "moment";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const KarigarQAReturnPdf = (props) => {
  const { refactoreDataTable } = props;
  const storeCode = localStorage.getItem("storeCode");

  const RetntalReturnAQRef = useRef(null);
  const RentalReturnQAPDF = useReactToPrint({
    content: () => RetntalReturnAQRef.current,
  });

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

  return (
    <div>
      <button onClick={RentalReturnQAPDF} className="CButton">
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
              margin:15mm;
              margin-top:51mm;
              margin-bottom:52mm;
            }
            }
          `}
      </style>
      <div ref={RetntalReturnAQRef} className="hide-on-screen">
        <div className="text-center border border-dark">
          <h5>Product Quality Checklist</h5>
        </div>
        {refactoreDataTable.map((data, i) => {
          return (
            <table
              key={i}
              className="table table-bordered border-dark"
              style={{ fontSize: "11.3px" }}
            >
              <tbody>
                <tr>
                  <th style={{ width: "30%" }}>
                    <div className="d-flex flex-column">
                      <b>User Name:- {storeCode}</b>
                      <b>SKU Code:- {data.itemCode}</b>
                      <b>Lot Number:- {data.lotNo}</b>
                    </div>
                  </th>
                  <th>
                    <div className="d-flex flex-column">
                      <b>
                        Handover Date:-{" "}
                        {moment(data.rentStartDate).format("DD-MM-YYYY")}
                      </b>
                      <b>RSO/Karigar Name:- {storeCode}</b>
                    </div>
                  </th>
                  <th colSpan="2">
                    <div className="d-flex flex-column">
                      <b>Return Date:- {!returnDate ? "" : returnDate}</b>
                      <b>RSO/Karigar Name:- {storeCode}</b>
                    </div>
                  </th>
                </tr>
                <tr>
                  <th style={{ width: "30%" }}>
                    <b>Checkpoints </b>
                    <input
                      className="form-check-input mx-4 border-dark"
                      type="checkbox"
                      style={{ height: "17px", width: "17px" }}
                    />
                  </th>
                  <th style={{ width: "35%" }}>
                    <b>Detailed Description</b>
                  </th>
                  <th>
                    <b>Handover to Customer</b>
                  </th>
                  <th>
                    <b>Return by Customer</b>
                  </th>
                </tr>
                <tr>
                  <th>Matching Design as per Catalog Vs TAG </th>
                  <th className="text-justify">
                    Check the product image in the system by entering the 14
                    digit code in the tag and ensure that the image matches the
                    product in hand
                  </th>
                  <th></th>
                  <th></th>
                </tr>
                <tr className="text-justify">
                  <th>Matching TAG Weight Vs Phy Weight (Gross weight)</th>
                  <th>Measure the gross weight of the product Vs TAG</th>
                  <th></th>
                  <th></th>
                </tr>
                <tr>
                  <th>Proper falling</th>
                  <th className="text-justify">
                    Fall, fitting and comfort should be checked by allowing the
                    customer to wear the product. Any defect & Changes should be
                    noted (Shape ,Size )
                  </th>
                  <th></th>
                  <th></th>
                </tr>
                <tr>
                  <th>No Non Gold item presence</th>
                  <th className="text-justify">
                    Foreign materials such as water or acid, non gold items like
                    steel pins, balls, wires etc Any dust, polishing residue etc
                  </th>
                  <th></th>
                  <th></th>
                </tr>
                <tr>
                  <th>No Kundan Missing/ Open</th>
                  <th>
                    Ensure kundan not missed and available in place , Any
                    damaged kundan should capture and update
                  </th>
                  <th></th>
                  <th></th>
                </tr>
                <tr>
                  <th>No Stone Missing</th>
                  <th>
                    Inspect the product to ensure all stones are in place.
                    Capture missing & loose stones or bent prongs must be fixed
                    before handover
                  </th>
                  <th></th>
                  <th></th>
                </tr>
                <tr>
                  <th>Marking as per Std.</th>
                  <th>As per the marking Guideline (Momentary Jewellery )</th>
                  <th></th>
                  <th></th>
                </tr>
                <tr>
                  <th>No Design /Product Damage</th>
                  <th>
                    Capture any shape out or ball damage Capture bend or
                    deformation in product
                  </th>
                  <th></th>
                  <th></th>
                </tr>
                <tr>
                  <th colSpan="2">BTQ Sign:</th>
                  <th colSpan="2">Customer Sign:</th>
                </tr>
                <tr>
                  <th>Product life-cycle</th>
                  <th>
                    As per the product life-cycle Guideline (Momentary Jewellery
                    )
                  </th>
                  <th></th>
                  <th></th>
                </tr>
                <tr>
                  <th>No Enamel Damage</th>
                  <th>Ensure no enamel should break, Miss and damaged</th>
                  <th></th>
                  <th></th>
                </tr>
                <tr>
                  <th>No Solder Broken</th>
                  <th>All O rings must be soldered and should not open</th>
                  <th></th>
                  <th></th>
                </tr>
                <tr>
                  <th>No Gold Item miss</th>
                  <th>Any design part should not missed,</th>
                  <th></th>
                  <th></th>
                </tr>
                <tr>
                  <th>No Solder joint weak/Crack</th>
                  <th>
                    Inspect the solder joints for weak soldering & Metal crack
                  </th>
                  <th></th>
                  <th></th>
                </tr>
                <tr>
                  <th>Proper Screw Function (No loose /Tight)</th>
                  <th>
                    Inspect the Screw function 10 times before handover (It
                    should be proper functioning)
                  </th>
                  <th></th>
                  <th></th>
                </tr>
                <tr>
                  <th>Proper Lock function (No Loose & Tight)</th>
                  <th>
                    Inspect the lock function 10 times before handover (It
                    should be proper functioning)
                  </th>
                  <th></th>
                  <th></th>
                </tr>
                <tr>
                  <th>No Sharp-edges</th>
                  <th>
                    Comfortness should be checked by allowing the customer to
                    wear the product and should not feel any sharpness
                  </th>
                  <th></th>
                  <th></th>
                </tr>
                <tr>
                  <th>No Colour variation in Dori</th>
                  <th>
                    Ensure no dori should damaged & Colour variation before
                    handover
                  </th>
                  <th></th>
                  <th></th>
                </tr>
                <tr>
                  <th>No Diamond Broken</th>
                  <th>
                    No broken stones No chipped stones Silver foil should not be
                    visible
                  </th>
                  <th></th>
                  <th></th>
                </tr>
                <tr>
                  <th>Packing done as per standard</th>
                  <th>
                    Ensure Proper packing and updated to customer before
                    handover
                  </th>
                  <th></th>
                  <th></th>
                </tr>
                <tr>
                  <th>Discoloration</th>
                  <th>Uniform Gold Colour No discolouration of Polki/GK etc</th>
                  <th></th>
                  <th></th>
                </tr>
                <tr>
                  <th colSpan="2">BTQ Sign:</th>
                  <th colSpan="2">Customer Sign:</th>
                </tr>
                <tr>
                  <th colSpan="2" className="text-center">
                    <b>Further Verification By National Service Centre ?</b>
                  </th>
                  <th>
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
                  </th>
                  <th>
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
                  </th>
                </tr>
              </tbody>
            </table>
          );
        })}
      </div>
    </div>
  );
};

export default KarigarQAReturnPdf;
