import React, { useState } from "react";
import AdminSideBar from "../common/AdminSideBar";
import AdminToggelSideBar from "../common/AdminToggelSideBar";
import Navbar from "../common/Navbar";
import Loader from "../common/Loader";
import { Field, Form, Formik } from "formik";
import { updateProductInitial, updateProductSchema } from "../../Schema/LoginSchema";
import ShowError from "../../Schema/ShowError";
import { UpdateStoreHeaders, packageDayOption } from "../../Data/DataList";
import axios from "axios";
import { HOST_URL } from "../../API/HostURL";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';


const UpdateProductData = () => {
    const [loading, setLoading] = useState(false);
    const [updatedStoresData, setUpdatedStoresData] = useState({});

    const GetUpdateStoreCode = (payload) => {
        const UpdatesStorePayload = {
            storeCode: "",
            itemCode: payload.itemCode,
            reqBookingDate: payload.reqBookingDate,
            packageDays: payload.packageDays
        }
        console.log("UpdatesStorePayload==>", UpdatesStorePayload);
        setLoading(true);
        axios.post(`${HOST_URL}/check/availability/across/stores`, UpdatesStorePayload).then(res => res).then(response => {
            console.log("response.data.value==>", response.data);
            if (response.data.code === "1000") {
                setUpdatedStoresData(response.data.value);
            }
            setLoading(false);
        }).catch(error => setLoading(false))
    }

    return (
        <div>
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
                <div className="table-responsive mx-2">
                    {updatedStoresData.itemCode &&
                        <Table className="table table-bordered table-hover border-dark text-center">
                            <Thead className="table-dark border-light">
                                <Tr>
                                    {UpdateStoreHeaders.map((headers, i) => {
                                        return (<Th key={i}>{headers}</Th>)
                                    })}
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td> {updatedStoresData.itemCode}</Td>
                                    <Td>{updatedStoresData.cfa}</Td>
                                    <Td>{updatedStoresData.lotNo}</Td>
                                    <Td>{updatedStoresData.storeCode}</Td>
                                    <Td className={updatedStoresData.productStatus === "Product_Available" ? "text-success" : "text-danger"}>{updatedStoresData.productStatus.replace(/[A-Z]/g, " $&").replace(/_/g, "")}</Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    }
                </div>
            </div>
        </div>
    )
}

export default UpdateProductData;
