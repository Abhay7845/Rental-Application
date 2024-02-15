import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import JSZip from 'jszip';
import braseLet from '../../Asset/Img/Brasslet.png'


const TestComponets = () => {
  const imgObj = [
    { id: "1", imgUrl: braseLet },
    { id: "2", imgUrl: braseLet },
    { id: "3", imgUrl: braseLet },
  ]
  // Function to download the zip folder
  const downloadZipFolder = async () => {
    const promises = imgObj.map(async (urls) => {
      const res = await fetch(urls.imgUrl);
      const blob = await res.blob();
      return blob;
    });
    const result = await Promise.all(promises);
    const zip = new JSZip();
    result.forEach((blob, index) => {
      zip.file(`image_${index}.jpg`, blob);
    });

    // Generate the zip folder
    zip.generateAsync({ type: 'blob' }).then(res => res).then(content => {
      let link = document.createElement('a');
      link.download = 'table_images.zip';
      const url = URL.createObjectURL(content);
      link.href = url;
      document.body.appendChild(link);
      link.click();
    });
  };

  return (
    <div className="mx-2">
      <br />
      <br />
      <button onClick={downloadZipFolder}>Click</button>
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
                <Td><img src={item.imgUrl} alt="Image_1" height="100" width="100" /></Td>
              </Tr>)
          })}
        </Tbody>
      </Table>
    </div>
  );
};

export default TestComponets;
