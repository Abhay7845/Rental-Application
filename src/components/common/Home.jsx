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
    </div>
  );
};

export default Home;
