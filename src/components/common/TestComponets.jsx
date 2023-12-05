import React, { useState } from "react";
import * as XLSX from "xlsx";

const TestComponets = () => {
  const [excelData, setExcelData] = useState(null);

  const ChooseExcelFileUplload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { raw: false });
      setExcelData(jsonData);
    };
    reader.readAsBinaryString(file);
  };

  console.log("excelData==>", excelData);
  return (
    <div>
      <input type="file" onChange={ChooseExcelFileUplload} />
      {excelData && (
        <div>
          <h3>Excel Data:</h3>
          <pre>{JSON.stringify(excelData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default TestComponets;
