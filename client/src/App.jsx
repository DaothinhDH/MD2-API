import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ListProduct from './pages/product/ListProduct'
import ListUser from './components/admin/ListUser'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <ListProduct /> */}
      <ListUser/>
    </>
  );
}

export default App
