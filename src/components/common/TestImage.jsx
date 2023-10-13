import React, { useState } from "react";

const TestImage = () => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleCheckboxChange = (event, id) => {
    if (event.target.checked) {
      // Checkbox is checked, add the row ID to the selectedRows array
      setSelectedRows([...selectedRows, id]);
    } else {
      // Checkbox is unchecked, remove the row ID from selectedRows array
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    }
  };

  const tableData = [
    { id: 1, name: "Row 1" },
    { id: 2, name: "Row 2" },
    { id: 3, name: "Row 3" },
    // Add more rows as needed
  ];
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.id}>
              <td>
                <input
                  type="checkbox"
                  onChange={(event) => handleCheckboxChange(event, row.id)}
                />
              </td>
              <td>{row.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TestImage;
