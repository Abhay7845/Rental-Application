import React, { useState, useEffect } from "react";
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
  const [wishList, setWishList] = useState(false);
  const [thresHoldValue, setThresHoldValue] = useState(false);
  const currentDate = new Date();
  const toDayDate = moment(currentDate).format("YYYY-MM-DD");
  const storeCode = localStorage.getItem("storeCode");
  const navigate = useNavigate();

  const GetProductDetails = (payload) => {
    const GetProducts = {
      storeCode: storeCode,
      itemCode: payload.itemCode,
      customerType: payload.customerType,
      packagePeriod: payload.packageDays,
      cfaCode: "1234",
      locType: "SameCity",
    };
    axios
      .post(`${HOST_URL}/rental/product/view/details`, GetProducts)
      .then((res) => res)
      .then((response) => {
        console.log("response==>", response.data);
        if (response.data.code === "1000") {
          setProductDetails(response.data.value);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("error==>", error);
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
    axios
      .post(`${HOST_URL}/check/item/availability`, CheckAvaiblity)
      .then((res) => res)
      .then((response) => {
        console.log("response==>", response.data);
        if (response.data.code === "1000") {
          GetProductDetails(payload);
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
      productValue: data.productValue,
      rateId: data.rateId,
      penaltyRate: parseFloat(data.productValue * data.penaltyRate),
      depositRate: parseFloat(data.productValue * data.depositRate),
      rentalRate: parseFloat(data.productValue * data.rentalRate),
      status: "Active",
    };
  });

  const SelectedProducts = (product) => {
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
      productValue: product.productValue,
      rentValue: product.rentalRate,
      depositValue: product.depositRate,
      createdDate: null,
      updatedDate: null,
      status: "Added To Cart",
      tempBookingRefId: "",
      paymentRequestFor: "NewBooking",
    };
    setAddtoWishList([...addtoWishList, AddToWishListOBj]);
    setGoToCart([...goToCart, AddToWishListOBj]);
  };

  const AddToWishList = () => {
    setWishList(true);
    setProductDetails([]);
    setAddtoWishList([]);
  };
  const DeleteWishListRow = (pdtId) => {
    const updatedData = goToCart.filter((rowId) => rowId.pdtId !== pdtId);
    setGoToCart(updatedData);
    if (updatedData.length === 0) {
      setWishList(false);
    }
  };

  // TOTAL COST OF PRODUCT VALUE
  const TProductValue = goToCart.map((item) => parseFloat(item.productValue));
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

  const GoForCancel = () => {
    setWishList(false);
    setProductDetails([]);
    setAddtoWishList([]);
    payload.bookingDate = "";
    payload.packageDays = "";
    payload.customerType = "";
  };
  const thresholdLimit = parseInt(thresHoldValue.limit) * 100000;

  const ContinueToBooking = () => {
    if (thresholdLimit < SumOfTProductValue()) {
      alert(`You are Crossing Limit, Our Limit Is ${thresholdLimit}`);
    } else {
      setLoading(true);
      localStorage.setItem("itemsCartDetails", JSON.stringify(goToCart));
      axios
        .post(`${HOST_URL}/add/to/cart`, goToCart)
        .then((res) => res)
        .then((response) => {
          console.log("response==>", response.data);
          if (response.data.code === "1000") {
            if (response.data.value) {
              localStorage.setItem("BookinTempId", response.data.value.Succes);
              Swal.fire("Added", "Your Products Added To Carrt", "success");
              navigate("/booking");
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

  // THRESHOLD LIMIT API CALL
  useEffect(() => {
    if (payload.customerType) {
      axios
        .get(`${HOST_URL}/get/threshold/value/${payload.customerType}`)
        .then((res) => res)
        .then((response) => {
          if (response.data.code === "1000") {
            setThresHoldValue(response.data.value);
          }
        })
        .catch((error) => {
          console.log("error=>", error);
          setLoading(false);
        });
    }
  }, [payload.customerType]);

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
              <label className="form-label">Booking Date</label>
              <Field
                type="date"
                name="bookingDate"
                className="form-control"
                disabled={payload.bookingDate ? true : false}
                min={toDayDate}
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
          <table className="table table-bordered table-hover border-dark">
            <thead className="table-dark border-light">
              <tr>
                <td>Select</td>
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
                          data.status === "Active" ? "" : "none"
                        }`,
                      }}
                    >
                      <td className="text-center">
                        <input
                          className="form-check-input border-dark"
                          type="checkbox"
                          disabled={data.status === "Active" ? false : true}
                          onClick={() => SelectedProducts(data)}
                        />
                      </td>
                      <td>{data.id}</td>
                      <td>{data.itemCode}</td>
                      <td>{data.description}</td>
                      <td>{data.pdtID}</td>
                      <td>{data.lotNo}</td>
                      <td>{data.cfa}</td>
                      <td>{data.grossWt}</td>
                      <td>{data.netWt}</td>
                      <td>{data.productValue}</td>
                      <td>{data.rentalRate}</td>
                      <td>{data.depositRate}</td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        </div>
        <div className="d-flex justify-content-end mt-0">
          <button
            className={addtoWishList.length > 0 ? "CButton" : "CDisabled"}
            disabled={addtoWishList.length > 0 ? false : true}
            onClick={AddToWishList}
          >
            Add To WishList
          </button>
        </div>
        {wishList === true && (
          <div className="col-12">
            <h6 className="bookingHeading">Your WishListed Products</h6>
            <div className="col-12 table-responsive">
              <table className="table table-bordered table-hover border-dark">
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
                        <td>{item.pdtId}</td>
                        <td>{item.lotNo}</td>
                        <td>{item.cfa}</td>
                        <td>{item.grossWt}</td>
                        <td>{item.netWt}</td>
                        <td>{item.productValue}</td>
                        <td>{item.rentValue}</td>
                        <td className="d-flex justify-content-between">
                          {item.depositValue}
                          <BsFillTrashFill
                            className="DeleteRow"
                            onClick={() => DeleteWishListRow(item.pdtId)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                  <tr className="text-bold">
                    <th colSpan="6" className="text-end">
                      TOTAL
                    </th>
                    <th>{SumOfTProductValue()}</th>
                    <th>{SumOfRentalRate()}</th>
                    <th>{SumOfDepositRate()}</th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        {wishList === true && (
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
