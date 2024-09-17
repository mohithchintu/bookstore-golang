import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import React from "react"
import Layout from "./components/Layout"
import Calendar from "./pages/Calendar"
import Register from "./pages/Register"
import Login from "./pages/Login"

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
