import { Router, Request, Response } from "express"

import Employee from "../Models/Employee"

const emprouter = Router()

emprouter.get("/emp", async (req: Request, res: Response) => {
  const empDetails = await Employee.findAll()

  try {
    res.status(200).json({ success: true, empDetails })
  } catch (error) {
    console.error("Something went wrong: ", error)
    res.status(500).json({ success: false, message: "Server error" })
  }
})

emprouter.post("/empadd", async (req: Request, res: Response) => {
  const { empId, empName, empSalary, empDept } = req.body

  const existingId = await Employee.findOne({ where: { id: empId } })

  if (existingId) {
    return res
      .status(409)
      .json({ success: false, message: "Employee ID already exists" })
  }

  try {
    await Employee.create({
      id: empId,
      name: empName,
      salary: empSalary,
      dept: empDept,
    })
    res.status(201).json({ success: true, message: "Employee added" })
  } catch (error) {
    console.error("Something went wrong: ", error)
    res.status(500).json({ success: false, message: "Server error" })
  }
})

export default emprouter
