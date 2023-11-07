import React, { useEffect } from "react";
import { ImageFileHeaders, ImageHeaders } from "../../Data/DataList";
import { FetchImg } from "../../API/HostURL";
import axios from "axios";

const ImageFilePriveiw = ({ previousTnxData, existedUser }) => {
  const docFile = previousTnxData.map((file) => file.paymentDocFileName);

  useEffect(() => {
    if (existedUser.addressProofFileName) {
      axios
        .get(`${FetchImg}${existedUser.addressProofFileName}`, {
          headers: ImageHeaders,
        })
        .then((res) => res)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log("error==>", error);
        });
    }
  }, [existedUser.addressProofFileName]);
  return (
    <div>
      <table className="table table-bordered border-dark text-center">
        <thead className="table-dark border-light">
          <tr>
            {ImageFileHeaders.map((heading, i) => {
              return <td key={i}>{heading}</td>;
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{existedUser.addressProofFileName}</td>
            <td>{existedUser.bankDetailFileName}</td>
            <td>{existedUser.panCardNoFileName}</td>
            <td>{docFile[0]}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ImageFilePriveiw;
