import React, { useState, useEffect } from "react";
import Navbar from "../common/Navbar";
import {
  EmailRegex,
  ImageHeaders,
  addressTypeOption,
  panRegex,
} from "../../Data/DataList";
import axios from "axios";
import { HOST_URL, Phoneulr1, Phoneulr2, UploadImg } from "../../API/HostURL";
import Loader from "../common/Loader";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const NewCustomer = () => {
  // PHONE NUMBER OTP VALIDATION
  const [loading, setLoading] = useState(false);
  const [panFile, setPanFile] = useState(null);
  const [addressFile, setAddressFile] = useState(null);
  const [secPhoneCount, setSecPhoneCount] = useState(60);
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
  const BanckIfcseCode = bankIfsc.toUpperCase();

  // EMAIL ADDRESS  OTP VALIDATION
  const [secEmailCount, setSecEmailCount] = useState(60);
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

  const UploadPanFile = (event) => {
    if (PANNumber.match(panRegex)) {
      setLoading(true);
      const file = event.target.files[0];
      const formData = new FormData();
      const fileExtention = file.name.split(".")[1];
      const PanCardFileName = `${PANNumber}${miliSecond}${last4Phoneno}.${fileExtention}`;
      setPanCardFileName(PanCardFileName);
      formData.append("ImgName", PanCardFileName);
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
              setPanFile(reader.result);
            };
            if (file) {
              reader.readAsDataURL(file);
            }
            alert("Your PAN Uploaded Successfully");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log("error==>", error);
          setLoading(false);
        });
    } else {
      alert("Please Enter Valid PAN Number");
      document.getElementById("panProof").value = "";
    }
  };

  const UploadAddressProof = (event) => {
    if (addressIDNumber.length > 11) {
      setLoading(true);
      const file = event.target.files[0];
      const formData = new FormData();
      const fileExtention = file.name.split(".");
      const AddressFileName = `${addressIDNumber}${miliSecond}${last4Phoneno}.${fileExtention[1]}`;
      setAddressFileName(AddressFileName);
      formData.append("ImgName", AddressFileName);
      formData.append("files", file);
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
            if (file) {
              reader.readAsDataURL(file);
            }
            alert("Address Proof Uploaded Successfully");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log("error==>", error);
          setLoading(false);
        });
    } else {
      alert("Please Enter First ID Number");
      document.getElementById("addressProof").value = "";
    }
  };

  const UploadBankCheque = (event) => {
    if (customerAccountNumber.length > 10) {
      setLoading(true);
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("ImgName", `${customerAccountNumber}.jpg`);
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

  const GetPhoneOtp = () => {
    if (!phoneNumber) {
      alert("Please Enter Phone Number");
    } else if (phoneNumber.length > 10) {
      alert("Please Enter Valid Number");
    } else if (phoneNumber.length < 9) {
      alert("Please Enter Valid Number");
    } else {
      const min = 100000;
      const max = 999999;
      const OtpPhone = Math.floor(Math.random() * (max - min + 1)) + min;
      setLoading(true);
      axios
        .get(
          `${Phoneulr1}${phoneNumber}&message=Kindly+share+this+OTP+-+${OtpPhone}${Phoneulr2}`
        )
        .then((res) => res)
        .then((response) => {
          console.log("response==>", response);
          if (response) {
            alert("OTP has been sent your mobile Number");
            setPhoneOtp(OtpPhone);
            setSecPhoneCount(60);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log("error==>", error);
          setLoading(false);
          setPhoneOtp(OtpPhone);
        });
    }
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
        fromMailId: "iteanzdurgesh@titan.co.in",
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
        panCardNo: panNumber,
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
            alert("Your Account has been Created Successfully");
          }
          navigate("/products/details");
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
          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Phone Number"
              value={phoneNumber}
              maxLength={10}
              onChange={(e) => setPhoneNumber(e.target.value)}
              disabled={phoneVerified ? true : false}
            />
          </div>
          {phoneOtp && !phoneVerified && (
            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Phone OTP"
                onChange={(e) => setEnterPhoneOtp(e.target.value)}
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
                    RE-SEND
                  </button>
                </div>
              )}
              {phoneOtp && secPhoneCount > 0 && (
                <span className="d-flex justify-content-end mt-0">
                  Resend OTP After Secconds : {secPhoneCount}
                </span>
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
                    RE-SEND
                  </button>
                </div>
              )}
              {emailOtp && secEmailCount > 0 && (
                <span className="d-flex justify-content-end mt-0">
                  Resend OTP After Secconds : {secEmailCount}
                </span>
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
              type="number"
              className="form-control"
              placeholder="Pin Code"
              onChange={(e) => setPinCode(e.target.value)}
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
              // disabled={panFile ? true : false}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Upload PAN</label>
            <input
              type="file"
              className="form-control"
              onChange={UploadPanFile}
              id="panProof"
            />
          </div>
          <div className="col-md-4 text-center">
            {panFile && <img src={panFile} alt="panfile" height="100px" />}
          </div>
          <div className="col-md-4">
            <label className="form-label">Address Proof ID Type</label>
            <select
              className="form-control"
              onChange={(e) => setAddressProofType(e.target.value)}
            >
              <option value="">Select Type</option>
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
              <label className="form-label">ID Number</label>
              <input
                type={addressProofType === "aadhar" ? "number" : "text"}
                placeholder={
                  addressProofType === "aadhar"
                    ? "xxxx-xxxx-xxxx"
                    : "xxxx-xxxx-xxxx-xxx"
                }
                className="form-control"
                value={addressIDNumber.toLocaleUpperCase()}
                maxLength={addressProofType === "aadhar" ? 12 : 15}
                onChange={(e) => setAddressIDNumber(e.target.value)}
                // disabled={addressFile ? true : false}
              />
            </div>
          )}
          {addressProofType && (
            <div className="col-md-3">
              <label className="form-label">Upload Address Proof ID</label>
              <input
                type="file"
                className="form-control"
                onChange={UploadAddressProof}
                id="addressProof"
              />
            </div>
          )}
          <div className="col-md-3 text-center">
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
          <div className="col-md-4">
            <label className="form-label">Upload Cancelled Cheque Book</label>
            <input
              type="file"
              className="form-control"
              onChange={UploadBankCheque}
              id="chequeBook"
            />
          </div>
          <div className="col-md-4 text-center">
            {bankDetailFileName && (
              <img src={bankDetailFileName} alt="..." height="100px" />
            )}
          </div>
          <div className="col-12 d-flex justify-content-end mb-4">
            <button className="CButton" onClick={CreateCustomerAccount}>
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCustomer;
