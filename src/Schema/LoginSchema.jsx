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
  // rsoName: yup.string().required("RSO Name Is required"),
});

export const FileInitialValue = {
  masterFile: "",
};
export const masterSchema = yup.object({
  masterFile: yup.string().required("File is required"),
});
