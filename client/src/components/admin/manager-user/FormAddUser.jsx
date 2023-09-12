import React, { useState } from "react";
import "./form.css";
import axios from "axios";
import { notification } from "antd";
import { validateEmail } from "../../../utils/validateData";

export default function FormAddUser({ handleCloseFormAddUser, loadData }) {
  const [gender, setGender] = useState(0);

  const [user, setUser] = useState({
    user_name: "",
    gender: "",
    address: "",
    dateOfBirth: "",
    email: "",
    password: "",
  });
  //danh sách gender
  const listGender = [
    {
      id: 0,
      title: "Nam",
    },
    {
      id: 1,
      title: "Nữ",
    },
    {
      id: 2,
      title: "Khác",
    },
  ];

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.user_name) {
      notification.error({
        message: "Cảnh báo",
        description: "Tên tài khoản không được để trống",
      });
    } else if (!user.email) {
      notification.error({
        message: "Cảnh báo",
        description: "Email không được để trống",
      });
    } else if (!user.password) {
      notification.error({
        message: "Cảnh báo",
        description: "Mật khẩu không được để trống",
      });
    } else if (!validateEmail(user.email)) {
      notification.error({
        message: "cảnh báo",
        description: "Email không đúng định dạng",
      });
    } else {
      axios
        .post("http://localhost:8000/users", { ...user, gender: gender })
        .then((response) => {
          if (response.status === 201) {
            notification.success({
              message: "Thành công",
              description: "Thêm mới thành công",
            });
            handleCloseFormAddUser();
            loadData();
          }
        })
        .catch((error) => {
          if (error.response.data === "Email already exists") {
            notification.error({
              message: "Cảnh báo",
              description: "Email đã tồn tại trong hệ thống",
            });
          } else {
            notification.error({
              message: "Cảnh báo",
              description: "Lỗi hệ thống",
            });
          }
        });
    }
  };
  return (
    <>
      <div className="container-1">
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="d-flex align-items-center justify-content-between">
            <h3>Thêm mới tài khoản</h3>
            <button
              onClick={handleCloseFormAddUser}
              type="button"
              className="btn btn-secondary"
            >
              X
            </button>
          </div>
          <div className="mb-3">
            <label className="form-label">
              Tên
              <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="user_name"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Ngày sinh</label>
            <input
              type="date"
              className="form-control"
              name="dateOfBirth"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Địa chỉ</label>
            <input
              type="text"
              className="form-control"
              name="address"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              Email
              <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Giới tính</label>
            <div className="d-flex gap-3">
              {listGender.map((g) => (
                <div key={g.id} className="form-check">
                  <input
                    onChange={() => setGender(g.id)}
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    checked={g.id === gender}
                  />
                  <label className="form-check-label">{g.title}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">
              Mật khẩu
              <span className="text-danger">*</span>
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <button
              onClick={handleCloseFormAddUser}
              type="submit"
              className="btn btn-secondary"
            >
              Hủy
            </button>
            <button type="submit" className="btn btn-primary">
              Lưu
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
