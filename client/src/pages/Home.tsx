import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import Cookies from "js-cookie"

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkLoginStatus = () => {
      const isLogged = Cookies.get("isLogged")

      if (isLogged === "true") {
        setIsLoggedIn(true)
      }
    }

    checkLoginStatus()
  }, [])

  const handleLogout = () => {
    Cookies.remove("isLogged")
    setIsLoggedIn(false)
  }

  return (
    <section className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="mb-4 text-4xl text-white font-bold">DBMS</h1>

      <section className="flex  text-2xl font-semibold gap-5">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-white h-12 w-32 rounded-full"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="flex justify-center bg-white h-12 w-32 rounded-full"
          >
            <button>Login</button>
          </Link>
        )}

        <Link
          to="/register"
          className="flex justify-center bg-white h-12 w-32 rounded-full"
        >
          <button>Register</button>
        </Link>
      </section>

      {/* {isLoggedIn && (
        <Link to="/chat" className="text-white text-3xl bg-black py-1 px-4">
          Go to Chat
        </Link>
      )} */}
    </section>
  )
}

export default Home
