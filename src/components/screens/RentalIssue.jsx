import React, { useState } from "react";
import Navbar from "../common/Navbar";
import "../../Style/RentalIssue.css";
import { DataList } from "../../Data/DataList";
import { BsFillTrashFill, BsFillEyeFill } from "react-icons/bs";

const RentalIssue = () => {
  // DELIVERY INSPECTION ADD ROWS
  const [deliveryRowCont, setDeliveryRowCont] = useState(0);
  const [addDeliveryItems, setAddDeliveryItems] = useState([]);
  const [deliveryProductId, setDeliveryProductId] = useState(0);
  const [addDeliveryProducts, setAddDeliveryProducts] = useState([]);

  // DELIVERY INSPECTION PRODUCTS INPUT VALUES
  const [deliveryProductItemCode, setDeliveryProductItemCode] = useState("");
  const [deliveryProductFile, setDeliveryProductImg] = useState(null);

  const AddDeliveryRowsInputs = () => {
    setDeliveryRowCont(deliveryRowCont + 1);
    setAddDeliveryItems([...addDeliveryItems, deliveryRowCont + 1]);
  };

  const UploadDeliveryProductImg = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setDeliveryProductImg(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const SaveItemsDetails = () => {
    if (!deliveryProductItemCode) {
      alert("Please Enter All Details");
    } else {
      setDeliveryProductId(deliveryProductId + 1);
      const deliveryProductsTable = {
        id: deliveryRowCont,
        itemCode: deliveryProductItemCode,
        delieryProductFile: deliveryProductFile,
      };
      setAddDeliveryProducts([...addDeliveryProducts, deliveryProductsTable]);
      setAddDeliveryItems([]);
    }
  };

  const DeleteRow = (id) => {
    const updatedData = addDeliveryProducts.filter((rowId) => rowId.id !== id);
    setAddDeliveryProducts(updatedData);
  };

  return (
    <div>
      <Navbar />
      <div className="mt-4 mx-2">
        <h6 className="bookingHeading">Booking Details</h6>
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <label className="form-label">Booking Ref No</label>
            <input
              type="type"
              className="form-control"
              placeholder="Booking Ref No"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Issue Date</label>
            <input type="date" className="form-control" />
          </div>
          <div className="col-md-4">
            <label className="form-label">Customer Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Customer Name"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Customer ID Type</label>
            <select className="form-control">
              <option>Select Type</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">2</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Customer ID No</label>
            <input
              type="text"
              className="form-control"
              placeholder="Customer ID No."
            />
          </div>
          <div className="col-md-4">
            <div className="d-flex justify-content-between">
              <label className="form-label">Upload ID</label>
              <span className="mx-2">
                {deliveryProductFile && (
                  <BsFillEyeFill
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    style={{ cursor: "pointer" }}
                  />
                )}
              </span>
            </div>
            <input
              type="file"
              className="form-control"
              onChange={UploadDeliveryProductImg}
            />
          </div>
          <div className="col-12 d-flex justify-content-end mt-1">
            <div
              className="modal fade"
              id="exampleModal"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-xl">
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body">
                    {deliveryProductFile && (
                      <img
                        src={deliveryProductFile}
                        alt="Preview"
                        className="fullScreenImage"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {DataList.length > 0 && (
            <div className="col-12">
              <h6 className="bookingHeading">Item Details</h6>
              <div className="table-responsive">
                <table className="table table-bordered table-hover border-dark">
                  <thead className="table-dark border-light">
                    <tr>
                      <th>Item Code</th>
                      <th>Lot No.</th>
                      <th>Package_Days</th>
                      <th>Product_Value</th>
                      <th>Rental_Amount</th>
                      <th>Deposit_Amount</th>
                      <th>Actual_Weight </th>
                    </tr>
                  </thead>
                  <tbody>
                    {DataList.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td className="text-center border-dark">
                            IKFDSVAKFVKNRESC
                          </td>
                          <td>{item.name}</td>
                          <td>{item.phone}</td>
                          <td>{item.email}</td>
                          <td>{item.website}</td>
                          <td>{item.address.city}</td>
                          <td>
                            <input
                              type="number"
                              placeholder="Actual Weight"
                              className="w-100"
                            />
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <th colSpan="4" className="text-end">
                        TOTAL
                      </th>
                      <th>234</th>
                      <th>124</th>
                      <th>678</th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {DataList.length > 0 && (
            <div className="col-12">
              <h6 className="bookingHeading">Deposit Amount Payment Details</h6>
              <div className="table-responsive">
                <table className="table table-bordered table-hover border-dark">
                  <thead className="table-dark border-light">
                    <tr>
                      <th>Type</th>
                      <th>Ref Number</th>
                      <th>Amount</th>
                      <th>Upload</th>
                      <th>View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DataList.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            <select className="w-100">
                              <option>Select Type</option>
                              <option>Creadit Note</option>
                              <option>Creadit Card</option>
                            </select>
                          </td>
                          <td>
                            <input
                              type="text"
                              className="w-100"
                              placeholder="Ref Number"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="w-100"
                              placeholder="Amount"
                            />
                          </td>
                          <td className="d-flex justify-content-center">
                            <input
                              type="file"
                              onChange={UploadDeliveryProductImg}
                              style={{ cursor: "pointer" }}
                            />
                          </td>
                          <td>
                            {deliveryProductFile && (
                              <img
                                src={deliveryProductFile}
                                alt="Preview"
                                height="80px"
                                width="100%"
                              />
                            )}
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td colSpan="2" className="text-end">
                        Total Deposit Amount Paid
                      </td>
                      <td>
                        <input
                          type="text"
                          value={6}
                          className="w-100"
                          disabled
                        />
                      </td>
                      <td colSpan="2" />
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {DataList.length > 0 && (
            <div className="col-12">
              <h6 className="bookingHeading">Delivery Inspection Product</h6>
              <div className="table-responsive">
                <table className="table table-bordered table-hover border-dark">
                  <thead className="table-dark border-light text-center">
                    <tr>
                      <th>Item Code</th>
                      <th>View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {addDeliveryProducts.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td>{item.itemCode}</td>
                          <td className="d-flex justify-content-between">
                            <BsFillEyeFill />
                            <BsFillTrashFill
                              className="DeleteRow"
                              onClick={() => DeleteRow(item.id)}
                            />
                          </td>
                        </tr>
                      );
                    })}

                    {addDeliveryItems.length > 0 && (
                      <tr>
                        <td>
                          <input
                            type="text"
                            placeholder="Item Code"
                            className="w-100"
                            onChange={(e) =>
                              setDeliveryProductItemCode(e.target.value)
                            }
                          />
                        </td>
                        <td className="d-flex justify-content-between">
                          <input
                            type="file"
                            onChange={UploadDeliveryProductImg}
                          />
                          <BsFillTrashFill
                            className="DeleteRow"
                            onClick={() => setAddDeliveryItems([])}
                          />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <div className="d-flex justify-content-end mt-0">
                  {addDeliveryItems.length > 0 ? (
                    <button
                      type="submit"
                      className="CButton"
                      onClick={SaveItemsDetails}
                    >
                      Save Row
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="CButton"
                      onClick={AddDeliveryRowsInputs}
                    >
                      Add Row
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="col-12">
            <h6 className="bookingHeading">
              Print Delivery Inspection Acknowledgement
            </h6>
          </div>
          <div className="row d-flex">
            <div className="col-md-4 d-flex">
              <label className="form-label">Booking Ref No.</label>
              <div className="mx-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="t&c"
                  defaultChecked
                />
                <label className="form-check-label mx-1">YES</label>
              </div>
              <div>
                <input
                  className="form-check-input"
                  type="radio"
                  name="t&c"
                  defaultChecked
                />
                <label className="form-check-label mx-1">NO</label>
              </div>
            </div>
            <div className="col-md-8 d-flex justify-content-between">
              <label className="form-label col-md-2">Loan Documents</label>
              <input type="file" className="form-control" />
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button className="CButton">Print</button>
          </div>
          <div className="col-12">
            <h6 className="bookingHeading">
              Signed Acknowledgement of Product Received after Inspection
            </h6>
          </div>
          <div className="col-md-3 mt-0">
            <input type="file" className="form-control" />
          </div>
          <div className="col-md-2 mt-0">
            {deliveryProductFile && (
              <img
                src={deliveryProductFile}
                alt="Preview"
                height="80px"
                width="100%"
              />
            )}
          </div>
          <div className="d-flex justify-content-end mb-4">
            <button type="button" className="CButton">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalIssue;
