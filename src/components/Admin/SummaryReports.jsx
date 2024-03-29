import React, { useState, useEffect } from "react";
import Navbar from "../common/Navbar";
import AdminSideBar from "../common/AdminSideBar";
import AdminToggelSideBar from "../common/AdminToggelSideBar";
import { Field, Form, Formik } from "formik";
import { toast } from 'react-toastify';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { ReportsInitialValue, ReportsSchema, FilePopStyle } from "../../Schema/LoginSchema";
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
      axios.get(`${HOST_URL}/rental/customer/details/mobileNo/${customerPhone}`)
        .then((res) => res)
        .then((response) => {
          if (response.data.code === "1000") {
            setExistedUser(response.data.value);
          }
          setLoading(false);
        })
        .then((error) => setLoading(false));
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
          toast.warn("Sorry! Data Not Available For Selected Date & Store Code", { theme: "colored", autoClose: 2000 });
        }
        setLoading(false);
      }).catch((error) => setLoading(false));
  };

  const GetPreviousTnx = (data) => {
    const { bookingId } = data;
    axios.get(`${HOST_URL}/get/prev/txn/details/forReturn/pdf/${bookingId}/Payment_PendingFor_NewBooking`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setPreviousTnxData(response.data.value);
        } else if (response.data.code === "1001") {
          setPreviousTnxData([]);
        }
      }).catch((error) => setLoading(false));
  };
  const GetTotalSumOfAmount = (data) => {
    const { storeCode, bookingRefNo } = data;
    axios.get(`${HOST_URL}/fetch/sumOf/amounts/common/${storeCode}/${bookingRefNo}`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setTotalPaidAmount(response.data.value);
          GetPreviousTnx(response.data.value);
        }
      }).catch((error) => setLoading(false));
  };

  const GetRowWiseDetails = (data) => {
    setOrderData(data);
    const { storeCode, bookingRefNo, tempBookingRefNo } = data;
    if (bookingRefNo) {
      setLoading(true);
      axios.get(`${HOST_URL}/fetch/table/common/data/${storeCode}/${bookingRefNo}/${tempBookingRefNo}`)
        .then((res) => res)
        .then((response) => {
          if (response.data.code === "1000") {
            setCommonTableData(response.data.value);
            GetTotalSumOfAmount(data);
          }
          setLoading(false);
        }).catch((error) => setLoading(false));
    } else if (!bookingRefNo) {
      ShowAlertForRefNo();
    }
  };

  const RevisedAmout = totalPaidAmount.totalRentalValue - totalPaidAmount.discountOnRentalCharges;

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
              <Table className="table table-bordered border-dark text-center">
                <Thead className="table-dark border-light">
                  <Tr>
                    {AdminSummarHeaders.map((heading, i) => {
                      return <Th key={i}>{heading}</Th>;
                    })}
                  </Tr>
                </Thead>
                <Tbody>
                  {summaryReports.map((item, i) => {
                    return (
                      <Tr key={i}>
                        <Td>{item.storeCode}</Td>
                        <Td>{moment(item.bookingDate).format("DD-MM-YYYY")}</Td>
                        <Td>{item.bookingRefNo}</Td>
                        <Td>
                          {moment(item.rentalStartDate).format("DD-MM-YYYY")}
                        </Td>
                        <Td>
                          {moment(item.rentalEndDate).format("DD-MM-YYYY")}
                        </Td>
                        <Td>
                          {moment(item.coolOffEndDate).format("DD-MM-YYYY")}
                        </Td>
                        <Td>{item.status.replace(/[A-Z]/g, " $&").replace(/_/g, "")}</Td>
                        <Td>
                          <button
                            className="CButton"
                            data-bs-toggle={item.bookingRefNo ? "modal" : ""}
                            data-bs-target="#openSummaryDetails"
                            onClick={() => GetRowWiseDetails(item)}
                          >
                            View
                          </button>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
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
              <div className="table-responsive mt-4">
                <div className="row g-3 mx-0">
                  <div className="col-md-4">
                    Booking Ref No. :- <b>{orderData.bookingRefNo}</b>
                  </div>
                  <div className="col-md-4">
                    Custome Name :-
                    <b>
                      {!customerName ? "" : customerName.toUpperCase()}
                    </b>
                  </div>
                  <div className="col-md-4">
                    Phone No. :- <b>{customerPhone}</b>
                  </div>
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
                        <Table className="table table-bordered border-dark text-center">
                          <Thead className="table-dark border-light">
                            <Tr style={{ fontSize: "15px" }}>
                              {ProductDlsHeaders.map((heading, i) => {
                                return <Th key={i}>{heading}</Th>;
                              })}
                            </Tr>
                          </Thead>
                          <Tbody>
                            {commonTableData.map((item, i) => {
                              return (
                                <Tr key={i}>
                                  <Td>{item.itemCode}</Td>
                                  <Td>{item.lotNo}</Td>
                                  <Td>{item.grossWt}</Td>
                                  <Td className="text-end">{item.productValue}</Td>
                                  <Td className="text-end">{parseInt(item.rentalAmount)}</Td>
                                  <Td className="text-end">
                                    {parseFloat(
                                      item.rentalAmount * 1.18
                                    ).toFixed(2)}
                                  </Td>
                                  <Td className="text-end">{parseInt(item.depositAmount)}</Td>
                                </Tr>
                              );
                            })}
                            <Tr className="text-end">
                              <Th colSpan="3">TOTAL</Th>
                              <Th>
                                {new Intl.NumberFormat("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                  minimumFractionDigits: false,
                                }).format(totalPaidAmount.totalProductValue)}
                              </Th>
                              <Th>
                                {new Intl.NumberFormat("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                  minimumFractionDigits: false,
                                }).format(totalPaidAmount.totalRentalValue)}
                              </Th>
                              <Th>
                                {new Intl.NumberFormat("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                  minimumFractionDigits: 2,
                                }).format(totalPaidAmount.totalBookingAmount)}
                              </Th>
                              <Th>
                                {new Intl.NumberFormat("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                  minimumFractionDigits: false,
                                }).format(totalPaidAmount.totalDepositAmount)}
                              </Th>
                            </Tr>
                          </Tbody>
                        </Table>
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
                        <Table className="table table-bordered border-dark text-center">
                          <Thead className="table-dark border-light">
                            <Tr style={{ fontSize: "15px" }}>
                              {OrderSummaryDlsHeaders.map((heading, i) => {
                                return <Th key={i}>{heading}</Th>;
                              })}
                            </Tr>
                          </Thead>
                          <Tbody>
                            {commonTableData.map((item, i) => {
                              const { penaltyCharges, damageCharges } = item;
                              return (
                                <Tr key={i}>
                                  <Td>{item.itemCode}</Td>
                                  <Td>{item.deliveredWt}</Td>
                                  <Td>{item.actualWtReturn}</Td>
                                  <Td className="text-end">
                                    {parseFloat(item.rentalAmount * 1.18).toFixed(2)}
                                  </Td>
                                  <Td>{parseInt(item.depositAmount)}</Td>
                                  <Td className="text-end">
                                    {penaltyCharges === "" ? 0 : penaltyCharges}
                                  </Td>
                                  <Td className="text-end">
                                    {damageCharges === "" ? 0 : damageCharges}
                                  </Td>
                                </Tr>
                              );
                            })}
                            <Tr className="text-end">
                              <Th colSpan="3" >
                                TOTAL
                              </Th>
                              <Th>
                                {new Intl.NumberFormat("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                  minimumFractionDigits: false,
                                }).format(totalPaidAmount.totalBookingAmount)}
                              </Th>
                              <Th>
                                {new Intl.NumberFormat("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                  minimumFractionDigits: false,
                                }).format(totalPaidAmount.totalDepositAmount)}
                              </Th>
                              <Th>
                                {new Intl.NumberFormat("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                  minimumFractionDigits: false,
                                }).format(totalPaidAmount.totalPenaltyCharges)}
                              </Th>
                              <Th>
                                {new Intl.NumberFormat("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                  minimumFractionDigits: false,
                                }).format(totalPaidAmount.totalDamageCharges)}
                              </Th>
                            </Tr>
                          </Tbody>
                        </Table>
                        <table className="table table-bordered border-dark text-center">
                          <thead className="table-dark border-light">
                            {orderData.status === "ProductReturnedSuccess" || orderData.status === "In_Factory_QA" ?
                              <tr style={{ fontSize: "15px" }}>
                                <td>Actual Rental Value</td>
                                <td>Discount On Rental Charge</td>
                                <td>Revised Rental Charge</td>
                                <td>Revised Rental Charge With (18%) Tax</td>
                              </tr> : ""}
                            {orderData.status === "BookingCancelled" &&
                              <tr style={{ fontSize: "15px" }}>
                                <td>Cancellation Charge</td>
                                <td>Discount On Cancellation Charge</td>
                                <td>Refund Amount</td>
                              </tr>}
                          </thead>
                          <tbody>
                            {orderData.status === "ProductReturnedSuccess" || orderData.status === "In_Factory_QA" ? <tr>
                              <th>
                                {new Intl.NumberFormat("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                  minimumFractionDigits: 2,
                                }).format(totalPaidAmount.totalRentalValue)}
                              </th>
                              <th>
                                {new Intl.NumberFormat("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                  minimumFractionDigits: 2,
                                }).format(totalPaidAmount.discountOnRentalCharges)}
                              </th>
                              {orderData.status === "BookingCancelled" ? "" : <th>
                                {new Intl.NumberFormat("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                  minimumFractionDigits: 2,
                                }).format(RevisedAmout)}
                              </th>}
                              <th>
                                {new Intl.NumberFormat("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                  minimumFractionDigits: 2,
                                }).format(RevisedAmout + RevisedAmout * 0.18)}
                              </th>
                            </tr> : ""}
                            {orderData.status === "BookingCancelled" && <tr>
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
                                }).format(totalPaidAmount.discountOnRentalCharges)}
                              </th>
                              <th>
                                {new Intl.NumberFormat("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                  minimumFractionDigits: false,
                                }).format(totalPaidAmount.netRefundAmount)}
                              </th>
                            </tr>}
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
                          <Table className="table table-bordered border-dark text-center">
                            <Thead className="table-dark border-light">
                              <Tr style={{ fontSize: "15px" }}>
                                {PaymentDlsHeaders.map((heading, i) => {
                                  return <Th key={i}>{heading}</Th>;
                                })}
                              </Tr>
                            </Thead>
                            <Tbody>
                              {previousTnxData.map((item, i) => {
                                return (
                                  <Tr key={i}>
                                    <Td>
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
                                    </Td>
                                    <Td>{item.paymentType}</Td>
                                    <Td>{item.txnRefNo}</Td>
                                    <Td className="text-end">
                                      {parseInt(item.amount)}
                                    </Td>
                                    <Td>{item.paymentDocFileName}</Td>
                                    <Td>{moment().format("DD-MM-YYYY")}</Td>
                                  </Tr>
                                );
                              })}
                            </Tbody>
                          </Table>
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
                        <Table className="table table-bordered border-dark text-center">
                          <Thead className="table-dark border-light">
                            <Tr style={{ fontSize: "15px" }}>
                              {CustomerDlsHeaders.map((heading, i) => {
                                return <Th key={i}>{heading}</Th>;
                              })}
                            </Tr>
                          </Thead>
                          <Tbody>
                            <Tr>
                              <Td>{existedUser.customerName}</Td>
                              <Td>{existedUser.mobileNo}</Td>
                              <Td>{existedUser.emailId}</Td>
                              <Td>{existedUser.panCardNo}</Td>
                              <Td>{existedUser.panCardNoFileName}</Td>
                              <Td>
                                {existedUser.customerCity},
                                {existedUser.customerAddress1},
                                {existedUser.customerAddress2},
                                {existedUser.customerCityPincode}
                              </Td>
                              <Td>{existedUser.addressProofIdNo}</Td>
                              <Td>{existedUser.addressProofFileName}</Td>
                            </Tr>
                          </Tbody>
                        </Table>
                        <Table className="table table-bordered border-dark text-center">
                          <Thead className="table-dark border-light">
                            <Tr>
                              {CustomerBankDlsHeaders.map((heading, i) => {
                                return <Th key={i}>{heading}</Th>;
                              })}
                            </Tr>
                          </Thead>
                          <Tbody>
                            <Tr style={{ fontSize: "15px" }}>
                              <Td>{existedUser.customerBankName}</Td>
                              <Td>{existedUser.customerAccountNumber}</Td>
                              <Td>{existedUser.bankIfsc}</Td>
                              <Td>{existedUser.bankDetailFileName}</Td>
                            </Tr>
                          </Tbody>
                        </Table>
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
