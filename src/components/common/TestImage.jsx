import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { UploadImg } from "../../API/HostURL";
import { useNavigate } from "react-router-dom";

const TestImage = () => {
  const [imageName, setImageName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();
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

  const CheckUserRegistered = () => {
    const result = window.confirm("Customer not Registred Please Resgitred");
    if (result) {
      navigate("/new/customer");
    } else {
      console.log("User clicked Cancel");
    }
  };

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
      <button onClick={CheckUserRegistered}>Show Alert</button>
    </div>
  );
};

export default TestImage;
