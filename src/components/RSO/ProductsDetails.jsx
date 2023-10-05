import React, { useState } from "react";
import Navbar from "../common/Navbar";
import {
  AddedTocCart,
  WishListHeader,
  constomerType,
  packageDayOption,
} from "../../Data/DataList";
import axios from "axios";
import Swal from "sweetalert2";
import { HOST_URL } from "../../API/HostURL";
import Loader from "../common/Loader";
import { BsFillTrashFill } from "react-icons/bs";
import { Field, Form, Formik } from "formik";
import {
  CheckAvaiblityInitialValue,
  CheckAvaiblitySchema,
} from "../../Schema/LoginSchema";
import ShowError from "../../Schema/ShowEroor";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const ProductsDetails = () => {
  const [payload, setPayload] = useState({});
  const [loading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState([]);
  const [goToCart, setGoToCart] = useState([]);
  const [addtoWishList, setAddtoWishList] = useState([]);
  const [thresholdLimit, setThresholdLimit] = useState("");
  const [chekeAvaiblity, setChekeAvaiblity] = useState([]);
  const [selectedId, setSelectedId] = useState("");

  const storeCode = localStorage.getItem("storeCode");
  const navigate = useNavigate();
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
    console.log("GetProducts==>", GetProducts);
    axios
      .post(`${HOST_URL}/rental/product/view/details`, GetProducts)
      .then((res) => res)
      .then((response) => {
        console.log("GetProductsResponse==>", response.data);
        if (response.data.code === "1000") {
          setProductDetails(response.data.value);
        } else if (response.data.code === "1001") {
          alert("Data Not Found");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("error==>", error);
        setLoading(false);
      });
  };

  const CheckThresholdMilimt = (payload) => {
    axios
      .get(`${HOST_URL}/get/threshold/value/${payload.customerType}`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setThresholdLimit(parseInt(response.data.value.limit));
        }
      })
      .catch((error) => {
        console.log("error=>", error);
        setLoading(false);
      });
  };

  const CheckAvaiblity = (payload) => {
    localStorage.setItem("custType", payload.customerType);
    localStorage.setItem("packageDays", payload.packageDays);
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
    console.log("CheckAvaiblity==>", CheckAvaiblity);
    axios
      .post(`${HOST_URL}/check/item/availability`, CheckAvaiblity)
      .then((res) => res)
      .then((response) => {
        console.log("AvlResponse==>", response.data);
        if (response.data.code === "1000") {
          GetProductDetails(payload, response.data.value[0]);
          setChekeAvaiblity(response.data.value);
          CheckThresholdMilimt(payload);
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

  const SelectedProducts = (product) => {
    setSelectedId(product.pdtID);
    const AddToWishListOBj = {
      bookingId: 0,
      itemCode: product.itemCode,
      cfa: product.cfa,
      lotNo: product.lotNo,
      grossWt: product.grossWt,
      netWt: product.netWt,
      pdtId: product.pdtID,
      rentalStartDate: payload.bookingDate,
      packageDays: parseInt(payload.packageDays),
      itemPriceId: parseInt(product.itemPriceId),
      rateId: product.rateId,
      productValue: parseInt(product.productValue),
      rentValue: parseInt(product.rentalRate),
      depositValue: parseInt(product.depositRate),
      createdDate: null,
      updatedDate: null,
      status: "Added To Cart",
      tempBookingRefId: "",
      paymentRequestFor: "NewBooking",
      storeCode: storeCode,
    };
    setAddtoWishList([...addtoWishList, AddToWishListOBj]);
  };
  const AddToWishList = () => {
    const avlId = goToCart.map((id) => id.pdtId);
    if (avlId.includes(selectedId)) {
      alert("Product Is Already Added to the Wishlist");
    } else {
      setGoToCart([...goToCart, ...addtoWishList]);
      setProductDetails([]);
      setAddtoWishList([]);
    }
  };

  const DeleteWishListRow = (pdtId) => {
    const updatedData = goToCart.filter((rowId) => rowId.pdtId !== pdtId);
    setGoToCart(updatedData);
  };

  console.log("goToCart==>", goToCart);
  // TOTAL COST OF PRODUCT VALUE
  const TProductValue = goToCart.map((item) => parseInt(item.productValue));
  const SumOfTProductValue = () => {
    let total = 0;
    for (let data of TProductValue) total = total + data;
    return total;
  };
  // TOTAL COST OF  RENTAL RATE
  const TRentalRate = goToCart.map((item) => item.rentValue);

  const SumOfRentalRate = () => {
    let total = 0;
    for (let data of TRentalRate) total = total + data;
    return total;
  };

  // TOTAL COST OF DEPOSIT RATE
  const TDepositRate = goToCart.map((item) => item.depositValue);
  const SumOfDepositRate = () => {
    let total = 0;
    for (let data of TDepositRate) total = total + data;
    return total;
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
    setGoToCart([]);
    payload.bookingDate = "";
    payload.packageDays = "";
    payload.customerType = "";
  };

  const InsertTableCalendar = (tempId) => {
    const CanlendarInputs = goToCart.map((data) => {
      return {
        pdtId: data.pdtId,
        bookingId: "",
        bookingDate: payload.bookingDate,
        createdDate: null,
        updatedDate: null,
        status: "Blocked",
        packageDays: parseInt(payload.packageDays),
        rentalEndDate: rentalEndDate,
        storeCode: storeCode,
        coolOfDate: coolOfDate,
        tempBookingRefNo: tempId,
      };
    });
    console.log("CanlendarInputs==>", CanlendarInputs);
    axios
      .post(`${HOST_URL}/insert/into/item/calendar`, CanlendarInputs)
      .then((res) => res)
      .then((response) => {
        console.log("response==>", response);
        if (response.data.code === "1000") {
          Swal.fire("Added", "Your Products Added To Cart", "success");
          navigate("/booking");
        }
      })
      .catch((error) => {
        console.log("erorr==>", error);
      });
  };

  const ContinueToBooking = () => {
    if (thresholdLimit < parseInt(SumOfTProductValue())) {
      alert(`You are Crossing Limit, Our Limit Is ${thresholdLimit}`);
    } else {
      setLoading(true);
      localStorage.setItem("itemsCartDetails", JSON.stringify(goToCart));
      axios
        .post(`${HOST_URL}/add/to/cart`, goToCart)
        .then((res) => res)
        .then((response) => {
          console.log("responseDtaa==>", response.data.value.Succes);
          if (response.data.code === "1000") {
            if (response.data.value.Succes) {
              localStorage.setItem("BookinTempId", response.data.value.Succes);
              InsertTableCalendar(response.data.value.Succes);
            }
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log("error=>", error);
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
            <div className="col-md-3">
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
            <div className="col-md-3">
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
            <div className="col-md-3">
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
            <div className="col-md-3">
              <label className="form-label">Item Code</label>
              <Field
                type="text"
                name="itemCode"
                className="form-control"
                placeholder="Enter 14 Digit Item Code"
              />
              <ShowError name="itemCode" />
            </div>
            <div className="col-md-12">
              <div className="d-flex justify-content-end">
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
              <tr>
                <td>SELECT</td>
                {WishListHeader.map((heading, i) => {
                  return <td key={i}>{heading}</td>;
                })}
                <td>Availability</td>
              </tr>
            </thead>
            {GetProductData.length > 0 && (
              <tbody>
                {GetProductData.map((data, i) => {
                  return (
                    <tr
                      key={i}
                      style={{
                        pointerEvents: `${
                          AvlProduct[i] === "Product_Not_Available"
                            ? "none"
                            : ""
                        }`,
                      }}
                    >
                      <td className="text-center">
                        <input
                          className="form-check-input border-dark"
                          type="checkbox"
                          disabled={
                            AvlProduct[i] === "Product_Not_Available"
                              ? true
                              : false
                          }
                          onClick={() => SelectedProducts(data)}
                        />
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
                      <td>
                        {Math.round(data.depositRate).toLocaleString("en-IN")}
                      </td>
                      <td>{AvlProduct[i]}</td>
                    </tr>
                  );
                })}
              </tbody>
            )}
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
            onClick={AddToWishList}
          >
            Add To WishList
          </button>
        </div>
        {goToCart.length > 0 && (
          <div className="col-12">
            <h6 className="bookingHeading">Your WishListed Products</h6>
            <div className="col-12 table-responsive">
              <table className="table table-bordered table-hover border-dark text-center">
                <thead className="table-dark border-light">
                  <tr>
                    {AddedTocCart.map((heading, i) => {
                      return <td key={i}>{heading}</td>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {goToCart.map((item, i) => {
                    return (
                      <tr key={i}>
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
                    <th colSpan="3" className="text-end">
                      TOTAL
                    </th>
                    <th>₹ {SumOfTProductValue().toLocaleString("en-IN")}</th>
                    <th>₹ {SumOfRentalRate().toLocaleString("en-IN")}</th>
                    <th>₹ {SumOfDepositRate().toLocaleString("en-IN")}</th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        {goToCart.length > 0 && (
          <div className="d-flex justify-content-end mt-0 mb-3">
            <button className="CancelButton mx-2" onClick={GoForCancel}>
              Cancel
            </button>
            <button className="CButton" onClick={ContinueToBooking}>
              Continue To Booking
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsDetails;
