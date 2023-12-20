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
  IMAGE_URL,
} from "../../Data/DataList";
import { HOST_URL } from "../../API/HostURL";
import { UploadImg, FetchImg } from "../../API/HostURL";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import KarigarQAReturnPdf from "../Pdf/KarigarQAReturnPdf";
import AcknowledgementRetunr from "../Pdf/AcknowledgementRetunr";

const RentalReturn = () => {
  const [loading, setLoading] = useState(false);
  const storeCode = localStorage.getItem("storeCode");
  const [sameCustomer, setSameCustomer] = useState(true);
  const [returnTableData, setReturnTableData] = useState([]);
  const [checkedQA, setCheckedQA] = useState(false);
  const [totalPaidAmount, setTotalPaidAmount] = useState({});
  const [storeDetails, setStoreDetails] = useState({});
  const [existedUserData, setExistedUserData] = useState({});
  const [alertWt, setAlertWt] = useState("");
  const [discountAmtOnRental, setDiscountAmtOnRental] = useState(0)
  const [discountAlert, setDiscountAlert] = useState("");
  const [successAlrt, setSuccessAlrt] = useState(
    "Product Returned Successfully"
  );
  const [smlAlert, setSmlAlert] = useState(
    "Please reach out to the Cashier to complete the payment process"
  );

  // SAME CUSTOME UPLOAD & DETAILS
  const [sameCustName, setSameCustName] = useState("");
  const [sameCustIDType, setSameCustIDType] = useState("");
  const [sameCustIDNo, setSameCustIDNo] = useState("");
  const [numberDays, setNumberDays] = useState("");
  const [sameCustFile, setSameCustFile] = useState([]);
  const [sameCutIDFileName, setSameCutIDFileName] = useState("");
  const [sameCustFileUrl, setSameCustFileUrl] = useState("");
  // UPLOAD KARIGAR FILE
  const [karigarQAFile, setKarigarQAFile] = useState([]);
  const [karigarQAFileUrl, setKarigarQAFileUrl] = useState("");
  // ACTUAL WT RETURN
  const [inputRtnValues, setInputRtnValues] = useState([]);
  const [inputDmgValues, setInputDmgValues] = useState({});
  const [inputPhyDmg, setInputPhyDmg] = useState({});
  const [RSOName, setRSOName] = useState("");

  const getProduct = JSON.parse(localStorage.getItem("selecttedReturnProduct"));
  const GetReturnProduct = !getProduct ? "" : getProduct;
  const { refId, tempBookingRefNo } = GetReturnProduct;
  const currentDate = moment(new Date()).format("DD-MM-YYYY");
  const RandomDigit = Math.floor(100000 + Math.random() * 900000);
  const navigate = useNavigate();


  const getReturnDate = () => {
    const nextDate = new Date(GetReturnProduct.rentalDate);
    nextDate.setDate(
      nextDate.getDate() + parseInt(GetReturnProduct.packageSelected - 1)
    );
    return nextDate;
  };
  useEffect(() => {
    if (GetReturnProduct.mobileNo) {
      axios
        .get(
          `${HOST_URL}/rental/customer/details/mobileNo/${GetReturnProduct.mobileNo}`
        )
        .then((res) => res)
        .then((response) => {
          if (response.data.code === "1000") {
            setExistedUserData(response.data.value);
          }
        })
        .then((error) => {
          setLoading(false);
        });
    }
  }, [GetReturnProduct.mobileNo]);

  useEffect(() => {
    axios
      .get(`${HOST_URL}/store/details/for/pdf/${storeCode}`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setStoreDetails(response.data.value);
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [storeCode]);

  const timeDifference = new Date() - getReturnDate();
  const penaltyDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  const refactoreDataTable = returnTableData.map((data) => {
    return {
      id: data.id,
      actualWtReturn: data.actualWtReturn,
      bookingRefId: data.bookingRefId,
      cfa: data.cfa,
      custId: data.custId,
      customerName: data.customerName,
      deliveredWt: data.deliveredWt,
      description: data.description,
      grossWt: data.grossWt,
      itemCode: data.itemCode,
      itemPriceId: data.itemPriceId,
      lotNo: data.lotNo,
      mobileNo: data.mobileNo,
      netWt: data.netWt,
      noOfPc: data.noOfPc,
      packageDays: data.packageDays,
      pdtId: data.pdtId,
      productHUID: data.productHUID,
      rateId: data.rateId,
      refId: data.refId,
      depositAmount: data.depositAmount,
      productValue: data.productValue,
      rentStartDate: data.rentStartDate,
      rentalAmount: data.rentalAmount,
      peneltyCharge:
        penaltyDays <= 0
          ? 0
          : (parseInt(data.productValue) * penaltyDays) / 100,
      tempBookingRefNo: data.tempBookingRefNo,
    };
  });
  // TOTAL PAID BOOKING AMONT
  useEffect(() => {
    axios
      .get(`${HOST_URL}/fetch/sumOf/amounts/common/${storeCode}/${refId}`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setTotalPaidAmount(response.data.value);
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [storeCode, refId]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${HOST_URL}/fetch/table/common/data/${storeCode}/${refId}/${tempBookingRefNo}`
      )
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setReturnTableData(response.data.value);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [storeCode, refId, tempBookingRefNo]);


  useEffect(() => {
    const rentalDate = new Date(
      moment(GetReturnProduct.rentalDate).format("YYYY-MM-DD")
    );
    const currentDate = new Date(moment().format("YYYY-MM-DD"));
    if (rentalDate < currentDate) {
      const timeDifference = rentalDate - currentDate;
      const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
      setNumberDays(daysDifference);
    } else if (rentalDate > currentDate) {
      const timeDifference = rentalDate - currentDate;
      const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
      setNumberDays(daysDifference);
    }
  }, [GetReturnProduct.rentalDate]);

  // TOTAL COST OF  CALCULATION
  const TProductValue = refactoreDataTable.map((item) =>
    Math.round(item.productValue)
  );
  const SumOfTProductValue = () => {
    let total = 0;
    for (let data of TProductValue) total = total + data;
    return total;
  };

  const TRentalRateRate = refactoreDataTable.map((item) =>
    parseInt(item.rentalAmount)
  );
  const SumOfTRentalRate = () => {
    let total = 0;
    for (let data of TRentalRateRate) total = total + data;
    return total;
  };

  const TPenaltyRate = refactoreDataTable.map((item) =>
    parseInt(item.peneltyCharge)
  );
  const SumOfTPeneltyCharge = () => {
    let total = 0;
    for (let data of TPenaltyRate) total = total + data;
    return total;
  };

  // UPLOAD CUSTOMER ID

  const UploadIDDetails = (imgName) => {
    const IdDetailsInput = {
      bookingRefId: GetReturnProduct.refId,
      contentFor: "RentalReturn",
      createdDate: moment().format("YYYY-MM-DD"),
      documentType: "userIdProof",
      fileName: imgName,
      fileSize: `${sameCustFile.size}`,
      fileType: `${sameCustFile.type}`,
      fileURL: `${FetchImg}${imgName}`,
      updatedDate: null,
    };
    axios
      .post(`${HOST_URL}/insert/image/details`, IdDetailsInput)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          Swal.fire({
            title: "Success",
            text: "Uploaded Successfully",
            icon: "success",
            confirmButtonColor: "#008080",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  const UploadSameCustIDProof = () => {
    if (sameCustFile.length === 0) {
      alert("Please Choose File");
    } else {
      setLoading(true);
      const formData = new FormData();
      const fileEx = sameCustFile.name.split(".");
      const fileExtention = `${sameCustIDNo}-${currentDate}.${fileEx[1]}`;
      formData.append("ImgName", fileExtention);
      formData.append("files", sameCustFile);
      axios
        .post(`${UploadImg}`, formData, {
          headers: ImageHeaders,
        })
        .then((res) => res)
        .then((response) => {
          if (response.data) {
            UploadIDDetails(fileExtention);
            const reader = new FileReader();
            reader.onloadend = () => {
              setSameCustFileUrl(reader.result);
              setSameCutIDFileName(fileExtention);
            };
            if (sameCustFile) {
              reader.readAsDataURL(sameCustFile);
            }
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  };

  const UpdateBookingFile = (fileExtention) => {
    const updateBookingInput = {
      bookingRefId: refId,
      contentFor: "RentalReturn",
      createdDate: moment().format("YYYY-MM-DD"),
      documentType: "KarigarQAReport",
      fileName: fileExtention,
      fileSize: `${karigarQAFile.size}`,
      fileType: `${karigarQAFile.type}`,
      fileURL: `${FetchImg}${fileExtention}`,
      updatedDate: null,
    };
    axios
      .post(`${HOST_URL}/insert/image/details`, updateBookingInput)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          alert("Uploaded Successfully");
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  // UPLOAD KARIGAR QA REPORT ID
  const karigarAQFile = () => {
    if (karigarQAFile.length === 0) {
      alert("Please Choose File");
    } else {
      setLoading(true);
      const formData = new FormData();
      const fileEx = karigarQAFile.name.split(".");
      const fileExtention = `${timeDifference}-${currentDate}-${RandomDigit}.${fileEx[1]}`;
      formData.append("ImgName", fileExtention);
      formData.append("files", karigarQAFile);
      axios
        .post(`${UploadImg}`, formData, {
          headers: ImageHeaders,
        })
        .then((res) => res)
        .then((response) => {
          if (response.data) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setKarigarQAFileUrl(reader.result);
              UpdateBookingFile(fileExtention);
            };
            if (karigarQAFile) {
              reader.readAsDataURL(karigarQAFile);
            }
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  };

  // CALCULATION OF ACTUAL WT AT RETURN

  const GetActualWtAtReturn = (e, grossWt) => {
    const { name, value } = e.target;
    const minWt = parseFloat((grossWt * 0.9).toFixed(3));
    const maxWt = parseFloat(parseFloat(grossWt * 1.1).toFixed(3));
    if (minWt > parseFloat(value)) {
      setAlertWt(
        "Return Weight Can't be Lesser than or Greater Than (10%) Of Gross Weight."
      );
    } else if (maxWt < parseFloat(value)) {
      setAlertWt(
        "Return Weight Can't be Lesser than or Greater Than (10%) Of Gross Weight."
      );
    } else {
      setAlertWt("");
      setInputRtnValues({
        ...inputRtnValues,
        [name]: value,
      });
    }
  };

  const PdtItemWtRtn = [];
  for (const key in inputRtnValues) {
    if (inputRtnValues.hasOwnProperty(key)) {
      PdtItemWtRtn.push(inputRtnValues[key]);
    }
  }

  const PdtItemWitewt = PdtItemWtRtn.map((ele, i) => {
    return {
      actualWtAtReturn: parseFloat(ele).toFixed(3),
      pdtId: parseInt(refactoreDataTable[i].pdtId),
    };
  });

  // TOTAL ACTUAL WT OF RETURN
  const SumOfActualItemWt = () => {
    let total = 0;
    for (let data of PdtItemWtRtn) total = total + parseFloat(data);
    return total;
  };

  // CALCULATION OF DAMAGE CHAREGES WT AT RETURN
  const GetActualWtOfDamage = (e) => {
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
  const UpdateBookingCalendar = (bookingID) => {
    setLoading(true);
    const updatedInputs = returnTableData.map((data, i) => {
      return {
        bookingId: bookingID,
        pdtId: data.pdtId,
        status: inputPhyDmg[i] === "FactoryQA" && "In_Factory_QA",
        storeCode: storeCode,
        tempRefNo: data.tempBookingRefNo,
      };
    });

    axios
      .post(`${HOST_URL}/update/item/booking/calendar`, updatedInputs)
      .then((res) => res)
      .then((response) => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const GetPhysicalDmg = (e) => {
    const { name, value } = e.target;
    setInputPhyDmg({
      ...inputPhyDmg,
      [name]: value,
    });
  };
  const FactoryQA = Object.values(inputPhyDmg);
  useEffect(() => {
    if (FactoryQA.includes("FactoryQA")) {
      setSuccessAlrt("Product will be sent for Factory QA");
      setSmlAlert("We will contact you with further updates shortly");
      setCheckedQA(true);
    } else if (!FactoryQA.includes("FactoryQA")) {
      setCheckedQA(false);
      setSuccessAlrt("Product Returned Successfully");
      setSmlAlert(
        "Please reach out to the Cashier to complete the payment process"
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputPhyDmg, GetReturnProduct.bookingID]);

  const FactoryQAStaus = checkedQA
    ? "FactoryQA_Required"
    : "Payment_PendingFor_RentalReturn";

  const TnxStatusUpdate = (bookingId) => {
    axios
      .get(`${HOST_URL}/update/txn/status/${bookingId}/${FactoryQAStaus}`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          Swal.fire({
            title: successAlrt,
            text: smlAlert,
            icon: "success",
            confirmButtonColor: "#008080",
            confirmButtonText: "OK",
          });
          navigate("/home");
          localStorage.removeItem("selecttedReturnProduct");
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  const DespId = returnTableData.map((data) => data.despId);
  const rentChargeAftrDis = totalPaidAmount.totalRentalValue - discountAmtOnRental;

  const RaiseClouseRequest = (despId) => {
    const RetnaReturnInputs = {
      actualWtReturn: PdtItemWitewt,
      balanceToBePaid: parseFloat(SumOfDmgCharge() + SumOfTPeneltyCharge()),
      bookingRefNo: totalPaidAmount.bookingId,
      closeRentalAgreementUpload: "",
      createdDate: null,
      customerName: sameCustomer ? "" : sameCustName,
      despId: despId === "" ? "0" : despId,
      factoryQARequired: checkedQA ? "YES" : "NO",
      idFileName: sameCustomer ? "" : sameCutIDFileName,
      idNumber: sameCustomer ? "" : sameCustIDNo,
      idType: sameCustomer ? "" : sameCustIDType,
      karigarQAPassed: "",
      loanReturnDoc: "",
      returnDate: null,
      rsoName: RSOName,
      totalBookingPaid: parseFloat(totalPaidAmount.totalBookingAmount),
      totalDamageCharges: parseFloat(SumOfDmgCharge()),
      totalDepositPaid: parseFloat(totalPaidAmount.totalDepositAmount),
      totalPenaltyCharges: parseFloat(SumOfTPeneltyCharge()),
      totalRentaLAmount: parseFloat(totalPaidAmount.totalRentalValue),
      discountOnRentalCharges: parseFloat(discountAmtOnRental),
      updatedDate: null,
    };
    axios
      .post(`${HOST_URL}/rental/return/items`, RetnaReturnInputs)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          TnxStatusUpdate(totalPaidAmount.bookingId);
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const InsertReturnTableData = (inputRtnValues) => {
    if (totalPaidAmount.totalBookingAmount <= discountAmtOnRental) {
      setDiscountAlert("Discount Amount Can't Be Greater Than Total Rental Value")
    } else {
      setLoading(true);
      const InsertTableInputs = returnTableData.map((data, i) => {
        return {
          bookingId: totalPaidAmount.bookingId,
          despId: data.despId === "" ? "0" : data.despId,
          pdtId: data.pdtId,
          actualWtAtDelivery: data.deliveredWt === "" ? 0 : data.deliveredWt,
          actualWtAtReturn: inputRtnValues[i],
          rentalStartDate: moment(data.rentStartDate).format("YYYY-MM-DD"),
          packageDays: data.packageDays,
          rentalReturnDate: moment(getReturnDate()).format("YYYY-MM-DD"),
          totalRentalDays: numberDays.toString(),
          itemPriceID: data.itemPriceId,
          rateId: data.rateId,
          productValue: parseFloat(data.productValue),
          rentValue: parseFloat(data.rentalAmount),
          penaltyValue:
            penaltyDays <= 0
              ? 0
              : ((parseInt(data.productValue) * 2) / 100) * penaltyDays,
          tempBookingRefNo: data.tempBookingRefNo,
          damageCharges: parseFloat(inputDmgValues[i]),
          createdDate: null,
          updatedDate: null,
        };
      });
      axios
        .post(`${HOST_URL}/insert/into/return/table`, InsertTableInputs)
        .then((res) => res)
        .then((response) => {
          if (response.data.code === "1000") {
            RaiseClouseRequest(DespId[0]);
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  };

  const ValidateInsertData = () => {
    if (FactoryQA.includes("FactoryQA")) {
      if (!RSOName || karigarQAFile.length === 0) {
        alert("Please Upload Print File & Enter RSO Name");
      } else {
        InsertReturnTableData(inputRtnValues);
        UpdateBookingCalendar(GetReturnProduct.bookingID);
      }
    } else if (!FactoryQA.includes("FactoryQA")) {
      if (
        !RSOName ||
        karigarQAFile.length === 0 ||
        inputRtnValues.length === 0
      ) {
        alert("Please Enter Actual wt Return, Upload Print File & RSO Name");
      } else {
        InsertReturnTableData(inputRtnValues);
      }
    }
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
            <h6>{refId}</h6>
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
              onChange={(e) => setSameCustName(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Customer ID Type</label>
            <select
              className="form-control"
              onChange={(e) => setSameCustIDType(e.target.value)}
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
              onChange={(e) => setSameCustIDNo(e.target.value)}
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
                    disabled={sameCustomer ? true : false}
                    onClick={UploadSameCustIDProof}
                  >
                    Upload
                  </button>
                </div>
              </div>
            )}
          </div>
          {refactoreDataTable.length > 0 && (
            <div className="col-12">
              <h6 className="bookingHeading">Item Details</h6>
              <div className="table-responsive">
                <table className="table table-bordered table-hover border-dark text-center">
                  <thead className="table-dark border-light">
                    <tr style={{ fontSize: "15px" }}>
                      {renatlReturnPage.map((heading, i) => {
                        return <td key={i}>{heading}</td>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {refactoreDataTable.map((item, i) => {
                      const { itemCode } = item;
                      const imageCode = itemCode.substring(2, 9);
                      const imageURL = `${IMAGE_URL}${imageCode}.jpg`;
                      return (
                        <tr key={i}>
                          <td>
                            <img
                              src={imageURL}
                              className="custom-image"
                              alt=""
                            />
                          </td>
                          <td>{item.itemCode}</td>
                          <td>{item.lotNo}</td>
                          <td>{item.grossWt}</td>
                          <td>{item.deliveredWt}</td>
                          <td>
                            <input
                              type="number"
                              placeholder="Actual Wt at Return"
                              name={i}
                              defaultValue={inputRtnValues[i]}
                              onChange={(e) =>
                                GetActualWtAtReturn(e, item.grossWt)
                              }
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
                          <td>{item.peneltyCharge.toLocaleString("en-IN")}</td>
                          <td>
                            <select
                              className="w-100"
                              name={i}
                              defaultValue={inputPhyDmg[i]}
                              onChange={GetPhysicalDmg}
                            >
                              <option value="">Select</option>
                              <option value="NO">NO</option>
                              <option value="YES">Yes</option>
                              <option value="FactoryQA">Factory QA</option>
                            </select>
                          </td>
                          <td>
                            <input
                              type="number"
                              className="w-100"
                              placeholder="Damage Charge"
                              name={i}
                              value={
                                inputPhyDmg[i] === "NO" ||
                                  inputPhyDmg[i] === "FactoryQA"
                                  ? (inputDmgValues[i] = 0)
                                  : inputDmgValues[i]
                              }
                              onChange={GetActualWtOfDamage}
                              disabled={inputPhyDmg[i] === "NO" ? true : false}
                            />
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <th colSpan="5" className="text-end">
                        TOTAL
                      </th>
                      <th>{SumOfActualItemWt().toFixed(3)} g.</th>
                      <th>
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                          minimumFractionDigits: false,
                        }).format(SumOfTProductValue())}
                      </th>
                      <th>
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                          minimumFractionDigits: false,
                        }).format(SumOfTRentalRate())}
                      </th>
                      <th>
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                          minimumFractionDigits: false,
                        }).format(SumOfTPeneltyCharge())}
                      </th>
                      <th colSpan="1" />
                      <th>
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                          minimumFractionDigits: false,
                        }).format(SumOfDmgCharge())}
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <b className="mt-0 text-danger">{alertWt}</b>
          <div className="col-12">
            <h6 className="bookingHeading mb-0">Discount Charges</h6>
          </div>
          <div className="col-md-3">
            <label className="form-label">Total Rental Value</label>
            <input
              type="text"
              className="form-control"
              value={totalPaidAmount.totalRentalValue}
              disabled
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Discount On Rental Charges</label>
            <input
              type="number"
              className="form-control"
              value={discountAmtOnRental}
              onChange={(e) => {
                const discountVal = e.target.value.replace(/[^0-9.]/g, '');
                const disAmount = parseFloat(discountVal).toFixed(2);
                if (totalPaidAmount.totalBookingAmount >= parseFloat(disAmount)) {
                  setDiscountAmtOnRental(parseFloat(discountVal))
                  setDiscountAlert("")
                } else {
                  setDiscountAlert("Discount Amount Can't Be Greater Than Total Rental Value")
                  setDiscountAmtOnRental(parseFloat(discountVal))
                }
              }}
            />
            <span className="text-danger">{discountAlert}</span>
          </div>
          <div className="col-md-3">
            <label className="form-label">Rental Charges After Discount</label>
            <input
              type="text"
              className="form-control"
              value={rentChargeAftrDis ? parseFloat(rentChargeAftrDis).toFixed(2) : 0}
              disabled
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Revised Rental Charges(With 18% Tax)</label>
            <input
              type="text"
              className="form-control"
              value={discountAmtOnRental ? rentChargeAftrDis * 1.18 : 0}
              disabled
            />
          </div>
          <div className="col-md-12">
            <label className="form-label">Booking Amount Paid(With Tax)</label>
            <input
              type="text"
              className="form-control"
              placeholder="Total Booking Amount Paid"
              defaultValue={totalPaidAmount.totalBookingAmount}
              disabled
            />
          </div>
          <div className="col-12 mb-0">
            <h6 className="bookingHeading d-flex justify-content-between">
              <span className="mt-1">Karigar QA Report</span>
              {returnTableData.length > 0 && (
                <KarigarQAReturnPdf refactoreDataTable={refactoreDataTable} />
              )}
            </h6>
          </div>
          <div className="col-md-5">
            <label className="form-label">
              Upload Signed Karigar QA Report
            </label>
            <input
              type="file"
              id="KarigrQAid"
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
          {karigarQAFileUrl && (
            <div className="col-md-3">
              <img src={karigarQAFileUrl} alt="" width="180" height="85" />
            </div>
          )}
          <div className="col-md-12 d-flex">
            <b className="mt-4">Factory QA Required ?</b>
            <input type="checkbox" className="mx-3 mt-4" checked={checkedQA} readOnly />
          </div>
          <div className="col-md-12">
            <input
              type="text"
              className="form-control"
              placeholder="RSO Name"
              onChange={(e) => setRSOName(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-end mb-4">
            {checkedQA === true && (
              <AcknowledgementRetunr
                storeDetails={storeDetails}
                refactoreDataTable={refactoreDataTable}
                existedUserData={existedUserData}
                GetReturnProduct={GetReturnProduct}
                inputRtnValues={inputRtnValues}
                inputPhyDmg={inputPhyDmg}
                PdtItemWtRtn={PdtItemWtRtn}
              />
            )}
            <button
              type="button"
              className="CButton"
              onClick={ValidateInsertData}
            >
              {checkedQA ? "Acknowledgement & Close" : "Raise Closure Request"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalReturn;
