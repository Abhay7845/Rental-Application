import React, { useState } from "react";
import jsPDF from "jspdf";
import axios from "axios";

function TestImage() {
  const [dataTable, setDataTable] = useState([]);

  const PrintPdf = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => res)
      .then((response) => setDataTable(response.data))
      .catch((error) => error);

    // Initialize jsPDF instance
    const pdf = new jsPDF();

    // Set initial y-position for the first page
    let yPos = 10;

    // Loop through each row in the data table
    dataTable.forEach((row, index) => {
      // Check if remaining space is not enough to fit the row
      if (yPos >= 290) {
        // Add a new page for the next row
        pdf.addPage();
        // Reset y-position back to top
        yPos = 10;
      }

      // Customize the content for each page/row
      pdf.setFontSize(12);
      pdf.text(10, yPos, `Row ${index + 1}`);

      // Add other data from the row to the PDF, if needed
      // Example: pdf.text(50, yPos, row.column1);
      // Increment y-position for the next row
      yPos += 10;
    });

    // Save the PDF
    pdf.save("data-table.pdf");
  };

  return (
    <div>
      <button onClick={PrintPdf}>print</button>
    </div>
  );
}

export default TestImage;
