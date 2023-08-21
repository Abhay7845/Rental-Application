import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { UploadImg } from "../../API/HostURL";

const TestImage = () => {
  const [imageName, setImageName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const UploadFile = (event) => {
    const file = event.target.files[0];
    console.log("file==>", file);
    const formData = new FormData();
    formData.append("ImgName", file.name);
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
        if (response.data) {
          setImageName(file.name);
        }
      })
      .catch((error) => console.log("error==>", error));
  };

  useEffect(() => {
    if (imageName) {
      axios
        .get(`${UploadImg}/?ImageName=${imageName}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            UserToken: "xFeToMkUuejH0aq1IzZYmw==",
            ApiKey: "636A4E75-2B3D-4B83-8DD6-F36046290E0F",
          },
        })
        .then((res) => res)
        .then((response) => {
          console.log("response==>", response);
          if (response.data) {
            setImageUrl(response.data);
          }
        })
        .catch((error) => console.log("error=>", error));
    }
  }, [imageName]);

  return (
    <div>
      <Navbar />
      <input type="file" onChange={UploadFile} capture="image" />
      {imageUrl && (
        <img
          src={`data:image/jpeg;base64,${imageUrl}`}
          alt="imageUrl"
          height="100"
        />
      )}
    </div>
  );
};

export default TestImage;
