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
      <div className="row mx-0">
        <div className="col HomeTextStyle">
          <h5 className="text-center textH4Style">
            Find The Perfect Freelance Service <br />
            For Your Business
          </h5>
          <div className="col searchField my-3">
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
      </div>
    </div>
  );
};

export default Home;
