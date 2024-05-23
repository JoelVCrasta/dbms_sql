import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

interface LoginDetails {
  email: string
  password: string
}

const Login: React.FC = () => {
  const navigate = useNavigate()

  const [loginDetails, setLoginDetails] = useState<LoginDetails>({
    email: "",
    password: "",
  })
  const [resMessage, setResMessage] = useState("")

  const loginUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDetails),
      })

      if (!response.ok && response.status === 500) {
        throw new Error(`ERROR: ${response.status}`)
      }

      const data = await response.json()

      if (!data.success || response.status === 401) {
        setResMessage(data.message)
      } else {
        navigate("/")
      }
    } catch (error) {
      console.error("Something went wrong : ", error)
    }
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    loginUser()
  }

  return (
    <section className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="mb-4 text-2xl font-bold">Login</h1>
      <section className="p-4 border-2 border-black rounded-xl ">
        <form onSubmit={handleLogin} className="flex flex-col gap-y-4">
          <p className="">{resMessage}</p>
          <input
            type="email"
            placeholder="Email"
            value={loginDetails.email}
            onChange={(e) =>
              setLoginDetails({ ...loginDetails, email: e.target.value })
            }
            className="border-2 border-black p-2"
          />

          <input
            type="password"
            placeholder="Password"
            value={loginDetails.password}
            onChange={(e) => {
              setLoginDetails({ ...loginDetails, password: e.target.value })
            }}
            className="border-2 border-black p-2"
          />

          <button type="submit" className="text-white bg-black p-2">
            Login
          </button>
        </form>
        <button
          type="submit"
          onClick={() => navigate("/")}
          className="mt-2 w-full text-black bg-white hover:text-gray-700"
        >
          Go to Home
        </button>
      </section>
    </section>
  )
}

export default Login
