import React from "react";
import Navbar from "./Navbar";
import Swal from "sweetalert2";

function TestImage() {
  const CheckBookingDetails = () => {
    Swal.fire({
      title: "Request Raised Succesfully",
      text: "Please reach out to the Cashier To Complete The Issue Process",
      icon: "success",
      confirmButtonColor: "#008080",
      confirmButtonText: "OK",
    });
  };
  return (
    <div>
      <Navbar />
      <button onClick={CheckBookingDetails}>Click</button>
    </div>
  );
}

export default TestImage;
