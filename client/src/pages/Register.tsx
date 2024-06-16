import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

interface RegisterDetails {
  username: string
  email: string
  password: string
}

const Register = () => {
  const navigate = useNavigate()

  const [registerDetails, setRegisterDetails] = useState<RegisterDetails>({
    username: "",
    email: "",
    password: "",
  })
  const [resMessage, setResMessage] = useState("")

  // Register user function
  const registerUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerDetails),
      })

      if (!response.ok && response.status === 500) {
        // check for server error
        throw new Error(`${response.status}`)
      }

      const data = await response.json()

      if (!data.success && response.status === 409) {
        // check for conflict
        setResMessage(data.message)
      } else {
        setResMessage(data.message) // set response message if successful
      }
    } catch (error) {
      console.error("Something went wrong : ", error)
    }
  }

  // Handle register form submission
  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    registerUser()
  }

  return (
    <section className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="mb-4 text-3xl text-white font-bold">Register</h1>

      <section className="p-4 w-72 border-2 border-white rounded-xl">
        <form onSubmit={handleRegister} className="flex flex-col gap-y-4">
          <p className="text-red-600">{resMessage}</p>

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
            className="border-2 p-2"
          />

          <input
            type="email"
            placeholder="Email"
            value={registerDetails.email}
            onChange={(e) =>
              setRegisterDetails({ ...registerDetails, email: e.target.value })
            }
            className="border-2 p-2"
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
            className="border-2 p-2"
          />

          <button type="submit" className="text-white bg-black p-2">
            Register
          </button>
        </form>

        {/* Buttom to go home */}
        <div className="mt-2 flex justify-center">
          <button
            type="submit"
            onClick={() => navigate("/")}
            className=" text-white hover:text-gray-300"
          >
            Go to Home
          </button>
        </div>
      </section>
    </section>
  )
}

export default Register
