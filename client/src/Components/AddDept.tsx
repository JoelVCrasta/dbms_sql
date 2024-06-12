import { useState } from "react"

type AddDeptProps = {
  onAddSuccess: () => void
}

const AddDept: React.FC<AddDeptProps> = ({ onAddSuccess }) => {
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

    setdeptId("")
    setDeptName("")
  }

  function checkEmpty() {
    if (deptId === "" || deptName === "") {
      alert("Please fill all the fields")
      return
    }
  }

  function handleAddDept() {
    checkEmpty()
    addDepartment()
  }

  return (
    <section className="border-2 rounded-xl flex flex-col p-2">
      <h1 className="text-white text-xl font-semibold text-center">
        Add Department
      </h1>
      <p className="text-white">Enter ID</p>
      <input
        type="number"
        value={deptId}
        onChange={(e) => setdeptId(e.target.value)}
        className="rounded-lg px-2 mb-4"
      />
      <p className="text-white">Enter Department Name</p>
      <input
        type="text"
        value={deptName}
        onChange={(e) => setDeptName(e.target.value)}
        className="rounded-lg px-2"
      />

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
