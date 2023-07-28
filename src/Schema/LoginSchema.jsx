/* eslint-disable no-useless-escape */
import * as yup from "yup";

export const LoginInitialValue = {
  userName: "",
  password: "",
  //   rsoName: "",
};

export const LoginSchema = yup.object({
  userName: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
  //   rsoName: yup.string().required("RSO Name Is required"),
});

//   <div className="my-2">
//     <b>
//       RSO Name <span className="text-danger"> *</span>
//     </b>
//     <Field placeholder="RSO Name" className="GInput" name="rsoName" />
//     <ShowError name="rsoName" />
//   </div>;
