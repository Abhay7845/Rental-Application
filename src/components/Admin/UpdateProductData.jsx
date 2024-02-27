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
import { toast } from "react-toastify";
import { BsAmd } from "react-icons/bs";

const UpdateProductData = () => {
    const [loading, setLoading] = useState(false);
    const [updatedStoresData, setUpdatedStoresData] = useState([]);

    const GetUpdateStoreCode = (payload) => {
        const UpdatesStorePayload = {
            storeCode: "",
            itemCode: payload.itemCode,
            reqBookingDate: payload.reqBookingDate,
            packageDays: payload.packageDays
        }
        setLoading(true);
        axios.post(`${HOST_URL}/check/availability/across/stores`, UpdatesStorePayload)
            .then(res => res).then(response => {
                console.log("response.data.value==>", response.data);
                if (response.data.code === "1000") {
                    setUpdatedStoresData(response.data.value);
                } else if (response.data.code === "1001") {
                    toast.warn("No Records Found", { theme: "colored", autoClose: 3000 });
                }
                setLoading(false);
            }).catch(error => setLoading(false))
    }

    const UpdateRowsStatus = (data) => {
        console.log("data==>", data);
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
                    <h5 className="text-center mb-3">UPDATE PRODUCT DATA</h5>
                    <Formik
                        initialValues={updateProductInitial}
                        validationSchema={updateProductSchema}
                        onSubmit={(payload) => GetUpdateStoreCode(payload)}
                    >
                        <Form>
                            <div className="row g-2 mx-0">
                                <div className="col-md-4">
                                    <label className="form-label">Item Code</label>
                                    <Field type="text" className="form-control" name="itemCode" placeholder="Item Code" />
                                    <ShowError name="itemCode" />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">Request Booking Date</label>
                                    <Field type="date" className="form-control" name="reqBookingDate" />
                                    <ShowError name="reqBookingDate" />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">Package Days</label>
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
                {updatedStoresData.length > 0 &&
                    <div className="table-responsive mx-2">
                        <Table className="table table-bordered table-hover border-dark text-center">
                            <Thead className="table-dark border-light">
                                <Tr>
                                    {UpdateStoreHeaders.map((headers, i) => {
                                        return (<Th key={i}>{headers}</Th>)
                                    })}
                                </Tr>
                            </Thead>
                            <Tbody>
                                {updatedStoresData.map((item, i) => {
                                    return (
                                        <Tr key={i}>
                                            <Td>{item.pdtId}</Td>
                                            <Td>{item.itemCode}</Td>
                                            <Td>{item.cfa}</Td>
                                            <Td>{item.lotNo}</Td>
                                            <Td>{item.storeCode}</Td>
                                            <Td className={item.productStatus === "Product_Available" ? "text-success" : "text-danger"}>{item.productStatus.replace(/[A-Z]/g, " $&").replace(/_/g, "")}</Td>
                                            <Td className="text-center"><BsAmd cursor="pointer" onClick={() => UpdateRowsStatus(item)} /></Td>
                                        </Tr>
                                    )
                                })}
                            </Tbody>
                        </Table>
                    </div>
                }
            </div>
        </div >
    )
}

export default UpdateProductData;
