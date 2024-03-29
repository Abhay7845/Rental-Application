import React, { useState, useEffect } from "react";
import Navbar from "../common/Navbar";
import "../../Style/RentalIssue.css";
import { rentalIssuePage, addressTypeOption, IMAGE_URL } from "../../Data/DataList";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { toast } from 'react-toastify';
import moment from "moment";
import axios from "axios";
import { HOST_URL, thresholdmsg } from "../../API/HostURL";
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
  const [alertWt, setAlertWt] = useState("");

  // CUSTOMER BANK DETAIL FIELDS
  const [customerBankName, setCustomerBankName] = useState("");
  const [customerAccountNumber, setCustomerAccountNumber] = useState("");
  const [customerNameAsBank, setCustomerNameAsBank] = useState("");
  const [bankIfsc, setBankIfsc] = useState("");
  const [bankDetailFileName, setBankDetailFileName] = useState("");
  const [cancelChqueFileName, setCancelChqueFileName] = useState("");
  const [cancelledChequeFile, setCancelledChequeFile] = useState("");
  const [retunTableData, setRetunTableData] = useState([]);
  const [productFileName, setProductFileName] = useState([]);
  const [karigarQAFile, setKarigarQAFile] = useState([]);
  const [karateMtrFile, setKarateMtrFile] = useState([]);
  const [karigarQAFileName, setKarigarQAFileName] = useState("");
  const [karateMtrFileName, setKarateMtrFileName] = useState("");
  const [karigarQAUrl, setKarigarQAUrl] = useState("");
  const [karetMtrUrl, setKaretMtrUrl] = useState("");
  const [thresholdLimit, setThresholdLimit] = useState("");

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
  const [outstandingData, setOutstandingData] = useState({});
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

  const GetActualWtAtDlr = (e, grossWt) => {
    const { name, value } = e.target;
    const minWt = parseFloat((grossWt * 0.9).toFixed(3));
    const maxWt = parseFloat(parseFloat(grossWt * 1.1).toFixed(3));
    if (minWt > parseFloat(value)) {
      setAlertWt(
        "Delivery Weight Can't be Lesser than or Greater Than (10%) Of Gross Weight."
      );
    } else if (maxWt < parseFloat(value)) {
      setAlertWt(
        "Delivery Weight Can't be Lesser than or Greater Than (10%) Of Gross Weight."
      );
    } else {
      setAlertWt("");
      setInputValues({
        ...inputValues,
        [name]: value,
      });
    }
  };

  const PdtItemWt = [];
  for (const key in inputValues) {
    if (inputValues.hasOwnProperty(key)) {
      PdtItemWt.push(inputValues[key]);
    }
  }

  const PdtItemWitewt = PdtItemWt.map((ele, i) => {
    return {
      actualWtAtDelivery: parseFloat(parseFloat(ele).toFixed(3)),
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
  const UpdItemWiseDetails = (productFileName, pdtIdImg) => {
    const UpdItemWiseInputs = {
      bookingRefId: GetReturnProduct.refId,
      contentFor: "RentalIssue",
      createdDate: moment().format("YYYY-MM-DD"),
      documentType: "ProductImage",
      fileName: productFileName,
      fileSize: `${pdtIdImg.size}`,
      fileType: `${pdtIdImg.type}`,
      fileURL: `${FetchImg}${productFileName}`,
      updatedDate: null,
    };
    axios
      .post(`${HOST_URL}/insert/image/details`, UpdItemWiseInputs)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          toast.success("Uploaded Successfuly", { theme: "colored", autoClose: 1000 })
        }
      }).catch((error) => setLoading(false));
  };
  const UploadPdtImgItemWise = (item) => {
    // eslint-disable-next-line
    PdtItemWiseImg.map((pdtIdImg, i) => {
      setLoading(true);
      const formData = new FormData();
      const fileExtention = pdtIdImg.name.split(".");
      const productFile = `${RandomDigit}-${item.itemCode}_${i + 1}.${fileExtention[1]
        }`;
      formData.append("ImgName", productFile);
      formData.append("files", pdtIdImg);
      axios
        .post(UploadImg, formData)
        .then((res) => res)
        .then((response) => {
          if (response.data) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setProductImgFile([...productImgFile, reader.result]);
              productFileName[i] = productFile;
              UpdItemWiseDetails(productFileName[i], pdtIdImg);
            };
            if (pdtIdImg) {
              reader.readAsDataURL(pdtIdImg);
            }
          }
          setLoading(false);
        }).catch((error) => setLoading(false));
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
        if (response.data.code === "1000") {
          setExistedUserData(response.data.value);
        }
        setLoading(false);
      })
      .then((error) => setLoading(false));
  };

  useEffect(() => {
    FetchExistedCustDetails(mobileNo);
  }, [mobileNo]);

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
      const fileExtention = `${sameCustIDNo}-${bookingDate}.${fileEx[1]}`;
      formData.append("ImgName", fileExtention);
      formData.append("files", sameCustFile);
      axios
        .post(UploadImg, formData)
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
  const UpdCancelledChequeDetails = (imgName) => {
    const CancelledFileinp = {
      bookingRefId: GetReturnProduct.refId,
      contentFor: "RentalIssue",
      createdDate: moment().format("YYYY-MM-DD"),
      documentType: "cancelledCheue",
      fileName: imgName,
      fileSize: `${cancelledChequeFile.size}`,
      fileType: `${cancelledChequeFile.type}`,
      fileURL: `${FetchImg}${imgName}`,
      updatedDate: null,
    };
    axios
      .post(`${HOST_URL}/insert/image/details`, CancelledFileinp)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          toast.success("Uploaded Successfully", { theme: "colored", autoClose: 1000 })
        }
      }).catch((error) => setLoading(false));
  };
  const UploadBankCheque = () => {
    if (customerAccountNumber.length < 10) {
      toast.error("Please Enter Valid Bank Details", { theme: "colored", autoClose: 3000 });
    } else if (!cancelledChequeFile) {
      toast.error("Please Choose File", { theme: "colored", autoClose: 3000 });
    } else {
      setLoading(true);
      const formData = new FormData();
      const fileEx = cancelledChequeFile.name.split(".");
      const fileExtention = `${customerAccountNumber}-${bookingDate}.${fileEx[1]}`;
      formData.append("ImgName", fileExtention);
      formData.append("files", cancelledChequeFile);
      axios
        .post(UploadImg, formData)
        .then((res) => res)
        .then((response) => {
          if (response.data) {
            UpdCancelledChequeDetails(fileExtention);
            const reader = new FileReader();
            reader.onloadend = () => {
              setBankDetailFileName(reader.result);
              setCancelChqueFileName(fileExtention);
            };
            if (cancelledChequeFile) {
              reader.readAsDataURL(cancelledChequeFile);
            }
          }
          setLoading(false);
        }).catch((error) => setLoading(false));
    }
  };

  const UpdateCustomerBankDetails = () => {
    if (
      !customerBankName ||
      !customerAccountNumber ||
      !customerNameAsBank ||
      !cancelChqueFileName
    ) {
      toast.error("Please Enter All Details", { theme: "colored", autoClose: 3000 });
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
        customerNameasPerAccount: customerNameAsBank,
        bankIfsc: bankIfsc,
        bankDetailFileName: cancelChqueFileName,
      };
      axios
        .post(`${HOST_URL}/rental/add/new/customer`, UpdateCustDetails)
        .then((res) => res)
        .then((response) => {
          if (response.data.code === "1000") {
            FetchExistedCustDetails(mobileNo);
            toast.success("Account Details has been Updated Successfully", { theme: "colored", autoClose: 1000 });
          }
          setLoading(false);
        }).catch((error) => setLoading(false));
    }
  };

  const UploadKarigarQAPdf = (QAFilepdf) => {
    const UpdateKarigarQAPdf = {
      bookingRefId: refId,
      contentFor: "RentalIssue",
      createdDate: moment().format("YYYY-MM-DD"),
      documentType: "KrigarQAReportsPdf",
      fileName: QAFilepdf,
      fileSize: `${karigarQAFile.size}`,
      fileType: `${karigarQAFile.type}`,
      fileURL: `${FetchImg}${QAFilepdf}`,
      updatedDate: null,
    };
    axios
      .post(`${HOST_URL}/insert/image/details`, UpdateKarigarQAPdf)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setKarigarQAFileName(QAFilepdf);
          toast.success("Uploaded Successfully", { theme: "colored", autoClose: 1000 });
          setKarigarQAFile([]);
        }
      }).catch((error) => setLoading(false));
  };

  const UploadKarigarQA = () => {
    if (karigarQAFile.length === 0) {
      toast.error("Please Upload Karigar QA Report", { theme: "colored", autoClose: 3000 });
    } else {
      setLoading(true);
      const formData = new FormData();
      const fileExtention = karigarQAFile.name.split(".");
      const QAFilepdf = `${existedUserData.mobileNo}${bookingDate}${RandomDigit}.${fileExtention[1]}`;
      formData.append("ImgName", QAFilepdf);
      formData.append("files", karigarQAFile);
      axios
        .post(UploadImg, formData)
        .then((res) => res)
        .then((response) => {
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
        }).catch((error) => setLoading(false));
    }
  };

  const UploadKarateMeterPdf = (karateMtr) => {
    const UpdateKaratemeterQAPdf = {
      bookingRefId: refId,
      contentFor: "RentalIssue",
      createdDate: moment().format("YYYY-MM-DD"),
      documentType: "KarateMeterReportsPdf",
      fileName: karateMtr,
      fileSize: `${karateMtrFile.size}`,
      fileType: `${karateMtrFile.type}`,
      fileURL: `${FetchImg}${karateMtr}`,
      updatedDate: null,
    };
    axios
      .post(`${HOST_URL}/insert/image/details`, UpdateKaratemeterQAPdf)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          toast.success("Uploaded Successfully", { theme: "colored", autoClose: 1000 });
          setKarateMtrFile([]);
        }
      }).catch((error) => setLoading(false));
  };
  const UploadKarateMtr = () => {
    if (karateMtrFile.length === 0) {
      toast.error("Please Upload Karate Meter Report", { theme: "colored", autoClose: 3000 });
    } else {
      setLoading(true);
      const formData = new FormData();
      const fileExtention = karateMtrFile.name.split(".");
      const karateMtr = `${existedUserData.mobileNo}${bookingDate}${RandomDigit}.${fileExtention[1]}`;
      setKarateMtrFileName(karateMtr);
      formData.append("ImgName", karateMtr);
      formData.append("files", karateMtrFile);
      axios
        .post(UploadImg, formData)
        .then((res) => res)
        .then((response) => {
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
        }).catch((error) => setLoading(false));
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
        if (response.data.code === "1000") {
          setRetunTableData(response.data.value);
        }
        setLoading(false);
      }).catch((error) => setLoading(false));
  }, [storeCode, refId, tempBookingRefNo]);

  // TOTAL PAID BOOKING AMONT
  useEffect(() => {
    axios
      .get(`${HOST_URL}/fetch/sumOf/amounts/common/${storeCode}/${refId}`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setTotalPaidAmount(response.data.value);
        }
      }).catch((error) => setLoading(false));
  }, [storeCode, refId]);

  useEffect(() => {
    if (existedUserData.panCardNo && mobileNo) {
      axios
        .get(
          `${HOST_URL}/get/outstanding/amount/details/${mobileNo}/${existedUserData.panCardNo}`
        )
        .then((res) => res)
        .then((response) => {
          if (response.data.code === "1000") {
            setOutstandingData(parseInt(response.data.value.outStanding));
          }
        }).catch((error) => setLoading(false));
    }
  }, [mobileNo, existedUserData.panCardNo]);

  useEffect(() => {
    axios
      .get(`${HOST_URL}/get/threshold/value/PURPLE`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setThresholdLimit(parseInt(response.data.value.limit));
        }
      }).catch((error) => setLoading(false));
  }, []);

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
          navigate("/home");
        }
      }).catch((error) => setLoading(false));
  };

  const RaiseDepositeRequest = () => {
    if (
      !RSOName ||
      !karateMtrFileName ||
      !karigarQAFileName ||
      inputValues.length === 0 ||
      productFileName.length <= 0
    ) {
      toast.error("Please Enter Product Actual Wt, Uplaod Files & RSO Name", { theme: "colored", autoClose: 3000 });
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
      if (thresholdLimit < outstandingData) {
        toast.warn(thresholdmsg, { theme: 'colored', autoClose: 2000 });
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
          totalDepositAmountWithTax: 0,
          totalDepositAmount: parseFloat(totalPaidAmount.totalDepositAmount),
          totalDepositAmountPaid: "",
          totalProductValue: totalPaidAmount.totalProductValue,
          totalRentalValue: totalPaidAmount.totalRentalValue,
        };
        axios
          .post(`${HOST_URL}/rental/issue/api`, RaiseDepositValue)
          .then((res) => res)
          .then((response) => {
            if (response.data.code === "1000") {
              TnxStatusUpdate(totalPaidAmount.bookingId);
              setProductFileName([]);
              setProductImgFile([]);
              setRSOName("");
              setKaretMtrUrl("");
              setKarigarQAUrl("");
              document.getElementById("QAfile").value = "";
              document.getElementById("karetfile").value = "";
            }
            setLoading(false);
          }).catch((error) => setLoading(false));
      }
    }
  };
  return (
    <div>
      {loading === true && <Loader />}
      <Navbar />
      <div className="mt-4 mx-2">
        <h6 className="bookingHeading">Booking Details</h6>
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <label className="form-label">Booking Ref No</label>
            <h6>{refId}</h6>
          </div>
          <div className="col-md-2">
            <label className="form-label">Rental Start Date</label>
            <h6>{moment(rentalDate).format("DD-MM- YYYY")}</h6>
          </div>
          <div className="col-md-2">
            <label className="form-label">Rental end Date</label>
            <h6>{moment(getReturnDate()).format("DD-MM- YYYY")}</h6>
          </div>
          <div className="col-md-2">
            <label className="form-label">Customer Name</label>
            <h6>{customerName}</h6>
          </div>
          <div className="col-md-3">
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
              <div>
                <label className="form-label">Upload ID</label>
                <div className="d-flex">
                  <input
                    type="file"
                    id="sameCust"
                    accept=".png, .jpeg"
                    className="form-control"
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
          {!existedUserData.customerBankName ||
            !existedUserData.customerAccountNumber ||
            !existedUserData.bankIfsc ||
            !existedUserData.bankDetailFileName ? (
            <div className="col-12 d-flex">
              <div className="col-md-10">
                <label className="form-label text-danger">
                  <b>PLEASE ADD YOUR BANK DETAILS</b>
                </label>
              </div>
              <div className="col-md-2">
                <button
                  className="CButton mx-2"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#AddBankModal"
                >
                  Add Account
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
                <Table className="table table-bordered table-hover border-dark text-center">
                  <Thead className="table-dark border-light">
                    <Tr style={{ fontSize: "15px" }}>
                      {rentalIssuePage.map((heading, i) => {
                        return <Th key={i}>{heading}</Th>;
                      })}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {retunTableData.map((item, i) => {
                      const { itemCode } = item;
                      const imageCode = itemCode.substring(2, 9);
                      const imageURL = `${IMAGE_URL}${imageCode}.jpg`;
                      return (
                        <Tr key={i}>
                          <Td>
                            <img
                              src={imageURL}
                              className="custom-image"
                              alt=""
                            />
                          </Td>
                          <Td>{item.itemCode}</Td>
                          <Td>{item.lotNo}</Td>
                          <Td>{item.grossWt}</Td>
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
                          <Td className="text-end">
                            {Math.round(item.depositAmount).toLocaleString(
                              "en-IN"
                            )}
                          </Td>
                          <Td>
                            <input
                              type="number"
                              className="w-100 text-center"
                              placeholder="Actual Wt At Delivery"
                              name={i}
                              defaultValue={inputValues[i]}
                              onChange={(e) =>
                                GetActualWtAtDlr(e, item.grossWt)
                              }
                            />
                          </Td>
                        </Tr>
                      );
                    })}
                    <Tr className="text-end">
                      <Th colSpan="4" >
                        TOTAL
                      </Th>
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
                          minimumFractionDigits: false,
                        }).format(totalPaidAmount.totalDepositAmount)}
                      </Th>
                      <Th>{SumOfActualItemWt().toFixed(3)} g.</Th>
                    </Tr>
                  </Tbody>
                </Table>
              </div>
            </div>
          )}
          <b className="mt-0 text-danger text-end">{alertWt}</b>
          <div className="table-responsive">
            <Table className="table table-bordered table-hover border-dark text-center">
              <Thead className="table-dark border-light">
                <Tr>
                  <Th>Image</Th>
                  <Th>Item Code</Th>
                  <Th>Product Images</Th>
                </Tr>
              </Thead>
              <Tbody>
                {retunTableData.map((item, i) => {
                  const { itemCode } = item;
                  const imageCode = itemCode.substring(2, 9);
                  const imageURL = `${IMAGE_URL}${imageCode}.jpg`;
                  return (
                    <Tr key={i}>
                      <Td>
                        <img src={imageURL} className="custom-image" alt="" />
                      </Td>
                      <Td>{item.itemCode}</Td>
                      <Td className="d-flex justify-content-between">
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
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
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
              {retunTableData.length > 0 && (
                <KarigarQAIssuePdf retunTableData={retunTableData} />
              )}
            </h6>
          </div>
          <div className="col-md-4">
            <label className="form-label">Upload Karigar QA Report<span className="text-danger">*</span></label>
            <div className="d-flex">
              <input
                type="file"
                id="QAfile"
                className="form-control"
                multiple
                onChange={(e) => setKarigarQAFile(e.target.files[0])}
              />
              <button className="CButton mx-1" onClick={UploadKarigarQA}>
                Upload
              </button>
            </div>
          </div>
          <div className="col-md-2">
            {karigarQAUrl && (
              <img src={karigarQAUrl} alt="Preview" height="70" width="140" />
            )}
          </div>
          <div className="col-md-4">
            <label className="form-label">Upload Karat Meter Report<span className="text-danger">*</span></label>
            <div className="d-flex">
              <input
                type="file"
                id="karetfile"
                multiple
                className="form-control"
                onChange={(e) => setKarateMtrFile(e.target.files[0])}
              />
              <button className="CButton mx-1" onClick={UploadKarateMtr}>
                Upload
              </button>
            </div>
          </div>
          <div className="col-md-2">
            {karetMtrUrl && (
              <img src={karetMtrUrl} alt="Preview" height="70" width="140" />
            )}
          </div>
          <div className="col-12">
            <label className="form-label">RSO Name<span className="text-danger">*</span></label>
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
              {loading === true && <Loader />}
              <div className="col-md-6">
                <label className="form-label">
                  Bank Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Bank Name"
                  value={customerBankName}
                  onChange={(e) => {
                    let bankVal = e.target.value.replace(/[^a-zA-Z]/g, '');
                    setCustomerBankName(bankVal.toUpperCase())
                  }}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">
                  Account Number <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Account Number"
                  value={customerAccountNumber}
                  onChange={(e) => {
                    const phoneVAl = e.target.value.replace(/[^0-9]/g, '')
                    setCustomerAccountNumber(phoneVAl)
                  }}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">
                  Customer Name(As Per Bank A/c)
                  <span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Customer Name(As Per Bank A/c)"
                  onChange={(e) => setCustomerNameAsBank(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">
                  IFSC CODE <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="IFSC CODE"
                  onChange={(e) => setBankIfsc(e.target.value.toUpperCase())}
                  value={bankIfsc}
                />
              </div>
              <div className="col-md-10">
                <label className="form-label">
                  Cancelled Cheque <span className="text-danger">*</span>
                </label>
                <div className="d-flex">
                  <input
                    type="file"
                    className="form-control"
                    accept=".png, .jpeg"
                    onChange={(e) => setCancelledChequeFile(e.target.files[0])}
                    id="chequeBook"
                  />
                  <button className="CButton mx-1" onClick={UploadBankCheque}>
                    Upload
                  </button>
                </div>
              </div>
              <div className="col-md-12">
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
            <div className="d-flex justify-content-between mx-3 mb-2">
              <span className="text-danger">
                Please fill the all marks(*) are given field.
              </span>
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
