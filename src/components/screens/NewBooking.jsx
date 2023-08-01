import React, { useState } from "react";
import Navbar from "../common/Navbar";
import { DataList } from "../../Data/DataList";

const NewBooking = () => {
  const [image, setImage] = useState(null);
  const [id, setId] = useState(0);

  // ITEMS DETAILS ADD ROWS
  const [itemRowCont, setItemRowCont] = useState(0);
  const [addItemDetails, setAddItemDetails] = useState([]);
  // DEPOSITE ADD ROWS
  const [depositRowCont, setDepositRowCont] = useState(0);
  const [addDipositRows, setAddDipositRows] = useState([]);

  // ITEMS DETAILS SET INPUT VALUE
  const [itemDetailsItemCode, setItemDetailsItemCode] = useState("");
  const [itemDetailsLotNumber, setItemDetailsLotNumber] = useState("");
  const [itemDetailsRentalDate, setItemDetailsRentalDate] = useState("");
  const [itemDetailsPackageDays, setItemDetailsPackageDays] = useState("");
  const [itemDetailsActualWeight, setItemDetailsActualWeight] = useState("");
  const [itemDetailsProductValue, setItemDetailsProductValue] = useState("");
  const [itemDetailsRentalAmount, setItemDetailsRentalAmount] = useState("");
  const [itemDetailsDepositAmount, setItemDetailsDepositAmount] = useState("");

  // ITEM DETAILS TABLE
  const [itemDetailsTableRow, setItemDetailsTableRow] = useState([]);

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

  // ITEMS DETAILS ADD REOWS
  const AddRowTableItemDetails = () => {
    setItemRowCont(itemRowCont + 1);
    setAddItemDetails([...addItemDetails, itemRowCont + 1]);
  };
  // DEPOSITE ADD ROWS
  const AddRowTableDepositAmount = () => {
    setDepositRowCont(depositRowCont + 1);
    setAddDipositRows([...addDipositRows, itemRowCont + 1]);
  };

  // SAVE ITEM DETAILS
  const SaveItemsDetails = () => {
    setId(id + 1);
    const ItemDetailTable = {
      id: id,
      itemCode: itemDetailsItemCode,
      lotNumber: itemDetailsLotNumber,
      rentalDate: itemDetailsRentalDate,
      packageDays: itemDetailsPackageDays,
      actualWetight: itemDetailsActualWeight,
      productValue: itemDetailsProductValue,
      rentalAmount: itemDetailsRentalAmount,
      depositAmont: itemDetailsDepositAmount,
    };
    setItemDetailsTableRow([...itemDetailsTableRow, ItemDetailTable]);
    setAddItemDetails([]);
  };

  return (
    <div>
      <Navbar />
      <div className="mt-4 mx-2">
        <div className="col-12">
          <h6 className="bookingHeading mx-2">Booking Details</h6>
        </div>
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
          <div className="col-12">
            <h6 className="bookingHeading">Customer Details</h6>
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
          <div className="col-12">
            <h6 className="bookingHeading">Customer Address</h6>
          </div>
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
          <div className="col-12">
            <h6 className="bookingHeading">Customer Address</h6>
          </div>
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
                  {itemDetailsTableRow.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td>{item.itemCode}</td>
                        <td>{item.lotNumber}</td>
                        <td>{item.rentalDate}</td>
                        <td>{item.packageDays}</td>
                        <td>{item.productValue}</td>
                        <td>{item.rentalAmount}</td>
                        <td>{item.depositAmont}</td>
                        <td>{item.actualWetight}</td>
                      </tr>
                    );
                  })}
                  {itemDetailsTableRow.length > 0 && (
                    <tr>
                      <th colSpan="4" className="text-end">
                        TOTAL
                      </th>
                      <th>234</th>
                      <th>124</th>
                      <th>678</th>
                      <th>
                        <input type="number" placeholder="Weight" />
                      </th>
                    </tr>
                  )}
                  {addItemDetails.length > 0 && (
                    <tr>
                      <th>
                        <input
                          type="text"
                          placeholder="Item Code"
                          onChange={(e) =>
                            setItemDetailsItemCode(e.target.value)
                          }
                        />
                      </th>
                      <th>
                        <input
                          type="text"
                          placeholder="Lot Number"
                          onChange={(e) =>
                            setItemDetailsLotNumber(e.target.value)
                          }
                        />
                      </th>
                      <th>
                        <input
                          type="date"
                          onChange={(e) =>
                            setItemDetailsRentalDate(e.target.value)
                          }
                        />
                      </th>
                      <th>
                        <input
                          type="number"
                          placeholder="Package Days"
                          onChange={(e) =>
                            setItemDetailsPackageDays(e.target.value)
                          }
                        />
                      </th>
                      <th>
                        <input
                          type="number"
                          placeholder="Product Value"
                          onChange={(e) =>
                            setItemDetailsProductValue(e.target.value)
                          }
                        />
                      </th>
                      <th>
                        <input
                          type="number"
                          placeholder="Rental Amount"
                          onChange={(e) =>
                            setItemDetailsRentalAmount(e.target.value)
                          }
                        />
                      </th>
                      <th>
                        <input
                          type="number"
                          placeholder="Deposit Amount"
                          onChange={(e) =>
                            setItemDetailsDepositAmount(e.target.value)
                          }
                        />
                      </th>
                      <th>
                        <input
                          type="number"
                          placeholder="Actual Weight"
                          onChange={(e) =>
                            setItemDetailsActualWeight(e.target.value)
                          }
                        />
                      </th>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            {addItemDetails.length > 0 ? (
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
                onClick={AddRowTableItemDetails}
              >
                Add Row
              </button>
            )}
          </div>
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
                {DataList.length > 0 && (
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
                    {addDipositRows.length > 0 &&
                      addDipositRows.map((i) => {
                        return (
                          <tr key={i}>
                            <th>
                              <select className="w-100">
                                <option>Select Type</option>
                                <option>Creadit Note</option>
                                <option>Creadit Card</option>
                              </select>
                            </th>
                            <th>
                              <input type="text" placeholder="Lot Number" />
                            </th>
                            <th>
                              <input type="type" placeholder="Refrece Number" />
                            </th>
                            <th>
                              <input type="number" placeholder="Amount" />
                            </th>
                            <th>
                              <img
                                src="https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"
                                alt="view_Product"
                                width="100%"
                                height="30px"
                              />
                            </th>
                          </tr>
                        );
                      })}
                  </tbody>
                )}
              </table>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="CButton"
              onClick={AddRowTableDepositAmount}
            >
              Add Row
            </button>
          </div>
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
