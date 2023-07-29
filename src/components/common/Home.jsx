import React, { useState } from "react";
import Navbar from "./Navbar";
import "../../Style/Home.css";

const Home = () => {
  const [phoneRefrence, setPhoneRefrence] = useState("");
  const GetDetails = () => {
    console.log("phoneRefrence==>", phoneRefrence);
  };
  return (
    <div>
      <Navbar />
      <div className="HomeTextStyle">
        <h3 className="heading my-4">WELCOME</h3>
        <h5 className="heading">
          Find The Perfect Freelance Service <br />
          For Your Business
        </h5>
        <div className="searchField">
          <input
            type="text"
            className="searchStyle"
            placeholder="Search by Phone or Refrence No."
            onChange={(e) => setPhoneRefrence(e.target.value)}
          />
          <span className="searchButton" onClick={GetDetails}>
            Search
          </span>
        </div>
      </div>
      <div className="mx-2 mt-5">
        <h4 className="text-center mb-3">Table Details</h4>
        <table class="table table-bordered table-hover border-dark">
          <thead className="table-dark border-light">
            <tr>
              <th>#</th>
              <th>First</th>
              <th>Last</th>
              <th>Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
