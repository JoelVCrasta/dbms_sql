import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import sequelize from "./Models/postgres"
import router from "./Routes/AuthRoutes"
import oprouter from "./Routes/DeptRoutes"
import emprouter from "./Routes/EmpRoutes"
import Users from "./Models/User"
import { cookie } from "./Utils/cookie"

const app = express() // Initialize express
dotenv.config() // Initialize dotenv
app.use(express.json()) // Parse JSON bodies
app.use(cookieParser()) // Parse cookies

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
)

// Connect to the database
sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((error) => console.error("Unable to connect to the database:", error))

// Routes
app.use("/api", router)
app.use("/api", oprouter)
app.use("/api", emprouter)

// verify email
app.get("/verify", async (req, res) => {
  const { email } = req.query

  const user = await Users.findOne({ where: { email } }) // check if user exists

  if (user) {
    await Users.update({ confirmed: true }, { where: { email } }) // update user's confirmed status
    cookie(res)
    res.redirect("http://localhost:5173/") // redirect to home page
  }
})

// run server on port 3000
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
