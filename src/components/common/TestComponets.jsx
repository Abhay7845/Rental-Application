import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';



const TestComponets = () => {
  const downloadImage = (imageUrl) => {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'image.png';

    // Simulate a click event to trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const imgObj = [
    { id: "1", imgUrl: "https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: "2", imgUrl: "https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
  ]
  return (
    <div className="mx-2">
      <br />
      <br />
      {/* <button onClick={downloadImage}>Click</button> */}
      <Table className="table table-bordered border-dark">
        <Thead>
          <Tr>
            <Th>Image</Th>
            <Th>Image Name</Th>
          </Tr>
        </Thead>
        <Tbody>
          {imgObj.map((item, i) => {
            return (
              <Tr key={i}>
                <Td>Tablescon</Td>
                <Td><img src={item.imgUrl} onClick={() => downloadImage(item.imgUrl)} alt="Image_1" height="100" width="100" /></Td>
              </Tr>)
          })}
        </Tbody>
      </Table>
    </div>
  );
};

export default TestComponets;
