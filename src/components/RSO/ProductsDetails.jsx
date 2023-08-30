import React, { useState } from "react";
import Navbar from "../common/Navbar";
import { constomerType, packageDayOption } from "../../Data/DataList";
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
  const [addtoCartProducts, setAddtoCartProducts] = useState([]);
  const storeCode = localStorage.getItem("storeCode");
  const GetProductDetails = (itemCode) => {
    setLoading(true);
    axios
      .get(`${HOST_URL}/rental/product/view/details/${storeCode}/${itemCode}`)
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
    setPayload(payload);
    const { itemCode, bookingDate, packageDays } = payload;
    setLoading(true);
    const CheckAvaiblity = {
      bookedDate: "",
      bookingDate: bookingDate,
      endDate: "",
      image: "",
      itemCode: itemCode,
      packageDays: packageDays,
      stdUCP: "",
      stdWt: "",
      storeCode: storeCode,
    };
    console.log("CheckAvaiblity==>", CheckAvaiblity);
    axios
      .post(`${HOST_URL}/check/item/availability`, CheckAvaiblity)
      .then((res) => res)
      .then((response) => {
        console.log("response==>", response.data);
        if (response.data.code === "1000") {
          if (response.data.value === "Available") {
            GetProductDetails(itemCode);
          } else {
            alert("Product Not Available");
          }
        }
        setLoading(false);
        payload.itemCode = "";
      })
      .catch((errro) => {
        setLoading(false);
      });
  };

  const AddToWishList = () => {
    console.log("productDetails==>", productDetails);
    const AddTowishLsit = {
      bookingId: productDetails.pdtId,
      createdDate: "2023-08-30",
      depositValue: 0,
      itemPriceId: 0,
      packageDays: parseInt(payload.packageDays),
      pdtId: productDetails.pdtID,
      productValue: parseInt(productDetails.productValue),
      rateId: 0,
      rentValue: 0,
      rentalStartDate: payload.bookingDate,
      status: "Active",
      tempBookingRefId: "ABHAY-2023-12345",
      updatedDate: "2023-08-30",
    };
    console.log("AddTowishLsit==>", AddTowishLsit);
    setAddtoCartProducts([...addtoCartProducts, AddTowishLsit]);
    // setProductDetails({});
  };

  const DeleteWishListRow = (pdtID) => {
    const updatedData = addtoCartProducts.filter(
      (rowId) => rowId.pdtID !== pdtID
    );
    setAddtoCartProducts(updatedData);
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
                    <option key={i} value={days}>
                      {days}
                    </option>
                  );
                })}
              </Field>
              <ShowError name="packageDays" />
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
            <div className="col-md-3">
              <label className="form-label">Customer Type</label>
              <select
                className="form-control"
                // onChange={(e) => setCustomerType(e.target.value)}
                // disabled={!existedUserData.custId ? true : false}
              >
                {constomerType.map((item, i) => {
                  return (
                    <option key={i} value={item.value}>
                      {item.label}
                    </option>
                  );
                })}
              </select>
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
                <th>PdtID</th>
                <th>HUID</th>
                <th>Item Code</th>
                <th>Lot No.</th>
                <th>CFA</th>
                <th>Gross Wt</th>
                <th>Net Wt</th>
                <th>Product Value</th>
              </tr>
            </thead>
            {productDetails.pdtID && (
              <tbody>
                <tr>
                  <td>{productDetails.pdtID}</td>
                  <td>{productDetails.huID}</td>
                  <td>{productDetails.itemCode}</td>
                  <td>{productDetails.lotNo}</td>
                  <td>{productDetails.cfa}</td>
                  <td>{productDetails.grossWt}</td>
                  <td>{productDetails.netWt}</td>
                  <td className="d-flex justify-content-between">
                    {productDetails.productValue}
                    <BsFillTrashFill
                      className="DeleteRow"
                      onClick={() => setProductDetails({})}
                    />
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
        <div className="d-flex justify-content-end mt-0">
          <button
            className={productDetails.pdtID ? "CButton" : "CDisabled"}
            disabled={productDetails.pdtID ? false : true}
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
                    <th>PdtID</th>
                    <th>HUID</th>
                    <th>Item Code</th>
                    <th>Lot No.</th>
                    <th>CFA</th>
                    <th>Gross Wt</th>
                    <th>Net Wt</th>
                    <th>Product Value</th>
                  </tr>
                </thead>
                <tbody>
                  {addtoCartProducts.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td>{item.pdtID}</td>
                        <td>{item.huID}</td>
                        <td>{item.itemCode}</td>
                        <td>{item.lotNo}</td>
                        <td>{item.cfa}</td>
                        <td>{item.grossWt}</td>
                        <td>{item.netWt}</td>
                        <td className="d-flex justify-content-between">
                          {item.productValue}
                          <BsFillTrashFill
                            className="DeleteRow"
                            onClick={() => DeleteWishListRow(item.pdtID)}
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
            <button className="CButton">Add To Cart</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsDetails;
