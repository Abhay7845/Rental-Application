import React from "react";
import Navbar from "./Navbar";
import Swal from "sweetalert2";

function TestImage() {
  const CheckBookingDetails = () => {
    Swal.fire({
      title: "Product Returned Successfully",
      text: "Please reach out to the Cashier to complete the payment process",
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
