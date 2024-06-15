import { useState } from "react"

type DeptProps = {
  onUpdateSuccess: () => void
}

const UpdateDept = ({ onUpdateSuccess }: DeptProps) => {
  const [deptId, setdeptId] = useState<string>("")
  const [deptName, setDeptName] = useState<string>("")

  async function updateDepartment() {
    const response = await fetch("http://localhost:3000/api/deptupdate", {
      method: "PUT",
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
      onUpdateSuccess()
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

  function handleUpdateDept() {
    checkEmpty()
    updateDepartment()
  }

  return (
    <section className="border-2 rounded-lg flex flex-col p-2">
      <h1 className="text-white text-xl font-semibold text-center">
        Update Department
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
          handleUpdateDept()
        }}
        className="bg-white text-black font-semibold  h-8 rounded-lg mt-4"
      >
        Update
      </button>
    </section>
  )
}

export default UpdateDept
