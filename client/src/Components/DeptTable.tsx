import { useEffect, useState } from "react"
import AddDept from "./DeptButtons/AddDept"
import UpdateDept from "./DeptButtons/UpdateDept"
import DeleteDept from "./DeptButtons/DeleteDept"

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
    if (!selectedDept) {
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

  return (
    <>
      <div className="absolute top-96 left-72">
        {showAddDept && <AddDept onAddSuccess={getDeptDetails} />}
        {showUpdateDept && <UpdateDept onUpdateSuccess={getDeptDetails} />}
      </div>
      <section className="p-2 h-full ">
        <section className="border-2 rounded-lg h-full scroll-y-auto">
          <table className="w-full text-white">
            <thead>
              <tr>
                <th className="text-xl py-2">Dept ID</th>
                <th>Dept Name</th>
              </tr>
            </thead>

            <tbody>
              {deptData.length === 0 ? (
                <tr>
                  <td>No Records found</td>
                </tr>
              ) : (
                deptData.map(
                  (dept: { id: number; dept_name: string }, index: number) => {
                    const isSelected = selectedDept?.includes(dept.id)

                    return (
                      <tr
                        key={index}
                        onClick={() => {
                          setSelectedDept((prev) => {
                            if (prev?.includes(dept.id)) {
                              return prev?.filter((id) => id !== dept.id)
                            } else {
                              return [...(prev || []), dept.id]
                            }
                          })
                        }}
                        className={`text-lg border-y-2 ${
                          isSelected ? "bg-gray-500" : ""
                        }`}
                      >
                        <td className="text-center">{dept.id}</td>
                        <td className="text-center">{dept.dept_name}</td>
                      </tr>
                    )
                  }
                )
              )}
            </tbody>
          </table>
        </section>

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
