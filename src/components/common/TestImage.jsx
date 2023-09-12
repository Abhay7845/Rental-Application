import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const TestImage = () => {
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

  const onClick = () => {
    Swal.fire({
      title: "File Uploaded Successfully",
      icon: "success",
      confirmButtonColor: "green",
      confirmButtonText: "OK",
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
      <button onClick={onClick}>click</button>
    </div>
  );
};

export default TestImage;
