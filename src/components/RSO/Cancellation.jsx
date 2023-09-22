import React, { useState, useEffect } from "react";
import Navbar from "../common/Navbar";
import { DataList } from "../../Data/DataList";
import moment from "moment";
import axios from "axios";
import { HOST_URL } from "../../API/HostURL";
import Loader from "../common/Loader";
import Swal from "sweetalert2";
import { addressTypeOption } from "../../Data/DataList";

const Cancellation = () => {
  const [loading, setLoading] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [numberDays, setNumberDays] = useState("");
  const [rsoName, setRsoName] = useState("");
  const [returnTableData, setReturnTableData] = useState([]);
  const storeCode = localStorage.getItem("storeCode");
  const getProduct = JSON.parse(localStorage.getItem("selecttedReturnProduct"));
  const GetReturnProduct = !getProduct ? "" : getProduct;
  const [sumOfAmounts, setSumOfAmounts] = useState({});
  const [cancellationReason, setCancellationReason] = useState("");
  const [sameCustName, setSameCustName] = useState("");
  const [sameCustIDType, setSameCustIDType] = useState("");
  const [sameCustIDNo, setSameCustIDNo] = useState("");
  const [sameCustFile, setSameCustFile] = useState("");
  const [sameCustomer, setSameCustomer] = useState(true);
  const [itemWiseDiscount, setItemWiseDiscount] = useState([]);

  console.log("cancellationReason==>", cancellationReason);
  console.log("GetReturnProduct==>", GetReturnProduct);
  console.log("rsoName==>", rsoName);
  console.log("sameCustName==>", sameCustName);
  console.log("sameCustIDType==>", sameCustIDType);
  console.log("sameCustIDNo==>", sameCustIDNo);
  console.log("sameCustFile==>", sameCustFile);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${HOST_URL}/fetch/table/common/data/${storeCode}/${GetReturnProduct.refId}`
      )
      .then((res) => res)
      .then((response) => {
        console.log("response==>", response.data);
        if (response.data.code === "1000") {
          setReturnTableData(response.data.value);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("error==>", error);
        setLoading(false);
      });
  }, [storeCode, GetReturnProduct.refId]);

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

  // /fetch/sumOf / amounts / common / { storeCode } / { bookingRefNo }

  useEffect(() => {
    axios
      .get(
        `${HOST_URL}/fetch/sumOf/amounts/common/${storeCode}/${GetReturnProduct.refId}`
      )
      .then((res) => res)
      .then((response) => {
        console.log("setSumOfAmounts==>", response.data);
        if (response.data.code === "1000") {
          setSumOfAmounts(response.data.value);
          // navigate("/products/details");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("error==>", error);
        setLoading(false);
      });

    axios
      .get(
        `${HOST_URL}/rental/customer/details/mobileNo/${GetReturnProduct.mobileNo}`
      )
      .then((res) => res)
      .then((response) => {
        console.log("customerDetails==>", response.data);
        if (response.data.code === "1000") {
          // setSumOfAmounts(response.data.value);
          // navigate("/products/details");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("error==>", error);
        setLoading(false);
      });
  }, [storeCode, GetReturnProduct.refId, GetReturnProduct.mobileNo]);

  console.log("sumOfamount==>", sumOfAmounts);

  const TProductValue = returnTableData.map((item) =>
    parseInt(item.productValue)
  );
  const SumOfTProductValue = () => {
    let total = 0;
    for (let data of TProductValue) total = total + data;
    return total;
  };

  const TRentalRate = returnTableData.map((item) =>
    parseInt(item.rentalAmount)
  );
  const SumOfRentalRate = () => {
    let total = 0;
    for (let data of TRentalRate) total = total + data;
    return total;
  };

  console.log("SumOfRentalRate==>", SumOfRentalRate(), numberDays);
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

  const afterDiscount = cancelCharge - discountAmount;
  const netRefund = SumOfRentalRate() - afterDiscount;

  const RaiseCancelBookingRequest = () => {
    if (!rsoName) {
      alert("Please Enter RSO Name");
    } else if (cancellationReason === "") {
      alert("Please Select cancellationReason");
    } else {
      setLoading(true);
      const cancellationInputs = {
        bookingID: GetReturnProduct.bookingID,
        cancelDate: null,
        customerName: sumOfAmounts.customerName,
        customerIdType: "",
        customerIdNo: "",
        customerIdFileName: "",
        cancellationReason: cancellationReason,
        cancellationCharges: parseInt(cancelCharge),
        discountAmount: parseInt(discountAmount),
        rentalCharges: parseInt(SumOfRentalRate()),
        bookingAmountPaid: parseInt(sumOfAmounts.totalBookingAmount),
        depositAmountPaid: parseInt(sumOfAmounts.totalDepositAmount),
        netRefundAmount: parseInt(netRefund),
        rsoName: rsoName,
        createdDate: null,
        updatedDate: null,
      };
      console.log("BookingInputs==>", cancellationInputs);
      axios
        .post(`${HOST_URL}/cancel/booking`, cancellationInputs)
        .then((res) => res)
        .then((response) => {
          if (response.data.code === "1000") {
            axios
              .get(
                `${HOST_URL}/update/txn/status/${GetReturnProduct.bookingID}/BookingCancelled`
              )
              .then((res) => res)
              .then((response) => {
                if (response.data.code === "1000") {
                  Swal.fire(
                    "Payment Request Raised",
                    "Please Go to Cashier to Complete the Payment",
                    "success"
                  );
                  // navigate("/products/details");
                }
                setLoading(false);
              })
              .catch((error) => {
                console.log("error==>", error);
                setLoading(false);
              });
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log("error==>", error);
          setLoading(false);
        });
    }
  };

  const ItemWiseDiscountAmount = (e) => {
    const amount = e.target.value;
    console.log(amount);
    setItemWiseDiscount(amount);
  };

  console.log("itemWiseDiscount==>", itemWiseDiscount);
  return (
    <div>
      {loading === true && <Loader />}
      <Navbar />
      <div className="mt-4 mx-2">
        <h6 className="bookingHeading">Booking Details</h6>
        <div className="row g-3">
          <div className="col-3">
            <label className="form-label">Booking Ref No</label>
            <h6>{GetReturnProduct.refId}</h6>
          </div>
          <div className="col-2">
            <label className="form-label">Renatl Start Date</label>
            <h6>{moment(GetReturnProduct.bookingDate).format("YYYY-MM-DD")}</h6>
          </div>
          <div className="col-2">
            <label className="form-label">Rental End Date</label>
            <h6>{moment(getReturnDate()).format("YYYY-MM-DD")}</h6>
          </div>
          <div className="col-2">
            <label className="form-label">Rental Package</label>
            <h6>{GetReturnProduct.packageSelected} Days</h6>
          </div>
          <div className="col-3">
            <label className="form-label">Current Date</label>
            <h6>{moment().format("YYYY-MM-DD")}</h6>
          </div>
          <div className="col-3">
            <label className="form-label">Customer Name</label>
            <h6>{GetReturnProduct.customerName}</h6>
          </div>
          <div className="col-3">
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
              disabled={sameCustomer ? true : false}
              onChange={(e) => setSameCustName(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Customer ID Type</label>
            <select
              className="form-control"
              disabled={sameCustomer ? true : false}
              onChange={(e) => setSameCustIDType(e.target.value)}
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
              disabled={sameCustomer ? true : false}
              onChange={(e) => setSameCustIDNo(e.target.value)}
            />
          </div>
          <div className="col-md-4 d-flex">
            <div>
              <label className="form-label">Upload ID</label>
              <input
                type="file"
                className="form-control"
                disabled={sameCustomer ? true : false}
                onChange={(e) => setSameCustFile(e.target.files([0]))}
              />
            </div>
            <div>
              <label className="form-label">.</label>
              <button
                className={sameCustomer ? "CDisabled mx-1" : "CButton mx-1"}
                disabled={sameCustomer ? true : false}
              >
                Upload
              </button>
            </div>
          </div>
          <div className="col-md-12">
            <label className="form-label">Reason For Cancellation</label>
            <select
              onChange={(e) => setCancellationReason(e.target.value)}
              className="form-control"
            >
              <option value="">Select Type</option>
              <option value="Cancelling due to change in Wedding dates">
                Cancelling due to change in Wedding dates
              </option>
              <option value="Cancelling - Need no more exists">
                Cancelling - Need no more exists
              </option>
              <option value="Cancelling - Product not Ready">
                Cancelling - Product not Ready
              </option>
              <option value="Cancelling - Product Not Available">
                Cancelling - Product Not Available
              </option>
            </select>
          </div>

          {DataList.length > 0 && (
            <div className="col-12">
              <h6 className="bookingHeading">Item Details</h6>
              <div className="table-responsive">
                <table className="table table-bordered table-hover border-dark">
                  <thead className="table-dark border-light">
                    <tr>
                      <th>Item Code</th>
                      <th>Lot No.</th>
                      <th>Rent_Start_Date</th>
                      <th>Package_Days</th>
                      <th>Product_Value</th>
                      <th>Rental_Amount</th>
                      <th>Discount_Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {returnTableData.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td>{item.itemCode}</td>
                          <td>{item.lotNo}</td>
                          <td>{item.rentStartDate}</td>
                          <td>
                            {Math.round(item.packageDays).toLocaleString(
                              "en-IN"
                            )}
                          </td>
                          <td>
                            {Math.round(item.productValue).toLocaleString(
                              "en-IN"
                            )}
                          </td>
                          <td>
                            {Math.round(item.rentalAmount).toLocaleString(
                              "en-IN"
                            )}
                          </td>
                          <td>
                            <div className="col-md-12">
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Discount Amount"
                                onBlur={ItemWiseDiscountAmount}
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <th colSpan="4" className="text-end">
                        TOTAL
                      </th>
                      <th>{SumOfTProductValue().toLocaleString("en-IN")}</th>
                      <th>{SumOfRentalRate().toLocaleString("en-IN")}</th>
                      <th>{SumOfRentalRate().toLocaleString("en-IN")}</th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div className="col-12">
            <h6 className="bookingHeading mb-0">Cancellation Charges</h6>
          </div>
          <div className="col-md-6">
            <label className="form-label">Total Cancellation Charges</label>
            <input
              type="text"
              className="form-control"
              placeholder="Cancellation Charge"
              value={cancelCharge}
              disabled
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Discount Amount</label>
            <input
              type="number"
              className="form-control"
              placeholder="Discount Amount"
              value={discountAmount}
              onChange={(e) =>
                setDiscountAmount(
                  cancelCharge === SumOfRentalRate()
                    ? 0
                    : e.target.value || cancelCharge === 0
                    ? 0
                    : e.target.value
                )
              }
            />
          </div>

          {DataList.length > 0 && (
            <div className="col-12 mb-4">
              <h6 className="bookingHeading">Charges Overview</h6>
              <div className="table-responsive">
                <table className="table table-bordered table-hover border-dark">
                  <thead className="table-dark border-light">
                    <tr>
                      <th>Total_Booking_Paid</th>
                      <th>Net_Cancellation_Charges</th>
                      <th>Total_Refund_Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{sumOfAmounts.totalBookingAmount}</td>
                      <td>{!afterDiscount ? 0 : afterDiscount}</td>
                      <td>{netRefund >= 0 ? netRefund : 0}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        <div className="col-12">
          <label className="form-label">RSO Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="RSO Name"
            onChange={(e) => setRsoName(e.target.value)}
          />
        </div>
        <div className="col-12 mb-3">
          <div className="d-flex justify-content-end">
            <button className="CButton" onClick={RaiseCancelBookingRequest}>
              Raise Cancel Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cancellation;
