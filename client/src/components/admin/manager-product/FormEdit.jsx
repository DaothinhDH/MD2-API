import React, { useEffect, useState } from "react";
import { notification } from "antd";

export default function FormEdit({ idEdit, handleCloseEdit, loadData }) {
  const [product, setProduct] = useState({
    product_name: "",
    price: 0,
    from: "",
  });
  // hàm lấy giá trị từ ô input
  const handleChange = (e) => {
    const { value, name } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };
  // gọi API lấy thông tin sản phẩm theo id
  useEffect(() => {
    //call API
    fetch(`http://localhost:8000/products/${idEdit}`)
      .then((response) => response.json()) //ép kiểu về dạng json
      .then((response) => setProduct(response)) // lấy dữ liệu
      .catch((error) => console.log(error)); //bắt lỗi
  }, []);

  // hàm thêm mới
  const handleSubmit = (e) => {
    e.preventDefault();
    // Gọi API để thêm mới sản phẩm
    fetch(`http://localhost:8000/products/${idEdit}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...product, price: parseInt(product.price) }),
    })
      .then((response) => {
        // kiểm tra dữ liệu tả về
        if (response.status === 200) {
          //  hiển thị notification
          // ẩn form thêm mới
          notification.success({
            message: "Thêm mới thành công",
            description: "Thêm mới thành công",
          });
          handleCloseEdit();
          loadData();
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="product-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="product_name" className="form-label">
            Tên sản phẩm
          </label>
          <input
            onChange={handleChange}
            type="text"
            className="form-control"
            id="productName"
            name="product_name"
            value={product.product_name}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Giá
          </label>
          <input
            onChange={handleChange}
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={product.price}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="from" className="form-label">
            Xuất xứ
          </label>
          <input
            onChange={handleChange}
            type="text"
            className="form-control"
            id="from"
            name="from"
            value={product.from}
          />
        </div>
        <div className="">
          <button type="submit" className="btn btn-primary">
            Thêm mới
          </button>
          <button onClick={handleCloseEdit} type="button" className="btn btn-danger">
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}
