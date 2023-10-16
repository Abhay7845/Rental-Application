import React from "react";
import Navbar from "../common/Navbar";
import AdminSideBar from "../common/AdminSideBar";
import AdminToggelSideBar from "../common/AdminToggelSideBar";

const SummaryReports = () => {
  return (
    <div>
      <Navbar />
      <div className="DropdownForAdmin">
        <AdminToggelSideBar />
      </div>
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
                <tr>
                  <td>IKFDSVAKFVKNRESC</td>
                  <td>IKFDSVAKFVKNRESC</td>
                  <td>IKFDSVAKFVKNRESC</td>
                  <td>IKFDSVAKFVKNRESC</td>
                  <td>IKFDSVAKFVKNRESC</td>
                  <td>IKFDSVAKFVKNRESC</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryReports;
