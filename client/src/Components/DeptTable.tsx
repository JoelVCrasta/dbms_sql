import { useEffect, useState } from "react"
import AddDept from "./AddDept"
import UpdateDept from "./UpdateDept"
import DeleteDept from "./DeleteDept"

const DeptTable = () => {
  const [showAddDept, setShowAddDept] = useState<boolean>(false)
  const [showUpdateDept, setShowUpdateDept] = useState<boolean>(false)
  const [selectedDept, setSelectedDept] = useState<number[] | null>(null)
  const [deptData, setDeptData] = useState<[]>([])

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

  function deleteDepartment() {
    if (!selectedDept) {
      alert("Please select a department")
      return
    }

    const mes = DeleteDept(selectedDept)
    alert(mes)
    getDeptDetails()
  }

  useEffect(() => {
    getDeptDetails()
  }, [])

  return (
    <section className="p-2 h-full ">
      {showAddDept && <AddDept onAddSuccess={getDeptDetails} />}
      {showUpdateDept && <UpdateDept onUpdateSuccess={getDeptDetails} />}

      <section className="border-2 rounded-xl h-full scroll-y-auto">
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
          onClick={() => setShowAddDept((prev) => !prev)}
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
          onClick={() => setShowUpdateDept((prev) => !prev)}
          className="bg-white text-black font-semibold  w-32 h-8 rounded-lg mt-4"
        >
          Update
        </button>
      </div>
    </section>
  )
}

export default DeptTable
