import React, { useState } from "react";

function TestImage() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  console.log("isOpen==>", isOpen);

  return (
    <div>
      <h1>React Pop-up Screen Example</h1>
      <button onClick={openModal}>Open Modal</button>
      <button onClick={closeModal}>Close Modal</button>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">Hello</div>
        </div>
      )}
    </div>
  );
}

export default TestImage;
