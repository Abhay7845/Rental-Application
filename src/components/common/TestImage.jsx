import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import PaymentTnCPdf from "../Pdf/PaymentTnCPdf";

const TestImage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => res)
      .then((response) => setUserData(response.data))
      .catch((error) => {
        console.log("error==>", error);
      });
  }, []);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((item) => item !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  console.log("selectedItems==>", selectedItems);
  // console.log("userData==>", userData);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [daysDifference, setDaysDifference] = useState(null);

  const calculateDaysDifference = () => {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    // Calculate the time difference in milliseconds
    const timeDifference = endDateObj - startDateObj;

    // Convert the time difference to days
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    setDaysDifference(days);
  };

  const Clickto = () => {
    Swal.fire({
      title: "Customer Not Registered",
      text: "Do You Want Register",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#008080",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/booking");
      }
    });
  };
  return (
    <div className="mx-3 mt-5">
      <table className="table table-bordered inner-table border-dark">
        <thead>
          <tr>
            <th>Select</th>
            <th>NAME</th>
            <th>PHONE</th>
            <th>EMAIL</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((data, i) => {
            return (
              <tr key={i}>
                <th>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(data)}
                    onChange={() => handleCheckboxChange(data)}
                  />
                </th>
                <th>{data.name}</th>
                <th>{data.phone}</th>
                <th>{data.email}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <h1>Calculate Days Between Two Dates</h1>
        <div>
          <label>Start Date: </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label>End Date: </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button onClick={calculateDaysDifference}>Calculate</button>
        {daysDifference !== null && (
          <div>
            <p>Number of days between the two dates: {daysDifference} days</p>
          </div>
        )}
      </div>
      <button onClick={Clickto}>click</button>
      <PaymentTnCPdf />
    </div>
  );
};

export default TestImage;
