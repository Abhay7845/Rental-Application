import React from "react";
import Navbar from "./Navbar";
import "../../Style/Home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="homeBanner">
        <h3>Rental Apllication and Help</h3>
        <h3>To Book</h3>
        <button className="bookBtn">BOOK NOW</button>
      </div>
    </div>
  );
};

export default Home;
