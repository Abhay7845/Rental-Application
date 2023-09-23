import React from "react";
import Navbar from "./Navbar";
import Swal from "sweetalert2";

function TestImage() {
  const CheckBookingDetails = () => {
    Swal.fire({
      title: "Missing Bank Details",
      text: "Please Upload your bank details!",
      icon: "warning",
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
