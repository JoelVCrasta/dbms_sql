import { useState, useEffect, useMemo } from "react"
import DeptTable from "../Components/DeptTable"

const Dept = () => {
  const [deptData, setDeptData] = useState<[]>([])

  useEffect(() => {
    async function getDeptDetails() {
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

      console.log(data.deptDetails)
    }

    getDeptDetails()
  }, [])

  return (
    <section className="h-screen flex justify-center items-center">
      <section className="h-2/4 w-1/4">
        <DeptTable deptData={deptData} />
      </section>
    </section>
  )
}

export default Dept
