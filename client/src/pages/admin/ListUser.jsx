import React, { useEffect, useState } from "react";
import axios from "axios";
import { notification } from "antd";
import FormAddUser from "../../components/admin/manager-user/FormAddUser";
import { formatDate } from "../../utils/fomatData";
import debounce from "lodash.debounce";
import Loading from "../../components/base/loading/Loading";

export default function ListUser() {
  const [users, setUsers] = useState([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  //gọi API lấy thông tin tất cả user
  const loadData = async () => {
    setShowLoading(true);
    axios
      .get(`http://localhost:8000/users?user_name_like=${searchText}`)
      .then((response) => setUsers(response.data))
      .catch((error) => {
        setShowLoading(true);
      });
    setShowLoading(false);
  };

  useEffect(() => {
    const delaySearch = debounce(loadData, 500); // đặt độ trể cho hàm search tính từ khi bỏ tay khỏi bàn phím
    delaySearch();

    return delaySearch.cancel; // hủy debounce khi không thực hiện chức năng search
  }, [searchText]);

  //hàm xóa
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/users/${id}`)
      .then((response) => {
        if (response.status === 200) {
          notification.success({
            message: "Thành công",
            description: "Xóa tài khoản thành công",
          });
          loadData();
        }
      })
      .catch((error) => console.log(error));
  };

  const handleShowFormAddUser = () => {
    setShowAddUser(true);
  };
  const handleCloseFormAddUser = () => {
    setShowAddUser(false);
  };
  return (
    <>
      {/* loading */}
      {showLoading && <Loading />}

      {/*  form thêm mới user*/}
      {showAddUser && (
        <FormAddUser
          handleCloseFormAddUser={handleCloseFormAddUser}
          loadData={loadData}
        />
      )}
      <div className="container mt-5">
        <div className="d-flex align-items-center justify-content-between">
          <button
            onClick={handleShowFormAddUser}
            className="btn btn-primary mb-3"
          >
            Thêm mới tài khoản
          </button>
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            placeholder="Tìm kiếm"
            className="form-control"
            style={{ width: 300, height: 36 }}
          />
        </div>
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên</th>
              <th>Giới tính</th>
              <th>Ngày sinh</th>
              <th>Địa chỉ</th>
              <th>Email</th>
              <th>Password</th>
              <th colSpan={2}>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.user_name}</td>
                <td>{user.gender === 0 ? "Nam" : "Nữ"}</td>
                <td>{formatDate(user.dateOfBirth)}</td>
                <td>{user.address}</td>
                <td>{user.email}</td>
                <td>*********</td>
                <td>
                  <button className="btn btn-warning"> Sửa</button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="btn btn-danger"
                  >
                    {" "}
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
