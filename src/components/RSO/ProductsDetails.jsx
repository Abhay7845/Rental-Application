import React, { useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import {
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

const ProductsDetails = () => {
  const storeCode = localStorage.getItem("storeCode");
  const cartList = localStorage.getItem("addedCart")
  const [payload, setPayload] = useState({});
  const [loading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState([]);
  const [addtoWishList, setAddtoWishList] = useState([]);
  const [chekeAvaiblity, setChekeAvaiblity] = useState([]);
  const tempId = `${payload.phone}-${payload.bookingDate}`;


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
          setProductDetails(response.data.value);
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
    axios.get(`${HOST_URL}/store/cart/item/view/${storeCode}`).then(res => res).then(response => {
      console.log("responseCart==>", response.data)
      if (response.data.code === "1000") {
        localStorage.setItem("addedCart", response.data.value.length)
      } if (response.data.code === "1001") {
        const cartPdt = response.data.value;
        localStorage.setItem("addedCart", cartPdt === "data not found" ? 0 : cartPdt)
      }
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
        console.log("response123==>", response.data)
        if (response.data.code === "1000") {
          Swal.fire("Success", "Product Added To Cart Successfuly", "success");
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
        console.log("response==>4567==>", response.data)
        if (response.data.code === "1000") {
          InsertTableCalendar(response.data.value.Succes);
          GetAddToCartData(storeCode)
        }
        setLoading(false)
      })
      .catch((error) => setLoading(false));
  };

  useEffect(() => {
    GetAddToCartData(storeCode)
  }, [storeCode, cartList])

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
              <ShowError name="phone" />
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
                <td>Select</td>
                {WishListHeader.map((heading, i) => {
                  return <td key={i}>{heading}</td>;
                })}
              </tr>
            </thead>
            {GetProductData.length > 0 && (
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
                      </td>
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
            onClick={AddtoWishList}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetails;
