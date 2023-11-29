import React, { useState, useEffect } from "react";
import Navbar from "../common/Navbar";
import AdminSideBar from "../common/AdminSideBar";
import AdminToggelSideBar from "../common/AdminToggelSideBar";
import { Field, Form, Formik } from "formik";
import {
  ReportsInitialValue,
  ReportsSchema,
  FilePopStyle,
} from "../../Schema/LoginSchema";
import ShowError from "../../Schema/ShowError";
import axios from "axios";
import { HOST_URL } from "../../API/HostURL";
import Loader from "../common/Loader";
import {
  AdminSummarHeaders,
  CustomerBankDlsHeaders,
  CustomerDlsHeaders,
  OrderSummaryDlsHeaders,
  PaymentDlsHeaders,
  ProductDlsHeaders,
} from "../../Data/DataList";
import { BsXLg } from "react-icons/bs";
import Swal from "sweetalert2";
import moment from "moment";
import AdminSummaryPdf from "../Pdf/AdminSummaryPdf";
import {
  Modal,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ImageFilePriveiw from "./ImageFilePriveiw";

const SummaryReports = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [orderData, setOrderData] = useState({});
  const [summaryReports, setSummaryReports] = useState([]);
  const [commonTableData, setCommonTableData] = useState([]);
  const [previousTnxData, setPreviousTnxData] = useState([]);
  const [totalPaidAmount, setTotalPaidAmount] = useState({});
  const [existedUser, setExistedUser] = useState({});
  const cutName = commonTableData.map((name) => name.customerName);
  const cutPhone = commonTableData.map((name) => name.mobileNo);
  const customerName = cutName[0];
  const customerPhone = cutPhone[0];

  const ShowAlertForRefNo = () => {
    Swal.fire({
      title: "Order Booking is Not Completed Yet!",
      text: "Hence: Order Details is not Available!",
      icon: "warning",
      confirmButtonColor: "#008080",
      confirmButtonText: "OK",
    });
  };

  useEffect(() => {
    if (customerPhone) {
      setLoading(true);
      axios
        .get(`${HOST_URL}/rental/customer/details/mobileNo/${customerPhone}`)
        .then((res) => res)
        .then((response) => {
          if (response.data.code === "1000") {
            setExistedUser(response.data.value);
          }
          setLoading(false);
        })
        .then((error) => {
          setLoading(false);
        });
    }
  }, [customerPhone]);
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
        setLoading(false);
      });
  };
  const GetPreviousTnx = (data) => {
    const { bookingId } = data;
    axios
      .get(
        `${HOST_URL}/get/prev/txn/details/forReturn/pdf/${bookingId}/Payment_PendingFor_NewBooking`
      )
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setPreviousTnxData(response.data.value);
        } else if (response.data.code === "1001") {
          setPreviousTnxData([]);
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  const GetTotalSumOfAmount = (data) => {
    const { storeCode, bookingRefNo } = data;
    axios
      .get(
        `${HOST_URL}/fetch/sumOf/amounts/common/${storeCode}/${bookingRefNo}`
      )
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setTotalPaidAmount(response.data.value);
          GetPreviousTnx(response.data.value);
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const GetRowWiseDetails = (data) => {
    setOrderData(data);
    const { storeCode, bookingRefNo, tempBookingRefNo } = data;
    if (bookingRefNo) {
      setLoading(true);
      axios
        .get(
          `${HOST_URL}/fetch/table/common/data/${storeCode}/${bookingRefNo}/${tempBookingRefNo}`
        )
        .then((res) => res)
        .then((response) => {
          if (response.data.code === "1000") {
            setCommonTableData(response.data.value);
            GetTotalSumOfAmount(data);
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    } else if (!bookingRefNo) {
      ShowAlertForRefNo();
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
                        <td>{moment(item.bookingDate).format("DD-MM-YYYY")}</td>
                        <td>{item.bookingRefNo}</td>
                        <td>
                          {moment(item.rentalStartDate).format("DD-MM-YYYY")}
                        </td>
                        <td>
                          {moment(item.rentalEndDate).format("DD-MM-YYYY")}
                        </td>
                        <td>
                          {moment(item.coolOffEndDate).format("DD-MM-YYYY")}
                        </td>
                        <td>{item.status}</td>
                        <td>
                          <button
                            className="CButton"
                            data-bs-toggle={item.bookingRefNo ? "modal" : ""}
                            data-bs-target="#openSummaryDetails"
                            onClick={() => GetRowWiseDetails(item)}
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
      {/*VIEW DETAILS MODAL */}
      <div className="modal fade" id="openSummaryDetails">
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content">
            <div
              className="modal-header"
              style={{ backgroundColor: "#008080", color: "#ffff" }}
            >
              <h5 className="modal-title">ORDER DETAILS</h5>
              <div className="d-flex">
                <AdminSummaryPdf
                  orderData={orderData}
                  commonTableData={commonTableData}
                  previousTnxData={previousTnxData}
                  existedUser={existedUser}
                  totalPaidAmount={totalPaidAmount}
                />
                <BsXLg
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  size={25}
                  cursor="pointer"
                />
              </div>
            </div>
            <div className="modal-body">
              {loading === true && <Loader />}
              <div className="table-responsive">
                <div className="d-flex justify-content-between mx-1">
                  <b>Booking Ref No. :- {orderData.bookingRefNo}</b>
                  <b>
                    Custome Name :-
                    {!customerName ? "" : customerName.toUpperCase()}
                  </b>
                  <b>Phone No. :- {customerPhone}</b>
                </div>
                <div className="mt-4" style={{ border: "1.4px solid #c1c4c5" }}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <h6>PRODUCT DETAILS</h6>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="table-responsive">
                        <table className="table table-bordered border-dark text-center">
                          <thead className="table-dark border-light">
                            <tr style={{ fontSize: "15px" }}>
                              {ProductDlsHeaders.map((heading, i) => {
                                return <td key={i}>{heading}</td>;
                              })}
                            </tr>
                          </thead>
                          <tbody>
                            {commonTableData.map((item, i) => {
                              return (
                                <tr key={i}>
                                  <td>{item.itemCode}</td>
                                  <td>{item.lotNo}</td>
                                  <td>{item.grossWt}</td>
                                  <td>{item.productValue}</td>
                                  <td>{parseInt(item.rentalAmount)}</td>
                                  <td>
                                    {parseFloat(
                                      item.rentalAmount * 1.18
                                    ).toFixed(2)}
                                  </td>
                                  <td>{parseInt(item.depositAmount)}</td>
                                </tr>
                              );
                            })}
                            <tr>
                              <th colSpan="3" />
                              <th>
                                {new Intl.NumberFormat("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                  minimumFractionDigits: false,
                                }).format(totalPaidAmount.totalProductValue)}
                              </th>
                              <th>
                                {new Intl.NumberFormat("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                  minimumFractionDigits: false,
                                }).format(totalPaidAmount.totalRentalValue)}
                              </th>
                              <th>
                                {new Intl.NumberFormat("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                  minimumFractionDigits: 2,
                                }).format(totalPaidAmount.totalBookingAmount)}
                              </th>
                              <th>
                                {new Intl.NumberFormat("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                  minimumFractionDigits: false,
                                }).format(totalPaidAmount.totalDepositAmount)}
                              </th>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <h6>ORDER SUMMARY</h6>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="table-responsive">
                        <table className="table table-bordered border-dark text-center">
                          <thead className="table-dark border-light">
                            <tr style={{ fontSize: "15px" }}>
                              {OrderSummaryDlsHeaders.map((heading, i) => {
                                return <td key={i}>{heading}</td>;
                              })}
                            </tr>
                          </thead>
                          <tbody>
                            {commonTableData.map((item, i) => {
                              const { penaltyCharges, damageCharges } = item;
                              return (
                                <tr key={i}>
                                  <td>{item.itemCode}</td>
                                  <td>{item.deliveredWt}</td>
                                  <td>{item.actualWtReturn}</td>
                                  <td>
                                    {parseFloat(
                                      item.rentalAmount * 1.18
                                    ).toFixed(2)}
                                  </td>
                                  <td>{parseInt(item.depositAmount)}</td>
                                  <td>
                                    {penaltyCharges === "" ? 0 : penaltyCharges}
                                  </td>
                                  <td>
                                    {damageCharges === "" ? 0 : damageCharges}
                                  </td>
                                </tr>
                              );
                            })}
                            <tr>
                              <th colSpan="3" className="text-end">
                                TOTAL
                              </th>
                              <th>
                                {new Intl.NumberFormat("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                  minimumFractionDigits: false,
                                }).format(totalPaidAmount.totalBookingAmount)}
                              </th>
                              <th>
                                {new Intl.NumberFormat("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                  minimumFractionDigits: false,
                                }).format(totalPaidAmount.totalDepositAmount)}
                              </th>
                              <th>
                                {new Intl.NumberFormat("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                  minimumFractionDigits: false,
                                }).format(totalPaidAmount.totalPenaltyCharges)}
                              </th>
                              <th>
                                {new Intl.NumberFormat("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                  minimumFractionDigits: false,
                                }).format(totalPaidAmount.totalDamageCharges)}
                              </th>
                            </tr>
                          </tbody>
                        </table>
                        <table className="table table-bordered border-dark text-center">
                          <thead className="table-dark border-light">
                            <tr style={{ fontSize: "15px" }}>
                              <td>Cancellation Charge</td>
                              <td>Discount Amount</td>
                              <td>Refund Amount</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th>
                                {new Intl.NumberFormat("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                  minimumFractionDigits: false,
                                }).format(totalPaidAmount.cancellationCharges)}
                              </th>
                              <th>
                                {new Intl.NumberFormat("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                  minimumFractionDigits: false,
                                }).format(totalPaidAmount.totalDiscountAmount)}
                              </th>
                              <th>
                                {new Intl.NumberFormat("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                  minimumFractionDigits: false,
                                }).format(0)}
                              </th>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel3a-content"
                      id="panel3a-header"
                    >
                      <h6>PAYMENT DETAILS</h6>
                    </AccordionSummary>
                    <AccordionDetails>
                      {previousTnxData.length > 0 ? (
                        <div className="table-responsive">
                          <table className="table table-bordered border-dark text-center">
                            <thead className="table-dark border-light">
                              <tr style={{ fontSize: "15px" }}>
                                {PaymentDlsHeaders.map((heading, i) => {
                                  return <td key={i}>{heading}</td>;
                                })}
                              </tr>
                            </thead>
                            <tbody>
                              {previousTnxData.map((item, i) => {
                                return (
                                  <tr key={i}>
                                    <td>
                                      {item.paymentFor ===
                                      "Payment_PendingFor_RentalReturn"
                                        ? "Additional Charge"
                                        : item.paymentFor ===
                                          "Payment_PendingFor_NewBooking"
                                        ? "Booking Amount"
                                        : item.paymentFor ===
                                          "Payment_PendingFor_RentalIssuance"
                                        ? "Damage Protection Charge"
                                        : ""}
                                    </td>
                                    <td>{item.paymentType}</td>
                                    <td>{item.txnRefNo}</td>
                                    <td className="text-end">
                                      {parseInt(item.amount)}
                                    </td>
                                    <td>{item.paymentDocFileName}</td>
                                    <td>{moment().format("DD-MM-YYYY")}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <b className="text-danger">
                          Payment Details Are Not Available!
                        </b>
                      )}
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel4a-content"
                      id="panel4a-header"
                    >
                      <h6>CUSTOMER DETAILS</h6>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="table-responsive">
                        <table className="table table-bordered border-dark text-center">
                          <thead className="table-dark border-light">
                            <tr style={{ fontSize: "15px" }}>
                              {CustomerDlsHeaders.map((heading, i) => {
                                return <td key={i}>{heading}</td>;
                              })}
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{existedUser.customerName}</td>
                              <td>{existedUser.mobileNo}</td>
                              <td>{existedUser.emailId}</td>
                              <td>{existedUser.panCardNo}</td>
                              <td>{existedUser.panCardNoFileName}</td>
                              <td>
                                {existedUser.customerCity},
                                {existedUser.customerAddress1},
                                {existedUser.customerAddress2},
                                {existedUser.customerCityPincode}
                              </td>
                              <td>{existedUser.addressProofIdNo}</td>
                              <td>{existedUser.addressProofFileName}</td>
                            </tr>
                          </tbody>
                        </table>
                        <table className="table table-bordered border-dark text-center">
                          <thead className="table-dark border-light">
                            <tr>
                              {CustomerBankDlsHeaders.map((heading, i) => {
                                return <td key={i}>{heading}</td>;
                              })}
                            </tr>
                          </thead>
                          <tbody>
                            <tr style={{ fontSize: "15px" }}>
                              <td>{existedUser.customerBankName}</td>
                              <td>{existedUser.customerAccountNumber}</td>
                              <td>{existedUser.bankIfsc}</td>
                              <td>{existedUser.bankDetailFileName}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                  <div className="mx-3">
                    <div className="d-flex justify-content-end my-3">
                      <button className="CButton" onClick={() => setOpen(true)}>
                        Preview
                      </button>
                    </div>
                    <Modal open={open} onClose={() => setOpen(false)}>
                      <div
                        style={FilePopStyle}
                        className="scrollable-container"
                      >
                        <ImageFilePriveiw
                          orderData={orderData}
                          Close={() => setOpen(false)}
                        />
                      </div>
                    </Modal>
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
