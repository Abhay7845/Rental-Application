import React from "react";
import Navbar from "../common/Navbar";
import { DataList } from "../../Data/DataList";
import AdminSideBar from "../common/AdminSideBar";

const SummaryReports = () => {
  return (
    <div>
      <Navbar />
      <AdminSideBar />
      <div className="main">
        <div className="row mx-0 mt-3">
          <h5 className="text-center">SUMMARY REPORTS</h5>
          <div className="col-12 table-responsive mx-0">
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
    </div>
  );
};

export default SummaryReports;
