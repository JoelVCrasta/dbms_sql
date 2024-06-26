import { Router, Request, Response } from "express"
import Employee from "../Models/Employee"
import Dept from "../Models/Dept"

const emprouter = Router() // Initialize express router

// function to check if the department ID exists
async function checkDeptIDExists(id: number) {
  return await Dept.findOne({ where: { id } })
}

// Route to send the employee details
emprouter.get("/emp", async (req: Request, res: Response) => {
  const empDetails = await Employee.findAll() // fetch all employee details

  try {
    res.status(200).json({ success: true, empDetails })
  } catch (error) {
    console.error("Something went wrong: ", error)
    res.status(500).json({ success: false, message: "Server error" })
  }
})

// Route to add an employee
emprouter.post("/empadd", async (req: Request, res: Response) => {
  const { empId, empName, empSalary, empDept } = req.body

  const existingId = await Employee.findOne({ where: { id: empId } }) // check if the employee ID exists

  if (existingId) {
    return res
      .status(409)
      .json({ success: false, message: "Employee ID already exists" })
  }

  const deptExists = await checkDeptIDExists(empDept) // check if the department ID exists
  if (!deptExists) {
    return res
      .status(404)
      .json({ success: false, message: "Department ID does not exist" })
  }

  try {
    await Employee.create({
      id: empId,
      name: empName,
      salary: empSalary,
      dept: empDept,
    }) // create a new employee
    res.status(201).json({ success: true, message: "Employee added" })
  } catch (error) {
    console.error("Something went wrong: ", error)
    res.status(500).json({ success: false, message: "Server error" })
  }
})

// Route to update an employee
emprouter.put("/empupdate", async (req: Request, res: Response) => {
  const { empId, empName, empSalary, empDept } = req.body

  const existingId = await Employee.findOne({ where: { id: empId } }) // check if the employee ID exists
  if (!existingId) {
    return res
      .status(404)
      .json({ success: false, message: "Employee ID does not exist" })
  }

  const deptExists = await checkDeptIDExists(empDept) // check if the department ID exists
  if (!deptExists) {
    return res
      .status(404)
      .json({ success: false, message: "Department ID does not exist" })
  }

  try {
    await Employee.update(
      { name: empName, salary: empSalary, dept: empDept },
      { where: { id: empId } } // update the employee details
    )
    res.status(200).json({ success: true, message: "Employee updated" })
  } catch (error) {
    console.error("Something went wrong: ", error)
    res.status(500).json({ success: false, message: "Server error" })
  }
})

// Route for deleting employee
emprouter.delete("/empdelete", async (req: Request, res: Response) => {
  const { empids } = req.body

  try {
    await Employee.destroy({ where: { id: empids } }) // delete employee(s)
    res.status(200).json({ success: true, message: "Employee(s) deleted" })
  } catch (error) {
    console.error("Something went wrong: ", error)
    res.status(500).json({ success: false, message: "Server error" })
  }
})

export default emprouter
