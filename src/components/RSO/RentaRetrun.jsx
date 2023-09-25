import React, { useState, useEffect } from "react";
import Navbar from "../common/Navbar";
import "../../Style/RentalIssue.css";
import moment from "moment";
import axios from "axios";
import Loader from "../common/Loader";
import {
  renatlReturnPage,
  addressTypeOption,
  ImageHeaders,
} from "../../Data/DataList";
import { HOST_URL } from "../../API/HostURL";
import { UploadImg } from "../../API/HostURL";
import KarigarQAPdf from "../Pdf/KarigarQAPdf";

const RentalReturn = () => {
  const [loading, setLoading] = useState(false);
  const storeCode = localStorage.getItem("storeCode");
  const [sameCustomer, setSameCustomer] = useState(true);
  const [retunTableData, setRetunTableData] = useState([]);
  const [checkedQA, setCheckedQA] = useState(false);
  // SAME CUSTOME UPLOAD /
  const [sameCustFile, setSameCustFile] = useState([]);
  const [sameCutIDFileName, setSameCutIDFileName] = useState("");
  const [sameCustFileUrl, setSameCustFileUrl] = useState("");
  // UPLOAD KARIGAR FILE
  const [karigarQAFile, setKarigarQAFile] = useState([]);
  const [karigarQAFileUrl, setKarigarQAFileUrl] = useState([]);
  const [karigarQAFileName, setKarigarQAFileName] = useState([]);
  // ACTUAL WT RETURN
  const [inputRtnValues, setInputRtnValues] = useState({});
  const [inputDmgValues, setInputDmgValues] = useState({});
  const [inputPhyDmg, setInputPhyDmg] = useState({});

  const getProduct = JSON.parse(localStorage.getItem("selecttedReturnProduct"));
  const GetReturnProduct = !getProduct ? "" : getProduct;
  const { refId, tempBookingRefNo } = GetReturnProduct;
  const currentDate = new Date();
  const bookingDate = moment(currentDate).format("YYYY-MM-DD");

  console.log("sameCutIDFileName==>", sameCutIDFileName);
  console.log("karigarQAFileName==>", karigarQAFileName);
  console.log("inputPhyDmg==>", inputPhyDmg);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${HOST_URL}/fetch/table/common/data/KAN/${refId}/${tempBookingRefNo}`
      )
      .then((res) => res)
      .then((response) => {
        console.log("response==>", response.data);
        if (response.data.code === "1000") {
          setRetunTableData(response.data.value);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("error==>", error);
        setLoading(false);
      });
  }, [storeCode, refId, tempBookingRefNo]);

  const getReturnDate = () => {
    const nextDate = new Date(GetReturnProduct.rentalDate);
    nextDate.setDate(
      nextDate.getDate() + parseInt(GetReturnProduct.packageSelected - 1)
    );
    return nextDate;
  };

  // TOTAL COST OF  CALCULATION
  const TProductValue = retunTableData.map((item) =>
    Math.round(item.productValue)
  );
  const SumOfTProductValue = () => {
    let total = 0;
    for (let data of TProductValue) total = total + data;
    return total;
  };

  const TRentalRateRate = retunTableData.map((item) =>
    parseInt(item.rentalAmount)
  );
  const SumOfTRentalRate = () => {
    let total = 0;
    for (let data of TRentalRateRate) total = total + data;
    return total;
  };

  // UPLOAD CUSTOMER ID
  const UploadSameCustIDProof = () => {
    if (sameCustFile.length === 0) {
      alert("Please Choose File");
    } else {
      setLoading(true);
      const formData = new FormData();
      const fileEx = sameCustFile.name.split(".");
      const fileExtention = `${bookingDate}.${fileEx[1]}`;
      formData.append("ImgName", fileExtention);
      formData.append("files", sameCustFile);
      axios
        .post(`${UploadImg}`, formData, {
          headers: ImageHeaders,
        })
        .then((res) => res)
        .then((response) => {
          console.log("response==>", response.data);
          if (response.data) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setSameCustFileUrl(reader.result);
              setSameCutIDFileName(fileExtention);
            };
            if (sameCustFile) {
              reader.readAsDataURL(sameCustFile);
            }
            alert("Uploaded Successfully");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log("error==>", error);
          setLoading(false);
        });
    }
  };
  // UPLOAD KARIGAR QA REPORT ID
  const karigarAQFile = () => {
    if (karigarQAFile.length === 0) {
      alert("Please Choose File");
    } else {
      setLoading(true);
      const formData = new FormData();
      const fileEx = karigarQAFile.name.split(".");
      const fileExtention = `${bookingDate}.${fileEx[1]}`;
      formData.append("ImgName", fileExtention);
      formData.append("files", karigarQAFile);
      axios
        .post(`${UploadImg}`, formData, {
          headers: ImageHeaders,
        })
        .then((res) => res)
        .then((response) => {
          console.log("response==>", response.data);
          if (response.data) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setKarigarQAFileUrl(reader.result);
              setKarigarQAFileName(fileExtention);
            };
            if (karigarQAFile) {
              reader.readAsDataURL(karigarQAFile);
            }
            alert("Uploaded Successfully");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log("error==>", error);
          setLoading(false);
        });
    }
  };

  // CALCULATION OF ACTUAL WT AT RETURN
  const GetActualWtAtReturl = (e, item) => {
    const { name, value } = e.target;
    console.log("item==>", item);
    setInputRtnValues({
      ...inputRtnValues,
      [name]: value,
    });
  };
  const PdtItemWtRtn = [];
  for (const key in inputRtnValues) {
    if (inputRtnValues.hasOwnProperty(key)) {
      PdtItemWtRtn.push(inputRtnValues[key]);
    }
  }
  // TOTAL ACTUAL WT OF RETURN
  const SumOfActualItemWt = () => {
    let total = 0;
    for (let data of PdtItemWtRtn) total = total + parseFloat(data);
    return total;
  };

  // CALCULATION OF DAMAGE CHAREGES WT AT RETURN
  const GetActualWtOfDamage = (e, item) => {
    const { name, value } = e.target;
    setInputDmgValues({
      ...inputDmgValues,
      [name]: value,
    });
  };
  const PdtItemWtDmg = [];
  for (const key in inputDmgValues) {
    if (inputDmgValues.hasOwnProperty(key)) {
      PdtItemWtDmg.push(inputDmgValues[key]);
    }
  }
  // TOTAL ACTUAL WT OF RETURN
  const SumOfDmgCharge = () => {
    let total = 0;
    for (let data of PdtItemWtDmg) total = total + parseInt(data);
    return total;
  };

  const GetPhysicalDmg = (e, item) => {
    const { name, value } = e.target;
    setInputPhyDmg({
      ...inputPhyDmg,
      [name]: value,
    });
  };

  return (
    <div>
      {loading === true && <Loader />}
      <Navbar />
      <div className="mt-4 mx-2">
        <h6 className="bookingHeading">Booking Details</h6>
        <div className="row g-3 mb-4">
          <div className="col-3">
            <label className="form-label">Booking Ref No</label>
            <h6>{GetReturnProduct.refId}</h6>
          </div>
          <div className="col-2">
            <label className="form-label">Renatl Start Date</label>
            <h6>{moment(GetReturnProduct.rentalDate).format("DD-MM-YYYY")}</h6>
          </div>
          <div className="col-3">
            <label className="form-label">Rental End Date</label>
            <h6>{moment(getReturnDate()).format("DD-MM-YYYY")}</h6>
          </div>
          <div className="col-2">
            <label className="form-label">Customer Name</label>
            <h6>{GetReturnProduct.customerName}</h6>
          </div>
          <div className="col-2">
            <label className="form-label">Phone Number</label>
            <h6>{GetReturnProduct.mobileNo}</h6>
          </div>
          <div className="col-md-12">
            <b>Same Customer Pickup</b>
            <input
              className="form-check-input mx-3 border-dark"
              type="checkbox"
              checked={sameCustomer}
              onChange={() => setSameCustomer(!sameCustomer)}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Customer Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Customer Name"
              disabled={sameCustomer ? true : false}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Customer ID Type</label>
            <select
              className="form-control"
              disabled={sameCustomer ? true : false}
            >
              {addressTypeOption.map((item, i) => {
                return (
                  <option key={i} value={item.value}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Customer ID No.</label>
            <input
              type="text"
              className="form-control"
              placeholder="Customer ID No."
              disabled={sameCustomer ? true : false}
            />
          </div>
          <div className="col-md-4">
            {sameCustFileUrl ? (
              <img src={sameCustFileUrl} alt="" width="180" height="85" />
            ) : (
              <div className="d-flex">
                <div>
                  <label className="form-label">Upload ID</label>
                  <input
                    type="file"
                    id="sameCust"
                    className="form-control"
                    onChange={(e) => setSameCustFile(e.target.files[0])}
                    disabled={sameCustomer ? true : false}
                  />
                </div>
                <div>
                  <label className="form-label">.</label>
                  <button
                    className={sameCustomer ? "CDisabled mx-1" : "CButton mx-1"}
                    onClick={UploadSameCustIDProof}
                    disabled={sameCustomer ? true : false}
                  >
                    Upload
                  </button>
                </div>
              </div>
            )}
          </div>

          {retunTableData.length > 0 && (
            <div className="col-12">
              <h6 className="bookingHeading">Item Details</h6>
              <div className="table-responsive">
                <table className="table table-bordered table-hover border-dark text-center">
                  <thead className="table-dark border-light">
                    <tr>
                      {renatlReturnPage.map((heading, i) => {
                        return <td key={i}>{heading}</td>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {retunTableData.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td>{item.itemCode}</td>
                          <td>{item.lotNo}</td>
                          <td>{item.grossWt}</td>
                          <td>DATA</td>
                          <td>
                            <input
                              type="number"
                              placeholder="Actual Wt at Return"
                              name={i}
                              defaultValue={inputRtnValues[i]}
                              onChange={GetActualWtAtReturl}
                            />
                          </td>
                          <td>
                            {Math.round(item.productValue).toLocaleString(
                              "en-IN"
                            )}
                          </td>
                          <td>
                            {Math.round(item.rentalAmount).toLocaleString(
                              "en-IN"
                            )}
                          </td>
                          <td>NA</td>
                          <td>
                            <input
                              type="number"
                              className="w-100"
                              placeholder="Damage Charges"
                              name={i}
                              defaultValue={inputDmgValues[i]}
                              onChange={GetActualWtOfDamage}
                            />
                          </td>
                          <td>
                            <select
                              className="w-100"
                              name={i}
                              defaultValue={inputPhyDmg[i]}
                              onChange={GetPhysicalDmg}
                            >
                              <option>NO</option>
                              <option>Yes</option>
                            </select>
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <th colSpan="4" className="text-end">
                        TOTAL
                      </th>
                      <th>{SumOfActualItemWt()} g.</th>
                      <th>₹ {SumOfTProductValue().toLocaleString("en-IN")}</th>
                      <th>₹ {SumOfTRentalRate().toLocaleString("en-IN")}</th>
                      <th>₹ N/A</th>
                      <th>₹ {SumOfDmgCharge().toLocaleString("en-IN")}</th>
                      <th colSpan="1" />
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div className="col-12 mb-0">
            <h6 className="bookingHeading d-flex justify-content-between">
              <span className="mt-1">Print Karigar QA Report</span>
              <KarigarQAPdf />
            </h6>
          </div>
          <div className="col-md-5">
            <label className="form-label">
              Upload Signed Karigar QA Report
            </label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => setKarigarQAFile(e.target.files[0])}
            />
          </div>
          <div className="col-md-2">
            <br />
            <button className="CButton mt-2" onClick={karigarAQFile}>
              Upload
            </button>
          </div>
          <div className="col-md-3">
            <img src={karigarQAFileUrl} alt="" width="180" height="85" />
          </div>

          <div className="col-md-12 d-flex">
            <b className="mt-4">Factory QA Required ?</b>
            <input
              type="checkbox"
              className="mx-3 mt-4"
              checked={checkedQA}
              onChange={() => setCheckedQA(!checkedQA)}
            />
          </div>
          <div className="col-md-12">
            <input
              type="text"
              className="form-control"
              placeholder="RSO Name"
              // onChange={(e) => setRSOName(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-end mb-4">
            <button type="button" className="CButton">
              {checkedQA
                ? "Print Acknowledgement & Close"
                : "Raise Closure Request"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalReturn;
