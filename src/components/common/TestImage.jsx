import React, { useState, useEffect } from "react";
import { ImageHeaders } from "../../Data/DataList";
import { UploadImg, FetchImg } from "../../API/HostURL";
import axios from "axios";

const TestImage = () => {
  const [sameCustFile, setSameCustFile] = useState([]);
  const [sameCutIDFileName, setSameCutIDFileName] = useState("");
  const [panImageUrl, setPanImgUrl] = useState("");

  const UploadSameCustIDProof = () => {
    if (sameCustFile.length === 0) {
      alert("Please Choose File");
    } else {
      const formData = new FormData();
      const fileEx = sameCustFile.name.split(".");
      const fileExtention = `1234gbvfgtyh.${fileEx[1]}`;
      formData.append("ImgName", fileExtention);
      formData.append("files", sameCustFile);
      axios
        .post(`${UploadImg}`, formData, {
          headers: ImageHeaders,
        })
        .then((res) => res)
        .then((response) => {
          console.log(response.data);
          if (response.data) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setSameCutIDFileName(fileExtention);
            };
            if (sameCustFile) {
              reader.readAsDataURL(sameCustFile);
            }
          }
        })
        .catch((error) => console.log(error));
    }
  };
  console.log("sameCutIDFileName==>", sameCutIDFileName);
  useEffect(() => {
    if (sameCutIDFileName) {
      axios
        .get(`${FetchImg}${sameCutIDFileName}`, {
          headers: ImageHeaders,
        })
        .then((res) => res)
        .then((response) => {
          console.log(response.data);
          if (response.data) {
            setPanImgUrl(response.data);
          }
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  }, [sameCutIDFileName]);
  return (
    <div>
      <input
        type="file"
        id="sameCust"
        className="form-control"
        accept=".jpeg, .png"
        onChange={(e) => setSameCustFile(e.target.files[0])}
      />
      <button onClick={UploadSameCustIDProof}>upload</button>
      <img
        src={`data:image/jpeg;base64,${panImageUrl}`}
        alt=""
        width="180"
        height="85"
      />
    </div>
  );
};

export default TestImage;
