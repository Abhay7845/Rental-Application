import moment from "moment";
import React from "react";

const TestImage = () => {
  const now = new Date();

  // Get the hours and minutes from the Date object
  const hours = now.getHours();
  const minutes = now.getMinutes();

  // Format the hours and minutes as a string (e.g., "HH:MM")
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;

  return (
    <div>
      <p>Current Time: {formattedTime}</p>
      <b>{moment().calendar().substring(9, 17)}</b>
    </div>
  );
};

export default TestImage;
