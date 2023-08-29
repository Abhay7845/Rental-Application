import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { UploadImg } from "../../API/HostURL";

const TestImage = () => {
  const [imageName, setImageName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const UploadFile = (event) => {
    const file = event.target.files[0];
    const fileExtention = file.name.split(".");
    console.log("fileExtention==>", fileExtention[1]);
    const formData = new FormData();
    formData.append("ImgName", `NNNNN1234N432345.${fileExtention[1]}`);
    formData.append("files", file);
    axios
      .post(`${UploadImg}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          UserToken: "xFeToMkUuejH0aq1IzZYmw==",
          ApiKey: "636A4E75-2B3D-4B83-8DD6-F36046290E0F",
        },
      })
      .then((res) => res)
      .then((response) => {
        console.log("responseUpload==>", response.data);
        if (response.data) {
          setImageName("NNNNN1234N432345");
        }
      })
      .catch((error) => console.log("error==>", error));
  };

  useEffect(() => {
    axios
      .get(
        `https://jewbridge.titanjew.in/NPD/api/Docfetch/DownloadImage/?ImageName=NNNNN1234N432345.png`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            UserToken: "xFeToMkUuejH0aq1IzZYmw==",
            ApiKey: "636A4E75-2B3D-4B83-8DD6-F36046290E0F",
          },
        }
      )
      .then((res) => res)
      .then((response) => {
        console.log("responseFetch==>", response.data);
        if (response.data) {
          setImageUrl(response.data);
        }
      })
      .catch((error) => console.log("error=>", error));
  }, [imageName]);

  return (
    <div>
      <Navbar />
      <input type="file" onChange={UploadFile} capture="image" />
      {imageUrl && (
        <img
          src={`data:image/jpeg;base64,${imageUrl}`}
          // src={imageUrl}
          alt="imageUrl"
          height="100"
        />
      )}
    </div>
  );
};

export default TestImage;
