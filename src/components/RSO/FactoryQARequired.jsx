import React, { useState, useEffect } from "react";
import Navbar from "../common/Navbar";
import "../../Style/RentalIssue.css";
import moment from "moment";
import axios from "axios";
import Loader from "../common/Loader";
import { IMAGE_URL, factoryQAPage } from "../../Data/DataList";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { HOST_URL } from "../../API/HostURL";
import { UploadImg, FetchImg } from "../../API/HostURL";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


const FactoryQARequired = () => {
  const [loading, setLoading] = useState(false);
  const storeCode = localStorage.getItem("storeCode");
  const [returnTableData, setReturnTableData] = useState([]);
  const [totalPaidAmount, setTotalPaidAmount] = useState({});

  // UPLOAD FACTORY FILE
  const [factoryQAFile, setFactoryQAFile] = useState("");
  const [karigarQAFileUrl, setKarigarQAFileUrl] = useState("");
  // ACTUAL WT RETURN
  const [inputDmgValues, setInputDmgValues] = useState({});
  const [remarks, setRemarks] = useState({});

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

  const timeDifference = new Date() - getReturnDate();
  const DespId = returnTableData.map((data) => data.despId);

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
      peneltyCharge: parseFloat(!data.penaltyCharges ? 0 : data.penaltyCharges),
      tempBookingRefNo: data.tempBookingRefNo,
      damageCharges: data.damageCharges,
    };
  })

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
      .catch((error) => setLoading(false));
  }, [storeCode, refId]);

  useEffect(() => {
    setLoading(true);
    axios.get(
      `${HOST_URL}/fetch/table/common/data/${storeCode}/${refId}/${tempBookingRefNo}`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          const productDataGrtThnZero = response.data.value.filter(item => parseFloat(item.damageCharges) > 0)
          const uniqueProducts = productDataGrtThnZero.filter((obj, index, self) => index === self.findIndex((item) => (item.itemCode && item.lotNo == obj.lotNo && obj.itemCode)));
          setReturnTableData(uniqueProducts);
        }
        setLoading(false);
      })
      .catch((error) => setLoading(false));
  }, [storeCode, refId, tempBookingRefNo]);

  // TOTAL COST OF  CALCULATION
  const TProductValue = refactoreDataTable.map((item) => Math.round(item.productValue));
  const SumOfTProductValue = () => {
    let total = 0;
    for (let data of TProductValue) total = total + data;
    return total;
  };

  const TRentalRateRate = refactoreDataTable.map((item) => parseInt(item.rentalAmount));
  const SumOfTRentalRate = () => {
    let total = 0;
    for (let data of TRentalRateRate) total = total + data;
    return total;
  };

  const TPenaltyRate = refactoreDataTable.map((item) => parseInt(item.peneltyCharge));
  const SumOfTPeneltyCharge = () => {
    let total = 0;
    for (let data of TPenaltyRate) total = total + data;
    return total;
  };

  const UpdateBookingFile = (fileExtention) => {
    const updateBookingInput = {
      bookingRefId: refId,
      contentFor: "FactoryQA",
      createdDate: moment().format("YYYY-MM-DD"),
      documentType: "FactoryQAReport",
      fileName: fileExtention,
      fileSize: `${factoryQAFile.size}`,
      fileType: `${factoryQAFile.type}`,
      fileURL: `${FetchImg}${fileExtention}`,
      updatedDate: null,
    };
    axios
      .post(`${HOST_URL}/insert/image/details`, updateBookingInput)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          toast.success("Uploaded Successfully", { theme: "colored", autoClose: 1000 });
        }
      })
      .catch((error) => setLoading(false));
  };

  // UPLOAD KARIGAR QA REPORT ID
  const FactoryAQFile = () => {
    if (factoryQAFile.length === 0) {
      toast.error("Please Choose File", { theme: "colored", autoClose: 3000 });
    } else {
      setLoading(true);
      const formData = new FormData();
      const fileEx = factoryQAFile.name.split(".");
      const fileExtention = `${timeDifference}-${currentDate}-${RandomDigit}.${fileEx[1]}`;
      formData.append("ImgName", fileExtention);
      formData.append("files", factoryQAFile);
      axios
        .post(UploadImg, formData)
        .then((res) => res)
        .then((response) => {
          if (response.data) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setKarigarQAFileUrl(reader.result);
              UpdateBookingFile(fileExtention);
            };
            if (factoryQAFile) {
              reader.readAsDataURL(factoryQAFile);
            }
          }
          setLoading(false);
        })
        .catch((error) => setLoading(false));
    }
  };

  // CALCULATION OF DAMAGE CHAREGES WT AT RETURN
  const GetActualWtOfDamage = (e, damageCharges) => {
    const { name, value } = e.target;
    setInputDmgValues({
      ...inputDmgValues,
      [name]: value ? value : damageCharges,
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

  const GetRemarks = (e) => {
    const { name, value } = e.target;
    setRemarks({
      ...remarks,
      [name]: value,
    });
  };

  const TnxStatusUpdate = (bookingId) => {
    axios.get(`${HOST_URL}/update/txn/status/${bookingId}/Payment_PendingFor_RentalReturn`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          Swal.fire({
            title: "Factoy QA Proccess Completed Successfully",
            text: "Please reach out to the Cashier to complete the payment proccess",
            icon: "success",
            confirmButtonColor: "#008080",
            confirmButtonText: "OK",
          });
          navigate("/home");
          localStorage.removeItem("selecttedReturnProduct");
        }
      })
      .catch((error) => setLoading(false));
  };

  const UpdateSummaryData = (bookingId) => {
    const SummaryInputs = {
      bookingId: parseInt(bookingId),
      updatedDate: moment().format("YYYY-MM-DD"),
      totalDamageCharges: parseFloat(SumOfDmgCharge()),
    };
    axios
      .post(`${HOST_URL}/update/Summary/damage/charges`, SummaryInputs)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          TnxStatusUpdate(totalPaidAmount.bookingId);
        }
        setLoading(false);
      })
      .then((error) => setLoading(false));
  };

  const RaisePaymentRequest = () => {
    if (!factoryQAFile) {
      toast.error("Please Uplaod Factory QA Reports", { theme: "colored", autoClose: 3000 });
    } else {
      setLoading(true);
      const ItemWiseInpute = returnTableData.map((data, i) => {
        return {
          bookingId: parseInt(totalPaidAmount.bookingId),
          despId: parseInt(DespId[0]),
          pdtId: parseInt(data.pdtId),
          updatedDate: moment().format("YYYY-MM-DD"),
          damageCharges: parseFloat(data.damageCharges),
          remarks: remarks[i] === undefined ? "" : remarks[i],
        };
      });
      axios
        .post(`${HOST_URL}/update/itemwise/damage/charges`, ItemWiseInpute)
        .then((res) => res)
        .then((response) => {
          if (response.data.code === "1000") {
            UpdateSummaryData(totalPaidAmount.bookingId);
          }
        })
        .catch((error) => setLoading(false));
    }
  };
  return (
    <div>
      {loading === true && <Loader />}
      <Navbar />
      <div className="mt-4 mx-2">
        <h6 className="bookingHeading">Booking Details</h6>
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <label className="form-label">Booking Ref No</label>
            <h6>{refId}</h6>
          </div>
          <div className="col-md-2">
            <label className="form-label">Rental Start Date</label>
            <h6>{moment(GetReturnProduct.rentalDate).format("DD-MM-YYYY")}</h6>
          </div>
          <div className="col-md-3">
            <label className="form-label">Rental End Date</label>
            <h6>{moment(getReturnDate()).format("DD-MM-YYYY")}</h6>
          </div>
          <div className="col-md-2">
            <label className="form-label">Customer Name</label>
            <h6>{GetReturnProduct.customerName}</h6>
          </div>
          <div className="col-md-2">
            <label className="form-label">Phone Number</label>
            <h6>{GetReturnProduct.mobileNo}</h6>
          </div>
          {refactoreDataTable.length > 0 && (
            <div className="col-md-12">
              <h6 className="bookingHeading">Item Details</h6>
              <div className="table-responsive">
                <Table className="table table-bordered table-hover border-dark text-center">
                  <Thead className="table-dark border-light">
                    <Tr style={{ fontSize: "15px" }}>
                      {factoryQAPage.map((heading, i) => {
                        return <Th key={i}>{heading}</Th>;
                      })}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {refactoreDataTable.map((item, i) => {
                      const { itemCode } = item;
                      const imageCode = itemCode.substring(2, 9);
                      const imageURL = `${IMAGE_URL}${imageCode}.jpg`;
                      return (
                        <Tr key={i}>
                          <Td>
                            <img
                              src={imageURL}
                              className="custom-image"
                              alt=""
                            />
                          </Td>
                          <Td>{item.itemCode}</Td>
                          <Td>{item.lotNo}</Td>
                          <Td>{item.grossWt}</Td>
                          <Td>{item.deliveredWt}</Td>
                          <Td>{item.actualWtReturn}</Td>
                          <Td className="text-end">
                            {Math.round(item.productValue).toLocaleString(
                              "en-IN"
                            )}
                          </Td>
                          <Td className="text-end">
                            {Math.round(item.rentalAmount).toLocaleString(
                              "en-IN"
                            )}
                          </Td>
                          <Td className="text-end">{item.peneltyCharge.toLocaleString("en-IN")}</Td>
                          <Td>
                            <input
                              type="text"
                              className="text-center w-100"
                              placeholder="Damage Charge"
                              name={i}
                              value={(item.deliveredWt === item.actualWtReturn) ? 0 : inputDmgValues[i] ? inputDmgValues[i] : parseFloat(item.damageCharges)}
                              onChange={(e) => GetActualWtOfDamage(e, parseFloat(item.damageCharges))}
                              disabled={item.deliveredWt === item.actualWtReturn ? true : false}
                            />
                          </Td>
                          <Td>
                            <input
                              type="text"
                              className="w-100"
                              placeholder="Remarks(Upto 50 Characters)"
                              maxLength={50}
                              name={i}
                              onChange={GetRemarks}
                            />
                          </Td>
                        </Tr>
                      );
                    })}
                    <Tr className="text-end">
                      <Th colSpan="6">
                        TOTAL
                      </Th>
                      <Th>
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                          minimumFractionDigits: false,
                        }).format(SumOfTProductValue())}
                      </Th>
                      <Th>
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                          minimumFractionDigits: false,
                        }).format(SumOfTRentalRate())}
                      </Th>
                      <Th>
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                          minimumFractionDigits: false,
                        }).format(SumOfTPeneltyCharge())}
                      </Th>
                      <Th>
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                          minimumFractionDigits: false,
                        }).format(SumOfDmgCharge())}
                      </Th>
                      <Th colSpan="1" />
                    </Tr>
                  </Tbody>
                </Table>
              </div>
            </div>
          )}
          <div className="col-md-12">
            <label className="form-label">
              Upload Signed Factory QA Report<span className="text-danger">*</span>
            </label>
            <div className="d-flex">
              <input
                type="file"
                accept=".png, .jpeg"
                id="KarigrQAid"
                className="form-control"
                onChange={(e) => setFactoryQAFile(e.target.files[0])}
              />
              <button className="CButton mx-1" onClick={FactoryAQFile}>
                Upload
              </button>
            </div>
          </div>
          {karigarQAFileUrl && (
            <div className="col-md-3">
              <img src={karigarQAFileUrl} alt="" width="180" height="85" />
            </div>
          )}
          <div className="d-flex justify-content-end mb-4">
            <button
              type="button"
              className="CButton"
              onClick={RaisePaymentRequest}
            >
              Raise Payment Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FactoryQARequired;
