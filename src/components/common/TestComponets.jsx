import React, { useState } from "react";


const TestComponets = () => {

  // Use state to manage checkbox states for each row
  const [checkboxes, setCheckboxes] = useState({});

  // Handle checkbox change for a specific row
  const handleCheckboxChange = (rowId) => {
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [rowId]: !prevCheckboxes[rowId], // Toggle the checkbox state for the specific row
    }));
  };
  console.log("checkboxes==>", checkboxes)
  // Sample data for the table
  const tableData = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
  ];


  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Checkbox</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                <input
                  type="checkbox"
                  checked={checkboxes[item.id] || false}
                  onChange={() => handleCheckboxChange(item.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TestComponets;
