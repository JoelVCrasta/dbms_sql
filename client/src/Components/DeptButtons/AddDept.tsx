import { useState } from "react"

type DeptProps = {
  onAddSuccess: () => void
}

const AddDept = ({ onAddSuccess }: DeptProps) => {
  const [deptId, setdeptId] = useState<string>("")
  const [deptName, setDeptName] = useState<string>("")

  async function addDepartment() {
    const response = await fetch("http://localhost:3000/api/deptadd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ deptId: parseInt(deptId), deptName }),
    })

    if (!response.ok && response.status === 500) {
      throw new Error(`ERROR: ${response.status}`)
    }

    const data = await response.json()

    if (data.success) {
      alert(data.message)
      onAddSuccess()
    } else {
      alert(data.message)
    }

    resetFields()
  }

  // function to check if any field is empty
  function checkEmpty() {
    if (deptId === "" || deptName === "") {
      alert("Please fill all the fields")
      return
    }
  }

  // function to handle the add department button
  function handleAddDept() {
    checkEmpty()
    addDepartment()
  }

  // function to reset the fields
  function resetFields() {
    setdeptId("")
    setDeptName("")
  }

  return (
    <section className="border-2 rounded-lg flex flex-col p-2">
      <h1 className="text-white text-xl font-semibold text-center">
        Add Department
      </h1>

      <p className="text-white">ID</p>
      <input
        type="number"
        value={deptId}
        onChange={(e) => setdeptId(e.target.value)}
        className="rounded-lg px-2 mb-4"
      />

      <p className="text-white">Department Name</p>
      <input
        type="text"
        value={deptName}
        onChange={(e) => setDeptName(e.target.value)}
        className="rounded-lg px-2"
      />

      {/* Button to add department on click */}
      <button
        onClick={() => {
          handleAddDept()
        }}
        className="bg-white text-black font-semibold  h-8 rounded-lg mt-4"
      >
        Add
      </button>
    </section>
  )
}

export default AddDept
