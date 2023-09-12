import React, { useEffect, useState } from "react";
import { formatMoney } from "../../utils/fomatData";
import FormEdit from "../../components/admin/manager-product/FormEdit";
import FormAdd from "../../components/admin/manager-product/FormAdd";

export default function ListProduct() {
  // gọi API lấy thông tin tất cả san phẩm
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showFormEdit, setShowFormEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(null);
  console.log(products);
  const loadData = () => {
    fetch("http://localhost:8000/products")
      .then((response) => response.json())
      .then((response) => setProducts(response))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loadData();
  }, []);
  /**
   * hàm xóa thông tin một products theo id
   * @param {*} id id của product cần xóa
   * author:DHT 11/9/023
   */
  const handleDelete = (id) => {
    fetch(`http://localhost:8000/products/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) {
          loadData();
        }
      })
      .catch((error) => console.log(error));
  };

  //  hàm hiển thị form thêm mới sản phẩm
  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  }

  //  hiển thị form edit 
  const handleEdit = (productId) => {
    setShowFormEdit(true); // hiển thị form edit
    setIdEdit(productId); // lấy ra id cần edit
   }

  const handleCloseEdit = () => {
    setShowFormEdit(false);
   }
  return (
    <>
      {/* form thêm mới sản phẩm */}
      {showForm && (
        <FormAdd handleCloseForm={handleCloseForm} loadData={loadData} />
      )}

      {/* form sửa thông tin edit */}
      {showFormEdit && <FormEdit idEdit={idEdit} loadData={loadData} handleCloseEdit={handleCloseEdit} />}

      <div className="w-200">
        <div>
          <button className="btn btn-primary" onClick={handleShowForm}>
            Thêm mới sản phẩm
          </button>
        </div>
        <table className="table table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Tên sản phẩm</th>
              <th scope="col">Giá</th>
              <th scope="col">Xuất xứ</th>
              <th scope="col" colSpan={2}>
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.product_name}</td>
                <td>{formatMoney(product.price)}</td>
                <td>{product.from}</td>
                <td>
                  <button
                    onClick={() => handleEdit(product.id)}
                    className="btn btn-warning"
                  >
                    Sửa
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(product.id)}
                  >
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
