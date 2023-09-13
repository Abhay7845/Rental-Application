import React, { useState, useEffect } from "react";
import Navbar from "../common/Navbar";
import "../../Style/RentalIssue.css";
import {
  ImageHeaders,
  ReturnPage,
  addressTypeOption,
} from "../../Data/DataList";
import { BsFillEyeFill, BsFillTrashFill } from "react-icons/bs";
import moment from "moment";
import BookingPdf from "../Pdf/BookingPdf";
import axios from "axios";
import { HOST_URL } from "../../API/HostURL";
import Loader from "../common/Loader";
import { UploadImg } from "../../API/HostURL";

const RentalIssue = () => {
  const [loading, setLoading] = useState(false);
  const storeCode = localStorage.getItem("storeCode");
  const [deliveryProductFile, setDeliveryProductImg] = useState(null);
  const [sameCustomer, setSameCustomer] = useState(true);
  const [existedUserData, setExistedUserData] = useState({});
  const [RSOName, setRSOName] = useState("");

  // CUSTOMER BANK DETAIL FIELDS
  const [customerBankName, setCustomerBankName] = useState("");
  const [customerAccountNumber, setCustomerAccountNumber] = useState("");
  const [bankIfsc, setBankIfsc] = useState("");
  const [bankDetailFileName, setBankDetailFileName] = useState("");
  const [cancelChqueFileName, setCancelChqueFileName] = useState("");
  const BanckIfcseCode = bankIfsc.toUpperCase();
  const [retunTableData, setRetunTableData] = useState([]);
  const [productImg, setProductImg] = useState([]);

  // STARTED BY 06-09-2023
  const getProduct = JSON.parse(localStorage.getItem("selecttedReturnProduct"));
  const GetReturnProduct = !getProduct ? "" : getProduct;
  const currentDate = new Date();
  const bookingDate = moment(currentDate).format("YYYY-MM-DD");

  const UploadProductImg = () => {
    if (!productImg) {
      alert("Please Choose File");
    } else {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDeliveryProductImg(reader.result);
      };
      if (productImg) {
        reader.readAsDataURL(productImg);
      }
    }
  };

  console.log("GetReturnProduct==>", GetReturnProduct);

  const getReturnDate = () => {
    const nextDate = new Date(GetReturnProduct.rentalDate);
    nextDate.setDate(
      nextDate.getDate() + parseInt(GetReturnProduct.packageSelected)
    );
    return nextDate;
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${HOST_URL}/rental/customer/details/mobileNo/${GetReturnProduct.mobileNo}`
      )
      .then((res) => res)
      .then((response) => {
        console.log("response==>", response.data);
        if (response.data.code === "1000") {
          setExistedUserData(response.data.value);
        } else if (response.data.code === "1001") {
          setExistedUserData({});
        }
        setLoading(false);
      })
      .then((error) => {
        console.log("error==>", error);
        setLoading(false);
      });
  }, [GetReturnProduct.mobileNo]);

  const UploadBankCheque = (event) => {
    if (customerAccountNumber.length > 10) {
      setLoading(true);
      const file = event.target.files[0];
      const formData = new FormData();
      const fileEx = file.name.split(".");
      const fileExtention = `${customerAccountNumber}.${fileEx[1]}`;
      formData.append("ImgName", fileExtention);
      formData.append("files", file);
      axios
        .post(`${UploadImg}`, formData, {
          headers: ImageHeaders,
        })
        .then((res) => res)
        .then((response) => {
          console.log("response==>", response.data);
          if (response.data) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setBankDetailFileName(reader.result);
              setCancelChqueFileName(fileExtention);
            };
            if (file) {
              reader.readAsDataURL(file);
            }
            alert("Your Cheque Book Uploaded Successfully");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log("error==>", error);
          setLoading(false);
        });
    } else {
      alert("Please Enter Bank Details");
      document.getElementById("chequeBook").value = "";
    }
  };

  const UpdateCustomerBankDetails = () => {
    if (!customerBankName || !customerAccountNumber) {
      alert("Please Enter All Details");
    } else {
      setLoading(true);
      const UpdateCustDetails = {
        customerName: existedUserData.customerName,
        customerAddress1: existedUserData.customerAddress1,
        customerAddress2: existedUserData.customerAddress2,
        customerCity: existedUserData.customerCity,
        customerCityPincode: existedUserData.customerCityPincode,
        mobileNo: existedUserData.mobileNo,
        emailId: existedUserData.emailId,
        panCardNo: existedUserData.panCardNo,
        panCardNoFileName: existedUserData.panCardNoFileName,
        addressProofIdType: "",
        addressProofIdNo: existedUserData.addressProofIdNo,
        addressProofFileName: existedUserData.addressProofFileName,
        createDate: bookingDate,
        updateDate: null,
        status: "active",
        rsoName: RSOName,
        customerBankName: customerBankName,
        customerAccountNumber: customerAccountNumber,
        bankIfsc: BanckIfcseCode,
        bankDetailFileName: cancelChqueFileName,
      };
      console.log("UpdateCustDetails==>", UpdateCustDetails);
      axios
        .post(`${HOST_URL}/rental/add/new/customer`, UpdateCustDetails)
        .then((res) => res)
        .then((response) => {
          console.log("response==>", response.data);
          if (response.data.code === "1000") {
            alert("Account Details has been Updated Successfully");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log("error==>", error);
          setLoading(false);
        });
    }
  };

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
          setRetunTableData(response.data.value);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("error==>", error);
        setLoading(false);
      });
  }, [storeCode, GetReturnProduct.refId]);

  // ADD ROW DETAISL
  const [deliveryProductItemCode, setDeliveryProductItemCode] = useState("");
  const [deliveryProductId, setDeliveryProductId] = useState(0);
  const [addDeliveryProducts, setAddDeliveryProducts] = useState([]);
  const [deliveryRowCont, setDeliveryRowCont] = useState(0);
  const [addDeliveryItems, setAddDeliveryItems] = useState([]);

  const SaveItemsDetails = () => {
    if (!deliveryProductItemCode) {
      alert("Please Enter All Details");
    } else {
      setDeliveryProductId(deliveryProductId + 1);
      const deliveryProductsTable = {
        id: deliveryRowCont,
        itemCode: deliveryProductItemCode,
        delieryProductFile: deliveryProductFile,
      };
      setAddDeliveryProducts([...addDeliveryProducts, deliveryProductsTable]);
      setAddDeliveryItems([]);
    }
  };

  const AddDeliveryRowsInputs = () => {
    setDeliveryRowCont(deliveryRowCont + 1);
    setAddDeliveryItems([...addDeliveryItems, deliveryRowCont + 1]);
  };
  const DeleteProductRow = (id) => {
    const updatedData = addDeliveryProducts.filter((rowId) => rowId.id !== id);
    setAddDeliveryProducts(updatedData);
  };

  return (
    <div>
      {loading === true && <Loader />}
      <Navbar />
      <div className="mt-4 mx-2">
        <h6 className="bookingHeading">Booking Details</h6>
        <div className="row g-3 mb-4">
          <div className="col-3">
            <label className="form-label">Booking Ref No</label>
            <h6>{GetReturnProduct.refId}</h6>
          </div>
          <div className="col-2">
            <label className="form-label">Issue Date</label>
            <h6>{moment(GetReturnProduct.rentalDate).format("YYYY-MM-DD")}</h6>
          </div>
          <div className="col-2">
            <label className="form-label">Return Date</label>
            <h6>{moment(getReturnDate()).format("YYYY-MM-DD")}</h6>
          </div>
          <div className="col-2">
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
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Customer ID Type</label>
            <select
              className="form-control"
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
              disabled={sameCustomer ? true : false}
            />
          </div>
          <div className="col-md-3">
            <div className="d-flex justify-content-between">
              <label className="form-label">Upload ID</label>
              <span className="mx-2">
                {deliveryProductFile && (
                  <BsFillEyeFill
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    style={{ cursor: "pointer" }}
                  />
                )}
              </span>
            </div>
            <input
              type="file"
              className="form-control"
              // onChange={UploadDeliveryProductImg}
              disabled={sameCustomer ? true : false}
            />
          </div>
          {!existedUserData.customerBankName ||
          !existedUserData.customerAccountNumber ||
          !existedUserData.bankIfsc ||
          !existedUserData.bankDetailFileName ? (
            <div className="col-12">
              <div className="d-flex justify-content-between">
                <label className="form-label text-danger">
                  <b>PLEASE ADD YOUR BANK DETAILS</b>
                </label>
                <br />
                <button
                  className="CButton"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#AddBankModal"
                >
                  ADD ACCOUNT
                </button>
              </div>
            </div>
          ) : (
            <div className="col-12">
              <span className="form-label text-success d-flex justify-content-end">
                <b>BANK DETAILS ARE AVAILABLE</b>
              </span>
            </div>
          )}
          {retunTableData.length > 0 && (
            <div className="col-12">
              <h6 className="bookingHeading">Item Details</h6>
              <div className="table-responsive">
                <table className="table table-bordered table-hover border-dark">
                  <thead className="table-dark border-light">
                    <tr>
                      {ReturnPage.map((heading, i) => {
                        return <td key={i}>{heading}</td>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {retunTableData.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td>{item.itemCode}</td>
                          <td>{item.lotNo}</td>
                          <td>{item.grossWt}</td>
                          <td>{item.deliveredWt}</td>
                          <td>
                            <input
                              type="number"
                              placeholder="Actual_Wt at Return"
                            />
                          </td>
                          <td>{item.rentalAmount}</td>
                          <td>{item.productValue}</td>
                          <td>{item.penaltyValue}</td>
                          <td>{item.penaltyValue}</td>
                          <td>
                            <select className="w-100">
                              <option>NO</option>
                              <option>Yes</option>
                            </select>
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <th colSpan="7" className="text-end">
                        TOTAL
                      </th>
                      <th>234</th>
                      <th>124</th>
                      <th colSpan="2" />
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div className="table-responsive">
            <table className="table table-bordered table-hover border-dark">
              <thead className="table-dark border-light text-center">
                <tr>
                  <th>Item Code</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {addDeliveryProducts.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{item.itemCode}</td>
                      <td className="d-flex justify-content-between">
                        {deliveryProductFile && (
                          <img
                            src={deliveryProductFile}
                            alt=""
                            height="30"
                            width="50"
                          />
                        )}
                        <BsFillTrashFill
                          className="DeleteRow"
                          onClick={() => DeleteProductRow(item.id)}
                        />
                      </td>
                    </tr>
                  );
                })}
                {addDeliveryItems.length > 0 && (
                  <tr>
                    <td>
                      <input
                        type="text"
                        placeholder="Item Code"
                        className="w-100"
                        onChange={(e) =>
                          setDeliveryProductItemCode(e.target.value)
                        }
                      />
                    </td>
                    <td className="d-flex justify-content-between">
                      <input
                        type="file"
                        onChange={(e) => setProductImg(e.target.files[0])}
                      />
                      <button className="CButton" onClick={UploadProductImg}>
                        Upload
                      </button>
                      <BsFillTrashFill
                        className="DeleteRow"
                        onClick={() => setAddDeliveryItems([])}
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-end mt-0">
            {addDeliveryItems.length > 0 ? (
              <button
                type="submit"
                className="CButton"
                onClick={SaveItemsDetails}
              >
                Save Row
              </button>
            ) : (
              <button
                type="submit"
                className="CButton"
                onClick={AddDeliveryRowsInputs}
              >
                Add Row
              </button>
            )}
          </div>
          <div className="col-12 mb-0">
            <h6 className="bookingHeading d-flex justify-content-between">
              Signed Acknowledgement of Product Received after Inspection
              <BookingPdf />
            </h6>
          </div>
          <div className="col-md-6">
            <input type="file" className="form-control" />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="RSO Name"
              onChange={(e) => setRSOName(e.target.value)}
            />
          </div>

          <div className="d-flex justify-content-end mb-4">
            <button type="button" className="CButton">
              Save
            </button>
          </div>
        </div>
      </div>
      <div className="col-12 d-flex justify-content-end mt-1">
        <div
          className="modal fade"
          id="exampleModal"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                {deliveryProductFile && (
                  <img
                    src={deliveryProductFile}
                    alt="Preview"
                    className="fullScreenImage"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*BANK DETAILS POP UP*/}
      <div
        className="modal fade"
        id="AddBankModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Account Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body row g-3">
              <div className="col-md-6">
                <label className="form-label">Bank Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Bank Name"
                  onChange={(e) => setCustomerBankName(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Account Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Account Number"
                  onChange={(e) => setCustomerAccountNumber(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">IFSC CODE</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="IFSC CODE"
                  onChange={(e) => setBankIfsc(e.target.value)}
                  value={BanckIfcseCode}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">
                  Upload Cancelled Cheque Book
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={UploadBankCheque}
                  id="chequeBook"
                />
              </div>
              <div className="col-md-12 text-center">
                {bankDetailFileName && (
                  <img
                    src={bankDetailFileName}
                    alt=""
                    width="180"
                    height="85"
                  />
                )}
              </div>
            </div>
            <div className="d-flex justify-content-end mx-2 mb-2">
              <button
                type="button"
                className="CButton"
                onClick={UpdateCustomerBankDetails}
                data-bs-dismiss={customerAccountNumber && "modal"}
              >
                SAVE UPDATE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalIssue;
