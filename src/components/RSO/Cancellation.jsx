import React, { useState, useEffect } from "react";
import Navbar from "../common/Navbar";
import { CancelPageHeading, CancellationReason } from "../../Data/DataList";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import moment from "moment";
import axios from "axios";
import { HOST_URL } from "../../API/HostURL";
import Loader from "../common/Loader";
import Swal from "sweetalert2";
import { addressTypeOption } from "../../Data/DataList";
import { UploadImg, FetchImg } from "../../API/HostURL";
import { IMAGE_URL } from "../../Data/DataList";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


const Cancellation = () => {
  const [loading, setLoading] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [numberDays, setNumberDays] = useState("");
  const [rsoName, setRsoName] = useState("");
  const [returnTableData, setReturnTableData] = useState([]);
  const storeCode = localStorage.getItem("storeCode");
  const getProduct = JSON.parse(localStorage.getItem("selecttedReturnProduct"));
  const GetReturnProduct = !getProduct ? "" : getProduct;
  const [totalPaidAmount, setTotalPaidAmount] = useState({});
  const [cancellationReason, setCancellationReason] = useState("");
  const [sameCustName, setSameCustName] = useState("");
  const [sameCustIDType, setSameCustIDType] = useState("");
  const [sameCustIDNo, setSameCustIDNo] = useState("");
  const [sameCustFile, setSameCustFile] = useState("");
  const [sameCustomer, setSameCustomer] = useState(true);
  const [sameCustFileUrl, setSameCustFileUrl] = useState("");
  const [sameCutIDFileName, setSameCutIDFileName] = useState("");
  const navigate = useNavigate();
  const { totalBookingAmount, totalDepositAmount } = totalPaidAmount;
  const currentDate = moment().format("DD-MM-YYYY");

  const UploadIDDetails = (imgName) => {
    const IdDetailsInput = {
      bookingRefId: GetReturnProduct.refId,
      contentFor: "rentalCancellation",
      createdDate: moment().format("YYYY-MM-DD"),
      documentType: "userIdProof",
      fileName: imgName,
      fileSize: `${sameCustFile.size}`,
      fileType: `${sameCustFile.type}`,
      fileURL: `${FetchImg}${imgName}`,
      updatedDate: null,
    };
    axios
      .post(`${HOST_URL}/insert/image/details`, IdDetailsInput)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          toast.success("Uploaded Successfully", { theme: "colored", autoClose: 1000 })
        }
      }).catch((error) => setLoading(false));
  };

  const UploadSameCustIDProof = () => {
    if (sameCustFile.length === 0) {
      toast.error("Please Choose File", { theme: "colored", autoClose: 3000 });
    } else {
      setLoading(true);
      const formData = new FormData();
      const fileEx = sameCustFile.name.split(".");
      const fileExtention = `${sameCustIDNo}-${currentDate}.${fileEx[1]}`;
      formData.append("ImgName", fileExtention);
      formData.append("files", sameCustFile);
      axios.post(UploadImg, formData)
        .then((res) => res)
        .then((response) => {
          if (response.data) {
            UploadIDDetails(fileExtention);
            const reader = new FileReader();
            reader.onloadend = () => {
              setSameCustFileUrl(reader.result);
              setSameCutIDFileName(fileExtention);
            };
            if (sameCustFile) {
              reader.readAsDataURL(sameCustFile);
            }
          }
          setLoading(false);
        }).catch((error) => setLoading(false));
    }
  };

  useEffect(() => {
    setLoading(true);
    axios.get(`${HOST_URL}/fetch/table/common/data/${storeCode}/${GetReturnProduct.refId}/${GetReturnProduct.tempBookingRefNo}`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setReturnTableData(response.data.value);
        }
        setLoading(false);
      }).catch((error) => setLoading(false));
  }, [storeCode, GetReturnProduct.refId, GetReturnProduct.tempBookingRefNo]);

  useEffect(() => {
    const rentalDate = new Date(
      moment(GetReturnProduct.rentalDate).format("YYYY-MM-DD")
    );
    const currentDate = new Date(moment().format("YYYY-MM-DD"));
    if (rentalDate < currentDate) {
      const timeDifference = rentalDate - currentDate;
      const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
      setNumberDays(daysDifference);
    } else if (rentalDate > currentDate) {
      const timeDifference = rentalDate - currentDate;
      const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
      setNumberDays(daysDifference);
    }
  }, [GetReturnProduct.rentalDate]);

  const getReturnDate = () => {
    const nextDate = new Date(GetReturnProduct.rentalDate);
    nextDate.setDate(
      nextDate.getDate() + parseInt(GetReturnProduct.packageSelected - 1)
    );
    return nextDate;
  };

  // TOTAL PAID BOOKING AMONT
  useEffect(() => {
    axios.get(`${HOST_URL}/fetch/sumOf/amounts/common/${storeCode}/${GetReturnProduct.refId}`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setTotalPaidAmount(response.data.value);
        }
      }).catch((error) => setLoading(false));
  }, [storeCode, GetReturnProduct.refId]);

  const TProductValue = returnTableData.map((item) =>
    parseInt(item.productValue)
  );

  const SumOfTProductValue = () => {
    let total = 0;
    for (let data of TProductValue) total = total + data;
    return total;
  };

  const TRentalRate = returnTableData.map((item) => parseInt(item.rentalAmount));
  const SumOfRentalRate = () => {
    let total = 0;
    for (let data of TRentalRate) total = total + data;
    return total;
  };

  let cancelCharge = 0;
  if (numberDays <= 0) {
    cancelCharge = SumOfRentalRate(); // 100% charge
  } else if (numberDays > 0 && numberDays <= 7) {
    cancelCharge = 0.5 * SumOfRentalRate(); // 50% charge
  } else if (numberDays > 7 && numberDays <= 14) {
    cancelCharge = 0.25 * SumOfRentalRate(); // 25% charge
  } else if (numberDays > 14) {
    cancelCharge = 0; // 100% charge
  }

  const cncChrgeAfterDiswi18 = cancelCharge - discountAmount;
  const netCancellationCharge = cncChrgeAfterDiswi18 * 1.18;
  const netRefund = totalBookingAmount - netCancellationCharge;

  const UpdateCancelStatus = (bookingID) => {
    axios.get(`${HOST_URL}/update/txn/status/${bookingID}/Payment_PendingFor_RentalCancellation`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          Swal.fire({
            title: "Cancel Request Raised Succesfully",
            text: "Please connect with the Cashier",
            icon: "success",
            confirmButtonColor: "#008080",
            confirmButtonText: "OK",
          });
          navigate("/home");
          localStorage.removeItem("selecttedReturnProduct");
        }
      }).catch((error) => setLoading(false));
  };

  const RaiseCancelBookingRequest = () => {
    if (!rsoName || !cancellationReason) {
      toast.error("Please Choose Cancellation Reason & Enetr RSO Name", { theme: "colored", autoClose: 3000 });
    } else if (cancelCharge < discountAmount) {
      toast.error("Discount amount can't be Greater than Cancellation Charges", { theme: "colored", autoClose: 3000 });
    } else {
      setLoading(true);
      const CancellationInputs = {
        bookingID: GetReturnProduct.bookingID,
        cancelDate: null,
        customerName: sameCustomer ? "" : sameCustName,
        customerIdType: sameCustomer ? "" : sameCustIDType,
        customerIdNo: sameCustomer ? "" : sameCustIDNo,
        customerIdFileName: sameCustomer ? "" : sameCutIDFileName,
        cancellationReason: cancellationReason,
        cancelationCharges: parseFloat(cancelCharge) * 1.18,
        discountAmount: parseFloat(discountAmount),
        rentalCharges: parseFloat(SumOfRentalRate()),
        bookingAmountPaid: parseFloat(totalBookingAmount),
        depositAmountPaid: parseFloat(totalDepositAmount),
        netRefundAmount: parseFloat(netRefund).toFixed(2),
        rsoName: rsoName,
        createdDate: null,
        updatedDate: null,
      };
      axios.post(`${HOST_URL}/cancel/booking`, CancellationInputs)
        .then((res) => res)
        .then((response) => {
          if (response.data.code === "1000") {
            UpdateCancelStatus(GetReturnProduct.bookingID);
            setRsoName("");
            setCancellationReason("");
          }
          setLoading(false);
        }).catch((error) => setLoading(false));
    }
  };
  return (
    <div>
      <Navbar />
      {loading === true && <Loader />}
      <div className="mt-4 mx-2">
        <h6 className="bookingHeading">Booking Details</h6>
        <div className="row g-3">
          <div className="col-md-3">
            <label className="form-label">Booking Ref No</label>
            <h6>{GetReturnProduct.refId}</h6>
          </div>
          <div className="col-md-2">
            <label className="form-label">Rental Start Date</label>
            <h6>{moment(GetReturnProduct.bookingDate).format("DD-MM-YYYY")}</h6>
          </div>
          <div className="col-md-2">
            <label className="form-label">Rental End Date</label>
            <h6>{moment(getReturnDate()).format("DD-MM-YYYY")}</h6>
          </div>
          <div className="col-md-2">
            <label className="form-label">Rental Package</label>
            <h6>{GetReturnProduct.packageSelected} Days</h6>
          </div>
          <div className="col-md-3">
            <label className="form-label">Current Date</label>
            <h6>{moment().format("DD-MM-YYYY")}</h6>
          </div>
          <div className="col-md-3">
            <label className="form-label">Customer Name</label>
            <h6>{GetReturnProduct.customerName}</h6>
          </div>
          <div className="col-md-3">
            <label className="form-label">Phone Number</label>
            <h6>{GetReturnProduct.mobileNo}</h6>
          </div>
          <div className="col-md-12">
            <b>Same Customer Pickup</b>
            <input
              className="form-check-input mx-3 border-dark"
              type="checkbox"
              checked={sameCustomer}
              onChange={() => setSameCustomer(!sameCustomer)}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Customer Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Customer Name"
              onChange={(e) => setSameCustName(e.target.value)}
              disabled={sameCustomer ? true : false}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Customer ID Type</label>
            <select
              className="form-control"
              onChange={(e) => setSameCustIDType(e.target.value)}
              disabled={sameCustomer ? true : false}
            >
              {addressTypeOption.map((item, i) => {
                return (
                  <option key={i} value={item.value}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Customer ID No.</label>
            <input
              type="text"
              className="form-control"
              placeholder="Customer ID No."
              onChange={(e) => setSameCustIDNo(e.target.value)}
              disabled={sameCustomer ? true : false}
            />
          </div>
          <div className="col-md-4">
            {sameCustFileUrl ? (
              <img src={sameCustFileUrl} alt="" width="180" height="85" />
            ) : (
              <div>
                <label className="form-label">Upload ID</label>
                <div className="d-flex">
                  <input
                    type="file"
                    id="sameCust"
                    className="form-control"
                    accept=".png, .jpeg"
                    onChange={(e) => setSameCustFile(e.target.files[0])}
                    disabled={sameCustomer ? true : false}
                  />
                  <button
                    className={sameCustomer ? "CDisabled mx-1" : "CButton mx-1"}
                    onClick={UploadSameCustIDProof}
                    disabled={sameCustomer ? true : false}
                  >
                    Upload
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="col-md-12">
            <label className="form-label">Reason For Cancellation<span className="text-danger">*</span></label>
            <select
              className="form-control"
              value={cancellationReason}
              onChange={(e) => setCancellationReason(e.target.value)}
            >
              {CancellationReason.map((item, i) => {
                return (
                  <option key={i} value={item.value}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-12">
            <h6 className="bookingHeading">Item Details</h6>
            <div className="table-responsive">
              <Table className="table table-bordered table-hover border-dark text-center">
                <Thead className="table-dark border-light">
                  <Tr style={{ fontSize: "15px" }}>
                    {CancelPageHeading.map((headers, i) => {
                      return <Th key={i}>{headers}</Th>;
                    })}
                  </Tr>
                </Thead>
                <Tbody>
                  {returnTableData.map((item, i) => {
                    const { itemCode } = item;
                    const imageCode = itemCode.substring(2, 9);
                    const imageURL = `${IMAGE_URL}${imageCode}.jpg`;
                    return (
                      <Tr key={i}>
                        <Td>
                          <img src={imageURL} className="custom-image" alt="" />
                        </Td>
                        <Td>{item.itemCode}</Td>
                        <Td>{item.lotNo}</Td>
                        <Td>
                          {moment(item.rentStartDate).format("DD-MM-YYYY")}
                        </Td>
                        <Td>
                          {Math.round(item.packageDays).toLocaleString("en-IN")}
                        </Td>
                        <Td className="text-end">
                          {Math.round(item.productValue).toLocaleString(
                            "en-IN"
                          )}
                        </Td>
                        <Td className="text-end">
                          {Math.round(item.rentalAmount).toLocaleString(
                            "en-IN"
                          )}
                        </Td>
                      </Tr>
                    );
                  })}
                  <Tr className="text-end">
                    <Th colSpan="5" >
                      TOTAL
                    </Th>
                    <Th>
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                        minimumFractionDigits: false,
                      }).format(SumOfTProductValue())}
                    </Th>
                    <Th>
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                        minimumFractionDigits: false,
                      }).format(SumOfRentalRate())}
                    </Th>
                  </Tr>
                </Tbody>
              </Table>
            </div>
          </div>
          <div className="col-12">
            <h6 className="bookingHeading mb-0">Cancellation Charges</h6>
          </div>
          <div className="col-md-3">
            <label className="form-label">Total Cancellation Charges</label>
            <input
              type="text"
              className="form-control"
              placeholder="Cancellation Charge"
              value={cancelCharge}
              disabled
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Discount Amount</label>
            <input
              type="text"
              className="form-control"
              placeholder="Discount Amount"
              value={discountAmount}
              onChange={(e) => {
                let discount = e.target.value.replace(/[^0-9.]/g, "");
                setDiscountAmount(discount);
              }}
              disabled={cancelCharge <= 0 ? true : false}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">
              Cancellation Charges After Discount
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Cancellation Charge"
              value={cncChrgeAfterDiswi18}
              disabled
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">
              Cancellation Charges With(18%)Tax
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Cancellation Charge"
              value={parseFloat(parseFloat(cncChrgeAfterDiswi18 * 1.18).toFixed(2))}
              disabled
            />
          </div>
          <div className="col-12">
            <h6 className="bookingHeading">Charges Overview</h6>
            <div className="table-responsive">
              <table className="table table-bordered border-dark text-center">
                <thead className="table-dark border-light">
                  <tr style={{ fontSize: "15px" }}>
                    <td>Total Booking Paid</td>
                    <td>Net Cancellation Charges</td>
                    <td>Total Refund Amount</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                        minimumFractionDigits: 2,
                      }).format(totalBookingAmount)}
                    </th>
                    <th>
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                        minimumFractionDigits: 2,
                      }).format(parseFloat(netCancellationCharge).toFixed(2))}
                    </th>
                    <th>
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                        minimumFractionDigits: 2,
                      }).format(netRefund)}
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-12">
          <label className="form-label">RSO Name<span className="text-danger">*</span></label>
          <input
            type="text"
            className="form-control"
            placeholder="RSO Name"
            value={rsoName}
            onChange={(e) => setRsoName(e.target.value)}
          />
        </div>
        <div className="col-12 mb-3 my-3">
          <div className="d-flex justify-content-end">
            <button
              className="CancelButton"
              onClick={RaiseCancelBookingRequest}
            >
              Raise Cancel Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cancellation;
