import React, { useState, useEffect } from "react";
import Navbar from "../common/Navbar";

const NewCustomer = () => {
  // PHONE NUMBER OTP VALIDATION
  const [panFile, setPanFile] = useState(null);
  const [addressProof, setAddressProof] = useState(null);
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

  const UploadPanFile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPanFile(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const UploadAddressProof = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setAddressProof(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
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
      setPhoneOtp(OtpPhone);
      setSecPhoneCount(60);
    }
  };
  const VerifyPhoneOTP = () => {
    if (phoneOtp === parseInt(enterPhoneOtp)) {
      alert("Phone Number Verified Successfully");
      setPhoneVerified(true);
    } else {
      alert("Invalid OTP");
    }
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
    } else {
      const min = 100000;
      const max = 999999;
      const OtpPhone = Math.floor(Math.random() * (max - min + 1)) + min;
      setEmailOtp(OtpPhone);
      setSecEmailCount(60);
    }
  };

  const VerifyEmailOTP = () => {
    if (emailOtp === parseInt(enterEmailOtp)) {
      alert("Email Verified Successfully");
      setEmailVerified(true);
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mt-4 mx-2">
        <div className="d-flex justify-content-between">
          {phoneOtp && <b>Phone OTP -{phoneOtp}</b>}
          {emailOtp && <b>Email OTP -{emailOtp}</b>}
        </div>
        <h6 className="bookingHeading">New Customer Details</h6>
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="type"
              className="form-control"
              placeholder="Customer Name"
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
            <div className="col-md-3" style={{ marginTop: "1.6%" }}>
              <b className="phoneVeryfiedStyle">Phone is Veryfied</b>
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
                    className={`${
                      secPhoneCount > 0 ? "SendOtpBtn" : "CButton"
                    }`}
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
              placeholder="Enter Email ID"
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
            <div className="col-md-3" style={{ marginTop: "1.6%" }}>
              <b className="phoneVeryfiedStyle">Email is Veryfied</b>
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
                    className={`${
                      secEmailCount > 0 ? "SendOtpBtn" : "CButton"
                    }`}
                    disabled={secEmailCount > 0 ? true : false}
                    onClick={GetEmailOtp}
                  >
                    RE-SEND mail
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
            />
          </div>
          <div className="col-md-6">
            <textarea
              type="type"
              className="form-control"
              placeholder="Address Line 2"
            />
          </div>
          <div className="col-md-4">
            <input
              type="type"
              className="form-control"
              placeholder="Enter State"
            />
          </div>
          <div className="col-md-4">
            <input type="type" className="form-control" placeholder="City" />
          </div>
          <div className="col-md-4">
            <label className="form-label">Pin Code</label>
            <input
              type="type"
              className="form-control"
              placeholder="Pin Code"
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
              placeholder="PAN Number"
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
          <div className="col-md-3">
            <label className="form-label">Address Proof ID Type</label>
            <select className="form-control">
              <option>Select</option>
              <option>1</option>
              <option>2</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Address Proof ID No.</label>
            <input
              type="number"
              placeholder="Address Proof ID Number"
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Upload Address Proof ID</label>
            <input
              type="file"
              className="form-control"
              onChange={UploadAddressProof}
            />
          </div>
          <div className="col-md-3 text-center">
            {addressProof && (
              <img src={addressProof} alt="addressProof" height="100px" />
            )}
          </div>
          <div className="col-md-12">
            <label className="form-label">RSO Name</label>
            <input
              type="type"
              className="form-control"
              placeholder="RSO Name"
            />
          </div>
          <div className="col-12 d-flex justify-content-end mb-4">
            <button className="CButton">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCustomer;
