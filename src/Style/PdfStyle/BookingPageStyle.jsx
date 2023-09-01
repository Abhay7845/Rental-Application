import React from "react";

const BookingPageStyle = () => {
  return (
    <style>
      {`
          @media screen{
            .hide-on-screen{
              display:none;
            }
          }
          @media print {
            .print-button {
              display: none;
            }
            @page {
              size: B5 landscape;
              margin: 0; /* Reset margins for the page */
            }
            .inner-table th,
            .inner-table td {
              padding: 5px;
              font-size: 10px; 
            }
            .hide-scrollbar{
              overflow-y:hidden;
            }
            .inner-table{
              width:100% ; 
            }
          }
          `}
    </style>
  );
};

export default BookingPageStyle;
