/* eslint-disable no-useless-escape */
import * as yup from "yup";

export const LoginInitialValue = {
  userName: "",
  password: "",
};

export const LoginSchema = yup.object({
  userName: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

// CHECK PRODUCTS  AVAIBLITY
export const CheckAvaiblityInitialValue = {
  itemCode: "",
  bookingDate: "",
  packageDays: "",
  customerType: "",
};

export const CheckAvaiblitySchema = yup.object({
  itemCode: yup
    .string()
    .required("Item Code is required")
    .min(14, "Invalid Item Code"),
  bookingDate: yup.string().required("Booking Date is required"),
  packageDays: yup.string().required("Package Days is required"),
  customerType: yup.string().required("Customer Type is required"),
});

export const ReportsInitialValue = {
  fromDate: "",
  toDate: "",
  storeCode: "",
};

export const ReportsSchema = yup.object({
  fromDate: yup.string().required("From Date is required"),
  toDate: yup.string().required("To Date is required"),
  storeCode: yup.string().required("Store Code is required"),
});

export const FilePopStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "50%",
  transform: "translate(-50%, -50%)",
};
