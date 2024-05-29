import express from "express"
import session from "express-session"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import sequelize from "./Models/postgres"
import router from "./Routes/AuthRoutes"
import Users from "./Models/User"
import { cookie } from "./Utils/cookie"

const app = express()
dotenv.config()
app.use(express.json())
app.use(cookieParser())
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

app.use("/api", router)

app.get("/verify", async (req, res) => {
  const { email } = req.query

  const user = await Users.findOne({ where: { email } })

  if (user) {
    await Users.update({ confirmed: true }, { where: { email } })
    cookie(res)
    res.redirect("http://localhost:5173/")
  }
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
