import { useState } from "react"

type DeptProps = {
  onAddSuccess: () => void
}

const AddEmp = ({ onAddSuccess }: DeptProps) => {
  const [empId, setEmpId] = useState<string>("")
  const [empName, setEmpName] = useState<string>("")
  const [empSalary, setEmpSalary] = useState<string>("")
  const [empDept, setEmpDept] = useState<string>("")

  // async function to add an employee in the database
  async function addDepartment() {
    const response = await fetch("http://localhost:3000/api/empadd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        empId: parseInt(empId),
        empName,
        empSalary,
        empDept: parseInt(empDept),
      }),
    })

    if (!response.ok && response.status === 500) {
      throw new Error(`ERROR: ${response.status}`)
    }

    const data = await response.json()

    if (data.success) {
      alert(data.message)
      onAddSuccess() // function to get the updated department details
    } else if (!data.success && response.status === 404) {
      alert(data.message)
    } else alert(data.message)
  }

  // function to check if any field is empty
  function checkEmpty() {
    if (empId === "" || empName === "" || empSalary === "" || empDept === "") {
      alert("Please fill all the fields")
      return
    }
  }

  // function to reset the fields
  function resetFields() {
    setEmpId("")
    setEmpName("")
    setEmpSalary("")
    setEmpDept("")
  }

  // function to handle the add employee button
  function handleAddEmployee() {
    checkEmpty()
    addDepartment()
    resetFields()
  }

  return (
    <section className="border-2 rounded-lg flex flex-col p-2">
      <h1 className="text-white text-xl font-semibold text-center mb-4">
        Add Employee
      </h1>

      <p className="text-white">ID</p>
      <input
        type="number"
        value={empId}
        onChange={(e) => setEmpId(e.target.value)}
        className="rounded-lg px-2 mb-4"
      />

      <p className="text-white">Employee Name</p>
      <input
        type="text"
        value={empName}
        onChange={(e) => setEmpName(e.target.value)}
        className="rounded-lg px-2 mb-4"
      />

      <p className="text-white">Salary</p>
      <input
        type="number"
        value={empSalary}
        onChange={(e) => setEmpSalary(e.target.value)}
        className="rounded-lg px-2 mb-4"
      />

      <p className="text-white">Dept ID</p>
      <input
        type="number"
        value={empDept}
        onChange={(e) => setEmpDept(e.target.value)}
        className="rounded-lg px-2 mb-4"
      />

      <button
        onClick={() => {
          handleAddEmployee()
        }}
        className="bg-white text-black font-semibold  h-8 rounded-lg mt-4"
      >
        Add
      </button>
    </section>
  )
}

export default AddEmp
