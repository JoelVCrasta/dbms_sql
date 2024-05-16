import React, { useState } from "react"

interface RegisterDetails {
  username: string
  email: string
  password: string
}

const Register: React.FC = () => {
  const [registerDetails, setRegisterDetails] = useState<RegisterDetails>({
    username: "",
    email: "",
    password: "",
  })

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(registerDetails)
  }

  return (
    <section className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="mb-4 text-2xl font-bold">Register</h1>
      <form
        onSubmit={handleRegister}
        className="p-4 flex flex-col border-2 border-black rounded-xl gap-y-4"
      >
        <input
          type="text"
          placeholder="Username"
          value={registerDetails.username}
          onChange={(e) =>
            setRegisterDetails({ ...registerDetails, username: e.target.value })
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
            setRegisterDetails({ ...registerDetails, password: e.target.value })
          }
          className="border-2 border-black p-2"
        />

        <button type="submit" className="text-white bg-black p-2">
          Login
        </button>
      </form>
    </section>
  )
}

export default Register
