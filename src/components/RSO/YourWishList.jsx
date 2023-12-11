import React, { useState } from "react";
import Navbar from "../common/Navbar";

const YourWishList = () => {
  const [phoneNo, setPhoneNo] = useState("");
  const RandomDigit = Math.floor(100000 + Math.random() * 900000);

  console.log("RandomDigit==>", RandomDigit)
  console.log("phoneNo==>", phoneNo)
  return (
    <div>
      <Navbar />
      <div className="row g-3 mx-0 mt-2">
        <div className="col-11">
          <input
            type="type"
            className="form-control"
            placeholder="Search Customer By Phone"
            maxLength={10}
            value={phoneNo}
            onChange={(e) => {
              const phoneVal = e.target.value.replace(/\D/g, "");
              setPhoneNo(phoneVal)
            }
            }
          />
        </div>
        <div className="col-1 d-flex justify-content-end">
          <button
            type="button"
            className="CButton"
          // className={`${phonePanValue.length < 10 ? "CDisabled" : "CButton"
          //   }`}
          // disabled={phonePanValue.length < 10 ? true : false}
          // onClick={FetchUDetailsBysearch}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default YourWishList;
