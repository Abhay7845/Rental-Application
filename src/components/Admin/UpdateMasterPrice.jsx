import React, { useState } from "react";
import Navbar from "../common/Navbar";
import AdminSideBar from "../common/AdminSideBar";
import { Formik, Form, Field } from "formik";
import { HOST_URL } from "../../API/HostURL";
import axios from "axios";
import ShowError from "../../Schema/ShowEroor";
import { FileInitialValue, masterSchema } from "../../Schema/LoginSchema";
import Loader from "../common/Loader";
import AdminToggelSideBar from "../common/AdminToggelSideBar";

const UpdateMasterPrice = () => {
  const [loading, setLoading] = useState(false);

  const UploadMasterFile = (payload) => {
    setLoading(true);
    const { masterFile } = payload;
    let formData = new FormData();
    formData.append("masterFile", masterFile);
    axios({
      method: "post",
      url: `${HOST_URL}/rate/master/update/rentalPrice`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => res)
      .then((response) => console.log(""))
      .catch((error) => {
        setLoading(false);
      });
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
        <Formik
          initialValues={FileInitialValue}
          validationSchema={masterSchema}
          onSubmit={(payload) => UploadMasterFile(payload)}
        >
          <Form className="mx-1">
            <b className="p-1">Master File</b>
            <Field type="file" className="DateSelect" name="masterFile" />
            <ShowError name="masterFile" />
            <div className="d-flex justify-content-end mt-3">
              <button type="submit" className="CButton">
                UPLOAD
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default UpdateMasterPrice;
