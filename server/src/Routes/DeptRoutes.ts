import { Router, Request, Response } from "express"

import Dept from "../Models/Dept"

const oprouter = Router() // Initialize express router

// Route for fetching department details
oprouter.get("/dept", async (req: Request, res: Response) => {
  const deptDetails = await Dept.findAll({ order: [["id", "ASC"]] }) // Fetch all departments in ascending order of ID

  try {
    res.status(200).json({ success: true, deptDetails })
  } catch (error) {
    console.error("Something went wrong: ", error)
    res.status(500).json({ success: false, message: "Server error" })
  }
})

// Route for adding department
oprouter.post("/deptadd", async (req: Request, res: Response) => {
  const { deptId, deptName } = req.body

  const existingId = await Dept.findOne({ where: { id: deptId } }) // Check if department ID already exists

  // If department ID already exists, return false
  if (existingId) {
    return res
      .status(409)
      .json({ success: false, message: "Department ID already exists" })
  }

  try {
    await Dept.create({ id: deptId, dept_name: deptName }) // Create new department
    res.status(201).json({ success: true, message: "Department added" })
  } catch (error) {
    console.error("Something went wrong: ", error)
    res.status(500).json({ success: false, message: "Server error" })
  }
})

// Route for updating department
oprouter.put("/deptupdate", async (req: Request, res: Response) => {
  const { deptId, deptName } = req.body

  const existingId = await Dept.findOne({ where: { id: deptId } }) // Check if department ID exists

  // If department ID does not exist, return false
  if (!existingId) {
    return res
      .status(404)
      .json({ success: false, message: "Department ID not found" })
  }

  try {
    await Dept.update({ dept_name: deptName }, { where: { id: deptId } }) // Update department
    res.status(201).json({ success: true, message: "Department updated" })
  } catch (error) {
    console.error("Something went wrong: ", error)
    res.status(500).json({ success: false, message: "Server error" })
  }
})

// Route for deleting department
oprouter.delete("/deptdelete", async (req: Request, res: Response) => {
  const deptIds = req.body.deptIds

  try {
    await Dept.destroy({ where: { id: deptIds } }) // Delete department(s)

    res.status(200).json({ success: true, message: "Department(s) deleted" })
  } catch (error) {
    console.error("Something went wrong: ", error)
    res.status(500).json({ success: false, message: "Server error" })
  }
})

export default oprouter
