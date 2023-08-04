import React, { useState, useEffect } from "react";
import Navbar from "../common/Navbar";

const NewCustomer = () => {
  const [panFile, setPanFile] = useState(null);
  const [addressProof, setAddressProof] = useState(null);
  const [secCount, setSecCount] = useState(60);
  const [otp, setOtp] = useState("");
  // console.log("secCount==>", secCount);

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

  const GetOtp = () => {
    const min = 100000;
    const max = 999999;
    const Otp = Math.floor(Math.random() * (max - min + 1)) + min;
    setOtp(Otp);
    setSecCount(60);
  };

  useEffect(() => {
    const intervel = setInterval(() => {
      if (secCount === 0) {
        clearInterval(intervel);
      } else {
        setSecCount(secCount - 1);
      }
    }, 1000);
    return () => {
      clearInterval(intervel);
    };
  }, [secCount]);
  return (
    <div>
      <Navbar />
      <div className="mt-4 mx-2">
        {otp && <b>OTP -{otp}</b>}
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
              type="type"
              className="form-control"
              placeholder="Phone Number"
            />
          </div>
          {otp && (
            <div className="col-md-2">
              <input
                type="type"
                className="form-control"
                placeholder="Enter OTP"
              />
            </div>
          )}
          <div className="col-md-3">
            {!otp ? (
              <button className="CButton" onClick={GetOtp}>
                GET OTP
              </button>
            ) : (
              <div className="d-flex justify-content-between">
                <button className="CButton" onClick={GetOtp}>
                  Verify OTP
                </button>
                <button
                  className={`${secCount > 0 ? "SendOtpBtn" : "CButton"}`}
                  disabled={secCount > 0 ? true : false}
                  onClick={GetOtp}
                >
                  RE-SEND
                </button>
              </div>
            )}
          </div>
          {secCount > 0 && (
            <span className="d-flex justify-content-end">
              Please Resend OTP After Secconds : {secCount}
            </span>
          )}
          <div className="col-md-4">
            <input
              type="email"
              className="form-control"
              placeholder="Email ID"
            />
          </div>
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
