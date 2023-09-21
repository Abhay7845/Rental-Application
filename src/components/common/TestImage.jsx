import React, { useState } from "react";

const TestImage = () => {
  const [inputValues, setInputValues] = useState({});

  const items = [
    { id: "1", name: "Item 1" },
    { id: "2", name: "Item 2" },
    { id: "3", name: "Item 3" },
    { id: "4", name: "Item 4" },
  ];

  const handleInputChange = (e) => {
    console.log("name==>", e.target.name);
    console.log("value==>", e.target.value);
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  console.log("inputValues==>", inputValues);

  return (
    <div>
      <table className="table table-bordered table-hover border-dark text-center">
        <thead>
          <tr>
            <th>Sr</th>
            <th>First</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => {
            return (
              <tr key={i}>
                <td>{i}</td>
                <td>
                  <input
                    type="text"
                    name={item.id}
                    defaultValue={inputValues[item.id]}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TestImage;
