import React, { useState, useEffect } from "react";
import "../Style/Login.css";
import { Field, Form, Formik } from "formik";
import { LoginInitialValue, LoginSchema } from "../Schema/LoginSchema";
import image from "../Asset/Img/Tanishq_LogoBlack.png";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { HOST_URL } from "../API/HostURL";
import ShowError from "../Schema/ShowError";
import { toast } from 'react-toastify';

const Login = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const onLogin = (payload) => {
    setLoading(true);
    axios.post(`${HOST_URL}/rental/login/portal`, payload)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          if (response.data.value.validityStatus === "Valid user") {
            if (response.data.value.role === "RSO") {
              localStorage.setItem("rsoRole", response.data.value.role);
              localStorage.setItem("storeCode", payload.userName);
              navigate("/home");
            } else if (response.data.value.role === "Admin") {
              localStorage.setItem("rsoRole", response.data.value.role);
              localStorage.setItem("storeCode", payload.userName);
              navigate("/admin/update/master/price");
            } else if (response.data.value.role === "Cashier") {
              const storeCode = payload.userName.substring(1, payload.userName.length);
              localStorage.setItem("storeCode", storeCode);
              localStorage.setItem("rsoRole", response.data.value.role);
              navigate("/cashier/payment");
            }
          } else if (response.data.value.validityStatus === "Invalid user") {
            toast.error("Please Enter Valid Username and Password", { theme: "colored", autoClose: 3000 });
          }
        } else if (response.data.code === "1001") {
          toast.error("Please Enter Valid Username and Password", { theme: "colored", autoClose: 3000 });
        }
        setLoading(false);
      }).catch((error) => {
        toast.error("Please Enter Valid Username and Password", { theme: "colored", autoClose: 3000 });
        setLoading(false);
      });
  };

  useEffect(() => {
    localStorage.clear();
    window.history.forward();
  }, []);

  return (
    <div>
      <div className="col RegisterLeftRight">
        <div className="Form_style">
          <div className="text-center" style={{ color: "#832729" }}>
            <img src={image} alt="tanishq" height="60" width="70" />
          </div>
          <Formik
            initialValues={LoginInitialValue}
            validationSchema={LoginSchema}
            onSubmit={(payload) => onLogin(payload)}
          >
            <Form>
              <div className="my-1">
                <b>
                  Username <span className="text-danger"> *</span>
                </b>
                <Field
                  placeholder="Username"
                  name="userName"
                  className="GInput"
                />
                <ShowError name="userName" />
              </div>
              <div className="my-2">
                <b>
                  Password <span className="text-danger"> *</span>
                </b>
                <div className="d-flex">
                  <Field
                    type={passwordShown ? "text" : "password"}
                    placeholder="Password"
                    className="GInput"
                    name="password"
                  />
                  <span className="border-bottom">
                    {passwordShown ? (
                      <FaRegEye
                        size={20}
                        cursor="pointer"
                        onClick={() => setPasswordShown(!passwordShown)}
                        style={{ marginTop: 15 }}
                      />
                    ) : (
                      <FaRegEyeSlash
                        size={20}
                        cursor="pointer"
                        onClick={() => setPasswordShown(!passwordShown)}
                        style={{ marginTop: 15 }}
                      />
                    )}
                  </span>
                </div>
                <ShowError name="password" />
              </div>
              <div className="d-flex justify-content-end mt-3">
                <button type="submit" className="CButton">
                  {loading ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    <span>LOGIN</span>
                  )}
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};
export default Login;
