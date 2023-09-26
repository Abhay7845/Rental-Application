import React, { useState, useEffect } from "react";
import Navbar from "../common/Navbar";
import {
  EmailRegex,
  ImageHeaders,
  addressTypeOption,
  panRegex,
} from "../../Data/DataList";
import axios from "axios";
import { HOST_URL, UploadImg } from "../../API/HostURL";
import Loader from "../common/Loader";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const NewCustomer = () => {
  // PHONE NUMBER OTP VALIDATION
  const [loading, setLoading] = useState(false);
  const [panFile, setPanFile] = useState(null);
  const [addressFile, setAddressFile] = useState(null);
  const [secPhoneCount, setSecPhoneCount] = useState(90);
  const [phoneOtp, setPhoneOtp] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [enterPhoneOtp, setEnterPhoneOtp] = useState("");
  const [phoneVerified, setPhoneVerified] = useState(false);

  const navigate = useNavigate();

  // CUSTOMER BANK DETAIL FIELDS
  const [customerBankName, setCustomerBankName] = useState("");
  const [customerAccountNumber, setCustomerAccountNumber] = useState("");
  const [bankIfsc, setBankIfsc] = useState("");
  const [bankDetailFileName, setBankDetailFileName] = useState("");
  const [bankChequeFile, setBankChequeFile] = useState("");
  // ADDRESS PROOF
  const [choosePan, setChoosePan] = useState("");
  const [adderessProof, setAdderessProof] = useState("");

  const BanckIfcseCode = bankIfsc.toUpperCase();

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
  const [AddressFileName, setAddressFileName] = useState("");
  const PANNumber = panNumber.toUpperCase();
  const miliSecond = new Date().getUTCMilliseconds();
  const last4Phoneno = phoneNumber.substring(6, 10);
  const currentDate = new Date();
  const RegDate = moment(currentDate).format("YYYY-MM-DD");

  const CreationPopUp = () => {
    Swal.fire({
      title: "Success",
      text: "Customer Registered Successfully",
      icon: "success",
      confirmButtonColor: "#008080",
      confirmButtonText: "OK",
    });
  };

  const UploadPanFile = (event) => {
    if (PANNumber.match(panRegex)) {
      setLoading(true);
      const formData = new FormData();
      const fileExtention = choosePan.name.split(".")[1];
      const PanCardFileName = `${PANNumber}${miliSecond}${last4Phoneno}.${fileExtention}`;
      setPanCardFileName(PanCardFileName);
      formData.append("ImgName", PanCardFileName);
      formData.append("files", choosePan);
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
              setPanFile(reader.result);
            };
            if (choosePan) {
              reader.readAsDataURL(choosePan);
            }
            alert("Your PAN Uploaded Successfully");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log("error==>", error);
          setLoading(false);
        });
    } else if (choosePan.length === 0) {
      alert("Please Choose PAN");
    } else {
      alert("Please Enter Valid PAN Number");
    }
  };

  const UploadAddressProof = () => {
    if (addressIDNumber.length > 11) {
      setLoading(true);
      const formData = new FormData();
      const fileExtention = adderessProof.name.split(".");
      const AddressFileName = `${addressIDNumber}${miliSecond}${last4Phoneno}.${fileExtention[1]}`;
      setAddressFileName(AddressFileName);
      formData.append("ImgName", AddressFileName);
      formData.append("files", adderessProof);
      axios
        .post(`${UploadImg}`, formData, {
          headers: ImageHeaders,
        })
        .then((res) => res)
        .then((response) => {
          if (response.data) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setAddressFile(reader.result);
            };
            if (adderessProof) {
              reader.readAsDataURL(adderessProof);
            }
            alert("Uploaded Successfully");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log("error==>", error);
          setLoading(false);
        });
    } else if (adderessProof.length === 0) {
      alert(
        `Please Choose  ${
          addressProofType === "aadhar" ? "Aadhar File" : "Passport File"
        }`
      );
    } else {
      alert(
        `Please Enter First  ${
          addressProofType === "aadhar"
            ? "Valid Aadhar Number"
            : "Valid Passport Number"
        }`
      );
    }
  };

  const UploadBankCheque = () => {
    if (customerAccountNumber.length > 10) {
      setLoading(true);
      const formData = new FormData();
      formData.append("ImgName", `${customerAccountNumber}.jpg`);
      formData.append("files", bankChequeFile);
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
            };
            if (bankChequeFile) {
              reader.readAsDataURL(bankChequeFile);
            }
            alert("Your Cheque Book Uploaded Successfully");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log("error==>", error);
          setLoading(false);
        });
    } else if (bankChequeFile.length === 0) {
      alert("Please Choose Cancelled Cheque");
    } else {
      alert("Please Enter Bank Details First");
    }
  };

  const GetPhoneOtp = () => {
    if (!phoneNumber) {
      alert("Please Enter Phone Number");
    } else if (phoneNumber.length > 10) {
      alert("Please Enter Valid Number");
    } else if (phoneNumber.length < 9) {
      alert("Please Enter Valid Number");
    } else {
      setLoading(true);
      axios
        .get(`${HOST_URL}/get/mobile/otp/${phoneNumber}`)
        .then((res) => res)
        .then((response) => {
          console.log("response==>", response);
          if (response.data.code === "1000") {
            setPhoneOtp(response.data.otp);
            setSecPhoneCount(60);
            alert("OTP has been sent your Mobile Number");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log("error==>", error);
          setLoading(false);
        });
    }
  };
  const EditPhoneNumber = () => {
    setPhoneOtp("");
  };
  const VerifyPhoneOTP = () => {
    setLoading(true);
    if (phoneOtp === parseInt(enterPhoneOtp)) {
      alert("Your Phone OTP Verified Successfully");
      setPhoneVerified(true);
    } else {
      alert("Invalid OTP");
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
      alert("Please Enter Email Id");
    } else if (!emailId.match(EmailRegex)) {
      alert("Please Enter Valid Email Id");
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
            alert("OTP has been sent on your Email");
          }
          setSecEmailCount(60);
          setLoading(false);
        })
        .catch((error) => {
          console.log("error==>", error);
          setLoading(false);
        });
    }
  };

  const VerifyEmailOTP = () => {
    setLoading(true);
    if (emailOtp === parseInt(enterEmailOtp)) {
      alert("Your Email OTP Verified Successfully");
      setEmailVerified(true);
    } else {
      alert("Invalid OTP");
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
      alert("Please Fill All Form Details");
    } else if (phoneVerified === false || emailVerified === false) {
      alert("Please Complete OTP Verification With Phone & Email");
    } else {
      setLoading(true);
      const NewCustomer = {
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
        addressProofFileName: AddressFileName,
        createDate: RegDate,
        updateDate: null,
        status: "active",
        rsoName: rsoName,
        customerBankName: customerBankName,
        customerAccountNumber: customerAccountNumber,
        bankIfsc: BanckIfcseCode,
        bankDetailFileName: customerAccountNumber,
      };
      console.log("NewCustomer==>", NewCustomer);
      axios
        .post(`${HOST_URL}/rental/add/new/customer`, NewCustomer)
        .then((res) => res)
        .then((response) => {
          console.log("response==>", response.data);
          if (response.data.code === "1000") {
            CreationPopUp();
          }
          navigate("/booking");
          setLoading(false);
        })
        .catch((error) => {
          console.log("error==>", error);
          setLoading(false);
        });
    }
  };

  return (
    <div>
      {loading === true && <Loader />}
      <Navbar />
      <div className="mt-4 mx-2">
        <h6 className="bookingHeading">New Customer Details</h6>
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="type"
              className="form-control"
              placeholder="Customer Name"
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => {
                if (e.target.value.length <= 10) {
                  const numericValue = e.target.value.replace(/\D/g, "");
                  setPhoneNumber(numericValue);
                }
              }}
              disabled={phoneOtp ? true : false}
            />
          </div>
          {phoneOtp && !phoneVerified && (
            <div className="col-md-3 d-flex">
              <button className="CButton mx-1" onClick={EditPhoneNumber}>
                Edit
              </button>
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
              placeholder="Email ID"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              disabled={emailVerified ? true : false}
            />
          </div>
          {emailOtp && !emailVerified && (
            <div className="col-md-2">
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
              placeholder="Address Line 1"
              onChange={(e) => setAddresLine1(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <textarea
              type="type"
              className="form-control"
              placeholder="Address Line 2"
              onChange={(e) => setAddresLine2(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="City"
              onChange={(e) => setCityName(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Pin Code"
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
            <label className="form-label">PAN Number</label>
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
            <label className="form-label">Upload PAN</label>
            <input
              type="file"
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
            <label className="form-label">Address Proof Type</label>
            <select
              className="form-control"
              onChange={(e) => {
                setAddressProofType(e.target.value);
                setAdderessProof([]);
                setAddressFile(null);
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
            <div className="col-md-2">
              <label className="form-label">
                {addressProofType === "aadhar"
                  ? "Aadhar Number"
                  : "Passport Number"}
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
            <div className="col-md-3">
              <label className="form-label">
                {addressProofType === "aadhar"
                  ? "Upload Aadhar"
                  : "Upload Passport"}
              </label>
              <input
                type="file"
                className="form-control"
                id="addressProof"
                onChange={(e) => setAdderessProof(e.target.files[0])}
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
          <div className="col-md-2 text-center">
            {addressFile && (
              <img src={addressFile} alt="addressFile" height="100px" />
            )}
          </div>
          <div className="col-md-4">
            <label className="form-label">RSO Name</label>
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
            </h6>
          </div>
          <div className="col-md-4">
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
          <div className="col-md-4">
            <label className="form-label">IFSC CODE</label>
            <input
              type="text"
              className="form-control"
              placeholder="IFSC CODE"
              onChange={(e) => setBankIfsc(e.target.value)}
              value={BanckIfcseCode}
            />
          </div>
          <div className="col-md-4 d-flex">
            <div>
              <label className="form-label">Cancelled Cheque</label>
              <input
                type="file"
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
              <img src={bankDetailFileName} alt="..." height="100px" />
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
