import React, { useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import moment from "moment";
import axios from "axios";
import { HOST_URL } from "../../API/HostURL";

const YourWishList = () => {
  const storeCode = localStorage.getItem("storeCode");
  const [phoneNo, setPhoneNo] = useState("");
  const GetAddToCartData = (storeCode) => {
    axios.get(`${HOST_URL}/store/cart/item/view/${storeCode}`).then(res => res).then(response => console.log("response==>", response.data)).catch(error => console.log("error==>", error))
  }
  useEffect(() => {
    GetAddToCartData(storeCode)
  }, [storeCode])

  return (
    <div>
      <Navbar />
      <div className="row g-3 mx-0 mt-2">
        <div className="col-11">
          <input
            type="type"
            className="form-control"
            placeholder="Search Product By Phone No"
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
