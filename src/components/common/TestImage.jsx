import React, { useEffect, useState } from "react";
import axios from "axios";

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

  const UserDATA = [
    {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
    },
    {
      id: 2,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
    },
  ];
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (itemId) => {
    console.log("itemId==>", itemId);
    if (selectedItems.includes(itemId)) {
      const data = selectedItems.filter((item) => item !== itemId);
      console.log("data=>", data);
      setSelectedItems(data);
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  console.log("selectedItems==>", selectedItems);
  console.log("userData==>", userData);
  console.log("UserDATA==>", UserDATA);

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
    </div>
  );
};

export default TestImage;
