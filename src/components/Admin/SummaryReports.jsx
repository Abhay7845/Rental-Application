import React, { useState } from "react";
import Navbar from "../common/Navbar";
import AdminSideBar from "../common/AdminSideBar";
import AdminToggelSideBar from "../common/AdminToggelSideBar";
import { Field, Form, Formik } from "formik";
import { ReportsInitialValue, ReportsSchema } from "../../Schema/LoginSchema";
import ShowError from "../../Schema/ShowError";
import axios from "axios";
import { HOST_URL } from "../../API/HostURL";
import Loader from "../common/Loader";
import { AdminSummarHeaders } from "../../Data/DataList";

const SummaryReports = () => {
  const [loading, setLoading] = useState(false);
  const [summaryReports, setSummaryReports] = useState([]);

  const GetSummaryReports = (payload) => {
    setLoading(true);
    const { fromDate, toDate, storeCode } = payload;
    axios
      .get(`${HOST_URL}/Admin/order/summary/${storeCode}/${fromDate}/${toDate}`)
      .then((res) => res)
      .then((response) => {
        console.log("response==>", response.data);
        if (response.data.code === "1000") {
          setSummaryReports(response.data.value);
        }
        if (response.data.code === "1001") {
          alert("Sorry! Data Not Available For Selected Date");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("error==>", error);
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
        <div className="row mx-0 mt-3">
          <h5 className="text-center">SUMMARY REPORTS</h5>
          <Formik
            initialValues={ReportsInitialValue}
            validationSchema={ReportsSchema}
            onSubmit={(payload) => GetSummaryReports(payload)}
          >
            <Form>
              <div className="row g-2">
                <div className="col-md-4">
                  <label className="form-label">From Date</label>
                  <Field type="date" className="form-control" name="fromDate" />
                  <ShowError name="fromDate" />
                </div>
                <div className="col-md-4">
                  <label className="form-label">To Date</label>
                  <Field type="date" className="form-control" name="toDate" />
                  <ShowError name="toDate" />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Store Code</label>
                  <Field
                    as="select"
                    className="form-control"
                    placeholder="Store Code"
                    name="storeCode"
                  >
                    <option value="">Select</option>
                    <option value="MAMTHA">MAMTHA</option>
                  </Field>
                  <ShowError name="storeCode" />
                </div>
              </div>
              <div className="d-flex justify-content-end my-2">
                <button type="submit" className="CButton">
                  Next
                </button>
              </div>
            </Form>
          </Formik>
          {summaryReports.length > 0 && (
            <div className="table-responsive">
              <table className="table table-bordered border-dark text-center">
                <thead className="table-dark border-light">
                  <tr>
                    {AdminSummarHeaders.map((heading, i) => {
                      return <td key={i}>{heading}</td>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {summaryReports.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td>{item.storeCode}</td>
                        <td>{item.bookingDate}</td>
                        <td>{item.bookingRefNo}</td>
                        <td>{item.rentalStartDate}</td>
                        <td>{item.rentalEndDate}</td>
                        <td>{item.coolOffEndDate}</td>
                        <td>{item.status}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SummaryReports;
