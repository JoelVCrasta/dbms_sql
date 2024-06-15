import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Home from "./Pages/Home"
import Dept from "./Pages/Dept"
import Employee from "./Pages/Employee"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/dept" Component={Dept} />
        <Route path="/employee" Component={Employee} />
      </Routes>
    </Router>
  )
}

export default App
