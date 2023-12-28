import React, { useState, useEffect } from "react";
import Navbar from "../common/Navbar";
import { EmailRegex, addressTypeOption, panRegex, } from "../../Data/DataList";
import axios from "axios";
import { HOST_URL, UploadImg, FetchImg } from "../../API/HostURL";
import Loader from "../common/Loader";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ToastContainer, toast } from 'react-toastify';


const NewCustomer = () => {
  // PHONE NUMBER OTP VALIDATION
  const [loading, setLoading] = useState(false);
  const [panFile, setPanFile] = useState(null);
  const [addressFile, setAddressFile] = useState([]);
  const [secPhoneCount, setSecPhoneCount] = useState(90);
  const [phoneOtp, setPhoneOtp] = useState("");
  const [enterPhoneOtp, setEnterPhoneOtp] = useState("");
  const [phoneVerified, setPhoneVerified] = useState(false);
  const phoneNo = localStorage.getItem("serachBookingNo");
  const bookingRefId = localStorage.getItem("BookinTempId");
  const phoneNumber = !phoneNo ? "" : phoneNo;
  const navigate = useNavigate();

  // CUSTOMER BANK DETAIL FIELDS
  const [customerBankName, setCustomerBankName] = useState("");
  const [customerAccountNumber, setCustomerAccountNumber] = useState("");
  const [bankIfsc, setBankIfsc] = useState("");
  const [bankDetailFileName, setBankDetailFileName] = useState("");
  const [bankChequeFile, setBankChequeFile] = useState("");
  const [customerNameAsBank, setCustomerNameAsBank] = useState("");
  // ADDRESS PROOF
  const [choosePan, setChoosePan] = useState("");
  const [adderessProof, setAdderessProof] = useState([]);

  // EMAIL ADDRESS  OTP VALIDATION
  const [secEmailCount, setSecEmailCount] = useState(90);
  const [emailOtp, setEmailOtp] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [enterEmailOtp, setEnterEmailOtp] = useState("");
  const [emailId, setEmailId] = useState("");

  // CUSTOMER DETAILS INPUTS VALUES
  const [customerName, setCustomerName] = useState("");
  const [addresLine1, setAddresLine1] = useState("");
  const [addresLine2, setAddresLine2] = useState("");
  const [cityName, setCityName] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [addressIDNumber, setAddressIDNumber] = useState("");
  const [rsoName, setRsoName] = useState("");
  // ADRESS PROOF VERIFICATION
  const [panNumber, setPanNumber] = useState("");
  const [addressProofType, setAddressProofType] = useState("");
  // UPLOAD FILE NAME STATE
  const [PanCardFileName, setPanCardFileName] = useState("");
  const [AddressFileName, setAddressFileName] = useState([]);
  const [addedCart, setAddedCart] = useState([])
  const PANNumber = panNumber.toUpperCase();
  const currentDate = new Date();
  const RegDate = moment(currentDate).format("YYYY-MM-DD");

  const UploadPanDetails = (imgName) => {
    const UplaodPanDetails = {
      bookingRefId: bookingRefId,
      contentFor: "customerCreation",
      createdDate: moment().format("YYYY-MM-DD"),
      documentType: "panCard",
      fileName: imgName,
      fileSize: `${choosePan.size}`,
      fileType: `${choosePan.type}`,
      fileURL: `${FetchImg}${imgName}`,
      updatedDate: null,
    };
    axios
      .post(`${HOST_URL}/insert/image/details`, UplaodPanDetails)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          toast.success("Uploaded Successfully", { theme: "colored" });
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  const UploadPanFile = () => {
    if (PANNumber.match(panRegex)) {
      setLoading(true);
      const formData = new FormData();
      const fileExtention = choosePan.name.split(".")[1];
      const panCardFileName = `${PANNumber}.${fileExtention}`;
      formData.append("ImgName", panCardFileName);
      formData.append("files", choosePan);
      axios
        .post(`${UploadImg}`, formData)
        .then((res) => res)
        .then((response) => {
          if (response.data) {
            UploadPanDetails(panCardFileName);
            setPanCardFileName(panCardFileName);
            const reader = new FileReader();
            reader.onloadend = () => {
              setPanFile(reader.result);
            };
            if (choosePan) {
              reader.readAsDataURL(choosePan);
            }
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    } else if (choosePan.length === 0) {
      toast.error("Please Choose PAN", { theme: "colored" });
    } else {
      toast.error("Please Enter Valid PAN Number", { theme: "colored" });
    }
  };
  const UploadAddressDetails = (imgName, imgData) => {
    const UpdateKarigarQAPdf = {
      bookingRefId: bookingRefId,
      contentFor: "customerCreation",
      createdDate: moment().format("YYYY-MM-DD"),
      documentType: "addressProof",
      fileName: imgName,
      fileSize: `${imgData.size}`,
      fileType: `${imgData.type}`,
      fileURL: `${FetchImg}${imgName}`,
      updatedDate: null,
    };
    axios
      .post(`${HOST_URL}/insert/image/details`, UpdateKarigarQAPdf)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          toast.success("Uploaded Successfully", { theme: "colored" })
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  const UploadAddressProof = () => {
    if (addressIDNumber.length > 11) {
      for (let i = 0; i < adderessProof.length; i++) {
        setLoading(true);
        const formData = new FormData();
        const fileEx = adderessProof[i].name.split(".");
        const fileName = `${addressIDNumber}_${i + 1}.${fileEx[1]}`;
        formData.append("ImgName", fileName);
        formData.append("files", adderessProof[i]);
        axios
          .post(`${UploadImg}`, formData)
          .then((res) => res)
          .then((response) => {
            if (response.data) {
              AddressFileName[i] = fileName;
              const reader = new FileReader();
              reader.onloadend = () => {
                addressFile[i] = reader.result;
                UploadAddressDetails(AddressFileName[i], adderessProof[i]);
              };
              if (adderessProof[i]) {
                reader.readAsDataURL(adderessProof[i]);
              }
            }
            setLoading(false);
          });
      }
    } else if (adderessProof.length === 0) {
      toast.error(
        `Please Choose  ${addressProofType === "aadhar" ? "Aadhar File" : "Passport File"
        }`, { theme: "colored" }
      );
    } else {
      toast.error(
        `Please Enter First  ${addressProofType === "aadhar"
          ? "Valid Aadhar Number"
          : "Valid Passport Number"
        }`, { theme: "colored" }
      );
    }
  };
  const UploadChequeDetails = (imgName) => {
    const UpdateKarigarQAPdf = {
      bookingRefId: bookingRefId,
      contentFor: "customerCreation",
      createdDate: moment().format("YYYY-MM-DD"),
      documentType: "cnacelledCheque",
      fileName: imgName,
      fileSize: `${bankChequeFile.size}`,
      fileType: `${bankChequeFile.type}`,
      fileURL: `${FetchImg}${imgName}`,
      updatedDate: null,
    };
    axios
      .post(`${HOST_URL}/insert/image/details`, UpdateKarigarQAPdf)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          toast.success("Uploaded Successfully", { theme: "colored" });
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const UploadBankCheque = () => {
    if (customerAccountNumber.length >= 3) {
      setLoading(true);
      const formData = new FormData();
      const fileEx = bankChequeFile.name.split(".");
      const fileName = `${customerAccountNumber}.${fileEx[1]}`;
      formData.append("ImgName", fileName);
      formData.append("files", bankChequeFile);
      axios
        .post(`${UploadImg}`, formData)
        .then((res) => res)
        .then((response) => {
          if (response.data) {
            UploadChequeDetails(fileName);
            const reader = new FileReader();
            reader.onloadend = () => {
              setBankDetailFileName(reader.result);
            };
            if (bankChequeFile) {
              reader.readAsDataURL(bankChequeFile);
            }
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    } else if (bankChequeFile.length === 0) {
      toast.error("Please Choose Cancelled Cheque", { theme: "colored" });
    } else {
      toast.warn("Please Enter Bank Details First", { theme: "colored" });
    }
  };

  const GetPhoneOtp = () => {
    if (phoneNumber) {
      setLoading(true);
      axios
        .get(`${HOST_URL}/get/mobile/otp/${phoneNumber}`)
        .then((res) => res)
        .then((response) => {
          if (response.data.code === "1000") {
            setPhoneOtp(response.data.otp);
            setSecPhoneCount(60);
            toast.success("OTP has been sent your Mobile Number", { theme: "colored" });
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    } else {
      toast.error("Please Enter Phone Number", { theme: "colored" });
    }
  };

  const VerifyPhoneOTP = () => {
    setLoading(true);
    if (phoneOtp === parseInt(enterPhoneOtp)) {
      toast.success("Your Phone OTP Verified Successfully", { theme: "colored" });
      setPhoneVerified(true);
    } else {
      toast.error("Invalid OTP", { theme: "colored" });
    }
    setLoading(false);
  };
  // INTERVAL FOR PHONE OTP
  useEffect(() => {
    const intervelPhone = setInterval(() => {
      if (secPhoneCount === 0) {
        clearInterval(intervelPhone);
      } else {
        setSecPhoneCount(secPhoneCount - 1);
      }
    }, 1000);
    return () => {
      clearInterval(intervelPhone);
    };
  }, [secPhoneCount]);

  // INTERVAL FOR EMAIL OTP
  useEffect(() => {
    const intervelPhone = setInterval(() => {
      if (secEmailCount === 0) {
        clearInterval(intervelPhone);
      } else {
        setSecEmailCount(secEmailCount - 1);
      }
    }, 1000);
    return () => {
      clearInterval(intervelPhone);
    };
  }, [secEmailCount]);

  // EMAIL OTP VERIFICATION FUNCTION
  const GetEmailOtp = () => {
    if (!emailId) {
      toast.error("Please Enter Email", { theme: "colored" });
    } else if (!emailId.match(EmailRegex)) {
      toast.error("Please Enter Valid Email Id", { theme: "colored" });
    } else {
      setLoading(true);
      const EmailInput = {
        fromMailId: "donotreply@titan.co.in",
        toMailId: emailId,
      };
      axios
        .post(`${HOST_URL}/insert/auto/mailer/content`, EmailInput)
        .then((res) => res)
        .then((response) => {
          if ((response.data.code = "1000")) {
            setEmailOtp(response.data.otp);
            toast.success("OTP has been sent on your Email", { theme: "colored" });
          }
          setSecEmailCount(60);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  };

  const VerifyEmailOTP = () => {
    setLoading(true);
    if (emailOtp === parseInt(enterEmailOtp)) {
      toast.success("Your Email OTP Verified Successfully", { theme: "colored" });
      setEmailVerified(true);
    } else {
      toast.error("Invalid OTP", { theme: "colored" });
    }
    setLoading(false);
  };

  const CreateCustomerAccount = () => {
    if (
      !customerName ||
      !phoneNumber ||
      !emailId ||
      !addresLine1 ||
      !addresLine2 ||
      !cityName ||
      !pinCode ||
      !panFile ||
      !addressProofType ||
      !addressIDNumber ||
      !addressFile ||
      !rsoName
    ) {
      toast.error("Please Fill All Form Details", { theme: "colored" });
    } else if (phoneVerified === false) {
      toast.error("Please Complete Phone Number Verification", { theme: "colored" });
    } else {
      setLoading(true);
      const NewCustomerInputs = {
        customerName: customerName,
        customerAddress1: addresLine2,
        customerAddress2: addresLine1,
        customerCity: cityName,
        customerCityPincode: pinCode,
        mobileNo: phoneNumber,
        emailId: emailId,
        panCardNo: PANNumber,
        panCardNoFileName: PanCardFileName,
        addressProofIdType: addressProofType,
        addressProofIdNo: addressIDNumber,
        addressProofFileName: AddressFileName[0],
        createDate: RegDate,
        updateDate: null,
        status: "active",
        rsoName: rsoName,
        customerBankName: customerBankName,
        customerAccountNumber: customerAccountNumber,
        customerNameasPerAccount: customerNameAsBank,
        bankIfsc: bankIfsc,
        bankDetailFileName: customerAccountNumber,
      };
      axios
        .post(`${HOST_URL}/rental/add/new/customer`, NewCustomerInputs)
        .then((res) => res)
        .then((response) => {
          if (response.data.code === "1000") {
            Swal.fire({
              title: "Success",
              text: "Customer Registered Successfully",
              icon: "success",
              confirmButtonColor: "#008080",
              confirmButtonText: "OK",
            });
            localStorage.setItem("regNumber", phoneNumber);
          }
          setAddressFileName([]);
          navigate("/booking");
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  };

  return (
    <div>
      {loading === true && <Loader />}
      <Navbar />
      <ToastContainer />
      <div className="mt-4 mx-2">
        <h6 className="bookingHeading d-flex justify-content-between">
          <b>New Customer Details</b>
          <Link to="/booking" className="text-light mx-2">
            Go Back
          </Link>
        </h6>
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="type"
              className="form-control"
              placeholder="Customer Name*"
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              placeholder="Phone Number*"
              defaultValue={phoneNumber}
              disabled
            />
          </div>
          {phoneOtp && !phoneVerified && (
            <div className="col-md-3 d-flex">
              <input
                type="text"
                className="form-control"
                placeholder="Phone OTP"
                value={enterPhoneOtp}
                onChange={(e) => {
                  const OTPVal = e.target.value.replace(/\D/g, "");
                  setEnterPhoneOtp(OTPVal);
                }}
              />
            </div>
          )}
          {phoneVerified ? (
            <div className="col-md-3">
              <p className="phoneVeryfiedStyle">Phone is Verified</p>
            </div>
          ) : (
            <div className="col-md-3">
              {!phoneOtp ? (
                <button className="CButton" onClick={GetPhoneOtp}>
                  Verify
                </button>
              ) : (
                <div className="d-flex justify-content-between">
                  <button className="CButton" onClick={VerifyPhoneOTP}>
                    Verify OTP
                  </button>
                  <button
                    className={`${secPhoneCount > 0 ? "CDisabled" : "CButton"}`}
                    disabled={secPhoneCount > 0 ? true : false}
                    onClick={GetPhoneOtp}
                  >
                    RE-SEND IN {secPhoneCount}
                  </button>
                </div>
              )}
            </div>
          )}
          <div className="col-md-4">
            <input
              type="email"
              className="form-control"
              placeholder="Email Address*"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              disabled={emailOtp ? true : false}
            />
          </div>
          {emailOtp && !emailVerified && (
            <div className="col-md-4 d-flex">
              <button className="CButton mx-1" onClick={() => setEmailOtp("")}>
                Edit
              </button>
              <input
                type="number"
                className="form-control"
                placeholder="Email OTP"
                onChange={(e) => setEnterEmailOtp(e.target.value)}
              />
            </div>
          )}
          {emailVerified ? (
            <div className="col-md-3">
              <p className="phoneVeryfiedStyle">Email is Verified</p>
            </div>
          ) : (
            <div className="col-md-3">
              {!emailOtp ? (
                <button className="CButton" onClick={GetEmailOtp}>
                  Verify
                </button>
              ) : (
                <div className="d-flex justify-content-between">
                  <button className="CButton" onClick={VerifyEmailOTP}>
                    Verify OTP
                  </button>
                  <button
                    className={`${secEmailCount > 0 ? "CDisabled" : "CButton"}`}
                    disabled={secEmailCount > 0 ? true : false}
                    onClick={GetEmailOtp}
                  >
                    RE-SEND IN {secEmailCount}
                  </button>
                </div>
              )}
            </div>
          )}
          <div className="col-md-6">
            <textarea
              type="type"
              className="form-control"
              placeholder="Address Line 1*"
              onChange={(e) => setAddresLine1(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <textarea
              type="type"
              className="form-control"
              placeholder="Address Line 2*"
              onChange={(e) => setAddresLine2(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="City*"
              onChange={(e) => setCityName(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Pin Code*"
              value={pinCode}
              onChange={(e) => {
                if (e.target.value.length <= 6) {
                  const numericValue = e.target.value.replace(/\D/g, "");
                  setPinCode(numericValue);
                }
              }}
            />
          </div>
          <div className="col-12">
            <h6 className="bookingHeading mb-0">Customer Document Details</h6>
          </div>
          <div className="col-md-4">
            <label className="form-label">PAN Number*</label>
            <input
              type="type"
              className="form-control"
              placeholder="xxxxx-xxxx-x"
              maxLength={10}
              value={PANNumber}
              onChange={(e) => setPanNumber(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Upload PAN*</label>
            <input
              type="file"
              accept=".png, .jpeg"
              className="form-control"
              id="panProof"
              onChange={(e) => setChoosePan(e.target.files[0])}
            />
          </div>
          <div className="col-md-1">
            <br />
            <button className="CButton mt-2" onClick={UploadPanFile}>
              Upload
            </button>
          </div>
          <div className="col-md-3 text-center">
            {panFile && <img src={panFile} alt="panfile" height="100px" />}
          </div>
          <div className="col-md-4">
            <label className="form-label">Address Proof Type*</label>
            <select
              className="form-control"
              onChange={(e) => {
                setAddressProofType(e.target.value);
                setAdderessProof([]);
                setAddressFile([]);
              }}
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
          {addressProofType && (
            <div className="col-md-3">
              <label className="form-label">
                {addressProofType === "aadhar"
                  ? "Aadhar Number*"
                  : "Passport Number*"}
              </label>
              <input
                type="text"
                placeholder={
                  addressProofType === "aadhar"
                    ? "xxxx-xxxx-xxxx"
                    : "xxxx-xxxx-xxxx-xxx"
                }
                className="form-control"
                value={addressIDNumber.toLocaleUpperCase()}
                maxLength={addressProofType === "aadhar" ? 12 : 15}
                onChange={(e) => {
                  if (addressProofType === "aadhar") {
                    const numericValue = e.target.value.replace(/\D/g, "");
                    setAddressIDNumber(numericValue);
                  } else {
                    setAddressIDNumber(e.target.value);
                  }
                }}
              />
            </div>
          )}
          {addressProofType && (
            <div className="col-md-4">
              <label className="form-label">
                {addressProofType === "aadhar"
                  ? "Upload Aadhar (Front/Back)*"
                  : "Upload Passport*"}
              </label>
              <input
                type="file"
                accept=".png, .jpeg"
                className="form-control"
                id="addressProof"
                multiple
                onChange={(e) => setAdderessProof(Array.from(e.target.files))}
              />
            </div>
          )}
          {addressProofType && (
            <div className="col-md-1">
              <br />
              <button className="CButton mt-2" onClick={UploadAddressProof}>
                Upload
              </button>
            </div>
          )}
          <div className="col-12 text-center">
            {addressFile.length > 0 &&
              addressFile.map((ulr, i) => {
                return (
                  <img
                    key={i}
                    src={ulr}
                    alt="addressFile"
                    height="100px"
                    width="140px"
                    className="mx-1"
                  />
                );
              })}
          </div>
          <div className="col-md-12">
            <label className="form-label">RSO Name*</label>
            <input
              type="text"
              className="form-control"
              placeholder="RSO Name"
              onChange={(e) => setRsoName(e.target.value)}
            />
          </div>
          <div className="col-12">
            <h6 className="bookingHeading mb-0">
              Customer Bank Details (OPTIONAL)
              <b className="text-warning mx-2">
                Please inform customer to get the bank details during Rental
                Issue
              </b>
            </h6>
          </div>

          <div className="col-md-4">
            <label className="form-label">Bank Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Bank Name"
              value={customerBankName}
              onChange={(e) => {
                let bankVal = e.target.value.replace(/[^a-zA-Z]/g, '');
                setCustomerBankName(bankVal.toUpperCase())
              }
              }
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Account Number</label>
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
          <div className="col-md-4">
            <label className="form-label">Customer Name(As Per Bank A/c)</label>
            <input
              type="text"
              className="form-control"
              placeholder="Customer Name(As Per Bank A/c)"
              onChange={(e) => setCustomerNameAsBank(e.target.value)}
              value={customerNameAsBank}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">IFSC CODE</label>
            <input
              type="text"
              className="form-control"
              placeholder="IFSC CODE"
              onChange={(e) => setBankIfsc(e.target.value.toUpperCase())}
              value={bankIfsc}
            />
          </div>
          <div className="col-md-4 d-flex">
            <div>
              <label className="form-label">Cancelled Cheque</label>
              <input
                type="file"
                accept=".png, .jpeg"
                className="form-control"
                onChange={(e) => setBankChequeFile(e.target.files[0])}
                id="chequeBook"
              />
            </div>
            <div>
              <br />
              <button className="CButton mx-2 mt-2" onClick={UploadBankCheque}>
                Upload
              </button>
            </div>
          </div>
          <div className="col-md-4 text-center">
            {bankDetailFileName && (
              <img
                src={bankDetailFileName}
                alt="..."
                height="100px"
                width="140px"
              />
            )}
          </div>
          <div className="col-12 d-flex justify-content-end mb-4">
            <button className="CButton" onClick={CreateCustomerAccount}>
              Register Customer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCustomer;
