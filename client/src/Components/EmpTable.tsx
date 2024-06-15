import { useEffect, useState } from "react"

import AddEmp from "./EmpButtons/AddEmp"
import UpdateEmp from "./EmpButtons/UpdateEmp"

const EmpTable = () => {
  const [showAddEmp, setShowAddEmp] = useState<boolean>(false)
  const [showUpdateEmp, setShowUpdateEmp] = useState<boolean>(false)
  const [empData, setEmpData] = useState<[]>([])

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

  // useEffect to get the employee details
  useEffect(() => {
    getEmpDetails()
  }, [])

  return (
    <>
      <div className="absolute top-80 left-72">
        {showAddEmp && <AddEmp onAddSuccess={getEmpDetails} />}
        {showUpdateEmp && <UpdateEmp onUpdateSuccess={getEmpDetails} />}
      </div>

      <section className="p-2 h-full ">
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
              {empData.map((emp: any, index) => (
                <tr key={index}>
                  <td className="text-center">{emp.id}</td>
                  <td className="text-center">{emp.name}</td>
                  <td className="text-center">{emp.salary}</td>
                  <td className="text-center">{emp.dept}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <div>
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
