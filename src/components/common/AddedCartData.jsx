import React from "react";
import Navbar from "./Navbar";
import { DataList } from "../../Data/DataList";

const AddedCartData = () => {
  return (
    <div>
      <Navbar />
      <h5 className="mt-4 text-center">ADDED PRODUCTS DETAILS</h5>
      <div className="row mx-0">
        <div className="col-12 table-responsive">
          <table className="table table-bordered table-hover border-dark">
            <thead className="table-dark border-light">
              <tr>
                <th>Item Code</th>
                <th>Image</th>
                <th>Std Wt</th>
                <th>Std UCP</th>
                <th>Std_Rental_Value</th>
                <th>Std_Deposit_Value</th>
              </tr>
            </thead>
            <tbody>
              {DataList.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>IKFDSVAKFVKNRESC</td>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>{item.website}</td>
                    <td>{item.address.city}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddedCartData;
