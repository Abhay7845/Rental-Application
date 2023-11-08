import React, { useEffect, useRef, useState } from "react";
import { ImageFileHeaders, ImageHeaders } from "../../Data/DataList";
import { useReactToPrint } from "react-to-print";
import { FetchImg } from "../../API/HostURL";
import axios from "axios";

const ImageFilePriveiw = ({ previousTnxData, existedUser }) => {
  const docFile = previousTnxData.map((file) => file.paymentDocFileName);
  const PrintImageRef = useRef(null);
  const PrintImagePdf = useReactToPrint({
    content: () => PrintImageRef.current,
  });
  const [addressFile, setAddressFile] = useState("");
  const [bankFile, setBankFile] = useState("");
  const [panFile, setPanFile] = useState("");
  const [paymentDocFile, setPaymentDocFile] = useState("");

  // FETCH ADDRESS FILE URL
  useEffect(() => {
    if (existedUser.addressProofFileName) {
      axios
        .get(`${FetchImg}1234gbvfgtyh.png`, {
          headers: ImageHeaders,
        })
        .then((res) => res)
        .then((response) => setAddressFile(response.data))
        .catch((error) => {
          console.log("error==>", error);
        });
    }
  }, [existedUser.addressProofFileName]);

  // FETCH BANK FILE URL
  useEffect(() => {
    if (existedUser.bankDetailFileName) {
      axios
        .get(`${FetchImg}${existedUser.bankDetailFileName}`, {
          headers: ImageHeaders,
        })
        .then((res) => res)
        .then((response) => setBankFile(response.data))
        .catch((error) => {
          console.log("error==>", error);
        });
    }
  }, [existedUser.bankDetailFileName]);

  // FETCH PAN FILE URL
  useEffect(() => {
    if (existedUser.panCardNoFileName) {
      axios
        .get(`${FetchImg}${existedUser.panCardNoFileNam}`, {
          headers: ImageHeaders,
        })
        .then((res) => res)
        .then((response) => setPanFile(response.data))
        .catch((error) => {
          console.log("error==>", error);
        });
    }
  }, [existedUser.panCardNoFileName]);

  // FETCH PAMENT DOC FILE URL
  useEffect(() => {
    if (docFile[0]) {
      axios
        .get(`${FetchImg}${docFile[0]}`, {
          headers: ImageHeaders,
        })
        .then((res) => res)
        .then((response) => setPaymentDocFile(response.data))
        .catch((error) => {
          console.log("error==>", error);
        });
    }
  }, [docFile[0]]);
  return (
    <div>
      <div className="d-flex justify-content-end my-2">
        <button className="CButton" onClick={PrintImagePdf}>
          Print
        </button>
      </div>
      <div className="table-responsive">
        <table
          className="table table-bordered border-dark text-center"
          ref={PrintImageRef}
        >
          <thead className="table-dark border-light">
            <tr>
              {ImageFileHeaders.map((heading, i) => {
                return <td key={i}>{heading}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {addressFile ? (
                  <img
                    src={`data:image/jpeg;base64,${addressFile}`}
                    width="180"
                    height="85"
                    alt="addressFile"
                  />
                ) : (
                  <b>Loading...</b>
                )}
              </td>
              <td>
                {bankFile ? (
                  <img
                    src={`data:image/jpeg;base64,${bankFile}`}
                    width="180"
                    height="85"
                    alt="addressFile"
                  />
                ) : (
                  <b>Loading...</b>
                )}
              </td>
              <td>
                {panFile ? (
                  <img
                    src={`data:image/jpeg;base64,${panFile}`}
                    width="180"
                    height="85"
                    alt="panFile"
                  />
                ) : (
                  <b>Loading...</b>
                )}
              </td>
              <td>
                {paymentDocFile ? (
                  <img
                    src={`data:image/jpeg;base64,${paymentDocFile}`}
                    width="180"
                    height="85"
                    alt="paymentDocFile"
                  />
                ) : (
                  <b>Loading...</b>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ImageFilePriveiw;
