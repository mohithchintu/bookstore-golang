import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import React from "react"
import Layout from "./components/Layout"
import Book from "./pages/Book"
import Addbook from "./pages/Addbook"
import UpdateQuantity from "./pages/Updatequantity"

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Book />} />
          <Route path="/add" element={<Addbook />} />
          <Route path="/update" element={<UpdateQuantity />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
