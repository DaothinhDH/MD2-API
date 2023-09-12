import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { notification } from "antd";
import { resourceForm } from "../../resource/resourceVN";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleInputChange = (e) => {
    //lấy name và value từ input
    const { value, name } = e.target;

    //khi onChange gọi đến hàm validate
    validateData(name, value);

    //kiểm tra name và gán
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else {
      return;
    }
  };

  //hàm validate
  const validateData = (nameInput, valueInput) => {
    switch (nameInput) {
      case "email":
        if (!valueInput) {
          setEmailError(true);
        } else {
          setEmailError(false);
        }
        break;
      case "password":
        if (!valueInput) {
          setPasswordError(true);
        } else {
          setPasswordError(false);
        }
        break;
      default:
        break;
    }
  };

  //lấy giá trị từ input
  const handleSubmit = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    validateData("password", password);
    validateData("email", email);
    if (email && password) {
      const newUser = {
        email: email,
        password: password,
      };
      //gọi API đăng nhập
      axios
        .post("http://localhost:8000/login", newUser)
        .then((response) => {
          console.log(response.data);
          if (response.status === 200) {
            //lưu lên local
            localStorage.setItem(
              "userLogin",
              JSON.stringify(response.data.user)
            );
            //chuyển trang
            if (response.data.user.role == 0) {
              console.log("chuyển vào trang admin");
            } else {
              console.log("Chuyển vào trang người dùng");
            }
          }
        })
        .catch((error) => {
          if (
            error.response.data === "Incorrect password" ||
            error.response.data === "Cannot find user" ||
            error.response.data === "Password is too short"
          ) {
            notification.error({
              message: "Cảnh báo",
              description: "Mật khẩu hoặc Email không đúng",
            });
          }
        });
    }
  };

  return (
    <>
      <div className="container-login">
        <form className="form-login" onSubmit={handleSubmit}>
          <div className="d-flex justify-content-between align-items-center mb-4">
                      <h2>{resourceForm.headingLogin}</h2>
            <div className="btn btn-close"></div>
          </div>
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              placeholder="Nhập Email"
              className={`form-control ${emailError && "border-danger"}`}
              id="email"
              type="text"
              value={email}
              name="email"
              onChange={handleInputChange}
              onBlur={handleInputChange}
            ></input>
            {emailError && (
              <div className="text-err mb-1 text-danger">
                Email không được để trống
              </div>
            )}
          </div>
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              placeholder="Nhập Email"
              className={`form-control ${passwordError && "border-danger"}`}
              id="password"
              type="password"
              value={password}
              name="password"
              onChange={handleInputChange}
              onBlur={handleInputChange}
            ></input>
            {passwordError && (
              <div className="text-err mb-1 text-danger">
                Password không được để trống
              </div>
            )}
          </div>

          <div>
            <button style={{ width: "100%" }} className="btn btn-primary mt-4">
              Đăng nhập
            </button>
          </div>
          <div>
            <p className="p-2 text-center">
              Bạn đã đăng ký tài khoản?<a href="#">{resourceForm.headingRegister} </a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
