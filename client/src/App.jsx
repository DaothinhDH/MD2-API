import { useState } from "react";
import "./App.css";
import ListProduct from "./pages/product/ListProduct";
import ListUser from "./pages/admin/ListUser";
import Login from "./pages/login/login";
import Register from "./pages/register/Register";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <ListProduct /> */}
      {/* <ListUser/> */}
      {/* <Login/> */}
      <Register/>
    </>
  );
}

export default App;
