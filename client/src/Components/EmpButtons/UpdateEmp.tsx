import { useState } from "react"

type DeptProps = {
  onUpdateSuccess: () => void
}

const UpdateEmp = ({ onUpdateSuccess }: DeptProps) => {
  const [empId, setEmpId] = useState<string>("")
  const [empName, setEmpName] = useState<string>("")
  const [empSalary, setEmpSalary] = useState<string>("")
  const [empDept, setEmpDept] = useState<string>("")

  // function to update the department
  async function updateDepartment() {
    const response = await fetch("http://localhost:3000/api/empupdate", {
      method: "PUT",
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
      onUpdateSuccess()
    } else {
      alert(data.message)
    }
  }

  // function to check if any field is empty
  function checkEmpty() {
    if (empId === "" || empName === "" || empSalary === "" || empDept === "") {
      alert("Please fill all the fields")
      return
    }
  }

  // function to handle update
  function handleUpdateDept() {
    checkEmpty()
    updateDepartment()
    resetFields()
  }

  // function to reset the fields
  function resetFields() {
    setEmpId("")
    setEmpName("")
    setEmpSalary("")
    setEmpDept("")
  }

  return (
    <section className="border-2 rounded-lg flex flex-col p-2">
      <h1 className="text-white text-xl font-semibold text-center mb-4">
        Update Department
      </h1>

      <p className="text-white">Enter ID to update</p>
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

      <p className="text-white">Department ID</p>
      <input
        type="number"
        value={empDept}
        onChange={(e) => setEmpDept(e.target.value)}
        className="rounded-lg px-2 mb-4"
      />

      {/* handles update when button is clicked */}
      <button
        onClick={() => {
          handleUpdateDept()
        }}
        className="bg-white text-black font-semibold  h-8 rounded-lg mt-4"
      >
        Update
      </button>
    </section>
  )
}

export default UpdateEmp
