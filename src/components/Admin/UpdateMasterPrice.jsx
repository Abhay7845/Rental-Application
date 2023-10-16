import React, { useState } from "react";
import Navbar from "../common/Navbar";
import AdminSideBar from "../common/AdminSideBar";
import { HOST_URL } from "../../API/HostURL";
import axios from "axios";
import Loader from "../common/Loader";
import AdminToggelSideBar from "../common/AdminToggelSideBar";

const UpdateMasterPrice = () => {
  const [loading, setLoading] = useState(false);
  const [uploadMasterFile, setUploadMasterFile] = useState("");

  const UploadMasterFile = () => {
    if (!uploadMasterFile) {
      alert("Please Choose File");
    } else {
      setLoading(true);
      let formData = new FormData();
      formData.append("masterFile", uploadMasterFile);
      axios({
        method: "post",
        url: `${HOST_URL}/Rental/Admin/rate/master/update/rentalPrice`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => res)
        .then((response) => {
          console.log("response==>", response.data);
          if (response.data.code === "1000") {
            alert("Updated Succesfully");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log("error==>", error);
          setLoading(false);
        });
    }
  };

  return (
    <div>
      {loading === true && <Loader />}
      <Navbar />
      <div className="DropdownForAdmin">
        <AdminToggelSideBar />
      </div>
      <AdminSideBar />
      <div className="main">
        <h5 className="text-center mt-2">UPDATE ITEM PRICE MASTER</h5>
        <div className="mx-1">
          <b className="p-1">Master File</b>
          <input
            type="file"
            className="DateSelect"
            onChange={(e) => setUploadMasterFile(e.target.files[0])}
          />
          <div className="d-flex justify-content-end mt-3">
            <button className="CButton">View</button>
            <button className="CButton mx-2">Deactivate</button>
            <button className="CButton" onClick={UploadMasterFile}>
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateMasterPrice;
