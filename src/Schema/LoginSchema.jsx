/* eslint-disable no-useless-escape */
import * as yup from "yup";

export const LoginInitialValue = {
  userName: "",
  password: "",
  // rsoName: "",
};

export const LoginSchema = yup.object({
  userName: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
  // rsoName: yup.string().required("RSO Name is required"),
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
