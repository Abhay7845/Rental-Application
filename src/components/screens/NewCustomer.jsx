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
  const PANNumber = panNumber.toUpperCase();

  // UPLOAD PAN FILE NAME
  const last4Phoneno = phoneNumber.substring(6, 10);
  const PanCarFileName = `${PANNumber}${customerName}${last4Phoneno}`;
  // UPLOAD ADDRESS FILE NAME
  const AddressFileName = `${addressIDNumber}${customerName}${last4Phoneno}`;

  const UploadPanFile = (event) => {
    setLoading(true);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPanFile(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
    try {
      const formData = new FormData();
      formData.append("ImgName", `${PanCarFileName}.jpg`);
      formData.append("files", file);
      axios
        .post(`${UploadImg}`, formData, {
          headers: ImageHeaders,
        })
        .then((res) => res)
        .then((response) => {
          if (response.data) {
            alert("PAN Oploaded Successfully");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log("error==>", error);
          setLoading(false);
        });
    } catch (error) {
      console.log("error==>", error);
    }
  };

  const UploadAddressProof = (event) => {
    setLoading(true);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setAddressFile(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
    try {
      const formData = new FormData();
      formData.append("ImgName", `${AddressFileName}.jpg`);
      formData.append("files", file);
      axios
        .post(`${UploadImg}`, formData, {
          headers: ImageHeaders,
        })
        .then((res) => res)
        .then((response) => {
          if (response.data) {
            alert("Address Proof Uploaded Successfully");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log("error==>", error);
          setLoading(false);
        });
    } catch (error) {
      console.log("error==>", error);
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
        .then((response) => response)
        .catch((error) => {
          console.log("error==>", error);
          setLoading(false);
        });
      setPhoneOtp(OtpPhone);
      setSecPhoneCount(60);
      alert("OTP has been your mobile Number");
      setLoading(false);
    }
  };
  const VerifyPhoneOTP = () => {
    setLoading(true);
    if (phoneOtp === parseInt(enterPhoneOtp)) {
      alert("Phone Number Verified Successfully");
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
      const min = 100000;
      const max = 999999;
      const OtpEmail = Math.floor(Math.random() * (max - min + 1)) + min;
      setLoading(true);
      axios
        .get("")
        .then((res) => res)
        .then((response) => response)
        .catch((error) => {
          console.log("error==>", error);
          setLoading(false);
        });
      setEmailOtp(OtpEmail);
      setSecEmailCount(60);
      alert("OTP has been your Email");
      setLoading(false);
    }
  };

  const VerifyEmailOTP = () => {
    setLoading(true);

    if (emailOtp === parseInt(enterEmailOtp)) {
      alert("Email Verified Successfully");
      setEmailVerified(true);
    } else {
      alert("Invalid OTP");
    }
    setLoading(false);
  };

  const SaveCustomerDetails = () => {
    if (
      !customerName ||
      !phoneNumber ||
      !emailId ||
      !addresLine1 ||
      !addresLine2 ||
      !cityName ||
      !pinCode ||
      !panNumber ||
      !panFile ||
      !addressProofType ||
      !addressIDNumber ||
      !addressFile ||
      !rsoName
    ) {
      alert("Please Fill All Form Details");
    } else if (phoneVerified === false || emailVerified === false) {
      alert("Please Complete OTP Verification With Phone & Email");
    } else if (!PANNumber.match(panRegex)) {
      alert("Invalid PAN Number");
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
        panCardNoFileName: panFile,
        addressProofIdType: addressProofType,
        addressProofIdNo: addressIDNumber,
        addressProofFileName: addressFile,
        createDate: new Date(),
        updateDate: new Date(),
        status: "created",
        rsoName: rsoName,
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
        <div className="d-flex justify-content-between">
          {emailOtp && <b>Email OTP -{emailOtp}</b>}
        </div>
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
              disabled={phoneOtp ? true : false}
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
                  SEND OTP
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
              disabled={emailOtp ? true : false}
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
                  SEND OTP
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
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Upload PAN</label>
            <input
              type="file"
              className="form-control"
              onChange={UploadPanFile}
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
          <div className="col-12 d-flex justify-content-end mb-4">
            <button className="CButton" onClick={SaveCustomerDetails}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCustomer;
