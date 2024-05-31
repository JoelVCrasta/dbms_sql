import { useEffect, useState } from "react"

interface DeptTableProps {
  deptData: []
}

const DeptTable: React.FC<DeptTableProps> = ({ deptData }) => {
  useEffect(() => {}, [])

  async function addDepartment() {
    const response = await fetch("http://localhost:3000/api/dept", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        
        })

  }

  return (
    <section className="border-2 rounded-xl p-2 h-full">
      <section className="h-full scroll-y-auto">
        <table className="w-full text-white ">
          <thead>
            <tr>
              <th className="py-2">Dept ID</th>
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
                  return (
                    <tr key={index} className=" border-y-2">
                      <td className="">{dept.id}</td>
                      <td>{dept.dept_name}</td>
                    </tr>
                  )
                }
              )
            )}
          </tbody>
        </table>
      </section>
      <div className="flex justify-between">
        <button className="bg-white text-black font-semibold w-32 h-8 rounded-lg mt-4">
          Add
        </button>
        <button className="bg-white text-black font-semibold  w-32 h-8 rounded-lg mt-4">
          Delete
        </button>
        <button className="bg-white text-black font-semibold  w-32 h-8 rounded-lg mt-4">
          Update
        </button>
      </div>
    </section>
  )
}

export default DeptTable
