import React, { useEffect, useRef, useState } from "react";
import { ImageHeaders } from "../../Data/DataList";
import { useReactToPrint } from "react-to-print";
import { FetchImg, HOST_URL } from "../../API/HostURL";
import axios from "axios";
import { BsXLg } from "react-icons/bs";

const ImageFilePriveiw = ({ previousTnxData, Close }) => {
  const PrintImageRef = useRef(null);
  const PrintImagePdf = useReactToPrint({
    content: () => PrintImageRef.current,
  });
  const [uploadedImgData, setUploadedImgData] = useState([]);
  const [showImage, setShowImage] = useState("");
  const imageUrl = uploadedImgData.map((url) => url.fileUrl);
  console.log("imageUrl==>", imageUrl);

  useEffect(() => {
    axios
      .get(`${HOST_URL}/Admin/get/document/list/MAMTHA-R-2023-11-09-635809`, {
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
      .get(imgUrl, {
        headers: ImageHeaders,
      })
      .then((res) => res)
      .then((response) => setShowImage(response.data))
      .catch((error) => {
        console.log("error==>", error);
      });
  };

  // const handleDownload = (fileName, fileUrl) => {
  //   const link = document.createElement("a");
  //   link.href = fileUrl;
  //   link.download = fileName; // Rename the downloaded file if needed
  //   link.click();
  // };
  return (
    <div>
      <div className="d-flex justify-content-between my-2">
        <button className="CButton" onClick={PrintImagePdf}>
          Print Pdf
        </button>
        <BsXLg onClick={Close} size={22} cursor="pointer" color="#fff" />
      </div>
      <div className="table-responsive">
        <table
          className="table table-bordered border-dark text-center"
          ref={PrintImageRef}
        >
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
                    {FetchUploadedImage(item.fileUrl)}
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
