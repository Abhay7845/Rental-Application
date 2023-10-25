import React, { useState } from "react";
import Navbar from "../common/Navbar";
import AdminSideBar from "../common/AdminSideBar";
import { HOST_URL } from "../../API/HostURL";
import axios from "axios";
import Loader from "../common/Loader";
import AdminToggelSideBar from "../common/AdminToggelSideBar";
import Swal from "sweetalert2";

const UpdateMasterPrice = () => {
  const [loading, setLoading] = useState(false);
  const [uploadMasterFile, setUploadMasterFile] = useState("");
  const [showErrMsg, setShowErrMsg] = useState("");

  const UploadMasterFile = () => {
    if (!uploadMasterFile) {
      alert("Please Choose File");
    } else {
      setLoading(true);
      let formData = new FormData();
      formData.append("masterFile", uploadMasterFile);
      axios({
        method: "post",
        url: `${HOST_URL}/Admin/rate/master/update/rentalPrice`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => res)
        .then((response) => {
          console.log("response==>", response.data);
          if (response.data.code === "1000") {
            setShowErrMsg("");
            Swal.fire({
              title: "Success",
              text: response.data.value,
              icon: "success",
              confirmButtonColor: "#008080",
              confirmButtonText: "OK",
            });
          }
          if (response.data.code === "1001") {
            setShowErrMsg(response.data.value);
          }
          if (response.data.code === "1002") {
            setShowErrMsg(response.data.value);
          }
          if (response.data.code === "1003") {
            setShowErrMsg(response.data.value);
          }
          if (response.data.code === "1004") {
            setShowErrMsg(response.data.value);
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
          <p className="text-danger">{showErrMsg}</p>
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
