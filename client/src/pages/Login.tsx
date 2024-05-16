import React, { useState } from "react"

interface LoginDetails {
  email: string
  password: string
}

const Login: React.FC = () => {
  const [loginDetails, setLoginDetails] = useState<LoginDetails>({
    email: "",
    password: "",
  })

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDetails),
      })

      if (!response.ok) {
        throw new Error("Failed to login")
      }

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.message)
      }
    } catch (error) {
      console.error("Something went wrong : ", error)
    }
  }

  return (
    <section className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="mb-4 text-2xl font-bold">Login</h1>
      <form
        onSubmit={handleLogin}
        className="p-4 flex flex-col border-2 border-black rounded-xl gap-y-4"
      >
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
    </section>
  )
}

export default Login
