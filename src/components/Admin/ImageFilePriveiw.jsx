import React, { useEffect, useRef, useState } from "react";
import { ImageHeaders } from "../../Data/DataList";
import { useReactToPrint } from "react-to-print";
import { FetchImg, HOST_URL } from "../../API/HostURL";
import axios from "axios";

const ImageFilePriveiw = ({ previousTnxData, existedUser }) => {
  const PrintImageRef = useRef(null);
  const PrintImagePdf = useReactToPrint({
    content: () => PrintImageRef.current,
  });
  const [uploadedImgData, setUploadedImgData] = useState([]);

  const [showImage, setShowImage] = useState("");

  useEffect(() => {
    axios
      .get(`${HOST_URL}/Admin/get/document/list/SIM-R-2023-11-03-746787`, {
        headers: ImageHeaders,
      })
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setUploadedImgData(response.data.value);
        }
      })
      .catch((error) => {
        console.log("error==>", error);
      });
  }, []);
  const FetchUploadedImage = (imgUrl) => {
    axios
      .get(`${FetchImg}${imgUrl}`, {
        headers: ImageHeaders,
      })
      .then((res) => res)
      .then((response) => setShowImage(response.data))
      .catch((error) => {
        console.log("error==>", error);
      });
  };

  return (
    <div>
      <div className="d-flex justify-content-end my-2">
        <button
          className="CButton"
          // className={
          //   addressFile && bankFile && panFile && paymentDocFile
          //     ? "CButton"
          //     : "CDisabled"
          // }
          // disabled={
          //   addressFile && bankFile && panFile && paymentDocFile ? false : true
          // }
          onClick={PrintImagePdf}
        >
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
              <td>Image</td>
              <td>Details</td>
            </tr>
          </thead>
          <tbody>
            {uploadedImgData.map((item, i) => {
              return (
                <tr key={i}>
                  <td>
                    {FetchUploadedImage("1234gbvfgtyh.png")}
                    {showImage ? (
                      <img
                        src={`data:image/jpeg;base64,${showImage}`}
                        width="180"
                        height="85"
                        alt="Not Found"
                      />
                    ) : (
                      <b>Loading...</b>
                    )}
                  </td>
                  <td>{item.documentType.toUpperCase()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ImageFilePriveiw;
