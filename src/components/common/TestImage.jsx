import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

const TestImage = () => {
  const [imageUrl, setImageUrl] = useState("");
  console.log("imageUrl==>", imageUrl);
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("/upload", formData); // Replace with your server endpoint
      const generatedImageUrl = response.data.imageUrl;
      setImageUrl(generatedImageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  return (
    <div>
      <Navbar />
      <div>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {imageUrl && <img src={imageUrl} alt="Uploaded" />}
      </div>
    </div>
  );
};

export default TestImage;
