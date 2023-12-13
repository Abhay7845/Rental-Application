import React, { useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import axios from "axios";
import { HOST_URL } from "../../API/HostURL";
import { AddedToCartHeaders, IMAGE_URL } from "../../Data/DataList";
import { BsFillTrashFill } from "react-icons/bs";
import Loader from "../common/Loader";

const YourWishList = () => {
  const storeCode = localStorage.getItem("storeCode");
  const [loading, setLoading] = useState(false);
  const [phoneNo, setPhoneNo] = useState("");
  const [addedProducts, setAddedProducts] = useState([]);

  const GetAddToCartData = (storeCode) => {
    setLoading(true)
    axios.get(`${HOST_URL}/store/cart/item/view/${storeCode}`).then(res => res).then(response => {
      if (response.data.code === "1000") {
        setAddedProducts(response.data.value)
        localStorage.setItem("addedCart", response.data.value.length)
      } else if (response.data.code === "1001") {
        setAddedProducts([])
      }
      setLoading(false)
    }).catch(error => {
      console.log("error==>", error)
      setLoading(false)
    })
  }
  useEffect(() => {
    GetAddToCartData(storeCode)
  }, [storeCode])

  // TOTAL COST OF PRODUCT VALUE
  const TProductValue = addedProducts.map((item) => parseInt(item.productValue));
  const SumOfTProductValue = () => {
    let total = 0;
    for (let data of TProductValue) total = total + data;
    return total;
  };

  // TOTAL COST OF  RENTAL RATE
  const TRentalRate = addedProducts.map((item) => item.rentValue);
  const SumOfRentalRate = () => {
    let total = 0;
    for (let data of TRentalRate) total = total + data;
    return total;
  };


  // TOTAL RENTAL RATE WITH TAX
  const TRentalRateWithTx = addedProducts.map((item) => item.rentValue * 1.18);
  const SumOfRentalRateWithTx = () => {
    let total = 0;
    for (let data of TRentalRateWithTx) total = total + data;
    return total;
  };

  // TOTAL COST OF DEPOSIT RATE
  const TDepositRate = addedProducts.map((item) => item.depositValue);
  const SumOfDepositRate = () => {
    let total = 0;
    for (let data of TDepositRate) total = total + data;
    return total;
  };
  return (
    <div>
      <Navbar />
      {loading === true && <Loader />}
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
        {addedProducts.length > 0 && <div className="col-12 table-responsive">
          <table className="table table-bordered table-hover border-dark text-center">
            <thead className="table-dark border-light">
              <tr>
                {AddedToCartHeaders.map((heading, i) => {
                  return <td key={i}>{heading}</td>;
                })}
              </tr>
            </thead>
            <tbody>
              {addedProducts.map((item, i) => {
                const { itemCode } = item;
                const imageCode = itemCode.substring(2, 9);
                const imageURL = `${IMAGE_URL}${imageCode}.jpg`;
                return (
                  <tr key={i}>
                    <td>
                      <img src={imageURL} className="custom-image" alt="" />
                    </td>
                    <td>{item.itemCode}</td>
                    <td>{item.lotNo}</td>
                    <td>{item.grossWt}</td>
                    <td>
                      {Math.round(item.productValue).toLocaleString(
                        "en-IN"
                      )}
                    </td>
                    <td>
                      {Math.round(item.rentValue).toLocaleString("en-IN")}
                    </td>
                    <td>{parseFloat(item.rentValue * 1.18).toFixed(2)}</td>
                    <td>
                      <span style={{ marginLeft: "20%" }}>
                        {Math.round(item.depositValue).toLocaleString(
                          "en-IN"
                        )}
                      </span>
                      <BsFillTrashFill
                        className="DeleteRow"
                        style={{
                          marginLeft: "15%",
                        }}
                        onClick={() => DeleteWishListRow(item.pdtId)}
                      />
                    </td>
                  </tr>
                );
              })}
              <tr className="text-bold">
                <th colSpan="4" className="text-end">
                  TOTAL
                </th>
                <th>
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    minimumFractionDigits: false,
                  }).format(SumOfTProductValue())}
                </th>
                <th>
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    minimumFractionDigits: false,
                  }).format(SumOfRentalRate())}
                </th>
                <th>
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    minimumFractionDigits: 2,
                  }).format(SumOfRentalRateWithTx())}
                </th>
                <th>
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    minimumFractionDigits: false,
                  }).format(SumOfDepositRate())}
                </th>
              </tr>
            </tbody>
          </table>
        </div>}
      </div>

    </div>
  );
};

export default YourWishList;
