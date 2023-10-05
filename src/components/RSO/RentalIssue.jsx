import React, { useState, useEffect } from "react";
import Navbar from "../common/Navbar";
import "../../Style/RentalIssue.css";
import {
  ImageHeaders,
  rentalIssuePage,
  addressTypeOption,
} from "../../Data/DataList";
import moment from "moment";
import axios from "axios";
import { HOST_URL } from "../../API/HostURL";
import Loader from "../common/Loader";
import { UploadImg, FetchImg } from "../../API/HostURL";
import Swal from "sweetalert2";
import KarigarQAIssuePdf from "../Pdf/KarigarQAIssuePdf";
import { useNavigate } from "react-router-dom";

const RentalIssue = () => {
  const [loading, setLoading] = useState(false);
  const storeCode = localStorage.getItem("storeCode");
  const [productImgFile, setProductImgFile] = useState([]);
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
  const [productFileName, setProductFileName] = useState([]);
  const [karigarQAFile, setKarigarQAFile] = useState([]);
  const [karateMtrFile, setKarateMtrFile] = useState([]);
  const [karigarQAFileName, setKarigarQAFileName] = useState("");
  const [karateMtrFileName, setKarateMtrFileName] = useState("");
  const [karigarQAUrl, setKarigarQAUrl] = useState("");
  const [karetMtrUrl, setKaretMtrUrl] = useState("");

  // SAME NOT SAME CUSTOME FOR PICKUP DETAILS
  const [sameCustName, setSameCustName] = useState("");
  const [sameCustIDType, setSameCustIDType] = useState("");
  const [sameCustIDNo, setSameCustIDNo] = useState("");
  const [sameCustFile, setSameCustFile] = useState([]);
  const [sameCustFileUrl, setSameCustFileUrl] = useState("");
  const [sameCutIDFileName, setSameCutIDFileName] = useState("");
  const [inputValues, setInputValues] = useState([]);
  const [inputFile, setInputFile] = useState({});
  const [totalPaidAmount, setTotalPaidAmount] = useState({});

  console.log("karigarQAFile==>", karigarQAFile);

  const getProduct = JSON.parse(localStorage.getItem("selecttedReturnProduct"));
  const GetReturnProduct = !getProduct ? "" : getProduct;
  const {
    refId,
    tempBookingRefNo,
    rentalDate,
    packageSelected,
    mobileNo,
    customerName,
  } = GetReturnProduct;
  const currentDate = new Date();
  const bookingDate = moment(currentDate).format("YYYY-MM-DD");
  const RandomDigit = Math.floor(100000 + Math.random() * 900000);
  const navigate = useNavigate();

  console.log("GetReturnProduct==>", GetReturnProduct);
  console.log("retunTableData==>", retunTableData);

  const GetActualWtAtDlr = (e) => {
    const { name, value } = e.target;

    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const PdtItemWt = [];
  for (const key in inputValues) {
    if (inputValues.hasOwnProperty(key)) {
      PdtItemWt.push(inputValues[key]);
    }
  }

  const PdtItemWitewt = PdtItemWt.map((ele, i) => {
    return {
      actualWtAtDelivery: parseFloat(ele),
      pdtId: parseInt(retunTableData[i].pdtId),
    };
  });

  // TOTAL ACTUAL ITEM PDT  VALUE
  const SumOfActualItemWt = () => {
    let total = 0;
    for (let data of PdtItemWt) total = total + parseFloat(data);
    return total;
  };

  const GetPdtItemWiseImg = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];
    setInputFile({
      ...inputFile,
      [name]: file,
    });
  };
  const PdtItemWiseImg = [];
  for (const key in inputFile) {
    if (inputFile.hasOwnProperty(key)) {
      PdtItemWiseImg.push(inputFile[key]);
    }
  }

  const UploadPdtImgItemWise = (item) => {
    // eslint-disable-next-line
    PdtItemWiseImg.map((pdtIdImg, i) => {
      setLoading(true);
      const formData = new FormData();
      const fileExtention = pdtIdImg.name.split(".");
      const productFile = `id-${i}-${item.itemCode}-${bookingDate}-${RandomDigit}.${fileExtention[1]}`;
      formData.append("ImgName", productFile);
      formData.append("files", pdtIdImg);
      axios
        .post(`${UploadImg}`, formData, {
          headers: ImageHeaders,
        })
        .then((res) => res)
        .then((response) => {
          console.log("response==>", response);
          if (response.data) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setProductImgFile([...productImgFile, reader.result]);
              setProductFileName([...productFileName, productFile]);
            };
            if (pdtIdImg) {
              reader.readAsDataURL(pdtIdImg);
            }
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log("error==>", error);
          setLoading(false);
        });
    });
  };

  const getReturnDate = () => {
    const nextDate = new Date(rentalDate);
    nextDate.setDate(nextDate.getDate() + parseInt(packageSelected - 1));
    return nextDate;
  };

  const FetchExistedCustDetails = (mobileNo) => {
    setLoading(true);
    axios
      .get(`${HOST_URL}/rental/customer/details/mobileNo/${mobileNo}`)
      .then((res) => res)
      .then((response) => {
        console.log("response==>", response.data);
        if (response.data.code === "1000") {
          setExistedUserData(response.data.value);
        }
        setLoading(false);
      })
      .then((error) => {
        console.log("error==>", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    FetchExistedCustDetails(mobileNo);
  }, [mobileNo]);

  const UploadSameCustIDProof = () => {
    if (sameCustFile.length === 0) {
      alert("Please Choose File");
    } else {
      setLoading(true);
      const formData = new FormData();
      const fileEx = sameCustFile.name.split(".");
      const fileExtention = `${customerAccountNumber}${currentDate}.${fileEx[1]}`;
      formData.append("ImgName", fileExtention);
      formData.append("files", sameCustFile);
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
              setSameCustFileUrl(reader.result);
              setSameCutIDFileName(fileExtention);
            };
            if (sameCustFile) {
              reader.readAsDataURL(sameCustFile);
            }
            alert("Uploaded Successfully");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log("error==>", error);
          setLoading(false);
        });
    }
  };
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
    if (!customerBankName || !customerAccountNumber || !cancelChqueFileName) {
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
            FetchExistedCustDetails(mobileNo);
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

  const UploadKarigarQAPdf = (QAFilepdf) => {
    const UpdateKarigarQAPdf = {
      bookingRefId: refId,
      contentFor: "Issue",
      createdDate: moment().format("YYYY-MM-DD"),
      documentType: "KrigarQAReportsPdf",
      fileName: QAFilepdf,
      fileSize: `${karigarQAFile.size}`,
      fileType: `${karigarQAFile.type}`,
      fileURL: `${FetchImg}${QAFilepdf}`,
      updatedDate: null,
    };
    console.log("UpdateKarigarQAPdf==>", UpdateKarigarQAPdf);
    axios
      .post(`${HOST_URL}/insert/image/details`, UpdateKarigarQAPdf)
      .then((res) => res)
      .then((response) => {
        console.log("response==>", response.data);
        if (response.data.code === "1000") {
          setKarigarQAFileName(QAFilepdf);
          alert("Uploaded Successfully");
          setKarigarQAFile([]);
        }
      })
      .catch((error) => {
        console.log("error==>", error);
        setLoading(false);
      });
  };

  const UploadKarigarQA = () => {
    if (karigarQAFile.length === 0) {
      alert("Please Upload Karigar QA Report");
    } else {
      setLoading(true);
      const formData = new FormData();
      const fileExtention = karigarQAFile.name.split(".");
      const QAFilepdf = `${existedUserData.mobileNo}${bookingDate}${RandomDigit}.${fileExtention[1]}`;
      formData.append("ImgName", QAFilepdf);
      formData.append("files", karigarQAFile);
      axios
        .post(`${UploadImg}`, formData, {
          headers: ImageHeaders,
        })
        .then((res) => res)
        .then((response) => {
          console.log("response==>", response);
          if (response.data) {
            UploadKarigarQAPdf(QAFilepdf);
            const reader = new FileReader();
            reader.onloadend = () => {
              setKarigarQAUrl(reader.result);
            };
            if (karigarQAFile) {
              reader.readAsDataURL(karigarQAFile);
            }
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log("error==>", error);
          setLoading(false);
        });
    }
  };

  const UploadKarateMeterPdf = (karateMtr) => {
    const UpdateKaratemeterQAPdf = {
      bookingRefId: refId,
      contentFor: "Issue",
      createdDate: moment().format("YYYY-MM-DD"),
      documentType: "KarateMeterReportsPdf",
      fileName: karateMtr,
      fileSize: `${karateMtrFile.size}`,
      fileType: `${karateMtrFile.type}`,
      fileURL: `${FetchImg}${karateMtr}`,
      updatedDate: null,
    };
    console.log("UpdateKaratemeterQAPdf==>", UpdateKaratemeterQAPdf);
    axios
      .post(`${HOST_URL}/insert/image/details`, UpdateKaratemeterQAPdf)
      .then((res) => res)
      .then((response) => {
        console.log("response==>", response.data);
        if (response.data.code === "1000") {
          alert("Uploaded Successfully");
          setKarateMtrFile([]);
        }
      })
      .catch((error) => {
        console.log("error==>", error);
        setLoading(false);
      });
  };
  const UploadKarateMtr = () => {
    if (karateMtrFile.length === 0) {
      alert("Please Upload Karate Meter Report");
    } else {
      setLoading(true);
      const formData = new FormData();
      const fileExtention = karateMtrFile.name.split(".");
      const karateMtr = `${existedUserData.mobileNo}${bookingDate}${RandomDigit}.${fileExtention[1]}`;
      setKarateMtrFileName(karateMtr);
      formData.append("ImgName", karateMtr);
      formData.append("files", karateMtrFile);
      axios
        .post(`${UploadImg}`, formData, {
          headers: ImageHeaders,
        })
        .then((res) => res)
        .then((response) => {
          console.log("response==>", response);
          if (response.data) {
            UploadKarateMeterPdf(karateMtr);
            const reader = new FileReader();
            reader.onloadend = () => {
              setKaretMtrUrl(reader.result);
            };
            if (karateMtrFile) {
              reader.readAsDataURL(karateMtrFile);
            }
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
        `${HOST_URL}/fetch/table/common/data/${storeCode}/${refId}/${tempBookingRefNo}`
      )
      .then((res) => res)
      .then((response) => {
        console.log("responseCommon==>", response.data);
        if (response.data.code === "1000") {
          setRetunTableData(response.data.value);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("error==>", error);
        setLoading(false);
      });
  }, [storeCode, refId, tempBookingRefNo]);

  // TOTAL PAID BOOKING AMONT
  useEffect(() => {
    axios
      .get(`${HOST_URL}/fetch/sumOf/amounts/common/${storeCode}/${refId}`)
      .then((res) => res)
      .then((response) => {
        console.log("responsesum==>", response.data);
        if (response.data.code === "1000") {
          setTotalPaidAmount(response.data.value);
        }
      })
      .catch((error) => {
        console.log("error==>", error);
        setLoading(false);
      });
  }, [storeCode, refId]);

  const TnxStatusUpdate = (bookingId) => {
    axios
      .get(
        `${HOST_URL}/update/txn/status/${bookingId}/Payment_PendingFor_RentalIssuance`
      )
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          Swal.fire({
            title: "Request Raised Succesfully",
            text: "Please reach out to the Cashier To Complete The Issue Process",
            icon: "success",
            confirmButtonColor: "#008080",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((error) => {
        console.log("error=>", error);
      });
  };

  const RaiseDepositeRequest = () => {
    if (
      !RSOName ||
      !karateMtrFileName ||
      !karigarQAFileName ||
      inputValues.length === 0 ||
      productFileName.length <= 0
    ) {
      alert("Please Enter Product Actual Wt, Uplaod Files & RSO Name");
    } else if (
      !existedUserData.customerAccountNumber ||
      !existedUserData.bankIfsc
    ) {
      Swal.fire({
        title: "Missing Bank Details",
        text: "Please Upload your bank details!",
        icon: "warning",
        confirmButtonColor: "#008080",
        confirmButtonText: "OK",
      });
    } else {
      setLoading(true);
      const RaiseDepositValue = {
        actualWtAtDelivery: PdtItemWitewt,
        bookingRefNo: totalPaidAmount.bookingId,
        dispatchDate: null,
        issuenceDocumentUpload: "",
        loanDocumentUpload: sameCustomer ? "" : sameCutIDFileName,
        pickUpByCustomerName: sameCustomer ? "" : sameCustName,
        pickUpByCustomerIdType: sameCustomer ? "" : sameCustIDType,
        pickUpByCustomerIdNo: sameCustomer ? "" : sameCustIDNo,
        pickUpCustomerFileName: sameCustomer ? "" : sameCutIDFileName,
        qaCHeckedStatus: "",
        qaCHeckedStatusUpload: "",
        rsoName: RSOName,
        signedAckUpload: "",
        totalDepositAmount: parseFloat(totalPaidAmount.totalDepositAmount),
        totalDepositAmountPaid: "",
        totalProductValue: totalPaidAmount.totalProductValue,
        totalRentalValue: totalPaidAmount.totalRentalValue,
      };
      console.log("RaiseDepositValue==>", RaiseDepositValue);
      axios
        .post(`${HOST_URL}/rental/issue/api`, RaiseDepositValue)
        .then((res) => res)
        .then((response) => {
          console.log("response=>", response);
          if (response.data.code === "1000") {
            TnxStatusUpdate(totalPaidAmount.bookingId);
            setProductFileName([]);
            setProductImgFile([]);
            setRSOName("");
            setKaretMtrUrl("");
            setKarigarQAUrl("");
            document.getElementById("QAfile").value = "";
            document.getElementById("karetfile").value = "";
            navigate("/home");
            localStorage.removeItem("selecttedReturnProduct");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log("error=>", error);
          setLoading(false);
        });
    }
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
            <h6>{refId}</h6>
          </div>
          <div className="col-2">
            <label className="form-label">Rental Start Date</label>
            <h6>{moment(rentalDate).format("DD-MM- YYYY")}</h6>
          </div>
          <div className="col-2">
            <label className="form-label">Rental end Date</label>
            <h6>{moment(getReturnDate()).format("DD-MM- YYYY")}</h6>
          </div>
          <div className="col-2">
            <label className="form-label">Customer Name</label>
            <h6>{customerName}</h6>
          </div>
          <div className="col-3">
            <label className="form-label">Phone Number</label>
            <h6>{mobileNo}</h6>
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
              <div className="d-flex">
                <div>
                  <label className="form-label">Upload ID</label>
                  <input
                    type="file"
                    id="sameCust"
                    className="form-control"
                    onChange={(e) => setSameCustFile(e.target.files[0])}
                    disabled={sameCustomer ? true : false}
                  />
                </div>
                <div>
                  <label className="form-label">.</label>
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
                <table className="table table-bordered table-hover border-dark text-center">
                  <thead className="table-dark border-light">
                    <tr>
                      {rentalIssuePage.map((heading, i) => {
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
                            {Math.round(item.depositAmount).toLocaleString(
                              "en-IN"
                            )}
                          </td>
                          <td>
                            <input
                              type="number"
                              className="w-100 text-center"
                              placeholder="Actual Wt At Delivery"
                              name={i}
                              defaultValue={inputValues[i]}
                              onChange={GetActualWtAtDlr}
                            />
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <th colSpan="3" className="text-end">
                        TOTAL
                      </th>
                      <th>
                        ₹
                        {Math.round(
                          totalPaidAmount.totalProductValue
                        ).toLocaleString("en-IN")}
                      </th>
                      <th>
                        ₹
                        {Math.round(
                          totalPaidAmount.totalRentalValue
                        ).toLocaleString("en-IN")}
                      </th>
                      <th>
                        ₹
                        {Math.round(
                          totalPaidAmount.totalDepositAmount
                        ).toLocaleString("en-IN")}
                      </th>
                      <th>{SumOfActualItemWt()} g.</th>
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
                  <th>Upload Product Images</th>
                </tr>
              </thead>
              <tbody>
                {retunTableData.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{item.itemCode}</td>
                      <td className="d-flex justify-content-between">
                        <input
                          type="file"
                          id="prodcutFile"
                          className="form-control"
                          name={i}
                          defaultValue={inputFile[i]}
                          onChange={GetPdtItemWiseImg}
                        />
                        <button
                          className="CButton mx-2"
                          onClick={() => UploadPdtImgItemWise(item)}
                        >
                          Upload
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {productImgFile.length > 0 && (
            <div className="d-flex justify-content-end mt-0">
              <button
                className="CButton mx-1 mb-2"
                data-bs-toggle="modal"
                data-bs-target="#showImageModal"
                style={{ float: "right" }}
              >
                Preview Image
              </button>
            </div>
          )}
          <div className="col-12 mb-0">
            <h6 className="bookingHeading d-flex justify-content-between">
              <span className="mt-1">Karigar QA Report</span>
              <KarigarQAIssuePdf retunTableData={retunTableData} />
            </h6>
          </div>
          <div className="col-md-3">
            <label className="form-label">Upload Karigar QA Report</label>
            <input
              type="file"
              id="QAfile"
              className="form-control"
              multiple
              onChange={(e) => setKarigarQAFile(e.target.files[0])}
            />
          </div>
          <div className="col-md-1">
            <br />
            <button className="CButton mt-2" onClick={UploadKarigarQA}>
              Upload
            </button>
          </div>
          <div className="col-md-2">
            {karigarQAUrl && (
              <img src={karigarQAUrl} alt="Preview" height="70" width="140" />
            )}
          </div>
          <div className="col-md-3">
            <label className="form-label">Upload Karat Meter Report</label>
            <input
              type="file"
              id="karetfile"
              multiple
              className="form-control"
              onChange={(e) => setKarateMtrFile(e.target.files[0])}
            />
          </div>
          <div className="col-md-1">
            <br />
            <button className="CButton mt-2" onClick={UploadKarateMtr}>
              Upload
            </button>
          </div>
          <div className="col-md-2">
            {karetMtrUrl && (
              <img src={karetMtrUrl} alt="Preview" height="70" width="140" />
            )}
          </div>
          <div className="col-12">
            <label className="form-label">RSO Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="RSO Name"
              value={RSOName}
              onChange={(e) => setRSOName(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-end mb-4">
            <button
              type="button"
              className="CButton"
              onClick={RaiseDepositeRequest}
            >
              Raise Deposit Request
            </button>
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
              <div className="col-md-6">
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
                <label className="form-label">Cancelled Cheque</label>
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
                data-bs-dismiss={customerAccountNumber && "modal"}
                onClick={UpdateCustomerBankDetails}
              >
                Save & Update
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*IMAGE SHOW MODAL*/}
      <div
        className="modal fade"
        id="showImageModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="d-flex justify-content-end mx-2 mt-2">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="row">
                {productImgFile.map((url, i) => {
                  return (
                    <div key={i} className="col-sm-3">
                      <img src={url} className="img-thumbnail" alt="" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalIssue;
