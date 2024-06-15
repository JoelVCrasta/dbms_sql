import { Router, Request, Response } from "express"

import Dept from "../Models/Dept"


const oprouter = Router()

oprouter.get("/dept", async (req: Request, res: Response) => {
  const deptDetails = await Dept.findAll({ order: [["id", "ASC"]] })

  try {
    res.status(200).json({ success: true, deptDetails })
  } catch (error) {
    console.error("Something went wrong: ", error)
    res.status(500).json({ success: false, message: "Server error" })
  }
})

oprouter.post("/deptadd", async (req: Request, res: Response) => {
  const { deptId, deptName } = req.body

  const existingId = await Dept.findOne({ where: { id: deptId } })

  if (existingId) {
    return res
      .status(409)
      .json({ success: false, message: "Department ID already exists" })
  }

  try {
    await Dept.create({ id: deptId, dept_name: deptName })
    res.status(201).json({ success: true, message: "Department added" })
  } catch (error) {
    console.error("Something went wrong: ", error)
    res.status(500).json({ success: false, message: "Server error" })
  }
})

oprouter.post("/deptupdate", async (req: Request, res: Response) => {
  const { deptId, deptName } = req.body

  const existingId = await Dept.findOne({ where: { id: deptId } })

  if (!existingId) {
    return res
      .status(404)
      .json({ success: false, message: "Department ID not found" })
  }

  try {
    await Dept.update({ dept_name: deptName }, { where: { id: deptId } })
    res.status(201).json({ success: true, message: "Department updated" })
  } catch (error) {
    console.error("Something went wrong: ", error)
    res.status(500).json({ success: false, message: "Server error" })
  }
})

oprouter.delete("/deptdelete", async (req: Request, res: Response) => {
  const deptIds = req.body.deptIds
  console.log(deptIds)

  try {
    await Dept.destroy({ where: { id: deptIds } })

    res.status(200).json({ success: true, message: "Departments deleted" })
  } catch (error) {
    console.error("Something went wrong: ", error)
    res.status(500).json({ success: false, message: "Server error" })
  }
})

export default oprouter
