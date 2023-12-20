import React, { useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import {
  AddedToCartHeaders,
  WishListHeader,
  constomerType,
  packageDayOption,
} from "../../Data/DataList";
import axios from "axios";
import Swal from "sweetalert2";
import { HOST_URL } from "../../API/HostURL";
import Loader from "../common/Loader";
import { Field, Form, Formik } from "formik";
import {
  CheckAvaiblityInitialValue,
  CheckAvaiblitySchema,
} from "../../Schema/LoginSchema";
import moment from "moment";
import ShowError from "../../Schema/ShowError";
import { IMAGE_URL } from "../../Data/DataList";
import { BsFillTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const ProductsDetails = () => {
  const storeCode = localStorage.getItem("storeCode");
  const navigate = useNavigate();

  const [payload, setPayload] = useState({});
  const [loading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState([]);
  const [addtoWishList, setAddtoWishList] = useState([]);
  const [chekeAvaiblity, setChekeAvaiblity] = useState([]);
  const tempId = `${payload.phone}-${payload.bookingDate}`;

  // ADDED PRODUCT TO CART STATS 
  const [addedProducts, setAddedProducts] = useState([]);
  const [pdtSelected, setPdtSelected] = useState([]);
  const [thresholdLimit, setThresholdLimit] = useState(0);

  const AvlProduct = chekeAvaiblity.map((value) => value.productStatus);
  const currentDate = new Date();
  const toDayDate = moment(currentDate).format("YYYY-MM-DD");

  const ReturnEndDate = () => {
    const nextDate = new Date(payload.bookingDate);
    nextDate.setDate(nextDate.getDate() + (parseInt(payload.packageDays) - 1));
    return nextDate;
  };
  const rentalEndDate = moment(ReturnEndDate()).format("YYYY-MM-DD");
  const CoolOfDate = () => {
    const nextDate = new Date(rentalEndDate);
    nextDate.setDate(nextDate.getDate() + 5);
    return nextDate;
  };
  const coolOfDate = moment(CoolOfDate()).format("YYYY-MM-DD");

  const GetProductDetails = (payload, avldata) => {
    const GetProducts = {
      storeCode: storeCode,
      itemCode: payload.itemCode,
      customerType: payload.customerType,
      packagePeriod: payload.packageDays,
      cfaCode: avldata.cfaCode,
      locType: "SameCity",
    };
    axios
      .post(`${HOST_URL}/rental/product/view/details`, GetProducts)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setProductDetails(response.data.value); f
        } else if (response.data.code === "1001") {
          alert("Data Not Found");
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const CheckAvaiblity = (payload) => {
    setPayload(payload);
    setLoading(true);
    const CheckAvaiblity = {
      bookedDate: "",
      bookingDate: payload.bookingDate,
      endDate: "",
      image: "",
      itemCode: payload.itemCode,
      packageDays: payload.packageDays,
      stdUCP: "",
      stdWt: "",
      storeCode: storeCode,
    };
    axios
      .post(`${HOST_URL}/check/item/availability`, CheckAvaiblity)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          GetProductDetails(payload, response.data.value[0]);
          setChekeAvaiblity(response.data.value);
        } else if (response.data.code === "1001") {
          alert("Selected Product is not Available in the Store");
        }
        setLoading(false);
        payload.itemCode = "";
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const GetProductData = productDetails.map((data) => {
    return {
      id: data.id,
      cfa: data.cfa,
      grossWt: data.grossWt,
      huID: data.huID,
      itemCode: data.itemCode,
      description: data.description,
      itemPriceId: data.itemPriceId,
      lotNo: data.lotNo,
      netWt: data.netWt,
      pdtID: data.pdtID,
      productValue: parseInt(data.productValue),
      rateId: data.rateId,
      penaltyRate: parseInt(data.productValue * data.penaltyRate) / 100,
      depositRate: parseInt(data.productValue * data.depositRate) / 100,
      rentalRate: parseInt(data.productValue * data.rentalRate) / 100,
      status: "Active",
    };
  });

  const SelectedProducts = (e, product) => {
    const AddToWishListOBj = {
      cfa: product.cfa,
      depositValue: product.depositRate,
      grossWt: product.grossWt,
      itemCode: product.itemCode,
      itemPriceId: product.itemPriceId,
      lotNo: product.lotNo,
      netWt: product.netWt,
      packageDays: parseInt(payload.packageDays),
      paymentRequestFor: "NewBooking_Cart",
      pdtId: parseInt(product.pdtID),
      productValue: product.productValue,
      rateId: parseInt(product.rateId),
      rentValue: parseInt(product.rentalRate),
      rentalStartDate: payload.bookingDate,
      status: "Booked",
      storeCode: storeCode,
      tempBookingRefId: tempId,
      updatedDate: null,
      createdDate: null,
    };
    if (e.target.checked) {
      setAddtoWishList([...addtoWishList, AddToWishListOBj]);
    } else {
      const selectedData = addtoWishList.filter(
        (rowId) => rowId === AddToWishListOBj.pdtId
      );
      setAddtoWishList(selectedData);
    }
  };

  // DISABLES AFTER TWO MONTHS  DATES
  const getReturnDate = () => {
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + parseInt(90));
    return nextDate;
  };

  const GoForCancel = () => {
    setProductDetails([]);
    setAddtoWishList([]);
    payload.phone = "";
    payload.bookingDate = "";
    payload.packageDays = "";
    payload.customerType = "";
    payload.itemCode = "";
  };
  // FETCH ADDED PRODUCTS TO CART
  const GetAddToCartData = (storeCode) => {
    setLoading(true)
    axios.get(`${HOST_URL}/store/cart/item/view/${storeCode}`).then(res => res).then(response => {
      console.log("item/view==>", response.data)
      if (response.data.code === "1000") {
        setAddedProducts(response.data.value)
      }
      setLoading(false);
    }).catch(error => {
      setLoading(false)
    })
  }
  const InsertTableCalendar = (tempId) => {
    const CanlendarInputs = addtoWishList.map((data) => {
      return {
        pdtId: data.pdtId,
        storeCode: storeCode,
        bookingId: "",
        bookingDate: payload.bookingDate,
        status: "Blocked",
        packageDays: parseInt(payload.packageDays),
        rentalEndDate: rentalEndDate,
        storeCode: storeCode,
        coolOfDate: coolOfDate,
        tempBookingRefNo: tempId,
        createdDate: null,
        updatedDate: null,
      };
    });
    axios
      .post(`${HOST_URL}/insert/into/item/calendar`, CanlendarInputs)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          GetAddToCartData(storeCode)
          setAddtoWishList([]);
          setProductDetails([])
          payload.itemCode = "";
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  const AddtoWishList = () => {
    setLoading(true)
    axios
      .post(`${HOST_URL}/pre/booking/add/to/cart`, addtoWishList)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          InsertTableCalendar(response.data.value.Succes);
        }
        setLoading(false)
      })
      .catch((error) => setLoading(false));
  };

  useEffect(() => {
    GetAddToCartData(storeCode)
  }, [storeCode])

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
      .catch((error) => setLoading(false));
  };

  useEffect(() => {
    if (pdtSelected.length > 0) {
      CheckThresholdMilimt(custType[0])
    }
  }, [pdtSelected.length])

  // <---------------------------ADDEDD TO CART FUNCTIONALITY------------------------------------> 

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

  const DeleteIteamCanlendar = (data) => {
    const { pdtId, tempBookingRef } = data;
    axios.get(`${HOST_URL}/delete/item/booking/calendar/${pdtId}/${tempBookingRef}`).then(res => res).then(response => {
      if (response.data.code === "1000") {
        GetAddToCartData(storeCode)
        Swal.fire({
          title: "Success",
          text: "Product Removed From Your Cart!",
          icon: "success",
          confirmButtonColor: "#008080",
          confirmButtonText: "OK",
        });
      }
    }).catch(error => setLoading(false))
  }

  const DeleteProduct = (data) => {
    console.log("data==>", data)
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
        console.log("booking/calendar==>", response.data)
        if (response.data.code === "1000") {
          GetAddToCartData(storeCode)
          navigate("/booking")
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };
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

  const ContinueToBooking = () => {
    if (thresholdLimit < parseInt(SumOfTProductValue())) {
      alert(`You are Crossing Limit, Our Limit Is ${thresholdLimit}`);
    } else {
      setLoading(true);
      axios
        .post(`${HOST_URL}/add/to/cart`, bookingPyaload)
        .then((res) => res)
        .then((response) => {
          console.log("add/to/cart==>", response.data)
          if (response.data.code === "1000") {
            if (response.data.value.Succes) {
              const bookingTempId = response.data.value.Succes
              UpdateBookingCalendar(bookingTempId);
              const phoneNomber = bookingTempId.substring(0, 10)
              localStorage.setItem("BookinTempId", response.data.value.Succes)
              localStorage.setItem("regNumber", phoneNomber)
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
      <div className="row g-3 mx-0 mt-3">
        <Formik
          initialValues={CheckAvaiblityInitialValue}
          validationSchema={CheckAvaiblitySchema}
          onSubmit={(payload) => CheckAvaiblity(payload)}
        >
          <Form className="row g-2 mx-0">
            <div className="col-md-4">
              <label className="form-label">Phone Number</label>
              <Field
                type="text"
                name="phone"
                placeholder="Enter Phone Number"
                className="form-control"
                disabled={payload.phone ? true : false}
              />
              {/* <ShowError name="phone" /> */}
            </div>
            <div className="col-md-4">
              <label className="form-label">Rental Start Date</label>
              <Field
                type="date"
                name="bookingDate"
                className="form-control"
                disabled={payload.bookingDate ? true : false}
                min={toDayDate}
                max={moment(getReturnDate()).format("YYYY-MM-DD")}
              />
              <ShowError name="bookingDate" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Package Days</label>
              <Field
                as="select"
                name="packageDays"
                className="form-control"
                disabled={payload.packageDays ? true : false}
              >
                <option>Select Days</option>
                {packageDayOption.map((days, i) => {
                  return (
                    <option key={i} value={days.value}>
                      {days.label}
                    </option>
                  );
                })}
              </Field>
              <ShowError name="packageDays" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Customer Type</label>
              <Field
                className="form-control"
                type="text"
                as="select"
                name="customerType"
                disabled={payload.packageDays ? true : false}
              >
                {constomerType.map((item, i) => {
                  return (
                    <option key={i} value={item.value}>
                      {item.label}
                    </option>
                  );
                })}
              </Field>
              <ShowError name="customerType" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Item Code</label>
              <Field
                type="text"
                name="itemCode"
                className="form-control"
                placeholder="Enter 14 Digit Item Code"
              />
              <ShowError name="itemCode" />
            </div>
            <div className="col-md-4">
              <br />
              <div className="mt-2">
                <button type="sumit" className="CButton">
                  Check Availability
                </button>
              </div>
            </div>
          </Form>
        </Formik>
        <div className="col-12 table-responsive">
          <table className="table table-bordered table-hover border-dark text-center">
            <thead className="table-dark border-light">
              <tr style={{ fontSize: "15px" }}>
                {payload.phone && <td>Select</td>}
                {WishListHeader.map((heading, i) => {
                  return <td key={i}>{heading}</td>;
                })}
              </tr>
            </thead>
            <tbody>
              {GetProductData.map((data, i) => {
                const { itemCode } = data;
                const imageCode = itemCode.substring(2, 9);
                const imageURL = `${IMAGE_URL}${imageCode}.jpg`;
                return (
                  <tr
                    key={i}
                    style={{
                      pointerEvents: `${AvlProduct[i] === "Product_Not_Available"
                        ? "none"
                        : ""
                        }`,
                    }}
                  >
                    {payload.phone &&
                      <td className="text-center">
                        <input
                          className="form-check-input border-dark"
                          type="checkbox"
                          disabled={
                            AvlProduct[i] === "Product_Not_Available"
                              ? true
                              : false
                          }
                          onClick={(e) => SelectedProducts(e, data)}
                        />
                      </td>}
                    <td>
                      <img src={imageURL} className="custom-image" alt="" />
                    </td>
                    <td>{data.itemCode}</td>
                    <td>{data.lotNo}</td>
                    <td>{data.description}</td>
                    <td>{data.grossWt}</td>
                    <td>
                      {Math.round(data.productValue).toLocaleString("en-IN")}
                    </td>
                    <td>
                      {Math.round(data.rentalRate).toLocaleString("en-IN")}
                    </td>
                    <td>{parseFloat(data.rentalRate * 1.18).toFixed(2)}</td>
                    <td>
                      {Math.round(data.depositRate).toLocaleString("en-IN")}
                    </td>
                    <td>{AvlProduct[i]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-end mt-0">
          {productDetails.length > 0 && (
            <button className="CancelButton mx-2" onClick={GoForCancel}>
              Reset
            </button>
          )}
          <button
            className={addtoWishList.length > 0 ? "CButton" : "CDisabled"}
            disabled={addtoWishList.length > 0 ? false : true}
            onClick={AddtoWishList}
          >
            Add To Cart
          </button>
        </div>
      </div>

      {/* <---------------------------ADDEDD TO CART ELEMENTS------------------------------------>  */}

      {addedProducts.length > 0 &&
        <div className="row g-3 mx-0 mt-4">
          <div className="col-12">
            <h6 className="bookingHeading">Products In Cart</h6>
          </div>
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
          </div>
          <div className="d-flex justify-content-end mt-0 mb-3">
            <button className={pdtSelected.length > 0 ? "CButton" : "CDisabled"}
              disabled={pdtSelected.length > 0 ? false : true}
              onClick={ContinueToBooking}
            >
              Continue To Booking
            </button>
          </div>
        </div>}
    </div>
  );
};

export default ProductsDetails;
