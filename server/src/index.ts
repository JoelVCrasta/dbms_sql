import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

const app = express()
app.use(express.json(), cors())

app.post("/api/login", (req, res) => {
  const { email, password } = req.body

  console.log(email, password)

  if (req.body) {
    res.status(200).json({ success: true, message: "Login successful" })
  } else {
    res.status(400).json({ success: false, message: "Login failed" })
  }
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
