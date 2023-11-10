import React, { useState } from "react";
import Navbar from "../common/Navbar";
import AdminSideBar from "../common/AdminSideBar";
import { HOST_URL } from "../../API/HostURL";
import axios from "axios";
import Loader from "../common/Loader";
import AdminToggelSideBar from "../common/AdminToggelSideBar";
import Swal from "sweetalert2";
import { DataGrid } from "@mui/x-data-grid";
import TableDataDownload from "./TableDataDownload";

const UpdateMasterPrice = () => {
  const [loading, setLoading] = useState(false);
  const [uploadMasterFile, setUploadMasterFile] = useState("");
  const [storeCodeValue, setStoreCodeValue] = useState("");
  const [rows, setRows] = useState([]);
  const [cols, setCols] = useState([]);
  const [showErrMsg, setShowErrMsg] = useState("");
  const [updBtn, setUpdBtn] = useState(false);
  const [selectRows, setSelectRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const ItemPriceId = rows.map((id) => id.itemPriceId);

  const GetItemPriceMaster = () => {
    if (storeCodeValue) {
      setLoading(true);
      axios
        .get(`${HOST_URL}/Admin/view/item/price/master/${storeCodeValue}`)
        .then((res) => res)
        .then((response) => {
          if (response.data.code === "1000") {
            setRows(response.data.value);
            setCols(response.data.cols);
          }
          if (response.data.code === "1001") {
            alert("Data not available for this Store Code");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log("error==>", error);
          setLoading(false);
        });
    } else {
      alert("Please Enter Store Code");
    }
  };

  const DeactivateItemsData = () => {
    setLoading(true);
    const ActivatePayload = {
      storeCode: storeCodeValue,
      itemPriceId: selectRows,
    };
    axios
      .post(`${HOST_URL}/update/item/price/master/status`, ActivatePayload)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setUpdBtn(true);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  const UploadMasterFile = () => {
    if (!uploadMasterFile) {
      alert("Please Choose File");
    } else {
      setLoading(true);
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
            setShowErrMsg("");
            setUpdBtn(false);
            Swal.fire({
              title: "Success",
              text: response.data.value,
              icon: "success",
              confirmButtonColor: "#008080",
              confirmButtonText: "OK",
            });
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
          console.log("error==>", error);
          setLoading(false);
        });
    }
  };

  const OnSelectRow = (rowId) => {
    const isSelected = selectRows.includes(rowId);
    setSelectRows((prevId) =>
      isSelected ? prevId.filter((id) => id !== rowId) : [...prevId, rowId]
    );
  };

  const OnSelectAll = () => {
    if (selectAll) {
      setSelectRows([]);
    } else {
      setSelectRows(ItemPriceId);
    }
    setSelectAll((prevSelectAll) => !prevSelectAll);
  };

  const columns = cols.map((element) => {
    let fieldRes;
    if (element === "value") {
      fieldRes = {
        field: "Select And Deactivate",
        headerName: "Select And Deactivate",
        renderCell: (params) => {
          return (
            <input
              className="form-check-input border-dark"
              type="checkbox"
              checked={selectRows.includes(params.row.itemPriceId)}
              onChange={() => OnSelectRow(params.row.itemPriceId)}
            />
          );
        },
      };
    } else {
      fieldRes = {
        field: element,
        sortable: false,
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
            className="DateSelect"
            onChange={(e) => setUploadMasterFile(e.target.files[0])}
          />
          <p className="text-danger">{showErrMsg}</p>
          <div className="d-flex justify-content-end mt-3">
            <button
              className="CButton mx-2"
              data-bs-toggle="modal"
              data-bs-target="#ViewPriceMaster"
            >
              View
            </button>
            <button
              className={updBtn ? "CButton" : "CDisabled"}
              disabled={updBtn ? false : true}
              onClick={UploadMasterFile}
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
                />
              </div>
              <div className="modal-body">
                {loading === true && <Loader />}
                <div className="row">
                  <div className="col-11">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Store Code"
                      value={storeCodeValue}
                      onChange={(e) => {
                        const value = e.target.value.toUpperCase();
                        setStoreCodeValue(value);
                      }}
                    />
                  </div>
                  <div className="col-1 d-flex justify-content-end">
                    <button className="CButton" onClick={GetItemPriceMaster}>
                      Get_Item
                    </button>
                  </div>
                </div>
                {rows.length > 0 && (
                  <div className="mx-2 my-4">
                    <div className="d-flex justify-content-between mb-2">
                      <div>
                        <b>Select All</b>
                        <input
                          type="checkbox"
                          className="form-check-input border-dark mx-2"
                          checked={selectAll}
                          onChange={OnSelectAll}
                        />
                      </div>
                      <button
                        className={
                          selectRows.length > 0
                            ? "CButton mx-2"
                            : "CDisabled mx-2"
                        }
                        disabled={selectRows.length > 0 ? false : true}
                        onClick={DeactivateItemsData}
                      >
                        Deactivate
                      </button>
                    </div>
                    <DataGrid
                      columns={columns}
                      rows={rows}
                      autoHeight={true}
                      pageSize={[10, 15, 20]}
                      components={{
                        Toolbar: TableDataDownload,
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
