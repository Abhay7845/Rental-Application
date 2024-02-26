import React, { useState } from "react";
import AdminSideBar from "../common/AdminSideBar";
import AdminToggelSideBar from "../common/AdminToggelSideBar";
import Navbar from "../common/Navbar";
import Loader from "../common/Loader";
import { Field, Form, Formik } from "formik";
import { updateProductInitial, updateProductSchema } from "../../Schema/LoginSchema";
import ShowError from "../../Schema/ShowError";
import { packageDayOption } from "../../Data/DataList";


const UpdateProductData = () => {
    const [loading, setLoading] = useState(false)

    const GetUpdateStoreCode = (payload) => {
        console.log("payload==>", payload);
    }

    return (<div>
        {loading === true && <Loader />}
        <Navbar />
        <div className="DropdownForAdmin">
            <AdminToggelSideBar />
        </div>
        <AdminSideBar />
        <div className="main">
            <div className="row mx-0 mt-3">
                <h5 className="text-center">UPDATE PRODUCT DATA</h5>
                <Formik
                    initialValues={updateProductInitial}
                    validationSchema={updateProductSchema}
                    onSubmit={(payload) => GetUpdateStoreCode(payload)}
                >
                    <Form>
                        <div className="row g-2">
                            <div className="col-md-4">
                                <label className="form-label">From Date</label>
                                <Field type="text" className="form-control" name="itemCode" placeholder="Item Code" />
                                <ShowError name="itemCode" />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">To Date</label>
                                <Field type="date" className="form-control" name="reqBookingDate" />
                                <ShowError name="reqBookingDate" />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Store Code</label>
                                <Field
                                    as="select"
                                    className="form-control"
                                    placeholder="Store Code"
                                    name="packageDays"
                                >
                                    <option value="">Select Days</option>
                                    {packageDayOption.map((days, i) => {
                                        return (
                                            <option key={i} value={days.value}>
                                                {days.label}
                                            </option>
                                        );
                                    })}
                                </Field>
                                <ShowError name="packageDays" />
                            </div>
                        </div>
                        <div className="d-flex justify-content-end my-2">
                            <button type="submit" className="CButton">
                                Next
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    </div>
    )
}

export default UpdateProductData;
