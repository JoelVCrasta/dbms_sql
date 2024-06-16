import express from "express"
import { Request, Response } from "express"

import { userLogin, userRegister } from "../Controllers/AuthController"
import { sendEmail } from "../Utils/emailVerify"
import { cookie } from "../Utils/cookie"

const router = express.Router() // Initialize express router

interface LoginRequest {
  email: string
  password: string
}

interface RegisterRequest {
  username: string
  email: string
  password: string
}

// Route for user login
router.post(
  "/login",
  async (req: Request<{}, {}, LoginRequest>, res: Response) => {
    const { email, password } = req.body

    try {
      const user = await userLogin(email, password) // Call userLogin controller

      if (user) {
        cookie(res) // Set cookie

        res.status(200).json({ success: true, message: "Login successful" })
      } else {
        res
          .status(401)
          .json({ success: false, message: "Incorrect Email or Password" })
      }
    } catch (error) {
      console.error("Something went wrong: ", error)
      res.status(500).json({ success: false, message: "Server error" })
    }
  }
)

// Route for user registration
router.post(
  "/register",
  async (req: Request<{}, {}, RegisterRequest>, res: Response) => {
    const { username, email, password } = req.body

    const user = await userRegister(username, email, password) // Call userRegister controller

    try {
      if (user === 0) {
        await sendEmail(email) // Send verification email

        res
          .status(201)
          .json({ success: true, message: "Check email for verification" })
      } else if (user === 1) {
        res
          .status(409)
          .json({ success: false, message: "Email already exists" })
      } else {
        res
          .status(409)
          .json({ success: false, message: "Username already exists" })
      }
    } catch (error) {
      console.error("Something went wrong: ", error)
      res.status(500).json({ success: false, message: "Server error" })
    }
  }
)

export default router
