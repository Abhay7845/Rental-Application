import React, { useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import AdminSideBar from "../common/AdminSideBar";
import { HOST_URL } from "../../API/HostURL";
import axios from "axios";
import * as XLSX from "xlsx";
import Loader from "../common/Loader";
import AdminToggelSideBar from "../common/AdminToggelSideBar";
import Swal from "sweetalert2";
import { DataGrid } from "@mui/x-data-grid";
import TableDataDownload from "./TableDataDownload";
import moment from "moment";
import { toast } from 'react-toastify';

const UpdateMasterPrice = () => {
  const [loading, setLoading] = useState(false);
  const [uploadMasterFile, setUploadMasterFile] = useState("");
  const [storeCodeValue, setStoreCodeValue] = useState("");
  const [rows, setRows] = useState([]);
  const [cols, setCols] = useState([]);
  const [excelData, setExcelData] = useState([]);
  const [showErrMsg, setShowErrMsg] = useState("");
  const ItemPriceId = excelData.map((id) => id.itemPriceid);

  const ShowAlertDeactivate = (count) => {
    Swal.fire({
      title: "Price Updation Successful",
      text: `For ${count} Products`,
      icon: "success",
      confirmButtonColor: "#008080",
      confirmButtonText: "OK",
    });
  };

  const GetItemPriceMaster = (storeCodeValue) => {
    if (storeCodeValue) {
      setLoading(true);
      axios
        .get(`${HOST_URL}/Admin/view/item/price/master/${storeCodeValue}`)
        .then((res) => res)
        .then((response) => {
          if (response.data.code === "1000") {
            setRows(response.data.value);
            setCols(response.data.cols);
          } else if (response.data.code === "1001") {
            toast.warn("Data not available for this Store Code", { theme: "colored", position: "bottom-right", autoClose: 2000 });
          }
          setLoading(false);
        })
        .catch((error) => setLoading(false));
    } else {
      toast.error("Please Enter Store Code", { theme: "colored", position: "bottom-right", autoClose: 3000 });
    }
  };

  const handleKeyPress = (event) => {
    if (event.key.toUpperCase() === 'ENTER') {
      if (!storeCodeValue) {
        toast.error("Please Enter Store Code", { theme: "colored", position: "bottom-right", autoClose: 3000 });
      } else {
        GetItemPriceMaster(storeCodeValue);
      }
    }
  }

  const ChooseExcelFileUplload = (event) => {
    const file = event.target.files[0];
    setUploadMasterFile(file);
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

  const UploadMasterFile = (uploadMasterFile, count) => {
    let formData = new FormData();
    formData.append("masterFile", uploadMasterFile);
    axios({
      method: "post",
      url: `${HOST_URL}/Admin/rate/master/update/rentalPrice`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          ShowAlertDeactivate(count);
          setShowErrMsg("");
          setExcelData([]);
          document.getElementById("ecxelFile").value = "";
        }
        if (response.data.code === "1001") {
          setShowErrMsg(response.data.value);
        }
        if (response.data.code === "1002") {
          setShowErrMsg(response.data.value);
        }
        if (response.data.code === "1003") {
          setShowErrMsg(response.data.value);
        }
        if (response.data.code === "1004") {
          setShowErrMsg(response.data.value);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  const DeactivateItemsData = () => {
    if (ItemPriceId[0] === undefined) {
      toast.warn(
        `"Item PriceId Column" InCorrect/Not Found. Column Name Should be "itemPriceid"`, { theme: "colored", autoClose: 2000 }
      );
    } else {
      setLoading(true);
      const ActivatePayload = {
        storeCode: storeCodeValue,
        itemPriceId: ItemPriceId,
      };
      axios
        .post(`${HOST_URL}/update/item/price/master/status`, ActivatePayload)
        .then((res) => res)
        .then((response) => {
          if (response.data.code === "1000") {
            UploadMasterFile(uploadMasterFile, response.data.value.count);
            setStoreCodeValue("");
            setRows([]);
          }
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  };
  const columns = cols.map((element) => {
    let fieldRes;
    if (element === "createdDate") {
      fieldRes = {
        field: "createdDate",
        headerName: "createdDate",
        renderCell: (params) => {
          return (
            <span>{moment(params.row.createdDate).format("DD-MM-YYYY")}</span>
          );
        },
      };
    } else if (element === "date") {
      fieldRes = {
        field: "date",
        headerName: "date",
        renderCell: (params) => {
          return <span>{moment(params.row.date).format("DD-MM-YYYY")}</span>;
        },
      };
    } else if (element === "updatedDate") {
      fieldRes = {
        field: "updatedDate",
        headerName: "updatedDate",
        renderCell: (params) => {
          return (
            <span>{moment(params.row.updatedDate).format("DD-MM-YYYY")}</span>
          );
        },
      };
    } else {
      fieldRes = {
        field: element,
        flex: 1,
      };
    }
    return fieldRes;
  });
  return (
    <div>
      {loading === true && <Loader />}
      <Navbar />
      <div className="DropdownForAdmin">
        <AdminToggelSideBar />
      </div>
      <AdminSideBar />
      <div className="main">
        <h5 className="text-center my-4">UPDATE ITEM PRICE MASTER</h5>
        <div className="mx-1">
          <label className="form-label">Master File</label>
          <input
            type="file"
            id="ecxelFile"
            className="DateSelect"
            onChange={ChooseExcelFileUplload}
          />
          <p className="text-danger">{showErrMsg}</p>
          <div className="d-flex justify-content-end mt-3">
            <button
              className="CButton mx-2"
              data-bs-toggle="modal"
              data-bs-target="#ViewPriceMaster"
              onClick={() => setRows([])}
            >
              View
            </button>
            <button
              className={ItemPriceId.length > 0 ? "CButton" : "CDisabled"}
              disabled={ItemPriceId.length > 0 ? false : true}
              onClick={DeactivateItemsData}
            >
              Upload
            </button>
          </div>
        </div>
        {/*VIEW PRICE PASTER MODAL*/}
        <div
          className="modal fade"
          id="ViewPriceMaster"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content">
              <div className="d-flex justify-content-end mx-3 mt-2">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setCols([])}
                />
              </div>
              <div className="modal-body">
                {loading === true && <Loader />}
                <div className="row">
                  <div className="col-12 d-flex">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Store Code"
                      value={storeCodeValue}
                      onChange={(e) => {
                        const value = e.target.value.toUpperCase();
                        setStoreCodeValue(value);
                      }}
                      onKeyDown={handleKeyPress}
                    />
                    <button className="CButton mx-1" onClick={() => GetItemPriceMaster(storeCodeValue)}>
                      Next
                    </button>
                  </div>
                </div>
                {cols.length > 0 && (
                  <div className="mx-2 my-4">
                    <DataGrid
                      columns={columns}
                      rows={rows}
                      autoHeight={true}
                      components={{
                        Toolbar: () => TableDataDownload("ItemPriceMaster"),
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateMasterPrice;
