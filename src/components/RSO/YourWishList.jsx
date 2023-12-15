import React, { useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import axios from "axios";
import { HOST_URL } from "../../API/HostURL";
import { AddedToCartHeaders, IMAGE_URL } from "../../Data/DataList";
import { BsFillTrashFill } from "react-icons/bs";
import Loader from "../common/Loader";
import Swal from "sweetalert2";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const YourWishList = () => {
  const storeCode = localStorage.getItem("storeCode");
  const [loading, setLoading] = useState(false);
  const [phoneNo, setPhoneNo] = useState("");
  const [addedProducts, setAddedProducts] = useState([]);
  const [pdtSelected, setPdtSelected] = useState([])
  const [disPhoneFile, setDisPhoneFile] = useState(false)
  const [thresholdLimit, setThresholdLimit] = useState(0);
  const navigate = useNavigate();


  const GetAddToCartData = (storeCode) => {
    axios.get(`${HOST_URL}/store/cart/item/view/${storeCode}`).then(res => res).then(response => {
      if (response.data.code === "1000") {
        setAddedProducts(response.data.value)
        localStorage.setItem("addedCart", response.data.value.length)
      } else if (response.data.code === "1001") {
        setAddedProducts([])
        const cartPdt = response.data.value;
        localStorage.setItem("addedCart", cartPdt === "data not found" ? 0 : cartPdt)
      }
    }).catch(error => {
      setLoading(false)
    })
  }
  useEffect(() => {
    GetAddToCartData(storeCode)
  }, [storeCode, phoneNo])
  const GetProductByPhone = () => {
    setDisPhoneFile(true);
    const searchData = addedProducts.filter(data => data.tempBookingRef.substring(0, 10) === phoneNo)
    if (searchData.length > 0) {
      setAddedProducts(searchData)
    } else {
      alert("Invalid Phone Number");
      setDisPhoneFile(false);
    }
  }

  // TOTAL COST OF PRODUCT VALUE
  const TProductValue = pdtSelected.map((item) => parseInt(item.productValue));
  const SumOfTProductValue = () => {
    let total = 0;
    for (let data of TProductValue) total = total + data;
    return total;
  };

  // TOTAL COST OF  RENTAL RATE
  const TRentalRate = pdtSelected.map((item) => item.rentValue);
  const SumOfRentalRate = () => {
    let total = 0;
    for (let data of TRentalRate) total = total + data;
    return total;
  };


  // TOTAL RENTAL RATE WITH TAX
  const TRentalRateWithTx = pdtSelected.map((item) => item.rentValue * 1.18);
  const SumOfRentalRateWithTx = () => {
    let total = 0;
    for (let data of TRentalRateWithTx) total = total + data;
    return total;
  };

  // TOTAL COST OF DEPOSIT RATE
  const TDepositRate = pdtSelected.map((item) => item.depositValue);
  const SumOfDepositRate = () => {
    let total = 0;
    for (let data of TDepositRate) total = total + data;
    return total;
  };

  const DeleteIteamCanlendar = (data) => {
    const { pdtId, tempBookingRef } = data;
    axios.get(`${HOST_URL}/delete/item/booking/calendar/${pdtId}/${tempBookingRef}`).then(res => res).then(response => {
      if (response.data.code === "1000") {
        GetAddToCartData(storeCode)
        Swal.fire({
          title: "Success",
          text: "Product Removed From Your Cart Successfully!",
          icon: "success",
          confirmButtonColor: "#008080",
          confirmButtonText: "OK",
        });
      }
    }).catch(error => setLoading(false))
  }

  const DeleteProduct = (data) => {
    setLoading(true);
    const { pdtId, tempBookingRef } = data;
    axios.get(`${HOST_URL}/delete/item/from/cart/${pdtId}/${tempBookingRef}`).then(res => res).then(response => {
      if (response.data.code === "1000") {
        DeleteIteamCanlendar(data)
        setPdtSelected([])
      }
      setLoading(false);
    }).catch(error => {
      setLoading(false);
    })
  }

  const sameDatePdt = pdtSelected.map(date => moment(date.rentalStartDate).format("DD-MM-YYYY"))
  const OnSelectProduct = (e, row) => {
    if (e.target.checked) {
      setPdtSelected([...pdtSelected, row])
    } else {
      const selectedData = pdtSelected.filter(
        (id) => id.pdtId !== row.pdtId
      );
      setPdtSelected(selectedData);
    }
  }
  console.log("pdtSelected==>", pdtSelected);

  const custType = pdtSelected.map(date => date.customerType);
  const CheckThresholdMilimt = (custType) => {
    setLoading(true)
    axios
      .get(`${HOST_URL}/get/threshold/value/${custType}`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setThresholdLimit(parseInt(response.data.value.limit));
        }
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (pdtSelected.length > 0) {
      CheckThresholdMilimt(custType[0])
    }
  }, [pdtSelected.length])


  const bookingPyaload = pdtSelected.map(product => {
    return {
      bookingId: 0,
      itemCode: product.itemCode,
      cfa: product.cfa,
      lotNo: product.lotNo,
      grossWt: product.grossWt,
      netWt: product.netWt,
      pdtId: product.pdtId,
      rentalStartDate: moment(product.rentalStartDate).format("YYYY-MM-DD"),
      packageDays: parseInt(product.packageDays),
      itemPriceId: parseInt(product.itemPriceId),
      rateId: product.rateId,
      productValue: parseInt(product.productValue),
      rentValue: parseInt(product.rentValue),
      depositValue: parseInt(product.depositValue),
      createdDate: null,
      updatedDate: null,
      status: "Booked",
      tempBookingRefId: product.tempBookingRef,
      paymentRequestFor: "NewBooking",
      storeCode: storeCode,
    }
  })

  const UpdateBookingCalendar = (tempId) => {
    const updatedInputs = pdtSelected.map((data) => {
      return {
        bookingId: "",
        pdtId: data.pdtId,
        status: "Booked",
        storeCode: storeCode,
        tempRefNo: tempId,
      };
    });
    axios
      .post(`${HOST_URL}/update/item/booking/calendar`, updatedInputs)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          GetAddToCartData(storeCode)
          navigate("/booking")
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  const ContinueToBooking = () => {
    if (thresholdLimit < parseInt(SumOfTProductValue())) {
      alert(`You are Crossing Limit, Our Limit Is ${thresholdLimit}`);
    } else {
      setLoading(true);
      axios
        .post(`${HOST_URL}/add/to/cart`, bookingPyaload)
        .then((res) => res)
        .then((response) => {
          if (response.data.code === "1000") {
            if (response.data.value.Succes) {
              UpdateBookingCalendar(response.data.value.Succes);
            }
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  };

  return (
    <div>
      <Navbar />
      {loading === true && <Loader />}
      <div className="row g-3 mx-0 mt-2">
        <div className="col-10">
          <input
            type="type"
            className="form-control"
            placeholder="Search Product By Phone No"
            maxLength={10}
            value={phoneNo}
            disabled={disPhoneFile}
            onChange={(e) => {
              const phoneVal = e.target.value.replace(/\D/g, "");
              setPhoneNo(phoneVal)
            }
            }
          />
        </div>
        <div className="col-2 d-flex justify-content-end">
          <button
            type="button"
            className={phoneNo.length < 10 ? "CDisabled mx-2" : "CButton mx-2"}
            disabled={phoneNo.length < 10 ? true : false}
            onClick={GetProductByPhone}
          >
            Search
          </button>
          <button
            type="button"
            className="CancelButton"
            onClick={() => {
              setDisPhoneFile(false);
              setPhoneNo("")
            }}
          >
            Reset
          </button>
        </div>
        <b className="text-danger"><strong>Note:-</strong> You can only select same Rental Start Date's for One Booking.</b>
        {addedProducts.length > 0 &&
          <div className="col-12 table-responsive">
            <table className="table table-bordered table-hover border-dark text-center">
              <thead className="table-dark border-light">
                <tr>
                  <td>Select</td>
                  <td>Rental Start Date</td>
                  {AddedToCartHeaders.map((heading, i) => {
                    return <td key={i}>{heading}</td>;
                  })}
                  <td>Delete</td>
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
                        <input
                          className="form-check-input mx-2 border-dark"
                          type="checkbox"
                          onChange={(e) => OnSelectProduct(e, item)}
                          disabled={sameDatePdt.length > 0 && (sameDatePdt.includes(moment(item.rentalStartDate).format("DD-MM-YYYY")) ? false : true)}
                        />
                      </td>
                      <td>{moment(item.rentalStartDate).format("DD-MM-YYYY")}</td>
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
                        {Math.round(item.depositValue).toLocaleString(
                          "en-IN"
                        )}
                      </td>
                      <td>
                        <BsFillTrashFill
                          className="text-danger"
                          onClick={() => DeleteProduct(item)}
                          cursor="pointer"
                        />
                      </td>
                    </tr>
                  );
                })}
                <tr className="text-bold">
                  <th colSpan="6" className="text-end">
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
                  <th >
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                      minimumFractionDigits: false,
                    }).format(SumOfDepositRate())}
                  </th>
                  <th />
                </tr>
              </tbody>
            </table>
          </div>}
        {addedProducts.length > 0 && (
          <div className="d-flex justify-content-end mt-0 mb-3">
            <button className={pdtSelected.length > 0 ? "CButton" : "CDisabled"}
              disabled={pdtSelected.length > 0 ? false : true}
              onClick={ContinueToBooking}
            >
              Continue To Booking
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default YourWishList;
