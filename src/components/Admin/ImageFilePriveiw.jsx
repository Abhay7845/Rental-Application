import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { HOST_URL } from "../../API/HostURL";
import axios from "axios";
import { BsXLg } from "react-icons/bs";
import Loader from "../common/Loader";
import { FilePopStyle } from "../../Schema/LoginSchema";
import { Modal } from "@mui/material";

const ImageFilePriveiw = ({ orderData, Close }) => {
  const PrintImageRef = useRef(null);
  const PrintImagePdf = useReactToPrint({
    content: () => PrintImageRef.current,
  });
  const [uploadedImgData, setUploadedImgData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [zoopImg, setZoopImg] = useState(false);
  const [zoopImgUrl, setZoopImgUrl] = useState("");
  const { tempBookingRefNo } = orderData;
  const FetchImageDocList = (tempBookingRefNo) => {
    setLoading(true);
    axios
      .get(`${HOST_URL}/Admin/get/document/list/${tempBookingRefNo}`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setUploadedImgData(response.data.value);
        }
        setLoading(false);
      }).catch((error) => setLoading(false));
  };

  useEffect(() => {
    FetchImageDocList(tempBookingRefNo);
  }, [tempBookingRefNo]);

  // const handleDownload = (fileName, fileUrl) => {
  //   const link = document.createElement("a");
  //   link.href = fileUrl;
  //   link.download = fileName;
  //   link.click();
  //   document.body.removeChild(link);
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
                      onClick={() => {
                        setZoopImg(true);
                        setZoopImgUrl(item.fileUrl)
                      }}
                      style={{ width: 140, height: 65, cursor: "pointer" }}
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
      <Modal open={zoopImg} onClose={() => setZoopImg(false)}>
        <div
          style={FilePopStyle}
          className="scrollable-container"
        >
          <BsXLg onClick={() => setZoopImg(false)} size={28} className="CloseZoomImage" />
          <img
            src={zoopImgUrl}
            className="img-fluid w-100"
            alt="Not Found"
          />
        </div>
      </Modal>
    </div>
  );
};

export default ImageFilePriveiw;
