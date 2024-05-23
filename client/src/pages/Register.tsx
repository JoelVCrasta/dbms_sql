import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

interface RegisterDetails {
  username: string
  email: string
  password: string
}

const Register: React.FC = () => {
  const navigate = useNavigate()

  const [registerDetails, setRegisterDetails] = useState<RegisterDetails>({
    username: "",
    email: "",
    password: "",
  })
  const [resMessage, setResMessage] = useState("")

  const registerUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerDetails),
      })

      if (!response.ok || response.status === 500) {
        throw new Error(`ERROR: ${response.status}`)
      }

      const data = await response.json()

      if (!data.success || response.status === 409) {
        setResMessage(data.message)
      } else {
        navigate("/")
      }
    } catch (error) {
      console.error("Something went wrong : ", error)
    }
  }

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    registerUser()
  }

  return (
    <section className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="mb-4 text-2xl font-bold">Register</h1>
      <section className="p-4 border-2 border-black rounded-xl">
        <form onSubmit={handleRegister} className="flex flex-col gap-y-4">
          <input
            type="text"
            placeholder="Username"
            value={registerDetails.username}
            onChange={(e) =>
              setRegisterDetails({
                ...registerDetails,
                username: e.target.value,
              })
            }
            className="border-2 border-black p-2"
          />

          <input
            type="email"
            placeholder="Email"
            value={registerDetails.email}
            onChange={(e) =>
              setRegisterDetails({ ...registerDetails, email: e.target.value })
            }
            className="border-2 border-black p-2"
          />

          <input
            type="password"
            placeholder="Password"
            value={registerDetails.password}
            onChange={(e) =>
              setRegisterDetails({
                ...registerDetails,
                password: e.target.value,
              })
            }
            className="border-2 border-black p-2"
          />

          <button type="submit" className="text-white bg-black p-2">
            Register
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

export default Register
