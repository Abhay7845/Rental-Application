import React, { useState, useRef } from "react";
import Navbar from "./Navbar";
import axios from "axios";

const TestImage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const UploadFile = (event) => {
    const file = event.target.files[0];
    console.log("file==>", file);
    const formData = new FormData();
    formData.append("ImgName", file.name);
    formData.append("files", file);
    console.log("formData==>", formData);
    axios
      .post("https://jewbridge.titanjew.in/NPD/API/IMAGEFETCH", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          UserToken: "xFeToMkUuejH0aq1IzZYmw==",
          ApiKey: "636A4E75-2B3D-4B83-8DD6-F36046290E0F",
        },
      })
      .then((res) => res)
      .then((response) => console.log("response==>", response))
      .catch((error) => console.log("error==>", error));
  };

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const canvas = canvasRef.current;
  const video = videoRef.current;

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const captureImage = () => {
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL("image/png");
    setImageUrl(dataURL);
  };

  return (
    <div>
      <Navbar />
      <input type="file" onChange={UploadFile} capture="image" />
      <video ref={videoRef} autoPlay muted />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={captureImage}>Capture Image</button>
      <img src={imageUrl} alt="sdksak" />
    </div>
  );
};

export default TestImage;
