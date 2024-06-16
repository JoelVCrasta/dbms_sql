import { useEffect, useState } from "react"

import AddDept from "./DeptButtons/AddDept"
import UpdateDept from "./DeptButtons/UpdateDept"
import DeleteDept from "./DeptButtons/DeleteDept"
import "../Styles/scrollbar.css"

// interface for the department details
interface DeptTableProps {
  id: number
  dept_name: string
}

const DeptTable = () => {
  const [showAddDept, setShowAddDept] = useState<boolean>(false)
  const [showUpdateDept, setShowUpdateDept] = useState<boolean>(false)
  const [selectedDept, setSelectedDept] = useState<number[] | null>(null)
  const [deptData, setDeptData] = useState<DeptTableProps[]>([])

  // function to get the department details
  async function getDeptDetails() {
    try {
      const response = await fetch("http://localhost:3000/api/dept", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok && response.status === 500) {
        throw new Error(`ERROR: ${response.status}`)
      }

      const data = await response.json()
      setDeptData(data.deptDetails)
    } catch (error) {
      console.error("Something went wrong: ", error)
    }
  }

  // function to delete a department
  async function deleteDepartment() {
    if (selectedDept == null || []) {
      alert("Please select a department to delete")
      return
    }

    const response = await DeleteDept(selectedDept)
    alert(response.message) // alert the response message

    getDeptDetails()
  }

  // useEffect to get the department details
  useEffect(() => {
    getDeptDetails()
  }, [])

  // function to select the department records
  function selectId(id: number) {
    setSelectedDept((prev) => {
      if (prev?.includes(id)) {
        return prev?.filter((empId) => empId !== id)
      } else {
        return [...(prev || []), id]
      }
    })
  }

  return (
    <>
      <div className="absolute top-96 left-72">
        {showAddDept && <AddDept onAddSuccess={getDeptDetails} />}
        {showUpdateDept && <UpdateDept onUpdateSuccess={getDeptDetails} />}
      </div>
      <section className="p-2 h-full ">
        {deptData.length === 0 ? ( // check if the department data is empty
          <tr>
            <td className="text-center">No Records found</td>
          </tr>
        ) : (
          <section className="border-2 rounded-lg h-full overflow-y-scroll scroll-y-auto hide-scroll">
            <table className="w-full text-white">
              <thead>
                <tr>
                  <th className="text-xl py-2">Dept ID</th>
                  <th>Dept Name</th>
                </tr>
              </thead>

              <tbody>
                {deptData.map(
                  (dept: { id: number; dept_name: string }, index: number) => {
                    const isSelected = selectedDept?.includes(dept.id)

                    return (
                      <tr
                        key={index}
                        onClick={() => selectId(dept.id)} // function call onClick to select records
                        className={`text-lg border-y-2 text-center cursor-pointer ${
                          isSelected ? "bg-gray-500" : ""
                        }`}
                      >
                        <td>{dept.id}</td>
                        <td>{dept.dept_name}</td>
                      </tr>
                    )
                  }
                )}
              </tbody>
            </table>
          </section>
        )}

        <div className="flex justify-between">
          <button
            onClick={() => {
              if (showUpdateDept) setShowUpdateDept((prev) => !prev)
              setShowAddDept((prev) => !prev)
            }}
            className="bg-white text-black font-semibold w-32 h-8 rounded-lg mt-4"
          >
            Add
          </button>

          <button
            onClick={() => deleteDepartment()}
            className="bg-white text-black font-semibold  w-32 h-8 rounded-lg mt-4"
          >
            Delete
          </button>

          <button
            onClick={() => {
              if (showAddDept) setShowAddDept((prev) => !prev)
              setShowUpdateDept((prev) => !prev)
            }}
            className="bg-white text-black font-semibold  w-32 h-8 rounded-lg mt-4"
          >
            Update
          </button>
        </div>
      </section>
    </>
  )
}

export default DeptTable
