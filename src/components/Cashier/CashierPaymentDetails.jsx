import React from "react";
import Navbar from "../common/Navbar";

const CashierPaymentDetails = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-4 mx-2">
        <div className="row g-3 mx-0">
          <div className="col-md-11">
            <input
              type="type"
              className="form-control"
              placeholder="Search By Refrence ID"
              // value={phonePanValue.toUpperCase()}
              maxLength={10}
              // onChange={(e) => setPhonePanValue(e.target.value)}
            />
          </div>
          <div className="col-md-1 d-flex justify-content-end">
            <button
              type="button"
              // className={`${phonePanValue.length < 10 ? "CDisabled" : "CButton"}`}
              className="CButton"
              // disabled={phonePanValue.length < 10 ? true : false}
              // onClick={FetchUserDetails}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashierPaymentDetails;
