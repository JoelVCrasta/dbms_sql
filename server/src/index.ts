import express from "express"
import session from "express-session"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import sequelize from "./Models/postgres"
import router from "./Routes/AuthRoutes"

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
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      sameSite: "none",
    },
  })
)

// Connect to the database
sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((error) => console.error("Unable to connect to the database:", error))

app.use("/api", router)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
