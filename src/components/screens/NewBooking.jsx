import React, { useState } from "react";
import Navbar from "../common/Navbar";
import { DataList } from "../../Data/DataList";

const NewBooking = () => {
  const [image, setImage] = useState(null);
  const [count, setCount] = useState(0);
  const [addrows, setAddrows] = useState([]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const AddRowTbale = () => {
    setCount(count + 1);
    setAddrows([...addrows, count + 1]);
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h6 className="bookingHeading">Booking Details</h6>
        <div className="row g-3 mx-0">
          <div className="col-md-4">
            <label className="form-label">Reference ID</label>
            <input
              type="type"
              className="form-control"
              placeholder="Reference ID"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Store Code</label>
            <input
              type="text"
              className="form-control"
              placeholder="Store Code"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Booking Date</label>
            <input type="date" className="form-control" />
          </div>
          <div className="col-8">
            <input
              type="type"
              className="form-control"
              placeholder="Search By Phone or PAN"
            />
          </div>
          <div className="col-1">
            <button type="button" className="CButton">
              Search
            </button>
          </div>
          <h6 className="bookingHeading mx-2">Customer Details</h6>
          <div className="col-md-4">
            <label className="form-label">Customer Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Customer Name"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Phone Number</label>
            <input
              type="number"
              className="form-control"
              placeholder="Phone Number"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" placeholder="Email" />
          </div>
          <h6 className="bookingHeading mx-2">Customer Address</h6>
          <div className="col-md-6">
            <label className="form-label">Address Line-1</label>
            <textarea
              type="text"
              className="form-control"
              placeholder="Address Line-1"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Address Line-2</label>
            <textarea
              type="text"
              className="form-control"
              placeholder="Address Line-2"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">State</label>
            <input type="text" className="form-control" placeholder="State" />
          </div>
          <div className="col-md-4">
            <label className="form-label">City</label>
            <input type="text" className="form-control" placeholder="City" />
          </div>
          <div className="col-md-4">
            <label className="form-label">Pin Code</label>
            <input
              type="number"
              className="form-control"
              placeholder="Pin Code"
            />
          </div>
          <h6 className="bookingHeading mx-2">Required Documents</h6>
          <div className="col-md-6">
            <label className="form-label">Addeess ID Proof Type</label>
            <select className="form-control">
              <option>Select Type</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Customer Type</label>
            <select className="form-control">
              <option>Select Type</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="col-md-4 d-flex justify-content-center">
            {image && (
              <img src={image} alt="Preview" height="100px" width="200px" />
            )}
          </div>
          <div className="col-md-4 d-flex justify-content-center">
            {image && (
              <img src={image} alt="Preview" height="100px" width="200px" />
            )}
          </div>
          <div className="col-md-4 d-flex justify-content-center">
            {image && (
              <img src={image} alt="Preview" height="100px" width="200px" />
            )}
          </div>
          <div className="col-md-4 d-flex justify-content-between">
            <label className="form-label">With in Catchment?</label>
            <div>
              <input
                className="form-check-input"
                type="radio"
                name="gridRadios"
                defaultChecked
              />
              <label className="form-check-label mx-2">YES</label>
            </div>
            <div>
              <input
                className="form-check-input"
                type="radio"
                name="gridRadios"
                defaultChecked
              />
              <label className="form-check-label mx-2">NO</label>
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
                      <th>Rental_Date</th>
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
                          <td>DATE</td>
                          <td>{item.phone}</td>
                          <td>{item.email}</td>
                          <td>{item.website}</td>
                          <td>{item.address.city}</td>
                          <td>{item.address.city}</td>
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
                      <th>
                        <input
                          type="number"
                          placeholder="Weight"
                          className="w-100"
                        />
                      </th>
                    </tr>
                    {addrows.length > 0 &&
                      addrows.map((i) => {
                        return (
                          <tr key={i}>
                            <th>
                              <input type="text" placeholder="Item Code" />
                            </th>
                            <th>
                              <input type="text" placeholder="Lot Number" />
                            </th>
                            <th>
                              <input type="number" placeholder="Package Days" />
                            </th>
                            <th>
                              <input
                                type="number"
                                placeholder="Actual Weight"
                              />
                            </th>
                            <th>
                              <input
                                type="number"
                                placeholder="Product Value"
                              />
                            </th>
                            <th>
                              <input
                                type="number"
                                placeholder="Rental Amount"
                              />
                            </th>
                            <th>
                              <input
                                type="number"
                                placeholder="Deposit Amount"
                              />
                            </th>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div className="d-flex justify-content-end">
            {addrows.length > 0 ? (
              <button type="submit" className="CButton" onClick={AddRowTbale}>
                Save Row
              </button>
            ) : (
              <button type="submit" className="CButton" onClick={AddRowTbale}>
                Add Row
              </button>
            )}
          </div>
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
                              <option>Slect Type</option>
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
                              onChange={handleImageChange}
                              style={{ cursor: "pointer" }}
                            />
                          </td>
                          <td>
                            {image && (
                              <img
                                src={image}
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
          <div className="col-12 d-flex">
            <label className="form-label">Terms & Conditions Agree</label>
            <div className="mx-3">
              <input
                className="form-check-input"
                type="radio"
                name="gridRadios"
                defaultChecked
              />
              <label className="form-check-label mx-1">YES</label>
            </div>
            <div>
              <input
                className="form-check-input"
                type="radio"
                name="gridRadios"
                defaultChecked
              />
              <label className="form-check-label mx-1">NO</label>
            </div>
          </div>
          <div className="col-md-12">
            <label className="form-label">RSO Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="RSO Name"
            />
          </div>
          <div className="d-flex justify-content-end mb-4">
            <button type="button" className="CButton mx-2">
              NEXT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBooking;
