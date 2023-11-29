import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { HOST_URL } from "../../API/HostURL";
import axios from "axios";
import { BsXLg } from "react-icons/bs";
import Loader from "../common/Loader";

const ImageFilePriveiw = ({ orderData, Close }) => {
  const PrintImageRef = useRef(null);
  const PrintImagePdf = useReactToPrint({
    content: () => PrintImageRef.current,
  });
  const [uploadedImgData, setUploadedImgData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { bookingRefNo } = orderData;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${HOST_URL}/Admin/get/document/list/${bookingRefNo}`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setUploadedImgData(response.data.value);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [bookingRefNo]);

  // const handleDownload = (fileName, fileUrl) => {
  //   const link = document.createElement("a");
  //   link.href = fileUrl;
  //   link.download = fileName; // Rename the downloaded file if needed
  //   link.click();
  // };
  return (
    <div>
      {loading === true && <Loader />}
      <div className="d-flex justify-content-between my-2">
        <button className="CButton" onClick={PrintImagePdf}>
          Print Pdf
        </button>
        <BsXLg onClick={Close} size={22} cursor="pointer" color="#fff" />
      </div>
      <div className="table-responsive" ref={PrintImageRef}>
        <table className="table table-bordered border-dark text-center">
          <thead className="table-dark border-light">
            <tr>
              <td>Image</td>
              <td>Document Type</td>
              <td>Content For</td>
            </tr>
          </thead>
          <tbody>
            {uploadedImgData.map((item, i) => {
              return (
                <tr key={i}>
                  <td>
                    <img
                      src={item.fileUrl}
                      width="180"
                      height="85"
                      alt="Not Found"
                    />
                  </td>
                  <td style={{ fontSize: "10px", fontWeight: "bold" }}>
                    {item.documentType.toUpperCase()}
                  </td>
                  <td style={{ fontSize: "10px", fontWeight: "bold" }}>
                    {item.contentFor.toUpperCase()}
                  </td>
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
