import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ListUser() {
  const [users, setUsers] = useState([]);
  // gọi API lấy thông tin tất cả user
  const loadData = () => {
    axios
      .get("http://localhost:8000/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loadData();
  }, []);

  // ham delete
  const handleDelete = (id) => { 
    axios
      .delete(`http://localhost:8000/users/${id}`)
      .then((response) => {
        if (response.status === 200) { 
          notification.success({
            message: "thành công",
            description: "Xóa thành công",
          });
          loadData();
        }
      })
    .catch((error) => console.log(error));

  }
  // hien thi form them moi
  const handleShowAdd = (id) => { 
    setShowForm(true);
  }
  return (
    <>
      <div className="container mt-5">
        <button className="btn btn-primary m-3">Thêm mới tài khoản</button>
        <table className="table table-borderred table-hover table-striped">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên</th>
              <th>Giới tính</th>
              <th>Ngày sinh</th>
              <th>Địa Chỉ</th>
              <th>Email</th>
              <th>Password</th>
              <th colSpan={2} className="text-center">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.user_name} </td>
                <td>{user.geder === 0 ? "Nam" : "Nữ  "} </td>
                <td>{user.dateOfBirth} </td>
                <td>{user.address} </td>
                <td>{user.email} </td>
                <td>
                  <button className="btn btn-danger">Sửa</button>
                </td>
                <td>
                  <button onClick={()=>handleDelete(user.id)} className="btn btn-warning">xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
