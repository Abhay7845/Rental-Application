import React, { useState } from "react";
import Navbar from "../common/Navbar";
import axios from "axios";
import Swal from "sweetalert2";
import { HOST_URL } from "../../API/HostURL";
import Loader from "../common/Loader";
import {
  ImageHeaders,
  PaymentHeading1,
  PaymentHeading2,
} from "../../Data/DataList";
import { UploadImg, FetchImg } from "../../API/HostURL";
import { BsFillTrashFill } from "react-icons/bs";
import moment from "moment/moment";
import { useEffect } from "react";
import BookingPdf from "../Pdf/BookingPdf";
import CancelationPdf from "../Pdf/CancelationPdf";
import DeliveryChallanPdf from "../Pdf/DeliveryChallanPdf";
import ServiceIvoicePdf from "../Pdf/ServiceIvoicePdf";

const CashierPaymentDetails = () => {
  const [loading, setLoading] = useState(false);
  const storeCode = localStorage.getItem("storeCode");
  const [bookingGenNo, setBookingGenNo] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [getPaymentData, setGetPaymentData] = useState([]);
  const [storeDetails, setStoreDetails] = useState({});
  const [addedPdts, setAddedPdts] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState({});
  const [existedUserData, setExistedUserData] = useState({});
  const [documentType, setDocumentType] = useState("");
  const [collectedAmount, setCollectedAmount] = useState(0);
  const [alertMessage, setAlertMessage] = useState();
  const [amontErrMassage, setAmontErrMassage] = useState("");
  const [regUserData, setRegUserData] = useState([]);
  const [previousTnxData, setPreviousTnxData] = useState([]);
  const [totalPaidAmount, setTotalPaidAmount] = useState({});
  const [updateStatus, setUpdateStatus] = useState("");
  const [bookedStatus, setBookedStatus] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [challanNo, setChallanNo] = useState("");
  const [invoicePdfNo, setInvoicePdfNo] = useState({});
  const [outStatus, setOutStatus] = useState("");
  const [amontHeading, setAmontHeading] = useState("");
  const currentDate = moment().format("YYYY-MM-DD");
  const RandomDigit = Math.floor(100000 + Math.random() * 900000);
  const booking_Id = `${storeCode}-R-${currentDate}-${RandomDigit}`;
  const [bookingRefID, setBookingRefID] = useState(booking_Id);

  const {
    paymentRequestFor,
    rentValue,
    refundValue,
    depositValue,
    bookingRefNo,
    totalBookingAmount,
    totalDepositAmountPaidWithTax,
    productValue,
  } = paymentDetails;

  const {
    totalDamageCharges,
    totalPenaltyCharges,
    bookingId,
    totalDepositAmount,
    discountOnRentalCharges,
  } = totalPaidAmount;
  const TotalCharges =
    (totalDamageCharges + totalPenaltyCharges + parseFloat(rentValue)) * 1.18;


  const GenChallanNo = `${bookingRefNo}-D`;
  const GenInvoiceNo = `${storeCode}-${invoicePdfNo.invoiceId + 1}`;
  const rentalStrDate = addedPdts.map((date) => date.rentStartDate);
  const packageDays = addedPdts.map((date) => date.packageDays);
  const getReturnDate = () => {
    const nextDate = new Date(rentalStrDate[0]);
    nextDate.setDate(nextDate.getDate() + parseInt(packageDays[0] - 1));
    return nextDate;
  };

  // ADD ROW
  const [count, setCount] = useState(0);
  const [addPaymentRows, setAddPaymentRows] = useState([]);
  const [paymentRowId, setPaymentRowId] = useState(0);
  const [savePaymetRow, setSavePaymetRow] = useState([]);
  const [paymentType, setPaymentType] = useState("");
  const [tnxRefNo, setTnxRefNo] = useState("");
  const [amount, setAmount] = useState(0);
  const [fileUpload, setFileUpload] = useState("");
  const [fileName, setFileName] = useState("");

  // TERMS AND CONDITION FILE UPLOAD
  const [printFile, setPrintFile] = useState("");
  const [deliveryChallan, setDeliveryChallan] = useState([]);
  const [tnCFileName, setTnCFileName] = useState("");
  const [cashierName, setCashierName] = useState("");
  const [loanCloseFile, setLoanCloseFile] = useState("");

  // OTP VERIFICATION
  const [Otp, setOtp] = useState("");
  const [inputOtp, setInputOtp] = useState("");
  const [verifiedOtp, setVerifiedOtp] = useState(false);
  const FetchUserDetails = (phoneNo) => {
    axios
      .get(`${HOST_URL}/rental/customer/details/mobileNo/${phoneNo}`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setExistedUserData(response.data.value);
        }
      })
      .then((error) => {
        setLoading(false);
      });
  };

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

  const GetRegistreUserData = () => {
    axios
      .get(
        `${HOST_URL}/get/booking/details/${storeCode}/Mobile_No/${searchValue}`
      )
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setRegUserData(response.data.value);
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (bookingRefNo) {
      axios
        .get(
          `${HOST_URL}/fetch/sumOf/amounts/common/${storeCode}/${bookingRefNo}`
        )
        .then((res) => res)
        .then((response) => {
          if (response.data.code === "1000") {
            setTotalPaidAmount(response.data.value);
          }
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  }, [storeCode, bookingRefNo]);

  useEffect(() => {
    if (bookingId) {
      axios
        .get(
          `${HOST_URL}/get/prev/txn/details/forReturn/pdf/${bookingId}/Payment_PendingFor_NewBooking`
        )
        .then((res) => res)
        .then((response) => {
          if (response.data.code === "1000") {
            setPreviousTnxData(response.data.value);
          }
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  }, [bookingId]);

  useEffect(() => {
    axios
      .get(`${HOST_URL}/get/last/invoice/details/${storeCode}`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setInvoicePdfNo(response.data.value);
        } else if (response.data.code === "1001") {
          setInvoicePdfNo({ invoiceId: 0 });
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [storeCode]);

  useEffect(() => {
    if (paymentDetails.tempBookingRef) {
      setLoading(true);
      axios
        .get(
          `${HOST_URL}/fetch/table/common/data/${storeCode}/""/${paymentDetails.tempBookingRef}`
        )
        .then((res) => res)
        .then((response) => {
          if (response.data.code === "1000") {
            setAddedPdts(response.data.value);
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  }, [storeCode, paymentDetails.tempBookingRef]);

  const ClearAllUIData = () => {
    GetPyamentDetials();
    setPaymentDetails({});
    setGetPaymentData([]);
    setSavePaymetRow([]);
    setCashierName("");
    setVerifiedOtp(false);
    setPrintFile([]);
    setDeliveryChallan([]);
    setCollectedAmount(0);
    setVerifiedOtp(false);
    setOtp("");
  };
  const GetPyamentDetials = () => {
    setLoading(true);
    axios
      .get(
        `${HOST_URL}/get/payment/request/details/for/cashier/${storeCode}/${searchValue}`
      )
      .then((res) => res)
      .then((response) => {
        const PendingStatusData = response.data.value.filter(
          (data) =>
            data.paymentRequestFor.substring(0, 18) === "Payment_PendingFor"
        );
        if (response.data.code === "1000") {
          setGetPaymentData(PendingStatusData);
          FetchUserDetails(searchValue);
          GetRegistreUserData();
        }
        if (response.data.code === "1001") {
          setGetPaymentData({});
          setPaymentDetails({});
          Swal.fire({
            title: "No Pending Payment Requests",
            text: "There are no Open Payment Requests for this Customer",
            icon: "warning",
            confirmButtonColor: "#008080",
            confirmButtonText: "OK",
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const OnSelectRow = (seletedData) => {
    setPaymentDetails(seletedData);
  };

  useEffect(() => {
    if (paymentRequestFor === "Payment_PendingFor_RentalCancellation") {
      setCollectedAmount(parseFloat(refundValue));
      setAlertMessage("Booking Successfully Cancelled");
      setBookedStatus("Cancellation_After_Booking");
      setUpdateStatus("BookingCancelled");
      setAmontHeading("Amount to be Refunded");
      setAmontErrMassage(
        "Total Amount Not Equal to Net Cancellation Charges & Please ensure to Save the Payment"
      );
      setBookingGenNo(bookingRefNo);
    }
    if (paymentRequestFor === "Payment_PendingFor_RentalIssuance") {
      setCollectedAmount(parseFloat(depositValue));
      setAlertMessage("Item Issued. Rental Period Started");
      setBookedStatus("Issued_Rental_Period");
      setOutStatus("Booked_Product_Issued");
      setInvoiceNo("");
      setAmontHeading("Amount to be Collected");
      setChallanNo(GenChallanNo);
      setAmontErrMassage(
        "Total Amount Not Equal to Damage Protection Charge & Please ensure to Save the Payment"
      );
      setBookingGenNo(bookingRefNo);
    }
    if (paymentRequestFor === "Payment_PendingFor_NewBooking") {
      setCollectedAmount(parseFloat(totalBookingAmount));
      setAlertMessage("Payment Submited Successfully & Order Booked");
      setBookedStatus("Booked");
      setUpdateStatus("Booked");
      setAmontHeading("Amount to be Collected");
      setAmontErrMassage(
        "Total Amount Not Equal to Rental Amount & Please ensure to Save the Payment"
      );
    }
    if (paymentRequestFor === "Payment_PendingFor_RentalReturn") {
      const bookingDesposit = totalBookingAmount + totalDepositAmount;
      if (TotalCharges > bookingDesposit) {
        setAmontHeading("Amount to be Collected");
        setCollectedAmount(
          parseFloat(TotalCharges - bookingDesposit - discountOnRentalCharges * 1.18).toFixed(2)
        );
      } else if (TotalCharges <= bookingDesposit) {
        setAmontHeading("Amount to be Refunded");
        setCollectedAmount(
          parseFloat(bookingDesposit - TotalCharges + discountOnRentalCharges * 1.18).toFixed(2)
        );
      }
      setAlertMessage("Item Returned Successfully");
      setUpdateStatus("ProductReturnedSuccess");
      setBookedStatus("ProductReturnedSuccess");
      setInvoiceNo(GenInvoiceNo);
      setOutStatus("Product_Returned_Successfully");
      setAmontHeading("Amount to be Refunded");
      setChallanNo("");
      setAmontErrMassage(
        "Total Amount Not Equal to Rental Return & Please ensure to Save the Payment"
      );
      setBookingGenNo(bookingRefNo);
    }
  }, [
    rentValue,
    paymentRequestFor,
    depositValue,
    refundValue,
    bookingRefNo,
    GenChallanNo,
    totalBookingAmount,
    totalDepositAmountPaidWithTax,
    GenInvoiceNo,
    TotalCharges,
    totalDepositAmount,
  ]);

  const AddPaymentRows = () => {
    setCount(count + 1);
    setAddPaymentRows([...addPaymentRows, count + 1]);
  };

  const InsertInvoiceData = (challanNo) => {
    setLoading(true);
    const InvoiceInputs = {
      bookingId: bookingId,
      bookingRefNo: bookingRefNo,
      challanNo: challanNo,
      invoiceNo: invoiceNo,
      createdDate: null,
      storeCode: storeCode,
    };
    axios
      .post(`${HOST_URL}/insert/invoice/details`, InvoiceInputs)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          if (paymentRequestFor === "Payment_PendingFor_RentalReturn") {
            UpdateBookingCalendar();
          }
          if (paymentRequestFor === "Payment_PendingFor_RentalIssuance") {
            InsertOutStanding(outStatus);
          }
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const SavePaymentRow = () => {
    if (!fileName || !amount) {
      alert("Please Fill All Details");
    } else if (parseFloat(collectedAmount) < TotalAmount + parseFloat(amount)) {
      alert(amontErrMassage);
    } else {
      setPaymentRowId(paymentRowId + 1);
      const savePaymentDetails = {
        id: paymentRowId,
        amount: parseFloat(amount),
        bookingRefId: parseInt(paymentDetails.bookingId),
        createDate: null,
        fileName: fileName,
        paymentFor: paymentRequestFor,
        paymentType: paymentType,
        txnRefNo: tnxRefNo,
        tempRefNo: paymentDetails.tempBookingRef,
        status: "Completed",
      };
      setSavePaymetRow([...savePaymetRow, savePaymentDetails]);
      setAddPaymentRows([]);
      setFileName("");
    }
  };

  const InsertOutStanding = (outStatus) => {
    const OutstandingInputs = {
      bookingId: bookingId,
      createdDate: null,
      custId: existedUserData.custId,
      outstanding: parseFloat(productValue),
      pancardContentId: existedUserData.panCardNo,
      status: outStatus,
      updatedDate: null,
    };
    axios
      .post(`${HOST_URL}/insert/outstanding/details`, OutstandingInputs)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          TnxStatusUpdate(paymentDetails.bookingId);
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const UpdateBookingCalendar = () => {
    const updatedInputs = addedPdts.map((data) => {
      return {
        bookingId: paymentDetails.bookingId,
        pdtId: data.pdtId,
        status: updateStatus,
        storeCode: storeCode,
        tempRefNo: data.tempBookingRefNo,
      };
    });
    axios
      .post(`${HOST_URL}/update/item/booking/calendar`, updatedInputs)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          if (paymentRequestFor === "Payment_PendingFor_NewBooking") {
            TnxStatusUpdate(paymentDetails.bookingId);
          }
          if (paymentRequestFor === "Payment_PendingFor_RentalCancellation") {
            TnxStatusUpdate(paymentDetails.bookingId);
          }
          if (paymentRequestFor === "Payment_PendingFor_RentalReturn") {
            InsertOutStanding(outStatus);
          }
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const PaymentFileImage = (UploadFileName) => {
    const paymentUploadFile = {
      bookingRefId: !bookingGenNo ? bookingRefID : bookingGenNo,
      contentFor: `${paymentRequestFor}`,
      createdDate: currentDate,
      documentType: "PaymentDocument",
      fileName: UploadFileName,
      fileSize: `${fileUpload.size}`,
      fileType: `${fileUpload.type}`,
      fileURL: `${FetchImg}${UploadFileName}`,
      updatedDate: null,
    };
    axios
      .post(`${HOST_URL}/insert/image/details`, paymentUploadFile)
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

  const UploadPaymentFile = () => {
    if (fileUpload.length === 0) {
      alert("Please Upload Payment Receipt");
    } else {
      setLoading(true);
      const formData = new FormData();
      const fileExtention = fileUpload.name.split(".");
      const UploadFileName = `${paymentDetails.mobileNo}${currentDate}${RandomDigit}.${fileExtention[1]}`;
      setFileName(UploadFileName);
      formData.append("ImgName", UploadFileName);
      formData.append("files", fileUpload);
      axios
        .post(`${UploadImg}`, formData, {
          headers: ImageHeaders,
        })
        .then((res) => res)
        .then((response) => {
          if (response.data) {
            PaymentFileImage(UploadFileName);
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  };
  const DeletePaymentRow = (id) => {
    const updatedData = savePaymetRow.filter((rowId) => rowId.id !== id);
    setSavePaymetRow(updatedData);
  };
  const TAmount = savePaymetRow.map((item) => item.amount);
  const SumOfTAmount = () => {
    let total = 0;
    for (let num of TAmount) total = total + num;
    return total;
  };
  let TotalAmount = SumOfTAmount();

  useEffect(() => {
    if (paymentRequestFor === "Payment_PendingFor_NewBooking") {
      setDocumentType("tncDocument");
    }
    if (paymentRequestFor === "Payment_PendingFor_RentalIssuance") {
      setDocumentType("LoanDocument");
    }
    if (paymentRequestFor === "Payment_PendingFor_RentalReturn") {
      setDocumentType("ServiceInvoice");
    }
    if (paymentRequestFor === "Payment_PendingFor_RentalCancellation") {
      setDocumentType("CancellationInvoice");
    }
  }, [paymentRequestFor]);

  // VERIFY OTP
  const GetPhoneOTP = () => {
    setLoading(true);
    axios
      .get(`${HOST_URL}/get/mobile/otp/${paymentDetails.mobileNo}`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setOtp(response.data.otp);
          alert(
            `OTP has been sent your Register XXXX${paymentDetails.mobileNo.substring(
              6
            )}`
          );
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const VerifyOTP = () => {
    if (parseInt(Otp) === parseInt(inputOtp)) {
      alert("OTP verified successfully");
      setVerifiedOtp(true);
    } else {
      alert("Invalid OTP");
    }
  };

  const UpdateBookingFile = (printFileName) => {
    const updateBookingInput = {
      bookingRefId:
        paymentRequestFor === "Payment_PendingFor_NewBooking"
          ? bookingRefID
          : bookingRefNo,
      contentFor: `${paymentRequestFor}`,
      createdDate: currentDate,
      documentType: documentType,
      fileName: printFileName,
      fileSize: `${printFile.size}`,
      fileType: `${printFile.type}`,
      fileURL: `${FetchImg}${printFileName}`,
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
  const UploadPrintFile = () => {
    if (!printFile) {
      alert("Please Choose File");
    } else {
      setLoading(true);
      const formData = new FormData();
      const fileExtention = printFile.name.split(".");
      const printFileName = `${storeCode}-${paymentRequestFor}-${currentDate}-${RandomDigit}.${fileExtention[1]}`;
      setTnCFileName(printFileName);
      formData.append("ImgName", printFileName);
      formData.append("files", printFile);
      axios
        .post(`${UploadImg}`, formData, {
          headers: ImageHeaders,
        })
        .then((res) => res)
        .then((response) => {
          if (response.data) {
            UpdateBookingFile(printFileName);
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  };

  const UploadDlvrChalanimgDetails = (imgName) => {
    const DlvrChllanIputs = {
      bookingRefId: bookingRefNo,
      contentFor: paymentRequestFor,
      createdDate: moment().format("YYYY-MM-DD"),
      documentType: "DeliveryChallan",
      fileName: imgName,
      fileSize: `${deliveryChallan.size}`,
      fileType: `${deliveryChallan.type}`,
      fileURL: `${FetchImg}${imgName}`,
      updatedDate: null,
    };
    axios
      .post(`${HOST_URL}/insert/image/details`, DlvrChllanIputs)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          alert("Uploaded Succesfully");
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  const UploadDeliveryChallan = () => {
    if (deliveryChallan.length === 0) {
      alert("Please Choose File");
    } else {
      setLoading(true);
      const formData = new FormData();
      const fileExtention = deliveryChallan.name.split(".");
      const deliveryChallanFile = `${paymentRequestFor}-challan-${currentDate}-${RandomDigit}.${fileExtention[1]}`;
      formData.append("ImgName", deliveryChallanFile);
      formData.append("files", deliveryChallan);
      axios
        .post(`${UploadImg}`, formData, {
          headers: ImageHeaders,
        })
        .then((res) => res)
        .then((response) => {
          if (response.data) {
            UploadDlvrChalanimgDetails(deliveryChallanFile);
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  };
  const UpdLoadClsDetails = (imgName) => {
    const LoanCloserInputs = {
      bookingRefId: bookingRefNo,
      contentFor: paymentRequestFor,
      createdDate: moment().format("YYYY-MM-DD"),
      documentType: "LoanClosureDocument",
      fileName: imgName,
      fileSize: `${loanCloseFile.size}`,
      fileType: `${loanCloseFile.type}`,
      fileURL: `${FetchImg}${imgName}`,
      updatedDate: null,
    };
    axios
      .post(`${HOST_URL}/insert/image/details`, LoanCloserInputs)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          alert("Uploaded Succesfully");
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  const UploadLoanCloseFile = () => {
    if (!loanCloseFile) {
      alert("Please Choose File");
    } else {
      setLoading(true);
      const formData = new FormData();
      const fileEx = loanCloseFile.name.split(".");
      const fileName = `${storeCode}-${paymentRequestFor}-${currentDate}-${RandomDigit}.${fileEx[1]}`;
      setTnCFileName(fileName);
      formData.append("ImgName", fileName);
      formData.append("files", loanCloseFile);
      axios
        .post(`${UploadImg}`, formData, {
          headers: ImageHeaders,
        })
        .then((res) => res)
        .then((response) => {
          if (response.data) {
            UpdLoadClsDetails(fileName);
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  };

  const TnxStatusUpdate = (bookingId) => {
    axios
      .get(`${HOST_URL}/update/txn/status/${bookingId}/${bookedStatus}`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          Swal.fire({
            title: "Success",
            text: alertMessage,
            icon: "success",
            confirmButtonColor: "#008080",
            confirmButtonText: "OK",
          });
          ClearAllUIData();
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const CompletePayment = () => {
    const submitPaymentData = {
      bookingRefNo: !bookingGenNo ? bookingRefID : bookingGenNo,
      cashierName: cashierName,
      status: bookedStatus,
      tempRefNo: paymentDetails.tempBookingRef,
      tncFileName: tnCFileName,
    };
    axios
      .post(`${HOST_URL}/update/summary/table/atCashier`, submitPaymentData)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          UpdateBookingCalendar();
        }
      })
      .then((error) => {
        setLoading(false);
      });
  };

  const CallPaymentAPI = () => {
    setLoading(true);
    axios
      .post(`${HOST_URL}/insert/payment/details`, savePaymetRow)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          if (paymentRequestFor === "Payment_PendingFor_NewBooking") {
            CompletePayment();
          } else if (paymentRequestFor === "Payment_PendingFor_RentalReturn") {
            InsertInvoiceData(challanNo);
          } else if (
            paymentRequestFor === "Payment_PendingFor_RentalIssuance"
          ) {
            InsertInvoiceData(challanNo);
          }
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  const SubmitPayment = () => {
    if (paymentRequestFor === "Payment_PendingFor_RentalCancellation") {
      UpdateBookingCalendar();
    }
    if (
      paymentRequestFor === "Payment_PendingFor_NewBooking" ||
      paymentRequestFor === "Payment_PendingFor_RentalIssuance" ||
      paymentRequestFor === "Payment_PendingFor_RentalReturn"
    ) {
      if (parseFloat(collectedAmount) === TotalAmount) {
        CallPaymentAPI();
      } else {
        if (amontHeading === "Amount to be Refunded") {
          CallPaymentAPI();
        } else {
          alert(amontErrMassage);
        }
      }
    }
  };

  const SubmitPaymentDetails = () => {
    if (!cashierName) {
      alert("Please Enter Cashier Name");
    } else if (!tnCFileName) {
      alert("Please Upload Print File/PDF");
    } else if (!verifiedOtp) {
      alert("Please Verify OTP");
    } else {
      SubmitPayment();
    }
  };
  return (
    <div>
      <Navbar />
      {loading === true && <Loader />}
      <div className="row g-3 mt-3 mx-0">
        <div className="col-md-10">
          <input
            type="type"
            className="form-control"
            placeholder="Search By Customer Phone Number"
            maxLength={10}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="col-md-2 d-flex justify-content-end">
          <button
            type="button"
            className={`${searchValue.length < 10 ? "CDisabled" : "CButton"}`}
            disabled={searchValue.length < 10 ? true : false}
            onClick={GetPyamentDetials}
          >
            Search
          </button>
        </div>
        {getPaymentData.length > 0 && (
          <div className="table-responsive">
            <table className="table table-bordered border-dark text-center">
              <thead className="table-dark border-light">
                <tr>
                  <td>SELECT</td>
                  {PaymentHeading1.map((heading, i) => {
                    return <td key={i}>{heading}</td>;
                  })}
                </tr>
              </thead>
              <tbody>
                {getPaymentData.map((data, i) => {
                  return (
                    <tr key={i}>
                      <td className="text-center">
                        <input
                          className="form-check-input border-dark"
                          type="radio"
                          name="select"
                          onClick={() => OnSelectRow(data)}
                        />
                      </td>
                      <td>{data.customerName}</td>
                      <td>{data.mobileNo}</td>
                      <td>{data.paymentRequestFor}</td>
                      <td>
                        {Math.round(data.productValue).toLocaleString("en-IN")}
                      </td>
                      <td>
                        {Math.round(data.rentValue).toLocaleString("en-IN")}
                      </td>
                      <td>
                        {Math.round(data.depositValue).toLocaleString("en-IN")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {paymentDetails.bookingId && (
          <div className="row g-3 mt-1 mx-0">
            <div className="col-md-6">
              <label className="form-label" style={{ marginRight: "10px" }}>
                <b>
                  Rental Start Date :-
                  {moment(rentalStrDate[0]).format("DD-MM-YYYY")},
                </b>
              </label>
              <label className="form-label">
                <b>
                  Rental End Date :-
                  {moment(getReturnDate()).format("DD-MM-YYYY")}
                </b>
              </label>
            </div>
            {paymentRequestFor !== "Payment_PendingFor_RentalReturn" ? (
              ""
            ) : (
              <div className="d-flex col-md-10 justify-content-between">
                <div className="col-md-3 mt-0">
                  <label className="form-label">
                    <b>Damage Charges</b>
                  </label>
                  <h6>
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                      minimumFractionDigits: false,
                    }).format(totalDamageCharges)}
                  </h6>
                </div>
                <div className="col-md-3 mt-0">
                  <label className="form-label">
                    <b>Penalty Charges</b>
                  </label>
                  <h6>
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                      minimumFractionDigits: false,
                    }).format(totalPenaltyCharges)}
                  </h6>
                </div>
                <div className="col-md-3">
                  <label className="form-label">
                    <b>Discount Amount</b>
                  </label>
                  <h6>
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                      minimumFractionDigits: 2,
                    }).format(discountOnRentalCharges)}
                  </h6>
                </div>
              </div>
            )}
            <div className="col-md-6">
              <label className="form-label">
                <b>{amontHeading}</b>
              </label>
              <h6>
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  minimumFractionDigits: 2,
                }).format(collectedAmount)}
              </h6>
            </div>

            {amontHeading !== "Amount to be Refunded" && (
              <div className="col-12 table-responsive mx-0">
                <table className="table table-bordered table-hover border-dark text-center">
                  <thead className="table-dark border-light">
                    <tr>
                      {PaymentHeading2.map((heading, i) => {
                        return <td key={i}>{heading}</td>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {savePaymetRow.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td>{item.paymentFor}</td>
                          <td>{item.paymentType}</td>
                          <td>{item.txnRefNo}</td>
                          <td>
                            {new Intl.NumberFormat("en-IN", {
                              style: "currency",
                              currency: "INR",
                              minimumFractionDigits: 2,
                            }).format(item.amount)}
                          </td>
                          <td className="d-flex justify-content-between">
                            {item.fileName}
                          </td>
                          <td>
                            <BsFillTrashFill
                              onClick={() => DeletePaymentRow(item.id)}
                              style={{ cursor: "pointer", color: "red" }}
                            />
                          </td>
                        </tr>
                      );
                    })}
                    {savePaymetRow.length > 0 && (
                      <tr>
                        <th colSpan="3" className="text-end">
                          TOTAL
                        </th>
                        <th>
                          {new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                            minimumFractionDigits: 2,
                          }).format(TotalAmount)}
                        </th>
                        <td colSpan="2" />
                      </tr>
                    )}
                    {addPaymentRows.length > 0 && (
                      <tr>
                        <td>{paymentRequestFor}</td>
                        <td>
                          <select
                            className="form-control"
                            onChange={(e) => setPaymentType(e.target.value)}
                          >
                            <option value="">Select Type</option>
                            <option value="RTGS">RTGS</option>
                            <option value="AIRPAY">AIRPAY</option>
                            <option value="CC">CC</option>
                            <option value="HDFC">HDFC</option>
                          </select>
                        </td>
                        <td>
                          <input
                            className="form-control"
                            placeholder="Payment Ref No."
                            value={tnxRefNo}
                            onChange={(e) => setTnxRefNo(e.target.value.toUpperCase())}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Amount"
                            onChange={(e) => {
                              const amoutValie = parseFloat(
                                e.target.value
                              ).toFixed(2);
                              setAmount(amoutValie);
                            }}
                          />
                        </td>
                        <td className="d-flex">
                          <input
                            type="file"
                            accept=".png, .jpeg"
                            onChange={(e) => setFileUpload(e.target.files[0])}
                          />
                          <button
                            className="CButton mx-1"
                            onClick={UploadPaymentFile}
                          >
                            Upload
                          </button>
                        </td>
                        <td>
                          <BsFillTrashFill
                            onClick={() => setAddPaymentRows([])}
                            style={{ cursor: "pointer", color: "red" }}
                          />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
            {amontHeading !== "Amount to be Refunded" && (
              <div className="d-flex justify-content-end mt-0">
                {addPaymentRows.length > 0 ? (
                  <div className="d-flex justify-content-between w-100">
                    <b className="text-danger">
                      Note:- Please fill the all (*) marks filed
                    </b>
                    <button
                      type="submit"
                      className="CButton"
                      onClick={SavePaymentRow}
                    >
                      Save Payment
                    </button>
                  </div>
                ) : (
                  <div className="d-flex justify-content-between">
                    {savePaymetRow.length > 0 && (
                      <button
                        type="submit"
                        className="CancelButton mx-2"
                        onClick={() => setSavePaymetRow([])}
                      >
                        Cancel Payment
                      </button>
                    )}
                    <button
                      type="submit"
                      className={
                        TotalAmount === parseFloat(collectedAmount)
                          ? "CDisabled"
                          : "CButton"
                      }
                      disabled={
                        TotalAmount === parseFloat(collectedAmount)
                          ? true
                          : false
                      }
                      onClick={AddPaymentRows}
                    >
                      Add Payment
                    </button>
                  </div>
                )}
              </div>
            )}
            {paymentRequestFor === "Payment_PendingFor_NewBooking" && (
              <div className="">
                <div className="col-12 mb-0">
                  <h6 className="bookingHeading d-flex justify-content-between">
                    <span className="mt-1">Print Booking Confirmation</span>
                    {addedPdts.length > 0 && (
                      <BookingPdf
                        savePaymetRow={savePaymetRow}
                        existedUserData={existedUserData}
                        addedPdts={addedPdts}
                        bookingRefID={bookingRefID}
                        storeDetails={storeDetails}
                        regUserData={regUserData}
                        totalPaidAmount={totalPaidAmount}
                        paymentDetails={paymentDetails}
                      />
                    )}
                  </h6>
                </div>
                <div className="col-md-6">
                  <label className="form-label">
                    Upload Acknowledged Booking Receipt
                  </label>
                  <div className="d-flex">
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => setPrintFile(e.target.files[0])}
                    />
                    <button className="CButton mx-1" onClick={UploadPrintFile}>
                      Upload
                    </button>
                  </div>
                </div>
              </div>
            )}
            {paymentRequestFor === "Payment_PendingFor_RentalReturn" && (
              <div className="row g-2 mx-0">
                <div className="col-12 mb-0">
                  <h6 className="bookingHeading d-flex justify-content-between">
                    <span className="mt-1">Print - Service Invoice</span>
                    {addedPdts.length > 0 && (
                      <ServiceIvoicePdf
                        savePaymetRow={savePaymetRow}
                        existedUserData={existedUserData}
                        addedPdts={addedPdts}
                        bookingRefID={bookingGenNo}
                        storeDetails={storeDetails}
                        regUserData={regUserData}
                        discount={discountOnRentalCharges}
                        previousTnxData={previousTnxData}
                        invoiceNo={invoiceNo}
                      />
                    )}
                  </h6>
                </div>
                <div className="col-md-5">
                  <label className="form-label">Upload Service Invoice</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setPrintFile(e.target.files[0])}
                  />
                </div>
                <div className="col-md-1">
                  <br />
                  <button
                    className="CButton mt-2 mx-1"
                    onClick={UploadPrintFile}
                  >
                    Upload
                  </button>
                </div>
                <div className="col-md-5">
                  <label className="form-label">Loan Closure Document</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setLoanCloseFile(e.target.files[0])}
                  />
                </div>
                <div className="col-md-1">
                  <br />
                  <button
                    className="CButton mt-2 mx-1"
                    onClick={UploadLoanCloseFile}
                  >
                    Upload
                  </button>
                </div>
              </div>
            )}
            {paymentRequestFor === "Payment_PendingFor_RentalIssuance" && (
              <div className="row g-2 mx-0">
                <div className="col-12 mb-0">
                  <h6 className="bookingHeading d-flex justify-content-between">
                    <span className="mt-1">Print - Delivery Challan</span>
                    {addedPdts.length > 0 && (
                      <DeliveryChallanPdf
                        savePaymetRow={savePaymetRow}
                        existedUserData={existedUserData}
                        addedPdts={addedPdts}
                        paymentDetails={paymentDetails}
                        storeDetails={storeDetails}
                        regUserData={regUserData}
                        bookingRefID={bookingGenNo}
                        challanNo={challanNo}
                      />
                    )}
                  </h6>
                </div>
                <div className="input-group">
                  <div className="input-group-text">Loan Document Upload</div>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setPrintFile(e.target.files[0])}
                  />
                  <button className="CButton mx-1" onClick={UploadPrintFile}>
                    Upload
                  </button>
                </div>
                <div className="input-group">
                  <div className="input-group-text">
                    Acknowledged Delivery Challan
                  </div>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setDeliveryChallan(e.target.files[0])}
                  />
                  <button
                    className="CButton mx-1"
                    onClick={UploadDeliveryChallan}
                  >
                    Upload
                  </button>
                </div>
              </div>
            )}
            {paymentRequestFor === "Payment_PendingFor_RentalCancellation" && (
              <div>
                <div className="col-12 mb-0">
                  <h6 className="bookingHeading d-flex justify-content-between">
                    <span className="mt-1">Cancellation Invoice</span>
                    <CancelationPdf
                      savePaymetRow={savePaymetRow}
                      existedUserData={existedUserData}
                      addedPdts={addedPdts}
                      paymentDetails={paymentDetails}
                      storeDetails={storeDetails}
                      regUserData={regUserData}
                      genInvoiceNo={GenInvoiceNo}
                      totalPaidAmount={totalPaidAmount}
                    />
                  </h6>
                </div>
                <div className="input-group">
                  <div className="input-group-text">
                    Upload Cancellation Invoice
                  </div>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setPrintFile(e.target.files[0])}
                  />
                  <button className="CButton" onClick={UploadPrintFile}>
                    Upload
                  </button>
                </div>
              </div>
            )}
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                placeholder="Cashier Name"
                onChange={(e) => setCashierName(e.target.value)}
              />
            </div>
            <div className="col-md-1">
              <button className="CButton" onClick={GetPhoneOTP}>
                GET_OTP
              </button>
            </div>
            {Otp && (
              <div className="col-md-6">
                {!verifiedOtp ? (
                  <div className="d-flex">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="OTP"
                      onChange={(e) => setInputOtp(e.target.value)}
                    />
                    <button className="CButton mx-2" onClick={VerifyOTP}>
                      Verify
                    </button>
                  </div>
                ) : (
                  <p className="phoneVeryfiedStyle">OTP is Verified</p>
                )}
              </div>
            )}
            <div className="col-12 d-flex justify-content-end mb-4">
              <button className="CButton" onClick={SubmitPaymentDetails}>
                {paymentRequestFor ===
                  "Payment_PendingFor_RentalCancellation" && (
                    <span>Cancel Booking</span>
                  )}
                {paymentRequestFor === "Payment_PendingFor_RentalIssuance" && (
                  <span>Complete Product Delivery</span>
                )}
                {paymentRequestFor === "Payment_PendingFor_RentalReturn" && (
                  <span>Close Booking</span>
                )}
                {paymentRequestFor === "Payment_PendingFor_NewBooking" && (
                  <span>Complete Booking</span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CashierPaymentDetails;
