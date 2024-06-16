import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import Cookies from "js-cookie"

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Check if cookie for login status exists
  useEffect(() => {
    const checkLoginStatus = () => {
      const isLogged = Cookies.get("isLogged")

      if (isLogged === "true") {
        setIsLoggedIn(true) // set login status to true
      }
    }

    checkLoginStatus()
  }, [])

  // Handle logout function
  const handleLogout = () => {
    Cookies.remove("isLogged")
    setIsLoggedIn(false)
  }

  return (
    <section className="w-full h-screen flex flex-col justify-center items-center gap-y-4 ">
      <h1 className="mb-4 text-4xl text-white font-bold">Company DBMS</h1>

      <section className="flex text-2xl font-semibold gap-5">
        {isLoggedIn ? ( // check if user is logged in
          <button
            onClick={handleLogout}
            className="bg-white h-12 w-52 rounded-lg"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="flex justify-center bg-white h-12 w-32 rounded-lg"
            >
              <button>Login</button>
            </Link>

            <Link
              to="/register"
              className="flex justify-center bg-white h-12 w-32 rounded-lg"
            >
              <button>Register</button>
            </Link>
          </>
        )}
      </section>

      {isLoggedIn && ( // show navigation buttons if user is logged in
        <div className="w-[400px] h-[80px] flex justify-around items-center font-xl">
          <Link
            to="/dept"
            className="flex justify-center rounded-lg w-[180px] h-[50px] text-2xl font-semibold text-black bg-white hover:bg-[#2f2d2e] hover:text-white hover:border-2 transition-all duration-100 ease-in-out"
          >
            <button>Departments</button>
          </Link>

          <Link
            to="/employee"
            className="flex justify-center items-center rounded-lg w-[180px] h-[50px] text-2xl font-semibold text-black bg-white hover:bg-[#2f2d2e] hover:text-white hover:border-2 transition-all duration-100 ease-in-out"
          >
            Employees
          </Link>
        </div>
      )}
    </section>
  )
}

export default Home
