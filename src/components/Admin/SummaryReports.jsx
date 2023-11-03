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
  const [rowWiseDetails, setRowWiseDetails] = useState({});
  console.log("rowWiseDetails==>", rowWiseDetails);

  const GetSummaryReports = (payload) => {
    setLoading(true);
    const { fromDate, toDate, storeCode } = payload;
    axios
      .get(`${HOST_URL}/Admin/order/summary/${storeCode}/${fromDate}/${toDate}`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setSummaryReports(response.data.value);
        }
        if (response.data.code === "1001") {
          alert("Sorry! Data Not Available For Entered Inputs");
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
                    type="text"
                    className="form-control"
                    placeholder="Store Code"
                    name="storeCode"
                  />
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
                        <td>
                          <button
                            className="CButton"
                            data-bs-toggle="modal"
                            data-bs-target="#openSummaryDetails"
                            onClick={() => setRowWiseDetails(item)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {/*VIE DETAILS MODAL */}
      <div className="modal fade" id="openSummaryDetails">
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="table-responsive">
                <h5 className="text-center">ORDER DETAILS</h5>
                <div className="d-flex justify-content-between my-4 mx-1">
                  <b>Booking Ref No. :- 123ACVDF45654</b>
                  <b>Phone No. :- 9123437177</b>
                  <b>Custome Name :- Abhay Kumar</b>
                </div>
                <div className="accordion accordion-flush">
                  <div style={{ border: "1px solid gray" }}>
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseOne"
                        aria-expanded="false"
                      >
                        PRODUCT DETAILS
                      </button>
                    </h2>
                    <div
                      id="flush-collapseOne"
                      className="accordion-collapse collapse"
                    >
                      <div className="accordion-body">
                        Placeholder content for this accordion, which is
                        intended to demonstrate the class. This is the first
                        item's accordion body.
                      </div>
                    </div>
                  </div>
                  <div style={{ border: "1px solid gray" }}>
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseTwo"
                        aria-expanded="false"
                      >
                        ORDER SUMMARY
                      </button>
                    </h2>
                    <div
                      id="flush-collapseTwo"
                      className="accordion-collapse collapse"
                    >
                      <div className="accordion-body">
                        Placeholder content for this accordion, which is
                        intended to demonstrate the class. This is the first
                        item's accordion body.
                      </div>
                    </div>
                  </div>
                  <div style={{ border: "1px solid gray" }}>
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseThree"
                        aria-expanded="false"
                      >
                        PAYMENT DETAILS
                      </button>
                    </h2>
                    <div
                      id="flush-collapseThree"
                      className="accordion-collapse collapse"
                    >
                      <div className="accordion-body">
                        Placeholder content for this accordion, which is
                        intended to demonstrate the class. This is the first
                        item's accordion body.
                      </div>
                    </div>
                  </div>
                  <div style={{ border: "1px solid gray" }}>
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseFour"
                        aria-expanded="false"
                      >
                        CUSTOMER DETAILS
                      </button>
                    </h2>
                    <div
                      id="flush-collapseFour"
                      className="accordion-collapse collapse"
                    >
                      <div className="accordion-body">
                        Placeholder content for this accordion, which is
                        intended to demonstrate the class. This is the first
                        item's accordion body.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryReports;
