import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Home from "./Pages/Home"
import Dept from "./Pages/Dept"

const App = () => {
  const theme = {
    styles: {
      global: {
        body: {
          bg: "#2f2d2e",
        },
      },
    },
  }

  return (
    <Router>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/dept" Component={Dept} />
      </Routes>
    </Router>
  )
}

export default App
