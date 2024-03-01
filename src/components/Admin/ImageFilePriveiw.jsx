import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { HOST_URL } from "../../API/HostURL";
import axios from "axios";
import { BsXLg } from "react-icons/bs";
import Loader from "../common/Loader";
import { FilePopStyle } from "../../Schema/LoginSchema";
import { Modal } from "@mui/material";
import { BsCloudDownloadFill } from "react-icons/bs";
import pdf from '../../Asset/Img/pdfIcon.png'

const ImageFilePriveiw = ({ orderData, Close }) => {
  const PrintImageRef = useRef(null);
  const PrintImagePdf = useReactToPrint({ content: () => PrintImageRef.current });
  const [uploadedImgData, setUploadedImgData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [zoopImg, setZoopImg] = useState(false);
  const [zoopImgUrl, setZoopImgUrl] = useState("");
  const { tempBookingRefNo } = orderData;

  const FetchImageDocList = (tempBookingRefNo) => {
    setLoading(true);
    axios.get(`${HOST_URL}/Admin/get/document/list/${tempBookingRefNo}`)
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

  const DownloadImageFile = async (imgUrl, documentType) => {
    const response = await fetch(imgUrl);
    const blob = await response.blob();
    let link = document.createElement('a');
    link.download = `${documentType}.jpg`;
    const url = URL.createObjectURL(blob);
    link.href = url;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  const DownloadPdfFile = (imgUrl, documentType) => {
    const link = document.createElement('a');
    link.href = imgUrl;
    link.download = `${documentType}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
              <td>IMAGE</td>
              <td>DOCUMENT TYPE</td>
              <td>CONTENT FOR</td>
            </tr>
          </thead>
          <tbody>
            {uploadedImgData.map((item, i) => {
              const extention = item.fileUrl.split('.').pop();
              return (
                <tr key={i}>
                  <td>
                    {extention.toLowerCase() === "pdf" ?
                      <div>
                        <BsCloudDownloadFill className="dowaloadBtn"
                          onClick={() => DownloadPdfFile(item.fileUrl, item.documentType)}
                        />
                        <img
                          src={pdf}
                          style={{ width: 140, height: 65, cursor: "pointer" }}
                          alt="Not Found"
                        />
                      </div>
                      : <div>
                        <BsCloudDownloadFill className="dowaloadBtn" onClick={() => DownloadImageFile(item.fileUrl, item.documentType)} />
                        <img
                          src={item.fileUrl}
                          onClick={() => {
                            setZoopImg(true);
                            setZoopImgUrl(item.fileUrl);
                          }}
                          style={{ width: 140, height: 70, cursor: "pointer" }}
                          alt="Not Found"
                        />
                      </div>}
                  </td>
                  <td style={{ fontSize: "10px", fontWeight: "bold" }}>
                    {item.documentType.toUpperCase()}
                  </td>
                  <td style={{ fontSize: "10px", fontWeight: "bold" }}>
                    {item.contentFor.replace(/[A-Z]/g, " $&").replace(/_/g, "").toUpperCase()}
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
