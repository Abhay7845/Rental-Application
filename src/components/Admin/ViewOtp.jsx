import React, { useState } from "react";
import AdminSideBar from "../common/AdminSideBar";
import axios from "axios";
import AdminToggelSideBar from "../common/AdminToggelSideBar";
import Loader from "../common/Loader";
import Navbar from "../common/Navbar";
import { otpInitialValue, otpValidationSchema } from "../../Schema/LoginSchema";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { Field, Form, Formik } from "formik";
import ShowError from "../../Schema/ShowError";
import { HOST_URL } from "../../API/HostURL";

const ViewOtp = () => {
    const [loading, setLoading] = useState(false);
    const [otpDetails, setOtpDetails] = useState({});

    const ViewListOtp = (payload) => {
        setLoading(true);
        axios.get(`${HOST_URL}/get/otp/from/db/${payload.customePhone}`)
            .then((res) => res)
            .then((response) => {
                if (response.data.code === "1000") {
                    setOtpDetails(response.data.value);
                }
                setLoading(false);
            }).catch((error) => setLoading(false));
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
                    <h5 className="text-center mb-3">VIEW OTP</h5>
                    <Formik
                        initialValues={otpInitialValue}
                        validationSchema={otpValidationSchema}
                        onSubmit={(payload) => ViewListOtp(payload)}
                    >
                        <Form>
                            <div className="row g-2 mx-0">
                                <div className="col-md-4">
                                    <label className="form-label">Customer Phone</label>
                                    <Field type="text" className="form-control" name="customePhone" placeholder="Customer Phone" />
                                    <ShowError name="customePhone" />
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
                {otpDetails.otp && <div className="table-responsive mx-2">
                    <Table className="table table-bordered table-hover border-dark text-center">
                        <Thead className="table-dark border-light">
                            <Tr>
                                <Th>Phone Number</Th>
                                <Th>OTP</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>{otpDetails.mobileNo}</Td>
                                <Td>{otpDetails.otp}</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </div>}
            </div>
        </div>)
}
export default ViewOtp;