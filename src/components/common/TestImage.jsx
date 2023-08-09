import React from "react";
import Navbar from "./Navbar";
import axios from "axios";

const TestImage = () => {
  //   const [imageUrl, setImageUrl] = useState("");
  const UploadFile = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append(file.name, file);
    axios
      .post("https://jewbridge.titanjew.in/NPD/API/IMAGEFETCH", formData, {
        headers: {
          UserToken: "xFeToMkUuejH0aq1IzZYmw==",
          ApiKey: "636A4E75-2B3D-4B83-8DD6-F36046290E0F",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) =>
        res.then((response) => console.log("response==>", response))
      )
      .catch((error) => console.log("error==>", error));
  };
  return (
    <div>
      <Navbar />
      <div>
        <input type="file" onChange={UploadFile} />
      </div>
    </div>
  );
};

export default TestImage;
