import React, { useState } from "react";
import Navbar from "../common/Navbar";
import {
  WishListHeader,
  constomerType,
  packageDayOption,
} from "../../Data/DataList";
import axios from "axios";
import { HOST_URL } from "../../API/HostURL";
import Loader from "../common/Loader";
import { BsFillTrashFill } from "react-icons/bs";
import { Field, Form, Formik } from "formik";
import {
  CheckAvaiblityInitialValue,
  CheckAvaiblitySchema,
} from "../../Schema/LoginSchema";
import ShowError from "../../Schema/ShowEroor";

const ProductsDetails = () => {
  const [payload, setPayload] = useState({});
  const [loading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState({});
  const [rateMasterData, setRateMasterData] = useState({});
  const [addtoCartProducts, setAddtoCartProducts] = useState([]);
  const [available, setAvailable] = useState(false);
  console.log("available==>", available);

  const storeCode = localStorage.getItem("storeCode");
  console.log("rateMasterData==>", rateMasterData);
  console.log("productDetails==>", productDetails);

  const GetMasterRate = (masterData) => {
    const getMasterData = {
      customerType: masterData.customerType,
      storeCode: storeCode,
      packagePeriod: masterData.packageDays,
      cfaCode: masterData.cfa,
      locType: "sameCity",
    };
    console.log("getMasterData==>", getMasterData);
    axios
      .post(`${HOST_URL}/get/rate/master`, getMasterData)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setRateMasterData(response.data.value);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("error==>", error);
        setLoading(false);
      });
  };

  const GetProductDetails = (payload) => {
    axios
      .get(
        `${HOST_URL}/rental/product/view/details/${storeCode}/${payload.itemCode}`
      )
      .then((res) => res)
      .then((response) => {
        console.log("response==>", response.data);
        if (response.data.code === "1000") {
          setProductDetails(response.data.value);
          if (response.data.value) {
            GetMasterRate({ ...payload, ...response.data.value });
          }
        }
      })
      .catch((error) => {
        console.log("error==>", error);
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
    // console.log("CheckAvaiblity==>", CheckAvaiblity);
    axios
      .post(`${HOST_URL}/check/item/availability`, CheckAvaiblity)
      .then((res) => res)
      .then((response) => {
        console.log("response==>", response.data);
        if (response.data.code === "1000") {
          GetProductDetails(payload);
          if (response.data.value === "Available") {
            setAvailable(true);
          }
        }
        payload.itemCode = "";
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const DeleteWishListRow = (PdtID) => {
    const updatedData = addtoCartProducts.filter(
      (rowId) => rowId.PdtID !== PdtID
    );
    setAddtoCartProducts(updatedData);
  };

  const WishListedData = {
    PdtID: productDetails.pdtID,
    HUID: productDetails.huID,
    ItemCode: productDetails.itemCode,
    LotNo: productDetails.lotNo,
    CFA: productDetails.cfa,
    GrossWt: productDetails.grossWt,
    NetWt: productDetails.netWt,
    ProductValue: productDetails.productValue,
    RentalRate: productDetails.productValue * rateMasterData.rentalRate,
    DepositRate: productDetails.productValue * rateMasterData.depositRate,
  };
  console.log("WishListedData==>", WishListedData);
  const AddToWishList = () => {
    setAddtoCartProducts([...addtoCartProducts, WishListedData]);
    setProductDetails({});
  };

  const AddToCart = () => {};
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
            {WishListedData.PdtID && (
              <tbody>
                <tr>
                  <td className="text-center">
                    <input
                      className="form-check-input border-dark"
                      type="checkbox"
                    />
                  </td>
                  <td>{WishListedData.ItemCode}</td>
                  <td>{WishListedData.LotNo}</td>
                  <td>{WishListedData.CFA}</td>
                  <td>{WishListedData.GrossWt}</td>
                  <td>{WishListedData.NetWt}</td>
                  <td>{WishListedData.ProductValue}</td>
                  <td>{WishListedData.RentalRate.toString()}</td>
                  <td>{WishListedData.DepositRate.toString()}</td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
        <div className="d-flex justify-content-end mt-0">
          <button
            className={!available ? "CDisabled" : "CButton"}
            disabled={available ? false : true}
            onClick={AddToWishList}
          >
            Add To WishList
          </button>
        </div>
        {addtoCartProducts.length > 0 && (
          <div className="col-12">
            <h6 className="bookingHeading">Your WishListed Products</h6>
            <div className="col-12 table-responsive">
              <table className="table table-bordered table-hover border-dark">
                <thead className="table-dark border-light">
                  <tr>
                    {WishListHeader.map((heading, i) => {
                      return <td key={i}>{heading}</td>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {addtoCartProducts.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td>{item.ItemCode}</td>
                        <td>{item.LotNo}</td>
                        <td>{item.CFA}</td>
                        <td>{item.GrossWt}</td>
                        <td>{item.NetWt}</td>
                        <td>{item.ProductValue}</td>
                        <td>{item.RentalRate}</td>
                        <td className="d-flex justify-content-between">
                          {item.DepositRate}
                          <BsFillTrashFill
                            className="DeleteRow"
                            onClick={() => DeleteWishListRow(item.PdtID)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {addtoCartProducts.length > 0 && (
          <div className="d-flex justify-content-end mt-0">
            <button className="CButton" onClick={AddToCart}>
              Add To Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsDetails;
