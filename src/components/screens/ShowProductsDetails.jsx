import React from "react";
import Navbar from "../common/Navbar";
import { DataList } from "../../Data/DataList";

const ShowProductsDetails = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-4 mx-2">
        <div className="table-responsive">
          <table className="table table-bordered table-hover border-dark">
            <thead className="table-dark border-light">
              <tr>
                <th>Item Code</th>
                <th>Image</th>
                <th>Std Wt</th>
                <th>Std UCP</th>
                <th>Std_Rental_Value</th>
                <th>Std_Deposit_Value</th>
                <th>Rental_Date</th>
                <th>Package_Days</th>
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

export default ShowProductsDetails;
