import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const KarigarQAPdf = (props) => {
  const { refactoreDataTable } = props;
  const QARef = useRef(null);
  const QAPDF = useReactToPrint({
    content: () => QARef.current,
  });
  console.log("refactoreDataTable==>", refactoreDataTable);
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
            <tr>
              <td>
                <div className="d-flex flex-column">
                  <b>User Name:</b>
                  <b>SKU Code:</b>
                </div>
              </td>
              <td>
                <div className="d-flex flex-column">
                  <b>Handover</b>
                  <b>Date:</b>
                  <b>RSO/Karigar Name:</b>
                </div>
              </td>
              <td colSpan="2">
                <div className="d-flex flex-column">
                  <b>Return</b>
                  <b>Date:</b>
                  <b>RSO/Karigar Name:</b>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <b>Checkpoints</b>
              </td>
              <td>
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
              <td>
                Check the product image in the system by entering the 14 digit
                code in the tag and ensure that the image matches the product in
                hand
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Matching TAG Weight Vs Phy Weight (Gross weight)</td>
              <td>Measure the gross weight of the product Vs TAG</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Proper falling</td>
              <td>
                Fall, fitting and comfort should be checked by allowing the
                customer to wear the product. Any defect & Changes should be
                noted (Shape ,Size )
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>No Non Gold item presence</td>
              <td>
                Foreign materials such as water or acid, non gold items like
                steel pins, balls, wires etc Any dust, polishing residue etc
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>No Kundan Missing/ Open</td>
              <td>
                Ensure kundan not missed and available in place , Any damaged
                kundan should capture and update
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>No Stone Missing</td>
              <td>
                Inspect the product to ensure all stones are in place. Capture
                missing & loose stones or bent prongs must be fixed before
                handover
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
                Capture any shape out or ball damage Capture bend or deformation
                in product
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
                As per the product life-cycle Guideline (Momentary Jewellery )
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
                Inspect the Screw function 10 times before handover (It should
                be proper functioning)
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Proper Lock function (No Loose & Tight)</td>
              <td>
                Inspect the lock function 10 times before handover (It should be
                proper functioning)
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>No Sharp-edges</td>
              <td>
                Comfortness should be checked by allowing the customer to wear
                the product and should not feel any sharpness
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>No Colour variation in Dori</td>
              <td>
                Ensure no dori should damaged & Colour variation before handover
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>No Diamond Broken</td>
              <td>
                No broken stones No chipped stones Silver foil should not be
                visible
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Packing done as per standard</td>
              <td>
                Ensure Proper packing and updated to customer before handover
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Discoloration</td>
              <td>Uniform Gold Colour No discolouration of Polki/GK etc</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td colSpan="2">BTQ Sign:</td>
              <td colSpan="2">Customer Sign:</td>
            </tr>
          </tbody>
        </table>
        <table className="table table-bordered border-dark">
          <tbody>
            <tr>
              <th colSpan="4" className="text-center">
                Advanced Verification National Service Centre, Tanishq
              </th>
            </tr>
            <tr>
              <td colSpan="4">
                It is hereby declared that the product with SKU
                code____________, has undergone advanced verification, by
                Mr./Ms. ________________, at National Service Centre, Tanishq.
                The result of the advance verification is
                that______________________________________________________.
                Therefore, an additional amount of Rs._____________ is payable
                by the customer towards refurbishment/replacement of the
                product.
              </td>
            </tr>
            <tr>
              <td colSpan="2">NSC POC Sign:</td>
              <td>Customer Sign:</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KarigarQAPdf;
