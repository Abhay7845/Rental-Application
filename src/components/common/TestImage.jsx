import React, { useState } from "react";
import Swal from "sweetalert2";

const TestImage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [value, setValue] = useState("");
  const getNextDate = () => {
    const nextDate = new Date(selectedDate);
    nextDate.setDate(selectedDate.getDate() + 20);
    return nextDate;
  };
  const CreationPopUp = () => {
    Swal.fire({
      title: "Success",
      text: "Customer Registered Successfully",
      icon: "success",
      confirmButtonColor: "#008080",
      confirmButtonText: "OK",
    });
  };

  // const handleChange = (e) => {
  //   const inputValue = e.target.value;
  //   // Limit the input to a fixed length, e.g., 4 characters
  //   if (inputValue.length <= 4) {
  //     setValue(inputValue);
  //   }
  // };
  return (
    <div>
      <h1>Date and Day</h1>
      <p>Selected Date: {selectedDate.toLocaleDateString()}</p>
      <button onClick={() => setSelectedDate(new Date())}>Reset Date</button>
      <h2>Next Date</h2>
      <p>Next Date: {getNextDate().toLocaleDateString()}</p>
      <button onClick={CreationPopUp}>Click</button>

      <input
        type="number"
        id="fixedLengthInput"
        value={value}
        onChange={(e) => {
          if (e.target.value.length <= 6) {
            setValue(e.target.value);
          }
        }}
        maxLength="4"
      />
    </div>
  );
};

export default TestImage;
