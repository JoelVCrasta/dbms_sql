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
      <h1 className="mb-4 text-xl font-bold">OpenChat</h1>

      <section className="h-16 ">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="text-white bg-black py-1 px-4 mr-2"
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="text-white bg-black py-1 px-4 mr-2">
            Login
          </Link>
        )}

        <Link to="/register" className="text-white bg-black py-1 px-4 ">
          Register
        </Link>
      </section>

      {isLoggedIn && (
        <Link to="/chat" className="text-white text-3xl bg-black py-1 px-4">
          Go to Chat
        </Link>
      )}
    </section>
  )
}

export default Home
