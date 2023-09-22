import React, { useState } from "react";

function TestImage() {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);

  const items = [
    { id: "1", name: "Item 1" },
    { id: "2", name: "Item 2" },
    { id: "3", name: "Item 3" },
    { id: "4", name: "Item 4" },
  ];

  const handleImageUpload = (e) => {
    const newImage = e.target.files[0];
    setCurrentImage(newImage);
  };

  const handleImageSubmit = () => {
    if (currentImage) {
      setImages([...images, currentImage]);
      setCurrentImage(null);
    }
  };

  console.log("images==>", images);

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
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  <button onClick={handleImageSubmit}>Upload Image</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TestImage;
