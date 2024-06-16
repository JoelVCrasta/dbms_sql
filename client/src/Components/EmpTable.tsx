import { useEffect, useState } from "react"

import AddEmp from "./EmpButtons/AddEmp"
import UpdateEmp from "./EmpButtons/UpdateEmp"
import DeleteEmp from "./EmpButtons/DeleteEmp"

interface empProps {
  id: number
  name: string
  salary: number
  dept: number
}

const EmpTable = () => {
  const [showAddEmp, setShowAddEmp] = useState<boolean>(false)
  const [showUpdateEmp, setShowUpdateEmp] = useState<boolean>(false)
  const [selectedEmp, setSelectedEmp] = useState<number[] | null>(null)
  const [empData, setEmpData] = useState<[]>([])

  console.log(selectedEmp)

  async function getEmpDetails() {
    try {
      const response = await fetch("http://localhost:3000/api/emp", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok && response.status === 500) {
        throw new Error(`ERROR: ${response.status}`)
      }

      const data = await response.json()
      setEmpData(data.empDetails) // set the employee details in the state
    } catch (error) {
      console.error("Something went wrong: ", error)
    }
  }

  // function to delete an employee
  async function deleteEmployee() {
    if (selectedEmp == null || []) {
      alert("Please select an employee to delete")
      return
    }

    const response = await DeleteEmp(selectedEmp)
    alert(response.message)

    getEmpDetails()
  }

  // useEffect to get the employee details
  useEffect(() => {
    getEmpDetails()
  }, [])

  // function to select the employee records
  function selectId(id: number) {
    setSelectedEmp((prev) => {
      if (prev?.includes(id)) {
        return prev?.filter((empId) => empId !== id)
      } else {
        return [...(prev || []), id]
      }
    })
  }

  return (
    <>
      <div className="absolute top-72 left-72">
        {showAddEmp && <AddEmp onAddSuccess={getEmpDetails} />}
        {showUpdateEmp && <UpdateEmp onUpdateSuccess={getEmpDetails} />}
      </div>

      <section className="p-2 h-full ">
        {
          // if no employee details are available
          empData.length === 0 ? (
            <div className="text-2xl text-white text-center">
              No Employee details available
            </div>
          ) : (
            <section className="border-2 rounded-lg h-full scroll-y-auto">
              <table className="w-full text-white">
                <thead>
                  <tr>
                    <th className="p-2">Emp ID</th>
                    <th className="p-2">Emp Name</th>
                    <th className="p-2">Emp Salary</th>
                    <th className="p-2">Emp Dept ID</th>
                  </tr>
                </thead>

                <tbody>
                  {empData.map((emp: empProps, index) => {
                    const isSelected = selectedEmp?.includes(emp.id)

                    return (
                      <tr
                        key={index}
                        onClick={() => selectId(emp.id)} // function call onClick to select records
                        className={`text-lg border-y-2 text-center cursor-pointer ${
                          isSelected ? "bg-gray-500" : ""
                        }`}
                      >
                        <td>{emp.id}</td>
                        <td>{emp.name}</td>
                        <td>{emp.salary}</td>
                        <td>{emp.dept}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </section>
          )
        }

        <div className="flex justify-evenly">
          <button
            onClick={() => {
              if (showUpdateEmp) setShowUpdateEmp(false)
              setShowAddEmp((prev) => !prev)
            }}
            className="bg-white text-black font-semibold w-32 h-8 rounded-lg mt-4"
          >
            Add
          </button>

          <button
            onClick={() => deleteEmployee()}
            className="bg-white text-black font-semibold  w-32 h-8 rounded-lg mt-4"
          >
            Delete
          </button>

          <button
            onClick={() => {
              if (showAddEmp) setShowAddEmp(false)
              setShowUpdateEmp((prev) => !prev)
            }}
            className="bg-white text-black font-semibold w-32 h-8 rounded-lg mt-4"
          >
            Update
          </button>
        </div>
      </section>
    </>
  )
}

export default EmpTable
