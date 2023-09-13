import React, { useState } from "react";

const TestImage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const getNextDate = () => {
    const nextDate = new Date(selectedDate);
    nextDate.setDate(selectedDate.getDate() + 20);
    return nextDate;
  };
  return (
    <div>
      <h1>Date and Day</h1>
      <p>Selected Date: {selectedDate.toLocaleDateString()}</p>
      <button onClick={() => setSelectedDate(new Date())}>Reset Date</button>
      <h2>Next Date</h2>
      <p>Next Date: {getNextDate().toLocaleDateString()}</p>
    </div>
  );
};

export default TestImage;
