import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { useState, useEffect } from "react"
import Cookies from "js-cookie"

import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Home from "./Pages/Home"
import Chat from "./Pages/Chat"

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    const checkLoginStatus = () => {
      const isLogged = Cookies.get("isLogged")

      if (isLogged === "true") {
        setIsLoggedIn(true)
      }
    }

    checkLoginStatus()
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<Chat isLoggedIn={isLoggedIn} />} />
      </Routes>
    </Router>
  )
}

export default App
