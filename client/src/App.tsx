import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Home from "./Pages/Home"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
      </Routes>
    </Router>
  )
}

export default App
